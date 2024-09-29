import qs from 'qs'
import type { IStringifyOptions } from 'qs'

export function paramsSerializer(params: unknown, options?: IStringifyOptions) {
    return qs.stringify(
        params,
        {
            skipNulls: true,
            arrayFormat: 'brackets',
            ...options,
        }
    )
}
