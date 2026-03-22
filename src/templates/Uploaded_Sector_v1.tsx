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

interface Vertical {
  title: string;
  description: string;
  href: string;
  icon: 'platform' | 'fintech' | 'health' | 'industrial' | 'services';
}

interface Article {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface B2BContentProps {
  nav: {
    logo: string;
    links: NavLink[];
    cta: NavLink;
  };
  hero: {
    title: {
      main: string;
      highlight: string;
    };
    description: string;
    primaryBtn: NavLink;
    secondaryBtn: NavLink;
  };
  metrics: Metric[];
  verticals: {
    subtitle: string;
    title: string;
    items: Vertical[];
  };
  philosophy: {
    quote: string;
    highlight: string;
    label: string;
  };
  insights: {
    subtitle: string;
    title: string;
    libraryLink: NavLink;
    articles: Article[];
  };
  ctaSection: {
    title: string;
    button: NavLink;
    footerNote: string;
  };
  footer: {
    description: string;
    columns: {
      title: string;
      links: NavLink[];
    }[];
    bottomLinks: NavLink[];
    copyright: string;
  };
}

/**
 * CONTENT DATA
 */
const B2B_CONTENT: B2BContentProps = {
  nav: {
    logo: 'Architect',
    links: [
      { label: 'Solutions', href: '#' },
      { label: 'Industries', href: '#' },
      { label: 'Framework', href: '#' },
      { label: 'Insights', href: '#' },
    ],
    cta: { label: 'Get in Touch', href: '/contact' },
  },
  hero: {
    title: {
      main: 'B2B',
      highlight: 'Solutions',
    },
    description: 'High-performance B2B frameworks engineered for complex market ecosystems. We architect the structural intelligence required for enterprise-grade growth.',
    primaryBtn: { label: 'Explore Verticals', href: '#' },
    secondaryBtn: { label: 'The B2B Framework', href: '#' },
  },
  metrics: [
    { value: '$1B+', label: 'Pipeline Managed' },
    { value: '5', label: 'Core Sectors' },
    { value: 'Global', label: 'Enterprise Reach' },
  ],
  verticals: {
    subtitle: 'The Directory',
    title: 'B2B Core Verticals',
    items: [
      {
        title: 'Enterprise Platforms',
        description: 'Scalable infrastructure and GTM frameworks for high-volume B2B software ecosystems.',
        href: '#',
        icon: 'platform',
      },
      {
        title: 'FinTech & PayTech',
        description: 'Navigating regulatory complexity and B2B high-frequency financial architecture.',
        href: '#',
        icon: 'fintech',
      },
      {
        title: 'B2B HealthTech',
        description: 'Patient-centric B2B data models and compliant healthcare infrastructure.',
        href: '#',
        icon: 'health',
      },
      {
        title: 'Industrial Partnerships',
        description: 'Legacy modernization and B2B IoT-driven manufacturing efficiency at scale.',
        href: '#',
        icon: 'industrial',
      },
      {
        title: 'B2B Services',
        description: 'Architecting the future of B2B consulting, legal, and operational service firms.',
        href: '#',
        icon: 'services',
      },
    ],
  },
  philosophy: {
    quote: 'Context is the ultimate',
    highlight: 'competitive advantage.',
    label: 'Strategic Creed',
  },
  insights: {
    subtitle: 'Resources',
    title: 'B2B Insights & Execution',
    libraryLink: { label: 'Browse Library', href: '#' },
    articles: [
      {
        category: 'Case Study',
        title: 'The $500M Pivot: Restructuring Legacy FinTech',
        description: 'A deep dive into B2B structural realignment for a Tier-1 financial provider.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu3vfeOIGCfagGas3GSaFYDDgO7uTN9lXb-e79DS2hg-jHGx3NoyqLeMZrndBdDG0zKXS8L6IhX8wYmt4GqfWFfAYSDMy_75D92W0BFY1kpqFGVU-tBQO23GMG4JpRQTW-G9jiNhHZhs2UGLG-FY5QX98KDelJiNSp_vHCiyr5S9t3l4hLw4mrnyA2_p8IRXVzviYPPhgam3HO3bgxMWoUU-u_khIX7mpdL2e3lBe0qTOIpZE2tJj_BZuV4q4nJF_ft5rjrc6jhRBu',
        href: '#',
      },
      {
        category: 'Whitepaper',
        title: 'Enterprise B2B SaaS Maturity Models',
        description: 'Frameworks for transitioning from B2B growth-stage to market dominance.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_bpD4x9tLW4Vz7tcXz1Qno87QukD7uli5lGLE9PpD6XfTOF8-VA5L2t8FP8WB8ImrJuVTQl-LY1qr0O1YPorz6zOwgivkzNMogT2ykoqyxf-MZokc-Y5RaGqcfjH4KGQcgei0enjvW_zmeJiqQI_J82y0crfh6t5vxscMipG9HGdqbkHADJo9usJYVBVp11q4w0d29jxYovG7ZQIZ9J5tEtFVuR4p9bvtnU-8dC4CDo3Us51CbIZNfEddYqNlXsW9WBnDy7OH66Pu',
        href: '#',
      },
      {
        category: 'Report',
        title: '2024 Industrial B2B Convergence',
        description: 'Where hardware meets B2B hyper-intelligence: a vertical breakdown.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7RQ5vKSFPIsLHrdWz2UxunQZZF-x-F0HSssHB02iuFNeMb6VI6Vz_CJ7dGaTqFRMsDEEu2Rx63M9dJn0EuS9QQl6cuOx-tpXt74m1RqWYwE6MDBPZ6f49SuS1MNREyFne2_WMklaNwhaGB8dNciO2PhJz7TV0Vw769mn3HmtOzAC5WDa0kZw-o0KXYuJfJnutbDhwW9cwkTyBB45kOZHsmMmsRLyPiYp3CpZfHQXbqZF_Zt1Qf0_5_7IGgIl1N1DkADk7wYLfKv0p',
        href: '#',
      },
    ],
  },
  ctaSection: {
    title: 'Ready to Architect Your B2B Growth?',
    button: { label: 'Get in Touch', href: '/contact' },
    footerNote: 'Limited availability for Q3/Q4 consultation sessions.',
  },
  footer: {
    description: 'Providing the structural blueprint for B2B enterprise success across five global industry verticals.',
    columns: [
      {
        title: 'Sectors',
        links: [
          { label: 'Enterprise Platforms', href: '#' },
          { label: 'FinTech', href: '#' },
          { label: 'B2B HealthTech', href: '#' },
          { label: 'Industrial Partnerships', href: '#' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'LinkedIn', href: '#' },
          { label: 'Twitter / X', href: '#' },
          { label: 'Contact Support', href: '#' },
          { label: 'Global Offices', href: '#' },
        ],
      },
    ],
    bottomLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Legal Framework', href: '#' },
    ],
    copyright: '© 2024 Architect B2B Solutions. All rights reserved.',
  },
};

/**
 * SVG ICONS
 */
const Icon = ({ name }: { name: Vertical['icon'] }) => {
  switch (name) {
    case 'platform':
      return (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <rect height="18" rx="2" width="18" x="3" y="3"></rect>
          <path d="M3 9h18"></path>
          <path d="M9 21V9"></path>
        </svg>
      );
    case 'fintech':
      return (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" x2="12" y1="2" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      );
    case 'health':
      return (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      );
    case 'industrial':
      return (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22v-7l-2-2"></path>
          <path d="M17 8v.01"></path>
          <path d="M17 22v-5l-5-5"></path>
          <path d="M2 13V2l5 2 5-2 5 2 5-2v11"></path>
          <path d="M7 8v.01"></path>
          <rect height="7" width="20" x="2" y="13"></rect>
          <path d="M7 13v7"></path>
          <path d="M17 13v2"></path>
        </svg>
      );
    case 'services':
      return (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    default:
      return null;
  }
};

/**
 * TEMPLATE COMPONENT
 */
export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const maybeContent = props.content as Partial<B2BContentProps> | undefined;
  const hasSectorShape = !!(
    maybeContent?.nav?.logo &&
    maybeContent?.nav?.links &&
    maybeContent?.hero?.title?.main
  );
  const content = hasSectorShape ? (props.content as B2BContentProps) : B2B_CONTENT;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#071024] text-slate-200 font-sans antialiased selection:bg-blue-500/30">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 py-6 px-8 flex justify-between items-center ${
          isScrolled ? 'bg-[#0B132B]/95 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xl italic">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">{content.nav.logo}</span>
        </div>
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide uppercase">
          {content.nav.links.map((link, i) => (
            <a key={i} className="hover:text-blue-500 transition-colors" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <a
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 inline-block"
            href={content.nav.cta.href}
          >
            {content.nav.cta.label}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#0B132B] pt-32 pb-20 px-8 min-h-screen flex items-center relative overflow-hidden">
        {/* Topographic Grid Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-white tracking-tighter">
              {content.hero.title.main} <br />
              <span className="bg-gradient-to-r from-[#2bc0e4] to-[#eaecc6] bg-clip-text text-transparent">
                {content.hero.title.highlight}
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">{content.hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg shadow-blue-500/20">
                {content.hero.primaryBtn.label}
              </button>
              <button className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-md font-bold text-lg transition-all">
                {content.hero.secondaryBtn.label}
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="aspect-square bg-[#162447]/40 border-2 border-dashed border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
              <div className="w-64 h-64 border border-white/10 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-48 h-48 border border-white/20 rounded-full animate-ping opacity-20"></div>
              </div>
              {/* Decorative Grid Lines */}
              <div className="absolute w-full h-[1px] bg-white/5 top-1/4"></div>
              <div className="absolute w-full h-[1px] bg-white/5 top-2/4"></div>
              <div className="absolute w-full h-[1px] bg-white/5 top-3/4"></div>
              <div className="absolute h-full w-[1px] bg-white/5 left-1/4"></div>
              <div className="absolute h-full w-[1px] bg-white/5 left-2/4"></div>
              <div className="absolute h-full w-[1px] bg-white/5 left-3/4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-[#E8EDF4] py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {content.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="bg-gradient-to-r from-[#2bc0e4] to-[#2563EB] bg-clip-text text-transparent text-6xl font-black mb-2">
                {metric.value}
              </span>
              <span className="text-slate-600 font-bold uppercase tracking-widest text-sm">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Directory Section */}
      <section className="bg-[#071024] py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-slate-500 text-sm font-black uppercase tracking-[0.2em] mb-4">
              {content.verticals.subtitle}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white">{content.verticals.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.verticals.items.map((item, i) => (
              <div
                key={i}
                className={`bg-[#162447] p-10 rounded-xl border border-white/5 hover:border-blue-400/30 transition-all group cursor-pointer ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="mb-8 text-slate-400 group-hover:text-white transition-colors">
                  <Icon name={item.icon} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                <p className="text-slate-400 mb-8 leading-relaxed">{item.description}</p>
                <a className="bg-gradient-to-r from-[#2bc0e4] to-[#eaecc6] bg-clip-text text-transparent font-bold inline-flex items-center group-hover:translate-x-2 transition-transform" href={item.href}>
                  View Strategies
                  <svg className="ml-2 w-4 h-4 stroke-[#2bc0e4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#F1F4F8] py-40 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-800 leading-tight tracking-tight">
            &quot;{content.philosophy.quote} <br />
            <span className="bg-gradient-to-r from-[#2bc0e4] to-[#2563EB] bg-clip-text text-transparent italic">
              {content.philosophy.highlight}
            </span>&quot;
          </blockquote>
          <div className="mt-12 flex items-center justify-center space-x-6">
            <div className="w-16 h-[1px] bg-slate-300"></div>
            <p className="text-slate-500 font-bold tracking-[0.3em] uppercase text-sm">{content.philosophy.label}</p>
            <div className="w-16 h-[1px] bg-slate-300"></div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="bg-[#0B132B] py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-slate-500 text-sm font-black uppercase tracking-[0.2em] mb-4">
                {content.insights.subtitle}
              </h2>
              <h3 className="text-4xl font-bold text-white">{content.insights.title}</h3>
            </div>
            <a
              className="text-white hover:text-blue-400 underline underline-offset-8 transition-colors font-bold text-lg"
              href={content.insights.libraryLink.href}
            >
              {content.insights.libraryLink.label}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {content.insights.articles.map((article, i) => (
              <article key={i} className="bg-[#162447]/30 group cursor-pointer overflow-hidden rounded-xl border border-white/5">
                <div className="h-56 bg-slate-800 relative overflow-hidden">
                  <img
                    alt={article.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                    src={article.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071024] to-transparent opacity-60"></div>
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold bg-gradient-to-r from-[#2bc0e4] to-[#eaecc6] bg-clip-text text-transparent uppercase mb-3 block tracking-widest">
                    {article.category}
                  </span>
                  <h5 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                    {article.title}
                  </h5>
                  <p className="text-slate-400 text-base leading-relaxed">{article.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#071024] py-32 px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-12 tracking-tighter">
            {content.ctaSection.title}
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 rounded-full font-black text-2xl transition-all shadow-2xl shadow-blue-500/20 transform hover:-translate-y-2 active:scale-95">
            {content.ctaSection.button.label}
          </button>
          <p className="mt-12 text-slate-500 font-semibold text-lg">{content.ctaSection.footerNote}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071024] py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg italic">A</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white uppercase">{content.nav.logo}</span>
            </div>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed">{content.footer.description}</p>
          </div>
          {content.footer.columns.map((col, i) => (
            <div key={i}>
              <h6 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{col.title}</h6>
              <ul className="space-y-5 text-slate-500 font-medium">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a className="hover:text-blue-500 transition-colors" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 font-semibold gap-8">
          <p>{content.footer.copyright}</p>
          <div className="flex space-x-10">
            {content.footer.bottomLinks.map((link, i) => (
              <a key={i} className="hover:text-white transition-colors" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
