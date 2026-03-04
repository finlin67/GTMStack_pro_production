/**
 * Content object for Sales Enablement expertise page.
 * Used by Uploaded_Expertise_DemandGrowth_v1 template.
 */

export const SALES_ENABLEMENT_CONTENT = {
  brand: {
    tagline: "Sales Acceleration Through Enablement",
    description: "Sales enablement is the bridge between marketing and revenue. We build systems that empower sales to sell faster and close more deals.",
  },
  hero: {
    headline: "Sales Enablement",
    subheadline: "Empowering sales to accelerate deals and close more revenue",
    description: "Sales enablement is the critical bridge between demand generation and revenue. It ensures your sales team has the messaging, content, skills, and tools to accelerate deals. We build comprehensive sales enablement programs that improve deal velocity and win rates.",
    primaryCTA: { label: "Explore Sales Enablement", href: "#capabilities" },
    secondaryCTA: { label: "Request Enablement Audit", href: "/contact" },
    image: {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      alt: "Sales enablement and acceleration",
    },
  },
  metricsSection: {
    headline: "Sales Enablement Impact",
    stats: [
      { value: "+35%", label: "Deal Velocity", description: "Faster time to close with enablement" },
      { value: "+28%", label: "Win Rate", description: "Improvement from better messaging and content" },
      { value: "+18%", label: "Sales Productivity", description: "Revenue per rep increase" },
    ],
  },
  capabilitiesSection: {
    headline: "Sales Enablement Services",
    items: [
      {
        icon: "description",
        title: "Sales Collateral & Assets",
        description: "One-sheets, case studies, battle cards, ROI calculators, proposals. Content designed for sales to use in deals.",
      },
      {
        icon: "school",
        title: "Sales Messaging & Training",
        description: "Value proposition, competitive positioning, discovery messaging. Training on how to use messaging effectively.",
      },
      {
        icon: "videocam",
        title: "Sales Presentations & Decks",
        description: "Pitch decks, presentation templates, demo scripts. Visual storytelling that accelerates buyer conversations.",
      },
      {
        icon: "assessment",
        title: "Sales Tools & CRM Optimization",
        description: "Sales stack evaluation, CRM configuration, reports and dashboards. Tooling that improves productivity.",
      },
      {
        icon: "trending_up",
        title: "Sales Coaching & Execution",
        description: "Sales training, role playing, call coaching. Ongoing support to ensure adoption of new messaging and tools.",
      },
    ],
  },
  philosophySection: {
    headline: "Sales Enablement Philosophy",
    principles: [
      {
        title: "Front-Line Centric",
        description: "Enablement is built around sales—their challenges, workflows, and needs. What makes reps' jobs easier and deals faster?",
      },
      {
        title: "Messaging First",
        description: "Without clear, compelling messaging, all the collateral in the world won't help. Message comes first.",
      },
      {
        title: "Adoption Through Use",
        description: "Great enablement gets used because it solves real problems sales reps have. Alignment with sales workflows is critical.",
      },
      {
        title: "Continuous Optimization",
        description: "What works in January might not work in March. Enablement must evolve with market conditions and competitive threats.",
      },
    ],
  },
  growthSection: {
    headline: "Sales Enablement Multiplies Demand",
    narrative: "Imagine doubling your marketing spend but only improving pipeline by 20%. That's what happens when sales can't effectively move qualified leads into deals. Sales enablement fixes this. Better messaging, better collateral, better training, better tools—all of these help sales move prospects faster and close more deals. Enablement multiplies the value of demand generation.",
    metrics: [
      { label: "Opportunity Value", value: "+$180K", description: "Average higher contract values" },
      { label: "Sales Cycle", value: "-25%", description: "Shorter time to close" },
      { label: "Forecast Accuracy", value: "+35%", description: "More predictable pipeline" },
    ],
  },
  ctaSection: {
    title: "Ready to Empower Your Sales Team?",
    subtitle: "Let's build a sales enablement program that accelerates deals and multiplies revenue.",
    button: { label: "Schedule Enablement Audit", href: "/contact" },
  },
  footer: {
    description: "Strategic sales enablement that empowers reps to sell faster and close more deals.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Sales Enablement", href: "/expertise/sales-enablement" },
          { label: "Messaging & Positioning", href: "/expertise/product-marketing" },
          { label: "Strategy & Wins", href: "/expertise/customer-marketing" },
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
