'use client';
import React from 'react';

/**
 * TYPES & INTERFACES
 */
interface NavItem {
  label: string;
  href: string;
}

interface StatItem {
  label: string;
  value: string;
}

interface Objective {
  title: string;
  description: string;
  icon: string;
}

interface SolutionPhase {
  number: string;
  title: string;
  description: string;
}

interface SolutionDetail {
  phase: string;
  title: string;
  description: string;
}

interface ImpactMetric {
  value: string;
  label: string;
}

interface RelatedStory {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface CaseStudyContent {
  metadata: {
    name: string;
    logoText: string;
  };
  navigation: {
    links: NavItem[];
    cta: string;
    userProfileImage: string;
  };
  hero: {
    breadcrumb: string[];
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    cta: string;
    stats: StatItem[];
  };
  challenge: {
    label: string;
    paragraphs: string[];
  };
  objectives: {
    label: string;
    items: Objective[];
  };
  solution: {
    title: string;
    subtitle: string;
    phases: SolutionPhase[];
    dashboardImage: string;
    details: SolutionDetail[];
  };
  impact: {
    label: string;
    metrics: ImpactMetric[];
    testimonial: {
      quote: string;
      author: string;
      role: string;
    };
  };
  relatedStories: {
    title: string;
    subtitle: string;
    stories: RelatedStory[];
  };
  ctaSection: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    description: string;
    services: NavItem[];
    contact: {
      email: string;
      phone: string;
      location: string;
    };
    legal: NavItem[];
  };
}

/**
 * DATA OBJECT
 */
const DEFAULT_CONTENT: CaseStudyContent = {
  metadata: {
    name: "Nexus GTM",
    logoText: "Nexus GTM",
  },
  navigation: {
    links: [
      { label: "Methodology", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Insights", href: "#" },
    ],
    cta: "Get in Touch",
    userProfileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  hero: {
    breadcrumb: ["Case Studies", "Red Hat"],
    titlePrefix: "Red Hat: Scaling",
    titleAccent: "Global GTM",
    titleSuffix: "Operations",
    description: "Revolutionizing enterprise go-to-market strategies to drive sustainable global growth and operational excellence across 40+ regional markets.",
    cta: "View Project Artifacts",
    stats: [
      { label: "Industry", value: "Enterprise Software" },
      { label: "Service", value: "GTM Strategy" },
      { label: "Timeline", value: "6 Months" },
      { label: "Region", value: "Global (EMEA, APAC, NA)" },
    ],
  },
  challenge: {
    label: "The Challenge",
    paragraphs: [
      "Red Hat faced significant friction in their global sales motion. Disconnected regional teams led to inconsistent messaging, while a lack of unified data infrastructure made it impossible to measure ROI across multi-channel campaigns.",
      "The core struggle was balancing local market nuances with a centralized enterprise standard, leading to a 25% increase in customer acquisition costs over two fiscal quarters.",
    ],
  },
  objectives: {
    label: "Key Objectives",
    items: [
      {
        title: "Unified Data Architecture",
        description: "Implement a single source of truth for global pipeline tracking.",
        icon: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
      },
      {
        title: "Acceleration of Sales Velocity",
        description: "Reduce the average enterprise deal cycle by 15% through automation.",
        icon: "M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zM10.59 15.41a2 2 0 1 0 2.83-2.83 2 2 0 0 0-2.83 2.83zm7.92-9.92L13.41 10.59a2 2 0 0 0-2.82 2.82l5.1 5.1 1.41-1.41-5.1-5.1a2 2 0 0 0 2.82-2.82l5.1-5.1-1.41-1.41z",
      },
      {
        title: "Regional Standardization",
        description: "Develop a scalable GTM playbook adaptable to localized markets.",
        icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
      },
    ],
  },
  solution: {
    title: "Engineering the Solution",
    subtitle: "A rigorous three-phase deployment focused on architecture, enablement, and optimization.",
    phases: [
      {
        number: "01",
        title: "Audit & Discovery",
        description: "Deep-dive into existing tech stacks and regional sales behaviors to identify fragmentation points.",
      },
      {
        number: "02",
        title: "Framework Design",
        description: "Building the \"Global Hub\" GTM framework with customized modules for APAC and EMEA specifics.",
      },
      {
        number: "03",
        title: "Enablement Loop",
        description: "Roll-out of training sessions and real-time dashboard tracking to ensure high adoption rates.",
      },
    ],
    dashboardImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    details: [
      {
        phase: "Phase 1: Diagnostic Data Integration",
        title: "Diagnostic Data Integration",
        description: "We integrated 14 disparate Salesforce instances into a single master analytics layer, providing the executive team with real-time visibility for the first time in the company's history.",
      },
      {
        phase: "Phase 2: The Content Matrix",
        title: "The Content Matrix",
        description: "Developed a dynamic asset library that allowed regional marketers to swap modules based on local compliance and vertical relevance while maintaining core brand messaging.",
      },
    ],
  },
  impact: {
    label: "The Impact",
    metrics: [
      { value: "212%", label: "Pipeline Growth (YoY)" },
      { value: "45%", label: "Reduction in CAC" },
      { value: "18.5d", label: "Avg. Deal Cycle Saved" },
    ],
    testimonial: {
      quote: "Nexus GTM didn't just give us a strategy; they re-wired how we think about our global operations. The results were immediate and the foundation is now unshakable.",
      author: "Jameson Sterling",
      role: "VP Global Sales Operations, Red Hat",
    },
  },
  relatedStories: {
    title: "Related Success Stories",
    subtitle: "Explore how we've helped other enterprise leaders.",
    stories: [
      {
        category: "Cybersecurity",
        title: "Palo Alto Networks: Scaling Channel Ecosystems",
        description: "Optimizing partner-led growth through automated deal registration systems.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
        href: "#",
      },
      {
        category: "SaaS / Fintech",
        title: "Stripe: Enterprise Market Expansion",
        description: "Bridging the gap between mid-market success and Fortune 500 requirements.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
        href: "#",
      },
    ],
  },
  ctaSection: {
    title: "Ready to see similar results?",
    description: "Reach out if you want to compare notes on a similar GTM problem—no pitch deck required.",
    primaryCta: "Get in Touch",
    secondaryCta: "Download GTM Kit",
  },
  footer: {
    description: "Strategic growth consultants specialized in scaling enterprise SaaS and technology giants through data-driven GTM engineering.",
    services: [
      { label: "Get in Touch", href: "/contact" },
      { label: "Sales Enablement", href: "#" },
      { label: "Revenue Operations", href: "#" },
      { label: "Market Expansion", href: "#" },
    ],
    contact: {
      email: "hello@nexusgtm.com",
      phone: "+1 (555) 0123-4567",
      location: "San Francisco, CA",
    },
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
};

/**
 * TEMPLATE COMPONENT
 */
export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const content = (props.content as CaseStudyContent) || DEFAULT_CONTENT;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .aurora-text {
          background-image: linear-gradient(
            to right,
            #3b82f6,
            #10b981,
            #8b5cf6,
            #06b6d4,
            #3b82f6
          );
          background-size: 300% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: aurora 8s linear infinite;
        }
      `}} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">{content.metadata.logoText}</span>
          </div>
          <div className="hidden md:flex md:items-center md:gap-8">
            {content.navigation.links.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                {link.label}
              </a>
            ))}
            <a href="/contact" className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-800 transition-all">
              {content.navigation.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <nav className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>{content.hero.breadcrumb[0]}</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-slate-900">{content.hero.breadcrumb[1]}</span>
            </nav>
            <div className="max-w-4xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                {content.hero.titlePrefix}{" "}
                <span className="aurora-text">{content.hero.titleAccent}</span>{" "}
                {content.hero.titleSuffix}
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-slate-600 sm:text-xl max-w-2xl">
                {content.hero.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg hover:bg-slate-800 transition-all">
                  {content.hero.cta}
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
            {content.hero.stats.map((stat, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-emerald-50/50 blur-3xl"></div>
      </header>

      {/* Challenge Section */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-8 bg-blue-600"></div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600">{content.challenge.label}</h2>
              </div>
              <div className="space-y-6">
                {content.challenge.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-slate-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">{content.objectives.label}</h3>
              <div className="space-y-8">
                {content.objectives.items.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{content.solution.title}</h2>
            <p className="mt-4 text-lg text-slate-500">{content.solution.subtitle}</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 mb-20">
            {content.solution.phases.map((phase, i) => (
              <div key={i} className="group relative rounded-2xl border border-slate-100 bg-slate-50 p-8 transition-all hover:bg-white hover:shadow-xl">
                <div className="mb-6 text-4xl font-black text-slate-200 group-hover:text-blue-100 transition-colors">{phase.number}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{phase.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{phase.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img src={content.solution.dashboardImage} alt="Dashboard" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-6">
              {content.solution.details.map((detail, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{detail.phase}</h4>
                  <p className="text-slate-600 leading-relaxed">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-slate-900 py-24 sm:py-32 text-white overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">{content.impact.label}</h2>
            <div className="mx-auto h-1 w-12 bg-blue-500"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 mb-24">
            {content.impact.metrics.map((metric, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm">
                <p className="text-5xl font-black text-white mb-2">{metric.value}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto max-w-4xl rounded-3xl bg-white/5 p-8 sm:p-12 border border-white/10 backdrop-blur-md">
            <div className="relative">
              <svg className="absolute -top-4 -left-4 h-12 w-12 text-white/10" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="relative z-10 text-xl font-light leading-relaxed text-slate-200 sm:text-2xl italic">
                {content.impact.testimonial.quote}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-800 border border-white/10"></div>
              <div>
                <p className="font-bold text-white">{content.impact.testimonial.author}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{content.impact.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-600/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-full w-1/3 bg-gradient-to-r from-emerald-600/10 to-transparent"></div>
      </section>

      {/* Related Stories */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{content.relatedStories.title}</h2>
              <p className="mt-2 text-slate-500">{content.relatedStories.subtitle}</p>
            </div>
            <a href="/case-studies" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 group">
              View All Case Studies
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {content.relatedStories.stories.map((story, i) => (
              <div key={i} className="group overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 transition-all hover:shadow-2xl">
                <div className="aspect-video overflow-hidden">
                  <img src={story.image} alt={story.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">{story.category}</span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{story.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">{story.description}</p>
                  <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900">
                    Read Case Study
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-24 sm:py-32 border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {content.ctaSection.title}
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            {content.ctaSection.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto rounded-2xl bg-slate-900 px-10 py-5 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition-all">
              {content.ctaSection.primaryCta}
            </button>
            <button className="w-full sm:w-auto rounded-2xl border border-slate-200 bg-white px-10 py-5 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all">
              {content.ctaSection.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">{content.metadata.logoText}</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                {content.footer.description}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Services</h4>
              <ul className="space-y-4">
                {content.footer.services.map((s, i) => (
                  <li key={i}><a href={s.href} className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">{s.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Contact</h4>
              <ul className="space-y-4 text-sm font-semibold text-slate-600">
                <li><a href={`mailto:${content.footer.contact.email}`} className="hover:text-slate-900">{content.footer.contact.email}</a></li>
                <li>{content.footer.contact.phone}</li>
                <li>{content.footer.contact.location}</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              © 2024 {content.metadata.logoText} Consulting. All rights reserved.
            </p>
            <div className="flex gap-8">
              {content.footer.legal.map((l, i) => (
                <a key={i} href={l.href} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
