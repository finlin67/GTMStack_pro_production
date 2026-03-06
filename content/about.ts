import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** About page content for HomeTemplate (PageContent shape). */
export const ABOUT_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'OUR PHILOSOPHY',
    titleStart: 'Architecture for ',
    titleGradient: 'Predictable Growth',
    subtitle:
      'We build the systems and strategies that turn GTM from a guessing game into a precision science. Our mission is to align your people, process, and platform.',
    ctaPrimary: 'View Expertise',
    ctaSecondary: 'Our Story',
  },
  stats: [
    { value: '20+', label: 'Years Experience' },
    { value: '50+', label: 'Revenue Engines Built' },
    { value: '15+', label: 'Tech Verticals' },
    { value: '$500M+', label: 'Pipeline Influenced' },
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
        description: 'Deep forensic dive into GTM, tech stack, funnel leakage.',
        progress: '25%',
      },
      {
        number: '02',
        icon: 'DraftingCompass',
        title: 'Design',
        description: 'Blueprint for scalable revenue infrastructure.',
        progress: '50%',
      },
      {
        number: '03',
        icon: 'Rocket',
        title: 'Build',
        description: 'Execute tech integration + campaigns + enablement.',
        progress: '75%',
      },
      {
        number: '04',
        icon: 'Settings',
        title: 'Optimize',
        description: 'Continuous tuning + A/B testing + scaling.',
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
        description: 'Increasing speed and frequency of closed-won deals via pipeline rigor + coaching.',
        tags: ['Pipeline Rigor', 'Coaching', 'Deal Velocity'],
      },
      {
        icon: 'Map',
        title: 'GTM Strategy',
        description: 'Market entry + positioning blueprint for competitive dominance.',
        tags: ['Market Entry', 'Positioning', 'Competitive Edge'],
      },
      {
        icon: 'Network',
        title: 'Demand Gen Systems',
        description: 'Automated high-intent pipeline engines.',
        tags: ['High-Intent', 'Automation', 'Pipeline'],
      },
      {
        icon: 'Settings',
        title: 'Revenue Ops',
        description: 'Tool, data, and reporting alignment for full GTM visibility.',
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
  founder: {
    name: 'Michael',
    role: 'Global GTM Strategist & Revenue Architect',
    image: 'https://placehold.co/800x800/png',
    bio: 'A veteran of enterprise GTM. I build scalable revenue engines that connect strategy to execution.',
    yearsExperience: '20+',
    timeline: [
      { icon: 'account_balance', title: 'Wall Street Origins', description: 'M&A Analyst specializing in tech acquisitions.' },
      { icon: 'cloud_done', title: 'The Salesforce Era', description: 'Lead Strategist for Enterprise GTM at global scale.' },
      { icon: 'rocket_launch', title: 'RevenueArchitect Founded', description: 'Engineering predictable growth for B2B tech.' },
    ],
  },
  ctaBottom: {
    title: 'Ready to engineer your growth?',
    subtitle: 'Stop guessing and start building. Our diagnostic audit uncovers the exact bottlenecks holding your revenue back.',
    buttonText: 'Schedule Audit',
  },
}
