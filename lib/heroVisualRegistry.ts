import type { ComponentType } from 'react'
import VideoMarketingAnalyticsTile from '@/src/components/animations/Video-Marketing-Analytics'
import SEOAnimation from '@/src/components/animations/SEO-GrowthFlow'
import MarketingAnalytics from '@/src/components/animations/Marketing-Analytics-Carousel'
import MarketingAutomationLiveFeed from '@/src/components/animations/Marketing-Automation-Live-Feed'
import ABMPipelineStrategy from '@/src/components/animations/ABM-Pipeline-Strategy'
import GTMStackPro from '@/src/components/animations/GTMStackPro'
import PipelineDashboard from '@/src/components/animations/PipelineDashboard'
import QuantumDashboard from '@/src/components/animations/QuantumDashboard'
import DemandGenFlow from '@/src/components/animations/DemandGenFlow'
import IndustrialDashboard from '@/src/components/animations/IndustrialDashboard'

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
  {
    route: '/',
    title: 'GTMStack',
    mediaType: 'animation',
    component: GTMStackPro,
  },
  {
    route: '/expertise/account-based-marketing-abm',
    title: 'ABM',
    mediaType: 'animation',
    component: ABMPipelineStrategy,
  },
  {
    route: '/expertise/demand-generation',
    title: 'Demand Generation',
    mediaType: 'animation',
    component: DemandGenFlow,
  },
  {
    route: '/expertise/marketing-automation',
    title: 'Marketing Automation',
    mediaType: 'animation',
    component: MarketingAutomationLiveFeed,
  },
  {
    route: '/expertise/marketing-operations',
    title: 'Marketing Operations',
    mediaType: 'animation',
    component: MarketingAnalytics,
  },
  {
    route: '/expertise/omnichannel-marketing',
    title: 'Omnichannel Marketing',
    mediaType: 'animation',
    component: QuantumDashboard,
  },
  {
    route: '/expertise/search-engine-optimization',
    title: 'SEO',
    mediaType: 'animation',
    component: SEOAnimation,
  },
  {
    route: '/expertise/video-marketing',
    title: 'Video Marketing',
    mediaType: 'animation',
    component: VideoMarketingAnalyticsTile,
  },
  {
    route: '/industries/manufacturing',
    title: 'Manufacturing',
    mediaType: 'animation',
    component: IndustrialDashboard,
  },
]

export function getHeroVisualForPath(pathname: string): HeroVisualEntry | null {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  return HERO_VISUAL_REGISTRY.find((e) => e.route === normalized) ?? null
}
