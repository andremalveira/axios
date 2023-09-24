import { AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import { AxiosInstanceType } from "./axios/type";
import Cookies from "js-cookie";

export interface Token extends String { }

export type AxiosApiConfig = Omit<CreateAxiosDefaults, 'baseUrl'> & {
	/**Api base URL */
	baseURL: string;
	/**Default `Bearer` */
	tokenAccessType: 'Bearer' | 'Basic';
	/**Cookie settings properties
	 * - `name`: default: `_token`
	 * - `options`: extends from [`CookieAttributes`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/js-cookie/index.d.ts#L12)
	 * @doc {@link https://github.com/andremalveira/axios/blob/main/README.md#cookie cookie}
	 */
	cookie: {
		name: string;
		options?: Cookies.CookieAttributes;
	};
	/**Receives a `promise function` that returns the updated `token`.
	 * @param token
	 * @return New token
	 * @doc {@link https://github.com/andremalveira/axios/blob/main/README.md#refreshtoken refreshToken}
	 * @example
	 * ```js
	 * const api = createAxiosApi({
	 *⠀⠀⠀baseURL: 'https://api',
	 *⠀⠀⠀refreshToken: async (token) => {
	 *⠀⠀⠀⠀⠀const res = await api.public.post('/refreshtoken', { token });
	 *⠀⠀⠀⠀⠀const newToken = res.data.token as string
	 *⠀⠀⠀⠀⠀return newToken
	 *⠀⠀⠀}
	 * })
	 * ```
	 */
	refreshToken: (token: Token | string, config: ResponseConfig) => Promise<Token | string>;
	/** 
	 * Axios `request`
	 * @param req 
	 * @return `req`
	 * @example 
	 * ```js
	 * const api = createAxiosApi({
	 *⠀⠀⠀baseURL: 'https://api',
	 *⠀⠀⠀request: async (req) => {
	 *⠀⠀⠀⠀⠀//your request settings
	 *⠀⠀⠀⠀⠀return req
	 *⠀⠀⠀}
	 * })
	 * ```
	 */
	request: (req: AxiosApiRequest) => Promise<AxiosApiRequest>;
	/** 
	 * Axios `response`
	 * @param res 
	 * @return `res`
	 * @example
	 * ```js
	 * const api = createAxiosApi({
	 *⠀⠀⠀baseURL: 'https://api',
	 *⠀⠀⠀response: async (res) => {
	 *⠀⠀⠀⠀⠀//your response settings
	 *⠀⠀⠀⠀⠀return res
	 *⠀⠀⠀}
	 * })
	 * ```
	 */
	response: (res: AxiosApiResponse) => Promise<AxiosApiResponse>;
	/**A helper for configuring the api's use of routes
	 * @see {@link https://github.com/andremalveira/axios/blob/main/README.md#route route}
	 * @example
	 * ```ts
	 * const res = await api.private.post(api.route.posts)
	 * ```
	 */
	route?: any;
	/**A helper for configuring the api's use of routes
	 * @see {@link https://github.com/andremalveira/axios/blob/main/README.md#route route}
	 * @example
	 * ```ts
	 * const res = await api.private.post(api.route.posts)
	 * ```
	 */
	endpoint?: any
};

export type AxiosApiConfigWithRoute = {
	/**A helper for configuring the api's use of routes
	 * @see {@link https://github.com/andremalveira/axios/blob/main/README.md#route route}
	 * @example
	 * ```ts
	 * const res = await api.private.post(api.route.posts)
	 * ```
	 */
	route: any;
}

export type AxiosApiConfigWithEndpoint = {
	/**A helper for configuring the api's use of routes
	 * @see {@link https://github.com/andremalveira/axios/blob/main/README.md#route route}
	 * @example
	 * ```ts
	 * const res = await api.private.post(api.route.posts)
	 * ```
	 */
	endpoint: any;
}

export type AxiosApiConfigWithRouteEndpoint = AxiosApiConfig & AxiosApiConfigWithRoute & AxiosApiConfigWithEndpoint
export type AxiosApiConfigWithoutRouteEndpoint = Omit<AxiosApiConfig, 'route' | 'endpoint'>

/**
 * @return
 * - [`public`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that don't need authentication!
 * - [`private`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that need to send authentication token!
 * - [`cookie`](https://github.com/andremalveira/axios/blob/main/README.md#api-cookie): Used to treat the token in the cookie, it has the set, get and remove methods.
 * - [`routes`](https://github.com/andremalveira/axios/blob/main/README.md#route) or [`endpoint`](https://github.com/andremalveira/axios/blob/main/README.md#route): A helper for configuring the api's use of routes
 */
export type AxiosApiCreate<P extends AxiosApiProperty = AxiosApiProperty> = (config?: AxiosApiConfig | {}) => AxiosApiReturn<P>

/**
 * - [`public`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that don't need authentication!
 * - [`private`](https://github.com/andremalveira/axios/blob/main/README.md#api-public): For requests that need to send authentication token!
 * - [`cookie`](https://github.com/andremalveira/axios/blob/main/README.md#api-cookie): Used to treat the token in the cookie, it has the `set`, `get` and `remove` methods.
 * - [`routes`](https://github.com/andremalveira/axios/blob/main/README.md#route) or [`endpoint`](https://github.com/andremalveira/axios/blob/main/README.md#route): A helper for configuring the api's use of routes
 */
export type AxiosApiReturn<Property extends AxiosApiProperty = AxiosApiProperty> = {
	/**For requests that don't need authentication!
	 * - The [`public`](https://github.com/andremalveira/axios/blob/main/README.md#api-public) method, [`axios`](https://axios-http.com/docs/example)' default mode, no token verification is done.
	 * ```ts
	 *  const res = await api.public.get('/route-name')
	 * ```
	*/
	public: AxiosInstanceType;
	/**For requests that need to send authentication token!
	 * - The [`private`](https://github.com/andremalveira/axios/blob/main/README.md#api-private) method, by default, has interceptors configured to check if there is a token in the cookie and passes this token in the authorization header, if it does not exist, an `Unauthorized` error is returned.
	 * ```ts
	 *  const res = await api.private.get('/route-name');
	 * ```
	*/
	private: AxiosInstanceType;
	/** Used to treat the token in the cookie, it has the `set`, `get` and `remove` methods.
	 * ```
	 *  const res = await api.public.post('/login', { email, password });
	 *  if(res.token) {
	 *     api.cookie.set(res.token)
	 *  }
	 * ```
	*/
	cookie: Cookie;
	/**A helper for configuring the api's use of routes
	 * @see {@link https://github.com/andremalveira/axios/blob/main/README.md#route route}
	 * @example
	 * ```ts
	 * const res = await api.private.post(api.route.posts)
	 * ```
	 */
	route: Property['route']
	/**A helper for configuring the api's use of routes
	 * @see {@link https://github.com/andremalveira/axios/blob/main/README.md#route route}
	 * @example
	 * ```ts
	 * const res = await api.private.post(api.route.posts)
	 * ```
	 */
	endpoint: Property['endpoint']
};

export type AxiosApi<P extends AxiosApiProperty = AxiosApiProperty> = Omit<AxiosApiReturn<P>, 'route' | 'endpoint'>;
export type AxiosApiWithRoute<P extends AxiosApiProperty = AxiosApiProperty> = Omit<AxiosApiReturn<P>, 'endpoint'>;
export type AxiosApiWithEndpoint<P extends AxiosApiProperty = AxiosApiProperty> = Omit<AxiosApiReturn<P>, 'route'>;
export type AxiosApiWithRouteAndEndpoint<P extends AxiosApiProperty = AxiosApiProperty> = AxiosApiReturn<P>

export type AxiosApiInstante<Property extends AxiosApiProperty = AxiosApiProperty, C extends Partial<AxiosApiConfig> = AxiosApiConfig> =
	C extends AxiosApiConfigWithRoute & AxiosApiConfigWithEndpoint
	? AxiosApiWithRouteAndEndpoint<Property>
	: C extends AxiosApiConfigWithRoute
	? AxiosApiWithRoute<Property>
	: C extends AxiosApiConfigWithEndpoint
	? AxiosApiWithEndpoint<Property>
	: AxiosApi<Property>

export type AxiosApiProperty = {
	route?: any;
	endpoint?: any
}

export type Cookie = {
	set: (token: string) => void;
	get: () => string;
	remove: () => void
}

export type RequestConfig = InternalAxiosRequestConfig<any> & AxiosApiConfig
export type ResponseConfig = InternalAxiosRequestConfig<any> & AxiosApiConfig & {
	sent?: boolean;
	updatedToken?: Token | string
}
export type AxiosApiRequest = RequestConfig;
export type AxiosApiResponse = Omit<AxiosResponse, 'config'> & {
	config: ResponseConfig
}

export type ParamValue = string | number
