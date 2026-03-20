import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'redhat-global-abm-activation',
    title: '33% of Global Pipeline Influenced by ABM Activation',
    client: 'Red Hat',
    description:
      'Scaled ABM Customer Activation framework across 200+ global enterprise accounts with lifecycle playbooks and standardized ops.',
    challenge:
      'Red Hat needed consistent ABM practices at global scale, reduced CPL, and better lifecycle engagement across enterprise accounts.',
    solution:
      'Built ABM Customer Activation framework + multi-product lifecycle playbooks, standardized change management, and deployed intent/account intelligence to optimize media and orchestration.',
    results: [
      'ABM program influenced 33% of global pipeline',
      'Increased upsell opportunity creation by 40%',
      'Reduced cost-per-lead by 30%',
      'Cut project turnaround time by 20%',
    ],
    tags: ['ABM', 'Lifecycle Marketing', 'Enterprise SaaS', 'Global Scale'],
    industry: 'b2b-saas',
    expertise: [
      'account-based-marketing-abm',
      'lifecycle-marketing',
      'marketing-operations',
      'martech-optimization',
    ],
    metrics: [
      { label: 'Pipeline Influence', value: '33%', change: 'Global' },
      { label: 'Upsell Lift', value: '40%', change: 'Increase' },
      { label: 'CPL', value: '-30%', change: 'Reduction' },
    ],
    featured: true,
    year: '2023',
  }

export default caseStudy
