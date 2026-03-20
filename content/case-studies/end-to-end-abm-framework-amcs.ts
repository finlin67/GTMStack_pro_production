import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'end-to-end-abm-framework-amcs',
    title: 'End-to-End ABM Framework',
    client: 'AMCS',
    description:
      'Built a complete ABM framework for AMCS, aligning ICP definition, account selection, messaging architecture, and orchestration across marketing, SDR, and sales teams.',
    challenge:
      'Lack of a unified ICP and tiering model led to inconsistent account targeting and inefficient marketing spend. Sales, SDR, and marketing teams were not aligned on account prioritization or engagement sequencing. Content and messaging were not structured for persona, industry, or maturity-level personalization. Account insights—including intent signals—were underused due to fragmented data and processes.',
    solution:
      'ICP & Tiering System: Designed a high-resolution ICP and tiering model to focus resources on high-value accounts. Messaging Architecture: Created modular messaging covering personas, industries, and buying triggers. SDR + Marketing Orchestration: Built coordinated engagement sequences and SLA workflows. Signal-Driven Prioritization: Integrated intent, CRM, and engagement data into prioritization dashboards. Pipeline Measurement: Established MQA definitions, progression metrics, and attribution guardrails.',
    results: [
      'Delivered a unified ABM framework that improved account focus, increased engagement, and strengthened cross-team alignment',
      'Meaningful lift in target-account penetration',
      'Improved SDR effectiveness',
      'Clearer measurement of ABM-influenced pipeline',
    ],
    tags: ['ABM', 'ICP Definition', 'Sales Alignment', 'Framework Design'],
    industry: 'supply-chain-logistics',
    expertise: [
      'account-based-marketing',
      'sales-enablement-alignment',
      'product-marketing',
      'marketing-operations',
      'marketing-analytics-reporting',
    ],
    metrics: [
      { label: 'Account Penetration', value: 'Lift', change: 'Target accounts' },
      { label: 'SDR Effectiveness', value: 'Improved', change: 'Alignment' },
      { label: 'Pipeline Measurement', value: 'Clearer', change: 'ABM-influenced' },
    ],
    featured: true,
    year: '2024',
  }

export default caseStudy
