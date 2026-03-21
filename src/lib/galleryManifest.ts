// Server-side helpers for the animation gallery manifest.
// Reads src/data/gallery-manifest.json produced by finlin67/GTMStack-Animations.

import fs from 'fs'
import path from 'path'

export type GalleryManifestItem = {
  id: string
  slug: string
  /** Optional mapping to GTMStack_pro_production ANIMATION_REGISTRY id */
  animationId?: string
  title: string
  category: string
  tags: string[]
  summary?: string | null
  projectPath: string
  entryHtml: string
  thumbnailPath?: string
  githubUrl: string
  githubReadmeUrl?: string
  updatedAt?: string | null
}

export type GalleryItem = Omit<GalleryManifestItem, 'entryHtml'> & {
  /** Best available HTML preview path for gallery modal rendering. */
  entryHtml?: string
  /** Human-friendly category for display (e.g. "digital-demand" → "Digital Demand"). */
  displayCategory: string
  /** Human-friendly tags for display. */
  displayTags: string[]
  /** Public URL this app can serve for the thumbnail, if available. */
  thumbnailUrl?: string
  /** Best available HTML preview path detected during manifest load. */
  preferredEntryHtml?: string
  /** True when the synced preview HTML is a static placeholder card rather than a real animation. */
  placeholderPreview?: boolean
}

let cachedItems: GalleryItem[] | null = null

function toTitleCaseSlug(value: string | undefined | null): string {
  if (!value) return ''
  return value
    .replace(/[-_/]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function normalizeWebPath(value: string | undefined | null): string {
  if (!value) return ''
  return String(value).replace(/\\/g, '/').replace(/^\/+/, '')
}

function scoreHtmlCandidate(fileName: string): number {
  const lower = fileName.toLowerCase()
  let score = 0

  if (lower.includes('app-v2')) score += 50
  if (lower === 'app.html') score += 34
  if (lower.includes('index')) score += 24
  if (lower.includes('demo')) score += 20
  if (lower.includes('main')) score += 16
  if (lower.includes('tile')) score += 10
  if (lower.includes('preview')) score -= 40

  return score
}

function resolvePreferredEntryHtml(entryHtml: string | undefined | null): string {
  const normalized = normalizeWebPath(entryHtml)
  if (!normalized) return ''

  const publicDir = path.join(process.cwd(), 'public', path.dirname(normalized))
  if (!fs.existsSync(publicDir)) return normalized

  const candidates = fs
    .readdirSync(publicDir)
    .filter((name) => name.toLowerCase().endsWith('.html'))
    .sort((a, b) => scoreHtmlCandidate(b) - scoreHtmlCandidate(a) || a.localeCompare(b))

  if (!candidates.length) return normalized

  return normalizeWebPath(path.join(path.dirname(normalized), candidates[0]))
}

function readPublicTextFile(relativePath: string | undefined | null): string {
  const normalized = normalizeWebPath(relativePath)
  if (!normalized) return ''

  const absolutePath = path.join(process.cwd(), 'public', normalized)
  if (!fs.existsSync(absolutePath)) return ''

  try {
    return fs.readFileSync(absolutePath, 'utf8')
  } catch {
    return ''
  }
}

function isPlaceholderPreviewHtml(entryHtml: string | undefined | null): boolean {
  const source = readPublicTextFile(entryHtml)
  if (!source) return false

  return (
    source.includes('Gallery thumbnail placeholder (Option B)') ||
    source.includes('Run and deploy your AI Studio app') ||
    source.includes('This contains everything you need to run your app locally.')
  )
}

function loadManifest(): GalleryItem[] {
  // In dev, skip cache so manifest edits are picked up without full restart.
  if (process.env.NODE_ENV !== 'development' && cachedItems) return cachedItems

  try {
    const manifestPath = path.join(process.cwd(), 'src', 'data', 'gallery-manifest.json')
    if (!fs.existsSync(manifestPath)) {
      console.warn('[galleryManifest] gallery-manifest.json not found at', manifestPath)
      cachedItems = []
      return cachedItems
    }

    const raw = fs.readFileSync(manifestPath, 'utf8')
    if (!raw.trim()) {
      console.warn('[galleryManifest] gallery-manifest.json is empty; skipping parse')
      cachedItems = []
      return cachedItems
    }
    const parsed = JSON.parse(raw) as GalleryManifestItem[]

    cachedItems = parsed.map((item) => {
      const displayCategory = toTitleCaseSlug(item.category)
      const displayTags = (item.tags || []).map((tag) => toTitleCaseSlug(tag))
      const preferredEntryHtml = resolvePreferredEntryHtml(item.entryHtml)
      const placeholderPreview = isPlaceholderPreviewHtml(preferredEntryHtml || item.entryHtml)
      const thumbnailUrl = !placeholderPreview && item.thumbnailPath
        ? `/images/${item.thumbnailPath.replace(/^\/+/, '')}`
        : undefined
      const resolvedEntryHtml = placeholderPreview ? undefined : preferredEntryHtml || item.entryHtml

      return {
        ...item,
        entryHtml: resolvedEntryHtml,
        summary: item.summary ?? null,
        displayCategory,
        displayTags,
        thumbnailUrl,
        preferredEntryHtml,
        placeholderPreview,
      }
    })

    return cachedItems ?? []
  } catch (error) {
    console.warn('[galleryManifest] Failed to load or parse gallery-manifest.json', error)
    cachedItems = []
    return cachedItems
  }
}

export function getGalleryItems(): GalleryItem[] {
  return loadManifest()
}

export function getGalleryItemById(id: string): GalleryItem | null {
  return loadManifest().find((item) => item.id === id) ?? null
}

export function getGalleryCategories(): string[] {
  const items = loadManifest()
  const categories = new Set<string>()
  items.forEach((item) => {
    if (item.displayCategory) categories.add(item.displayCategory)
  })
  return Array.from(categories).sort((a, b) => a.localeCompare(b))
}

export function searchGalleryItems(
  query: string,
  filters?: { category?: string; tags?: string[] }
): GalleryItem[] {
  const items = loadManifest()
  if (!items.length) return []

  const normalizedQuery = query.trim().toLowerCase()
  const activeTags = filters?.tags?.map((t) => t.toLowerCase()) ?? []
  const categoryFilter = filters?.category?.toLowerCase()

  return items.filter((item) => {
    // Category filter
    if (categoryFilter) {
      const cat = item.displayCategory.toLowerCase()
      if (cat !== categoryFilter) return false
    }

    // Tag filter (all tags must be present)
    if (activeTags.length) {
      const itemTags = item.displayTags.map((t) => t.toLowerCase())
      const hasAll = activeTags.every((tag) => itemTags.includes(tag))
      if (!hasAll) return false
    }

    // Text search
    if (!normalizedQuery) return true

    const haystack = [
      item.title,
      item.slug,
      item.displayCategory,
      item.summary ?? '',
      ...(item.displayTags || []),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })
}

