import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** About page content for HomeTemplate (PageContent shape). */
export const ABOUT_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'OPERATOR-LED GTM ARCHITECTURE',
    titleStart: 'Revenue Systems for ',
    titleGradient: 'B2B Growth',
    subtitle:
      'Engineering precision pipeline infrastructure where data-driven strategy meets high-conviction execution for scaling consulting firms.',
    ctaPrimary: 'View Case Studies',
    ctaSecondary: 'Explore Expertise',
  },
  stats: [
    { value: '$9M', label: 'Pipeline' },
    { value: '180%', label: 'ROI' },
    { value: '45%', label: 'DB Acq' },
    { value: '22%', label: 'Campaign Red.' },
    { value: '50+', label: 'Partners' },
    { value: '15x', label: 'Ad Returns' },
  ],
  methodology: {
    title: 'Operating Track Record',
    description:
      'A progression of enterprise roles focused on acquisition scale, RevOps modernization, and measurable GTM performance.',
    steps: [
      {
        number: '2021 — Present',
        icon: 'TrendingUp',
        title: 'Director, Demand Gen',
        description:
          'PRGX Global Inc.\n• Scaled global digital acquisition by 40% in Year 1.\n• Modernized the MarTech stack to reduce waste and improve reporting.\n• Oversaw $2M+ in paid media budget across 3 continents.',
        progress: '25%',
      },
      {
        number: '2019 — 2021',
        icon: 'Map',
        title: 'Sr. Revenue Manager',
        description:
          'AMCS Group\n• Implemented lead scoring that reduced junk leads by 65%.\n• Aligned global sales and marketing operations around LDR/SDR workflows.',
        progress: '50%',
      },
      {
        number: '2017 — 2019',
        icon: 'Rocket',
        title: 'Marketing Ops Lead',
        description:
          'Red Hat (IBM)\n• Redesigned attribution modeling for enterprise deals.\n• Managed database health for 1M+ active contacts and cleaner lifecycle routing.',
        progress: '75%',
      },
      {
        number: '2014 — 2017',
        icon: 'Settings',
        title: 'Solution Consultant',
        description:
          'Salesforce\n• Awarded "Top Technical Closer" for Q3/Q4 2016.\n• Architected CRM workflows for Fortune 500 clients with complex buying cycles.',
        progress: '100%',
      },
    ],
  },
  expertise: {
    title: 'AI & MACHINE LEARNING',
    items: [
      {
        icon: 'Brain',
        title: 'Cognitive Funnels',
        description:
          'Automated lead scoring systems that adapt to buyer behavior using LLM-driven sentiment analysis.',
        tags: [],
      },
      {
        icon: 'Database',
        title: 'Data Lake Architecture',
        description:
          'Centralizing fragmented marketing silos into a single source of truth for real-time attribution.',
        tags: [],
      },
      {
        icon: 'Settings',
        title: 'Pipeline Automation',
        description:
          'Orchestrating complex multi-touch campaigns through robotic process automation (RPA).',
        tags: [],
      },
    ],
  },
  quote: {
    text: 'We design GTM operating systems that connect strategic intent to day-to-day execution with',
    highlight: 'efficiency and scalable growth',
  },
  caseStudies: {
    title: 'Performance Benchmarks',
    subtitle: 'Impact across GTM strategy, demand execution, and revenue operations.',
    items: [
      {
        title: 'Career World 4D',
        description:
          'A high-fidelity modeling engine designed for precision revenue forecasting. Implemented a zero-latency data pipeline resulting in 4D visualization of market trends.',
        outcomeLabel: 'Revenue Ops',
        outcomeValue: '$9M',
      },
      {
        title: 'Marketing Flight Planner',
        description:
          'AI-driven diagnostic tool mapping the entire GTM funnel. Enables operators to predict bottlenecks before they impact the bottom line.',
        outcomeLabel: 'AI Diagnostic',
        outcomeValue: '180%',
      },
      {
        title: 'Database Acquisition',
        description: '',
        outcomeLabel: 'Benchmark',
        outcomeValue: '45%',
      },
      {
        title: 'Campaign Reduction',
        description: '',
        outcomeLabel: 'Benchmark',
        outcomeValue: '22%',
      },
      {
        title: 'Global Partners',
        description: '',
        outcomeLabel: 'Benchmark',
        outcomeValue: '50+',
      },
      {
        title: 'Ad Returns',
        description: '',
        outcomeLabel: 'Benchmark',
        outcomeValue: '15x',
      },
    ],
  },
  founder: {
    name: 'Michael Findling',
    role: 'Founder, GTMStack.pro',
    image: '/images/heroes/homepage-hero.jpg',
    bio: '',
    yearsExperience: '12+',
    timeline: [
      {
        icon: 'TrendingUp',
        title: '2021 — Present (Director, Demand Gen)',
        description: 'PRGX Global Inc. Scaled acquisition, modernized MarTech, and led paid media across 3 continents.',
      },
      {
        icon: 'Map',
        title: '2019 — 2021 (Sr. Revenue Manager)',
        description: 'Lead scoring that reduced junk leads and aligned global sales/marketing operations (LDR/SDR).',
      },
      {
        icon: 'Rocket',
        title: '2017 — 2019 (Marketing Ops Lead)',
        description: 'Enterprise attribution redesign and database operations for 1M+ active contacts.',
      },
      {
        icon: 'Settings',
        title: '2014 — 2017 (Solution Consultant)',
        description: 'Top technical closer (2016) and CRM workflow architecture for Fortune 500 clients.',
      },
    ],
  },
  ctaBottom: {
    title: 'Ready to improve pipeline quality?',
    subtitle:
      'Stop guessing and start building. Secure a technical audit of your GTM architecture and discover where your growth leaks are hiding.',
    buttonText: 'Schedule GTM Audit',
  },
}
