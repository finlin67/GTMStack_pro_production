/**
 * Content object for Event Marketing expertise page.
 * Used by Uploaded_Expertise_ContentEngagement_v1 template.
 */

export const EVENT_MARKETING_CONTENT = {
  metadata: {
    title: "Event Marketing - GTMStack Pro",
    siteName: "GTMStack.pro",
    logoIcon: "calendar",
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
      main: "Event &",
      highlight: "Tradeshow",
    },
    description: "High-impact event programs that build relationships, accelerate deals, and drive measurable revenue. Virtual, hybrid, and in-person events engineered for GTM impact.",
    primaryCTA: { label: "Explore Event Strategy", href: "#services" },
    secondaryCTA: { label: "Request Event Audit", href: "/contact" },
    image: {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      alt: "Event marketing and audience engagement",
    },
    floatingBadges: [
      { icon: "event", label: "Strategic" },
      { icon: "people", label: "Engagement" },
    ],
  },
  stats: [
    { value: "+280%", label: "Event-Driven Pipeline", subtext: "Average contribution from event programs" },
    { value: "4.5x", label: "Event ROI", subtext: "Return on event investment" },
    { value: "92%", label: "Attendee Conversion", subtext: "MQL conversion rate" },
  ],
  services: {
    title: "Event Services",
    items: [
      {
        icon: "event",
        title: "Event Strategy & Planning",
        description: "Building event portfolios aligned to buyer journey and revenue goals. Virtual, hybrid, and in-person event strategies.",
      },
      {
        icon: "videocam",
        title: "Webinar & Virtual Events",
        description: "Production-grade webinars and virtual events. Tech stack selection, scriptwriting, talent coaching, and promotion.",
      },
      {
        icon: "place",
        title: "In-Person & Tradeshow",
        description: "Strategic tradeshow participation and booth design. Pre-event activation, booth experience, and lead capture.",
      },
      {
        icon: "mail",
        title: "Event Promotion & Follow-Up",
        description: "Integrated campaigns to drive attendance and post-event nurturing. Email sequences, paid campaigns, and sales enablement.",
      },
      {
        icon: "analytics",
        title: "Event Measurement & ROI",
        description: "Tracking event impact on pipeline, revenue, and attendee lifetime value. Attribution and optimization.",
      },
    ],
  },
  quote: {
    text: "Events are the highest-engagement channel—when orchestrated correctly.",
    subtext: "Most events fail because they're isolated experiences. We integrate events into the full GTM motion.",
  },
  explore: {
    title: "Explore Further",
    viewAllHref: "/expertise",
    cards: [
      {
        category: "CASE STUDY",
        title: "Virtual Event Generated $800K Pipeline",
        description: "How a single virtual event, strategically promoted and executed, drove qualified deals worth $800K in pipeline.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "View Case Study",
        href: "/case-studies",
      },
      {
        category: "INSIGHTS",
        title: "Event ROI Framework",
        description: "How to measure event success tied to pipeline, revenue, and customer lifetime value.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Read Article",
        href: "/insights",
      },
      {
        category: "TEMPLATE",
        title: "Event Planning Checklist",
        description: "Complete checklist for planning, executing, and measuring events.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Download",
        href: "/resources",
      },
    ],
  },
  ctaSection: {
    title: "Ready to Architect Your Event Strategy?",
    subtitle: "Let's build an event program that drives predictable pipeline and brand authority.",
    button: { label: "Schedule Event Strategy Call", href: "/contact" },
  },
  footer: {
    description: "Strategic event programs that drive revenue and build relationships for B2B technology companies.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Event Marketing", href: "/expertise/event-marketing" },
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
