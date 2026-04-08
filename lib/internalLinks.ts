import type { CaseStudyItem, ExpertiseItem, IndustryItem } from '@/lib/types'
import { getPageByRoute, getPageBySlug } from '@/lib/pageRegistry'

export type ConnectedPageLink = {
  href: string
  label: string
  description: string
  icon?: string
}

type LinkBlueprint = {
  href?: string
  expertiseSlug?: string
  industrySlug?: string
  caseStudySlug?: string
  label: string
  description: string
  icon?: string
}

export type ExpertisePillarId =
  | 'content-engagement'
  | 'demand-growth'
  | 'strategy-insights'
  | 'systems-operations'

const STATIC_PUBLIC_ROUTES = new Set([
  '/',
  '/about',
  '/blog',
  '/case-studies',
  '/contact',
  '/expertise',
  '/gallery',
  '/industries',
  '/projects',
])

function normalizeRoute(route: string): string {
  const [pathname] = route.split('?')
  return pathname === '/' ? pathname : pathname.replace(/\/$/, '')
}

export function isPublicRoute(route: string): boolean {
  const normalized = normalizeRoute(route)
  return STATIC_PUBLIC_ROUTES.has(normalized) || Boolean(getPageByRoute(normalized))
}

export function getPublicExpertiseHref(slug: string): string | null {
  return getPageBySlug('expertise', slug)?.route ?? null
}

export function getPublicIndustryHref(slug: string): string | null {
  return getPageBySlug('industries', slug)?.route ?? null
}

export function getPublicCaseStudyHref(
  slug: string,
  preferred: 'case-studies' | 'projects' = 'case-studies'
): string | null {
  const primary = getPageBySlug(preferred, slug)?.route
  if (primary) return primary

  const fallbackSection = preferred === 'case-studies' ? 'projects' : 'case-studies'
  return getPageBySlug(fallbackSection, slug)?.route ?? null
}

export function filterPublicExpertiseItems<T extends ExpertiseItem>(items: T[]): T[] {
  return items.filter((item) => Boolean(getPublicExpertiseHref(item.slug)))
}

export function filterPublicIndustryItems<T extends IndustryItem>(items: T[]): T[] {
  return items.filter((item) => Boolean(getPublicIndustryHref(item.slug)))
}

export function filterPublicCaseStudyItems<T extends CaseStudyItem>(
  items: T[],
  preferred: 'case-studies' | 'projects' = 'case-studies'
): T[] {
  return items.filter((item) => Boolean(getPublicCaseStudyHref(item.slug, preferred)))
}

export function dedupeConnectedLinks(links: ConnectedPageLink[]): ConnectedPageLink[] {
  const seen = new Set<string>()
  const deduped: ConnectedPageLink[] = []

  for (const link of links) {
    if (!isPublicRoute(link.href) || seen.has(link.href)) continue
    seen.add(link.href)
    deduped.push(link)
  }

  return deduped
}

function resolveBlueprintLink(blueprint: LinkBlueprint): ConnectedPageLink | null {
  const href =
    blueprint.href && isPublicRoute(blueprint.href)
      ? normalizeRoute(blueprint.href)
      : blueprint.expertiseSlug
        ? getPublicExpertiseHref(blueprint.expertiseSlug)
        : blueprint.industrySlug
          ? getPublicIndustryHref(blueprint.industrySlug)
          : blueprint.caseStudySlug
            ? getPublicCaseStudyHref(blueprint.caseStudySlug)
            : null

  if (!href) return null

  return {
    href,
    label: blueprint.label,
    description: blueprint.description,
    icon: blueprint.icon,
  }
}

function buildConnectedLinks(blueprints: LinkBlueprint[]): ConnectedPageLink[] {
  return dedupeConnectedLinks(
    blueprints
      .map(resolveBlueprintLink)
      .filter((link): link is ConnectedPageLink => Boolean(link))
  )
}

const PILLAR_LINK_BLUEPRINTS: Record<ExpertisePillarId, LinkBlueprint[]> = {
  'content-engagement': [
    {
      expertiseSlug: 'content-marketing',
      label: 'Content architecture and messaging systems',
      description: 'Move from the pillar view into structured content, editorial systems, and thought-leadership execution.',
      icon: 'PenTool',
    },
    {
      expertiseSlug: 'search-engine-optimization',
      label: 'Search visibility and discovery design',
      description: 'See how content depth, search intent, and discoverability connect to this pillar.',
      icon: 'Search',
    },
    {
      industrySlug: 'technology-saas',
      label: 'How SaaS teams apply these motions',
      description: 'Explore an industry page where content systems, search, and lifecycle storytelling work together.',
      icon: 'Cloud',
    },
    {
      href: '/case-studies',
      label: 'Proof across campaigns and content engines',
      description: 'Browse case studies to see how these ideas show up in shipped GTM programs.',
      icon: 'FileText',
    },
  ],
  'demand-growth': [
    {
      expertiseSlug: 'demand-generation',
      label: 'Demand generation campaign systems',
      description: 'Go deeper on the campaign, sequencing, and conversion mechanics behind the pillar.',
      icon: 'TrendingUp',
    },
    {
      expertiseSlug: 'paid-advertising-sem',
      label: 'Paid media and funnel optimization',
      description: 'Compare how acquisition efficiency and funnel design support the broader growth engine.',
      icon: 'Megaphone',
    },
    {
      industrySlug: 'financial-services',
      label: 'Demand motions in regulated markets',
      description: 'See how long-cycle, compliance-heavy environments change targeting, trust, and pipeline design.',
      icon: 'Landmark',
    },
    {
      href: '/case-studies',
      label: 'Pipeline outcomes and execution proof',
      description: 'Jump into the case studies hub for examples of these systems in-market.',
      icon: 'ArrowUpRight',
    },
  ],
  'strategy-insights': [
    {
      expertiseSlug: 'product-marketing',
      label: 'Positioning, messaging, and launch clarity',
      description: 'Follow this pillar into the product and narrative systems that sharpen GTM decisions.',
      icon: 'Package',
    },
    {
      expertiseSlug: 'customer-marketing',
      label: 'Lifecycle and customer expansion strategy',
      description: 'See how post-sale journeys and account intelligence extend the strategic model.',
      icon: 'Users',
    },
    {
      industrySlug: 'manufacturing',
      label: 'Strategic GTM in complex buying environments',
      description: 'Explore a market where multi-stakeholder journeys and positioning depth matter most.',
      icon: 'Factory',
    },
    {
      href: '/case-studies',
      label: 'Related strategic proof',
      description: 'Compare the strategic choices here with live case studies and operating outcomes.',
      icon: 'FileText',
    },
  ],
  'systems-operations': [
    {
      expertiseSlug: 'marketing-automation',
      label: 'Automation and workflow orchestration',
      description: 'Go one layer deeper into the operational systems that keep the revenue engine moving.',
      icon: 'Workflow',
    },
    {
      expertiseSlug: 'marketing-analytics-reporting',
      label: 'Analytics, dashboards, and measurement',
      description: 'See how reporting and instrumentation support the systems side of GTM.',
      icon: 'BarChart3',
    },
    {
      industrySlug: 'developer-tools',
      label: 'Operational rigor for technical products',
      description: 'Explore an industry context where systems, telemetry, and adoption workflows are central.',
      icon: 'Terminal',
    },
    {
      href: '/case-studies',
      label: 'Systems-led delivery examples',
      description: 'Browse proof of automation, reporting, and RevOps work across the portfolio.',
      icon: 'FileText',
    },
  ],
}

const CASE_STUDIES_HUB_BLUEPRINTS: LinkBlueprint[] = [
  {
    expertiseSlug: 'account-based-marketing',
    label: 'The operating systems behind the proof',
    description: 'Start with a core expertise page to understand the mechanics beneath the case studies.',
    icon: 'Compass',
  },
  {
    industrySlug: 'technology-saas',
    label: 'Market context for recurring GTM patterns',
    description: 'See an industry page where many of these growth, lifecycle, and RevOps patterns recur.',
    icon: 'Cloud',
  },
  {
    href: '/industries',
    label: 'Browse adjacent industry contexts',
    description: 'Move from project proof into the sectors, constraints, and buyer environments around the work.',
    icon: 'Building2',
  },
  {
    href: '/expertise',
    label: 'Explore the capability index',
    description: 'Use the expertise hub to branch into the specific systems, channels, and motions behind each result.',
    icon: 'Layers',
  },
]

const INDUSTRIES_HUB_BLUEPRINTS: LinkBlueprint[] = [
  {
    industrySlug: 'technology-saas',
    label: 'Explore a high-signal SaaS route',
    description: 'Start with a flagship industry page to see how category context connects to GTM structure.',
    icon: 'Cloud',
  },
  {
    expertiseSlug: 'account-based-marketing',
    label: 'See the capabilities that travel across sectors',
    description: 'Jump into a core expertise page to understand the reusable systems behind multiple industries.',
    icon: 'Compass',
  },
  {
    href: '/case-studies',
    label: 'Compare industry context with shipped proof',
    description: 'Move into the case studies hub to see outcomes, decisions, and metrics behind the market stories.',
    icon: 'FileText',
  },
  {
    href: '/expertise',
    label: 'Browse the broader expertise index',
    description: 'Use the expertise hub to follow each industry into the operating motions that support it.',
    icon: 'Layers',
  },
]

export function getPillarConnectedLinks(pillarId: ExpertisePillarId): ConnectedPageLink[] {
  return buildConnectedLinks(PILLAR_LINK_BLUEPRINTS[pillarId])
}

export function getCaseStudiesHubConnectedLinks(): ConnectedPageLink[] {
  return buildConnectedLinks(CASE_STUDIES_HUB_BLUEPRINTS)
}

export function getIndustriesHubConnectedLinks(): ConnectedPageLink[] {
  return buildConnectedLinks(INDUSTRIES_HUB_BLUEPRINTS)
}
