'use client';

import React from 'react';

/**
 * TypeScript Interfaces
 */

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface Metric {
  value: string;
  label: string;
}

interface CaseStudyStat {
  label: string;
  icon: 'trending-up' | 'target' | 'activity';
}

interface CaseStudy {
  category: string;
  title: string;
  description: string;
  stats: CaseStudyStat[];
  link: string;
}

interface Teaser {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

interface CaseStudiesContent {
  nav: {
    logo: string;
    links: NavLink[];
    cta: { label: string; href: string };
  };
  hero: {
    title: string;
    titleAccent: string;
    description: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  metrics: Metric[];
  strategicEngagements: {
    title: string;
    description: string;
    filterLabel: string;
    items: CaseStudy[];
  };
  philosophy: {
    quote: string;
    quoteAccent: string;
    label: string;
  };
  teasers: Teaser[];
  finalCta: {
    title: string;
    description: string;
    buttonLabel: string;
  };
  footer: {
    logo: string;
    links: NavLink[];
    copyright: string;
  };
}

/**
 * Content Data Object
 */

const DEFAULT_CONTENT: CaseStudiesContent = {
  nav: {
    logo: 'Architect',
    links: [
      { label: 'Methodology', href: '#' },
      { label: 'Case Studies', href: '#', active: true },
      { label: 'Insights', href: '#' },
    ],
    cta: { label: 'Get Audited', href: '#audit' },
  },
  hero: {
    title: 'Enterprise Case',
    titleAccent: 'Studies',
    description: 'Engineering predictable revenue through algorithmic GTM precision. Explore how we&apos;ve scaled the world&apos;s most ambitious enterprise tech companies.',
    primaryBtn: 'View All Work',
    secondaryBtn: 'Our Methodology',
  },
  metrics: [
    { value: '150+', label: 'Deployments' },
    { value: '$500M+', label: 'Attributed Revenue' },
    { value: '4x', label: 'Avg. ROI Performance' },
  ],
  strategicEngagements: {
    title: 'Strategic Engagements',
    description: 'High-impact solutions for complex market challenges.',
    filterLabel: 'All Industries',
    items: [
      {
        category: 'Open Source / Enterprise',
        title: 'Red Hat Expansion',
        description: 'Scaling cross-sell motion across APAC territories using intent-based signals.',
        stats: [
          { label: '212% Pipeline Growth', icon: 'trending-up' },
          { label: '45% Reduction in CAC', icon: 'target' },
          { label: '$14M New ARR Attributed', icon: 'activity' },
        ],
        link: '#',
      },
      {
        category: 'FinTech / SaaS',
        title: 'PRGX ABM Strategy',
        description: 'Architecting a bespoke 1:1 ABM engine for Fortune 50 procurement leaders.',
        stats: [
          { label: '90% Target Acc. Engagement', icon: 'trending-up' },
          { label: '3.2x LTV Optimization', icon: 'target' },
          { label: 'Top-down Executive Buy-in', icon: 'activity' },
        ],
        link: '#',
      },
      {
        category: 'Cybersecurity / Defense',
        title: 'SentinelOne Scaling',
        description: 'Optimizing the GTM funnel for IPO readiness and rapid market penetration.',
        stats: [
          { label: 'Unified Data Taxonomy', icon: 'trending-up' },
          { label: 'Global Ops Alignment', icon: 'target' },
          { label: 'Accelerated Deal Cycle', icon: 'activity' },
        ],
        link: '#',
      },
    ],
  },
  philosophy: {
    quote: 'Results aren&apos;t promised &mdash; they are',
    quoteAccent: 'architected',
    label: 'The GTM Creed',
  },
  teasers: [
    {
      title: 'Our Methodology',
      description: 'A data-first approach to dismantling silos and building revenue engines.',
      linkText: 'Explore Framework &rarr;',
      linkUrl: '#',
    },
    {
      title: 'Latest Insights',
      description: 'Monthly briefings on the state of Enterprise GTM and buyer psychology.',
      linkText: 'Read Blog &rarr;',
      linkUrl: '#',
    },
    {
      title: 'The Audit',
      description: 'Not sure where to start? We&apos;ll map your gaps in 48 hours.',
      linkText: 'Schedule Audit &rarr;',
      linkUrl: '#',
    },
  ],
  finalCta: {
    title: 'Ready to Architect Your Growth?',
    description: 'Stop guessing. Start engineering. Let&apos;s build your enterprise revenue engine.',
    buttonLabel: 'Schedule Your Audit',
  },
  footer: {
    logo: 'Architect',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Twitter', href: '#' },
    ],
    copyright: '&copy; 2023 GTM Consulting Group. All rights reserved.',
  },
};

/**
 * SVG Icons
 */

const TrendingUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const TargetIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const QuoteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4c0 2.75-1 4.5-3.5 5.5L3 21z"></path>
    <path d="M14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4c0 2.75-1 4.5-3.5 5.5L14 21z"></path>
  </svg>
);

/**
 * Main Template Component
 */

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const content = (props.content as CaseStudiesContent) || DEFAULT_CONTENT;

  const getIcon = (type: string) => {
    switch (type) {
      case 'trending-up': return <TrendingUpIcon />;
      case 'target': return <TargetIcon />;
      case 'activity': return <ActivityIcon />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-sm rotate-45"></div>
            <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">
              {content.nav.logo}<span className="text-blue-600">.</span>
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide">
            {content.nav.links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className={`${link.active ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'} transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <a 
              href={content.nav.cta.href}
              className="bg-orange-600 hover:bg-orange-500 text-white px-7 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-orange-900/10 active:scale-95 inline-block"
            >
              {content.nav.cta.label}
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-44 pb-28 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-6xl lg:text-8xl font-extrabold leading-tight text-slate-900 mb-8 tracking-tight">
                {content.hero.title} <br/>
                <span className="text-blue-600">
                  {content.hero.titleAccent}
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed font-medium">
                {content.hero.description}
              </p>
              <div className="flex flex-wrap gap-5">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-lg font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                  {content.hero.primaryBtn}
                </button>
                <button className="bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-900 px-10 py-5 rounded-lg font-bold transition-all active:scale-95">
                  {content.hero.secondaryBtn}
                </button>
              </div>
            </div>

            <div className="relative bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl">
              <div className="flex flex-col items-center gap-8">
                <div className="flex items-end gap-4 h-48 w-full justify-center">
                  <div className="w-12 bg-blue-100 rounded-t-lg h-1/2"></div>
                  <div className="w-12 bg-blue-300 rounded-t-lg h-3/4"></div>
                  <div className="w-12 bg-blue-600 rounded-t-lg h-full"></div>
                  <div className="w-12 bg-blue-400 rounded-t-lg h-2/3"></div>
                </div>
                <p className="text-blue-600 font-mono text-xs tracking-widest uppercase font-bold">Real-time Attribution Data</p>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Strip */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
              {content.metrics.map((metric, idx) => (
                <div key={idx} className={`text-center ${idx !== content.metrics.length - 1 ? 'md:border-r border-slate-100' : ''}`}>
                  <div className="text-5xl font-black text-slate-900 mb-2">{metric.value}</div>
                  <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">{content.strategicEngagements.title}</h2>
                <p className="text-lg text-slate-600 font-medium">{content.strategicEngagements.description}</p>
              </div>
              <div>
                <span className="px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-700 font-bold tracking-wider uppercase">
                  {content.strategicEngagements.filterLabel}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {content.strategicEngagements.items.map((item, idx) => (
                <article 
                  key={idx}
                  className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer"
                >
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <ul className="space-y-4 mb-10 border-t border-slate-50 pt-8">
                    {item.stats.map((stat, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-4 text-sm text-slate-700 font-semibold">
                        <span className="text-blue-600">{getIcon(stat.icon)}</span>
                        <span>{stat.label}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={item.link} 
                    className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all text-sm"
                  >
                    Read Case Study <ArrowRightIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-10 text-blue-600/20">
              <QuoteIcon />
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-slate-900 leading-[1.2] italic">
              &quot;{content.philosophy.quote} <span className="text-blue-600 font-black not-italic">{content.philosophy.quoteAccent}</span>.&quot;
            </h2>
            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="w-16 h-px bg-slate-200"></div>
              <span className="uppercase tracking-[0.3em] text-[10px] font-black text-slate-400">
                {content.philosophy.label}
              </span>
              <div className="w-16 h-px bg-slate-200"></div>
            </div>
          </div>
        </section>

        {/* Teasers Section */}
        <section className="py-28 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
            {content.teasers.map((teaser, idx) => (
              <div key={idx} className="space-y-5 group">
                <h4 className="text-slate-900 font-bold text-xl group-hover:text-blue-600 transition-colors tracking-tight">
                  {teaser.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {teaser.description}
                </p>
                <a 
                  href={teaser.linkUrl} 
                  className="text-blue-600 text-sm font-bold hover:underline inline-flex items-center gap-2"
                  dangerouslySetInnerHTML={{ __html: teaser.linkText }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 bg-slate-900 overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl font-black text-white mb-8 tracking-tight">{content.finalCta.title}</h2>
            <p className="text-slate-400 mb-14 text-xl font-medium leading-relaxed">{content.finalCta.description}</p>
            <button className="bg-white text-slate-900 px-12 py-6 rounded-xl font-black text-lg hover:bg-blue-50 transition-all shadow-2xl shadow-blue-600/10 active:scale-95">
              {content.finalCta.buttonLabel}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-sm rotate-45"></div>
            <span className="text-sm font-black tracking-tight text-slate-900 uppercase">
              {content.footer.logo}
            </span>
          </div>
          
          <div className="flex gap-10 text-[10px] text-slate-400 font-black uppercase tracking-widest">
            {content.footer.links.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-blue-600 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest" dangerouslySetInnerHTML={{ __html: content.footer.copyright }} />
        </div>
      </footer>
    </div>
  );
}
