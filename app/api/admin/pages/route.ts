import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { isAdminAuthorized, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

const IS_STATIC_EXPORT = process.env.STATIC_EXPORT === '1'
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

function getFilesystemRoutes(dir: string, baseDir: string): string[] {
  let results: string[] = []
  if (!fs.existsSync(dir)) return results

  const list = fs.readdirSync(dir)
  for (const file of list) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesystemRoutes(fullPath, baseDir))
    } else if (file === 'page.tsx') {
      let relativePath = path.relative(baseDir, dir)
      // Normalize path
      let route = '/' + relativePath.replace(/\\/g, '/')
      if (route === '/.') route = '/'
      // Handle Next.js route groups (round brackets)
      route = route.replace(/\/\([^)]+\)/g, '')
      if (route === '') route = '/'
      results.push(route)
    }
  }
  return results
}

export async function GET() {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!isAdminAuthorized(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 1. Registry Data
  const registryPath = path.join(process.cwd(), 'src', 'data', 'page-registry.csv')
  let registryRows: Array<Record<string, string>> = []
  if (fs.existsSync(registryPath)) {
    const raw = fs.readFileSync(registryPath, 'utf-8')
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (lines.length >= 1) {
      const header = parseCsvRow(lines[0])
      registryRows = lines.slice(1).map((line) => {
        const values = parseCsvRow(line)
        const row: Record<string, string> = {}
        header.forEach((h, i) => { row[h] = values[i] ?? '' })
        return row
      })
    }
  }

  // 2. Sitemap Data
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.csv')
  let sitemapRows: Array<Record<string, string>> = []
  if (fs.existsSync(sitemapPath)) {
    const raw = fs.readFileSync(sitemapPath, 'utf-8')
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    if (lines.length >= 1) {
      const header = parseCsvRow(lines[0])
      sitemapRows = lines.slice(1).map((line) => {
        const values = parseCsvRow(line)
        const row: Record<string, string> = {}
        header.forEach((h, i) => { row[h] = values[i] ?? '' })
        return row
      })
    }
  }

  // 3. Filesystem Routes
  const fsRoutes = getFilesystemRoutes(path.join(process.cwd(), 'app'), path.join(process.cwd(), 'app'))

  // 4. Merge
  const allRoutes = new Set([
    ...registryRows.map(r => r.route),
    ...sitemapRows.map(r => {
      try {
        const url = new URL(r.URL)
        return url.pathname.replace(/\/$/, '') || '/'
      } catch {
        return r.URL
      }
    }),
    ...fsRoutes
  ])

  const merged = Array.from(allRoutes).map(route => {
    const registry = registryRows.find(r => r.route === route)
    const sitemap = sitemapRows.find(r => {
      try {
        const url = new URL(r.URL)
        const path = url.pathname.replace(/\/$/, '') || '/'
        return path === route
      } catch {
        return r.URL === route
      }
    })
    const inFs = fsRoutes.includes(route)

    let status = 'IN_REGISTRY'
    if (registry && !sitemap) status = 'IN_REGISTRY_MISSING_SITEMAP'
    else if (!registry && sitemap) status = 'IN_SITEMAP_MISSING_REGISTRY'
    else if (!registry && !sitemap && inFs) status = 'IN_FS_ONLY' // Not explicitly requested but useful

    // Check broken mapping
    if (registry) {
      const { templateId, contentKey } = registry
      if (!templateId || !contentKey) {
        status = 'BROKEN_MAPPING'
      }
    }

    return {
      route,
      pageTitle: registry?.pageTitle || sitemap?.['Page Title'] || '',
      templateId: registry?.templateId || '',
      contentKey: registry?.contentKey || '',
      fileRef: registry?.fileRef || '',
      status,
      inRegistry: !!registry,
      inSitemap: !!sitemap,
      inFs
    }
  })

  return NextResponse.json({ pages: merged })
}
