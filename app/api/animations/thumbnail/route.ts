/**
 * POST /api/animations/thumbnail
 * Accepts multipart/form-data with fields: id (string), file (png/jpg/webp)
 * Writes to public/animation-thumbs/<id>.<ext>
 * Also upserts thumbnailSrc in animationMeta.overrides.json.
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
const THUMBS_DIR = path.join(ROOT, 'public', 'animation-thumbs')
const OVERRIDES_JSON = path.join(ROOT, 'src', 'data', 'animationMeta.overrides.json')

const ALLOWED_MIME: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
}

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

function writeOverrides(overrides: Record<string, AnimationMetaOverride>): void {
  fs.mkdirSync(path.dirname(OVERRIDES_JSON), { recursive: true })
  fs.writeFileSync(OVERRIDES_JSON, JSON.stringify(overrides, null, 2) + '\n', 'utf8')
}

export async function POST(req: NextRequest) {
  const guard = localOnlyGuard(req)
  if (guard) return guard

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const id = formData.get('id')
  const file = formData.get('file')

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  const mime = file.type
  const ext = ALLOWED_MIME[mime]
  if (!ext) {
    return NextResponse.json(
      { error: `Unsupported file type: ${mime}. Allowed: png, jpg, webp` },
      { status: 400 }
    )
  }

  // Sanitize id to prevent path traversal
  const safeId = id.replace(/[^a-z0-9\-]/g, '')
  if (!safeId) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const filename = `${safeId}.${ext}`
  const destPath = path.join(THUMBS_DIR, filename)
  const thumbnailSrc = `/animation-thumbs/${filename}`

  fs.mkdirSync(THUMBS_DIR, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(destPath, buffer)

  // Upsert thumbnailSrc in overrides
  const overrides = readOverrides()
  overrides[safeId] = { ...(overrides[safeId] ?? {}), thumbnailSrc }
  writeOverrides(overrides)

  return NextResponse.json({ ok: true, id: safeId, thumbnailSrc })
}
