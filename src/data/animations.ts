import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { ANIMATION_CATALOG } from '@/src/data/animationCatalog.generated'

// Source of truth for route/title/component: src/components/animations/gtmstack-pro-library.csv (Update-Library: src/data/animations.ts)
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
const SystemsProcessTile = dynamic(
  () => import('@/src/components/animations/SystemsProcessTile'),
  { ssr: false }
)
const FleetTile = dynamic(
  () => import('@/src/components/animations/FleetTile'),
  { ssr: false }
)
const HealthCareTile = dynamic(
  () => import('@/src/components/animations/HealthCareTile'),
  { ssr: false }
)
const EnergyGridTile = dynamic(
  () => import('@/src/components/animations/EnergyGridTile'),
  { ssr: false }
)
const TelcoAITile = dynamic(
  () => import('@/src/components/animations/TelcoAITile'),
  { ssr: false }
)
const ScalabilityRadar = dynamic(
  () => import('@/src/components/animations/ScalabilityRadar'),
  { ssr: false }
)
const PubSecTile = dynamic(
  () => import('@/src/components/animations/PubSecTile'),
  { ssr: false }
)
const PowerGridDashboard = dynamic(
  () => import('@/src/components/animations/PowerGridDashboard'),
  { ssr: false }
)
const FleetROICalculator = dynamic(
  () => import('@/src/components/animations/FleetROICalculator'),
  { ssr: false }
)
const EngineeringWorkflowSystem = dynamic(
  () => import('@/src/components/animations/EngineeringWorkflowSystem'),
  { ssr: false }
)
const EnergyFlowDigital = dynamic(
  () => import('@/src/components/animations/EnergyFlowDigital'),
  { ssr: false }
)
const EdJourneyK12Ecosystem = dynamic(
  () => import('@/src/components/animations/EdJourneyK12Ecosystem'),
  { ssr: false }
)
const EdTechCompactROIFunnel = dynamic(
  () => import('@/src/components/animations/EdTechCompactROIFunnel'),
  { ssr: false }
)
const FinancialTile = dynamic(
  () => import('@/src/components/animations/FinancialTile'),
  { ssr: false }
)
const ClinicalHolographicControlSurface = dynamic(
  () => import('@/src/components/animations/ClinicalHolographicControlSurface'),
  { ssr: false }
)
const EngineeringWorkflow = dynamic(
  () => import('@/src/components/animations/EngineeringWorkflow'),
  { ssr: false }
)
const EventPulse = dynamic(
  () => import('@/src/components/animations/EventPulse'),
  { ssr: false }
)
const ImpactDashboard = dynamic(
  () => import('@/src/components/animations/ImpactDashboard'),
  { ssr: false }
)
const StrategyInsightsTile = dynamic(
  () => import('@/src/components/animations/StrategyInsightsTile'),
  { ssr: false }
)
const ContentStrategistDashboard = dynamic(
  () => import('@/src/components/animations/ContentStrategistDashboard'),
  { ssr: false }
)
const SalesEnablementTile = dynamic(
  () => import('@/src/components/animations/SalesEnablementTile'),
  { ssr: false }
)
const OmnichannelLiveAnalytics = dynamic(
  () => import('@/src/components/animations/OmnichannelLiveAnalytics'),
  { ssr: false }
)
const MarTechTile = dynamic(
  () => import('@/src/components/animations/MarTechTile'),
  { ssr: false }
)
const KpiSpotlightMosaic = dynamic(
  () => import('@/src/components/animations/KpiSpotlightMosaic'),
  { ssr: false }
)
const GTMAudienceTile = dynamic(
  () => import('@/src/components/animations/GTMAudienceTile'),
  { ssr: false }
)
const EsgAnalyticsHub = dynamic(
  () => import('@/src/components/animations/EsgAnalyticsHub'),
  { ssr: false }
)
const DriftGuard = dynamic(
  () => import('@/src/components/animations/DriftGuard'),
  { ssr: false }
)
const DemandGrowthTile = dynamic(
  () => import('@/src/components/animations/DemandGrowthTile'),
  { ssr: false }
)
const RevOpsMeshTile = dynamic(
  () => import('@/src/components/animations/RevOpsMeshTile'),
  { ssr: false }
)
const OilGasTile = dynamic(
  () => import('@/src/components/animations/OilGasTile'),
  { ssr: false }
)
const Lifecycle360 = dynamic(
  () => import('@/src/components/animations/Lifecycle-360'),
  { ssr: false }
)
const GrowthSEMTile = dynamic(
  () => import('@/src/components/animations/GrowthSEMTile'),
  { ssr: false }
)
const EocLogisticsDashboard = dynamic(
  () => import('@/src/components/animations/EocLogisticsDashboard'),
  { ssr: false }
)
const SocialMediaHero = dynamic(
  () => import('@/src/components/animations/SocialMediaHero'),
  { ssr: false }
)
const EDUMarketingTile = dynamic(
  () => import('@/src/components/animations/EDUMarketingTile'),
  { ssr: false }
)
const RevOpsDashboard = dynamic(
  () => import('@/src/components/animations/RevOpsDashboard'),
  { ssr: false }
)
const RevOpsDash = dynamic(
  () => import('@/src/components/animations/RevOpsDash'),
  { ssr: false }
)
const ABMPipeTrackerTile = dynamic(
  () => import('@/src/components/animations/ABMPipeTrackerTile'),
  { ssr: false }
)
const AIGrowth = dynamic(
  () => import('@/src/components/animations/AIGrowth'),
  { ssr: false }
)
const GTMStackHero = dynamic(
  () => import('@/src/components/animations/GTMStackHero'),
  { ssr: false }
)
const PlgJourneyDashboard = dynamic(
  () => import('@/src/components/animations/PlgJourneyDashboard'),
  { ssr: false }
)
const EnterpriseSalesMotionDashboard = dynamic(
  () => import('@/src/components/animations/EnterpriseSalesMotionDashboard'),
  { ssr: false }
)
const EventMarketingTile = dynamic(
  () => import('@/src/components/animations/EventMarketingTile'),
  { ssr: false }
)
const LeadGenBanner = dynamic(
  () => import('@/src/components/animations/LeadGenBanner'),
  { ssr: false }
)
const MarketingFunnel = dynamic(
  () => import('@/src/components/animations/MarketingFunnel'),
  { ssr: false }
)
const NGOSDOTile = dynamic(
  () => import('@/src/components/animations/NGOSDOTile'),
  { ssr: false }
)
const NGOTile = dynamic(
  () => import('@/src/components/animations/NGOTile'),
  { ssr: false }
)
const PaidAdvertisingHero = dynamic(
  () => import('@/src/components/animations/PaidAdvertisingHero'),
  { ssr: false }
)
const SEOHero = dynamic(
  () => import('@/src/components/animations/SEOHero'),
  { ssr: false }
)
const SEOKeywordDiscovery = dynamic(
  () => import('@/src/components/animations/SEOKeywordDiscovery'),
  { ssr: false }
)
const WasteMan = dynamic(
  () => import('@/src/components/animations/WasteMan'),
  { ssr: false }
)
const EngineeringExcellenceWorkflowTile = dynamic(
  () => import('@/src/components/animations/EngineeringExcellenceWorkflowTile'),
  { ssr: false }
)
const GrowthMarketingTile = dynamic(
  () => import('@/src/components/animations/GrowthMarketingTile'),
  { ssr: false }
)
const OmniRetailTile = dynamic(
  () => import('@/src/components/animations/OmniRetailTile'),
  { ssr: false }
)
const WealthManageTile = dynamic(
  () => import('@/src/components/animations/WealthManageTile'),
  { ssr: false }
)
const ABM90Days = dynamic(
  () => import('@/src/components/animations/ABM90Days'),
  { ssr: false }
)
const ContentEngagementTile = dynamic(
  () => import('@/src/components/animations/ContentEngagementTile'),
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
  | 'social-media-marketing'
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

export type AnimationDifficulty = 'beginner' | 'intermediate' | 'advanced'

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
  /** Optional difficulty for gallery filtering */
  difficulty?: AnimationDifficulty
  /** Optional link to source code (e.g. GitHub) */
  codeUrl?: string
  /** Optional link to live preview */
  previewUrl?: string
}

/**
 * Animation registry - single source of truth for all animations.
 * Maps marketing functions to multiple animation variations.
 */
const LEGACY_ANIMATION_REGISTRY: AnimationEntry[] = [
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

const metaById = Object.fromEntries(
  ANIMATION_CATALOG.map((i) => [i.id, i])
)

function mergeGeneratedMeta(entry: AnimationEntry): AnimationEntry {
  const meta = metaById[entry.id]
  if (!meta) return entry
  return {
    ...entry,
    title: meta.title ?? entry.title,
    description: meta.description ?? entry.description,
    tags: Array.from(new Set([...(entry.tags ?? []), ...((meta.keywords ?? []) as string[])])),
    previewImage: meta.thumbnailSrc ?? entry.previewImage,
  }
}

const PREVIEW_ONLY_ANIMATION_REGISTRY_BASE: AnimationEntry[] = [
  {
    id: 'rev-ops-dash',
    title: 'RevOps Dashboard',
    description: 'Preview-only entry for hero tile rendering.',
    marketingFunction: 'marketing-operations',
    tags: ['revops', 'dashboard', 'revenue', 'operations'],
    sourceType: 'custom',
    componentPath: 'RevOpsDash.tsx',
    component: RevOpsDash,
    featured: false,
  },
  {
    id: 'systems-process-tile',
    title: 'Systems Process Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-operations',
    tags: ['systems', 'process', 'tile'],
    sourceType: 'custom',
    componentPath: 'SystemsProcessTile.tsx',
    component: SystemsProcessTile,
    featured: false,
  },
  {
    id: 'fleet-tile',
    title: 'Fleet Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'manufacturing',
    tags: ['fleet', 'tile'],
    sourceType: 'custom',
    componentPath: 'FleetTile.tsx',
    component: FleetTile,
    featured: false,
  },
  {
    id: 'health-care-tile',
    title: 'Health Care Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'customer-experience-cx',
    tags: ['healthcare', 'tile'],
    sourceType: 'custom',
    componentPath: 'HealthCareTile.tsx',
    component: HealthCareTile,
    featured: false,
  },
  {
    id: 'energy-grid-tile',
    title: 'Energy Grid Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'manufacturing',
    tags: ['energy', 'grid', 'tile'],
    sourceType: 'custom',
    componentPath: 'EnergyGridTile.tsx',
    component: EnergyGridTile,
    featured: false,
  },
  {
    id: 'telco-a-i-tile',
    title: 'Telco AI Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'customer-experience-cx',
    tags: ['telco', 'ai', 'tile'],
    sourceType: 'custom',
    componentPath: 'TelcoAITile.tsx',
    component: TelcoAITile,
    featured: false,
  },
  {
    id: 'rev-ops-mesh-tile',
    title: 'RevOps Mesh Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-operations',
    tags: ['revops', 'mesh', 'tile'],
    sourceType: 'custom',
    componentPath: 'RevOpsMeshTile.tsx',
    component: RevOpsMeshTile,
    featured: false,
  },
  {
    id: 'oil-gas-tile',
    title: 'Oil and Gas Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'manufacturing',
    tags: ['oil', 'gas', 'tile'],
    sourceType: 'custom',
    componentPath: 'OilGasTile.tsx',
    component: OilGasTile,
    featured: false,
  },
  {
    id: 'lifecycle-360',
    title: 'Lifecycle 360',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-automation',
    tags: ['lifecycle', 'dashboard'],
    sourceType: 'custom',
    componentPath: 'Lifecycle-360.tsx',
    component: Lifecycle360,
    featured: false,
  },
  {
    id: 'growth-s-e-m-tile',
    title: 'Growth SEM Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'growth-marketing',
    tags: ['growth', 'sem', 'tile'],
    sourceType: 'custom',
    componentPath: 'GrowthSEMTile.tsx',
    component: GrowthSEMTile,
    featured: false,
  },
  {
    id: 'eoc-logistics-dashboard',
    title: 'EOC Logistics Dashboard',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'event-marketing',
    tags: ['eoc', 'logistics', 'dashboard'],
    sourceType: 'custom',
    componentPath: 'EocLogisticsDashboard.tsx',
    component: EocLogisticsDashboard,
    featured: false,
  },
  {
    id: 'social-media-hero',
    title: 'Social Media Hero',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'social-media-marketing',
    tags: ['social', 'media', 'hero'],
    sourceType: 'custom',
    componentPath: 'SocialMediaHero.tsx',
    component: SocialMediaHero,
    featured: false,
  },
  {
    id: 'e-d-u-marketing-tile',
    title: 'EDU Marketing Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'education',
    tags: ['education', 'marketing', 'tile'],
    sourceType: 'custom',
    componentPath: 'EDUMarketingTile.tsx',
    component: EDUMarketingTile,
    featured: false,
  },
  {
    id: 'scalability-radar',
    title: 'Scalability Radar',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-operations',
    tags: ['scalability', 'radar'],
    sourceType: 'custom',
    componentPath: 'ScalabilityRadar.tsx',
    component: ScalabilityRadar,
    featured: false,
  },
  {
    id: 'pub-sec-tile',
    title: 'Pub Sec Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'customer-experience-cx',
    tags: ['public-sector', 'tile'],
    sourceType: 'custom',
    componentPath: 'PubSecTile.tsx',
    component: PubSecTile,
    featured: false,
  },
  {
    id: 'power-grid-dashboard',
    title: 'Power Grid Dashboard',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'manufacturing',
    tags: ['power', 'grid', 'dashboard'],
    sourceType: 'custom',
    componentPath: 'PowerGridDashboard.tsx',
    component: PowerGridDashboard,
    featured: false,
  },
  {
    id: 'fleet-r-o-i-calculator',
    title: 'Fleet ROI Calculator',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'manufacturing',
    tags: ['fleet', 'roi', 'calculator'],
    sourceType: 'custom',
    componentPath: 'FleetROICalculator.tsx',
    component: FleetROICalculator,
    featured: false,
  },
  {
    id: 'engineering-workflow-system',
    title: 'Engineering Workflow System',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'developer-tools',
    tags: ['engineering', 'workflow', 'system'],
    sourceType: 'custom',
    componentPath: 'EngineeringWorkflowSystem.tsx',
    component: EngineeringWorkflowSystem,
    featured: false,
  },
  {
    id: 'energy-flow-digital',
    title: 'Energy Flow Digital',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'manufacturing',
    tags: ['energy', 'flow', 'digital'],
    sourceType: 'custom',
    componentPath: 'EnergyFlowDigital.tsx',
    component: EnergyFlowDigital,
    featured: false,
  },
  {
    id: 'ed-journey-k12-ecosystem',
    title: 'Ed Journey K12 Ecosystem',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'education',
    tags: ['education', 'journey', 'ecosystem'],
    sourceType: 'custom',
    componentPath: 'EdJourneyK12Ecosystem.tsx',
    component: EdJourneyK12Ecosystem,
    featured: false,
  },
  {
    id: 'ed-tech-compact-r-o-i-funnel',
    title: 'EdTech Compact ROI Funnel',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'education',
    tags: ['education', 'roi', 'funnel'],
    sourceType: 'custom',
    componentPath: 'EdTechCompactROIFunnel.tsx',
    component: EdTechCompactROIFunnel,
    featured: false,
  },
  {
    id: 'financial-tile',
    title: 'Financial Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'growth-marketing',
    tags: ['financial', 'tile'],
    sourceType: 'custom',
    componentPath: 'FinancialTile.tsx',
    component: FinancialTile,
    featured: false,
  },
  {
    id: 'clinical-holographic-control-surface',
    title: 'Clinical Holographic Control Surface',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'customer-experience-cx',
    tags: ['clinical', 'holographic', 'surface'],
    sourceType: 'custom',
    componentPath: 'ClinicalHolographicControlSurface.tsx',
    component: ClinicalHolographicControlSurface,
    featured: false,
  },
  {
    id: 'engineering-workflow',
    title: 'Engineering Workflow',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'developer-tools',
    tags: ['engineering', 'workflow'],
    sourceType: 'custom',
    componentPath: 'EngineeringWorkflow.tsx',
    component: EngineeringWorkflow,
    featured: false,
  },
  {
    id: 'event-pulse',
    title: 'Event Pulse',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'event-marketing',
    tags: ['event', 'pulse'],
    sourceType: 'custom',
    componentPath: 'EventPulse.tsx',
    component: EventPulse,
    featured: false,
  },
  {
    id: 'impact-dashboard',
    title: 'Impact Dashboard',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'event-marketing',
    tags: ['impact', 'dashboard'],
    sourceType: 'custom',
    componentPath: 'ImpactDashboard.tsx',
    component: ImpactDashboard,
    featured: false,
  },
  {
    id: 'strategy-insights-tile',
    title: 'Strategy Insights Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'content-marketing',
    tags: ['strategy', 'insights', 'tile'],
    sourceType: 'custom',
    componentPath: 'StrategyInsightsTile.tsx',
    component: StrategyInsightsTile,
    featured: false,
  },
  {
    id: 'content-strategist-dashboard',
    title: 'Content Strategist Dashboard',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'content-marketing',
    tags: ['content', 'strategist', 'dashboard'],
    sourceType: 'custom',
    componentPath: 'ContentStrategistDashboard.tsx',
    component: ContentStrategistDashboard,
    featured: false,
  },
  {
    id: 'sales-enablement-tile',
    title: 'Sales Enablement Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'demand-generation',
    tags: ['sales', 'enablement', 'tile'],
    sourceType: 'custom',
    componentPath: 'SalesEnablementTile.tsx',
    component: SalesEnablementTile,
    featured: false,
  },
  {
    id: 'omnichannel-live-analytics',
    title: 'Omnichannel Live Analytics',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'omnichannel-marketing',
    tags: ['omnichannel', 'analytics'],
    sourceType: 'custom',
    componentPath: 'OmnichannelLiveAnalytics.tsx',
    component: OmnichannelLiveAnalytics,
    featured: false,
  },
  {
    id: 'mar-tech-tile',
    title: 'MarTech Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-operations',
    tags: ['martech', 'tile'],
    sourceType: 'custom',
    componentPath: 'MarTechTile.tsx',
    component: MarTechTile,
    featured: false,
  },
  {
    id: 'kpi-spotlight-mosaic',
    title: 'KPI Spotlight Mosaic',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-operations',
    tags: ['kpi', 'spotlight', 'mosaic'],
    sourceType: 'custom',
    componentPath: 'KpiSpotlightMosaic.tsx',
    component: KpiSpotlightMosaic,
    featured: false,
  },
  {
    id: 'g-t-m-audience-tile',
    title: 'GTM Audience Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'customer-experience-cx',
    tags: ['gtm', 'audience', 'tile'],
    sourceType: 'custom',
    componentPath: 'GTMAudienceTile.tsx',
    component: GTMAudienceTile,
    featured: false,
  },
  {
    id: 'esg-analytics-hub',
    title: 'ESG Analytics Hub',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'growth-marketing',
    tags: ['esg', 'analytics', 'hub'],
    sourceType: 'custom',
    componentPath: 'EsgAnalyticsHub.tsx',
    component: EsgAnalyticsHub,
    featured: false,
  },
  {
    id: 'drift-guard',
    title: 'Drift Guard',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-automation',
    tags: ['drift', 'guard'],
    sourceType: 'custom',
    componentPath: 'DriftGuard.tsx',
    component: DriftGuard,
    featured: false,
  },
  {
    id: 'demand-growth-tile',
    title: 'Demand Growth Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'demand-generation',
    tags: ['demand', 'growth', 'tile'],
    sourceType: 'custom',
    componentPath: 'DemandGrowthTile.tsx',
    component: DemandGrowthTile,
    featured: false,
  },
  {
    id: 'rev-ops-dashboard',
    title: 'RevOps Dashboard',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'marketing-operations',
    tags: ['revops', 'dashboard'],
    sourceType: 'custom',
    componentPath: 'RevOpsDashboard.tsx',
    component: RevOpsDashboard,
    featured: false,
  },
  {
    id: 'a-b-m-pipe-tracker-tile',
    title: 'ABM Pipe Tracker Tile',
    description: 'Preview-only entry for gallery live rendering.',
    marketingFunction: 'account-based-marketing-abm',
    tags: ['abm', 'pipeline', 'tracker'],
    sourceType: 'custom',
    componentPath: 'ABMPipeTrackerTile.tsx',
    component: ABMPipeTrackerTile,
    featured: false,
  },
  {
    id: 'ai-growth',
    title: 'AI Growth',
    description: 'AI-driven growth metrics and pipeline visualization.',
    marketingFunction: 'growth-marketing',
    tags: ['ai', 'growth', 'metrics'],
    sourceType: 'google-ai-studio',
    componentPath: 'AIGrowth.tsx',
    component: AIGrowth,
    featured: false,
  },
  {
    id: 'gtm-stack-hero',
    title: 'GTM Stack Hero',
    description: 'GTM stack modules animating from chaos into a unified operating system.',
    marketingFunction: 'home',
    tags: ['gtm', 'stack', 'hero', 'overview'],
    sourceType: 'google-ai-studio',
    componentPath: 'GTMStackHero.tsx',
    component: GTMStackHero,
    featured: false,
  },
  {
    id: 'plg-journey-dashboard',
    title: 'PLG Journey Dashboard',
    description: 'Product-led growth journey and pipeline dashboard.',
    marketingFunction: 'demand-generation',
    tags: ['plg', 'product-led-growth', 'pipeline', 'dashboard'],
    sourceType: 'google-ai-studio',
    componentPath: 'PlgJourneyDashboard.tsx',
    component: PlgJourneyDashboard,
    featured: false,
  },
  {
    id: 'enterprise-sales-motion',
    title: 'Enterprise Sales Motion Dashboard',
    description: 'Enterprise sales motion and revenue pipeline visualization.',
    marketingFunction: 'lifecycle-marketing',
    tags: ['enterprise', 'sales', 'motion', 'pipeline'],
    sourceType: 'google-ai-studio',
    componentPath: 'EnterpriseSalesMotionDashboard.tsx',
    component: EnterpriseSalesMotionDashboard,
    featured: false,
  },
  {
    id: 'event-marketing-tile',
    title: 'Event Marketing Tile',
    description: 'Event marketing metrics and registration pipeline tile.',
    marketingFunction: 'event-marketing',
    tags: ['event', 'marketing', 'tile', 'registration'],
    sourceType: 'google-ai-studio',
    componentPath: 'EventMarketingTile.tsx',
    component: EventMarketingTile,
    featured: false,
  },
  {
    id: 'lead-gen-banner',
    title: 'Lead Gen Banner',
    description: 'Lead generation pipeline and conversion banner animation.',
    marketingFunction: 'demand-generation',
    tags: ['lead-gen', 'banner', 'conversion'],
    sourceType: 'google-ai-studio',
    componentPath: 'LeadGenBanner.tsx',
    component: LeadGenBanner,
    featured: false,
  },
  {
    id: 'marketing-funnel',
    title: 'Marketing Funnel',
    description: 'Full-funnel marketing visualization from awareness to conversion.',
    marketingFunction: 'marketing-operations',
    tags: ['funnel', 'marketing', 'conversion', 'pipeline'],
    sourceType: 'google-ai-studio',
    componentPath: 'MarketingFunnel.tsx',
    component: MarketingFunnel,
    featured: false,
  },
  {
    id: 'ngo-sdo-tile',
    title: 'NGO / SDO Dashboard Tile',
    description: 'Non-profit and standards organization impact dashboard.',
    marketingFunction: 'customer-experience-cx',
    tags: ['ngo', 'sdo', 'non-profit', 'impact'],
    sourceType: 'google-ai-studio',
    componentPath: 'NGOSDOTile.tsx',
    component: NGOSDOTile,
    featured: false,
  },
  {
    id: 'ngo-tile',
    title: 'NGO Dashboard Tile',
    description: 'Non-profit organization marketing and outreach dashboard.',
    marketingFunction: 'customer-experience-cx',
    tags: ['ngo', 'non-profit', 'outreach', 'dashboard'],
    sourceType: 'google-ai-studio',
    componentPath: 'NGOTile.tsx',
    component: NGOTile,
    featured: false,
  },
  {
    id: 'paid-advertising-hero',
    title: 'Paid Advertising Hero',
    description: 'Paid media and SEM campaign performance hero visualization.',
    marketingFunction: 'demand-generation',
    tags: ['paid', 'advertising', 'sem', 'campaigns'],
    sourceType: 'google-ai-studio',
    componentPath: 'PaidAdvertisingHero.tsx',
    component: PaidAdvertisingHero,
    featured: false,
  },
  {
    id: 'seo-hero',
    title: 'SEO Hero',
    description: 'SEO keyword rankings and organic search growth visualization.',
    marketingFunction: 'search-engine-optimization',
    tags: ['seo', 'hero', 'rankings', 'organic'],
    sourceType: 'google-ai-studio',
    componentPath: 'SEOHero.tsx',
    component: SEOHero,
    featured: false,
  },
  {
    id: 'seo-keyword-discovery',
    title: 'SEO Keyword Discovery',
    description: 'SEO keyword research and discovery pipeline visualization.',
    marketingFunction: 'search-engine-optimization',
    tags: ['seo', 'keywords', 'discovery', 'research'],
    sourceType: 'google-ai-studio',
    componentPath: 'SEOKeywordDiscovery.tsx',
    component: SEOKeywordDiscovery,
    featured: false,
  },
  {
    id: 'waste-management',
    title: 'Waste Management Tile',
    description: 'Waste management and environmental services dashboard tile.',
    marketingFunction: 'manufacturing',
    tags: ['waste', 'management', 'environmental', 'logistics'],
    sourceType: 'google-ai-studio',
    componentPath: 'WasteMan.tsx',
    component: WasteMan,
    featured: false,
  },
  {
    id: 'engineering-excellence-workflow',
    title: 'Engineering Excellence Workflow',
    description: 'Engineering workflow excellence and process optimization tile.',
    marketingFunction: 'developer-tools',
    tags: ['engineering', 'excellence', 'workflow', 'process'],
    sourceType: 'google-ai-studio',
    componentPath: 'EngineeringExcellenceWorkflowTile.tsx',
    component: EngineeringExcellenceWorkflowTile,
    featured: false,
  },
  {
    id: 'growth-marketing-tile',
    title: 'Growth Marketing Tile',
    description: 'Growth marketing metrics and conversion optimization tile.',
    marketingFunction: 'growth-marketing',
    tags: ['growth', 'marketing', 'tile', 'conversion'],
    sourceType: 'google-ai-studio',
    componentPath: 'GrowthMarketingTile.tsx',
    component: GrowthMarketingTile,
    featured: false,
  },
  {
    id: 'omni-retail-tile',
    title: 'Omnichannel Retail Tile',
    description: 'Omnichannel retail commerce dashboard and metrics tile.',
    marketingFunction: 'omnichannel-marketing',
    tags: ['omnichannel', 'retail', 'commerce', 'tile'],
    sourceType: 'google-ai-studio',
    componentPath: 'OmniRetailTile.tsx',
    component: OmniRetailTile,
    featured: false,
  },
  {
    id: 'wealth-management-tile',
    title: 'Wealth Management Tile',
    description: 'Financial wealth management and client portfolio dashboard tile.',
    marketingFunction: 'customer-experience-cx',
    tags: ['wealth', 'management', 'financial', 'portfolio'],
    sourceType: 'google-ai-studio',
    componentPath: 'WealthManageTile.tsx',
    component: WealthManageTile,
    featured: false,
  },
  {
    id: 'abm-90-days',
    title: 'ABM 90-Day Strategy',
    description: 'Account-based marketing 90-day pipeline strategy and flow visualization.',
    marketingFunction: 'account-based-marketing-abm',
    tags: ['abm', '90-days', 'pipeline', 'strategy'],
    sourceType: 'google-ai-studio',
    componentPath: 'ABM90Days.tsx',
    component: ABM90Days,
    featured: false,
  },
  {
    id: 'content-engagement-tile',
    title: 'Content Engagement Tile',
    description: 'Content engagement metrics and audience interaction tile.',
    marketingFunction: 'content-marketing',
    tags: ['content', 'engagement', 'tile', 'audience'],
    sourceType: 'google-ai-studio',
    componentPath: 'ContentEngagementTile.tsx',
    component: ContentEngagementTile,
    featured: false,
  },
]

const PREVIEW_ONLY_ANIMATION_REGISTRY: AnimationEntry[] =
  PREVIEW_ONLY_ANIMATION_REGISTRY_BASE.map(mergeGeneratedMeta)

export const ANIMATION_REGISTRY: AnimationEntry[] =
  LEGACY_ANIMATION_REGISTRY.map(mergeGeneratedMeta)

export const ALL_ANIMATION_REGISTRY: AnimationEntry[] = [
  ...ANIMATION_REGISTRY,
  ...PREVIEW_ONLY_ANIMATION_REGISTRY,
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
  return ALL_ANIMATION_REGISTRY.find((anim) => anim.id === id)
}

/**
 * Get all animation IDs (for generateStaticParams)
 */
export function getAllAnimationIds(): string[] {
  return ALL_ANIMATION_REGISTRY.map((anim) => anim.id)
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
