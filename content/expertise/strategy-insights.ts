/**
 * Content object for the Strategy & Insights expertise pillar.
 * Used by Uploaded_StratInsights_v1 template.
 */

export const STRATEGY_INSIGHTS_CONTENT = {
  header: {
    logoText: { main: 'GTMStack', accent: '.pro' },
    navLinks: [
      { label: 'Expertise', href: '/expertise' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Industries', href: '/industries' },
      { label: 'About', href: '/about' },
    ],
    cta: { label: 'Get Started', href: '/contact' },
  },
  hero: {
    title: { main: 'Strategy &', gradient: 'Insights' },
    description: 'Master blueprints to win and retain enterprise accounts through engineered clarity. We transform chaotic data into scalable GTM structures.',
    primaryCTA: { label: 'Explore Strategy', href: '#services' },
    secondaryCTA: { label: 'Request Audit', href: '/contact' },
    visual: {
      title: 'Engineered Growth',
      subtitle: 'Real-time architecture visualizer',
    },
  },
  metrics: [
    { value: '+87%', label: 'YoY Pipeline' },
    { value: '300+', label: 'Enterprise Accounts' },
    { value: '+35%', label: 'MQL Lift' },
  ],
  services: {
    title: 'Core Strategy Pillars',
    pillars: [
      { 
        icon: 'target', 
        title: 'Account-Based Marketing', 
        description: 'Precision-targeting for high-value enterprise tiers through coordinated ABM.' 
      },
      { 
        icon: 'users', 
        title: 'Customer Experience (CX)', 
        description: 'Mapping journey friction to revenue opportunities and lifetime value.' 
      },
      { 
        icon: 'trending', 
        title: 'Customer Marketing', 
        description: 'Scaling expansion revenue through strategic engagement and advocacy.' 
      },
      { 
        icon: 'refresh', 
        title: 'Lifecycle Marketing', 
        description: 'Full-funnel automation and retention models that drive predictability.' 
      },
      { 
        icon: 'search', 
        title: 'Market Research', 
        description: 'Data-driven insights to define your niche and competitive positioning.' 
      },
    ],
  },
  philosophy: {
    quote: 'Strategy isn\'t guesswork — it\'s engineered clarity.',
    author: 'GTMStack Pro',
  },
  teasers: [
    { 
      category: 'Insights', 
      title: 'Latest Thinking', 
      linkText: 'Read Articles', 
      href: '/blog', 
      icon: 'book' 
    },
    { 
      category: 'Gallery', 
      title: 'Architecture Gallery', 
      linkText: 'View Designs', 
      href: '/gallery', 
      icon: 'image' 
    },
    { 
      category: 'Evidence', 
      title: 'Case Studies', 
      linkText: 'See Results', 
      href: '/case-studies', 
      icon: 'briefcase' 
    },
  ],
  ctaBand: {
    title: 'Ready to Architect Your Growth?',
    subtitle: 'Join enterprises optimizing their GTM machinery with strategic clarity.',
    cta: { label: 'Schedule Audit', href: '/contact' },
  },
  footer: {
    description: 'Engineered excellence for enterprise GTM. Building the future of B2B revenue operations through strategic clarity and operational precision.',
    sections: [
      {
        title: 'Expertise',
        links: [
          { label: 'Strategy & Insights', href: '/expertise/strategy-insights' },
          { label: 'Demand & Growth', href: '/expertise/demand-growth' },
          { label: 'Systems & Operations', href: '/expertise/systems-operations' },
          { label: 'Content & Engagement', href: '/expertise/content-engagement' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Gallery', href: '/gallery' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    copyright: '© 2026 GTMStack.pro. All rights reserved.',
  },
}
