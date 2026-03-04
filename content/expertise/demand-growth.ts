/**
 * Content object for the Demand & Growth expertise pillar.
 * Used by Uploaded_DemandGrowth_v1 template.
 */

export const DEMAND_GROWTH_CONTENT = {
  nav: {
    brand: 'GTMStack',
    suffix: '.pro',
    links: [
      { label: 'Expertise', href: '/expertise' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Industries', href: '/industries' },
      { label: 'About', href: '/about' },
    ],
    cta: 'Get Started',
  },
  hero: {
    badge: 'DEMAND & GROWTH',
    titleMain: 'Demand &',
    titleHighlight: 'Growth',
    description: 'Predictable pipeline engineering for explosive market capture. We architect compounding revenue engines that scale.',
    primaryCta: 'Explore Growth',
    secondaryCta: 'Request Audit',
    stats: {
      label: 'Projected Scale',
      value: 'Exponential',
      multiplier: '12.4x',
      multiplierLabel: 'Efficiency Multiplier',
    },
  },
  metrics: [
    { value: '+300%', label: 'Average Inbound Lift' },
    { value: '$50M+', label: 'Pipeline Generated' },
    { value: '3x', label: 'Target LTV/CAC Ratio' },
  ],
  services: {
    title: 'Execution',
    highlight: 'Verticals',
    description: 'Integrated demand generation strategies built on data, not hunches. We operate at the intersection of psychology and analytics.',
    items: [
      {
        title: 'Performance Marketing',
        description: 'Multi-channel paid acquisition optimized for high-intent capture and maximum ROAS in competitive enterprise landscapes.',
        iconType: 'performance' as const,
      },
      {
        title: 'Pipeline Engineering',
        description: 'Mapping and automating the complete buyer journey to eliminate friction and accelerate deal velocity from MQL to Closed-Won.',
        iconType: 'pipeline' as const,
      },
      {
        title: 'SEO & Organic Growth',
        description: 'Dominating the search landscape through semantic authority, technical precision, and high-conversion content clusters.',
        iconType: 'seo' as const,
      },
      {
        title: 'Growth Marketing',
        description: 'Rapid experimentation frameworks designed to identify and exploit non-obvious levers for viral expansion and product-led growth.',
        iconType: 'growth' as const,
      },
      {
        title: 'Outbound Architecture',
        description: 'Precision-targeted outbound motion combining hyper-personalization with automated scale to penetrate key accounts.',
        iconType: 'outbound' as const,
      },
    ],
  },
  philosophy: {
    quote: 'Growth isn\'t an accident — it\'s a',
    highlight: 'compounding formula',
    attribution: 'GTMStack Methodology',
  },
  teasers: {
    title: 'Deep Intelligence',
    description: 'The mechanics of scaling enterprise organizations.',
    items: [
      {
        category: 'Case Study',
        title: 'ABM System Launch at PRGX',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Proof',
        title: '87% YoY Pipeline Growth',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Framework',
        title: 'Enterprise ABM Activation',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
  ctaSection: {
    title: 'Ready to Architect Your Growth?',
    button: 'Schedule Growth Audit',
  },
  footer: {
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'About', href: '/about' },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Contact', href: '/contact' },
    ],
    copyright: '© 2026 GTMStack.pro. All rights reserved.',
  },
}
