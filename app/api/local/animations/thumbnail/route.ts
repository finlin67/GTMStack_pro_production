import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { assertLocalOnly, isValidAnimationId } from '@/src/lib/localOnly'

export const dynamic = 'force-static'

async function readGeneratedIds(): Promise<Set<string>> {
  const mod = await import('@/src/data/animationCatalog.generated')
  const items = (mod.ANIMATION_CATALOG ?? []) as Array<{ id: string }>
  return new Set(items.map((i) => i.id))
}

export async function POST(req: Request) {
  assertLocalOnly()

  const form = await req.formData()
  const id = (form.get('id') ?? '').toString().trim()
  const file = form.get('file')

  if (!isValidAnimationId(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  const ids = await readGeneratedIds()
  if (!ids.has(id)) return NextResponse.json({ error: 'Unknown id (not in generated catalog)' }, { status: 400 })

  if (!(file instanceof File)) return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  if (file.type !== 'image/png') return NextResponse.json({ error: 'Only PNG allowed' }, { status: 400 })

  const bytes = new Uint8Array(await file.arrayBuffer())
  const outDir = path.join(process.cwd(), 'public', 'animation-thumbs')
  const outPath = path.join(outDir, `${id}.png`)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outPath, bytes)

  return NextResponse.json({ ok: true, thumbnailSrc: `/animation-thumbs/${id}.png` })
}
