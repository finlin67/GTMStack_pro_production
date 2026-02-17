import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** Industries-style home content for HomeTemplate (Revenue Architect layout). */
export const HOME_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'Vertical Expertise',
    titleStart: 'Industries: Tailored',
    titleGradient: 'Revenue Architecture',
    subtitle:
      'Generic strategies fail in complex markets. We deploy vertical-specific GTM blueprints engineered to navigate regulatory constraints, technical sales cycles, and multi-stakeholder purchasing.',
    ctaPrimary: 'Explore Industries',
    ctaSecondary: 'Get Audited',
  },
  stats: [
    { value: '3x', label: 'Pipeline Growth' },
    { value: '2.4x', label: 'Deal Velocity' },
    { value: '40%', label: 'Win Rate Lift' },
    { value: '-25%', label: 'CAC Reduction' },
    { value: '98%', label: 'Forecast Accuracy' },
    { value: '12wk', label: 'Time to Value' },
  ],
  methodology: {
    title: 'Architectural Method by Industry',
    subtitle:
      'Our four-phase engagement model adapts structurally to the physics of your market.',
    steps: [
      {
        label: '01 Audit',
        description: 'Deep diagnostic of your GTM engine against industry benchmarks.',
        exampleLabel: 'Example: GovTech',
        exampleDetail:
          'RFP win-rate analysis & compliance bottleneck identification.',
      },
      {
        label: '02 Architect',
        description:
          'Designing the optimal revenue structure, org chart, and tech stack.',
        exampleLabel: 'Example: FinTech',
        exampleDetail:
          'Constructing high-velocity PLG loops with enterprise sales overlays.',
      },
      {
        label: '03 Align',
        description: 'Synchronizing marketing, sales, and CS around a single truth.',
        exampleLabel: 'Example: Energy',
        exampleDetail:
          'Aligning field sales with centralized account-based marketing data.',
      },
      {
        label: '04 Accelerate',
        description:
          'Executing the blueprint and iterating based on live market data.',
        exampleLabel: 'Example: B2B SaaS',
        exampleDetail:
          'Rapid experimentation across pricing tiers and channel partners.',
      },
    ],
  },
  sectors: {
    sectionTitle: 'Sector Specializations',
    sectionSubtitle: 'Where we have deployed architecture successfully.',
    cards: [
      {
        title: 'FinTech',
        description:
          'Navigating complex compliance while accelerating user acquisition in saturated markets.',
      },
      {
        title: 'HealthTech',
        description:
          'Enterprise sales structures for selling into hospital systems and payer networks.',
      },
      {
        title: 'Cybersecurity',
        description:
          'Shifting from technical feature selling to C-level risk mitigation narratives.',
      },
      {
        title: 'Manufacturing',
        description:
          'Digital transformation GTM strategies for legacy industrial players.',
      },
      {
        title: 'B2B SaaS',
        description:
          'From PLG to Enterprise sales motion transitions. Pricing optimization.',
      },
      {
        title: 'Energy',
        description:
          'Market entry strategies for renewables and grid modernization tech.',
      },
      {
        title: 'Retail Tech',
        description:
          'Omnichannel integration sales strategies and partnership ecosystem development.',
      },
      {
        title: 'GovTech',
        description:
          'Optimizing capture management and proposal processes for public sector.',
      },
      {
        title: 'EdTech',
        description:
          'District-level sales architecture vs B2C subscription models.',
      },
      {
        title: 'Logistics',
        description:
          'Supply chain visibility platforms and brokerage GTM scaling.',
      },
      {
        title: 'Professional Services',
        description:
          'Productizing service offerings to increase valuation multiples.',
      },
      {
        title: 'Telecom',
        description:
          '5G infrastructure monetization and B2B connectivity sales.',
      },
    ],
  },
  quoteBand: {
    quoteLine:
      'Every industry has unique constraints. Our architecture delivers precision where it matters most.',
    kicker: 'The Revenue Architect Promise',
  },
  bottomCta: {
    title: 'Action',
    subtitle: 'Ready to optimize your revenue architecture?',
    buttonLabel: 'Schedule Audit',
  },
}
