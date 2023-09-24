
import { AxiosReturnInstance } from "./type"

/**
 * AxiosInstance: Custom function to instantiate axios with static typing
 */
const AxiosInstance:AxiosReturnInstance = (AxiosCreate) => {
  return {
    request: async (config) => {
      return AxiosCreate.request(config)
    },
    post: async (url, data, config) => {
      return AxiosCreate.post(url, data, config)
    },
    get: async (url, config) => {
      return AxiosCreate.get(url, config)
    },
    put: async (url, data, config) => {
      return AxiosCreate.put(url, data, config)
    },
    patch: async (url, data, config) => {
      return AxiosCreate.patch(url, data, config)
    },
    delete: async (url, config) => {
      return AxiosCreate.delete(url, config)
    },
  }
}

export default AxiosInstance