import { AsyncLocalStorage } from 'async_hooks'

import type { IFastifyRequest } from './types'

export interface IRequestAsyncLocalStorageContext {
  req: IFastifyRequest['raw']
}

const requestAsyncLocalStorage = new AsyncLocalStorage<IRequestAsyncLocalStorageContext>()

export default requestAsyncLocalStorage
