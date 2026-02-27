import { NextRequest, NextResponse } from 'next/server'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import { cookies } from 'next/headers'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

const REG_PATH = path.join(process.cwd(), 'src', 'templates', 'registry.ts')
const FALLBACK_TEMPLATE_FILE = 'src/templates/FallbackTemplate.tsx'

function getRegisteredTemplateIds(): Set<string> {
  if (!fs.existsSync(REG_PATH)) return new Set(['base.fallback'])
  const text = fs.readFileSync(REG_PATH, 'utf-8')
  const mapMatch = text.match(/export const TEMPLATE_BY_ID[\s\S]*?=\s*\{([\s\S]*?)\n\}/)
  const mapBody = mapMatch?.[1] ?? ''
  const ids = new Set<string>()
  const entryRe = /'([^']+)':\s*[A-Za-z0-9_]+,/g
  let m: RegExpExecArray | null
  while ((m = entryRe.exec(mapBody)) !== null) ids.add(m[1])
  return ids
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const route = typeof body.route === 'string' ? body.route.trim() : ''
  let templateId = typeof body.templateId === 'string' ? body.templateId.trim() : ''
  const contentKey = typeof body.contentKey === 'string' ? body.contentKey.trim() : ''
  let templateFile = typeof body.templateFile === 'string' ? body.templateFile.trim() : ''
  const contentFile = typeof body.contentFile === 'string' ? body.contentFile.trim() : ''
  const contentExport = typeof body.contentExport === 'string' ? body.contentExport.trim() || undefined : undefined
  const pageTitle = typeof body.pageTitle === 'string' ? body.pageTitle.trim() : ''
  const theme = typeof body.theme === 'string' ? body.theme.trim() : ''
  const heroVisualId = typeof body.heroVisualId === 'string' ? body.heroVisualId.trim() : ''

  if (!route || !contentKey || !contentFile) {
    return NextResponse.json(
      { error: 'Missing required: route, contentKey, contentFile' },
      { status: 400 }
    )
  }

  if (!templateId) templateId = 'base.fallback'
  if (templateId === 'base.fallback') templateFile = templateFile || FALLBACK_TEMPLATE_FILE

  if (!templateFile) {
    return NextResponse.json(
      { error: 'Missing required: templateFile (or use templateId base.fallback to detach)' },
      { status: 400 }
    )
  }

  const registeredIds = getRegisteredTemplateIds()
  if (!registeredIds.has(templateId)) {
    return NextResponse.json(
      {
        error: `Template "${templateId}" is not in the registry. Add it under Admin → Templates first, or choose another template.`,
      },
      { status: 400 }
    )
  }

  const root = process.cwd()
  const scriptPath = path.join(root, 'scripts', 'page-upsert.mjs')
  const args = [
    scriptPath,
    '--route', route,
    '--templateId', templateId,
    '--contentKey', contentKey,
    '--templateFile', templateFile,
    '--contentFile', contentFile,
  ]
  if (contentExport) args.push('--contentExport', contentExport)
  if (pageTitle) args.push('--pageTitle', pageTitle)
  if (theme) args.push('--theme', theme)
  if (heroVisualId) args.push('--heroVisualId', heroVisualId)

  const result = spawnSync('node', args, {
    cwd: root,
    encoding: 'utf-8',
    shell: false,
  })

  if (result.status !== 0) {
    const errorDetail = result.stderr || result.stdout || 'Unknown error'
    return NextResponse.json(
      { error: 'page:upsert failed', detail: errorDetail },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true, log: (result.stdout || '').trim() })
}
