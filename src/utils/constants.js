import { env } from '~/config/environment'

export const WHITELIST_DOMAINS = [
  'http://localhost:5173'
]

export const WEBSITE_DOMAIN =
  env.BUILD_MODE === 'dev'
    ? env.WEBSITE_DOMAIN_DEV
    : env.WEBSITE_DOMAIN_PRODUCTION