/**
 * Content object for Account-Based Marketing expertise page.
 * Used by Uploaded_Expertise_DemandGrowth_v1 template.
 */

export const ACCOUNT_BASED_MARKETING_CONTENT = {
  brand: {
    tagline: "Precision GTM for High-Value Accounts",
    description: "ABM is the art and science of targeting, engaging, and closing high-value accounts. We build account-centric motion from pipeline to signature.",
  },
  hero: {
    headline: "Account-Based Marketing",
    subheadline: "Orchestrated, precision GTM for your highest-value accounts",
    description: "ABM flips demand generation on its head—instead of casting wide nets, we orchestrate laser-focused campaigns tailored to specific target accounts. Each piece of marketing is personalized, coordinated, and designed to accelerate deals.",
    primaryCTA: { label: "Explore ABM Strategy", href: "#capabilities" },
    secondaryCTA: { label: "Request ABM Assessment", href: "/contact" },
    image: {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      alt: "Account-based marketing orchestration",
    },
  },
  metricsSection: {
    headline: "ABM Impact",
    stats: [
      { value: "+42%", label: "Win Rate Improvement", description: "Average increase in deal closure rates" },
      { value: "5.2x", label: "Sales Productivity", description: "Revenue per sales rep with ABM" },
      { value: "$3.8M", label: "Average ACV Growth", description: "Accounts engaged through ABM motion" },
    ],
  },
  capabilitiesSection: {
    headline: "ABM Services & Capabilities",
    items: [
      {
        icon: "target",
        title: "Target Account Selection",
        description: "Identifying and prioritizing high-value accounts based on fit, signal, and revenue potential. Account scoring and segmentation.",
      },
      {
        icon: "person",
        title: "Buying Committee Mapping",
        description: "Identifying and profiling decision-makers and influencers within target accounts. Persona development and relationship mapping.",
      },
      {
        icon: "mail",
        title: "Personalized Engagement",
        description: "Coordinated, personalized outreach across channels. Email, LinkedIn, direct mail, ads—all orchestrated around the account.",
      },
      {
        icon: "campaign",
        title: "Multi-Channel Campaigns",
        description: "Paid advertising, content, events, and sales enablement all coordinated around target accounts.",
      },
      {
        icon: "analytics",
        title: "Account Engagement Tracking",
        description: "Real-time visibility into account health, engagement velocity, and buying committee activity.",
      },
    ],
  },
  philosophySection: {
    headline: "ABM Philosophy",
    principles: [
      {
        title: "Precision Over Volume",
        description: "Quality over quantity. Focus marketing resources on accounts with the highest contract value and best fit.",
      },
      {
        title: "Sales & Marketing Alignment",
        description: "ABM requires deep collaboration between sales and marketing. Shared targets, coordinated motion, aligned metrics.",
      },
      {
        title: "Buying Committee Orchestration",
        description: "Modern B2B sales require alignment of 6-8+ decision-makers. ABM addresses the committee, not individuals.",
      },
      {
        title: "Account-Centric Metrics",
        description: "Success is measured in account engagement, pipeline velocity, and revenue. Not leads or email opens.",
      },
    ],
  },
  growthSection: {
    headline: "ABM Drives Deal Velocity",
    narrative: "ABM fundamentally changes the sales and marketing relationship. Instead of marketing throwing leads at sales, both teams align around a shared set of target accounts and orchestrate a coordinated motion. Sales knows which accounts marketing is activating. Marketing knows which accounts are in active deals. This alignment accelerates velocity and improves close rates.",
    metrics: [
      { label: "Average Deal Cycle", value: "-35%", description: "Shorter time to close" },
      { label: "Sales Productivity", value: "+48%", description: "Revenue per rep" },
      { label: "Win Rate", value: "+28%", description: "Improvement vs. outbound" },
    ],
  },
  ctaSection: {
    title: "Ready to Implement Account-Based Marketing?",
    subtitle: "Let's build a precision GTM motion around your highest-value accounts.",
    button: { label: "Schedule ABM Assessment", href: "/contact" },
  },
  footer: {
    description: "Strategic account-based marketing for B2B technology companies. Accelerating deals through precision orchestration.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Account-Based Marketing", href: "/expertise/account-based-marketing" },
          { label: "Sales Enablement", href: "/expertise/sales-enablement" },
          { label: "Demand Generation", href: "/expertise/demand-generation" },
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
