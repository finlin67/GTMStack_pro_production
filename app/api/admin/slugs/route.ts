import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'
import fs from 'node:fs'
import path from 'node:path'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const industries: string[] = []
  const expertise: string[] = []
  const caseStudies: string[] = []
  const root = process.cwd()

  function extractSlugs(raw: string): string[] {
    const re = /slug:\s*['"]([^'"]+)['"]/g
    const out: string[] = []
    let m: RegExpExecArray | null
    while ((m = re.exec(raw)) !== null) out.push(m[1])
    return out
  }

  try {
    const indPath = path.join(root, 'content', 'industries.ts')
    if (fs.existsSync(indPath)) {
      const raw = fs.readFileSync(indPath, 'utf-8')
      industries.push(...extractSlugs(raw))
    }
  } catch {
    // ignore
  }

  try {
    const expPath = path.join(root, 'content', 'expertise.ts')
    if (fs.existsSync(expPath)) {
      const raw = fs.readFileSync(expPath, 'utf-8')
      expertise.push(...extractSlugs(raw))
    }
  } catch {
    // ignore
  }

  try {
    const csPath = path.join(root, 'content', 'case-studies.ts')
    if (fs.existsSync(csPath)) {
      const raw = fs.readFileSync(csPath, 'utf-8')
      caseStudies.push(...extractSlugs(raw))
    }
  } catch {
    // ignore
  }

  return NextResponse.json({
    industries: Array.from(new Set(industries)).sort(),
    expertise: Array.from(new Set(expertise)).sort(),
    caseStudies: Array.from(new Set(caseStudies)).sort(),
  })
}
