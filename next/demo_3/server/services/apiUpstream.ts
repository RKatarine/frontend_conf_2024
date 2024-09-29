import type { FastifyHttpProxyOptions } from '@fastify/http-proxy'
import proxy from '@fastify/http-proxy'
import type { FastifyInstance } from 'fastify'
import upstreamSettings, {type IUpstreamSetting} from "./upstreamSettings";

export default function apiUpstream(fastifyInstance: FastifyInstance): void {
    upstreamSettings.forEach(({ upstream, rewrites, forwardHeaders }) => {
        rewrites.forEach((rewrite) => {
            const prefix = typeof rewrite === 'string' ? rewrite : rewrite.prefix
            const rewritePrefix = typeof rewrite === 'string' ? rewrite : rewrite.rewritePrefix

            registerUpstream(fastifyInstance, {
                upstream,
                prefix,
                rewritePrefix,
                forwardHeaders,
            })
        })
    })
}


type IUpstreamOptions = Required<
    Pick<FastifyHttpProxyOptions, 'upstream' | 'prefix' | 'rewritePrefix'>
> &
    Pick<FastifyHttpProxyOptions, 'replyOptions' | 'undici'> &
    Pick<IUpstreamSetting, 'forwardHeaders'>

function registerUpstream(
    fastifyInstance: FastifyInstance,
    upstreamOptions: IUpstreamOptions
): void {
    const { forwardHeaders, ...options } = upstreamOptions

    const proxyOptions: FastifyHttpProxyOptions = {
        ...options,
        replyOptions: {
            retriesCount: 1,
            ...options.replyOptions,
        },
    }

    void fastifyInstance.register(proxy, proxyOptions)
}