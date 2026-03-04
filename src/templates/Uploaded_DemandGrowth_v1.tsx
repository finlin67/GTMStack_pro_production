'use client'; // <--- THIS MUST BE THE FIRST LINE
import React from 'react';

/**
 * TYPES & INTERFACES
 */
interface Metric {
  value: string;
  label: string;
}

interface ServiceItem {
  title: string;
  description: string;
  iconType: 'performance' | 'pipeline' | 'seo' | 'growth' | 'outbound';
}

interface TeaserItem {
  category: string;
  title: string;
  image: string;
}

interface PageContent {
  nav: {
    brand: string;
    suffix: string;
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    stats: {
      label: string;
      value: string;
      multiplier: string;
      multiplierLabel: string;
    };
  };
  metrics: Metric[];
  services: {
    title: string;
    highlight: string;
    description: string;
    items: ServiceItem[];
  };
  philosophy: {
    quote: string;
    highlight: string;
    attribution: string;
  };
  teasers: {
    title: string;
    description: string;
    items: TeaserItem[];
  };
  ctaSection: {
    title: string;
    button: string;
  };
  footer: {
    links: { label: string; href: string }[];
    copyright: string;
  };
}

/**
 * DEFAULT CONTENT DATA
 */
const DEFAULT_CONTENT: PageContent = {
  nav: {
    brand: 'STRATOS',
    suffix: 'GTM',
    links: [
      { label: 'Expertise', href: '#' },
      { label: 'Methodology', href: '#' },
      { label: 'Case Studies', href: '#' },
      { label: 'Insights', href: '#' },
    ],
    cta: 'Get Audited',
  },
  hero: {
    badge: 'Performance Architecture',
    titleMain: 'Demand &',
    titleHighlight: 'Growth',
    description: 'Predictable pipeline engineering for explosive market capture. We don\'t just find leads; we architect compounding revenue engines.',
    primaryCta: 'Explore Growth',
    secondaryCta: 'Request Audit',
    stats: {
      label: 'Projected Scale',
      value: 'Exponential',
      multiplier: '12.4x',
      multiplierLabel: 'Efficiency Multiplier',
    },
  },
  metrics: [
    { value: '+300%', label: 'Average Inbound Lift' },
    { value: '$50M+', label: 'Pipeline Generated' },
    { value: '3x', label: 'Target LTV/CAC Ratio' },
  ],
  services: {
    title: 'Execution',
    highlight: 'Verticals',
    description: 'Integrated demand generation strategies built on data, not hunches. We operate at the intersection of psychology and analytics.',
    items: [
      {
        title: 'Performance Marketing',
        description: 'Multi-channel paid acquisition optimized for high-intent capture and maximum ROAS in competitive enterprise landscapes.',
        iconType: 'performance',
      },
      {
        title: 'Pipeline Engineering',
        description: 'Mapping and automating the complete buyer journey to eliminate friction and accelerate deal velocity from MQL to Closed-Won.',
        iconType: 'pipeline',
      },
      {
        title: 'SEO & Organic Growth',
        description: 'Dominating the search landscape through semantic authority, technical precision, and high-conversion content clusters.',
        iconType: 'seo',
      },
      {
        title: 'Growth Hacking',
        description: 'Rapid experimentation frameworks designed to identify and exploit non-obvious levers for viral expansion and product-led growth.',
        iconType: 'growth',
      },
      {
        title: 'Outbound Architecture',
        description: 'Precision-targeted outbound motion combining hyper-personalization with automated scale to penetrate key accounts.',
        iconType: 'outbound',
      },
    ],
  },
  philosophy: {
    quote: 'Growth isn\'t an accident &mdash; it\'s a',
    highlight: 'compounding formula',
    attribution: 'STRATOS METHODOLOGY',
  },
  teasers: {
    title: 'Deep Intelligence',
    description: 'The mechanics of scaling enterprise organizations.',
    items: [
      {
        category: 'Industry Report',
        title: 'The 2024 B2B SaaS Growth Benchmarks',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Case Study',
        title: 'Project Atlas: Scaling Series C to $100M ARR',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Workshop',
        title: 'Frameworks for Global Expansion',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
  ctaSection: {
    title: 'Ready to Architect Your Growth?',
    button: 'Schedule Growth Audit',
  },
  footer: {
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
    ],
    copyright: '© 2024 STRATOS GTM CONSULTING. ALL RIGHTS RESERVED.',
  },
};

/**
 * INLINE SVG ICONS
 */
const Icons = {
  performance: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  pipeline: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  seo: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  growth: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  outbound: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  arrowRight: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
};

/**
 * MAIN TEMPLATE COMPONENT
 */
export default function Template(props: { content?: unknown; pageTitle?: string }) {
  // Merge or fallback to default content
  const content = (props.content as PageContent) || DEFAULT_CONTENT;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-500 rounded-sm rotate-45"></div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              {content.nav.brand}<span className="text-slate-400 font-light">{content.nav.suffix}</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {content.nav.links.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <a href="#" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-orange-600/20">
              {content.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(132,204,22,0.1),transparent_70%)]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 dark:bg-lime-900/30 border border-lime-200 dark:border-lime-800 text-[10px] font-bold tracking-widest uppercase mb-8 text-lime-700 dark:text-lime-400">
                <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
                {content.hero.badge}
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white leading-[1.05] mb-8 tracking-tighter">
                {content.hero.titleMain} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600 dark:from-lime-400 dark:to-emerald-400">
                  {content.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed font-normal">
                {content.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20">
                  {content.hero.primaryCta}
                  <Icons.arrowRight />
                </a>
                <a href="#" className="border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold transition-all text-center">
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-3xl shadow-2xl">
                <div className="flex items-end gap-3 h-64">
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[15%]"></div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[25%]"></div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[45%]"></div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg h-[60%]"></div>
                  <div className="flex-1 bg-lime-500 rounded-t-lg h-[85%] shadow-[0_0_20px_rgba(132,204,22,0.3)]"></div>
                  <div className="flex-1 bg-lime-400 rounded-t-lg h-[100%] shadow-[0_0_30px_rgba(132,204,22,0.4)]"></div>
                </div>
                <div className="mt-10 flex justify-between items-end">
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">{content.hero.stats.label}</p>
                    <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">{content.hero.stats.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 text-5xl font-bold leading-none mb-1">{content.hero.stats.multiplier}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-widest">{content.hero.stats.multiplierLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Strip */}
        <section className="bg-white dark:bg-slate-900 py-20 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12 md:divide-x divide-slate-200 dark:divide-slate-800">
              {content.metrics.map((metric, idx) => (
                <div key={idx} className="text-center px-4">
                  <p className="text-amber-600 dark:text-amber-500 text-6xl font-bold mb-2 tracking-tighter">{metric.value}</p>
                  <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-slate-50 dark:bg-slate-950 py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                {content.services.title} <span className="text-lime-600 dark:text-lime-400">{content.services.highlight}</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed font-light">
                {content.services.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.services.items.map((service, idx) => {
                const Icon = Icons[service.iconType] || Icons.performance;
                return (
                  <div key={idx} className="group p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-300">
                    <div className="w-14 h-14 bg-lime-500 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-lime-500/20 text-slate-950">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-white dark:bg-slate-900 py-32 text-center border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="w-16 h-1.5 bg-lime-500 mx-auto mb-12 rounded-full"></div>
            <blockquote className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight italic">
              &quot;{content.philosophy.quote} <span className="text-lime-600 dark:text-lime-400">{content.philosophy.highlight}</span> where every dollar spent is a node in a self-reinforcing network.&quot;
            </blockquote>
            <p className="mt-12 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">
              &mdash; {content.philosophy.attribution}
            </p>
          </div>
        </section>

        {/* Teasers Section */}
        <section className="bg-slate-50 dark:bg-slate-950 py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{content.teasers.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-light">{content.teasers.description}</p>
              </div>
              <a href="#" className="text-lime-600 dark:text-lime-400 font-bold flex items-center gap-2 group">
                View Library <Icons.arrowRight />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {content.teasers.items.map((teaser, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative aspect-[16/10] bg-slate-200 dark:bg-slate-800 overflow-hidden rounded-2xl mb-6 border border-slate-200 dark:border-slate-800">
                    <img 
                      src={teaser.image} 
                      alt={teaser.title}
                      className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  </div>
                  <span className="text-lime-600 dark:text-lime-500 text-[10px] font-bold uppercase tracking-[0.2em]">{teaser.category}</span>
                  <h4 className="text-slate-900 dark:text-white text-xl font-bold mt-3 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors leading-tight">
                    {teaser.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 dark:bg-blue-700 py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tighter">
              {content.ctaSection.title}
            </h2>
            <a href="#" className="inline-block bg-white text-blue-700 hover:bg-slate-100 px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-black/20">
              {content.ctaSection.button}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-lime-500 rounded-sm rotate-45"></div>
              <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white uppercase">
                {content.nav.brand}<span className="text-slate-400 font-light">{content.nav.suffix}</span>
              </span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">
              {content.footer.links.map((link, idx) => (
                <a key={idx} href={link.href} className="hover:text-lime-600 dark:hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold tracking-widest text-center md:text-right">
              {content.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
