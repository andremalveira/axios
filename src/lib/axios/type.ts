import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";


export type AxiosInstanceType = {
  /**
   * @param config
   * @returns 
   */
  request: <ResponseData = any, Data = any>(config:AxiosRequestConfig<Data>) => Promise<AxiosResponse<ResponseData, any>>
  /**
   * @param url 
   * @param data Optional
   * @param config Optional
   * 
   * ```ts
   * // Typescript example
   * const res = api...post<ResponseDataType, DataType>(url, data)
   * const responseData = res.data
   * ```
   */
  post: <ResponseData = any, Data = any>(url:string, data?: Data, config?:AxiosRequestConfig<Data> | undefined) => Promise<AxiosResponse<ResponseData, any>>
  /**
   * @param url 
   * @param config Optional
   */
  get: <ResponseData = any, Data = any>(url:string, config?:AxiosRequestConfig<Data> | undefined) => Promise<AxiosResponse<ResponseData, any>>,
  /**
   * @param url 
   * @param data  Optional
   * @param config Optional
   * ```ts
   * // Typescript example
   * const res = api...put<ResponseDataType, DataType>(url, data)
   * const responseData = res.data
   * ```
   */
  put: <ResponseData = any, Data = any>(url:string, data?: Data, config?:AxiosRequestConfig<Data> | undefined) => Promise<AxiosResponse<ResponseData, any>>,
  /**
   * @param url 
   * @param data  Optional
   * @param config Optional
   * ```ts
   * // Typescript example
   * const res = api...patch<ResponseDataType, DataType>(url, data)
   * const responseData = res.data
   * ```
   */
  patch: <ResponseData = any, Data = any>(url:string, data?: Data, config?:AxiosRequestConfig<Data> | undefined) => Promise<AxiosResponse<ResponseData, any>>,
  /**
   * @param url 
   * @param config Optional
   */
  delete: <ResponseData = any, Data = any>(url:string, config?:AxiosRequestConfig<Data> | undefined) => Promise<AxiosResponse<ResponseData, any>>
}

export type AxiosReturnInstance = (AxiosCreate:AxiosInstance) => AxiosInstanceType
