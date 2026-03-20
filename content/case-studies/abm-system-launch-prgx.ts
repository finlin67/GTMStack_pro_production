import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'abm-system-launch-prgx',
    title: 'ABM System Launch',
    client: 'PRGX Global',
    description:
      "Built PRGX's first fully unified ABM system—integrating targeting, personalization, measurement, and sales alignment to drive revenue impact across enterprise accounts.",
    challenge:
      'PRGX had no formal ABM program, playbooks, or aligned ICP model for enterprise targeting. Marketing, Sales, and Operations were operating in silos with inconsistent definitions and engagement strategies. Lack of visibility into account intent, engagement, and buying committees limited progression. Content and messaging were not structured for personalization across tiers and personas.',
    solution:
      'ABM Operating System: Designed a unified strategy including ICP, tiering, and account selection rules. Intent & Signal Integration: Connected Demandbase, CRM, and MAP to surface account-level insights. Multi-Threaded Sales Alignment: Built playbooks and processes for deep stakeholder engagement. Personalization Infrastructure: Created modular messaging for industries, personas, and account tiers. Measurement Framework: Established MQAs, progression metrics, and sales alignment reporting.',
    results: [
      'Launched a scalable ABM engine enabling coordinated marketing + sales motions across 300 enterprise accounts',
      '87% YoY pipeline growth',
      '180% lift in MQL→SQL conversion',
      '200% increase in strategic account engagement',
    ],
    tags: ['ABM', 'Enterprise GTM', 'Sales Alignment', 'Account Intelligence'],
    industry: 'financial-services',
    expertise: [
      'account-based-marketing',
      'marketing-operations',
      'demand-generation',
      'sales-enablement-alignment',
      'ai-in-marketing',
    ],
    metrics: [
      { label: 'Pipeline Growth', value: '87%', change: 'YoY' },
      { label: 'MQL→SQL Lift', value: '180%', change: 'Lift' },
      { label: 'Account Engagement', value: '200%', change: 'Increase' },
    ],
    featured: true,
    year: '2024',
  }

export default caseStudy
