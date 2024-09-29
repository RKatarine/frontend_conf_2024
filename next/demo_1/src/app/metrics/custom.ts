import promClient, { Registry, collectDefaultMetrics } from 'prom-client'
export const registry = new Registry()
export const registers = [registry]

collectDefaultMetrics({
  prefix: `${process.env.NEXT_PUBLIC_APP_PREFIX}_`,
})
export const nextGetSSRPropsHistogram = new promClient.Histogram({
  name: `${process.env.NEXT_PUBLIC_APP_PREFIX}_get_server_side_props_time`,
  help: 'ssr/ssp getSSR time',
  registers,
  labelNames: ['path', 'type'],
})