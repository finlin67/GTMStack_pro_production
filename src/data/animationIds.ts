/**
 * Animation IDs for generateStaticParams and other server-side use.
 * Kept separate from animations.ts so server components don't pull in client animation components.
 */
const ANIMATION_IDS = [
  'gtmstack-pro',
  'video-marketing-analytics',
  'seo-growth-flow',
  'marketing-analytics-carousel',
  'marketing-automation-live-feed',
  'automation-engine-dashboard',
  'live-email-automation',
  'pipeline-dashboard',
  'quantum-dashboard',
  'omni-analytics',
  'abm-pipeline-strategy',
  'abm-tile-animation',
  'abm-network-dashboard',
  'content-marketing-animation',
  'lead-gen-tile-animation',
  'demand-gen-flow',
  'email-marketing-hero',
  'industrial-dashboard',
  'industrial-mfg-tile',
] as const

export function getAllAnimationIds(): string[] {
  return [...ANIMATION_IDS]
}
