import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'sales-cloud-global-campaigns-salesforce',
    title: 'Sales Cloud Global Campaigns',
    client: 'Salesforce',
    description:
      'Developed and executed global integrated campaigns for Salesforce Sales Cloud, unifying messaging, content, and sales activation across enterprise regions.',
    challenge:
      'Global regions ran inconsistent campaigns with fragmented messaging and limited alignment to Sales Cloud positioning. Sales teams lacked clear narrative frameworks and campaign-ready enablement assets. Campaign performance data was siloed, making it difficult to understand ROI or regional execution quality. Marketing and Sales needed shared plays to target buying committees across industries. Campaign production lacked standardized templates, slowing time-to-market.',
    solution:
      'Narrative Framework Development: Created unified messaging for Sales Cloud across industries and segments. Persona-Based Content Strategy: Built assets tailored to sales leaders, operations, IT, and front-line managers. Campaign Architecture: Designed modular plays deployable across regions with local adaptation. Sales Activation Kits: Delivered talk tracks, sequences, and competitive notes to improve sales execution. Performance Dashboards: Linked campaign activity to SQL lift, pipeline creation, and opportunity progression.',
    results: [
      'Standardized global Sales Cloud campaigns, improving message consistency and campaign scalability',
      'Lifted SQL volume by 65%',
      'Improved multi-region alignment',
      'Strengthened enterprise opportunity creation',
    ],
    tags: ['Global Campaigns', 'Sales Cloud', 'Campaign Architecture', 'Sales Enablement'],
    industry: 'technology-saas',
    expertise: [
      'product-marketing',
      'demand-generation',
      'sales-enablement-alignment',
      'content-strategy-systems',
      'omnichannel-marketing',
    ],
    metrics: [
      { label: 'SQL Volume', value: '65%', change: 'Lift' },
      { label: 'Multi-Region Alignment', value: 'Improved', change: 'Consistency' },
      { label: 'Opportunity Creation', value: 'Strengthened', change: 'Enterprise' },
    ],
    featured: true,
    year: '2019',
  }

export default caseStudy
