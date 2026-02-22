import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { assertLocalOnly, isValidAnimationId } from '@/src/lib/localOnly'
import { type AnimationMetaOverride } from '@/src/lib/animationOverrides.fs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

const ROOT = process.cwd()
const CATALOG_PATH = path.join(ROOT, 'src', 'data', 'animationCatalog.generated.ts')
const OVERRIDES_JSON = path.join(ROOT, 'src', 'data', 'animationMeta.overrides.json')

type CatalogItem = {
  id: string
  title: string
  componentPath: string
  thumbnailSrc: string
  repoUrl?: string
  usedOnPages: boolean
}

function readCatalog(): CatalogItem[] {
  if (!fs.existsSync(CATALOG_PATH)) return []
  const raw = fs.readFileSync(CATALOG_PATH, 'utf8')
  const items: CatalogItem[] = []
  const re = /\{\s*id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?componentPath:\s*"([^"]+)"[\s\S]*?thumbnailSrc:\s*"([^"]+)"[\s\S]*?usedOnPages:\s*(true|false)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(raw)) !== null) {
    const repoMatch = raw.slice(m.index, m.index + m[0].length + 200).match(/repoUrl:\s*"([^"]+)"/)
    items.push({
      id: m[1],
      title: m[2],
      componentPath: m[3],
      thumbnailSrc: m[4],
      repoUrl: repoMatch?.[1],
      usedOnPages: m[5] === 'true',
    })
  }
  return items
}

function readOverridesJson(): Record<string, AnimationMetaOverride> {
  if (!fs.existsSync(OVERRIDES_JSON)) return {}
  try {
    return JSON.parse(fs.readFileSync(OVERRIDES_JSON, 'utf8')) as Record<string, AnimationMetaOverride>
  } catch {
    return {}
  }
}

function writeOverridesJson(next: Record<string, AnimationMetaOverride>) {
  fs.mkdirSync(path.dirname(OVERRIDES_JSON), { recursive: true })
  fs.writeFileSync(OVERRIDES_JSON, JSON.stringify(next, null, 2) + '\n', 'utf8')
}

function mergeItem(c: CatalogItem, o?: AnimationMetaOverride) {
  return {
    ...c,
    title: o?.title ?? c.title,
    thumbnailSrc: o?.thumbnailSrc ?? c.thumbnailSrc,
    repoUrl: o?.repoUrl ?? c.repoUrl,
    description: o?.description ?? '',
    keywords: o?.keywords ?? [],
    hasOverride: Boolean(o && Object.keys(o).length > 0),
  }
}

export async function GET() {
  assertLocalOnly()
  const catalog = readCatalog()
  const overrides = readOverridesJson()
  const merged = catalog.map((c) => mergeItem(c, overrides[c.id]))
  return NextResponse.json({
    count: merged.length,
    items: merged,
    overridesCount: Object.keys(overrides).length,
  })
}

type PatchBody = { id: string; patch: AnimationMetaOverride }

export async function POST(req: Request) {
  assertLocalOnly()
  const body = (await req.json()) as PatchBody
  const id = (body?.id ?? '').trim()

  if (!isValidAnimationId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const catalog = readCatalog()
  if (!catalog.some((c) => c.id === id)) {
    return NextResponse.json({ error: 'Unknown id (not in generated catalog)' }, { status: 400 })
  }

  const patch = body?.patch ?? {}
  const clean: AnimationMetaOverride = {
    title: patch.title?.trim() || undefined,
    description: patch.description?.trim() || undefined,
    keywords: Array.isArray(patch.keywords)
      ? patch.keywords.map((k) => `${k ?? ''}`.trim()).filter(Boolean).slice(0, 50)
      : undefined,
    repoUrl: patch.repoUrl?.trim() || undefined,
    thumbnailSrc: patch.thumbnailSrc?.trim() || undefined,
  }

  const overrides = readOverridesJson()
  const prev = overrides[id] ?? {}
  const nextForId: AnimationMetaOverride = { ...prev, ...clean }

  for (const key of Object.keys(nextForId) as Array<keyof AnimationMetaOverride>) {
    const v = nextForId[key]
    if (v == null) delete nextForId[key]
    if (Array.isArray(v) && v.length === 0) delete nextForId[key]
    if (typeof v === 'string' && v.trim() === '') delete nextForId[key]
  }

  const nextAll = { ...overrides, [id]: nextForId }
  if (Object.keys(nextForId).length === 0) delete nextAll[id]

  writeOverridesJson(nextAll)
  return NextResponse.json({ ok: true })
}
