import 'server-only'
import fs from 'node:fs'
import path from 'node:path'
import { isValidAnimationId } from '@/src/lib/localOnly'

export type AnimationMetaOverride = {
  title?: string
  description?: string
  keywords?: string[]
  repoUrl?: string
  thumbnailSrc?: string
}

const ROOT = process.cwd()
const OVERRIDES_JSON = path.join(ROOT, 'src', 'data', 'animationMeta.overrides.json')

export function readOverrides(): Record<string, AnimationMetaOverride> {
  if (!fs.existsSync(OVERRIDES_JSON)) return {}
  try {
    const raw = fs.readFileSync(OVERRIDES_JSON, 'utf8')
    return JSON.parse(raw) as Record<string, AnimationMetaOverride>
  } catch {
    return {}
  }
}

export function writeOverrides(next: Record<string, AnimationMetaOverride>) {
  const clean: Record<string, AnimationMetaOverride> = {}
  for (const [id, o] of Object.entries(next)) {
    if (!isValidAnimationId(id)) continue
    const entry: AnimationMetaOverride = {}
    if (o.title?.trim()) entry.title = o.title.trim()
    if (o.description?.trim()) entry.description = o.description.trim()
    if (o.keywords?.length) entry.keywords = o.keywords
    if (o.repoUrl?.trim()) entry.repoUrl = o.repoUrl.trim()
    if (o.thumbnailSrc?.trim()) entry.thumbnailSrc = o.thumbnailSrc.trim()
    if (Object.keys(entry).length > 0) clean[id] = entry
  }
  fs.mkdirSync(path.dirname(OVERRIDES_JSON), { recursive: true })
  fs.writeFileSync(OVERRIDES_JSON, JSON.stringify(clean, null, 2) + '\n', 'utf8')
}
