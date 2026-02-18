import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** Home page content for HomeTemplate (PageContent shape). */
export const HOME_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'Founder-Led GTM Consulting',
    titleStart: 'The Revenue Architect for ',
    titleGradient: 'B2B Tech',
    subtitle:
      'Engineering predictable revenue growth for enterprise tech through strategic precision. We bridge the gap between product innovation and market dominance.',
    ctaPrimary: 'Start Your Build',
    ctaSecondary: 'View Methodology',
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
    highlight: 'predictable revenue growth',
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
  ctaBottom: {
    title: 'Ready to engineer your growth?',
    subtitle:
      'Stop guessing and start building. Our diagnostic audit uncovers the exact bottlenecks holding your revenue back.',
    buttonText: 'Schedule Audit',
  },
}
