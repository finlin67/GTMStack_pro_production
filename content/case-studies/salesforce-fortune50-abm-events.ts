import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'salesforce-fortune50-abm-events',
    title: 'Fortune 50 ABM + Event Engine Driving Enterprise Pipeline',
    client: 'Salesforce',
    description:
      'Established ABM Center of Excellence and high-ROI event motions for Fortune 50 enterprise accounts.',
    challenge:
      'Needed repeatable enterprise ABM motions and measurable event ROI across vertical programs.',
    solution:
      'Built ABM COE methodology, integrated propensity-driven campaigns, and created event-to-pipeline playbooks with executive engagement.',
    results: [
      '$11M pipeline influenced from flagship executive program',
      '30% YoY pipeline growth from ABM programs',
      'Multi-million ACV influence from vertical events',
    ],
    tags: ['ABM', 'Events', 'Enterprise GTM', 'Vertical Marketing'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'event-marketing',
      'sales-enablement',
      'demand-generation',
    ],
    metrics: [
      { label: 'Pipeline Example', value: '$11M', change: 'Exec event' },
      { label: 'ABM Lift', value: '30%', change: 'YoY' },
    ],
    year: '2019',
  }

export default caseStudy
