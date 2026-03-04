'use client'; // <--- THIS MUST BE THE FIRST LINE

import React from 'react';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface NavLink {
  label: string;
  href: string;
}

interface Metric {
  value: string;
  label: string;
}

interface ServicePillar {
  icon: string;
  title: string;
  description: string;
}

interface Teaser {
  category: string;
  title: string;
  linkText: string;
  href: string;
  icon: string;
}

interface PageContent {
  header: {
    logoText: { main: string; accent: string };
    navLinks: NavLink[];
    cta: NavLink;
  };
  hero: {
    title: { main: string; gradient: string };
    description: string;
    primaryCTA: NavLink;
    secondaryCTA: NavLink;
    visual: { title: string; subtitle: string };
  };
  metrics: Metric[];
  services: {
    title: string;
    pillars: ServicePillar[];
  };
  philosophy: {
    quote: string;
    author: string;
  };
  teasers: Teaser[];
  ctaBand: {
    title: string;
    subtitle: string;
    cta: NavLink;
  };
  footer: {
    description: string;
    sections: { title: string; links: NavLink[] }[];
    copyright: string;
  };
}

const DEFAULT_CONTENT: PageContent = {
  header: {
    logoText: { main: "REVENUE", accent: "ARCHITECT" },
    navLinks: [
      { label: "Expertise", href: "#" },
      { label: "Gallery", href: "#" },
      { label: "About", href: "#" },
    ],
    cta: { label: "Get Audited", href: "#" },
  },
  hero: {
    title: { main: "Strategy &", gradient: "Insights" },
    description: "Master blueprints to win and retain enterprise accounts through engineered clarity. We transform chaotic data into scalable GTM structures.",
    primaryCTA: { label: "Explore Strategy", href: "#" },
    secondaryCTA: { label: "Request Audit", href: "#" },
    visual: {
      title: "Engineered Growth",
      subtitle: "Real-time architecture visualizer v2.4",
    },
  },
  metrics: [
    { value: "+87%", label: "YoY Pipeline" },
    { value: "300+", label: "Enterprise Accounts" },
    { value: "+35%", label: "MQL Lift" },
  ],
  services: {
    title: "Core Strategy Pillars",
    pillars: [
      { icon: "target", title: "Account-Based Marketing", description: "Precision-targeting for high-value enterprise tiers." },
      { icon: "users", title: "Customer Experience (CX)", description: "Mapping journey friction to revenue opportunities." },
      { icon: "trending", title: "Customer Marketing", description: "Scaling expansion revenue through engagement." },
      { icon: "refresh", title: "Lifecycle Marketing", description: "Full-funnel automation and retention models." },
      { icon: "search", title: "Market Research", description: "Data-driven insights to define your niche." },
    ],
  },
  philosophy: {
    quote: "Strategy isn't guesswork \u2014 it's engineered clarity.",
    author: "The Revenue Architects",
  },
  teasers: [
    { category: "Insights", title: "Latest Thinking", linkText: "Read Blog", href: "#", icon: "book" },
    { category: "Curation", title: "Architecture Gallery", linkText: "View Designs", href: "#", icon: "image" },
    { category: "Evidence", title: "Client Projects", linkText: "See Results", href: "#", icon: "briefcase" },
  ],
  ctaBand: {
    title: "Ready to Architect Your Growth?",
    subtitle: "Join 300+ enterprises optimizing their GTM machinery.",
    cta: { label: "Schedule Audit", href: "#" },
  },
  footer: {
    description: "Engineered excellence for enterprise GTM. Building the future of B2B revenue operations.",
    sections: [
      {
        title: "Expertise",
        links: [
          { label: "Strategy & Insights", href: "#" },
          { label: "Demand Gen", href: "#" },
          { label: "RevOps Architecture", href: "#" },
          { label: "Sales Enablement", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#" },
          { label: "Case Studies", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
    ],
    copyright: "\u00A9 2024 Revenue Architect Consulting. All rights reserved.",
  },
};

const Icon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  switch (name) {
    case 'layers':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
    case 'target':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'users':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    case 'trending':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
    case 'refresh':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
    case 'search':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
    case 'quote':
      return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.34315 15.3601 2 17.017 2H19.017C20.6739 2 22.017 3.34315 22.017 5V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H5.017C3.91243 8 3.017 7.10457 3.017 6V5C3.017 3.34315 4.36015 2 6.017 2H8.017C9.67386 2 11.017 3.34315 11.017 5V15C11.017 18.3137 8.33071 21 5.017 21H3.017Z" /></svg>;
    case 'book':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'image':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    case 'briefcase':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
    case 'arrow-right':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
    case 'chevron-right':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
    case 'send':
      return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
    case 'linkedin':
      return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
    case 'twitter':
      return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>;
    case 'github':
      return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;
    default:
      return null;
  }
};

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const content = (props.content as PageContent) || DEFAULT_CONTENT;

  const { header, hero, metrics, services, philosophy, teasers, ctaBand, footer } = content;

  return (
    <div className="min-h-screen bg-darker-core text-white font-sans antialiased selection:bg-gold-accent selection:text-darker-core">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 bg-darker-core/80 backdrop-blur-md border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gold-accent rounded-lg flex items-center justify-center shadow-lg shadow-gold-accent/20">
              <Icon name="layers" className="text-darker-core w-5 h-5" />
            </div>
            <span className="text-xl font-display font-extrabold tracking-tighter uppercase">
              {header.logoText.main}<span className="text-gold-accent">{header.logoText.accent}</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-wide">
            {header.navLinks.map((link, i) => (
              <a key={i} className="text-slate-300 hover:text-gold-accent transition-colors" href={link.href}>{link.label}</a>
            ))}
            <a className="bg-gold-accent text-darker-core px-7 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-xl shadow-gold-accent/10" href={header.cta.href}>
              {header.cta.label}
            </a>
          </div>
          <button className="md:hidden text-white p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-gold-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-8xl font-display font-black leading-[1.05] mb-8 tracking-tight">
                {hero.title.main} <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                  {hero.title.gradient}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed font-medium">
                {hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <a className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg text-center hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20" href={hero.primaryCTA.href}>
                  {hero.primaryCTA.label}
                </a>
                <a className="border border-slate-700 hover:border-gold-accent px-10 py-5 rounded-2xl font-bold text-lg text-center transition-all group flex items-center justify-center bg-white/5 backdrop-blur-sm" href={hero.secondaryCTA.href}>
                  {hero.secondaryCTA.label} 
                  <Icon name="arrow-right" className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="relative w-full max-w-md aspect-square rounded-3xl p-12 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl ring-1 ring-white/10">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="20" cy="20" fill="#60a5fa" r="1.5" />
                    <circle cx="80" cy="30" fill="#60a5fa" r="1.5" />
                    <circle cx="50" cy="EAB308" r="2" />
                    <circle cx="30" cy="85" fill="#60a5fa" r="1.5" />
                    <path d="M20 20 L80 30 M80 30 L50 70 M50 70 L30 85" fill="none" stroke="#60a5fa" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="text-center relative z-10">
                  <div className="inline-block p-6 rounded-2xl bg-blue-500/20 mb-8 shadow-inner">
                    <Icon name="layers" className="w-16 h-16 text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-display font-black mb-3 tracking-tight">{hero.visual.title}</h3>
                  <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">{hero.visual.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Strip */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:divide-x divide-slate-200">
              {metrics.map((m, i) => (
                <div key={i} className="text-center md:px-8">
                  <span className="block text-6xl md:text-7xl font-display font-black text-gold-accent mb-4 tracking-tighter">{m.value}</span>
                  <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Strategy Pillars */}
        <section className="py-32 md:py-48 bg-darker-core">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-24 text-center">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-8 tracking-tight">{services.title}</h2>
              <div className="h-2 w-24 bg-gold-accent mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.pillars.map((p, i) => (
                <div key={i} className="bg-white/5 p-10 rounded-3xl border border-white/5 hover:border-gold-accent/30 transition-all duration-500 group hover:bg-white/[0.08] flex flex-col items-start">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Icon name={p.icon} className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-5 tracking-tight group-hover:text-gold-accent transition-colors">{p.title}</h3>
                  <p className="text-lg text-slate-400 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-neutral-slate py-32 md:py-48">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <Icon name="quote" className="w-16 h-16 text-slate-200 mx-auto mb-12" />
            <h2 className="text-4xl md:text-6xl font-display font-black text-darker-core leading-[1.15] italic tracking-tight">
              &quot;{philosophy.quote.split('\u2014')[0].replace('engineered clarity.', '')}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent not-italic">
                engineered clarity.
              </span>&quot;
            </h2>
            <div className="mt-16 flex items-center justify-center space-x-4">
              <div className="h-px w-12 bg-slate-300"></div>
              <p className="text-slate-500 font-bold tracking-[0.3em] uppercase text-sm">{philosophy.author}</p>
              <div className="h-px w-12 bg-slate-300"></div>
            </div>
          </div>
        </section>

        {/* Teasers Section */}
        <section className="bg-deep-dark py-32 md:py-48">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-3 gap-10">
              {teasers.map((t, i) => (
                <div key={i} className="relative group overflow-hidden rounded-3xl bg-darker-core border border-white/5 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-darker-core via-darker-core/40 to-transparent z-10"></div>
                  <div className="h-80 bg-slate-900/50 flex items-center justify-center">
                    <Icon name={t.icon} className="w-24 h-24 text-slate-800 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute bottom-0 p-10 z-20 w-full">
                    <span className="text-gold-accent text-sm font-black uppercase tracking-[0.2em] mb-4 block">{t.category}</span>
                    <h4 className="text-3xl font-display font-black mb-8 tracking-tight">{t.title}</h4>
                    <a className="text-lg font-bold flex items-center group-hover:text-gold-accent transition-colors" href={t.href}>
                      {t.linkText} <Icon name="chevron-right" className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="bg-darker-core py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tight">{ctaBand.title}</h2>
              <p className="text-xl text-slate-400 font-medium">{ctaBand.subtitle}</p>
            </div>
            <a className="bg-gold-accent text-darker-core px-14 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-transform shadow-2xl shadow-gold-accent/20" href={ctaBand.cta.href}>
              {ctaBand.cta.label}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-darker-core pt-32 pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-10">
              <div className="w-8 h-8 bg-gold-accent rounded-lg flex items-center justify-center">
                <Icon name="layers" className="text-darker-core w-5 h-5" />
              </div>
              <span className="text-2xl font-display font-black tracking-tighter uppercase">REVENUEARCHITECT</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">{footer.description}</p>
          </div>
          
          {footer.sections.map((s, i) => (
            <div key={i}>
              <h5 className="font-display font-black mb-10 uppercase text-xs tracking-[0.3em] text-slate-500">{s.title}</h5>
              <ul className="space-y-5 text-slate-400 font-semibold">
                {s.links.map((l, j) => (
                  <li key={j}><a className="hover:text-gold-accent transition-colors" href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h5 className="font-display font-black mb-10 uppercase text-xs tracking-[0.3em] text-slate-500">Stay Updated</h5>
            <div className="flex gap-3">
              <input className="bg-white/5 border-transparent rounded-2xl text-sm w-full px-5 py-4 focus:ring-2 focus:ring-gold-accent outline-none transition-all" placeholder="Email Address" type="email" />
              <button className="bg-gold-accent text-darker-core p-4 rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-gold-accent/10">
                <Icon name="send" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex space-x-10">
            <a className="text-slate-500 hover:text-gold-accent transition-colors" href="#"><Icon name="linkedin" className="w-6 h-6" /></a>
            <a className="text-slate-500 hover:text-gold-accent transition-colors" href="#"><Icon name="twitter" className="w-6 h-6" /></a>
            <a className="text-slate-500 hover:text-gold-accent transition-colors" href="#"><Icon name="github" className="w-6 h-6" /></a>
          </div>
          <p className="text-slate-500 text-sm font-bold tracking-wide">{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
