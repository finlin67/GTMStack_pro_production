import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'amcs-verticalized-abm-launch',
    title: '$1.2M Pipeline in 90 Days from Verticalized ABM',
    client: 'AMCS Group',
    description:
      'Launched ABM engine for industrial/logistics buyers with verticalized messaging, paid media, and GTM orchestration.',
    challenge:
      'AMCS needed measurable enterprise pipeline quickly in complex industrial and fleet/logistics verticals, while legacy content and outbound prioritization underperformed.',
    solution:
      'Designed end-to-end ABM framework; rebuilt vertical narratives and content; deployed industry-specific paid media campaigns; restructured outbound prioritization with GTM alignment.',
    results: [
      'Generated $1.2M qualified pipeline in 90 days',
      'Lifted MQL volume by 35% within 60 days',
      'Improved CRM data quality by ~80% through audits + enrichment',
    ],
    tags: ['ABM', 'Paid Media', 'Vertical GTM', 'Industrial SaaS'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'demand-generation',
      'paid-advertising-sem',
      'marketing-operations',
    ],
    metrics: [
      { label: 'Pipeline', value: '$1.2M', change: '90 days' },
      { label: 'MQL Lift', value: '35%', change: '60 days' },
      { label: 'Data Quality', value: '80%', change: 'Improved' },
    ],
    featured: true,
    year: '2024',
  }

export default caseStudy
