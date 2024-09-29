import {checkIsStaticResourcePath} from './helpers'

import render from './render'
import type {
    IDeprivatizedNextAppServer,
    IFastifyReply,
    IFastifyRequest,
} from './types'


export default async function fastifyNextCallback(
    app: IDeprivatizedNextAppServer,
    req: IFastifyRequest,
    reply: IFastifyReply
): Promise<void> {
    req.raw.startRequestTime = Date.now()

    const path = req.url

    let getUrlForMetrics = () => path;

    const isStaticFileRequest = checkIsStaticResourcePath(path)

    if (process.env.APP_ENV !== 'development' && isStaticFileRequest) {
        console.warn(`Node application serve the static files in production mode. path: ${path}`)
    }

    /**
     * Used for fastify-metrics as route label.
     * @see ./server/custom/services/metrics/fastify-metrics/fastify-metrics.ts:325
     */
    // eslint-disable-next-line require-atomic-updates
    req.raw.urlForMetrics = getUrlForMetrics()

    await render(app, req, reply, path)

    // Request end logging. responseTime in ms
    const responseTime = Date.now() - req.raw.startRequestTime

}
