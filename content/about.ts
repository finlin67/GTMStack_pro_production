import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** About page content for HomeTemplate (PageContent shape). */
export const ABOUT_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'B2B REVENUE LEADER',
    titleStart: 'Built Revenue Engines at the ',
    titleGradient: "World's Top Tables",
    subtitle:
      'I architect systems that bridge the gap between complex SaaS products and global market dominance, focused on efficiency and scalable growth.',
    ctaPrimary: 'Explore Expertise',
    ctaSecondary: 'Our Story',
  },
  stats: [
    { value: '$1.2M', label: 'Pipeline Built' },
    { value: '87%', label: 'Growth Rate' },
    { value: '12+', label: 'Years Exp' },
  ],
  methodology: {
    title: 'Strategic Evolution',
    description:
      'Leadership that scales acquisition, modernizes MarTech, and improves GTM execution across multiple growth stages.',
    steps: [
      {
        number: '2021 — Present',
        icon: 'TrendingUp',
        title: 'Director, Demand Gen',
        description:
          'PRGX Global Inc.\n• Scaled global digital acquisition by 40% in Year 1.\n• Modernized MarTech stack resulting in 30% cost savings.\n• Oversaw $2M+ in paid media budget across 3 continents.',
        progress: '25%',
      },
      {
        number: '2019 — 2021',
        icon: 'Map',
        title: 'Sr. Revenue Manager',
        description:
          'AMCS Group\n• Implemented lead scoring reducing junk leads by 65%.\n• Aligned Sales and Marketing ops globally (LDR/SDR focus).',
        progress: '50%',
      },
      {
        number: '2017 — 2019',
        icon: 'Rocket',
        title: 'Marketing Ops Lead',
        description:
          'Red Hat (IBM)\n• Redesigned attribution modeling for enterprise deals.\n• Managed database health for 1M+ active contacts.',
        progress: '75%',
      },
      {
        number: '2014 — 2017',
        icon: 'Settings',
        title: 'Solution Consultant',
        description:
          'Salesforce\n• Awarded "Top Technical Closer" for Q3/Q4 2016.\n• Architected custom CRM workflows for Fortune 500 clients.',
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
          'Leveraged LLMs for automated multi-channel content personalization at scale, reducing production time by 60%.',
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
    text: 'I architect systems that bridge the gap between complex SaaS products and global market dominance, focused on',
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
    role: 'Miami, FL • Available for Relocation',
    image: 'https://placehold.co/800x800/png',
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
    title: 'Ready to Architect Your Next Revenue Engine?',
    subtitle: 'Currently open to strategic leadership roles in growth-stage B2B SaaS companies.',
    buttonText: 'Start a Conversation',
  },
}
