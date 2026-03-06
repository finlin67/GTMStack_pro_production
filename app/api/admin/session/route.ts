import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

<<<<<<< HEAD
export const dynamic = 'force-dynamic'

=======
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
