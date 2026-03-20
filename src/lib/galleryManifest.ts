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

export type GalleryItem = GalleryManifestItem & {
  /** Human-friendly category for display (e.g. "digital-demand" → "Digital Demand"). */
  displayCategory: string
  /** Human-friendly tags for display. */
  displayTags: string[]
  /** Public URL this app can serve for the thumbnail, if available. */
  thumbnailUrl?: string
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

function loadManifest(): GalleryItem[] {
  if (cachedItems) return cachedItems

  try {
    const manifestPath = path.join(process.cwd(), 'src', 'data', 'gallery-manifest.json')
    if (!fs.existsSync(manifestPath)) {
      console.warn('[galleryManifest] gallery-manifest.json not found at', manifestPath)
      cachedItems = []
      return cachedItems
    }

    const raw = fs.readFileSync(manifestPath, 'utf8')
    const parsed = JSON.parse(raw) as GalleryManifestItem[]

    cachedItems = parsed.map((item) => {
      const displayCategory = toTitleCaseSlug(item.category)
      const displayTags = (item.tags || []).map((tag) => toTitleCaseSlug(tag))
      const thumbnailUrl = item.thumbnailPath
        ? `/images/${item.thumbnailPath.replace(/^\/+/, '')}`
        : undefined

      return {
        ...item,
        summary: item.summary ?? null,
        displayCategory,
        displayTags,
        thumbnailUrl,
      }
    })

    return cachedItems
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

