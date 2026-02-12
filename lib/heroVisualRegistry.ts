import type { ComponentType } from 'react'
// Source of truth: src/components/animations/gtmstack-pro-library.csv (Update-Library: lib/heroVisualRegistry.ts)
import AIGrowth from '@/src/components/animations/AIGrowth'
import ContentEngagementTile from '@/src/components/animations/ContentEngagementTile'
import DemandGrowthTile from '@/src/components/animations/DemandGrowthTile'
import EnergyGridTile from '@/src/components/animations/EnergyGridTile'
import GrowthSEMTile from '@/src/components/animations/GrowthSEMTile'
import HealthCareTile from '@/src/components/animations/HealthCareTile'
import MarketingAutomationLiveFeed from '@/src/components/animations/Marketing-Automation-Live-Feed'
import MarTechTile from '@/src/components/animations/MarTechTile'
import NGOTile from '@/src/components/animations/NGOTile'
import OmnichannelLiveAnalytics from '@/src/components/animations/OmnichannelLiveAnalytics'
import OmniRetailTile from '@/src/components/animations/OmniRetailTile'
import PlgJourneyDashboard from '@/src/components/animations/PlgJourneyDashboard'
import PubSecTile from '@/src/components/animations/PubSecTile'
import RevOpsMeshTile from '@/src/components/animations/RevOpsMeshTile'
import SalesEnablementTile from '@/src/components/animations/SalesEnablementTile'
import StrategyInsightsTile from '@/src/components/animations/StrategyInsightsTile'
import SystemsProcessTile from '@/src/components/animations/SystemsProcessTile'
import TelcoAITile from '@/src/components/animations/TelcoAITile'
import WasteMan from '@/src/components/animations/WasteMan'
import WealthManageTile from '@/src/components/animations/WealthManageTile'
import GTMStackPro from '@/src/components/animations/GTMStackPro'
import SocialMediaHero from '@/src/components/animations/SocialMediaHero'

export type HeroVisualMediaType = 'animation' | 'image'

export interface HeroVisualEntry {
  route: string
  title: string
  mediaType: HeroVisualMediaType
  /** Animation component; required when mediaType === 'animation' */
  component?: ComponentType
  /** Path under /public for images; used when mediaType === 'image' */
  imagePath?: string
}

/**
 * Registry mapping routes to hero visuals (animations or images).
 * Source of truth: src/components/animations/gtmstack-pro-library.csv
 * Keep in sync when adding/removing rows. See docs/hero-visual-library-spec.md.
 */
export const HERO_VISUAL_REGISTRY: HeroVisualEntry[] = [
  { route: '/', title: 'GTMStack', mediaType: 'animation', component: AIGrowth },
  { route: '/expertise', title: 'Expertise', mediaType: 'animation', component: GTMStackPro },
  { route: '/expertise/ai-in-marketing', title: 'AI in Marketing', mediaType: 'animation', component: AIGrowth },
  { route: '/expertise/content-engagement', title: 'Content & Engagement', mediaType: 'animation', component: ContentEngagementTile },
  { route: '/expertise/demand-growth', title: 'Demand & Growth', mediaType: 'animation', component: DemandGrowthTile },
  { route: '/expertise/marketing-automation', title: 'Marketing Automation', mediaType: 'animation', component: MarketingAutomationLiveFeed },
  { route: '/expertise/martech-optimization', title: 'MarTech Optimization', mediaType: 'animation', component: MarTechTile },
  { route: '/expertise/paid-advertising', title: 'Paid Advertising (SEM)', mediaType: 'animation', component: GrowthSEMTile },
  { route: '/expertise/product-marketing', title: 'Product Marketing', mediaType: 'animation', component: GrowthSEMTile },
  { route: '/expertise/sales-enablement', title: 'Sales Enablement', mediaType: 'animation', component: SalesEnablementTile },
  { route: '/expertise/social-media-marketing', title: 'Social Media Marketing', mediaType: 'animation', component: SocialMediaHero },
  { route: '/expertise/strategy-insights', title: 'Strategy & Insights', mediaType: 'animation', component: StrategyInsightsTile },
  { route: '/expertise/systems-operations', title: 'Systems & Operations', mediaType: 'animation', component: PlgJourneyDashboard },
  { route: '/industries/ai-ml', title: 'AI - ML', mediaType: 'animation', component: GTMStackPro },
  { route: '/industries/b2b-saas', title: 'B2B SaaS', mediaType: 'animation', component: RevOpsMeshTile },
  { route: '/industries/cybersecurity', title: 'Cybersecurity', mediaType: 'animation', component: OmnichannelLiveAnalytics },
  { route: '/industries/energy-utilities', title: 'Energy: Oil & Gas', mediaType: 'animation', component: EnergyGridTile },
  { route: '/industries/financial-services', title: 'Financial Services', mediaType: 'animation', component: WealthManageTile },
  { route: '/industries/fleet-management-logistics', title: 'Fleet Management and Logistics', mediaType: 'animation', component: SystemsProcessTile },
  { route: '/industries/healthcare', title: 'Healthcare & Health Technology', mediaType: 'animation', component: HealthCareTile },
  { route: '/industries/non-profit-ngo', title: 'Non-profit NGO', mediaType: 'animation', component: NGOTile },
  { route: '/industries/pubsec-government', title: 'Public Sector and Government', mediaType: 'animation', component: PubSecTile },
  { route: '/industries/retail', title: 'Retail & Ecommerce', mediaType: 'animation', component: OmniRetailTile },
  { route: '/industries/telecommunications', title: 'Telecommunications', mediaType: 'animation', component: TelcoAITile },
  { route: '/industries/waste-management', title: 'Waste Management', mediaType: 'animation', component: WasteMan },
]

export function getHeroVisualForPath(pathname: string): HeroVisualEntry | null {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  return HERO_VISUAL_REGISTRY.find((e) => e.route === normalized) ?? null
}
