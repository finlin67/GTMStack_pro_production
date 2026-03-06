/**
 * Content & Engagement Pillar
 * Rich content structure for the new pillar-based expert page design
 */
export const CONTENT_ENGAGEMENT_CONTENT = {
  metadata: {
    logoIcon: 'campaign',
    siteName: 'GTMStack.pro',
  },
  navigation: [
    { label: 'Expertise', href: '/expertise', active: true },
    { label: 'Case Studies', href: '/case-studies', active: false },
    { label: 'Gallery', href: '/gallery', active: false },
    { label: 'Industries', href: '/industries', active: false },
    { label: 'About', href: '/about', active: false },
    { label: 'Blog', href: '/blog', active: false },
  ],
  hero: {
    badge: 'EXPERTISE CATEGORY',
    headline: {
      main: 'Content &',
      highlight: 'Engagement',
    },
    description: 'Storytelling engines that build trust, demand, and lifetime value. We re-engineer how your brand speaks to stakeholders across every stage.',
    primaryCTA: {
      label: 'Explore Storytelling',
      href: '#services',
    },
    secondaryCTA: {
      label: 'Request Audit',
      href: '/contact',
    },
    image: {
      src: '/assets/expertise/content-engagement-hero.jpg',
      alt: 'Content & Engagement',
    },
    floatingBadges: [
      { icon: 'speed', label: 'High Velocity' },
      { icon: 'connected_tv', label: 'Connected' },
    ],
  },
  stats: [
    {
      value: '343%',
      label: 'ENGAGEMENT LIFT',
      subtext: 'From cohesive storytelling',
    },
    {
      value: '4.2x',
      label: 'CONTENT ROI',
      subtext: 'Return on campaign spend',
    },
    {
      value: '180%',
      label: 'AUDIENCE GROWTH',
      subtext: 'Organic reach expansion',
    },
  ],
  services: {
    title: 'Core Services',
    items: [
      {
        icon: 'edit_note',
        title: 'Content Marketing',
        description: 'Craft narratives that resonate. We build the architecture for your content voice in a crowded market.',
      },
      {
        icon: 'mail_outline',
        title: 'Email Marketing',
        description: 'Move subscribers into lifecycle journeys. Email remains the highest-ROI channel; we treat it with precision.',
      },
      {
        icon: 'hub',
        title: 'Omnichannel Marketing',
        description: 'Unified experiences across touchpoints. Web, social, email, video — orchestrated as one system.',
      },
      {
        icon: 'share_reviews',
        title: 'Social Media Marketing',
        description: 'Community-building at brand scale. We turn passive followers into active community members.',
      },
      {
        icon: 'play_circle',
        title: 'Video Marketing',
        description: 'High-impact visual storytelling. Explainers, case studies, webinars — video that drives results.',
      },
      {
        icon: 'public',
        title: 'Thought Leadership',
        description: 'Position your executives as industry voices. Strategic visibility, authentic authority.',
      },
    ],
  },
  quote: {
    text: "Content isn't filler — it's engineered connection.",
    subtext: 'In a world of noise, signals fade. We apply the science of storytelling to ensure every piece of content performs a specific revenue function.',
  },
  explore: {
    title: 'Explore Further',
    viewAllHref: '/expertise',
    cards: [
      {
        category: 'PROOF',
        image: '/assets/case-studies/roi-proof.jpg',
        title: 'The Future of Content ROI',
        description: 'How AI is reshaping content production while maintaining human authenticity and brand voice.',
        href: '/blog/future-content-roi',
        ctaLabel: 'Read Article',
      },
      {
        category: 'CASE STUDY',
        image: '/assets/case-studies/b2b-growth.jpg',
        title: 'SaaS Unicorn Growth',
        description: 'How strategic content workflows scaled a B2B tech platform from 0 to 40k MRR.',
        href: '/case-studies/saas-unicorn-growth',
        ctaLabel: 'View Case Study',
      },
      {
        category: 'GALLERY',
        image: '/assets/gallery/visual-systems.jpg',
        title: 'Visual Systems Design',
        description: 'A collection of high-fidelity visual systems we\'ve created for enterprise GTM.',
        href: '/gallery',
        ctaLabel: 'Browse Gallery',
      },
    ],
  },
  ctaSection: {
    title: 'Ready for Content & Engagement results?',
    subtitle: 'Stop publishing noise. Start engineering growth.',
    buttonLabel: 'Get In Touch',
  },
  footer: {
    description: 'Strategic GTM consulting for B2B technology companies. We engineer the systems, narratives, and operations that drive predictable pipeline.',
    services: [
      'Content Strategy',
      'Demand Generation',
      'Revenue Operations',
      'GTM Orchestration',
      'Lead Operations',
      'Marketing Analytics',
    ],
    company: [
      'About',
      'Blog',
      'Case Studies',
      'Gallery',
      'Contact',
      'Privacy Policy',
    ],
    copyright: '© 2025 GTMStack Pro. All rights reserved.',
  },
};


