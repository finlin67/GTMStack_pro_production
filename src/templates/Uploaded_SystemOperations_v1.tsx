'use client';

import React from 'react';

export interface NavLink {
  label: string;
  url: string;
  isActive?: boolean;
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ExploreCard {
  tag: string;
  image: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface RevenueArchitectContentProps {
  header: {
    logoText: string;
    navLinks: NavLink[];
    ctaText: string;
    ctaUrl: string;
  };
  hero: {
    badge: string;
    headlineStart: string;
    headlineHighlight: string;
    description: string;
    primaryCtaText: string;
    primaryCtaUrl: string;
    secondaryCtaText: string;
    secondaryCtaUrl: string;
    image: string;
    floatingBadge1: {
      icon: string;
      text: string;
    };
    floatingBadge2: {
      icon: string;
      text: string;
    };
  };
  stats: Stat[];
  services: {
    heading: string;
    items: Service[];
  };
  quote: {
    textStart: string;
    textHighlight: string;
    description: string;
  };
  explore: {
    heading: string;
    viewAllText: string;
    viewAllUrl: string;
    cards: ExploreCard[];
  };
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
  footer: {
    logoText: string;
    description: string;
    linkGroups: FooterLinkGroup[];
    copyright: string;
    socialLinks: {
      icon: string;
      url: string;
    }[];
  };
}

const DEFAULT_CONTENT: RevenueArchitectContentProps = {
  header: {
    logoText: "REVENUEARCHITECT",
    navLinks: [
      { label: "Home", url: "#" },
      { label: "Methodology", url: "#" },
      { label: "Expertise", url: "#", isActive: true },
      { label: "Projects", url: "#" },
      { label: "Industries", url: "#" },
      { label: "About Me", url: "#" },
      { label: "Blog", url: "#" },
      { label: "Gallery", url: "#" },
    ],
    ctaText: "Get Audited",
    ctaUrl: "#",
  },
  hero: {
    badge: "MARTECH & REV OPS",
    headlineStart: "MarTech Excellence for",
    headlineHighlight: "Scalable Revenue",
    description:
      "Optimizing technology stacks and leveraging AI to drive +87% YoY pipeline growth. We build the operations that enable scale and drive high-velocity revenue systems.",
    primaryCtaText: "Optimize Your Stack",
    primaryCtaUrl: "#",
    secondaryCtaText: "Implement AI Solutions",
    secondaryCtaUrl: "#",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    floatingBadge1: {
      icon: "Settings2",
      text: "Stack Optimized",
    },
    floatingBadge2: {
      icon: "BrainCircuit",
      text: "AI Integrated",
    },
  },
  stats: [
    {
      value: "94%",
      label: "MarTech Stack Utilization",
      description: "Eliminating shelfware & silos",
    },
    {
      value: "87%",
      label: "AI-Driven Pipeline Growth",
      description: "Year-over-year expansion",
    },
    {
      value: "310%",
      label: "System Integration ROI",
      description: "Efficiency gain from connectivity",
    },
  ],
  services: {
    heading: "Core Services",
    items: [
      {
        icon: "Network",
        title: "MarTech Ecosystem Architecture",
        description:
          "Designing integrated technology landscapes that eliminate data silos and create a unified view of the customer journey for exponential scale.",
      },
      {
        icon: "Zap",
        title: "AI-Powered Sales Enablement",
        description:
          "Leveraging generative AI and predictive scoring to provide sales teams with actionable insights that increase win rates and shorten deal cycles.",
      },
      {
        icon: "Factory",
        title: "Advanced Marketing Automation",
        description:
          "Building sophisticated, multi-channel workflows that cut manual reporting from days to hours and drive autonomous lead nurturing.",
      },
      {
        icon: "LineChart",
        title: "Revenue Operations Optimization",
        description:
          "Aligning marketing, sales, and success technologies into a single source of truth for seamless reporting and revenue forecasting.",
      },
      {
        icon: "Workflow",
        title: "Data Integration & Hygiene",
        description:
          "Systematizing data flows between MarTech and CRM to ensure high-fidelity reporting and personalized customer experiences at scale.",
      },
    ],
  },
  quote: {
    textStart: "Growth isn't magic — it's built on a",
    textHighlight: "robust MarTech foundation.",
    description:
      "Leveraging technology isn't just about tools; it's about the systems that connect them. We bridge the gap between complex software and measurable revenue results.",
  },
  explore: {
    heading: "Explore Further",
    viewAllText: "View All",
    viewAllUrl: "#",
    cards: [
      {
        tag: "BLOG",
        image:
          "https://images.unsplash.com/photo-1499750310159-5b600aaf0378?q=80&w=2069&auto=format&fit=crop",
        title: "The Future of AI in MarTech",
        description:
          "How autonomous operations and machine learning are reshaping the revenue engine of modern enterprises.",
        linkText: "Read Article",
        linkUrl: "#",
      },
      {
        tag: "PROJECTS",
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        title: "Stack Optimization Case Study",
        description:
          "Case study: Cutting reporting time from 4 days to 2 hours with integrated automation for a SaaS leader.",
        linkText: "View Case Study",
        linkUrl: "#",
      },
      {
        tag: "GALLERY",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        title: "Operational Frameworks",
        description:
          "A collection of technical blueprints for scaling MarTech stacks and AI-driven growth workflows.",
        linkText: "Browse Gallery",
        linkUrl: "#",
      },
    ],
  },
  cta: {
    heading: "Unlock MarTech-Driven Scale?",
    description:
      "Stop fighting your tools and start leveraging technology for exponential growth. Build a future-ready revenue stack today.",
    buttonText: "Optimize My Stack",
    buttonUrl: "#",
  },
  footer: {
    logoText: "REVENUEARCHITECT",
    description:
      "Combining tech optimization with AI-driven strategy to build scalable revenue engines for the modern enterprise.",
    linkGroups: [
      {
        title: "Services",
        links: [
          { label: "MarTech Audit", url: "#" },
          { label: "AI Implementation", url: "#" },
          { label: "RevOps Strategy", url: "#" },
          { label: "Stack Integration", url: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", url: "#" },
          { label: "Careers", url: "#" },
          { label: "Contact", url: "#" },
          { label: "Privacy Policy", url: "#" },
        ],
      },
    ],
    copyright: "© 2024 RevenueArchitect Inc. All rights reserved.",
    socialLinks: [
      { icon: "Globe", url: "#" },
      { icon: "Mail", url: "#" },
    ],
  },
};

const Icon = ({ name, className = "" }: { name: string; className?: string }) => {
  const baseProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "Cpu":
      return (
        <svg {...baseProps}>
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M15 2v2" />
          <path d="M15 20v2" />
          <path d="M2 15h2" />
          <path d="M2 9h2" />
          <path d="M20 15h2" />
          <path d="M20 9h2" />
          <path d="M9 2v2" />
          <path d="M9 20v2" />
        </svg>
      );
    case "Menu":
      return (
        <svg {...baseProps}>
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      );
    case "ArrowRight":
      return (
        <svg {...baseProps}>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      );
    case "Settings2":
      return (
        <svg {...baseProps}>
          <path d="M20 7h-9" />
          <path d="M14 17H5" />
          <circle cx="17" cy="7" r="3" />
          <circle cx="8" cy="17" r="3" />
        </svg>
      );
    case "BrainCircuit":
      return (
        <svg {...baseProps}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M9 13a4.5 4.5 0 0 0 3-4" />
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
          <path d="M6 18a4 4 0 0 1-1.967-.516" />
          <path d="M12 13h4" />
          <path d="M12 17h4" />
          <path d="M16 13a2 2 0 0 0 2-2" />
          <path d="M16 17a2 2 0 0 1 2 2" />
          <path d="M20 11v-1" />
          <path d="M20 20v-1" />
        </svg>
      );
    case "Network":
      return (
        <svg {...baseProps}>
          <rect x="16" y="16" width="6" height="6" rx="1" />
          <rect x="2" y="16" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
          <path d="M12 12V8" />
        </svg>
      );
    case "Zap":
      return (
        <svg {...baseProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "Factory":
      return (
        <svg {...baseProps}>
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M17 18h1" />
          <path d="M12 18h1" />
          <path d="M7 18h1" />
        </svg>
      );
    case "LineChart":
      return (
        <svg {...baseProps}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    case "Workflow":
      return (
        <svg {...baseProps}>
          <rect width="8" height="8" x="3" y="3" rx="2" />
          <path d="M7 11v4a2 2 0 0 0 2 2h4" />
          <rect width="8" height="8" x="13" y="13" rx="2" />
        </svg>
      );
    case "Quote":
      return (
        <svg {...baseProps}>
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1.5.5 2 2s-.5 2-2 2c-1.25 0-2 .75-2 1.972V21c0 1.25.75 2 2 2h4c1.25 0 2-.75 2-1.972V15c0-1.25-.75-2-2-2h-2c-1 0-1.5-.5-2-2s.5-2 2-2z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1.5.5 2 2s-.5 2-2 2c-1.25 0-2 .75-2 1.972V21c0 1.25.75 2 2 2h4c1.25 0 2-.75 2-1.972V15c0-1.25-.75-2-2-2h-2c-1 0-1.5-.5-2-2s.5-2 2-2z" />
        </svg>
      );
    case "Globe":
      return (
        <svg {...baseProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
    case "Mail":
      return (
        <svg {...baseProps}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return (
        <svg {...baseProps}>
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <rect width="6" height="6" x="9" y="9" rx="1" />
          <path d="M15 2v2" />
          <path d="M15 20v2" />
          <path d="M2 15h2" />
          <path d="M2 9h2" />
          <path d="M20 15h2" />
          <path d="M20 9h2" />
          <path d="M9 2v2" />
          <path d="M9 20v2" />
        </svg>
      );
  }
};

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const content = (props.content as RevenueArchitectContentProps) || DEFAULT_CONTENT;

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white overflow-x-hidden antialiased transition-colors duration-300 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-900 shadow-sm">
            <Icon name="Cpu" className="text-white w-5 h-5" />
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
            {content.header.logoText}
          </h2>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          {content.header.navLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`text-sm font-medium transition-colors ${
                link.isActive
                  ? "text-slate-900 dark:text-white border-b-2 border-green-500 pb-0.5 font-semibold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={content.header.ctaUrl}
          className="hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-bold shadow-lg shadow-green-500/20 transition-all transform hover:scale-105"
        >
          {content.header.ctaText}
        </a>
        <button className="lg:hidden text-slate-900 dark:text-white p-2">
          <Icon name="Menu" className="w-6 h-6" />
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full py-20 lg:py-32 px-6 lg:px-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#f8fafc_0%,#e2e8f0_50%,#f8fafc_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#020617_0%,#0f172a_50%,#020617_100%)] opacity-40 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl pointer-events-none rounded-full"></div>
        
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/50 w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-cyan-800 dark:text-cyan-400 uppercase tracking-wider">
                {content.hero.badge}
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              {content.hero.headlineStart} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">
                {content.hero.headlineHighlight}
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-light max-w-xl leading-relaxed">
              {content.hero.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={content.hero.primaryCtaUrl}
                className="flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 group"
              >
                <span>{content.hero.primaryCtaText}</span>
                <Icon name="ArrowRight" className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={content.hero.secondaryCtaUrl}
                className="flex items-center justify-center h-12 px-8 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-white font-semibold transition-all"
              >
                {content.hero.secondaryCtaText}
              </a>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm group">
            <img
              src={content.hero.image}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-700 group-hover:opacity-80 dark:group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent"></div>
            
            <div className="absolute top-1/4 left-1/4 p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl animate-[bounce_3s_infinite]">
              <div className="flex items-center gap-3">
                <Icon name={content.hero.floatingBadge1.icon} className="text-green-500 w-5 h-5" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {content.hero.floatingBadge1.text}
                </span>
              </div>
            </div>
            
            <div className="absolute bottom-1/3 right-12 p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl animate-[pulse_4s_infinite]">
              <div className="flex items-center gap-3">
                <Icon name={content.hero.floatingBadge2.icon} className="text-blue-500 w-5 h-5" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {content.hero.floatingBadge2.text}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <div className="w-full bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-300 dark:divide-slate-700/50">
          {content.stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-1 px-4 py-4 md:py-0">
              <p className="text-5xl lg:text-6xl font-bold text-green-600 dark:text-green-500 tracking-tight">
                {stat.value}
              </p>
              <p className="text-slate-800 dark:text-slate-300 font-semibold uppercase tracking-wide text-sm mt-2">
                {stat.label}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {content.services.heading}
            </h2>
            <div className="h-1 w-20 bg-green-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.items.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 shadow-sm dark:shadow-none border border-slate-100 dark:border-none flex items-center justify-center mb-6 text-green-600 dark:text-green-500 group-hover:text-white group-hover:bg-green-500 transition-colors">
                    <Icon name={service.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-24 lg:py-32 px-6 bg-slate-100 dark:bg-slate-900 text-center flex flex-col justify-center items-center">
        <div className="max-w-4xl">
          <Icon name="Quote" className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            {content.quote.textStart} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-500">
              {content.quote.textHighlight}
            </span>
          </h2>
          <p className="mt-8 text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            {content.quote.description}
          </p>
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {content.explore.heading}
              </h2>
              <div className="h-1 w-20 bg-green-500 rounded-full"></div>
            </div>
            <a
              href={content.explore.viewAllUrl}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold flex items-center gap-1"
            >
              {content.explore.viewAllText} <Icon name="ArrowRight" className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.explore.cards.map((card, index) => (
              <div
                key={index}
                className="group flex flex-col gap-4 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="h-48 w-full bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    {card.tag}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {card.description}
                  </p>
                  <a
                    href={card.linkUrl}
                    className="mt-auto text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    {card.linkText} <Icon name="ArrowRight" className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 text-center border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 opacity-50 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {content.cta.heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
            {content.cta.description}
          </p>
          <a
            href={content.cta.buttonUrl}
            className="inline-flex items-center justify-center h-14 px-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg transition-all shadow-lg shadow-blue-500/30 transform hover:scale-105"
          >
            {content.cta.buttonText}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Cpu" className="text-slate-900 dark:text-white w-6 h-6" />
                <span className="text-slate-900 dark:text-white font-bold text-xl">
                  {content.footer.logoText}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm">
                {content.footer.description}
              </p>
            </div>
            {content.footer.linkGroups.map((group, index) => (
              <div key={index}>
                <h4 className="text-slate-900 dark:text-white font-bold mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              {content.footer.copyright}
            </p>
            <div className="flex gap-4">
              {content.footer.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Icon name={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
