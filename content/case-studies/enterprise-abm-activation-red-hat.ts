import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'enterprise-abm-activation-red-hat',
    title: 'Enterprise ABM Activation',
    client: 'Red Hat',
    description:
      'Designed and deployed global ABM activation programs for enterprise accounts, enabling multi-threaded engagement across buying committees and improving expansion and retention outcomes.',
    challenge:
      'Enterprise accounts required deep, persona-specific engagement across technical, financial, and operational stakeholders. Regional sales teams needed a consistent ABM playbook to align messaging and outreach motions. Content and messaging lacked modular structure for scaling personalization across industries and roles. Visibility into account engagement, intent, and progression was fragmented across tools.',
    solution:
      'Tiered ABM Framework: Established tiering models, segmentation, and account selection for global regions. Persona & Industry Personalization: Built modular messaging systems covering technical, executive, and operational personas. Regional Sales Alignment: Created field playbooks for outreach sequencing, collaboration, and account progression. Intent & Engagement Insights: Connected signals from CRM, events, and digital channels into actionable dashboards. Expansion & Renewal Plays: Structured lifecycle programs that supported cross-sell, upsell, and renewal readiness.',
    results: [
      'Global ABM strategy enabled enterprise sellers to deepen account penetration and drive higher retention and expansion',
      'Delivered 25+ point improvement in NRR',
      'Reduced churn by ~40%',
      'Increased multi-threaded engagement across targeted accounts',
    ],
    tags: ['ABM', 'Enterprise GTM', 'Lifecycle Marketing', 'Sales Alignment'],
    industry: 'technology-saas',
    expertise: [
      'account-based-marketing',
      'lifecycle-marketing',
      'customer-marketing',
      'product-marketing',
      'sales-enablement-alignment',
    ],
    metrics: [
      { label: 'NRR Improvement', value: '25+ points', change: 'Increase' },
      { label: 'Churn Reduction', value: '40%', change: 'Decrease' },
      { label: 'Multi-threaded Engagement', value: 'Increased', change: 'Across accounts' },
    ],
    featured: true,
    year: '2023',
  }

export default caseStudy
