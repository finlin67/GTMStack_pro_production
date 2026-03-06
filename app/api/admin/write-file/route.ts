import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

<<<<<<< HEAD
export const dynamic = 'force-dynamic'

=======
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
const ALLOWED_PREFIXES = ['src/templates/', 'content/', 'src/content/']

function isPathAllowed(filePath: string): boolean {
  const normalized = path.normalize(filePath).replace(/\\/g, '/')
  const root = process.cwd()
  const full = path.join(root, normalized)
  const relative = path.relative(root, full)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return false
  const slash = relative.replace(/\\/g, '/')
  return ALLOWED_PREFIXES.some((p) => slash.startsWith(p))
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const filePath = typeof body.path === 'string' ? body.path.trim() : ''
  const content = typeof body.content === 'string' ? body.content : ''

  if (!filePath) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }

  if (!isPathAllowed(filePath)) {
    return NextResponse.json(
      { error: 'Path must be under src/templates/, content/, or src/content/' },
      { status: 400 }
    )
  }

  const root = process.cwd()
  const fullPath = path.join(root, filePath)

  try {
    const dir = path.dirname(fullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(fullPath, content, 'utf-8')
    return NextResponse.json({ ok: true, path: filePath })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Write failed', detail: message }, { status: 500 })
  }
}
