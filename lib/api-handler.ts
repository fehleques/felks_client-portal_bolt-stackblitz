import { NextRequest, NextResponse } from 'next/server'
import { logger } from './logger'

export type RouteHandler = (req: NextRequest) => Promise<NextResponse>

export function withLogging(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest) => {
    logger.info(`${req.method} ${req.nextUrl.pathname}`)
    try {
      return await handler(req)
    } catch (err) {
      logger.error('API route error', err)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}
