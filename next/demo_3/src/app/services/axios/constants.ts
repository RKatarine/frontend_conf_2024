export const API_CLIENT_TIMEOUT_WHILE_SSR = 2_000
export const DEFAULT_AXIOS_TIMEOUT = typeof window === 'undefined' ? API_CLIENT_TIMEOUT_WHILE_SSR : 0