import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'prgx-unified-revenue-operating-model',
    title: '87% YoY Pipeline Growth via Unified ABM + RevOps Model',
    client: 'PRGX Global',
    description:
      'Architected a unified revenue operating model integrating ABM, automation, and attribution to scale predictable enterprise pipeline.',
    challenge:
      'PRGX needed to evolve from broad demand gen into full-funnel, governance-driven ABM. Systems were fragmented across Demandbase, Marketo, CRM, and analytics, limiting visibility and repeatability.',
    solution:
      'Built the first unified revenue operating model: integrated Demandbase + Marketo with Salesforce workflows, automated multi-touch attribution, formalized marketing ops governance, and rebuilt cross-channel data flows.',
    results: [
      'Boosted marketing-sourced pipeline 87% YoY',
      'Delivered 200% YoY engagement lift across target accounts',
      'Improved MQL→SQL conversion by 180% via scoring + routing',
      'Raised database health by 30% through data governance',
    ],
    tags: ['ABM', 'Revenue Operations', 'Attribution', 'Enterprise GTM'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'marketing-operations',
      'marketing-automation',
      'demand-generation',
    ],
    metrics: [
      { label: 'Pipeline Growth', value: '87%', change: 'YoY' },
      { label: 'Engagement Lift', value: '200%', change: 'YoY' },
      { label: 'MQL→SQL Lift', value: '180%', change: 'YoY' },
    ],
    featured: true,
    year: '2025',
  }

export default caseStudy
