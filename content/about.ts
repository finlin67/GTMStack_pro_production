import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** About page content for HomeTemplate (PageContent shape). */
export const ABOUT_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'GTM OPERATOR BACKGROUND',
    titleStart: 'The operator behind ',
    titleGradient: 'GTMStack.pro',
    subtitle:
      'B2B GTM work across Salesforce, PRGX, AMCS, and Red Hat. Documented programs, results, and frameworks throughout this site.',
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
    title: 'Systems and tools applied in practice',
    items: [
      {
        icon: 'Brain',
        title: 'Cognitive Funnels',
        description:
          'Lead scoring and routing models built for active ABM programs. Used at PRGX to improve MQL→SQL conversion by 180%.',
        tags: [],
      },
      {
        icon: 'Database',
        title: 'Data Lake Architecture',
        description:
          'Data pipeline and attribution infrastructure built across CRM, MAP, and BI layers. Reduced reporting cycles from 4 days to 2 hours at Salesforce.',
        tags: [],
      },
      {
        icon: 'Settings',
        title: 'Pipeline Automation',
        description:
          'Automated multi-touch workflows across email, paid, and SDR channels. Deployed at AMCS and PRGX to reduce manual coordination and improve lead routing accuracy.',
        tags: [],
      },
    ],
  },
  quote: {
    text: 'The work connects pipeline reporting, campaign execution, and sales routing into one readable system.',
    highlight: '',
  },
  caseStudies: {
    title: 'Performance Benchmarks',
    subtitle: 'Impact across GTM strategy, demand execution, and revenue operations.',
    items: [
      {
        title: 'Revenue Operations Buildout — PRGX Global',
        description:
          'Unified ABM, attribution, and CRM systems across a 300-account enterprise pipeline program. Resulted in 87% YoY pipeline growth and 180% lift in MQL→SQL conversion.',
        outcomeLabel: 'Revenue Ops',
        outcomeValue: '$9M',
      },
      {
        title: 'Demand Analytics Rebuild — Salesforce',
        description:
          'Rebuilt demand gen analytics and attribution infrastructure for Salesforce NGO and Education GTM. Delivered 76% YoY pipeline lift and ~85% improvement in CRM data quality.',
        outcomeLabel: 'AI Diagnostic',
        outcomeValue: '180%',
      },
      {
        title: 'Database Acquisition',
        description: 'Contact acquisition and database enrichment across B2B demand programs. Benchmarked using Demandbase enrichment and lifecycle segmentation at PRGX and AMCS.',
        outcomeLabel: 'Benchmark',
        outcomeValue: '45%',
      },
      {
        title: 'Campaign Reduction',
        description: 'Campaign overhead reduced through MarTech consolidation and workflow automation. Documented across PRGX global paid and email programs.',
        outcomeLabel: 'Benchmark',
        outcomeValue: '22%',
      },
      {
        title: 'Global Partners',
        description: 'Partner and channel relationships managed across global GTM motions at Salesforce and Red Hat. Included co-marketing, enablement, and aligned pipeline reporting.',
        outcomeLabel: 'Benchmark',
        outcomeValue: '50+',
      },
      {
        title: 'Ad Returns',
        description: 'Paid media return on ad spend across B2B campaigns using intent-driven targeting and ICP-filtered audiences. Measured at program level across PRGX and AMCS paid channels.',
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
    title: 'Start with the work',
    subtitle:
      'Browse the case studies and expertise pages to see how the pieces connect.',
    buttonText: 'Explore the portfolio',
  },
}
