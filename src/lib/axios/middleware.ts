import AxiosStatic from "axios";
import Cookies from "js-cookie";
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ResponseConfig, AxiosApiResponse, AxiosApiRequest } from "../types";
import { createError } from "../../utils/createError";

const RequestValidate = async (req: AxiosApiRequest) => {
	if (req.request) {
		const newReq = await req.request(req);
		if (!newReq) {
			const error = createError(422, `Request function configured in createAxiosApi is returning ${newReq == null ? 'null' : typeof newReq} value \n See in https://github.com/andremalveira/axios/blob/main/docs/errors.md#request-or-response-function-configured-in-createaxiosapi-is-returning-null-or-undefined-value`)
			return Promise.reject(error)
		}
		return newReq
	}
	return req
}
const ResponseValidate = async (res: AxiosApiResponse) => {
	if (res.config.response) {
		const newRes = await res.config.response(res);
		if (!newRes) {
			const error = createError(422, `Response function configured in createAxiosApi is returning ${newRes == null ? 'null' : typeof newRes} value \n See in https://github.com/andremalveira/axios/blob/main/docs/errors.md#request-or-response-function-configured-in-createaxiosapi-is-returning-null-or-undefined-value`)
			return Promise.reject(error)
		}
		return newRes
	}
	return res;
}


//PUBLIC REQUEST
const publicRequest = {
	request: async (request: InternalAxiosRequestConfig<any>) => await RequestValidate(request as AxiosApiRequest),
	error: (error: any) => Promise.reject(error)
}
const publicResponse = {
	response: async (response: AxiosResponse) => await ResponseValidate(response as AxiosApiResponse),
	error: (error: any) => Promise.reject(error)
}


//PRIVATE REQUEST
const privateRequest = {
	request: async (request: InternalAxiosRequestConfig<any>) => {
		let req = request as AxiosApiRequest;
		if (!req.headers['Authorization']) {
			const token = Cookies.get(req.cookie.name);
			if (token) req.headers['Authorization'] = `${req.tokenAccessType} ${token}`;
			else req.headers['Authorization'] = null;
		}

		req = await RequestValidate(req)

		if (!req?.headers['Authorization']) return Promise.reject({ config: req });
		return req
	},
	error: (error: any) => Promise.reject(error)
}

//PRIVATE RESPONSE
const privateResponse = {
	response: async (response: AxiosResponse) => await ResponseValidate(response as AxiosApiResponse),
	error: async (error: any) => {

		const config = error?.config as ResponseConfig;
		const authorization = config?.headers['Authorization'] as string

		if (!authorization) {
			const error = createError(401, `Unauthenticated user to perform private api requests! \n See in https://github.com/andremalveira/axios/blob/main/docs/errors.md#unauthenticated-user-to-perform-private-api-requests`)
			return Promise.reject(error);
		}

		if (!Boolean(authorization.substring(7)) && !authorization.includes(config.tokenAccessType)) {
			const error = createError(422, `Authorization header entered is invalid! \n See in https://github.com/andremalveira/axios/blob/main/docs/errors.md#the-authorization-header-entered-is-invalid`)
			return Promise.reject(error);
		}

		const token = authorization.substring(7) as string

		if (error?.response?.status === 401 && !config?.sent && Boolean(token)) {
			config.sent = true;

			if (config.refreshToken) {
				try {
					const newToken = await config.refreshToken(token, config);
					if (newToken) {
						Cookies.set(config.cookie.name, newToken as string, config.cookie.options as any);
						config.updatedToken = newToken
						return AxiosStatic(config);
					} else {
						const error = createError(422, `The token returned from the refreshtoken function is ${newToken == null ? 'null' : typeof newToken} \n See in https://github.com/andremalveira/axios/blob/main/docs/errors.md#token-returned-from-refreshtoken-function-is-null--undefined`)
						return Promise.reject(error);
					}
				} catch (err) {
					return Promise.reject(err);
				}
			} else {
				return AxiosStatic(config);
			}
		}

		return Promise.reject(error);
	}
}


export { privateRequest, privateResponse, publicRequest, publicResponse };
