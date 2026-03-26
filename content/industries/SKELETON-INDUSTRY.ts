/**
 * Content skeleton for industry page.
 * Copy this file and rename to [industry-name].ts, then replace SKELETON_INDUSTRY with your industry name (e.g., HEALTHCARE_CONTENT)
 * Used by template resolver for /industries/[industry-slug]
 */

export const SKELETON_INDUSTRY_CONTENT = {
  brand: {
    tagline: "Industry-specific GTM positioning",
    description: "How we approach this industry vertical.",
  },
  hero: {
    headline: "[Industry Name] Revenue Architecture",
    subheadline: "Industry-specific growth systems for [industry]",
    description: "Detailed explanation of the unique challenges and opportunities in [industry]. Our approach integrates [specific factors] to accelerate revenue.",
    primaryCTA: { label: "Explore Strategy", href: "#capabilities" },
    secondaryCTA: { label: "Contact", href: "/contact" },
    image: {
      src: "https://images.unsplash.com/[relevant-industry-image]",
      alt: "[Industry] GTM system visualization",
    },
  },
  metricsSection: {
    headline: "Impact in [Industry]",
    stats: [
      { value: "+X%", label: "Pipeline Growth", description: "Average improvement for [industry] clients" },
      { value: "X.Xh", label: "Sales Cycle Reduction", description: "Typical acceleration of deal velocity" },
      { value: "$XM", label: "Average ARR Increase", description: "Revenue per client engagement" },
    ],
  },
  capabilitiesSection: {
    headline: "Services for [Industry]",
    items: [
      {
        icon: "target",
        title: "Industry-Specific ICP",
        description: "Defining high-value accounts within [industry] based on vertical-specific factors like [factor 1], [factor 2], regulatory posture.",
      },
      {
        icon: "groups",
        title: "Buying Committee Navigation",
        description: "Mapping and engaging [industry]-specific buyer personas: [persona 1], [persona 2], [persona 3], and their decision criteria.",
      },
      {
        icon: "compliance",
        title: "Regulatory/Compliance Alignment",
        description: "Navigating [industry] regulatory landscape—integrating compliance checks and approval workflows into GTM motion.",
      },
      {
        icon: "link",
        title: "Industry Ecosystem Partnerships",
        description: "Leveraging [industry] partners, integrations, and ecosystem players to expand reach and credibility.",
      },
      {
        icon: "analytics",
        title: "[Industry]-Specific Attribution",
        description: "Measuring success against [industry] KPIs: [KPI 1], [KPI 2], [KPI 3].",
      },
    ],
  },
  philosophySection: {
    headline: "[Industry] Philosophy",
    principles: [
      {
        title: "Vertical-First Strategy",
        description: "Generic GTM fails in [industry]. We architect solutions around [industry]-specific value drivers and buying behaviors.",
      },
      {
        title: "[Key Constraint in Industry]",
        description: "Address the primary friction point unique to [industry]—whether regulatory, organizational, technical, or market structural.",
      },
      {
        title: "Multi-Stakeholder Orchestration",
        description: "Enterprise buying in [industry] involves [X] decision-makers across [departments]. We align and orchestrate all participants.",
      },
      {
        title: "Long-Cycle, High-Value Focus",
        description: "Success is measured in pipeline velocity, deal size, and win rate in [industry]—not generic volume metrics.",
      },
    ],
  },
  growthSection: {
    headline: "Accelerating Growth in [Industry]",
    narrative: "Revenue growth in [industry] requires understanding the unique pressures, regulations, and decision structures that shape buying. We replace generic playbooks with [industry]-specific motion that addresses [specific challenge 1], [specific challenge 2], and [specific challenge 3]. The result is faster deal cycles, larger deal sizes, and more predictable pipeline.",
    metrics: [
      { label: "[Industry KPI 1]", value: "+X%", description: "Typical improvement" },
      { label: "[Industry KPI 2]", value: "X months", description: "Cycle time reduction" },
      { label: "[Industry KPI 3]", value: "$XM", description: "Average outcome" },
    ],
  },
  ctaSection: {
    title: "Ready to Build [Industry] Revenue Architecture?",
    subtitle: "Let's design a growth system built for the realities of [industry].",
    button: { label: "Contact", href: "/contact" },
  },
  footer: {
    description: "[Industry]-specific B2B GTM architecture for predictable, regulated, high-value growth.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Account-Based Marketing", href: "/expertise/account-based-marketing" },
          { label: "Sales Enablement", href: "/expertise/sales-enablement" },
          { label: "Revenue Operations", href: "/expertise/revenue-operations" },
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
