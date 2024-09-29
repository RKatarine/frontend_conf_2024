import type { FastifyInstance } from 'fastify'

import fastifyMetrics from 'fastify-metrics'
import { registry, REQUESTS_LATENCY_BUCKETS } from './custom'

export default function collectMetrics(fastify: FastifyInstance): void {
  void fastify.register(fastifyMetrics, {
    endpoint: '/_metrics',
    defaultMetrics: {
      enabled: true,
      register: registry,
      prefix: 'next_',
    },
    routeMetrics: {
      routeBlacklist: [
        '/__nextjs_*',
        '/_metrics',
        '/_healthz',
        '/_readyz',
        '/_heapdump',
      ],
      overrides: {
        histogram: {
          name: 'next_http_request_duration_seconds',
          buckets: REQUESTS_LATENCY_BUCKETS,
        },
      },
    },
  })
}
