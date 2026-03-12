import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

const IS_STATIC_EXPORT = process.env.STATIC_EXPORT === '1'
export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/session
 * Returns 200 if the user is considered authenticated:
 * - LOCAL_ADMIN=1 (local dev, no password required), or
 * - Valid admin cookie from prior login.
 */
export async function GET() {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }

  if (process.env.LOCAL_ADMIN === '1') {
    return NextResponse.json({ ok: true })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (token && verifyAdminToken(token)) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
