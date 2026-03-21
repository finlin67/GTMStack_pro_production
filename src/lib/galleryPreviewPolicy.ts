export type GalleryPolicyItem = {
  id: string
  title: string
  animationId?: string | null
  entryHtml?: string | null
  thumbnailUrl?: string | null
  updatedAt?: string | null
}

export type PreviewMode =
  | 'live-component'
  | 'iframe-entry-html'
  | 'thumbnail-fallback'
  | 'explicit-fallback-message'

export type PreviewDecision = {
  mode: PreviewMode
  reason: string
}

export type CanonicalStatus = 'active' | 'secondary' | 'deprecated'

export type CanonicalDecision = {
  canonicalId: string
  status: CanonicalStatus
  version: number
  baseId: string
}

const VERSION_SUFFIX = /-v(\d+)$/i

function parseVersion(id: string): { baseId: string; version: number } {
  const match = id.match(VERSION_SUFFIX)
  if (!match) return { baseId: id, version: 0 }
  return {
    baseId: id.slice(0, -match[0].length),
    version: Number.parseInt(match[1], 10) || 0,
  }
}

function toMillis(value?: string | null): number {
  if (!value) return 0
  const ms = Date.parse(value)
  return Number.isNaN(ms) ? 0 : ms
}

function compareCanonicalCandidate(a: GalleryPolicyItem, b: GalleryPolicyItem): number {
  const av = parseVersion(a.id).version
  const bv = parseVersion(b.id).version
  if (av !== bv) return bv - av

  const aUpdated = toMillis(a.updatedAt)
  const bUpdated = toMillis(b.updatedAt)
  if (aUpdated !== bUpdated) return bUpdated - aUpdated

  return a.id.localeCompare(b.id)
}

export function resolvePreviewDecision(input: {
  hasMappedComponent: boolean
  entryHtml?: string | null
  thumbnailUrl?: string | null
}): PreviewDecision {
  // Deterministic precedence for modal content.
  if (input.hasMappedComponent) {
    return {
      mode: 'live-component',
      reason: 'Mapped live component found for this animation.',
    }
  }

  if (input.entryHtml && String(input.entryHtml).trim().length > 0) {
    return {
      mode: 'iframe-entry-html',
      reason: 'Using entryHtml iframe preview from synced assets.',
    }
  }

  if (input.thumbnailUrl && String(input.thumbnailUrl).trim().length > 0) {
    return {
      mode: 'thumbnail-fallback',
      reason: 'No live preview available; using thumbnail fallback.',
    }
  }

  return {
    mode: 'explicit-fallback-message',
    reason: 'No preview assets available for this item yet.',
  }
}

export function buildCanonicalMap(items: GalleryPolicyItem[]): Record<string, CanonicalDecision> {
  const byBase = new Map<string, GalleryPolicyItem[]>()

  for (const item of items) {
    const { baseId } = parseVersion(item.id)
    const existing = byBase.get(baseId)
    if (existing) {
      existing.push(item)
    } else {
      byBase.set(baseId, [item])
    }
  }

  const result: Record<string, CanonicalDecision> = {}

  for (const [baseId, group] of byBase.entries()) {
    const sorted = [...group].sort(compareCanonicalCandidate)
    const canonical = sorted[0]

    sorted.forEach((item, index) => {
      const { version } = parseVersion(item.id)
      result[item.id] = {
        canonicalId: canonical.id,
        status: index === 0 ? 'active' : version === 0 ? 'deprecated' : 'secondary',
        version,
        baseId,
      }
    })
  }

  return result
}

export function applyCanonicalVisibility<T extends GalleryPolicyItem>(
  items: T[],
  options?: { includeSecondary?: boolean; includeDeprecated?: boolean }
): { visibleItems: T[]; canonicalMap: Record<string, CanonicalDecision> } {
  const canonicalMap = buildCanonicalMap(items)
  const includeSecondary = options?.includeSecondary ?? false
  const includeDeprecated = options?.includeDeprecated ?? false

  const visibleItems = items.filter((item) => {
    const decision = canonicalMap[item.id]
    if (!decision) return true
    if (decision.status === 'active') return true
    if (decision.status === 'secondary') return includeSecondary
    return includeDeprecated
  })

  return { visibleItems, canonicalMap }
}

export function normalizeSummary(summary?: string | null): string | null {
  if (!summary) return null

  const cleaned = summary
    .replace(/^\s*Description\s*/i, '')
    .replace(/^\s*run deploy your studio app\s*/i, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/This contains everything you need to run your app locally\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!cleaned) return null
  return cleaned
}
