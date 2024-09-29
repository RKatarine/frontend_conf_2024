import fs from 'fs'

import fastifyStatic from '@fastify/static'
import type { FastifyInstance } from 'fastify'


export default function serveStaticFiles(
  fastifyInstance: FastifyInstance,
  publicPath: string
): void {
  console.info(`use @fastify/static with publicPath: '${publicPath}'`)

  if (!fs.statSync(publicPath).isDirectory()) {
    throw Error(`'${publicPath}' is not directory!`)
  }

  void fastifyInstance.register(fastifyStatic, {
    root: publicPath,
    wildcard: false,
  })
}
