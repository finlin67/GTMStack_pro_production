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
const ABMRadarAnalysis = dynamic(
  () => import('@/src/components/animations/ABM-Radar-Analysis'),
  { ssr: false }
)
const CampaignTile = dynamic(
  () => import('@/src/components/animations/CampaignTile'),
  { ssr: false }
)
const ContentEngagementMarketing = dynamic(
  () => import('@/src/components/animations/Content-Engagement-Marketing'),
  { ssr: false }
)
const ContentMarketingBase = dynamic(
  () => import('@/src/components/animations/ContentMarketing'),
  { ssr: false }
)
const ContentMarketingMdx = dynamic(
  () => import('@/src/components/animations/Content-Marketing'),
  { ssr: false }
)
const GTMAudienceTileHero = dynamic(
  () => import('@/src/components/animations/GTMAudienceTileHero'),
  { ssr: false }
)
const ContentMarketingHero = dynamic(
  () => import('@/src/components/animations/ContentMarketingHero'),
  { ssr: false }
)
const CRMCampaignsTile = dynamic(
  () => import('@/src/components/animations/CRMCampaignsTile'),
  { ssr: false }
)
const DemandGenerationHero = dynamic(
  () => import('@/src/components/animations/DemandGenerationHero'),
  { ssr: false }
)
const DeveloperMarketing = dynamic(
  () => import('@/src/components/animations/Developer-Marketing'),
  { ssr: false }
)
const DevMarketers = dynamic(
  () => import('@/src/components/animations/DevMarketers'),
  { ssr: false }
)
const DemandGenerationHeroTile = dynamic(
  () => import('@/src/components/animations/DemandGenerationHeroTile'),
  { ssr: false }
)
const EventMarketing = dynamic(
  () => import('@/src/components/animations/EventMarketing'),
  { ssr: false }
)
const ExecutiveLogisticsDashboard = dynamic(
  () => import('@/src/components/animations/ExecutiveLogisticsDashboard'),
  { ssr: false }
)
const GrowthMarketingHero = dynamic(
  () => import('@/src/components/animations/GrowthMarketingHero'),
  { ssr: false }
)
const EduMarketersDashboard = dynamic(
  () => import('@/src/components/animations/EduMarketersDashboard'),
  { ssr: false }
)
const HigherEDMarketingTile = dynamic(
  () => import('@/src/components/animations/HigherEDMarketingTile'),
  { ssr: false }
)
const ApexShieldLifecycleEngine = dynamic(
  () => import('@/src/components/animations/ApexShieldLifecycleEngine'),
  { ssr: false }
)
const NexusStakeholderPortal = dynamic(
  () => import('@/src/components/animations/NexusStakeholderPortal'),
  { ssr: false }
)
const ManufacturingLifecycleDashboard = dynamic(
  () => import('@/src/components/animations/Manufacturing-LifecycleDashboard'),
  { ssr: false }
)
const MarketingOperationsTile = dynamic(
  () => import('@/src/components/animations/MarketingOperationsTile'),
  { ssr: false }
)
const VideoMarketingAnalyticsTileFile = dynamic(
  () => import('@/src/components/animations/Video-Marketing-Analytics-Tile'),
  { ssr: false }
)
const VideoCreativeHero = dynamic(
  () => import('@/src/components/animations/VideoCreativeHero'),
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
  | 'customer-experience-cx'
  | 'customer-marketing'
  | 'event-marketing'
  | 'growth-marketing'
  | 'lifecycle-marketing'
  | 'developer-tools'
  | 'education'

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
    route: '/expertise/account-based-marketing-abm',
    order: 3,
  },
  {
    id: 'abm-radar-analysis',
    title: 'ABM Radar Analysis',
    description: 'ABM radar visualization for account prioritization and engagement mapping.',
    marketingFunction: 'account-based-marketing-abm',
    tags: ['abm', 'radar', 'analysis', 'prioritization'],
    sourceType: 'custom',
    componentPath: 'ABM-Radar-Analysis.tsx',
    component: ABMRadarAnalysis,
    featured: false,
    route: '/expertise/account-based-marketing-abm',
    order: 4,
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
  {
    id: 'campaign-tile',
    title: 'Campaign Tile',
    description: 'Campaign visualization for content marketing campaigns.',
    marketingFunction: 'content-marketing',
    tags: ['content', 'campaign', 'tile'],
    sourceType: 'custom',
    componentPath: 'CampaignTile.tsx',
    component: CampaignTile,
    featured: false,
    route: '/expertise/content-marketing',
    order: 2,
  },
  {
    id: 'content-engagement-marketing',
    title: 'Content Engagement Marketing',
    description: 'Content engagement flow visualization.',
    marketingFunction: 'content-marketing',
    tags: ['content', 'engagement', 'marketing'],
    sourceType: 'custom',
    componentPath: 'Content-Engagement-Marketing.tsx',
    component: ContentEngagementMarketing,
    featured: false,
    route: '/expertise/content-marketing',
    order: 3,
  },
  {
    id: 'content-marketing-base',
    title: 'Content Marketing Base',
    description: 'Content marketing visualization.',
    marketingFunction: 'content-marketing',
    tags: ['content', 'marketing'],
    sourceType: 'custom',
    componentPath: 'ContentMarketing.tsx',
    component: ContentMarketingBase,
    featured: false,
    route: '/expertise/content-marketing',
    order: 4,
  },
  {
    id: 'content-marketing-mdx',
    title: 'Content Marketing MDX',
    description: 'Content marketing flow.',
    marketingFunction: 'content-marketing',
    tags: ['content', 'mdx'],
    sourceType: 'custom',
    componentPath: 'Content-Marketing.tsx',
    component: ContentMarketingMdx,
    featured: false,
    route: '/expertise/content-marketing',
    order: 5,
  },

  // Customer Experience (CX)
  {
    id: 'content-marketing-animation-cx',
    title: 'Customer Experience Content',
    description: 'Content marketing animation for CX context.',
    marketingFunction: 'customer-experience-cx',
    tags: ['customer-experience', 'content', 'cx'],
    sourceType: 'custom',
    componentPath: 'ContentMarketingAnimation.tsx',
    component: ContentMarketingAnimation,
    featured: true,
    route: '/expertise/customer-experience-cx',
    order: 1,
  },
  {
    id: 'gtm-audience-tile-hero',
    title: 'GTM Audience Tile Hero',
    description: 'GTM audience visualization for customer experience.',
    marketingFunction: 'customer-experience-cx',
    tags: ['customer-experience', 'audience', 'gtm'],
    sourceType: 'custom',
    componentPath: 'GTMAudienceTileHero.tsx',
    component: GTMAudienceTileHero,
    featured: false,
    route: '/expertise/customer-experience-cx',
    order: 2,
  },

  // Customer Marketing
  {
    id: 'content-marketing-hero',
    title: 'Content Marketing Hero',
    description: 'Content marketing hero for customer marketing.',
    marketingFunction: 'customer-marketing',
    tags: ['customer-marketing', 'content', 'hero'],
    sourceType: 'custom',
    componentPath: 'ContentMarketingHero.tsx',
    component: ContentMarketingHero,
    featured: true,
    route: '/expertise/customer-marketing',
    order: 1,
  },
  {
    id: 'crm-campaigns-tile',
    title: 'CRM Campaigns Tile',
    description: 'CRM campaigns visualization for customer marketing.',
    marketingFunction: 'customer-marketing',
    tags: ['customer-marketing', 'crm', 'campaigns'],
    sourceType: 'custom',
    componentPath: 'CRMCampaignsTile.tsx',
    component: CRMCampaignsTile,
    featured: false,
    route: '/expertise/customer-marketing',
    order: 2,
  },

  // Demand Generation

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
  {
    id: 'demand-generation-hero',
    title: 'Demand Generation Hero',
    description: 'Demand generation hero visualization.',
    marketingFunction: 'demand-generation',
    tags: ['demand-gen', 'hero'],
    sourceType: 'custom',
    componentPath: 'DemandGenerationHero.tsx',
    component: DemandGenerationHero,
    featured: false,
    route: '/expertise/demand-generation',
    order: 3,
  },

  // Developer Tools (industry)
  {
    id: 'developer-marketing',
    title: 'Developer Marketing',
    description: 'Developer tools and DevOps marketing visualization.',
    marketingFunction: 'developer-tools',
    tags: ['developer', 'devops', 'marketing'],
    sourceType: 'custom',
    componentPath: 'Developer-Marketing.tsx',
    component: DeveloperMarketing,
    featured: true,
    route: '/industries/developer-tools',
    order: 1,
  },
  {
    id: 'dev-marketers',
    title: 'Dev Marketers',
    description: 'Developer marketers dashboard.',
    marketingFunction: 'developer-tools',
    tags: ['developer', 'marketers'],
    sourceType: 'custom',
    componentPath: 'DevMarketers.tsx',
    component: DevMarketers,
    featured: false,
    route: '/industries/developer-tools',
    order: 2,
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
  {
    id: 'demand-generation-hero-tile',
    title: 'Demand Generation Hero Tile',
    description: 'Demand generation hero tile for email marketing context.',
    marketingFunction: 'email-marketing',
    tags: ['email', 'demand-gen', 'tile'],
    sourceType: 'custom',
    componentPath: 'DemandGenerationHeroTile.tsx',
    component: DemandGenerationHeroTile,
    featured: false,
    route: '/expertise/email-marketing',
    order: 2,
  },

  // Event Marketing
  {
    id: 'event-marketing',
    title: 'Event Marketing',
    description: 'Event marketing visualization.',
    marketingFunction: 'event-marketing',
    tags: ['event', 'marketing'],
    sourceType: 'custom',
    componentPath: 'EventMarketing.tsx',
    component: EventMarketing,
    featured: true,
    route: '/expertise/event-marketing',
    order: 1,
  },
  {
    id: 'executive-logistics-dashboard',
    title: 'Executive Logistics Dashboard',
    description: 'Executive logistics and event management dashboard.',
    marketingFunction: 'event-marketing',
    tags: ['event', 'logistics', 'executive'],
    sourceType: 'custom',
    componentPath: 'ExecutiveLogisticsDashboard.tsx',
    component: ExecutiveLogisticsDashboard,
    featured: false,
    route: '/expertise/event-marketing',
    order: 2,
  },

  // Growth Marketing
  {
    id: 'growth-marketing-hero',
    title: 'Growth Marketing Hero',
    description: 'Growth marketing hero visualization.',
    marketingFunction: 'growth-marketing',
    tags: ['growth', 'marketing', 'hero'],
    sourceType: 'custom',
    componentPath: 'GrowthMarketingHero.tsx',
    component: GrowthMarketingHero,
    featured: true,
    route: '/expertise/growth-marketing',
    order: 1,
  },

  // Education (industry)
  {
    id: 'edu-marketers-dashboard',
    title: 'Edu Marketers Dashboard',
    description: 'K-12 and Higher Education marketing dashboard.',
    marketingFunction: 'education',
    tags: ['education', 'k12', 'higher-ed', 'marketing'],
    sourceType: 'custom',
    componentPath: 'EduMarketersDashboard.tsx',
    component: EduMarketersDashboard,
    featured: true,
    route: '/industries/education',
    order: 1,
  },
  {
    id: 'higher-ed-marketing-tile',
    title: 'Higher ED Marketing Tile',
    description: 'Higher education marketing tile visualization.',
    marketingFunction: 'education',
    tags: ['education', 'higher-ed', 'tile'],
    sourceType: 'custom',
    componentPath: 'HigherEDMarketingTile.tsx',
    component: HigherEDMarketingTile,
    featured: false,
    route: '/industries/education',
    order: 2,
  },

  // Lifecycle Marketing
  {
    id: 'apex-shield-lifecycle-engine',
    title: 'Apex Shield Lifecycle Engine',
    description: 'Lifecycle marketing engine visualization.',
    marketingFunction: 'lifecycle-marketing',
    tags: ['lifecycle', 'engine', 'marketing'],
    sourceType: 'custom',
    componentPath: 'ApexShieldLifecycleEngine.tsx',
    component: ApexShieldLifecycleEngine,
    featured: true,
    route: '/expertise/lifecycle-marketing',
    order: 1,
  },
  {
    id: 'nexus-stakeholder-portal',
    title: 'Nexus Stakeholder Portal',
    description: 'Stakeholder portal for lifecycle marketing.',
    marketingFunction: 'lifecycle-marketing',
    tags: ['lifecycle', 'stakeholder', 'portal'],
    sourceType: 'custom',
    componentPath: 'NexusStakeholderPortal.tsx',
    component: NexusStakeholderPortal,
    featured: false,
    route: '/expertise/lifecycle-marketing',
    order: 2,
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
  {
    id: 'manufacturing-lifecycle-dashboard',
    title: 'Manufacturing Lifecycle Dashboard',
    description: 'Manufacturing lifecycle dashboard visualization.',
    marketingFunction: 'manufacturing',
    tags: ['manufacturing', 'lifecycle', 'dashboard'],
    sourceType: 'custom',
    componentPath: 'Manufacturing-LifecycleDashboard.tsx',
    component: ManufacturingLifecycleDashboard,
    featured: false,
    route: '/industries/manufacturing',
    order: 3,
  },

  // Marketing Operations - add MarketingOperationsTile
  {
    id: 'marketing-operations-tile',
    title: 'Marketing Operations Tile',
    description: 'Marketing operations tile visualization.',
    marketingFunction: 'marketing-operations',
    tags: ['marketing-ops', 'tile', 'operations'],
    sourceType: 'custom',
    componentPath: 'MarketingOperationsTile.tsx',
    component: MarketingOperationsTile,
    featured: false,
    route: '/expertise/marketing-operations',
    order: 3,
  },

  // Video Marketing - add Video-Marketing-Analytics-Tile and VideoCreativeHero
  {
    id: 'video-marketing-analytics-tile',
    title: 'Video Marketing Analytics Tile',
    description: 'Video marketing analytics tile visualization.',
    marketingFunction: 'video-marketing',
    tags: ['video', 'analytics', 'tile'],
    sourceType: 'custom',
    componentPath: 'Video-Marketing-Analytics-Tile.tsx',
    component: VideoMarketingAnalyticsTileFile,
    featured: false,
    route: '/expertise/video-marketing',
    order: 2,
  },
  {
    id: 'video-marketing-hero',
    title: 'Video Marketing Hero',
    description: 'Video marketing hero visualization.',
    marketingFunction: 'video-marketing',
    tags: ['video', 'hero', 'creative'],
    sourceType: 'custom',
    componentPath: 'VideoCreativeHero.tsx',
    component: VideoCreativeHero,
    featured: false,
    route: '/expertise/video-marketing',
    order: 3,
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
