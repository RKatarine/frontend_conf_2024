import type { IReactQueryDehydrateResult } from './types'

const emptyArray = Object.freeze([] as never[]) as never[]

const defaultReactQueryDehydrateResult: IReactQueryDehydrateResult = Object.freeze({
  reactQueryDehydratedErrors: emptyArray,
  reactQueryDehydratedState: Object.freeze({
    mutations: emptyArray,
    queries: emptyArray,
  }),
})

export default defaultReactQueryDehydrateResult
