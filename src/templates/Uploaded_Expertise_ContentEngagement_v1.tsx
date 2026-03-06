import React from 'react';

/**
 * DEFAULT_CONTENT
 * The primary data structure for the Content & Engagement page.
 * Extracted from the GTMStack.pro / RevenueArchitect prototype.
 */
const DEFAULT_CONTENT = {
  metadata: {
    title: "Content & Engagement - RevenueArchitect",
    siteName: "REVENUEARCHITECT",
    logoIcon: "architecture",
  },
  navigation: [
    { label: "Home", href: "#" },
    { label: "Methodology", href: "#" },
    { label: "Expertise", href: "#", active: true },
    { label: "Projects", href: "#" },
    { label: "Industries", href: "#" },
    { label: "About Me", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Gallery", href: "#" },
  ],
  hero: {
    badge: "Expertise Category",
    headline: {
      main: "Content &",
      highlight: "Engagement",
    },
    description: "Storytelling engines that build trust, demand, and lifetime value. We re-engineer how your brand speaks to the market.",
    primaryCTA: { label: "Explore Storytelling", href: "#" },
    secondaryCTA: { label: "Request Audit", href: "#" },
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
    viewAllHref: "#",
    cards: [
      {
        category: "BLOG",
        title: "The Future of Content ROI",
        description: "How AI is reshaping the way we measure engagement and attribution in B2B markets.",
        image: "https://images.unsplash.com/photo-1499750310159-5b600aaf0378?q=80&w=2069&auto=format&fit=crop",
        ctaLabel: "Read Article",
        href: "#",
      },
      {
        category: "PROJECTS",
        title: "SaaS Unicorn Growth",
        description: "Case study: Scaling content production by 400% while maintaining brand integrity.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "View Case Study",
        href: "#",
      },
      {
        category: "GALLERY",
        title: "Visual Systems Design",
        description: "A collection of high-fidelity visual assets created for enterprise clients.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        ctaLabel: "Browse Gallery",
        href: "#",
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

/**
 * Template Component
 * 
 * A self-contained Next.js/React component for the Content & Engagement page.
 * 
 * Hard Rules Met:
 * - Exactly ONE default export: Template
 * - Props type: { content?: unknown; pageTitle?: string }
 * - No project imports
 * - No next/image or next/link (uses <img> and <a>)
 * - No window/document references during render
 * - Renders without crashing if props.content is undefined
 * - Self-contained data objects
 */
export default function Template(props: { content?: unknown; pageTitle?: string }) {
  // Defensive content resolution
  const content: any = props.content || DEFAULT_CONTENT;

  return (
    <div className="bg-[#0B132B] text-white overflow-x-hidden antialiased min-h-screen selection:bg-cyan-500/30">
      {/* External Assets & Custom Utilities */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .text-gradient-engagement {
          background: linear-gradient(to right, #1e3a8a, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-gradient-gold {
          background: linear-gradient(to right, #F59E0B, #D97706);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-glow {
          background: conic-gradient(from 90deg at 50% 50%, #0B132B 0%, #1c2a4a 50%, #0B132B 100%);
        }
      `}} />

      <div className="font-inter">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#0B132B]/95 backdrop-blur-xl px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 shadow-lg shadow-blue-900/20">
              <span className="material-symbols-outlined text-white text-xl">
                {content.metadata?.logoIcon || 'architecture'}
              </span>
            </div>
            <h2 className="text-white text-xl font-black tracking-tighter uppercase">
              {props.pageTitle || content.metadata?.siteName || 'REVENUEARCHITECT'}
            </h2>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            {content.navigation?.map((item: any, idx: number) => (
              <a
                key={idx}
                href={item.href}
                className={
                  item.active
                    ? "text-white font-bold border-b-2 border-cyan-500 pb-1"
                    : "text-gray-400 hover:text-white text-sm font-medium transition-colors"
                }
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a 
            href="#" 
            className="hidden sm:flex items-center justify-center rounded-xl h-12 px-8 bg-[#06B6D4] hover:bg-cyan-600 text-white text-sm font-black shadow-xl shadow-cyan-500/20 transition-all transform hover:scale-105 active:scale-95"
          >
            GET AUDITED
          </a>
        </header>

        {/* Hero Section */}
        <section className="relative w-full py-24 lg:py-40 px-6 lg:px-24 overflow-hidden bg-[#0B132B]">
          <div className="absolute inset-0 hero-glow opacity-30 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent opacity-40 blur-3xl pointer-events-none"></div>

          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
                <span className="text-[10px] font-black text-cyan-50 uppercase tracking-[0.2em]">
                  {content.hero?.badge || 'Expertise'}
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-white">
                {content.hero?.headline?.main || 'Content &'} <br />
                <span className="text-gradient-engagement">
                  {content.hero?.headline?.highlight || 'Engagement'}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-400 font-light max-w-xl leading-relaxed">
                {content.hero?.description}
              </p>

              <div className="flex flex-wrap gap-6 pt-6">
                <a
                  href={content.hero?.primaryCTA?.href || '#'}
                  className="flex items-center justify-center h-14 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-2xl shadow-blue-500/30 group active:scale-95"
                >
                  <span>{content.hero?.primaryCTA?.label || 'Explore Storytelling'}</span>
                  <span className="material-symbols-outlined ml-3 text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </a>
                <a
                  href={content.hero?.secondaryCTA?.href || '#'}
                  className="flex items-center justify-center h-14 px-10 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold text-lg transition-all active:scale-95"
                >
                  {content.hero?.secondaryCTA?.label || 'Request Audit'}
                </a>
              </div>
            </div>

            <div className="relative h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#162447]/50 backdrop-blur-md group">
              <img
                src={content.hero?.image?.src || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop'}
                alt={content.hero?.image?.alt || 'Hero Visual'}
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen transition-all duration-1000 group-hover:opacity-60 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent"></div>

              {/* Floating Badges */}
              {content.hero?.floatingBadges?.map((badge: any, idx: number) => (
                <div
                  key={idx}
                  className={`absolute p-5 bg-[#162447]/90 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl ${
                    idx === 0 ? "top-1/4 left-1/4 animate-bounce" : "bottom-1/3 right-12 animate-pulse"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[#06B6D4] text-2xl">{badge.icon}</span>
                    <span className="text-base font-bold tracking-tight">{badge.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="w-full bg-[#E8EDF4] border-y border-black/5 py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-8 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 text-center divide-y md:divide-y-0 md:divide-x divide-gray-400/30">
            {content.stats?.map((stat: any, idx: number) => (
              <div key={idx} className="flex flex-col gap-3 px-6">
                <p className="text-6xl lg:text-8xl font-black text-gradient-gold tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-slate-800 font-black uppercase tracking-widest text-sm mt-4">{stat.label}</p>
                <p className="text-slate-600 text-base font-medium">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Services */}
        <section className="py-28 lg:py-40 px-6 bg-[#071024]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 lg:mb-28 text-center lg:text-left">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                {content.services?.title || 'Core Services'}
              </h2>
              <div className="h-1.5 w-24 bg-[#06B6D4] rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] mx-auto lg:mx-0"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {content.services?.items?.map((service: any, idx: number) => (
                <div
                  key={idx}
                  className="group relative p-10 rounded-3xl bg-[#162447] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-[#06B6D4] group-hover:text-white group-hover:bg-[#06B6D4] transition-all duration-300 shadow-inner">
                      <span className="material-symbols-outlined text-4xl">{service.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#06B6D4] transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32 lg:py-48 px-6 bg-[#F1F4F8] text-center flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          <div className="max-w-5xl relative z-10">
            <span className="material-symbols-outlined text-8xl text-gray-300/50 mb-10 select-none">format_quote</span>
            <h2 className="text-5xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              {content.quote?.text?.split(' — ')[0]} <br />
              <span className="text-gradient-engagement">
                {content.quote?.text?.split(' — ')[1]}
              </span>
            </h2>
            <p className="mt-12 text-slate-600 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light italic">
              &ldquo;{content.quote?.subtext}&rdquo;
            </p>
          </div>
        </section>

        {/* Explore Further */}
        <section className="py-28 lg:py-40 px-6 bg-[#0B132B] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {content.explore?.title || 'Explore Further'}
                </h2>
                <div className="h-1 w-16 bg-[#06B6D4] mt-4 mx-auto md:mx-0"></div>
              </div>
              <a
                href={content.explore?.viewAllHref || '#'}
                className="text-[#06B6D4] hover:text-cyan-400 text-lg font-bold flex items-center gap-2 group transition-all"
              >
                View All <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
              {content.explore?.cards?.map((card: any, idx: number) => (
                <div
                  key={idx}
                  className="group flex flex-col gap-0 rounded-3xl overflow-hidden bg-[#162447] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="h-64 w-full bg-gray-800 relative overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 bg-[#06B6D4] text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg tracking-widest">
                      {card.category}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#06B6D4] transition-colors tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-gray-400 text-base mb-8 line-clamp-3 font-light leading-relaxed">
                      {card.description}
                    </p>
                    <a
                      href={card.href}
                      className="mt-auto text-base font-bold text-white flex items-center gap-3 group/link"
                    >
                      <span className="border-b-2 border-white/20 group-hover/link:border-[#06B6D4] transition-colors pb-1">
                        {card.ctaLabel}
                      </span>
                      <span className="material-symbols-outlined text-xl group-hover/link:translate-x-2 transition-transform text-[#06B6D4]">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 lg:py-48 px-6 bg-gradient-to-br from-[#0B132B] to-[#0f172a] text-center border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 opacity-50 pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 tracking-tighter leading-tight">
              {content.ctaSection?.title}
            </h2>
            <p className="text-gray-400 text-xl lg:text-2xl mb-12 font-light tracking-wide italic">
              &ldquo;{content.ctaSection?.subtitle}&rdquo;
            </p>
            <button className="inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-[#06B6D4] hover:bg-cyan-600 text-white font-black text-xl transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] transform hover:scale-110 active:scale-95">
              {content.ctaSection?.buttonLabel}
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0B132B] border-t border-white/10 pt-24 pb-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-24 mb-20">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-white text-3xl">
                    {content.metadata?.logoIcon || 'architecture'}
                  </span>
                  <span className="text-white font-black text-2xl tracking-tight uppercase">
                    {content.metadata?.siteName || 'REVENUEARCHITECT'}
                  </span>
                </div>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed font-light">
                  {content.footer?.description}
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-8">Services</h4>
                <ul className="space-y-4 text-base text-gray-400">
                  {content.footer?.services?.map((s: string) => (
                    <li key={s}><a href="#" className="hover:text-[#06B6D4] transition-colors font-medium">{s}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-8">Company</h4>
                <ul className="space-y-4 text-base text-gray-400">
                  {content.footer?.company?.map((c: string) => (
                    <li key={c}><a href="#" className="hover:text-[#06B6D4] transition-colors font-medium">{c}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-gray-500 text-base font-medium">
                {content.footer?.copyright || '© 2023 RevenueArchitect Inc.'}
              </p>
              <div className="flex gap-8">
                <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-125">
                  <span className="material-symbols-outlined text-2xl">public</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-125">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
