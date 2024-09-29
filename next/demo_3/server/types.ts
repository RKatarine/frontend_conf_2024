import type {
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from 'fastify/types/utils'
import type { RouteGenericInterface } from 'fastify/types/route'
import type { FastifyReply, FastifyRequest, RawReplyDefaultExpression } from 'fastify'
// eslint-disable-next-line import/no-duplicates
import type { Redirect } from 'next'
import type { NextConfigComplete } from 'next/dist/server/config-shared'
import type { RouteMatch } from 'next/dist/server/future/route-matches/route-match'
import type { RouteMatcher } from 'next/dist/server/future/route-matchers/route-matcher'
// eslint-disable-next-line import/no-duplicates
import type { NextServer } from 'next/dist/server/next'
import type { CustomRoutes } from 'next/dist/lib/load-custom-routes'
import type { RouteMatchFn } from 'next/dist/shared/lib/router/utils/route-matcher'
import type { RouteMatcherManager } from 'next/dist/server/future/route-matcher-managers/route-matcher-manager'

import type DevServer from 'next/dist/server/dev/next-dev-server'
import type { RenderServer } from 'next/dist/server/lib/router-server'

export type IFastifyRequest<
  RawServer extends RawServerBase = RawServerDefault
> = FastifyRequest<
  RouteGenericInterface,
  RawServer,
  RawRequestDefaultExpression<RawServer> & ICustomServerForwardedDataCommon
>

export type IFastifyReply<RawServer extends RawServerBase = RawServerDefault> = FastifyReply<
  RawServer,
  RawRequestDefaultExpression<RawServer> & ICustomServerForwardedDataCommon,
  RawReplyDefaultExpression<RawServer> & ICustomServerBackwardData
>

interface ICustomServerForwardedDataCommon {
  startRequestTime: number
  apiTimeInCustomServer: number
  isAsyncRevalidation?: boolean
  isSSPRequest?: boolean
  isSSRRequest?: boolean
  isNextRedirect?: boolean
  isNextApiRoute?: boolean
  isErrorPage?: boolean
  isClosed?: boolean
  isEnded?: boolean
  urlForMetrics?: string
  originalUserAgent?: string // Used for full-string render trick. See usage for details.
}

// Properties possible returned from next-app back to custom server.
export interface ICustomServerBackwardData {
  apiTime?: number
}

type DynamicRoutes = {
  match: RouteMatchFn
  page: string
  re: RegExp
}[]

// Private Next.js interface
interface RouteMatchers {
  static: readonly RouteMatcher[]
  dynamic: readonly RouteMatcher[]
  duplicates: Record<string, readonly RouteMatcher[]>
}

interface IDeprivatizedRouteMatcherManager extends RouteMatcherManager {
  matchers: RouteMatchers
}

// @ts-expect-error Need access to protected and private properties.
export interface IDeprivatizedNextDevServer extends DevServer {
  distDir: string
  nextConfig: NextConfigComplete
  customRoutes: CustomRoutes
  dynamicRoutes: DynamicRoutes
  matchers: IDeprivatizedRouteMatcherManager
  buildId: string
  ensurePage(opts: {
    page: string
    clientOnly: boolean
    appPaths?: string[] | null
    match?: RouteMatch
  }): Promise<void>
}

export interface IDeprivatizedNextAppServer extends Omit<NextServer, 'server'> {
  renderServer: RenderServer & { server: IDeprivatizedNextDevServer }
}
