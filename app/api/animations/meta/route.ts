/**
 * GET  /api/animations/meta  — returns merged catalog (generated + overrides)
 * POST /api/animations/meta  — upserts one override entry by id
 *
 * LOCAL-ONLY: returns 404 in production or from non-localhost hosts.
 */
import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { localOnlyGuard } from '@/lib/localOnlyGuard'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const ROOT = process.cwd()
const OVERRIDES_JSON = path.join(ROOT, 'src', 'data', 'animationMeta.overrides.json')
const CATALOG_PATH = path.join(ROOT, 'src', 'data', 'animationCatalog.generated.ts')

interface AnimationMetaOverride {
  title?: string
  description?: string
  keywords?: string[]
  repoUrl?: string
  thumbnailSrc?: string
}

function readOverrides(): Record<string, AnimationMetaOverride> {
  if (!fs.existsSync(OVERRIDES_JSON)) return {}
  try {
    return JSON.parse(fs.readFileSync(OVERRIDES_JSON, 'utf8')) as Record<string, AnimationMetaOverride>
  } catch {
    return {}
  }
}

/** Parse ANIMATION_CATALOG from the generated .ts source file. */
function readCatalog(): Array<{ id: string; title: string; thumbnailSrc: string; repoUrl?: string; usedOnPages: boolean }> {
  if (!fs.existsSync(CATALOG_PATH)) return []
  const raw = fs.readFileSync(CATALOG_PATH, 'utf8')
  const items: Array<{ id: string; title: string; thumbnailSrc: string; repoUrl?: string; usedOnPages: boolean }> = []
  const re = /\{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?componentPath:\s*"([^"]+)"[\s\S]*?thumbnailSrc:\s*"([^"]+)"[\s\S]*?usedOnPages:\s*(true|false)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(raw)) !== null) {
    const repoMatch = raw.slice(m.index, m.index + m[0].length + 200).match(/repoUrl:\s*"([^"]+)"/)
    items.push({ id: m[1], title: m[2], thumbnailSrc: m[4], repoUrl: repoMatch?.[1], usedOnPages: m[5] === 'true' })
  }
  return items
}

function writeOverrides(overrides: Record<string, AnimationMetaOverride>): void {
  fs.mkdirSync(path.dirname(OVERRIDES_JSON), { recursive: true })
  fs.writeFileSync(OVERRIDES_JSON, JSON.stringify(overrides, null, 2) + '\n', 'utf8')
}

export async function GET(req: NextRequest) {
  const guard = localOnlyGuard(req)
  if (guard) return guard

  const catalog = readCatalog()
  const overrides = readOverrides()

  const merged = catalog.map((item) => {
    const o = overrides[item.id] ?? {}
    return {
      id: item.id,
      title: o.title ?? item.title,
      description: o.description ?? '',
      keywords: o.keywords ?? [],
      repoUrl: o.repoUrl ?? item.repoUrl ?? '',
      thumbnailSrc: o.thumbnailSrc ?? item.thumbnailSrc,
      usedOnPages: item.usedOnPages,
    }
  })

  return NextResponse.json({ animations: merged, overrides })
}

export async function POST(req: NextRequest) {
  const guard = localOnlyGuard(req)
  if (guard) return guard

  let body: { id: string } & AnimationMetaOverride
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { id, title, description, keywords, repoUrl, thumbnailSrc } = body
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const overrides = readOverrides()
  const existing = overrides[id] ?? {}

  const updated: AnimationMetaOverride = { ...existing }
  if (title !== undefined) updated.title = title
  if (description !== undefined) updated.description = description
  if (keywords !== undefined) updated.keywords = keywords
  if (repoUrl !== undefined) updated.repoUrl = repoUrl
  if (thumbnailSrc !== undefined) updated.thumbnailSrc = thumbnailSrc

  overrides[id] = updated

  writeOverrides(overrides)

  return NextResponse.json({ ok: true, id, override: updated })
}
