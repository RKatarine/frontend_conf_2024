import path from 'path'

import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'
import type { RawServerDefault } from 'fastify/types/utils'
import fastifyNextjs from '@fastify/nextjs'
import FastifyGracefulShutdown from 'fastify-graceful-shutdown'
import './loadEnvConfig'
import drawRoutes from './drawRoutes'
import serveStaticFiles from "./services/serveStaticFiles";
import collectMetrics from './services/metrics/plugin'
import apiUpstream from "./services/apiUpstream";


const isProduction = process.env.NODE_ENV === 'production'

const DEFAULT_PORT = 3000
const portArgIndex = process.argv.indexOf('-p')
const port = portArgIndex > -1 ? Number(process.argv[portArgIndex + 1]) : DEFAULT_PORT
const host = '0.0.0.0'

const fastifyInstance = fastify<RawServerDefault>({
    requestIdLogLabel: 'request_id',
    // Fix `Error: ERR_AVVIO_PLUGIN_TIMEOUT: plugin did not start in time`
    // https://github.com/fastify/fastify-nextjs/issues/88#issuecomment-632978084
    // https://github.com/fastify/fastify-nextjs/issues/57#issuecomment-672677531
    pluginTimeout:
        process.env.NODE_ENV === 'development'
            ? 10 * 60 * 1000 // eslint-disable-line @typescript-eslint/no-magic-numbers
            : 10 * 1000, // eslint-disable-line @typescript-eslint/no-magic-numbers
}) as FastifyInstance


collectMetrics(fastifyInstance)

void fastifyInstance
    .register(FastifyGracefulShutdown, {
        timeout: 3000,
    })
    .register(fastifyNextjs, {
        noServeAssets: true, // https://github.com/fastify/fastify-nextjs#assets-serving
        dev: !isProduction,
        customServer: true,
        port,
        hostname: host,
    })
    .after((error) => {
        if (error) {
            throw error
        }

        drawRoutes(fastifyInstance)
    })

// Upstream for use api, legacy redirect-actions and micro-services under one domain.
apiUpstream(fastifyInstance)

// Serve legacy public folder for development and stagings.
if (process.env.SERVER_SERVE_STATIC_PATH) {
    const staticPath = path.isAbsolute(process.env.SERVER_SERVE_STATIC_PATH)
        ? process.env.SERVER_SERVE_STATIC_PATH
        : path.join(__dirname, process.env.SERVER_SERVE_STATIC_PATH)

    serveStaticFiles(fastifyInstance, staticPath)
}

// Pretty print routes for additional eyes control.
fastifyInstance.ready(() => {
    const routes = fastifyInstance.printRoutes({
        commonPrefix: false,
    })

    const routesLines = routes.split('\n').length

    const routesMessage =
        process.env.SERVER_PRINT_ROUTES_MAX_LINES
        && routesLines > parseInt(process.env.SERVER_PRINT_ROUTES_MAX_LINES, 10)
            ? `Short notice about ${routesLines} routes lines.`
            : routes

    console.log('Server routes: ', `${routesMessage.includes('\n') ? '\n' : ''}${routesMessage}`)
})

// Start server.
fastifyInstance.listen(
    {
        port,
        host,
    },
    (error, address) => {
        if (error) {
            throw error
        }

        console.log('Server started', address)
    }
)

// https://blog.heroku.com/best-practices-nodejs-errors#javascript-error-events
process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error)
    process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('unhandledRejection', reason as Error, promise)
    process.exit(1)
})
