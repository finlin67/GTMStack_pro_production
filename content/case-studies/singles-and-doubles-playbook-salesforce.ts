import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'singles-and-doubles-playbook-salesforce',
    title: 'Singles & Doubles Playbook',
    client: 'Salesforce',
    description:
      'Created a scalable campaign playbook for Salesforce Sales Cloud, enabling marketing and sales teams to execute repeatable, high-impact plays focused on pipeline creation and deal acceleration.',
    challenge:
      'Marketing and Sales lacked a shared set of repeatable GTM plays aligned to pipeline stages. Campaigns varied dramatically across regions, leading to inconsistent execution and outcomes. Sales teams needed clearer messaging, competitive positioning, and activation guidance. There was no unified structure for connecting marketing content to sales motions. Enablement assets were scattered, hard to find, and not consistently updated.',
    solution:
      'Unified Playbook Architecture: Built a framework of "Singles" (quick wins) and "Doubles" (larger plays) mapped to pipeline stages. Persona & Segment Messaging: Defined narrative frameworks and value stories for key segments. Sales Activation Kits: Created talk tracks, email flows, competitive notes, and demo guidelines. Cross-Regional Standardization: Provided repeatable templates adopted across global enterprise teams. Measurement Framework: Linked plays to SQL lift, opportunity progression, and deal acceleration.',
    results: [
      'Enabled global marketing and sales teams with standardized, high-performing GTM plays',
      'Supported 65% lift in SQL volume',
      'Improved consistency of pipeline generation across regions',
      'Strengthened sales alignment',
    ],
    tags: ['Sales Enablement', 'Playbook', 'Campaign Framework', 'Sales Cloud'],
    industry: 'technology-saas',
    expertise: [
      'sales-enablement-alignment',
      'product-marketing',
      'demand-generation',
      'account-based-marketing',
      'content-strategy-systems',
    ],
    metrics: [
      { label: 'SQL Volume', value: '65%', change: 'Lift' },
      { label: 'Pipeline Consistency', value: 'Improved', change: 'Across regions' },
      { label: 'Sales Alignment', value: 'Strengthened', change: 'GTM plays' },
    ],
    featured: true,
    year: '2019',
  }

export default caseStudy
