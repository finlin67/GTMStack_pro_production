import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

const IS_STATIC_EXPORT = process.env.STATIC_EXPORT === '1'
export const dynamic = 'force-dynamic'
export async function GET() {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
