'use client';
import React, { useState } from 'react';
import Link from 'next/link';

/**
 * TYPES & INTERFACES
 */

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryColor: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  graphicLabel: string;
  borderColor: string;
}

interface CategoryCard {
  title: string;
  description: string;
  icon: 'BarChart3' | 'Users' | 'Heart' | 'Zap' | 'Lightbulb';
  color: string;
}

interface TeaserLink {
  label: string;
  title: string;
  href: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface PageContent {
  nav: {
    logo: {
      text: string;
      accent: string;
    };
    links: NavLink[];
    cta: string;
  };
  hero: {
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  filters: {
    categories: string[];
    searchPlaceholder: string;
  };
  blog: {
    posts: BlogPost[];
    loadMoreCta: string;
  };
  philosophy: {
    quote: string;
    accent: string;
  };
  categories: CategoryCard[];
  teasers: TeaserLink[];
  ctaBand: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  footer: {
    description: string;
    sections: {
      title: string;
      links: FooterLink[];
    }[];
    copyright: string;
    legalLinks: FooterLink[];
  };
}

/**
 * DEFAULT DATA
 */

const DEFAULT_CONTENT: PageContent = {
  nav: {
    logo: { text: "GTM", accent: "CORE" },
    links: [
      { label: "Expertise", href: "#" },
      { label: "Projects", href: "#" },
      { label: "Insights", href: "#", isActive: true },
      { label: "About", href: "#" },
    ],
    cta: "Get Started",
  },
  hero: {
    title: "GTM",
    titleAccent: "Insights",
    subtitle: "Strategic articles, frameworks, and case breakdowns engineered to help B2B leaders build predictable revenue systems.",
    primaryCta: "Browse All Posts",
    secondaryCta: "Subscribe for Updates",
  },
  filters: {
    categories: ["All Insights", "Strategy", "ABM", "CX", "Lifecycle", "Demand", "AI", "RevOps"],
    searchPlaceholder: "Search insights...",
  },
  blog: {
    posts: [
      {
        id: "1",
        slug: "revenue-architecture-2024",
        category: "Strategy",
        categoryColor: "bg-teal-500",
        readTime: "8 min read",
        date: "Oct 24, 2023",
        title: "The 2024 Revenue Architecture: Engineering Predictable Growth",
        excerpt: "Explore the shift from volume-based marketing to value-based engineering in the enterprise GTM stack.",
        author: { name: "David Chen", role: "Principal" },
        graphicLabel: "FRAMEWORK_01_REVOPS",
        borderColor: "hover:border-blue-500/50",
      },
      {
        id: "2",
        slug: "post-sale-customer-expansion",
        category: "CX",
        categoryColor: "bg-pink-500",
        readTime: "12 min read",
        date: "Oct 18, 2023",
        title: "Beyond the Hand-off: Mastering Post-Sale Customer Expansion",
        excerpt: "Why the enterprise lifecycle begins after the contract is signed, and how to optimize for NRR.",
        author: { name: "Sarah Miller", role: "GTM Lead" },
        graphicLabel: "MAP_CX_LIFECYCLE",
        borderColor: "hover:border-pink-500/50",
      },
      {
        id: "3",
        slug: "generative-gtm-llms",
        category: "AI",
        categoryColor: "bg-indigo-500",
        readTime: "15 min read",
        date: "Oct 12, 2023",
        title: "Generative GTM: Deploying LLMs in the Modern Sales Motion",
        excerpt: "How top-tier consulting firms are utilizing AI to scale personalization without losing the human touch.",
        author: { name: "Marcus Thorne", role: "CTO" },
        graphicLabel: "AI_LLM_IMPLEMENTATION",
        borderColor: "hover:border-indigo-500/50",
      },
      {
        id: "4",
        slug: "revops-debt-bottlenecks",
        category: "RevOps",
        categoryColor: "bg-yellow-500",
        readTime: "6 min read",
        date: "Oct 05, 2023",
        title: "The RevOps Debt: Identifying Friction in Your Revenue Engine",
        excerpt: "Detecting and fixing the hidden operational bottlenecks that stall enterprise deals.",
        author: { name: "David Chen", role: "Principal" },
        graphicLabel: "REVOPS_EFFICIENCY_04",
        borderColor: "hover:border-yellow-500/50",
      },
      {
        id: "5",
        slug: "tier-1-account-strategies-q4",
        category: "ABM",
        categoryColor: "bg-blue-600",
        readTime: "10 min read",
        date: "Sep 28, 2023",
        title: "Precision Targeting: Tier-1 Account Strategies for Q4",
        excerpt: "A deep dive into high-intent signals and account-specific messaging frameworks.",
        author: { name: "Elena Rossi", role: "Strategy Dir." },
        graphicLabel: "ABM_TIERED_ENGAGEMENT",
        borderColor: "hover:border-blue-600/50",
      },
      {
        id: "6",
        slug: "dark-social-demand-loop",
        category: "Demand",
        categoryColor: "bg-orange-500",
        readTime: "7 min read",
        date: "Sep 21, 2023",
        title: "Dark Social & The Modern Demand Gen Loop",
        excerpt: "Attribution is dead. Long live influence. How to capture value in un-trackable channels.",
        author: { name: "Marcus Thorne", role: "CTO" },
        graphicLabel: "DEMAND_GEN_2023",
        borderColor: "hover:border-orange-500/50",
      },
    ],
    loadMoreCta: "Load More Insights",
  },
  philosophy: {
    quote: "Insights aren&apos;t opinions &mdash; they&apos;re",
    accent: "engineered foresight",
  },
  categories: [
    { title: "Strategy", description: "Long-term frameworks for market dominance.", icon: "BarChart3", color: "text-blue-500" },
    { title: "ABM", description: "Targeting high-value accounts with precision.", icon: "Users", color: "text-teal-500" },
    { title: "CX", description: "Retention and expansion engineered by design.", icon: "Heart", color: "text-pink-500" },
    { title: "RevOps", description: "Operational efficiency and tech-stack harmony.", icon: "Zap", color: "text-yellow-500" },
    { title: "AI", description: "Deploying intelligence for sales automation.", icon: "Lightbulb", color: "text-indigo-500" },
  ],
  teasers: [
    { label: "Solutions", title: "Our Projects", href: "#" },
    { label: "Capabilities", title: "Deep Expertise", href: "#" },
    { label: "Assets", title: "Asset Gallery", href: "#" },
    { label: "Company", title: "About Us", href: "#" },
  ],
  ctaBand: {
    title: "Ready to Apply These Insights?",
    subtitle: "Transform your GTM motion with data-backed engineering strategies.",
    buttonText: "Schedule Consultation",
  },
  footer: {
    description: "Enterprise GTM consulting focused on engineering high-performance revenue systems for B2B leaders.",
    sections: [
      {
        title: "Platform",
        links: [
          { label: "Methodology", href: "#" },
          { label: "Success Stories", href: "#" },
          { label: "Expertise Map", href: "#" },
        ],
      },
      {
        title: "Insights",
        links: [
          { label: "Case Studies", href: "#" },
          { label: "Whitepapers", href: "#" },
          { label: "Newsletter", href: "#" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "LinkedIn", href: "#" },
          { label: "X / Twitter", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
    ],
    copyright: "&copy; 2023 GTMCORE Consulting. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
};

/**
 * SVG ICONS
 */

const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  BarChart3: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L11 22l2-10H4Z"/></svg>
  ),
  Lightbulb: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Quote: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1Z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1Z"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  )
};

/**
 * MAIN COMPONENT
 */

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  // Merge or fallback content
  const content = (props.content as PageContent) || DEFAULT_CONTENT;

  // Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Insights');

  // Derived Filtered Posts
  const filteredPosts = content.blog.posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All Insights' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500/30">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                {content.nav.logo.text}<span className="text-blue-600">{content.nav.logo.accent}</span>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-10">
              {content.nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-bold transition-colors hover:text-blue-600 ${
                    link.isActive ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                {content.nav.cta}
              </button>
              <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <Icons.Menu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-slate-900 py-24 lg:py-36 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none">
          <svg fill="none" height="100%" viewBox="0 0 800 800" width="100%" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-0 h-full w-auto">
            <path d="M50 750L750 50M50 400H750M400 50V750" stroke="#EAB308" strokeWidth="2"></path>
            <circle cx="400" cy="400" r="300" stroke="#2563EB" strokeDasharray="10 10" strokeWidth="1"></circle>
            <rect fill="white" fillOpacity="0.2" height="150" width="100" x="100" y="100"></rect>
            <rect fill="white" fillOpacity="0.2" height="80" width="120" x="500" y="300"></rect>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              {content.hero.title} <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">{content.hero.titleAccent}</span> Blog
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed font-medium">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-xl font-extrabold hover:bg-blue-700 transition-all text-center shadow-xl shadow-blue-600/30 active:scale-95">
                {content.hero.primaryCta}
              </button>
              <button className="border border-white/20 text-white px-10 py-5 rounded-xl font-extrabold hover:bg-white/10 transition-all text-center backdrop-blur-sm active:scale-95">
                {content.hero.secondaryCta}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Bar */}
      <section className="bg-slate-50 py-6 sticky top-20 z-40 border-b border-slate-200 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Category Chips */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
              {content.filters.categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${
                    selectedCategory === cat 
                      ? 'bg-slate-900 text-white shadow-lg' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative w-full lg:w-80 group">
              <input 
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all outline-none"
                placeholder={content.filters.searchPlaceholder}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Icons.Search />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <main className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/post?slug=${encodeURIComponent(post.slug)}`}
                  className={`group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl hover:shadow-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${post.borderColor}`}
                >
                  <article className="flex flex-col h-full">
                    <div className="h-56 bg-slate-100 relative p-8 flex items-center justify-center overflow-hidden">
                      {/* Mock Framework Graphic */}
                      <div className="w-full h-full opacity-20 border-2 border-dashed border-blue-500 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <span className="text-slate-900 text-[10px] font-mono font-bold tracking-widest">
                          {post.graphicLabel}
                        </span>
                      </div>
                      <span
                        className={`absolute top-5 left-5 ${post.categoryColor} text-[10px] font-black text-white px-3 py-1.5 rounded-lg tracking-widest uppercase shadow-lg`}
                      >
                        {post.category}
                      </span>
                    </div>

                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
                          {post.readTime}
                        </span>
                        <span className="text-slate-400 text-xs font-medium">{post.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-8">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-4 pt-6 border-t border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                          {post.author.name.charAt(0)}
                        </div>
                        <div>
                          <span className="block text-slate-900 text-sm font-bold">{post.author.name}</span>
                          <span className="block text-slate-400 text-xs">{post.author.role}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-slate-400">No insights found matching your criteria.</h3>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Insights'); }}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
          <div className="mt-20 text-center">
            <button className="group inline-flex items-center gap-2 border-2 border-slate-200 text-slate-900 px-12 py-5 rounded-xl font-black hover:bg-slate-50 transition-all active:scale-95">
              {content.blog.loadMoreCta}
              <div className="transition-transform group-hover:translate-x-1">
                <Icons.ArrowRight />
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Philosophy Quote Block */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-12 inline-block p-4 bg-blue-600/10 rounded-2xl">
            <div className="text-blue-600">
              <Icons.Quote />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] italic tracking-tight">
            &quot;{content.philosophy.quote} <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">{content.philosophy.accent}</span> for compounding returns.&quot;
          </h2>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Browse by Focus Area</h2>
              <p className="text-slate-500 max-w-xl">Deep dives into the core pillars of modern revenue engineering.</p>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            {content.categories.map((cat) => (
              <div 
                key={cat.title}
                className="flex-shrink-0 w-72 p-10 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-500/50 transition-all group cursor-pointer hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-white rounded-2xl mb-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${cat.color}`}>
                  {cat.icon === 'BarChart3' && <Icons.BarChart3 />}
                  {cat.icon === 'Users' && <Icons.Users />}
                  {cat.icon === 'Heart' && <Icons.Heart />}
                  {cat.icon === 'Zap' && <Icons.Zap />}
                  {cat.icon === 'Lightbulb' && <Icons.Lightbulb />}
                </div>
                <h4 className="text-slate-900 font-black text-xl mb-3">{cat.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Section Teasers */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.teasers.map((teaser) => (
              <a 
                key={teaser.title}
                href={teaser.href}
                className="block bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-slate-100"
              >
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] block mb-3">{teaser.label}</span>
                <h5 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  {teaser.title}
                  <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    <Icons.ArrowRight />
                  </div>
                </h5>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA Band */}
      <section className="relative py-24 overflow-hidden bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {content.ctaBand.title}
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              {content.ctaBand.subtitle}
            </p>
          </div>
          <button className="bg-blue-600 text-white px-12 py-5 rounded-xl font-black hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/40 active:scale-95 whitespace-nowrap">
            {content.ctaBand.buttonText}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {content.nav.logo.text}<span className="text-blue-600">{content.nav.logo.accent}</span>
                </span>
              </div>
              <p className="text-slate-500 text-base leading-relaxed max-w-sm">
                {content.footer.description}
              </p>
            </div>
            
            {content.footer.sections.map((section) => (
              <div key={section.title}>
                <h6 className="text-slate-900 font-black mb-8 text-xs uppercase tracking-[0.2em]">
                  {section.title}
                </h6>
                <ul className="space-y-5 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-slate-400 text-xs font-medium">
              {content.footer.copyright}
            </span>
            <div className="flex gap-10">
              {content.footer.legalLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-slate-400 text-xs hover:text-blue-600 transition-colors font-medium">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
