/**
 * POST /api/animations/gen
 * Triggers `npm run gen:animations` on the local dev server.
 *
 * LOCAL-ONLY: returns 404 in production or from non-localhost hosts.
 */
import { NextRequest, NextResponse } from 'next/server'
import { execSync } from 'node:child_process'
import { localOnlyGuard } from '@/lib/localOnlyGuard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: NextRequest) {
  const guard = localOnlyGuard(req)
  if (guard) return guard

  try {
    const output = execSync('npm run gen:animations', {
      cwd: process.cwd(),
      timeout: 30_000,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    return NextResponse.json({ ok: true, output: output.trim() })
  } catch (err: unknown) {
    const e = err as { stdout?: string; stderr?: string; message?: string }
    return NextResponse.json(
      {
        ok: false,
        error: e.message ?? 'Unknown error',
        stdout: e.stdout ?? '',
        stderr: e.stderr ?? '',
      },
      { status: 500 }
    )
  }
}
