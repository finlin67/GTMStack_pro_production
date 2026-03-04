"use client";

import React, { useState, useEffect } from 'react';
import { TechnologyPlatformsContentProps } from './content';

type Props = {
  content: TechnologyPlatformsContentProps;
};

const DomainIcon = ({ type }: { type: string }) => {
  const baseClasses = "w-10 h-10 text-blue-600 dark:text-blue-500 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors";
  
  switch (type) {
    case 'cloud':
      return (
        <svg className={baseClasses} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <rect height="18" rx="2" width="18" x="3" y="3"></rect>
          <path d="M3 9h18"></path>
          <path d="M9 21V9"></path>
        </svg>
      );
    case 'blockchain':
      return (
        <svg className={baseClasses} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" x2="12" y1="2" y2="22"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      );
    case 'cybersecurity':
      return (
        <svg className={baseClasses} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      );
    case 'edge':
      return (
        <svg className={baseClasses} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" x2="22" y1="12" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      );
    case 'quantum':
      return (
        <svg className={baseClasses} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" x2="12" y1="22.08" y2="12"></line>
        </svg>
      );
    default:
      return null;
  }
};

export default function TechnologyPlatforms({ content }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 font-sans antialiased min-h-screen selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 flex justify-between items-center px-8 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-sm flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl italic">{content.nav.logoLetter}</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            {content.nav.logoText}
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide uppercase">
          {content.nav.links.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              className={`transition-colors ${
                link.isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div>
          <a 
            href={content.nav.ctaHref}
            className="bg-gradient-to-br from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 inline-block shadow-md shadow-blue-500/20"
          >
            {content.nav.ctaText}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(37,99,235,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-slate-900 dark:text-white tracking-tighter">
              {content.hero.titleLine1} <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400">
                {content.hero.titleLine2Highlight}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href={content.hero.primaryButtonHref}
                className="bg-gradient-to-br from-blue-600 to-blue-500 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg shadow-blue-500/30 hover:brightness-110 text-center"
              >
                {content.hero.primaryButtonText}
              </a>
              <a 
                href={content.hero.secondaryButtonHref}
                className="border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-md font-bold text-lg transition-all text-center"
              >
                {content.hero.secondaryButtonText}
              </a>
            </div>
          </div>
          
          <div className="relative group hidden lg:block">
            <div className="aspect-square bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 dark:from-blue-500/10 to-transparent"></div>
              <div className="w-64 h-64 border border-blue-500/20 dark:border-blue-500/30 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-48 h-48 border border-blue-500/40 dark:border-blue-500/50 rounded-full animate-ping opacity-20"></div>
              </div>
              <div className="absolute w-full h-[1px] bg-slate-200 dark:bg-slate-800 top-1/4"></div>
              <div className="absolute w-full h-[1px] bg-slate-200 dark:bg-slate-800 top-2/4"></div>
              <div className="absolute w-full h-[1px] bg-slate-200 dark:bg-slate-800 top-3/4"></div>
              <div className="absolute h-full w-[1px] bg-slate-200 dark:bg-slate-800 left-1/4"></div>
              <div className="absolute h-full w-[1px] bg-slate-200 dark:bg-slate-800 left-2/4"></div>
              <div className="absolute h-full w-[1px] bg-slate-200 dark:bg-slate-800 left-3/4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16 px-8 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {content.metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center text-center ${
                index === 1 ? 'border-y md:border-y-0 md:border-x border-slate-300 dark:border-slate-800 py-8 md:py-0' : ''
              }`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-5xl font-bold mb-2">
                {metric.value}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">
              {content.domainsSection.subtitle}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              {content.domainsSection.title}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.domainsSection.domains.map((domain, index) => (
              <div 
                key={index}
                className={`bg-white dark:bg-slate-900/80 p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all group cursor-pointer ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="mb-6">
                  <DomainIcon type={domain.iconType} />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {domain.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {domain.description}
                </p>
                <a 
                  href={domain.linkHref}
                  className="text-blue-600 dark:text-blue-400 font-bold inline-flex items-center group-hover:translate-x-2 transition-transform"
                >
                  {domain.linkText} 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-slate-100 dark:bg-slate-900/30 py-32 px-8 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
            {content.philosophy.quoteLine1} <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 italic">
              {content.philosophy.quoteLine2Highlight}
            </span>
          </blockquote>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></div>
            <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-sm">
              {content.philosophy.label}
            </p>
            <div className="w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-[0.2em] mb-4">
                {content.insightsSection.subtitle}
              </h2>
              <h3 className="text-4xl font-bold text-slate-900 dark:text-white">
                {content.insightsSection.title}
              </h3>
            </div>
            <a 
              href={content.insightsSection.linkHref}
              className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-8 transition-colors font-bold"
            >
              {content.insightsSection.linkText}
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.insightsSection.insights.map((insight, index) => (
              <a key={index} href={insight.href} className="block">
                <article className="bg-white dark:bg-slate-900/50 group cursor-pointer overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md">
                  <div className="h-48 bg-slate-200 dark:bg-slate-800 relative">
                    <img 
                      src={insight.imageSrc}
                      alt={insight.imageAlt}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 dark:opacity-60 dark:group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-2 block">
                      {insight.tag}
                    </span>
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {insight.title}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {insight.description}
                    </p>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-20 px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">
            {content.ctaSection.title}
          </h2>
          <a 
            href={content.ctaSection.buttonHref}
            className="inline-block bg-gradient-to-br from-blue-600 to-blue-500 text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 hover:brightness-110"
          >
            {content.ctaSection.buttonText}
          </a>
          <p className="mt-8 text-slate-500 dark:text-slate-400 font-medium">
            {content.ctaSection.subtext}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs italic">{content.footer.logoLetter}</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                {content.footer.logoText}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              {content.footer.description}
            </p>
          </div>
          
          {content.footer.columns.map((column, index) => (
            <div key={index}>
              <h6 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">
                {column.title}
              </h6>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-500 font-medium gap-4">
          <p>{content.footer.copyright}</p>
          <div className="flex space-x-8">
            {content.footer.bottomLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
