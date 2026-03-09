import { NextResponse } from 'next/server'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

const IS_STATIC_EXPORT = process.env.STATIC_EXPORT === '1'
export const dynamic = 'force-static'
export async function POST() {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const root = process.cwd()
  try {
    const out = execSync('npm run registry:audit', {
      cwd: root,
      encoding: 'utf-8',
      maxBuffer: 512 * 1024,
    })
    return NextResponse.json({ ok: true, log: out })
  } catch (err: unknown) {
    const out = err && typeof err === 'object' && 'stdout' in err ? String((err as { stdout: unknown }).stdout) : ''
    const stderr = err && typeof err === 'object' && 'stderr' in err ? String((err as { stderr: unknown }).stderr) : ''
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({
      ok: false,
      log: (out || stderr || message).trim(),
      error: message,
    }, { status: 200 })
  }
}

