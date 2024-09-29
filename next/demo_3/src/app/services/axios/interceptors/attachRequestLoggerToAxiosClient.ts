import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

import {
  apiRequestErrorCounter,
  apiRequestTimeHistogram, registry as customRegister,
} from "@/server/services/metrics/custom"
import getApiErrorReason from "@/src/app/services/axios/getApiErrorReason";

export function pathToPathname(path: string): string {
  const searchPosition = path.indexOf('?');
  return searchPosition ? path.slice(0, searchPosition) : path;
}
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

  console.log('----> onAxiosResponseSuccess', urlForMetrics)
  apiRequestTimeHistogram
    .labels({
      url: urlForMetrics,
    })
    .observe(responseTime / MS_IN_SECOND)

  customRegister.getMetricsAsJSON()
      .then((json) => {
          console.log('customRegister', json[json.length - 2].name, json[json.length - 2].values)
      })

  return response
}

function onAxiosResponseError(error: Error): never {

  const urlForMetrics =
    ((error as AxiosError).config as ExtendedAxiosRequestConfig)?.urlForMetrics || '_unknown_'

  apiRequestErrorCounter
    .labels({
      url: urlForMetrics,
      reason: getApiErrorReason(error),
    })
    .inc()

  throw error
}
