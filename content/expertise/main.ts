/**
 * Content for /expertise (expertise:main).
 * Shape matches ExpertiseMainTemplate Expected Content Prop.
 */
export const EXPERTISE_MAIN_CONTENT = {
  logo: {
    icon: 'architecture',
    label: 'REVENUEARCHITECT',
    subLabel: 'Architecture',
  },
  navLinks: [
    { label: 'Home', href: '/', active: false },
    { label: 'Expertise', href: '/expertise', active: true },
    { label: 'Industries', href: '/industries', active: false },
    { label: 'Case Studies', href: '/case-studies', active: false },
    { label: 'Contact', href: '/contact', active: false },
  ],
  hero: {
    badge: 'GTM Expertise',
    title: 'Engineering Revenue Systems That Scale',
    subtitle: 'Four interconnected pillars of B2B mastery — Content & Engagement, Demand & Growth, Strategy & Insights, Systems & Operations.',
    ctaPrimary: 'Start Your Audit',
    ctaSecondary: 'View Methodology',
  },
  pillars: {
    title: 'Four Pillars of GTM Mastery',
    subtitle: 'Content & Engagement, Demand & Growth, Strategy & Insights, Systems & Operations.',
    items: [
      {
        title: 'Content & Engagement',
        description: 'Content strategies and engagement systems that drive pipeline.',
        icon: 'campaign',
        color: 'text-[#2463eb]',
        bgStart: 'bg-[#2463eb]/10',
        ringColor: 'hover:ring-[#2463eb]/30',
        glowColor: 'bg-[#2463eb]/20',
      },
      {
        title: 'Demand & Growth',
        description: 'Demand generation and growth systems for predictable pipeline.',
        icon: 'trending_up',
        color: 'text-[#059669]',
        bgStart: 'bg-[#059669]/10',
        ringColor: 'hover:ring-[#059669]/30',
        glowColor: 'bg-[#059669]/20',
      },
      {
        title: 'Strategy & Insights',
        description: 'Strategic advisory and data-driven insights for GTM decisions.',
        icon: 'insights',
        color: 'text-[#7c3aed]',
        bgStart: 'bg-[#7c3aed]/10',
        ringColor: 'hover:ring-[#7c3aed]/30',
        glowColor: 'bg-[#7c3aed]/20',
      },
      {
        title: 'Systems & Operations',
        description: 'RevOps, automation, and infrastructure that scales revenue.',
        icon: 'settings',
        color: 'text-[#dc2626]',
        bgStart: 'bg-[#dc2626]/10',
        ringColor: 'hover:ring-[#dc2626]/30',
        glowColor: 'bg-[#dc2626]/20',
      },
    ],
  },
  philosophy: {
    quote: 'We build systems that drive predictable revenue — not campaigns that burn cash.',
    highlight: 'predictable revenue',
  },
  insights: {
    title: 'Latest Insights',
    subtitle: 'GTM playbooks, case studies, and revenue architecture thinking.',
    cta: 'View all',
    items: [
      {
        type: 'Playbook',
        title: 'ABM Implementation Guide',
        description: 'How to build account-based motion that converts enterprise buyers.',
        image: '/images/heroes/industries-default.webp',
        date: '2024',
        cta: 'Read',
      },
      {
        type: 'Case Study',
        title: 'Pipeline Growth for B2B SaaS',
        description: '87% YoY pipeline lift through unified RevOps and ABM.',
        image: '/images/heroes/industries-default.webp',
        date: '2024',
        cta: 'Read',
      },
      {
        type: 'Insight',
        title: 'GTM Systems Architecture',
        description: 'Engineering revenue systems that scale with your business.',
        image: '/images/heroes/industries-default.webp',
        date: '2024',
        cta: 'Read',
      },
    ],
  },
  ctaBand: {
    title: 'Ready to engineer your revenue systems?',
    subtitle: 'Our diagnostic audit uncovers the exact bottlenecks holding your pipeline back.',
    ctaPrimary: 'Schedule Audit',
    ctaSecondary: 'View Case Studies',
  },
  footer: {
    columns: [
      {
        title: 'Expertise',
        links: [
          { label: 'Content & Engagement', href: '/expertise/content-engagement' },
          { label: 'Demand & Growth', href: '/expertise/demand-growth' },
          { label: 'Strategy & Insights', href: '/expertise/strategy-insights' },
          { label: 'Systems & Operations', href: '/expertise/systems-operations' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Industries', href: '/industries' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    copyright: '© RevenueArchitect. All rights reserved.',
    tagline: 'Engineered GTM systems for the modern enterprise.',
  },
}
