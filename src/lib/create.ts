import AxiosStatic from "axios"
import Cookies from "js-cookie";
import AxiosInstance from "./axios/instance";
import { AxiosApiConfig, AxiosApiProperty, Token, AxiosApiInstante } from "./types";
import { privateRequest, privateResponse, publicRequest, publicResponse } from "./axios/middleware";

const apiDefaultConfig = {
	tokenAccessType: 'Bearer',
	cookie: {
		name: '_token'
	},
} as AxiosApiConfig

/**
 * @return
 * - [`public`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that don't need authentication!
 * - [`private`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that need to send authentication token!
 * - [`cookie`](https://github.com/andremalveira/axios/blob/main/README.md#api-cookie): Used to treat the token in the cookie, it has the set, get and remove methods.
 * - [`routes`](https://github.com/andremalveira/axios/blob/main/README.md#route) or [`endpoint`](https://github.com/andremalveira/axios/blob/main/README.md#route): A helper for configuring the api's use of routes
 */
export const createAxiosApi = <P extends AxiosApiProperty, C extends Partial<AxiosApiConfig>>(config: C | {} = {}) => {
	const { route, endpoint, ...configs } = { ...apiDefaultConfig, ...config ?? {} } as AxiosApiConfig;

	//PUBLIC
	const publicCreate = AxiosStatic.create(configs);
	publicCreate.interceptors.request.use(publicRequest.request, publicRequest.error)
	publicCreate.interceptors.response.use(publicResponse.response, publicResponse.error)
	const publicInstance = AxiosInstance(publicCreate)

	// PRIVATE
	const privateCreate = AxiosStatic.create(configs)
	privateCreate.interceptors.request.use(privateRequest.request, privateRequest.error)
	privateCreate.interceptors.response.use(privateResponse.response, privateResponse.error)
	const privateInstance = AxiosInstance(privateCreate)

	const r = (route ? { route } : endpoint ? { endpoint } : (route && endpoint) ? { route, endpoint } : {});

	return {
		public: publicInstance,
		private: privateInstance,
		cookie: ((config: AxiosApiConfig) => {
			const name = config.cookie.name as string;
			const options = config.cookie?.options;
			return {
				set: (token: Token | string) => { Cookies.set(name, token as string, options) },
				get: () => { return Cookies.get(name) as string },
				remove: () => { Cookies.remove(name, options) }
			}
		})(configs as AxiosApiConfig),
		...r
	} as AxiosApiInstante<P, C>
}

/**
 * @return
 * - [`public`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that don't need authentication!
 * - [`private`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that need to send authentication token!
 * - [`cookie`](https://github.com/andremalveira/axios/blob/main/README.md#api-cookie): Used to treat the token in the cookie, it has the set, get and remove methods.
 */
export const api = createAxiosApi();
