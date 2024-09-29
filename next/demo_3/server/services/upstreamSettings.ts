export interface IUpstreamSetting {
  upstream: string
  forwardHeaders?: boolean
  rewrites: (IUpstreamRewrite | string)[]
}

interface IUpstreamRewrite {
  prefix: string
  rewritePrefix: string
}

const upstreamSettings: IUpstreamSetting[] = [
  {
    upstream: process.env.SERVER_API_URL!,
    forwardHeaders: true,
    rewrites: [
      '/api/',
    ],
  },
]

export default upstreamSettings
