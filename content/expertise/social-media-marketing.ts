/**
 * Content object for Social Media Marketing expertise page.
 * Used by Uploaded_Expertise_ContentEngagement_v1 template.
 */

export const SOCIAL_MEDIA_MARKETING_CONTENT = {
  metadata: {
    title: "Social Media Marketing - GTMStack Pro",
    siteName: "GTMStack.pro",
    logoIcon: "share",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Expertise", href: "/expertise", active: true },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
  ],
  hero: {
    badge: "Expertise Topic",
    headline: {
      main: "Social Media &",
      highlight: "Reputation",
    },
    description: "Community-building and brand authority through organic and paid social. Engagement strategies that turn followers into advocates and amplify your GTM motion.",
    primaryCTA: { label: "Explore Social Strategy", href: "#services" },
    secondaryCTA: { label: "Request Social Audit", href: "/contact" },
    image: {
      src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2070&auto=format&fit=crop",
      alt: "Social media marketing and community engagement",
    },
    floatingBadges: [
      { icon: "group", label: "Community" },
      { icon: "trending_up", label: "Growth" },
    ],
  },
  stats: [
    { value: "+350%", label: "Engagement Growth", subtext: "Average increase in community engagement" },
    { value: "3.8x", label: "Social ROI", subtext: "Return on paid social spend" },
    { value: "156%", label: "Follower Growth", subtext: "Year-over-year organic reach expansion" },
  ],
  services: {
    title: "Social Media Services",
    items: [
      {
        icon: "campaign",
        title: "Social Strategy & Planning",
        description: "LinkedIn, Twitter, and platform-specific strategies. Content calendars, narrative frameworks, and voice guidelines.",
      },
      {
        icon: "create",
        title: "Content Creation & Copywriting",
        description: "Platform-native content—short-form, long-form, video teasers. Optimized for engagement and algorithm performance.",
      },
      {
        icon: "thumb_up",
        title: "Community Management",
        description: "Active moderation, comment response, and relationship building. Turning engaged followers into active community members.",
      },
      {
        icon: "trending_up",
        title: "Paid Social Campaigns",
        description: "LinkedIn Ads, Twitter promotions, platform-specific paid strategies. Lead generation and awareness campaigns.",
      },
      {
        icon: "assessment",
        title: "Social Analytics & Reporting",
        description: "Tracking reach, engagement, conversions, and pipeline impact. Optimization based on data.",
      },
    ],
  },
  quote: {
    text: "Social media is where your buyers spend their attention — and you should be there too.",
    subtext: "But presence without strategy is just noise. We build social systems that drive meaningful engagement and amplify GTM.",
  },
  explore: {
    title: "Explore Further",
    viewAllHref: "/expertise",
    cards: [
      {
        category: "CASE STUDY",
        title: "LinkedIn Strategy Generated 400 MQLs",
        description: "How a strategic LinkedIn presence and content program generated 400+ qualified leads in 6 months.",
        image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "View Case Study",
        href: "/case-studies",
      },
      {
        category: "INSIGHTS",
        title: "B2B Social Media ROI Framework",
        description: "How to measure social media impact on pipeline, revenue, and brand authority.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Read Article",
        href: "/insights",
      },
      {
        category: "TEMPLATE",
        title: "Social Content Calendar Template",
        description: "Ready-to-use content calendar and strategy framework for B2B GTM.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Download",
        href: "/resources",
      },
    ],
  },
  ctaSection: {
    title: "Ready to Build Your Social Authority?",
    subtitle: "Let's create a social strategy that builds brand authority and drives pipeline.",
    button: { label: "Schedule Social Strategy Call", href: "/contact" },
  },
  footer: {
    description: "Strategic social media programs that build community, authority, and revenue for B2B technology companies.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Social Media Marketing", href: "/expertise/social-media-marketing" },
          { label: "Demand Generation", href: "/expertise/demand-generation" },
          { label: "Content Marketing", href: "/expertise/content-marketing" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Case Studies", href: "/case-studies" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
    copyright: "© 2026 GTMStack.pro. All rights reserved.",
  },
}
