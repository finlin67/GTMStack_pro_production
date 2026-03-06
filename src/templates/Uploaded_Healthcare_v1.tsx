'use client';

import React, { useState, useEffect } from "react";

// ==========================================
// BLOCK 1: TypeScript Interfaces & Content Data
// ==========================================

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Metric {
  value: string;
  label: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export interface ArticleCard {
  imageSrc: string;
  category: string;
  title: string;
  description: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface HealthcareInnovationsContentProps {
  nav: {
    logoLetter: string;
    logoText: string;
    links: NavLink[];
    ctaText: string;
    ctaHref: string;
  };
  hero: {
    headlinePart1: string;
    headlinePart2: string;
    description: string;
    primaryButtonText: string;
    primaryButtonHref: string;
    secondaryButtonText: string;
    secondaryButtonHref: string;
  };
  metrics: Metric[];
  infrastructure: {
    subtitle: string;
    title: string;
    features: FeatureCard[];
  };
  philosophy: {
    quotePart1: string;
    quotePart2: string;
    author: string;
  };
  research: {
    subtitle: string;
    title: string;
    libraryLinkText: string;
    libraryLinkHref: string;
    articles: ArticleCard[];
  };
  cta: {
    title: string;
    buttonText: string;
    buttonHref: string;
    description: string;
  };
  footer: {
    logoLetter: string;
    logoText: string;
    description: string;
    columns: FooterColumn[];
    copyright: string;
    legalLinks: NavLink[];
  };
}

export const HEALTHCARE_INNOVATIONS_CONTENT: HealthcareInnovationsContentProps = {
  nav: {
    logoLetter: "H",
    logoText: "MedArch",
    links: [
      { label: "Clinical", href: "#" },
      { label: "Diagnostics", href: "#", isActive: true },
      { label: "Security", href: "#" },
      { label: "Research", href: "#" },
    ],
    ctaText: "Access Portal",
    ctaHref: "#",
  },
  hero: {
    headlinePart1: "Healthcare",
    headlinePart2: "Innovations",
    description: "Empowering healthcare administrators and medical researchers with precision patient care, facility management, and diagnostic data security.",
    primaryButtonText: "Deploy Precision",
    primaryButtonHref: "#",
    secondaryButtonText: "View Methodology",
    secondaryButtonHref: "#",
  },
  metrics: [
    { value: "99.8%", label: "Patient Outcomes Improved" },
    { value: "94%", label: "Facility Utilization" },
    { value: "24/7", label: "Diagnostic Security" },
  ],
  infrastructure: {
    subtitle: "Core Infrastructure",
    title: "Clinical Performance Domains",
    features: [
      {
        icon: "patient_list",
        title: "Digital Patient Records",
        description: "Encrypted, interoperable health data environments designed for seamless clinical handoffs.",
        linkText: "View Strategies",
        linkHref: "#",
      },
      {
        icon: "query_stats",
        title: "Predictive Diagnostics",
        description: "AI-driven analytical tools to identify patient risks before they become acute complications.",
        linkText: "View Strategies",
        linkHref: "#",
      },
      {
        icon: "vaccines",
        title: "Supply Chain for Meds",
        description: "Real-time inventory of critical pharmaceuticals with automated expiration and restock triggers.",
        linkText: "View Strategies",
        linkHref: "#",
      },
    ],
  },
  philosophy: {
    quotePart1: "\"Innovation is the conduit to",
    quotePart2: "life-saving precision.\"",
    author: "Medical Researcher Creed",
  },
  research: {
    subtitle: "Research & Data",
    title: "Clinical Insights",
    libraryLinkText: "Resource Library",
    libraryLinkHref: "#",
    articles: [
      {
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCu3vfeOIGCfagGas3GSaFYDDgO7uTN9lXb-e79DS2hg-jHGx3NoyqLeMZrndBdDG0zKXS8L6IhX8wYmt4GqfWFfAYSDMy_75D92W0BFY1kpqFGVU-tBQO23GMG4JpRQTW-G9jiNhHZhs2UGLG-FY5QX98KDelJiNSp_vHCiyr5S9t3l4hLw4mrnyA2_p8IRXVzviYPPhgam3HO3bgxMWoUU-u_khIX7mpdL2e3lBe0qTOIpZE2tJj_BZuV4q4nJF_ft5rjrc6jhRBu",
        category: "White Paper",
        title: "Precision Genomic Sequencing",
        description: "Analyzing how high-throughput data processing accelerates cancer research breakthroughs.",
        href: "#",
      },
      {
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_bpD4x9tLW4Vz7tcXz1Qno87QukD7uli5lGLE9PpD6XfTOF8-VA5L2t8FP8WB8ImrJuVTQl-LY1qr0O1YPorz6zOwgivkzNMogT2ykoqyxf-MZokc-Y5RaGqcfjH4KGQcgei0enjvW_zmeJiqQI_J82y0crfh6t5vxscMipG9HGdqbkHADJo9usJYVBVp11q4w0d29jxYovG7ZQIZ9J5tEtFVuR4p9bvtnU-8dC4CDo3Us51CbIZNfEddYqNlXsW9WBnDy7OH66Pu",
        category: "Technical Guide",
        title: "Diagnostic Data Security Frameworks",
        description: "Standardizing HIPAA compliance through decentralized cloud storage and zero-trust architectures.",
        href: "#",
      },
      {
        imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7RQ5vKSFPIsLHrdWz2UxunQZZF-x-F0HSssHB02iuFNeMb6VI6Vz_CJ7dGaTqFRMsDEEu2Rx63M9dJn0EuS9QQl6cuOx-tpXt74m1RqWYwE6MDBPZ6f49SuS1MNREyFne2_WMklaNwhaGB8dNciO2PhJz7TV0Vw769mn3HmtOzAC5WDa0kZw-o0KXYuJfJnutbDhwW9cwkTyBB45kOZHsmMmsRLyPiYp3CpZfHQXbqZF_Zt1Qf0_5_7IGgIl1N1DkADk7wYLfKv0p",
        category: "Industry Report",
        title: "2024 Smart Facility Outlook",
        description: "How autonomous robotics in hospital supply chains are reducing nursing overhead by 15%.",
        href: "#",
      },
    ],
  },
  cta: {
    title: "Ready to Evolve Your Care Infrastructure?",
    buttonText: "Request Implementation Audit",
    buttonHref: "#",
    description: "Healthcare facility planning windows open for upcoming medical research cycles.",
  },
  footer: {
    logoLetter: "H",
    logoText: "MedArch",
    description: "Providing the digital backbone for modern medical research centers and clinical environments world-wide.",
    columns: [
      {
        title: "Expertise",
        links: [
          { label: "Patient Records", href: "#" },
          { label: "Diagnostic Data", href: "#" },
          { label: "Clinical Research", href: "#" },
          { label: "Supply Optimization", href: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Research Portal", href: "#" },
          { label: "Security Specs", href: "#" },
          { label: "Compliance Lab", href: "#" },
          { label: "Partner Network", href: "#" },
        ],
      },
    ],
    copyright: "© 2024 Healthcare Innovations Archive. All rights reserved.",
    legalLinks: [
      { label: "HIPAA Standards", href: "#" },
      { label: "Privacy Protocol", href: "#" },
      { label: "Ethics Board", href: "#" },
    ],
  },
};

// ==========================================
// BLOCK 2: The Template Component (TSX)
// ==========================================

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const content = (props.content as HealthcareInnovationsContentProps) || HEALTHCARE_INNOVATIONS_CONTENT;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-[#071024] dark:text-slate-200 font-sans antialiased min-h-screen transition-colors duration-300">
      
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 px-8 flex justify-between items-center ${
          isScrolled
            ? "bg-white/90 dark:bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-[#061161] dark:to-[#78ffd6] rounded-sm flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl italic">
              {content.nav.logoLetter}
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            {content.nav.logoText}
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400">
          {content.nav.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors py-2 ${
                link.isActive
                  ? "text-slate-900 dark:text-white border-b-2 border-teal-500 dark:border-[#78ffd6]"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <a
            href={content.nav.ctaHref}
            className="bg-gradient-to-r from-blue-600 to-teal-500 dark:from-[#061161] dark:to-[#78ffd6] hover:opacity-90 text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 inline-block shadow-md"
          >
            {content.nav.ctaText}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white dark:bg-[#0B132B] pt-32 pb-20 px-8 min-h-screen flex items-center transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-slate-900 dark:text-white tracking-tighter">
              {content.hero.headlinePart1} <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-[#4ade80] dark:to-[#78ffd6] bg-clip-text text-transparent">
                {content.hero.headlinePart2}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={content.hero.primaryButtonHref}
                className="bg-gradient-to-r from-blue-600 to-teal-500 dark:from-[#061161] dark:to-[#78ffd6] hover:opacity-90 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg shadow-teal-500/20 text-center"
              >
                {content.hero.primaryButtonText}
              </a>
              <a
                href={content.hero.secondaryButtonHref}
                className="border border-slate-300 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-white px-8 py-4 rounded-md font-bold text-lg transition-all text-center"
              >
                {content.hero.secondaryButtonText}
              </a>
            </div>
          </div>
          <div className="relative group hidden lg:block p-6">
            <div className="aspect-square bg-slate-50 dark:bg-[#162447]/40 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl relative overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_2px_2px,rgba(20,184,166,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(120,255,214,0.05)_1px,transparent_0)] bg-[size:24px_24px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 dark:from-[#061161]/40 to-transparent"></div>
              <div className="w-64 h-64 border border-teal-500/20 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-48 h-48 border border-teal-400/10 rounded-full animate-ping opacity-20"></div>
              </div>
              <span className="material-symbols-outlined text-teal-500/20 dark:text-teal-400/20 text-9xl absolute">
                biotech
              </span>
              <div className="absolute w-full h-[1px] bg-slate-200 dark:bg-white/5 top-1/4"></div>
              <div className="absolute w-full h-[1px] bg-slate-200 dark:bg-white/5 top-2/4"></div>
              <div className="absolute w-full h-[1px] bg-slate-200 dark:bg-white/5 top-3/4"></div>
              <div className="absolute h-full w-[1px] bg-slate-200 dark:bg-white/5 left-1/4"></div>
              <div className="absolute h-full w-[1px] bg-slate-200 dark:bg-white/5 left-2/4"></div>
              <div className="absolute h-full w-[1px] bg-slate-200 dark:bg-white/5 left-3/4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-slate-100 dark:bg-[#F8FAFC]/5 py-20 px-8 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {content.metrics.map((metric, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center ${
                index === 1
                  ? "border-y md:border-y-0 md:border-x border-slate-300 dark:border-slate-700 py-10 md:py-0"
                  : ""
              }`}
            >
              <span className="bg-gradient-to-r from-blue-700 to-teal-500 dark:from-[#061161] dark:to-[#78ffd6] bg-clip-text text-transparent text-6xl font-black mb-4">
                {metric.value}
              </span>
              <span className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-sm">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Infrastructure Section */}
      <section className="bg-slate-50 dark:bg-[#071024] py-28 px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col gap-4">
            <h2 className="text-teal-600 dark:text-[#64748b] text-sm font-black uppercase tracking-[0.2em]">
              {content.infrastructure.subtitle}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              {content.infrastructure.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.infrastructure.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#162447] p-10 rounded-2xl border border-slate-200 dark:border-white/5 hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] dark:hover:shadow-[0_0_20px_rgba(120,255,214,0.1)] hover:border-teal-500/30 dark:hover:border-[#78ffd6]/30 transition-all group flex flex-col gap-6"
              >
                <div className="bg-slate-50 dark:bg-slate-900/50 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-teal-300 transition-colors">
                    {feature.icon}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
                <a
                  href={feature.linkHref}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-[#4ade80] dark:to-[#78ffd6] bg-clip-text text-transparent font-bold inline-flex items-center group-hover:translate-x-2 transition-transform mt-auto"
                >
                  {feature.linkText}{" "}
                  <svg
                    className="ml-2 w-4 h-4 text-teal-600 dark:text-[#78ffd6]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-slate-100 dark:bg-[#F1F4F8]/5 py-32 px-8 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-10">
          <blockquote className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
            {content.philosophy.quotePart1} <br />
            <span className="bg-gradient-to-r from-blue-700 to-teal-500 dark:from-[#061161] dark:to-[#78ffd6] bg-clip-text text-transparent italic">
              {content.philosophy.quotePart2}
            </span>
          </blockquote>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-[2px] bg-slate-300 dark:bg-slate-700"></div>
            <p className="text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-sm">
              {content.philosophy.author}
            </p>
            <div className="w-16 h-[2px] bg-slate-300 dark:bg-slate-700"></div>
          </div>
        </div>
      </section>

      {/* Research & Data Section */}
      <section className="bg-white dark:bg-[#0B132B] py-28 px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-teal-600 dark:text-[#64748b] text-sm font-black uppercase tracking-[0.2em]">
                {content.research.subtitle}
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                {content.research.title}
              </h3>
            </div>
            <a
              href={content.research.libraryLinkHref}
              className="text-slate-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-300 underline underline-offset-8 transition-colors font-bold"
            >
              {content.research.libraryLinkText}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {content.research.articles.map((article, index) => (
              <a
                key={index}
                href={article.href}
                className="block bg-slate-50 dark:bg-[#162447]/30 group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/30 hover:shadow-xl transition-all flex flex-col"
              >
                <div className="h-56 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                  <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-60 group-hover:scale-105 group-hover:opacity-100 dark:group-hover:opacity-90 transition-all duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col gap-4 flex-1">
                  <span className="text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-[#4ade80] dark:to-[#78ffd6] bg-clip-text text-transparent uppercase block">
                    {article.category}
                  </span>
                  <h5 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-[#78ffd6] leading-snug transition-colors">
                    {article.title}
                  </h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 dark:bg-[#071024] py-24 px-8 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-10 items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            {content.cta.title}
          </h2>
          <a
            href={content.cta.buttonHref}
            className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 dark:from-[#061161] dark:to-[#78ffd6] hover:opacity-90 text-white px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl shadow-teal-500/20 transform hover:-translate-y-1"
          >
            {content.cta.buttonText}
          </a>
          <p className="text-slate-600 dark:text-slate-500 font-medium">
            {content.cta.description}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-[#071024] py-16 px-8 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-[#061161] dark:to-[#78ffd6] rounded-sm flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm italic">
                  {content.footer.logoLetter}
                </span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase">
                {content.footer.logoText}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-500 max-w-sm leading-relaxed">
              {content.footer.description}
            </p>
          </div>
          
          {content.footer.columns.map((column, index) => (
            <div key={index} className="flex flex-col gap-6">
              <h6 className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-sm">
                {column.title}
              </h6>
              <ul className="flex flex-col gap-4 text-slate-600 dark:text-slate-500 text-sm">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-600 font-medium gap-6">
          <p>{content.footer.copyright}</p>
          <div className="flex gap-8">
            {content.footer.legalLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}