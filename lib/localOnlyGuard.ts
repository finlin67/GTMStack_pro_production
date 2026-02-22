/**
 * Fail-closed local-only guard for admin API routes.
 * Returns a 404 Response if the request is not from localhost in development,
 * or if NODE_ENV is production.
 */
import { NextRequest, NextResponse } from 'next/server'

export function localOnlyGuard(req: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const host = req.headers.get('host') ?? ''
  const hostname = host.split(':')[0]
  const allowed = ['localhost', '127.0.0.1', '::1']

  if (!allowed.includes(hostname)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return null
}
