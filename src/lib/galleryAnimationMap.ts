import { ANIMATION_REGISTRY } from '@/src/data/animations'

export type GalleryAnimationResolvableItem = {
  id: string
  animationId?: string | null
}

/**
 * Manual, high-confidence mappings from manifest identifiers to registry identifiers.
 * Keep this list conservative to avoid wiring incorrect previews.
 */
export const GALLERY_ANIMATION_ID_MAP: Record<string, string> = {
  'marketing-analytics-carousel-v3': 'marketing-analytics-carousel',
  'marketing-operations-workflow-tile-v2': 'marketing-operations-tile',
  'edu-marketers-dashboard-v2': 'edu-marketers-dashboard',
  'executive-logistics-dashboard-v3': 'executive-logistics-dashboard',
  'executive-logistics-dashboard-v2': 'executive-logistics-dashboard',
  'marketing-automation-live-feed-v2': 'marketing-automation-live-feed',
  'abm-radar-analysis-v2': 'abm-radar-analysis',
  'abm-network-dashboard-v2': 'abm-network-dashboard',
  'experience-dashboard-v2': 'demand-gen-flow',
  'live-email-automation-ecosystem-v3': 'live-email-automation',
  'live-email-automation-ecosystem-v2': 'live-email-automation',
  'video-marketing-analytics-dashboard-v2': 'video-marketing-analytics',
  'nexus-ai-stakeholder-portal-v2': 'nexus-stakeholder-portal',
  'content-engagement-marketing-dashboard-v2': 'content-engagement-marketing',
  'abm-pipeline-strategy-dashboard-v2': 'abm-pipeline-strategy',
  'abm-pipeline-strategy-dashboard': 'abm-pipeline-strategy',
  'abm-campaign-radar-analysis-v2': 'abm-radar-analysis',
  'manufacturing-agency-dashboard-v2': 'manufacturing-lifecycle-dashboard',
  'devmarketers-bottom-up-adoption-loop-v2': 'dev-marketers',
  'devconsole-content-workflow-v2': 'developer-marketing',
  'cyberagency-lifecycle-engine-v2': 'apex-shield-lifecycle-engine',
  'eventpulse-enterprise-dashboard-v2': 'event-marketing',
  'neonvideo-marketing-landing-page-v2': 'campaign-tile',
  'growthsem-landing-page-v2': 'campaign-tile',
  'email-marketing-json-lottie-v2': 'email-marketing-hero',
  'demandgen-pipeline-hero-v2': 'campaign-tile',
  'demand-gen-hero-v2': 'demand-generation-hero',
  'content-marketing-with-ai-v2': 'content-marketing-mdx',
  'marketingflow-ai-workflow-v2': 'content-marketing-mdx',
  'nexus-industrial-dashboard-v2': 'abm-radar-analysis',
  'dashboard-tiles-industrial-roi-dashboard-v2': 'industrial-dashboard',
}

const REGISTRY_IDS = ANIMATION_REGISTRY.map((entry) => entry.id)
const REGISTRY_ID_SET = new Set(REGISTRY_IDS)
const REGISTRY_ID_LOWER_MAP = new Map(REGISTRY_IDS.map((id) => [id.toLowerCase(), id]))

function normalizeKebab(value: string): string {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalizeForFallback(value: string): string {
  return normalizeKebab(value)
    .replace(/-v\d+$/i, '')
    .replace(/^dashboard-tiles-/, '')
    .replace(/^industries-/, '')
    .replace(/^expertisehero-/, '')
    .replace(/^dashboard-/, '')
}

function byExactRegistryId(value?: string | null): string | null {
  if (!value) return null
  return REGISTRY_ID_SET.has(value) ? value : null
}

function byCaseInsensitiveRegistryId(value?: string | null): string | null {
  if (!value) return null
  return REGISTRY_ID_LOWER_MAP.get(value.toLowerCase()) ?? null
}

function byNormalizedFallback(value?: string | null): string | null {
  if (!value) return null
  const normalizedValue = normalizeForFallback(value)
  if (!normalizedValue) return null

  let candidate: string | null = null
  for (const registryId of REGISTRY_IDS) {
    if (normalizeForFallback(registryId) !== normalizedValue) continue
    if (candidate && candidate !== registryId) {
      // Ambiguous fallback: two registry ids collapse to same normalized key.
      return null
    }
    candidate = registryId
  }
  return candidate
}

function fromExplicitMap(item: GalleryAnimationResolvableItem): string | null {
  const byId = GALLERY_ANIMATION_ID_MAP[item.id]
  if (byId) return byId

  const key = item.animationId ?? undefined
  if (!key) return null
  return GALLERY_ANIMATION_ID_MAP[key] ?? null
}

export function resolveRegistryIdForManifestItem(
  item: GalleryAnimationResolvableItem
): string | null {
  return (
    fromExplicitMap(item) ??
    byExactRegistryId(item.animationId) ??
    byExactRegistryId(item.id) ??
    byCaseInsensitiveRegistryId(item.animationId) ??
    byCaseInsensitiveRegistryId(item.id) ??
    byNormalizedFallback(item.animationId) ??
    byNormalizedFallback(item.id) ??
    null
  )
}
