/**
 * Content object for Content Marketing expertise page.
 * Used by Uploaded_Expertise_ContentEngagement_v1 template.
 */

export const CONTENT_MARKETING_CONTENT = {
  metadata: {
    title: "Content Marketing - GTMStack Pro",
    siteName: "GTMStack.pro",
    logoIcon: "edit",
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
      main: "Content",
      highlight: "Marketing",
    },
    description: "Strategic narrative engines that drive organic growth, build authority, and fuel demand. We engineer content systems that turn your expertise into sustainable competitive advantage.",
    primaryCTA: { label: "Explore Content Strategy", href: "#services" },
    secondaryCTA: { label: "Request Audit", href: "/contact" },
    image: {
      src: "https://images.unsplash.com/photo-1634496685180-e0ad3f33c23c?q=80&w=2070&auto=format&fit=crop",
      alt: "Content strategy and narrative architecture",
    },
    floatingBadges: [
      { icon: "edit", label: "Strategic" },
      { icon: "trending_up", label: "Growth-Driven" },
    ],
  },
  stats: [
    { value: "343%", label: "Content ROI Lift", subtext: "Average improvement from strategic frameworks" },
    { value: "4.2x", label: "Engagement Increase", subtext: "Year-over-year audience growth" },
    { value: "180%", label: "Organic Traffic", subtext: "Sustainable growth from SEO and authority" },
  ],
  services: {
    title: "Content Services",
    items: [
      {
        icon: "edit_note",
        title: "Content Strategy & Architecture",
        description: "Building modular content systems aligned to buyer journeys. Strategic pillars, editorial calendars, and measurement frameworks that scale.",
      },
      {
        icon: "article",
        title: "Long-Form & Blog Content",
        description: "Authoritative, SEO-optimized content that educates and positions your brand. In-depth guides, research reports, and thought leadership.",
      },
      {
        icon: "description",
        title: "Demand Generation Content",
        description: "Conversion-focused content designed to move buyers through stages. Landing pages, case studies, whitepapers, and ROI calculators.",
      },
      {
        icon: "hub",
        title: "Content Orchestration",
        description: "Coordinating content across channels—web, email, social, paid. Ensuring consistent messaging and maximum reach.",
      },
      {
        icon: "data_usage",
        title: "Content Analytics & Measurement",
        description: "Tracking content performance tied to pipeline and revenue. Attribution modeling, engagement scoring, and optimization cycles.",
      },
    ],
  },
  quote: {
    text: "Content is engineered connection — every piece must perform a specific revenue function.",
    subtext: "Content that doesn't move the needle isn't content—it's noise. We apply rigor and data to the art of storytelling.",
  },
  explore: {
    title: "Explore Further",
    viewAllHref: "/expertise",
    cards: [
      {
        category: "CASE STUDY",
        title: "500K MRR with Content-Led GTM",
        description: "How a B2B SaaS scaled from 0 to $500K MRR primarily through strategic content and organic growth.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "View Case Study",
        href: "/case-studies",
      },
      {
        category: "INSIGHTS",
        title: "Content ROI Framework",
        description: "How to measure and optimize content performance tied directly to pipeline and revenue outcomes.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f70504cff?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Read Article",
        href: "/insights",
      },
      {
        category: "RESOURCE",
        title: "Content Audit Checklist",
        description: "Self-assessment tool to evaluate your current content strategy maturity and identify gaps.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Download",
        href: "/resources",
      },
    ],
  },
  ctaSection: {
    title: "Ready to Engineer Your Content Strategy?",
    subtitle: "Let's build a content system that drives predictable pipeline and sustainable growth.",
    button: { label: "Schedule a Content Audit", href: "/contact" },
  },
  footer: {
    description: "Strategic content systems for B2B technology companies. Transforming expertise into sustainable competitive advantage.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Content Marketing", href: "/expertise/content-marketing" },
          { label: "Demand Generation", href: "/expertise/demand-generation" },
          { label: "SEO & Content", href: "/expertise/search-engine-optimization" },
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
