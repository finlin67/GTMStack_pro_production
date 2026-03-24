'use client';

import React, { useState, useEffect } from 'react';

/**
 * TYPES & INTERFACES
 */
interface NavLink {
  label: string;
  href: string;
}

interface Metric {
  value: string;
  label: string;
}

interface Pillar {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

interface JournalArticle {
  category: string;
  title: string;
  description: string;
  image: string;
}

interface PageContent {
  brand: {
    name: string;
    logoLetter: string;
  };
  navLinks: NavLink[];
  ctaText: string;
  hero: {
    title: string;
    highlight: string;
    description: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  metrics: Metric[];
  pillarsSection: {
    tagline: string;
    title: string;
    pillars: Pillar[];
  };
  philosophy: {
    quote: string;
    highlight: string;
    creed: string;
  };
  journalSection: {
    tagline: string;
    title: string;
    archiveLinkText: string;
    articles: JournalArticle[];
  };
  ctaSection: {
    title: string;
    buttonText: string;
    footerNote: string;
  };
  footer: {
    description: string;
    domainLinks: NavLink[];
    connectLinks: NavLink[];
    bottomLinks: NavLink[];
    copyright: string;
  };
}

/**
 * DEFAULT CONTENT DATA
 */
const DEFAULT_CONTENT: PageContent = {
  brand: {
    name: 'EduArch',
    logoLetter: 'A',
  },
  navLinks: [
    { label: 'Curriculum', href: '#' },
    { label: 'Institutions', href: '#' },
    { label: 'Research', href: '#' },
    { label: 'Impact', href: '#' },
  ],
  ctaText: 'Contact Registrar',
  hero: {
    title: 'Academic',
    highlight: 'Excellence',
    description: 'Empowering learning environments from K-12 to university research, fostering innovation and community through data-driven academic infrastructure.',
    primaryBtn: 'Explore Solutions',
    secondaryBtn: 'Case Studies',
  },
  metrics: [
    { value: '14.2%', label: 'Student Enrollment Growth' },
    { value: '98.5', label: 'Research Impact Score' },
    { value: 'Global', label: 'Scholarly Network' },
  ],
  pillarsSection: {
    tagline: 'Academic Pillars',
    title: 'Learning Ecosystems',
    pillars: [
      {
        icon: 'menu_book',
        title: 'Curriculum Management',
        description: 'Centralized planning and development systems for multi-disciplinary educational pathways.',
        linkText: 'View Strategies',
        linkHref: '#',
      },
      {
        icon: 'laptop_mac',
        title: 'Virtual Learning Platforms',
        description: 'Advanced digital classrooms and collaborative tools designed for modern hybrid education.',
        linkText: 'View Strategies',
        linkHref: '#',
      },
      {
        icon: 'account_balance',
        title: 'Campus Operations',
        description: 'Streamlining physical and digital infrastructure to support students and faculty daily.',
        linkText: 'View Strategies',
        linkHref: '#',
      },
    ],
  },
  philosophy: {
    quote: 'Integration is the ultimate',
    highlight: 'knowledge unlocked.',
    creed: 'Scholarly Creed',
  },
  journalSection: {
    tagline: 'Educational Intelligence',
    title: 'Innovation Journal',
    archiveLinkText: 'Research Archive',
    articles: [
      {
        category: 'Case Study',
        title: 'Optimizing Student Success Metrics',
        description: 'How early intervention systems improved graduation rates by 15% across three campuses.',
        image: 'https://picsum.photos/seed/edu1/800/600',
      },
      {
        category: 'Technical Playbook',
        title: 'Virtual Reality in Higher Ed Lab Research',
        description: 'Architecting immersive environments for remote scientific experimentation.',
        image: 'https://picsum.photos/seed/edu2/800/600',
      },
      {
        category: 'Industry Report',
        title: '2024 Future of Campus Operations',
        description: 'Balancing traditional academic prestige with modern digital-first student expectations.',
        image: 'https://picsum.photos/seed/edu3/800/600',
      },
    ],
  },
  ctaSection: {
    title: 'Ready to Elevate Your Institution?',
    buttonText: 'Request Academic Audit',
    footerNote: 'Strategic planning windows available for next academic year development.',
  },
  footer: {
    description: 'Providing the digital framework for educational leadership and institutional success across the globe.',
    domainLinks: [
      { label: 'Curriculum Design', href: '#' },
      { label: 'Virtual Learning', href: '#' },
      { label: 'Campus Logistics', href: '#' },
      { label: 'Research Systems', href: '#' },
    ],
    connectLinks: [
      { label: 'Faculty Portal', href: '#' },
      { label: 'Student Success', href: '#' },
      { label: 'Innovation Blog', href: '#' },
      { label: 'University Network', href: '#' },
    ],
    bottomLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Accessibility Standards', href: '#' },
      { label: 'Academic Terms', href: '#' },
    ],
    copyright: '© 2024 Academic Excellence & EduArch Archive. All rights reserved.',
  },
};

/**
 * MAIN TEMPLATE COMPONENT
 */
export default function Template(props: { content?: unknown; pageTitle?: string }) {
  // Merge provided content with default content
  const content = (props.content as PageContent) || DEFAULT_CONTENT;

  // State for scroll-based navigation styling
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-orange-100 dark:selection:bg-orange-900/30 transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 flex justify-between items-center ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-bold text-2xl italic select-none">{content.brand.logoLetter}</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase select-none">
            {content.brand.name}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
          {content.navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-orange-500 dark:hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div>
          <a
            href="/contact"
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          >
            {content.ctaText}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 md:px-12 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:32px_32px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Institutional Excellence
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-slate-900 dark:text-white tracking-tighter">
              {content.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                {content.hero.highlight}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-2xl shadow-orange-500/30 hover:-translate-y-1 active:translate-y-0">
                {content.hero.primaryBtn}
              </button>
              <button className="border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-10 py-5 rounded-xl font-bold text-lg transition-all">
                {content.hero.secondaryBtn}
              </button>
            </div>
          </div>

          <div className="relative group lg:block hidden">
            <div className="aspect-square bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[3rem] relative overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent"></div>
              <div className="w-80 h-80 border border-slate-100 dark:border-slate-700 rounded-full flex items-center justify-center">
                <div className="w-60 h-60 border border-slate-200 dark:border-slate-600 rounded-full opacity-30"></div>
              </div>
              {/* Material Symbols replacement with SVG */}
              <svg className="w-40 h-40 text-orange-500/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.89 9L12 4.57 20.11 9 12 13.43 3.89 9zM12 15.33l-7-3.82v2.27l7 3.82 7-3.82v-2.27l-7 3.82z"/>
              </svg>
              
              {/* Floating elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-white dark:bg-slate-700 rounded-2xl shadow-xl flex items-center justify-center animate-bounce duration-[3000ms]">
                <div className="w-10 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-white dark:bg-slate-700 rounded-full shadow-xl flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 border-4 border-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-white dark:bg-slate-950 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {content.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="mb-4 overflow-hidden">
                <span className="block text-6xl md:text-7xl font-black text-slate-900 dark:text-white transition-transform group-hover:-translate-y-2 duration-500">
                  {metric.value}
                </span>
              </div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-sm">
                {content.pillarsSection.tagline}
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
                {content.pillarsSection.title}
              </h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-md font-medium">
              We provide the structural foundations for modern educational leadership across global networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.pillarsSection.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-orange-500/50 transition-all group cursor-pointer shadow-sm hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="mb-8 w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-500">
                  {/* Icon Placeholder - using text/symbols for self-containment */}
                  <span className="text-3xl text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors material-symbols-outlined">
                    {pillar.icon}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                  {pillar.description}
                </p>
                <a
                  href={pillar.linkHref}
                  className="text-slate-900 dark:text-white font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  {pillar.linkText}
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white dark:bg-slate-950 py-40 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-orange-500"></div>
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <blockquote className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
            &ldquo;{content.philosophy.quote} <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              {content.philosophy.highlight}
            </span>&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-slate-200 dark:bg-slate-800"></div>
            <p className="text-slate-400 font-bold tracking-[0.4em] uppercase text-xs">
              {content.philosophy.creed}
            </p>
            <div className="w-16 h-px bg-slate-200 dark:bg-slate-800"></div>
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="bg-slate-900 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-orange-400 font-black uppercase tracking-[0.3em] text-sm">
                {content.journalSection.tagline}
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                {content.journalSection.title}
              </h3>
            </div>
            <a
              href="/blog"
              className="text-white hover:text-orange-400 underline underline-offset-8 transition-colors font-bold text-lg"
            >
              {content.journalSection.archiveLinkText}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {content.journalSection.articles.map((article, idx) => (
              <article
                key={idx}
                className="bg-slate-800/40 group cursor-pointer overflow-hidden rounded-[2rem] border border-white/5 hover:border-orange-500/30 transition-all shadow-xl"
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    alt={article.title}
                    src={article.image}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-10 space-y-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest">
                    {article.category}
                  </span>
                  <h5 className="text-2xl font-bold text-white leading-tight group-hover:text-orange-400 transition-colors">
                    {article.title}
                  </h5>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {article.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-slate-950 py-32 px-6 md:px-12 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
            {content.ctaSection.title}
          </h2>
          <div className="flex flex-col items-center gap-8">
            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-16 py-6 rounded-2xl font-black text-2xl transition-all shadow-2xl hover:scale-105 active:scale-95">
              {content.ctaSection.buttonText}
            </button>
            <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">
              {content.ctaSection.footerNote}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 py-24 px-6 md:px-12 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg italic">{content.brand.logoLetter}</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                {content.brand.name}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium text-lg">
              {content.footer.description}
            </p>
          </div>

          <div className="space-y-8">
            <h6 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs">
              Domains
            </h6>
            <ul className="space-y-4">
              {content.footer.domainLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors font-semibold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h6 className="text-slate-900 dark:text-white font-black uppercase tracking-widest text-xs">
              Connect
            </h6>
            <ul className="space-y-4">
              {content.footer.connectLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors font-semibold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-bold gap-8 uppercase tracking-widest">
          <p>{content.footer.copyright}</p>
          <div className="flex gap-10">
            {content.footer.bottomLinks.map((link, idx) => (
              <a key={idx} href={link.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
