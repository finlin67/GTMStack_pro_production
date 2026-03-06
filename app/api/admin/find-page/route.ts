import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

function parseCsvRow(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') inQuotes = !inQuotes
    else if (inQuotes) cur += c
    else if (c === ',') {
      out.push(cur.trim())
      cur = ''
    } else cur += c
  }
  out.push(cur.trim())
  return out
}

/** Normalize route for comparison: leading slash, no trailing slash (except for "/"). */
function normalizeRoute(route: string): string {
  const r = (route || '').trim()
  if (!r) return ''
  const withLeading = r.startsWith('/') ? r : `/${r}`
  if (withLeading === '/') return '/'
  return withLeading.replace(/\/+$/, '')
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const routeParam = request.nextUrl.searchParams.get('route') ?? ''
  const route = normalizeRoute(routeParam)
  if (!route) {
    return NextResponse.json({ error: 'Missing or invalid route' }, { status: 400 })
  }

  const csvPath = path.join(process.cwd(), 'src', 'data', 'page-registry.csv')
  if (!fs.existsSync(csvPath)) {
    return NextResponse.json({ found: false, message: 'No registry yet.' }, { status: 200 })
  }

  const raw = fs.readFileSync(csvPath, 'utf-8')
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  if (lines.length < 2) {
    return NextResponse.json({ found: false, message: 'Registry is empty.' }, { status: 200 })
  }

  const header = parseCsvRow(lines[0])
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvRow(lines[i])
    const row: Record<string, string> = {}
    header.forEach((h, idx) => { row[h] = values[idx] ?? '' })
    if (normalizeRoute(row.route || '') === route) {
      return NextResponse.json({ found: true, page: row })
    }
  }

  return NextResponse.json({ found: false, message: 'This page is not in the registry yet.' }, { status: 200 })
}
