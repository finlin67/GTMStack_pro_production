import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports for performance - lazy load animations
const VideoMarketingAnalyticsTile = dynamic(
  () => import('@/src/components/animations/Video-Marketing-Analytics'),
  { ssr: false }
)
const SEOAnimation = dynamic(
  () => import('@/src/components/animations/SEO-GrowthFlow'),
  { ssr: false }
)
const MarketingAnalytics = dynamic(
  () => import('@/src/components/animations/Marketing-Analytics-Carousel'),
  { ssr: false }
)
const MarketingAutomationLiveFeed = dynamic(
  () => import('@/src/components/animations/Marketing-Automation-Live-Feed'),
  { ssr: false }
)
const LiveEmailAutomation = dynamic(
  () => import('@/src/components/animations/Live-Email-Automation'),
  { ssr: false }
)
const ABMPipelineStrategy = dynamic(
  () => import('@/src/components/animations/ABM-Pipeline-Strategy'),
  { ssr: false }
)
const GTMStackPro = dynamic(
  () => import('@/src/components/animations/GTMStackPro'),
  { ssr: false }
)

// Additional variations - add more as you create them
const MarketingAutomationVariant2 = dynamic(
  () => import('@/src/components/animations/automation-engine-dashboard'),
  { ssr: false }
)
const ABMVariant2 = dynamic(
  () => import('@/src/components/animations/ABMTileAnimation'),
  { ssr: false }
)
const ABMVariant3 = dynamic(
  () => import('@/src/components/animations/abm-network-dashboard'),
  { ssr: false }
)

const ContentMarketingAnimation = dynamic(
  () => import('@/src/components/animations/ContentMarketingAnimation'),
  { ssr: false }
)
const LeadGenTileAnimation = dynamic(
  () => import('@/src/components/animations/LeadGenTileAnimation'),
  { ssr: false }
)
const EmailMarketingHero = dynamic(
  () => import('@/src/components/animations/EmailMarketingHero'),
  { ssr: false }
)
const PipelineDashboard = dynamic(
  () => import('@/src/components/animations/PipelineDashboard'),
  { ssr: false }
)
const QuantumDashboard = dynamic(
  () => import('@/src/components/animations/QuantumDashboard'),
  { ssr: false }
)
const DemandGenFlow = dynamic(
  () => import('@/src/components/animations/DemandGenFlow'),
  { ssr: false }
)
const IndustrialDashboard = dynamic(
  () => import('@/src/components/animations/IndustrialDashboard'),
  { ssr: false }
)
const IndustrialMFGTile = dynamic(
  () => import('@/src/components/animations/Industrial-MFG-Tile'),
  { ssr: false }
)
const OmnichannelAnalytics = dynamic(
  () => import('@/src/components/animations/Omni-Analytics'),
  { ssr: false }
)

export type AnimationSourceType = 'google-ai-studio' | 'custom' | 'lottie' | 'video'
export type MarketingFunction =
  | 'video-marketing'
  | 'search-engine-optimization'
  | 'marketing-operations'
  | 'marketing-automation'
  | 'account-based-marketing-abm'
  | 'content-marketing'
  | 'email-marketing'
  | 'demand-generation'
  | 'omnichannel-marketing'
  | 'manufacturing'
  | 'home'

export interface AnimationEntry {
  id: string
  title: string
  description: string
  marketingFunction: MarketingFunction
  tags: string[]
  sourceType: AnimationSourceType
  /** Component path relative to src/components/animations */
  componentPath: string
  /** Lazy-loaded component */
  component: ComponentType
  /** Preview image path under /public */
  previewImage?: string
  /** Whether this animation is featured in the gallery */
  featured: boolean
  /** Route where this animation is used (if any) */
  route?: string
  /** Order/priority for display */
  order?: number
}

/**
 * Animation registry - single source of truth for all animations.
 * Maps marketing functions to multiple animation variations.
 */
export const ANIMATION_REGISTRY: AnimationEntry[] = [
  // Home / GTMStack
  {
    id: 'gtmstack-pro',
    title: 'GTMStack Pro Dashboard',
    description: 'Comprehensive GTM operating system visualization showing integrated strategy, data, automation, and optimization.',
    marketingFunction: 'home',
    tags: ['dashboard', 'overview', 'gtm-stack'],
    sourceType: 'google-ai-studio',
    componentPath: 'GTMStackPro.tsx',
    component: GTMStackPro,
    featured: true,
    route: '/',
    order: 1,
  },

  // Video Marketing
  {
    id: 'video-marketing-analytics',
    title: 'Video Marketing Analytics',
    description: 'Real-time video performance metrics, engagement tracking, and conversion analytics dashboard.',
    marketingFunction: 'video-marketing',
    tags: ['video', 'analytics', 'engagement', 'metrics'],
    sourceType: 'google-ai-studio',
    componentPath: 'Video-Marketing-Analytics.tsx',
    component: VideoMarketingAnalyticsTile,
    featured: true,
    route: '/expertise/video-marketing',
    order: 1,
  },

  // SEO
  {
    id: 'seo-growth-flow',
    title: 'SEO Growth Flow',
    description: 'Search intent to revenue pipeline visualization with ranked content, lead generation, and growth intelligence.',
    marketingFunction: 'search-engine-optimization',
    tags: ['seo', 'content', 'rankings', 'leads'],
    sourceType: 'google-ai-studio',
    componentPath: 'SEO-GrowthFlow.tsx',
    component: SEOAnimation,
    featured: true,
    route: '/expertise/search-engine-optimization',
    order: 1,
  },

  // Marketing Operations
  {
    id: 'marketing-analytics-carousel',
    title: 'Marketing Analytics Carousel',
    description: 'Multi-channel marketing performance dashboard with campaign metrics and attribution insights.',
    marketingFunction: 'marketing-operations',
    tags: ['analytics', 'attribution', 'campaigns', 'metrics'],
    sourceType: 'google-ai-studio',
    componentPath: 'Marketing-Analytics-Carousel.tsx',
    component: MarketingAnalytics,
    featured: true,
    route: '/expertise/marketing-operations',
    order: 1,
  },

  // Marketing Automation - Multiple Variations
  {
    id: 'marketing-automation-live-feed',
    title: 'Marketing Automation Live Feed',
    description: 'Real-time automation pipeline showing queue processing, enrichment, routing, and success metrics.',
    marketingFunction: 'marketing-automation',
    tags: ['automation', 'pipeline', 'routing', 'real-time'],
    sourceType: 'google-ai-studio',
    componentPath: 'Marketing-Automation-Live-Feed.tsx',
    component: MarketingAutomationLiveFeed,
    featured: true,
    route: '/expertise/marketing-automation',
    order: 1,
  },
  {
    id: 'automation-engine-dashboard',
    title: 'Automation Engine Dashboard',
    description: 'Visualization of marketing automation workflows, triggers, and execution engine performance.',
    marketingFunction: 'marketing-automation',
    tags: ['automation', 'workflows', 'triggers', 'engine'],
    sourceType: 'google-ai-studio',
    componentPath: 'automation-engine-dashboard.tsx',
    component: MarketingAutomationVariant2,
    featured: false,
    order: 2,
  },
  {
    id: 'live-email-automation',
    title: 'Live Email Automation',
    description: 'Real-time email automation pipeline with nurture flows, engagement metrics, and delivery status.',
    marketingFunction: 'marketing-automation',
    tags: ['automation', 'email', 'nurture', 'live-feed'],
    sourceType: 'custom',
    componentPath: 'Live-Email-Automation.tsx',
    component: LiveEmailAutomation,
    featured: false,
    route: '/expertise/marketing-automation',
    order: 3,
  },
  {
    id: 'pipeline-dashboard',
    title: 'Pipeline Dashboard',
    description: 'Marketing operations pipeline visualization with funnel and performance metrics.',
    marketingFunction: 'marketing-operations',
    tags: ['marketing-ops', 'pipeline', 'dashboard', 'metrics'],
    sourceType: 'google-ai-studio',
    componentPath: 'PipelineDashboard.tsx',
    component: PipelineDashboard,
    featured: false,
    route: '/expertise/marketing-operations',
    order: 2,
  },

  // Omnichannel Marketing - Multiple Variations
  {
    id: 'quantum-dashboard',
    title: 'Omnichannel Marketing',
    description: 'Omnichannel and cross-channel marketing visualization with unified metrics.',
    marketingFunction: 'omnichannel-marketing',
    tags: ['omnichannel', 'cross-channel', 'unified', 'metrics'],
    sourceType: 'google-ai-studio',
    componentPath: 'QuantumDashboard.tsx',
    component: QuantumDashboard,
    featured: true,
    route: '/expertise/omnichannel-marketing',
    order: 1,
  },
  {
    id: 'omni-analytics',
    title: 'Omnichannel Analytics',
    description: 'Real-time omnichannel analytics dashboard showing cross-channel engagement and performance.',
    marketingFunction: 'omnichannel-marketing',
    tags: ['omnichannel', 'analytics', 'cross-channel', 'engagement'],
    sourceType: 'custom',
    componentPath: 'Omni-Analytics.tsx',
    component: OmnichannelAnalytics,
    featured: false,
    route: '/expertise/omnichannel-marketing',
    order: 2,
  },

  // ABM - Multiple Variations
  {
    id: 'abm-pipeline-strategy',
    title: 'ABM Pipeline Strategy',
    description: 'Account-based marketing pipeline visualization with funnel stages, growth velocity, and priority targets.',
    marketingFunction: 'account-based-marketing-abm',
    tags: ['abm', 'pipeline', 'funnel', 'targets'],
    sourceType: 'google-ai-studio',
    componentPath: 'ABM-Pipeline-Strategy.tsx',
    component: ABMPipelineStrategy,
    featured: true,
    route: '/expertise/account-based-marketing-abm',
    order: 1,
  },
  {
    id: 'abm-tile-animation',
    title: 'ABM Network Tile',
    description: 'Account-based marketing network visualization showing account connections and engagement flows.',
    marketingFunction: 'account-based-marketing-abm',
    tags: ['abm', 'network', 'connections', 'engagement'],
    sourceType: 'google-ai-studio',
    componentPath: 'ABMTileAnimation.tsx',
    component: ABMVariant2,
    featured: false,
    order: 2,
  },
  {
    id: 'abm-network-dashboard',
    title: 'ABM Network Dashboard',
    description: 'Comprehensive ABM network topology showing account relationships, touchpoints, and engagement metrics.',
    marketingFunction: 'account-based-marketing-abm',
    tags: ['abm', 'network', 'topology', 'dashboard'],
    sourceType: 'google-ai-studio',
    componentPath: 'abm-network-dashboard.tsx',
    component: ABMVariant3,
    featured: false,
    order: 3,
  },

  // Content Marketing
  {
    id: 'content-marketing-animation',
    title: 'Content Marketing',
    description: 'Content strategy and performance visualization for content-led GTM motions.',
    marketingFunction: 'content-marketing',
    tags: ['content', 'strategy', 'engagement', 'gtm'],
    sourceType: 'google-ai-studio',
    componentPath: 'ContentMarketingAnimation.tsx',
    component: ContentMarketingAnimation,
    featured: true,
    route: '/expertise/content-marketing',
    order: 1,
  },

  // Demand Generation
  {
    id: 'lead-gen-tile-animation',
    title: 'Demand Generation (Lead Gen Tile)',
    description: 'Lead generation and pipeline visualization with awareness, interest, and decision stages.',
    marketingFunction: 'demand-generation',
    tags: ['demand-gen', 'leads', 'pipeline', 'funnel'],
    sourceType: 'google-ai-studio',
    componentPath: 'LeadGenTileAnimation.tsx',
    component: LeadGenTileAnimation,
    featured: false,
    route: '/expertise/demand-generation',
    order: 2,
  },
  {
    id: 'demand-gen-flow',
    title: 'Demand Generation Flow',
    description: 'Demand generation flow visualization for pipeline and conversion metrics.',
    marketingFunction: 'demand-generation',
    tags: ['demand-gen', 'flow', 'pipeline', 'conversion'],
    sourceType: 'google-ai-studio',
    componentPath: 'DemandGenFlow.tsx',
    component: DemandGenFlow,
    featured: true,
    route: '/expertise/demand-generation',
    order: 1,
  },

  // Email Marketing
  {
    id: 'email-marketing-hero',
    title: 'Email Marketing',
    description: 'Email marketing visualization with animated envelope and paper plane for engagement and delivery.',
    marketingFunction: 'email-marketing',
    tags: ['email', 'nurture', 'engagement', 'automation'],
    sourceType: 'google-ai-studio',
    componentPath: 'EmailMarketingHero.tsx',
    component: EmailMarketingHero,
    featured: true,
    route: '/expertise/email-marketing',
    order: 1,
  },

  // Industries – Manufacturing (revolving: either animation on refresh)
  {
    id: 'industrial-dashboard',
    title: 'Industrial Dashboard',
    description: 'Manufacturing operations dashboard with OEE, downtime, and payback metrics.',
    marketingFunction: 'manufacturing',
    tags: ['manufacturing', 'industrial', 'dashboard', 'oee'],
    sourceType: 'custom',
    componentPath: 'IndustrialDashboard.tsx',
    component: IndustrialDashboard,
    featured: true,
    route: '/industries/manufacturing',
    order: 1,
  },
  {
    id: 'industrial-mfg-tile',
    title: 'Industrial MFG Tile',
    description: 'Manufacturing hero tile visualization for industrial GTM.',
    marketingFunction: 'manufacturing',
    tags: ['manufacturing', 'industrial', 'tile', 'hero'],
    sourceType: 'custom',
    componentPath: 'Industrial-MFG-Tile.tsx',
    component: IndustrialMFGTile,
    featured: false,
    route: '/industries/manufacturing',
    order: 2,
  },
]

/**
 * Get all animations for a specific marketing function
 */
export function getAnimationsByFunction(
  marketingFunction: MarketingFunction
): AnimationEntry[] {
  return ANIMATION_REGISTRY.filter(
    (anim) => anim.marketingFunction === marketingFunction
  ).sort((a, b) => (a.order || 999) - (b.order || 999))
}

/**
 * Get animation by ID
 */
export function getAnimationById(id: string): AnimationEntry | undefined {
  return ANIMATION_REGISTRY.find((anim) => anim.id === id)
}

/**
 * Get all animation IDs (for generateStaticParams)
 */
export function getAllAnimationIds(): string[] {
  return ANIMATION_REGISTRY.map((anim) => anim.id)
}

/**
 * Get featured animations
 */
export function getFeaturedAnimations(): AnimationEntry[] {
  return ANIMATION_REGISTRY.filter((anim) => anim.featured)
}

/**
 * Get all unique marketing functions
 */
export function getAllMarketingFunctions(): MarketingFunction[] {
  return Array.from(
    new Set(ANIMATION_REGISTRY.map((anim) => anim.marketingFunction))
  ) as MarketingFunction[]
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  ANIMATION_REGISTRY.forEach((anim) => {
    anim.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * Rotate animations for a marketing function (avoid repeats, random selection)
 */
export function getRotatedAnimation(
  marketingFunction: MarketingFunction,
  excludeId?: string
): AnimationEntry | null {
  const available = getAnimationsByFunction(marketingFunction).filter(
    (anim) => anim.id !== excludeId
  )
  if (available.length === 0) return null
  const randomIndex = Math.floor(Math.random() * available.length)
  return available[randomIndex]
}

/**
 * Get all animations for a route (e.g. /industries/manufacturing).
 * Used for industry pages with multiple hero animation variants.
 */
export function getAnimationsByRoute(route: string): AnimationEntry[] {
  const normalized = route === '/' ? '/' : route.replace(/\/$/, '')
  return ANIMATION_REGISTRY.filter((anim) => anim.route === normalized).sort(
    (a, b) => (a.order || 999) - (b.order || 999)
  )
}

/**
 * Pick one animation for a route (random, optionally excluding last shown to reduce repeat on refresh).
 */
export function getRotatedAnimationByRoute(
  route: string,
  excludeId?: string
): AnimationEntry | null {
  const available = getAnimationsByRoute(route).filter(
    (anim) => anim.id !== excludeId
  )
  const pool = available.length > 0 ? available : getAnimationsByRoute(route)
  if (pool.length === 0) return null
  const randomIndex = Math.floor(Math.random() * pool.length)
  return pool[randomIndex]
}
