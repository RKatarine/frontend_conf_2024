import { NextApiRequest, NextApiResponse } from 'next'
import {register} from 'prom-client';

/*
  Это базовые метрики Node.js.
  Предолагается их расширение кастомными метриками вашего приложения.
*/
export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-type', register.contentType)
  res.send(await register.metrics())
}
