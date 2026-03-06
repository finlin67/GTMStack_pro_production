export const CONTENT_ENGAGEMENT_CONTENT = {
  metadata: {
    title: "Content & Engagement - RevenueArchitect",
    siteName: "REVENUEARCHITECT",
    logoIcon: "architecture",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Methodology", href: "/methodology" },
    { label: "Expertise", href: "/expertise", active: true },
    { label: "Projects", href: "/projects" },
    { label: "Industries", href: "/industries" },
    { label: "About Me", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
  ],
  hero: {
    badge: "Expertise Category",
    headline: {
      main: "Content &",
      highlight: "Engagement",
    },
    description: "Storytelling engines that build trust, demand, and lifetime value. We re-engineer how your brand speaks to the market.",
    primaryCTA: { label: "Explore Storytelling", href: "/storytelling" },
    secondaryCTA: { label: "Request Audit", href: "/audit" },
    image: {
      src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
      alt: "Abstract digital particle flow representing data streams",
    },
    floatingBadges: [
      { icon: "insights", label: "High Velocity" },
      { icon: "hub", label: "Connected" },
    ],
  },
  stats: [
    { value: "343%", label: "Engagement Lift", subtext: "Year-over-year growth" },
    { value: "4.2x", label: "Content ROI", subtext: "Return on ad spend" },
    { value: "180%", label: "Audience Growth", subtext: "Organic reach expansion" },
  ],
  services: {
    title: "Core Services",
    items: [
      {
        icon: "campaign",
        title: "Content Marketing",
        description: "Strategic narratives that drive organic growth. We build the architecture for your brand\'s voice in a crowded market.",
      },
      {
        icon: "mail",
        title: "Email Marketing",
        description: "Automated flows for lifecycle engagement. Turn subscribers into loyal advocates with precision timing.",
      },
      {
        icon: "all_inclusive",
        title: "Omnichannel Marketing",
        description: "Unified messaging across all touchpoints. Seamless experiences whether they find you on mobile, web, or social.",
      },
      {
        icon: "thumb_up",
        title: "Social Media Marketing",
        description: "Community building and brand awareness. We turn passive scrollers into active community members.",
      },
      {
        icon: "play_circle",
        title: "Video Marketing",
        description: "High-impact visual storytelling. Captivate your audience with production-grade video assets.",
      },
    ],
  },
  quote: {
    text: "Content isn\'t filler — it\'s engineered connection.",
    subtext: "In a world of noise, signal is the only currency. We apply rigorous data science to the art of storytelling to ensure every piece of content performs a specific revenue function.",
  },
  explore: {
    title: "Explore Further",
    viewAllHref: "/all",
    cards: [
      {
        category: "BLOG",
        title: "The Future of Content ROI",
        description: "How AI is reshaping the way we measure engagement and attribution in B2B markets.",
        image: "https://images.unsplash.com/photo-1499750310159-5b600aaf0378?q=80&w=2069&auto=format&fit=crop",
        ctaLabel: "Read Article",
        href: "/blog/content-roi",
      },
      {
        category: "PROJECTS",
        title: "SaaS Unicorn Growth",
        description: "Case study: Scaling content production by 400% while maintaining brand integrity.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "View Case Study",
        href: "/projects/saas-growth",
      },
      {
        category: "GALLERY",
        title: "Visual Systems Design",
        description: "A collection of high-fidelity visual assets created for enterprise clients.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Browse Gallery",
        href: "/gallery/visual-systems",
      },
    ],
  },
  ctaSection: {
    title: "Ready to Build Your Narrative Engine?",
    subtitle: "Stop publishing noise. Start engineering growth.",
    buttonLabel: "Schedule Audit",
  },
  footer: {
    description: "Combining data science with creative strategy to build revenue engines for the modern enterprise.",
    services: ["Content Strategy", "SEO & Performance", "Lead Gen Operations", "Brand Identity"],
    company: ["About Us", "Careers", "Contact", "Privacy Policy"],
    copyright: "© 2023 RevenueArchitect Inc. All rights reserved.",
  },
};
