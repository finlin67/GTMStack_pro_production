import { NextResponse } from 'next/server'
import { execSync } from 'node:child_process'
import { assertLocalOnly } from '@/src/lib/localOnly'

export const dynamic = 'force-static'

export async function POST() {
  assertLocalOnly()
  try {
    execSync('npm run gen:animations', { cwd: process.cwd(), stdio: 'pipe', env: process.env })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed'
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
