import type {FastifyInstance, FastifyNextCallback} from 'fastify'
import type {NextServer} from 'next/dist/server/next'
import fastifyNextCallback from "./fastifyNextCallback";
import type {IDeprivatizedNextAppServer, IFastifyReply, IFastifyRequest} from "./types";
import requestAsyncLocalStorage, {type IRequestAsyncLocalStorageContext} from "./requestAsyncLocalStorage";

const logResources = process.env.NODE_ENV === 'development'

export default function drawRoutes(fastifyInstance: FastifyInstance): void {
    fastifyInstance.next('/_next/data/*', customServerCallback as FastifyNextCallback)
    fastifyInstance.next(
        '/_next/static/*',
        logResources ? (customServerCallback as FastifyNextCallback) : undefined
    )
    fastifyInstance.next(
        '/__nextjs_*',
        logResources ? (customServerCallback as FastifyNextCallback) : undefined
    )
    fastifyInstance.next('/*', customServerCallback as FastifyNextCallback)
}

async function customServerCallback(
    app: NextServer,
    req: IFastifyRequest,
    reply: IFastifyReply
): Promise<void> {
    try {
        const requestAsyncLocalStorageContext: IRequestAsyncLocalStorageContext = {
            req: req.raw,
        }

        await requestAsyncLocalStorage.run(
            requestAsyncLocalStorageContext,
            fastifyNextCallback,
            app as unknown as IDeprivatizedNextAppServer,
            req,
            reply
        )
    } catch (error) {
        throw error
    }
}