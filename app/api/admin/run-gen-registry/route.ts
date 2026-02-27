import { NextResponse } from 'next/server'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const root = process.cwd()
    const log = execSync('npm run gen:registry', {
      cwd: root,
      encoding: 'utf-8',
      maxBuffer: 512 * 1024,
    })
    return NextResponse.json({ ok: true, log })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const stderr = err && typeof err === 'object' && 'stderr' in err ? String((err as { stderr: unknown }).stderr) : ''
    return NextResponse.json(
      { ok: false, error: message, log: stderr || message },
      { status: 500 }
    )
  }
}
