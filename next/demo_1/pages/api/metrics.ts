import { NextApiRequest, NextApiResponse } from 'next'
// import {register, collectDefaultMetrics} from "prom-client";
//
// collectDefaultMetrics({
//   prefix: `${process.env.NEXT_PUBLIC_APP_PREFIX}_`,
// })
//
// export default async function handler(_: NextApiRequest, res: NextApiResponse) {
//   res.setHeader('Content-type', register.contentType)
//   res.send(await register.metrics())
// }

import {registry as register} from '@/src/app/metrics/custom'
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-type', register.contentType)
  res.send(await register.metrics())
}