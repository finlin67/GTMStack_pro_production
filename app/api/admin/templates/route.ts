import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { cookies } from 'next/headers'
import { isAdminAuthorized, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

const IS_STATIC_EXPORT = process.env.STATIC_EXPORT === '1'
export const dynamic = 'force-dynamic'
const REG_PATH = path.join(process.cwd(), 'src', 'templates', 'registry.ts')

async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  return isAdminAuthorized(token)
}

function normalizeImportPath(p: string): string {
  const trimmed = (p || '').trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('@/')) return trimmed.replace(/\.(ts|tsx)$/, '')
  if (trimmed.startsWith('src/')) return ('@/' + trimmed).replace(/\.(ts|tsx)$/, '')
  if (trimmed.startsWith('/')) return ('@' + trimmed).replace(/\.(ts|tsx)$/, '')
  return trimmed.replace(/\.(ts|tsx)$/, '')
}

function parseRegistry(text: string) {
  const imports = new Map<string, string>() // componentName -> importPath
  for (const line of text.split('\n')) {
    const m = line.match(/^import\s+([A-Za-z0-9_]+)\s+from\s+'([^']+)'/)
    if (m) imports.set(m[1], m[2])
  }

  const templateById: Array<{ templateId: string; componentName: string; importPath?: string }> = []
  const mapMatch = text.match(/export const TEMPLATE_BY_ID[\s\S]*?=\s*\{([\s\S]*?)\n\}/)
  const mapBody = mapMatch?.[1] ?? ''
  const entryRe = /'([^']+)':\s*([A-Za-z0-9_]+),/g
  let m: RegExpExecArray | null
  while ((m = entryRe.exec(mapBody)) !== null) {
    const templateId = m[1]
    const componentName = m[2]
    templateById.push({ templateId, componentName, importPath: imports.get(componentName) })
  }

  templateById.sort((a, b) => a.templateId.localeCompare(b.templateId))
  return { templateById }
}

function patchRegistry(opts: { templateId: string; importPath: string; componentName: string }) {
  const original = fs.readFileSync(REG_PATH, 'utf-8')

  if (original.includes(`'${opts.templateId}':`)) {
    return { ok: false as const, error: `templateId '${opts.templateId}' already exists.` }
  }

  const importPath = normalizeImportPath(opts.importPath)
  const componentName = (opts.componentName || '').trim()
  const templateId = (opts.templateId || '').trim()
  if (!importPath || !componentName || !templateId) {
    return { ok: false as const, error: 'Missing required fields.' }
  }

  let updated = original

  // Add import if missing
  if (!updated.includes(`from '${importPath}'`)) {
    const lines = updated.split('\n')
    const lastImport = lines.reduce((acc, l, i) => (l.startsWith('import ') ? i : acc), 0)
    lines.splice(lastImport + 1, 0, `import ${componentName} from '${importPath}'`)
    updated = lines.join('\n')
  }

  // Add to TemplateComponent union if missing
  if (!updated.includes(`| typeof ${componentName}`)) {
    updated = updated.replace(
      /(export type TemplateComponent =[\s\S]*?)(\n\n)/,
      (_, block, end) => block + `\n  | typeof ${componentName}` + end
    )
  }

  // Insert mapping line before closing brace of TEMPLATE_BY_ID
  const lines = updated.split('\n')
  const mapStart = lines.findIndex((l) => l.includes('TEMPLATE_BY_ID'))
  if (mapStart === -1) {
    return { ok: false as const, error: 'Cannot find TEMPLATE_BY_ID anchor.' }
  }
  const closeIdx = lines.findIndex((l, i) => i > mapStart && l.trim() === '}')
  if (closeIdx === -1) {
    return { ok: false as const, error: 'Cannot find TEMPLATE_BY_ID closing brace.' }
  }
  lines.splice(closeIdx, 0, `  '${templateId}': ${componentName},`)
  updated = lines.join('\n')

  return { ok: true as const, updated }
}

function patchRegistryOverwrite(opts: { templateId: string; importPath: string; componentName: string }) {
  const original = fs.readFileSync(REG_PATH, 'utf-8')
  if (!original.includes(`'${opts.templateId}':`)) {
    return { ok: false as const, error: `templateId '${opts.templateId}' does not exist. Use POST without overwrite to add.` }
  }
  const importPath = normalizeImportPath(opts.importPath)
  const componentName = (opts.componentName || '').trim()
  const templateId = (opts.templateId || '').trim()
  if (!importPath || !componentName || !templateId) {
    return { ok: false as const, error: 'Missing required fields.' }
  }
  const entryRe = new RegExp(`(\\s*)'${templateId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}':\\s*([A-Za-z0-9_]+),`)
  const match = original.match(entryRe)
  if (!match) return { ok: false as const, error: 'Could not find existing mapping line.' }
  let updated = original.replace(entryRe, `$1'${templateId}': ${componentName},`)
  if (!updated.includes(`from '${importPath}'`)) {
    const lines = updated.split('\n')
    const lastImport = lines.reduce((acc, l, i) => (l.startsWith('import ') ? i : acc), 0)
    lines.splice(lastImport + 1, 0, `import ${componentName} from '${importPath}'`)
    updated = lines.join('\n')
  }
  if (!updated.includes(`| typeof ${componentName}`)) {
    updated = updated.replace(
      /(export type TemplateComponent =[\s\S]*?)(\n\n)/,
      (_, block, end) => block + `\n  | typeof ${componentName}` + end
    )
  }
  return { ok: true as const, updated }
}

export async function GET() {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }
  if (!(await requireAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!fs.existsSync(REG_PATH)) return NextResponse.json({ templates: [] })
  const text = fs.readFileSync(REG_PATH, 'utf-8')
  const parsed = parseRegistry(text)
  return NextResponse.json({ templates: parsed.templateById })
}

export async function POST(request: NextRequest) {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }
  if (!(await requireAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!fs.existsSync(REG_PATH)) return NextResponse.json({ error: 'Missing registry.ts' }, { status: 500 })

  const body = await request.json().catch(() => ({}))
  const templateId = typeof body.templateId === 'string' ? body.templateId : ''
  const importPath = typeof body.importPath === 'string' ? body.importPath : ''
  const componentName = typeof body.componentName === 'string' ? body.componentName : ''
  const overwrite = body.overwrite === true

  const res = overwrite
    ? patchRegistryOverwrite({ templateId, importPath, componentName })
    : patchRegistry({ templateId, importPath, componentName })
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 409 })

  try {
    fs.writeFileSync(REG_PATH, res.updated, 'utf-8')
    const log = execSync('npm run gen:registry', { cwd: process.cwd(), encoding: 'utf-8', maxBuffer: 512 * 1024 })
    return NextResponse.json({ ok: true, log })
  } catch (err: unknown) {
    const out = err && typeof err === 'object' && 'stdout' in err ? String((err as { stdout: unknown }).stdout) : ''
    const stderr = err && typeof err === 'object' && 'stderr' in err ? String((err as { stderr: unknown }).stderr) : ''
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ ok: false, error: message, log: (out || stderr || message).trim() }, { status: 500 })
  }
}


