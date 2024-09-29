import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

import { pathToPathname } from '@/src/app/metrics/helpers'
import getApiErrorReason from "@/src/app/services/axios/getApiErrorReason";

export default function attachRequestLoggerToAxiosClient(axiosClient: AxiosInstance): void {
  axiosClient.interceptors.request.use(onAxiosRequestSuccess)
  axiosClient.interceptors.response.use(onAxiosResponseSuccess, onAxiosResponseError)
}

export interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  startRequestTime: number
  fullUrl: string
  urlForMetrics: string
}

function onAxiosRequestSuccess(config: InternalAxiosRequestConfig): ExtendedAxiosRequestConfig {
  const fullUrl = `${config.baseURL}${config.url}`

  return {
    ...config,
    startRequestTime: Date.now(),
    fullUrl,
    urlForMetrics: pathToPathname(fullUrl)
  }
}

const MS_IN_SECOND = 1_000

function onAxiosResponseSuccess(response: AxiosResponse): AxiosResponse {
  const { startRequestTime, urlForMetrics } = response.config as ExtendedAxiosRequestConfig
  const responseTime = Date.now() - startRequestTime
  console.log('Axios request completed', urlForMetrics, responseTime)

  return response
}

function onAxiosResponseError(error: Error): never {

  const urlForMetrics =
    ((error as AxiosError).config as ExtendedAxiosRequestConfig)?.urlForMetrics || '_unknown_'

  console.log('Axios request failed', urlForMetrics, getApiErrorReason(error))

  throw error
}
