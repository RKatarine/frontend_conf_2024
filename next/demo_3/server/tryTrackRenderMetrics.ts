import { nextRenderHistogram } from './services/metrics/custom'
import type { IFastifyReply, IFastifyRequest } from './types'

export default function tryTrackRenderMetrics(
  req: IFastifyRequest['raw'],
  res: IFastifyReply['raw']
) {
  if ((req.isSSRRequest || req.isSSPRequest) && typeof res.apiTime === 'number') {
    const responseTime = Date.now() - req.startRequestTime
    const renderTime = responseTime - res.apiTime

    nextRenderHistogram
      .labels({
        path: req.urlForMetrics,
        type: req.isSSPRequest ? 'ssp' : 'ssr',
      })
      .observe(renderTime)
  }
}
