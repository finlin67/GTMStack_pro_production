/**
 * Content for /industries (industries:main).
 * Shape matches IndustriesMainTemplate TemplateContent.
 */
export const INDUSTRIES_MAIN_CONTENT = {
  brand: {
    name: 'REVENUEARCHITECT',
    logoIcon: 'architecture',
  },
  hero: {
    badge: 'Enterprise Intelligence',
    title: 'Revenue Architecture by Industry',
    description:
      'Precision-engineered revenue engines for high-velocity growth in regulated markets. We replace generic sales tactics with industry-specific architectural blueprints.',
    metrics: [
      { value: '4.8x', label: 'Pipeline Velocity' },
      { value: '32%', label: 'Win Rate Increase' },
      { value: '2.5x', label: 'Deal Size Growth' },
    ],
    backgroundImage:
      'https://images.unsplash.com/photo-1558494949-efc535b5c47c?q=80&w=2574&auto=format&fit=crop',
    dashboardImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGb9zAY1V-Hn7E_MGuruZbgqmXIJBHmfEzEL5s8RzT59DT0oN5VVEnIbdoRSM-G6fsosAXNnkFkOG_zAg9FPJd1DHYn91499w_0nrP8szZRvOjuAuQFKIH-zgyyUXiqjDvmOMTrdCZLNiQDJmYxdEQ_SXEp8kVy79iUrvLsOLHQgINEh3yCdfAyIH2y0JZe97OSCPr2cWZTcz5tj9anRHnG_dQEa_q7stT9awkNit_OICYUtzpL2SMwaALPJCLqjGmrPg1a1sxexcw',
  },
  challenges: {
    sectionTitle: 'Industry-Specific Revenue Friction',
    sectionDescription:
      'Generalist strategies fail in complex markets. We solve the specific structural barriers that prevent scaling in regulated industries.',
    items: [
      {
        icon: 'gavel',
        title: 'Regulatory Friction',
        description:
          'Compliance checks often slow deal velocity by 40%. Our architecture integrates legal workflows directly into the CRM pipeline.',
        statValue: '-20%',
        statLabel: 'Sales Cycle Time',
        colorClass: 'bg-orange-50 text-orange-600',
      },
      {
        icon: 'groups',
        title: 'Buying Committees',
        description:
          'Enterprise decisions now involve 12+ stakeholders. We map influence paths to multi-thread deals automatically.',
        statValue: '+35%',
        statLabel: 'Stakeholder Engagement',
        colorClass: 'bg-blue-50 text-[#1c6ef2]',
      },
      {
        icon: 'dataset',
        title: 'Data Silos',
        description:
          'Fragmented customer data across legacy ERPs prevents a unified view. We architect a single source of revenue truth.',
        statValue: '100%',
        statLabel: 'Data Visibility',
        colorClass: 'bg-purple-50 text-purple-600',
      },
    ],
  },
  industries: {
    sectionTitle: 'Architected for Your Vertical',
    items: [
      {
        icon: 'account_balance',
        name: 'FinTech',
        description: 'Accelerate ARR while navigating complex banking regulations and compliance.',
        outcome: '$22M ARR Growth',
      },
      {
        icon: 'security',
        name: 'Cybersecurity',
        description: 'Shorten sales cycles for high-ticket CISO-level security infrastructure deals.',
        outcome: '3x Win Rate',
      },
      {
        icon: 'medical_services',
        name: 'Healthcare',
        description: 'Navigate provider networks and payer systems with HIPAA-compliant funnels.',
        outcome: '-40% CAC',
      },
      {
        icon: 'factory',
        name: 'IIoT & Mfg',
        description: 'Connect OT and IT buyers for complex industrial transformation projects.',
        outcome: '6mo Faster Deals',
      },
      {
        icon: 'cloud',
        name: 'Enterprise SaaS',
        description: 'Scale from PLG to Enterprise sales motion with unified revenue operations.',
        outcome: '125% NRR',
      },
      {
        icon: 'work',
        name: 'Prof Services',
        description: 'Productize service offerings and streamline proposal generation.',
        outcome: '2x Deal Vol',
      },
      {
        icon: 'bolt',
        name: 'Energy',
        description: 'Manage long-term contracts and renewable transition projects effectively.',
        outcome: '+18% Margin',
      },
      {
        icon: 'public',
        name: 'GovTech',
        description: 'Master the RFP process and public sector procurement cycles.',
        outcome: '80% Win Rate',
      },
    ],
  },
  proofStrip: [
    { label: 'FinTech Client', value: '$22M ARR in 18 months' },
    { label: 'Cybersecurity Client', value: 'Reduced Churn by 12%' },
    { label: 'Healthcare Client', value: '3.5x ROI on Architecture' },
    { label: 'SaaS Client', value: 'IPO Readiness Achieved' },
  ],
  comparison: {
    title: 'Why Industry-Specific Architecture Matters',
    description: 'Generic playbooks fail when faced with specific market physics.',
    badPoints: [
      'Generic "Spray and Pray" outreach tactics.',
      'Ignore regulatory constraints until too late.',
      'Disconnect between Marketing and Sales data.',
    ],
    goodPoints: [
      'Hyper-targeted ABM based on vertical intent data.',
      'Compliance-aware sales funnels built-in.',
      'Unified Revenue Data Model across the enterprise.',
    ],
  },
  testimonial: {
    quote:
      "We didn't need more leads, we needed better architecture. The industry-specific approach unlocked 40% more revenue from our existing pipeline within 6 months.",
    author: 'Marcus Thorne',
    role: 'CRO, FinTech Enterprise',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
    logos: ['ACME Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella'],
  },
}

export default INDUSTRIES_MAIN_CONTENT
