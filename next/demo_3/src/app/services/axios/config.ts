import Axios from 'axios'
import type { AxiosRequestTransformer, AxiosResponseTransformer } from 'axios'
import { DEFAULT_AXIOS_TIMEOUT } from './constants'
import { paramsSerializer } from './util'
import {ApiConfig} from "@/src/api-client/http-client";

const defaultRequestTransformers = Array.isArray(Axios.defaults.transformRequest)
    ? Axios.defaults.transformRequest
    : ([Axios.defaults.transformRequest] as AxiosRequestTransformer[])

const defaultResponseTransformers = Array.isArray(Axios.defaults.transformResponse)
    ? Axios.defaults.transformResponse
    : ([Axios.defaults.transformResponse] as AxiosResponseTransformer[])

export const config : ApiConfig = {
    responseType: 'json' as const,
    withCredentials: true,
    paramsSerializer: (params) => paramsSerializer(params),
    transformRequest: [...defaultRequestTransformers],
    transformResponse: [...defaultResponseTransformers],
    headers: {},
}

export const apiConfig: ApiConfig = {
    ...config,
    baseURL: typeof window === 'undefined' ? process.env.SERVER_API_URL : '',
    timeout: DEFAULT_AXIOS_TIMEOUT,
}