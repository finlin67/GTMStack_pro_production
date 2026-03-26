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
  'email-marketing-json-lottie-v2': 'email-marketing-hero',
  'demandgen-pipeline-hero-v2': 'campaign-tile',
  'demand-gen-hero-v2': 'demand-generation-hero',
  'content-marketing-with-ai-v2': 'content-marketing-mdx',
  'marketingflow-ai-workflow-v2': 'content-marketing-mdx',
  'dashboard-tiles-industrial-roi-dashboard-v2': 'industrial-dashboard',
  'revops-data-sync-mesh-tile-v2': 'rev-ops-mesh-tile',
  'utilities-command-center-tile-v2': 'energy-grid-tile',
  'telco-ai-infrastructure-tile-v2': 'telco-a-i-tile',
  'student-lifecycle-analytics-dashboard-v2': 'e-d-u-marketing-tile',
  'scalability-telemetry-radar-v2': 'scalability-radar',
  'powergrid-digital-modernization-dashboard-v2': 'power-grid-dashboard',
  'oil-gas-performance-tile-component-v2': 'oil-gas-tile',
  'fleetoptima-driver-performance-tile-v2': 'fleet-tile',
  'fleet-roi-calculator-v2': 'fleet-r-o-i-calculator',
  'enterprise-sales-motion-dashboard-v2': 'enterprise-sales-motion',
  'industries-enterprise-sales-motion-dashboard-v2': 'enterprise-sales-motion',
  'engineering-excellence-workflow-system-v2': 'engineering-workflow-system',
  'energyflow-minimal-dashboard-v2': 'energy-flow-digital',
  'education-journey-k-12-ecosystem-v2': 'ed-journey-k12-ecosystem',
  'edtech-compact-roi-funnel-v2': 'ed-tech-compact-r-o-i-funnel',
  'edtech-compact-roi-funnel-v3': 'ed-tech-compact-r-o-i-funnel',
  'dynamic-wealth-dashboard-tile-v2': 'financial-tile',
  'clinical-holographic-control-surface-v2': 'clinical-holographic-control-surface',
  'aerospace-auto-engineering-workflow-v2': 'engineering-workflow',
  'event-pulse-enterprise-dashboard-v2': 'event-pulse',
  'agency-impact-dashboard-v2': 'impact-dashboard',
  'vibrant-impact-dashboard-v2': 'impact-dashboard',
  'strategyinsights-tile-component-v2': 'strategy-insights-tile',
  'strategist-os-dashboard-v2': 'content-strategist-dashboard',
  'sales-enablement-hero-animated-tile-v2': 'sales-enablement-tile',
  'omnichannel-live-analytics-tile-v2': 'omnichannel-live-analytics',
  'martech-ai-landing-page-component-v2': 'mar-tech-tile',
  'kpi-spotlight-mosaic-v2': 'kpi-spotlight-mosaic',
  'gtm-product-strategy-audience-tile-v2': 'g-t-m-audience-tile',
  'esg-analytics-hub-v2': 'esg-analytics-hub',
  'driftguard-v2': 'drift-guard',
  'driftguard-ai-monitor-v2': 'drift-guard',
  'demandgrowthhero-component-v2': 'demand-growth-tile',
  'eoc-logistics-dashboard-v2': 'eoc-logistics-dashboard',
  'growthflow-seo-engine-v2': 'seo-growth-flow',
  'growthsem-landing-page-v2': 'growth-s-e-m-tile',
  'lifecycle-engine-dashboard-v2': 'lifecycle-360',
  'dashboard-tiles-lifecycle-engine-dashboard-v2': 'lifecycle-360',
  'manufacturinghero-dashboard-tile-v2': 'manufacturing-lifecycle-dashboard',
  'manufacturing-hero-dashboard-tile-v2': 'manufacturing-lifecycle-dashboard',
  'industrial-roi-dashboard-v2': 'industrial-dashboard',
  'product-growth-hero-v2': 'growth-marketing-hero',
  'social-media-marketing-hero-tile-v2': 'social-media-hero',
  'gtm-stack-data-sync-mesh-v2': 'rev-ops-dashboard',
  'abm-success-visualizer-v2': 'a-b-m-pipe-tracker-tile',
  'abm-flow-premium-tile-v2': 'abm-tile-animation',
  'b2b-consulting-portfolio-gtmstack-pro': 'gtmstack-pro',
  'clinical-validation-surface-dash-v2': 'clinical-holographic-control-surface',
  'content-marketing-kpi-dashboard-v2': 'content-marketing-base',
  'financial-technology-growth-tile-v2': 'financial-tile',
  'fintech-growth-animated-sales-tile-v3': 'growth-marketing-tile',
  'fintech-growth-studio-animated-sales-tile-v2': 'growth-marketing-tile',
  'growth-ai-animation': 'ai-growth',
  'growth-ai-harmonic-quad-tone': 'ai-growth',
  'gtm-engine-visualization-hero-animation-v2': 'gtm-stack-hero',
  'gtmstack-hero-tile-v2': 'gtm-stack-hero',
  'gtmstack-pro-hero-tile': 'gtmstack-pro',
  'gtm-strategy-audience-tile-v2': 'g-t-m-audience-tile',
  'martech-ai-dashboard-engine-v2': 'mar-tech-tile',
  'marketing-automation-workflow-v2': 'automation-engine-dashboard',
  'quantum-data-field-analytics-v2': 'quantum-dashboard',
  'retail-pulse-analytics-tile-v2': 'omni-retail-tile',
  'video-marketing-ai-distribution-hub-v2': 'video-marketing-hero',
  'event-roi-analytics-dashboard-v2': 'event-marketing-tile',
  'expertisehero-gtm-engine-visualization-v2': 'gtm-stack-hero',
  'growththeme-ai-landing-v2': 'growth-marketing-hero',
  'pipeline-command-center-v2': 'pipeline-dashboard',
  'revenue-systems-data-flow-v2': 'rev-ops-mesh-tile',
  'systems-operations-hero-component-v2': 'systems-process-tile',
  'workflow-visualization-v2': 'engineering-excellence-workflow',
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
