import { loadEnvConfig } from '@next/env'

// Set default NODE_ENV as 'development' for load .env-files below.
if (!process.env.NODE_ENV) {
  // @ts-ignore Need set default NODE_ENV.
  process.env.NODE_ENV = 'development'
}

const isProduction = process.env.NODE_ENV === 'production'

loadEnvConfig('./', !isProduction, {
  info: (...args) => (isProduction ? undefined : console.info('INFO', ...args)),
  error: (...args) => (isProduction ? undefined : console.error('ERROR', ...args)),
})
