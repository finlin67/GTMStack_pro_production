import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** About page content for HomeTemplate (PageContent shape). */
export const ABOUT_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'OPERATOR-LED GTM ARCHITECTURE',
    titleStart: 'Building Revenue Systems for ',
    titleGradient: 'Complex B2B Markets',
    subtitle:
      'GTMStack.pro applies enterprise GTM operating discipline to complex SaaS and services motions where pipeline quality matters more than activity volume.',
    ctaPrimary: 'Explore Expertise',
    ctaSecondary: 'See the track record',
  },
  stats: [
    { value: '$1.2M', label: 'Pipeline Built' },
    { value: '87%', label: 'Growth Rate' },
    { value: '12+', label: 'Years Exp' },
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
        icon: 'TrendingUp',
        title: 'Predictive Lead Scoring',
        description:
          'Integrated custom ML models to prioritize high-intent accounts, resulting in 40% higher MQL-to-SQL conversion.',
        tags: ['Impact: 40% Conversion Lift'],
      },
      {
        icon: 'Map',
        title: 'Content Intelligence',
        description:
          'Used LLM workflows for multi-channel content personalization at scale, reducing production time by 60%.',
        tags: ['Impact: 60% Faster Delivery'],
      },
      {
        icon: 'Network',
        title: 'GTM Workflow Automation',
        description:
          'Built AI-driven agents to automate technical attribution and data enrichment across enterprise CRM environments.',
        tags: ['Impact: 100% Data Accuracy'],
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
        title: 'Pipeline Generated',
        description: '',
        outcomeLabel: 'Benchmark',
        outcomeValue: '$9M',
      },
      {
        title: 'MQL-to-SQL Lift',
        description: '',
        outcomeLabel: 'Benchmark',
        outcomeValue: '180%',
      },
      {
        title: 'CAC Reduction',
        description: '',
        outcomeLabel: 'Benchmark',
        outcomeValue: '45%',
      },
      {
        title: 'Churn Decrease',
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
        title: 'ROI on Ad Spend',
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
    subtitle: 'Share your current motion, stack constraints, and where outcomes are lagging. We will map the highest-leverage starting point.',
    buttonText: 'Start a Conversation',
  },
}
