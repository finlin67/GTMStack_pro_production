import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** Home page content for HomeTemplate (PageContent shape). */
export const HOME_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'Operator-Built GTM Portfolio',
    titleStart: 'Real GTM Work for ',
    titleGradient: 'Complex B2B Teams',
    subtitle:
      'GTMStack.pro is a live portfolio of GTM systems, case studies, and working artifacts across demand, messaging, operations, and measurement.',
    ctaPrimary: 'Browse Expertise',
    ctaSecondary: 'View Case Studies',
  },
  stats: [
    { value: '140%', label: 'Pipeline Growth' },
    { value: '85%', label: 'Retention Rate' },
    { value: '32%', label: 'Win Rate Increase' },
    { value: '24%', label: 'CAC Reduction' },
  ],
  methodology: {
    title: 'The Architectural Method',
    description:
      'A rigid, four-phase engineering framework designed to eliminate leakage and maximize capture across your entire GTM motion.',
    steps: [
      {
        number: '01',
        icon: 'Search',
        title: 'Audit',
        description:
          'Deep forensic dive into GTM, tech stack, funnel leakage.',
        progress: '25%',
      },
      {
        number: '02',
        icon: 'DraftingCompass',
        title: 'Design',
        description:
          'Blueprint for scalable revenue infrastructure.',
        progress: '50%',
      },
      {
        number: '03',
        icon: 'Rocket',
        title: 'Build',
        description:
          'Execute tech integration + campaigns + enablement.',
        progress: '75%',
      },
      {
        number: '04',
        icon: 'Settings',
        title: 'Optimize',
        description:
          'Continuous tuning + A/B testing + scaling.',
        progress: '100%',
      },
    ],
  },
  expertise: {
    title: 'Core Capabilities',
    items: [
      {
        icon: 'TrendingUp',
        title: 'Sales Velocity',
        description:
          'Increasing speed and frequency of closed-won deals via pipeline rigor + coaching.',
        tags: ['Pipeline Rigor', 'Coaching', 'Deal Velocity'],
      },
      {
        icon: 'Map',
        title: 'GTM Strategy',
        description:
          'Market entry + positioning blueprint for competitive dominance.',
        tags: ['Market Entry', 'Positioning', 'Competitive Edge'],
      },
      {
        icon: 'Network',
        title: 'Demand Gen Systems',
        description:
          'Automated high-intent pipeline engines.',
        tags: ['High-Intent', 'Automation', 'Pipeline'],
      },
      {
        icon: 'Settings',
        title: 'Revenue Ops',
        description:
          'Tool, data, and reporting alignment for full GTM visibility.',
        tags: ['Tech Stack', 'Data Alignment', 'Reporting'],
      },
    ],
  },
  quote: {
    text: "We reject the 'growth at all costs' narrative in favor of ",
    highlight: 'measurable, durable growth',
  },
  caseStudies: {
    title: 'Explore Further',
    subtitle: 'See how this expertise translates into real-world results.',
    items: [
      {
        title: 'SaaS Pipeline Expansion',
        description:
          'Unified ABM and RevOps for a Series B SaaS company. Clear attribution and routing drove pipeline growth and deal velocity.',
        outcomeLabel: 'Pipeline growth',
        outcomeValue: '126%',
      },
      {
        title: 'Fintech GTM Launch',
        description:
          'From ICP definition to first revenue. Demand systems and sales playbooks aligned for a regulated market.',
        outcomeLabel: 'Time to first deal',
        outcomeValue: '-40%',
      },
      {
        title: 'Manufacturing ABM',
        description:
          'Account-based motion and intent signals for industrial accounts. Sales focused on in-market opportunities.',
        outcomeLabel: 'SQLs from intent',
        outcomeValue: '74',
      },
    ],
    industries: [
      { title: 'SaaS & Technology', description: '', quote: 'Predictable pipeline from day one.' },
      { title: 'Fintech', description: '', quote: 'GTM that respects compliance and velocity.' },
      { title: 'Manufacturing', description: '', quote: 'ABM that reaches the right decision-makers.' },
    ],
  },

  founder: {
    name: 'Michael',
    role: 'Global GTM Strategist & Revenue Architect',
    image: '/images/heroes/homepage-hero.jpg',
    bio: 'Enterprise GTM operator focused on connecting strategy, execution, and measurement into one accountable system.',
    yearsExperience: '20+',
    timeline: [
      { icon: 'account_balance', title: 'Wall Street Origins', description: 'M&A Analyst specializing in tech acquisitions.' },
      { icon: 'cloud_done', title: 'The Salesforce Era', description: 'Lead Strategist for Enterprise GTM at global scale.' },
      { icon: 'rocket_launch', title: 'GTMStack.pro Launched', description: 'Building predictable growth systems for B2B teams.' },
    ],
  },

  ctaBottom: {
    title: 'Start with the work',
    subtitle:
      'Browse the expertise map, industry pages, and case studies to see how the pieces connect before you reach out.',
    buttonText: 'Explore the portfolio',
  },
}

/** Accent tokens used by HomeStitchTemplate pillar cards and methodology steps. */
export type HomeStitchAccent = 'signalBlue' | 'saffron' | 'midNavy' | 'primary'

export type HomeStitchInsightsBlock = {
  kicker: string
  title: string
  viewAllHref: string
  viewAllLabel: string
  cards: Array<{
    tag: string
    title: string
    img: string
    href?: string
  }>
}

export type HomeStitchContent = {
  hero: {
    badges: Array<{ text: string; variant: 'default' | 'accent' }>
    titleLine1: string
    titleLine2Gradient: string
    titleLine3: string
    thesis: string
    subtitle: string
    authorshipLine: string
    focusLabel: string
    focusTopics: string[]
    ctaPrimary: { label: string; href: string }
    ctaSecondary: { label: string; href: string }
  }
  commandPanel: {
    version: string
    pillars: Array<{
      index: string
      label: string
      accent: HomeStitchAccent
      icon: string
      barWidth: string
    }>
    outputLabel: string
    outputValue: string
  }
  proofStats: Array<{ value: string; label: string }>
  pillarSection: {
    kicker: string
    title: string
    description: string
    tiles: Array<{
      accent: HomeStitchAccent
      icon: string
      pill: string
      title: string
      desc: string
      bullets: string[]
    }>
  }
  methodology: {
    title: string
    steps: Array<{
      step: string
      accent: HomeStitchAccent
      icon: string
      desc: string
    }>
  }
  marqueeIndustries: string[]
  caseStudy: {
    multiplier: string
    metricLabel: string
    clientLabel: string
    tag: string
    title: string
    body: string
    quote: string
    ctaHref: string
    ctaLabel: string
  }
  insights?: HomeStitchInsightsBlock
  ticker: string[]
  finalCta: {
    title: string
    subtitle: string
    primaryCta: { label: string; href: string }
    pathways: Array<{ label: string; href: string }>
  }
}

function isHomeStitchContent(x: unknown): x is HomeStitchContent {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return (
    typeof o.hero === 'object' &&
    o.hero !== null &&
    typeof o.commandPanel === 'object' &&
    o.commandPanel !== null &&
    Array.isArray(o.proofStats) &&
    typeof o.finalCta === 'object' &&
    o.finalCta !== null
  )
}

/** Default content for `home:stitch` (HomeStitchTemplate). */
export const HOME_STITCH_CONTENT: HomeStitchContent = {
  hero: {
    badges: [
      { text: 'GTM portfolio', variant: 'accent' },
      { text: 'Operator-built', variant: 'default' },
    ],
    titleLine1: 'Real',
    titleLine2Gradient: 'GTM work',
    titleLine3: 'for complex B2B teams.',
    thesis: '',
    subtitle:
      'GTMStack.pro is an operator-built portfolio of demand, messaging, RevOps, and measurement work across complex B2B environments.',
    authorshipLine: '',
    focusLabel: '',
    focusTopics: [],
    ctaPrimary: { label: 'Browse case studies', href: '/case-studies' },
    ctaSecondary: { label: 'Explore expertise', href: '/expertise' },
  },
  commandPanel: {
    version: 'gtm.os / v2',
    pillars: [
      { index: '01', label: 'Signals', accent: 'signalBlue', icon: 'hub', barWidth: '72%' },
      { index: '02', label: 'Orchestration', accent: 'saffron', icon: 'account_tree', barWidth: '64%' },
      { index: '03', label: 'Content', accent: 'signalBlue', icon: 'article', barWidth: '58%' },
      { index: '04', label: 'Attribution', accent: 'midNavy', icon: 'monitoring', barWidth: '81%' },
    ],
    outputLabel: 'Pipeline quality index',
    outputValue: 'High',
  },
  proofStats: [
    { value: '87%', label: 'YoY pipeline (example program)' },
    { value: '4 pillars', label: 'Expertise map you can navigate' },
    { value: 'Field-tested', label: 'Case studies with metrics' },
    { value: 'RevOps lens', label: 'Systems + narrative together' },
  ],
  pillarSection: {
    kicker: 'Capability map',
    title: 'Four pillars.\nOne operating view.',
    description:
      'Use this as a map: each pillar is a place where GTM either compounds or leaks. The site is organized the same way.',
    tiles: [
      {
        accent: 'signalBlue',
        icon: 'campaign',
        pill: 'Demand & growth',
        title: 'Pipeline you can explain',
        desc: 'Programs, channels, and offers wired to ICP—not random acts of marketing.',
        bullets: ['Integrated campaigns', 'Lifecycle + nurture', 'Paid + organic cohesion'],
      },
      {
        accent: 'saffron',
        icon: 'groups',
        pill: 'Content & engagement',
        title: 'Narrative that converts',
        desc: 'Stories, proof, and enablement assets sales actually uses in live cycles.',
        bullets: ['Positioning', 'Enablement packs', 'Omnichannel rhythm'],
      },
      {
        accent: 'primary',
        icon: 'psychology',
        pill: 'Strategy & insights',
        title: 'Decisions with evidence',
        desc: 'ABM, segmentation, and lifecycle models grounded in buyer reality.',
        bullets: ['ICP + tiers', 'Journey design', 'Customer marketing'],
      },
      {
        accent: 'midNavy',
        icon: 'precision_manufacturing',
        pill: 'Systems & operations',
        title: 'Stack that stays governable',
        desc: 'Automation, data hygiene, and reporting that leadership can trust.',
        bullets: ['Martech roadmap', 'Attribution', 'AI where it earns ROI'],
      },
    ],
  },
  methodology: {
    title: 'How we think about delivery',
    steps: [
      {
        step: 'Diagnose',
        accent: 'signalBlue',
        icon: 'search',
        desc: 'Find leakage: routing, signals, content gaps, and reporting blind spots.',
      },
      {
        step: 'Design',
        accent: 'saffron',
        icon: 'architecture',
        desc: 'Blueprint the system: plays, journeys, and the minimum viable stack.',
      },
      {
        step: 'Deploy',
        accent: 'primary',
        icon: 'rocket_launch',
        desc: 'Ship in waves—so teams adopt and measurement stays honest.',
      },
      {
        step: 'Optimize',
        accent: 'midNavy',
        icon: 'tune',
        desc: 'Iterate on conversion quality, not vanity volume.',
      },
    ],
  },
  marqueeIndustries: ['SaaS', 'Fintech', 'Manufacturing', 'Cybersecurity', 'Healthcare', 'Energy'],
  caseStudy: {
    multiplier: '87%',
    metricLabel: 'YoY pipeline growth',
    clientLabel: 'Enterprise ABM + RevOps program',
    tag: 'Case study',
    title: 'From fragmented demand to a unified revenue operating model',
    body:
      'Marketing, SDR, and sales were working different definitions of a qualified account. We aligned tiers, routing, and reporting so pipeline conversations finally matched reality.',
    quote:
      '“The win wasn’t a new tool—it was one model everyone could execute against.”',
    ctaHref: '/case-studies/prgx-unified-revenue-operating-model',
    ctaLabel: 'Read the story',
  },
  insights: {
    kicker: 'From the blog',
    title: 'Latest insights',
    viewAllHref: '/blog',
    viewAllLabel: 'View all posts',
    cards: [
      {
        tag: 'RevOps',
        title: 'Making attribution legible for sales leadership',
        img: '/images/gallery-thumbnails/PipelineDashboard.png',
        href: '/blog',
      },
      {
        tag: 'ABM',
        title: 'Tiering accounts without drowning in spreadsheets',
        img: '/images/gallery-thumbnails/ABM90Days.png',
        href: '/blog',
      },
      {
        tag: 'Demand',
        title: 'Lifecycle hooks that still work in 2026',
        img: '/images/gallery-thumbnails/LifecycleEngine.png',
        href: '/blog',
      },
    ],
  },
  ticker: [],
  finalCta: {
    title: 'Start with the work, then the conversation',
    subtitle: 'Use the site to get oriented first, then reach out when there is a page, system, or problem worth discussing.',
    primaryCta: { label: 'Contact', href: '/contact' },
    pathways: [
      { label: 'Expertise index', href: '/expertise' },
      { label: 'Industries', href: '/industries' },
      { label: 'Blog', href: '/blog' },
    ],
  },
}

export function getHomeStitchContent(content: unknown): HomeStitchContent {
  if (isHomeStitchContent(content)) return content
  return HOME_STITCH_CONTENT
}
