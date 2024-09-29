import type { DehydratedState, QueryFunction, QueryKey } from '@tanstack/react-query'
import type { ErrorObject } from 'serialize-error'

export interface IQueryOptions<Q extends QueryKey, R> {
  queryKey: Q
  queryFn: QueryFunction<R, Q>
}
// export interface IInfiniteQueryOptions<Q extends QueryKey, R> {
//   queryKey: Q
//   queryFn: QueryFunction<R, Q>
//   initialPageParam: unknown
// }

export interface IReactQueryDehydrateResult {
  reactQueryDehydratedErrors: IReactQueryDehydratedError[]
  reactQueryDehydratedState: DehydratedState
}

export interface IReactQueryDehydratedError {
  queryKey: QueryKey
  error: ErrorObject
}

export type ServerPrefetchQueryResult<T> = { error: unknown } | T
