import type {
  DataTag,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  InfiniteData,
  NoInfer,
  QueryKey,
  QueryOptions,
  Updater,
} from '@tanstack/react-query'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { serializeError } from 'serialize-error'
import type { SetRequired } from 'type-fest'

import type {
  IReactQueryDehydratedError,
  IReactQueryDehydrateResult,
  ServerPrefetchQueryResult,
} from './types'

// Обёртка над QueryClient для префетчинга и предустановки данных на стороне сервера.
// У стандартного QueryClient нет механизма сбора и проброса ошибок на префетчинге.
export default class ReactQueryServerService {
  private readonly queryClient: QueryClient
  private readonly reactQueryDehydratedErrors: IReactQueryDehydratedError[] = []

  constructor() {
    this.queryClient = new QueryClient()
  }

  // Один из двух основных методов, которыми рекомендуется пользоваться продуктовым командам.
  prefetchQuery<TQueryFnData, TQueryKey extends QueryKey>(
    queryOptions: FetchQueryOptions<TQueryFnData, Error, TQueryFnData, TQueryKey>
  ): Promise<ServerPrefetchQueryResult<TQueryFnData>> {
    return this.queryClient
      .fetchQuery(queryOptions)
      .catch((error: unknown) => this.onError(queryOptions, error))
  }

  // Один из двух основных методов, которыми рекомендуется пользоваться продуктовым командам.
  prefetchInfiniteQuery<TQueryFnData, TQueryKey extends QueryKey, TPageParam>(
    queryOptions: FetchInfiniteQueryOptions<
      TQueryFnData,
      Error,
      TQueryFnData,
      TQueryKey,
      TPageParam
    >
  ): Promise<ServerPrefetchQueryResult<InfiniteData<TQueryFnData, TPageParam>>> {
    return this.queryClient
      .fetchInfiniteQuery(queryOptions)
      .catch((error: unknown) => this.onError(queryOptions, error))
  }

  // Используется только для предустановки некоторых ключей,
  // через которые, сугубо серверные данные прокидываются в браузер.
  setQueryData<
    TQueryFnData = unknown,
    TaggedQueryKey extends QueryKey = QueryKey,
    TInferredQueryFnData = TaggedQueryKey extends DataTag<unknown, infer TaggedValue>
      ? TaggedValue
      : TQueryFnData
  >(
    queryKey: TaggedQueryKey,
    updater: Updater<
      NoInfer<TInferredQueryFnData> | undefined,
      NoInfer<TInferredQueryFnData> | undefined
    >
  ): TInferredQueryFnData | undefined {
    return this.queryClient.setQueryData(queryKey, updater)
  }

  // Используется только для чтения некоторых ключей,
  // данные для которых предзапрашивались через `prefetchQuery` или `prefetchInfiniteQuery`,
  // или установлены с помощью `setQueryData`.
  getQueryData<
    TQueryFnData = unknown,
    TaggedQueryKey extends QueryKey = QueryKey,
    TInferredQueryFnData = TaggedQueryKey extends DataTag<unknown, infer TaggedValue>
      ? TaggedValue
      : TQueryFnData
  >(queryKey: TaggedQueryKey): TInferredQueryFnData | undefined {
    return this.queryClient.getQueryData(queryKey)
  }

  // Используется один раз в общем механизме для дальнейшего проброса регидрируемых данных.
  dehydrate(): IReactQueryDehydrateResult {
    return {
      reactQueryDehydratedErrors: this.reactQueryDehydratedErrors,
      reactQueryDehydratedState: dehydrate(this.queryClient),
    }
  }

  private onError<TQueryFnData, TData, TQueryKey extends QueryKey, TPageParam>(
    queryOptions: SetRequired<
      QueryOptions<TQueryFnData, Error, TData, TQueryKey, TPageParam>,
      'queryKey'
    >,
    error: unknown
  ): { error: unknown } {
    const serializedError = hydratable(
      serializeError(
        error
          && typeof error === 'object'
          && 'toJSON' in error
          && typeof error.toJSON === 'function'
          ? (error.toJSON() as unknown)
          : error,
        { maxDepth: 2 }
      )
    )

    this.reactQueryDehydratedErrors.push({
      queryKey: queryOptions.queryKey,
      error: serializedError,
    })
    return { error }
  }
}

function hydratable<T>(input: T): T {
  if (!input) {
    return input === undefined ? ('[_undefined_]' as T) : input
  }

  if (typeof input === 'object') {
    if (Array.isArray(input)) {
      return input.map(hydratable) as T
    }

    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, hydratable(value)] as const)
    ) as T
  }

  if (typeof input === 'function') {
    return `[_function_: ${input.name || '_anonymous_'}]` as T
  }

  return input
}
