import { NextApiRequest, NextApiResponse } from 'next'

const STATUS_OK = 200

/*
  Это базовый ready endpoint.
  Необходимо определить, какие критерии должны выполняться, чтобы ваш сервис считался ready.
  И отразить это в данном endpoint'е
*/
export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(STATUS_OK).send({
    message: 'OK',
  })
}
