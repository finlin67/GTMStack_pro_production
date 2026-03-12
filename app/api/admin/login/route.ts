import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

const IS_STATIC_EXPORT = process.env.STATIC_EXPORT === '1'
export const dynamic = 'force-dynamic'
const TTL_MS = 24 * 60 * 60 * 1000 // 24h

export async function POST(request: NextRequest) {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }
  const body = await request.json().catch(() => ({}))
  const password = typeof body.password === 'string' ? body.password : ''
  const expected = process.env.ADMIN_PASSWORD || ''

  if (!expected) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 })
  }
  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = signAdminToken()
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TTL_MS / 1000,
    path: '/',
  })
  return NextResponse.json({ ok: true })
}

