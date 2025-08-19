import { z } from 'zod'
import { logger } from './logger'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const formatted = _env.error.flatten().fieldErrors
  logger.error('Invalid environment variables', formatted)
  const message = Object.entries(formatted)
    .map(([key, value]) => `${key}: ${value?.join(', ')}`)
    .join('; ')
  throw new Error(`Missing or invalid environment variables: ${message}`)
}

export const env = _env.data
