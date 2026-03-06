export const EXPERTISE_CONTENT = {
  brand: {
    tagline: "Mastering Go-to-Market. Engineered for Growth.",
    description: "GTMStack.pro empowers B2B organizations to achieve predictable, scalable revenue through expertly crafted and executed Go-to-Market strategies."
  },
  hero: {
    headline: "Unlocking Predictable Growth: The GTMStack.pro Expertise Advantage",
    subheadline: "Navigate market complexities and accelerate revenue with our unparalleled Go-to-Market strategic mastery.",
    description: "In today's dynamic landscape, a robust Go-to-Market strategy isn't just an advantage—it's a necessity. GTMStack.pro brings deep industry expertise, proprietary frameworks, and a proven track record to transform your GTM approach from reactive to revolutionary.",
    primaryCTA: { text: "Explore Our Strategic Frameworks", link: "/frameworks" },
    secondaryCTA: { text: "Schedule an Expert Consultation", link: "/contact" },
    image: { src: "/images/expertise-hero.jpg", alt: "Strategic business leaders collaborating on a GTM strategy" }
  },
  metricsSection: {
    headline: "Quantifiable Impact: Our Expertise Delivers Results",
    stats: [
      { label: "Average Revenue Growth", value: "+35%" },
      { label: "GTM Strategy Optimization", value: "92% Success Rate" },
      { label: "Client Retention Rate", value: "98%" }
    ]
  },
  capabilitiesSection: {
    headline: "Our Core Expertise: Pillars of Your GTM Success",
    items: [
      { title: "Market & Customer Intelligence", description: "Deep-dive analysis to uncover market opportunities, customer segments, and competitive landscapes, forming the bedrock of your GTM strategy." },
      { title: "GTM Strategy Development", description: "Crafting comprehensive strategies encompassing product-market fit, pricing, channel selection, and messaging to maximize market penetration." },
      { title: "Sales & Marketing Alignment", description: "Orchestrating seamless collaboration between sales and marketing teams, optimizing lead-to-revenue processes and enhancing conversion rates." },
      { title: "Performance Measurement & Optimization", description: "Implementing robust analytics and feedback loops to continuously monitor GTM effectiveness, identify bottlenecks, and drive iterative improvements." },
      { title: "Organizational Enablement", description: "Empowering your teams with the tools, training, and processes required to execute GTM strategies flawlessly and sustain long-term growth." }
    ]
  },
  philosophySection: {
    headline: "Our Guiding Principles: The Foundation of Strategic Excellence",
    principles: [
      { title: "Data-Driven Decisions", description: "Every recommendation is rooted in rigorous data analysis, ensuring strategies are informed, not assumed." },
      { title: "Holistic Integration", description: "We view GTM as an interconnected ecosystem, ensuring all components work in harmony for maximum impact." },
      { title: "Sustainable Growth", description: "Our strategies are designed not just for immediate gains, but for long-term, repeatable, and scalable revenue generation." },
      { title: "Client-Centric Partnership", description: "We embed ourselves as an extension of your team, fostering collaborative relationships built on trust and shared objectives." }
    ]
  },
  growthSection: {
    headline: "Transforming Potential into Performance",
    narrative: "At GTMStack.pro, our expertise translates directly into tangible growth for our clients. We partner with organizations to dissect complex market challenges, architect innovative GTM solutions, and meticulously oversee their implementation. The result is a clear pathway to accelerated revenue, enhanced market share, and a resilient competitive advantage. Our strategic interventions consistently empower businesses to not only meet but exceed their growth targets, establishing new benchmarks for success.",
    metrics: [
      { label: "Market Share Increase", value: "+15%" },
      { label: "Sales Cycle Reduction", value: "-20%" },
      { label: "Customer Lifetime Value", value: "+25%" }
    ]
  },
  ctaSection: {
    title: "Ready to Elevate Your Go-to-Market Strategy?",
    subtitle: "Connect with GTMStack.pro and unlock the full potential of your business.",
    button: { text: "Start Your GTM Transformation", link: "/contact" }
  },
  footer: {
    description: "GTMStack.pro is dedicated to empowering businesses with world-class Go-to-Market strategies and execution, driving sustainable growth and market leadership.",
    sections: [
      { title: "Solutions", links: ["GTM Strategy", "Market Intelligence", "Sales Enablement", "Performance Optimization"] },
      { title: "Company", links: ["About Us", "Our Expertise", "Case Studies", "Blog", "Careers"] },
      { title: "Resources", links: ["Frameworks", "Whitepapers", "Webinars", "FAQs"] },
      { title: "Legal", links: ["Privacy Policy", "Terms of Service"] }
    ],
    copyright: "© 2026 GTMStack.pro. All rights reserved."
  }
}

// Backward-compatible alias used by existing registry imports.
export const STRATEGY_INSIGHTS_CONTENT = EXPERTISE_CONTENT