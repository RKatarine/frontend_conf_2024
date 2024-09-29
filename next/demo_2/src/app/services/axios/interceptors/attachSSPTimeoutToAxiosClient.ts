import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import requestAsyncLocalStorage from "@/src/app/services/requestAsyncLocalStorage/requestAsyncLocalStorage";
import { DEFAULT_AXIOS_TIMEOUT } from '../constants'

export default function attachSSPTimeoutToAxiosClient(axiosClient: AxiosInstance): void {
  axiosClient.interceptors.request.use(onAxiosRequestSuccess)
}

const defaultRequestAsyncLocalStorageContext = {
    req: {
        isSSPRequest: false
    }
}

function onAxiosRequestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const {
    // @ts-expect-error isSSPRequest is not defined in req
    req: { isSSPRequest }
  } = requestAsyncLocalStorage.getStore() ?? defaultRequestAsyncLocalStorageContext

  if (isSSPRequest) {
    return {
      ...config,
      timeout: (config.timeout || DEFAULT_AXIOS_TIMEOUT),
    }
  }

  return config
}
