export const EXPERTISE_CONTENT = {
  brand: {
    tagline: "Unlocking GTM Excellence Through Unrivaled Expertise.",
    description: "GTMStack.pro is the strategic partner for organizations seeking to optimize their Go-To-Market strategies. Our deep domain knowledge and proven methodologies empower businesses to achieve sustainable growth and market leadership."
  },
  hero: {
    headline: "Master Your Market: The Power of GTMStack.pro's Expertise.",
    subheadline: "Navigate complex market landscapes with confidence, guided by industry-leading strategists and practitioners.",
    description: "Our team comprises seasoned experts across every facet of Go-To-Market, from intricate market analysis and strategic planning to precision execution in demand generation, sales enablement, and customer success. We bring a wealth of experience and a track record of transforming challenges into opportunities for our clients.",
    primaryCTA: { text: "Explore Our Expertise", link: "/expertise" },
    secondaryCTA: { text: "Schedule a Consultation", link: "/contact" },
    image: { src: "/images/expertise-hero.webp", alt: "Team of experts collaborating on a strategic plan" }
  },
  metricsSection: {
    headline: "Quantifiable Impact of Deep GTM Knowledge.",
    stats: [
      { label: "Years of Collective Experience", value: "150+" },
      { label: "Client Success Rate", value: "95%" },
      { label: "Strategic Engagements Delivered", value: "300+" }
    ]
  },
  capabilitiesSection: {
    headline: "Our Expertise Spans the Entire GTM Spectrum.",
    items: [
      { title: "Market & Competitive Intelligence", description: "Deep-dive analysis to uncover market opportunities, competitive threats, and customer insights that inform robust GTM strategies." },
      { title: "Strategic GTM Planning", description: "Crafting comprehensive Go-To-Market strategies that align product, sales, and marketing for optimal market penetration and revenue growth." },
      { title: "Demand Generation & ABM", description: "Designing and executing high-performance demand generation and Account-Based Marketing programs that drive qualified leads and pipeline acceleration." },
      { title: "Sales Enablement & Operations", description: "Optimizing sales processes, tools, and training to maximize sales team effectiveness and efficiency, from lead to close." },
      { title: "Product-Led Growth (PLG) Strategy", description: "Developing and implementing PLG models that leverage product value to drive user acquisition, retention, and expansion." },
      { title: "GTM Technology Stack Optimization", description: "Advising on and implementing the right technology solutions to streamline GTM operations and enhance data-driven decision-making." }
    ]
  },
  philosophySection: {
    headline: "The Principles Guiding Our Expert Approach.",
    principles: [
      { title: "Data-Driven Insight", description: "Every recommendation is grounded in rigorous data analysis and empirical evidence, ensuring strategies are both informed and effective." },
      { title: "Client-Centric Partnership", description: "We embed ourselves as an extension of your team, tailoring our expertise to your unique challenges and objectives for shared success." },
      { title: "Continuous Innovation", description: "The GTM landscape evolves rapidly. Our experts are committed to continuous learning and adopting cutting-edge methodologies to keep you ahead." },
      { title: "Actionable Strategy", description: "Our expertise isn't just theoretical; we deliver practical, implementable strategies designed for tangible results and measurable impact." }
    ]
  },
  growthSection: {
    headline: "Expertise That Translates Directly to Growth.",
    narrative: "At GTMStack.pro, our expertise is not merely academic; it's a catalyst for tangible business growth. We leverage our deep understanding of market dynamics, customer behavior, and operational efficiencies to identify bottlenecks, unlock new revenue streams, and accelerate your market trajectory. Our strategic interventions are designed to create sustainable competitive advantages, ensuring your GTM efforts consistently outperform.",
    metrics: [
      { label: "Average Revenue Growth for Clients", value: "25%+" }
    ]
  },
  ctaSection: {
    title: "Ready to Elevate Your GTM Strategy?",
    subtitle: "Partner with GTMStack.pro and harness unparalleled expertise to achieve your most ambitious business objectives.",
    button: { text: "Connect with an Expert", link: "/contact" }
  },
  footer: {
    description: "GTMStack.pro empowers businesses with strategic Go-To-Market expertise, driving sustainable growth and market leadership through data-driven insights and actionable strategies.",
    sections: [
      { title: "Services", links: ["/services/strategy", "/services/demand-gen", "/services/sales-enablement"] },
      { title: "Company", links: ["/about", "/careers", "/contact"] },
      { title: "Resources", links: ["/blog", "/case-studies", "/webinars"] },
      { title: "Legal", links: ["/privacy-policy", "/terms-of-service"] }
    ],
    copyright: "© 2026 GTMStack.pro. All rights reserved."
  }
}

// Backward-compatible alias used by existing registry and pillar imports.
export const DEMAND_GROWTH_CONTENT = EXPERTISE_CONTENT