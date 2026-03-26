/**
 * Content for /expertise (expertise:main).
 * Shape matches ExpertiseMainTemplate Expected Content Prop.
 */
export const EXPERTISE_MAIN_CONTENT = {
  logo: {
    icon: 'architecture',
    label: 'GTMSTACK.PRO',
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
    badge: 'Built GTM Systems',
    title: 'Systems I’ve built, tested, and documented across GTM',
    subtitle:
      'This page groups the work into four areas so you can quickly see the messaging, demand, strategy, and operations systems behind the portfolio and, if useful, compare them to your own GTM stack.',
    ctaPrimary: 'Browse the systems',
    ctaSecondary: 'See case studies',
  },
  pillars: {
    title: 'Work Organized by System Area',
    subtitle:
      'Each section points to systems, experiments, frameworks, and operating patterns I’ve built and used in practice.',
    items: [
      {
        title: 'Content & Engagement',
        description:
          'Messaging systems, content engines, and engagement workflows I’ve built and iterated.',
        icon: 'campaign',
        color: 'text-[#2463eb]',
        bgStart: 'bg-[#2463eb]/10',
        ringColor: 'hover:ring-[#2463eb]/30',
        glowColor: 'bg-[#2463eb]/20',
      },
      {
        title: 'Demand & Growth',
        description:
          'Acquisition systems, funnel tests, and pipeline programs built for repeatable growth.',
        icon: 'trending_up',
        color: 'text-[#059669]',
        bgStart: 'bg-[#059669]/10',
        ringColor: 'hover:ring-[#059669]/30',
        glowColor: 'bg-[#059669]/20',
      },
      {
        title: 'Strategy & Insights',
        description:
          'Research models, planning frameworks, and decision systems used to guide GTM moves.',
        icon: 'insights',
        color: 'text-[#7c3aed]',
        bgStart: 'bg-[#7c3aed]/10',
        ringColor: 'hover:ring-[#7c3aed]/30',
        glowColor: 'bg-[#7c3aed]/20',
      },
      {
        title: 'Systems & Operations',
        description:
          'RevOps infrastructure, automations, and reporting systems built to make revenue work visible.',
        icon: 'settings',
        color: 'text-[#dc2626]',
        bgStart: 'bg-[#dc2626]/10',
        ringColor: 'hover:ring-[#dc2626]/30',
        glowColor: 'bg-[#dc2626]/20',
      },
    ],
  },
  philosophy: {
    quote: 'The goal is to make GTM work easier to understand,',
    highlight: 'trace, and improve',
  },
  insights: {
    title: 'Latest Insights',
    subtitle: 'Field notes, case studies, and operator thinking connected to the work on this site.',
    cta: 'See all insights',
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
    title: 'Want a second set of eyes on your GTM stack?',
    subtitle:
      'If the work here overlaps with what your team is building, send me a note. I’m always open to reviewing a GTM system, comparing approaches, or talking through where things might be stuck.',
    ctaPrimary: 'Send a note',
    ctaSecondary: 'See case studies',
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
    copyright: '© GTMStack.pro. All rights reserved.',
    tagline: 'Operator-built GTM portfolio, with room for the occasional GTM review.',
  },
}
