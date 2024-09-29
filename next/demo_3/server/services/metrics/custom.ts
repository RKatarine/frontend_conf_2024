import promClient, { Registry } from 'prom-client'

/**
 * For Next.js render part (SSR/SSP) metrics collected in milliseconds
 * Default buckets of promClient assumes that values in seconds
 * [5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560]
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const RENDER_MILLISECONDS_BUCKETS = promClient.exponentialBuckets(5, 2, 10)
/**
 * For cache metrics collected in milliseconds
 * Default buckets of promClient assumes that values in seconds
 * [5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560]
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const CACHE_MILLISECONDS_BUCKETS = promClient.exponentialBuckets(5, 2, 10)

/**
 * For request latency metrics collection in seconds
 *
 * [0.04, 0.08, 0.16, 0.32, 0.64, 1.28, 2.56, 5.12, 10.24, 20.48]
 */
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const REQUESTS_LATENCY_BUCKETS = promClient.exponentialBuckets(0.04, 2, 10)

export const registry = new Registry()
export const registers = [registry]

/**
 * API Cache Metrics
 */
export const apiCacheRequestHistogram = new promClient.Histogram({
  name: 'next_api_cache_request_time',
  help: 'api cache request time',
  buckets: CACHE_MILLISECONDS_BUCKETS,
  registers,
  // operation: 'read' | 'write'
  labelNames: ['ns', 'operation'],
})
export const apiCacheCounter = new promClient.Counter({
  name: 'next_api_cache_event',
  help: 'api cache event',
  registers,
  // event: 'hit' | 'miss' | 'revalidation' | 'error' | 'revalidationError'
  labelNames: ['ns', 'event'],
})

/**
 * SSR Cache Metrics
 */
export const ssrCacheRequestHistogram = new promClient.Histogram({
  name: 'next_ssr_cache_request_time',
  help: 'ssr cache request time',
  buckets: CACHE_MILLISECONDS_BUCKETS,
  registers,
  // operation: 'read' | 'write'
  labelNames: ['ns', 'operation'],
})
export const ssrCacheCounter = new promClient.Counter({
  name: 'next_ssr_cache_event',
  help: 'ssr cache event',
  registers,
  // event: 'hit' | 'miss' | 'revalidation' | 'error' | 'revalidationError'
  labelNames: ['ns', 'event'],
})
export const ssrCacheURLCounter = new promClient.Counter({
  name: 'next_ssr_cache_url_count',
  help: 'ssr cache count by url and event',
  registers,
  // event: 'hit' | 'miss' | 'revalidation' | 'error' | 'revalidationError'
  labelNames: ['url', 'event'],
})
export const instanceCacheSizeGauge = new promClient.Gauge({
  name: 'next_instance_cache_size',
  help: 'instance cache size',
  registers,
  labelNames: ['ns'],
})

/**
 * Next.js processing
 */
export const nextRenderHistogram = new promClient.Histogram({
  name: 'next_render_time',
  help: 'ssr/ssp render time',
  buckets: RENDER_MILLISECONDS_BUCKETS,
  registers,
  labelNames: ['path', 'type'],
})
export const dontPreloadStateCounter = new promClient.Counter({
  name: 'next_dont_preload_state_count',
  help: 'dont preloadState count by path and reason',
  registers,
  labelNames: ['path', 'reason'],
})
export const errorUnderNextCounter = new promClient.Counter({
  name: 'error_under_next_count',
  help: 'error under next count',
  registers,
  labelNames: ['url', 'level'],
})

/**
 * API metrics
 */
export const apiRequestTimeHistogram = new promClient.Histogram({
  name: 'next_api_request_time',
  help: 'api request times',
  registers,
  labelNames: ['url'],
})
export const apiRequestRetryCounter = new promClient.Counter({
  name: 'next_api_retries_count',
  help: 'api retries count',
  registers,
  labelNames: ['url', 'reason'],
})
export const apiRequestErrorCounter = new promClient.Counter({
  name: 'next_api_errors_count',
  help: 'api errors count',
  registers,
  labelNames: ['url', 'reason'],
})
export const apiCircuitBreakerEventsCounter = new promClient.Counter({
  name: 'next_api_circuit_breaker_events_count',
  help: 'api circuit-breaker all events count',
  registers,
  labelNames: ['name', 'event'],
})
export const closedRequestsCounter = new promClient.Counter({
  name: 'closed_requests_count',
  help: 'closed requests count',
  registers,
  labelNames: ['url', 'phase'],
})
export const userAgentDetectionsCounter = new promClient.Counter({
  name: 'user_agent_detections_count',
  help: 'user agent detections count',
  registers,
  labelNames: [
    'isBot',
    'deviceType',
    'clientType',
    'clientName',
  ],
})
export const upstreamCounter = new promClient.Counter({
  name: 'next_upstream_count',
  help: 'upstream requests results count',
  registers,
  labelNames: ['event', 'prefix'],
})
