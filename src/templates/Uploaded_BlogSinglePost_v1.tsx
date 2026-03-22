'use client';

import React from 'react';
import { sanitizeHtml } from '@/lib/sanitize-html';

/**
 * TypeScript Interfaces for GTMStack Insight Page
 */
interface Author {
  name: string;
  role: string;
  image: string;
  bio: string;
  profileLink: string;
}

interface Breadcrumb {
  label: string;
  href: string;
}

interface RelatedInsight {
  title: string;
  date: string;
  image: string;
  href: string;
  alt: string;
}

interface PillarItem {
  title: string;
  description: string;
}

interface RevenueEngineContentProps {
  navigation: {
    logoText: string;
    links: { label: string; href: string }[];
    searchPlaceholder: string;
  };
  hero: {
    breadcrumbs: Breadcrumb[];
    title: string;
    author: Author;
    publishedDate: string;
    readingTime: string;
  };
  article: {
    featuredImage: {
      src: string;
      alt: string;
    };
    intro: string;
    sections: {
      title?: string;
      content: string;
      type: 'paragraph' | 'heading' | 'callout' | 'list';
      items?: PillarItem[];
    }[];
    tags: string[];
  };
  sidebar: {
    relatedInsights: RelatedInsight[];
    newsletter: {
      title: string;
      description: string;
      buttonText: string;
      subscriberCount: string;
    };
  };
  footer: {
    links: { label: string; href: string }[];
    copyright: string;
  };
}

/**
 * Default Content Data
 */
const DEFAULT_CONTENT: RevenueEngineContentProps = {
  navigation: {
    logoText: "GTMStack",
    links: [
      { label: "Consulting", href: "#" },
      { label: "Insights", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "About", href: "#" },
    ],
    searchPlaceholder: "Search insights...",
  },
  hero: {
    breadcrumbs: [
      { label: "Insights", href: "#" },
      { label: "Revenue Operations", href: "#" },
    ],
    title: "The 2024 Revenue Engine: Rethinking the Modern Growth Stack",
    author: {
      name: "Alex Rivers",
      role: "Principal Consultant, RevOps",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCerAA7aSa7uSfXEnWyAKVmwwTdSSNPSYMjTOi7cOvzkkiFrhcqNeP_bL4LeJCsybk2XH_DqvtNV1v8mkgbyGvba9rPRpkGmzUomy5VhjVuBk3KttnavK9hzwqqYi_SSkIp70_nv2WL3CHEg5TnD_xPvDU0IeniirSeVMv4xVBJP3XrWgR9DjDHxy6JsJh46v_iSi-wRgiR7xN_2OYWTVSGN9YS1l1qUJrRzqdLcTBXicDCCtSTPa8vTtozoHH38CaEeDgAVHnupzvY",
      bio: "Alex Rivers specializes in scaling revenue infrastructure for Series C+ tech companies. His work focuses on the intersection of AI-enabled sales processes and high-fidelity data modeling.",
      profileLink: "#",
    },
    publishedDate: "Oct 24, 2023",
    readingTime: "12 min read",
  },
  article: {
    featuredImage: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAynI7tCbjvqJukf-VSIiQSRONjYY34JKoezx8hrK9Yu9c0zUaL035RaximomHFlFMbzJ3r-CB7M_da1I2IfYXpfbR8oNIoCEqJrL6yLbb_4v3o54EXmhpwZMSXQlDqo-fYF1ycFEeTnm-qGxg5kOY9UgPHH0pAaP_D_1AzQjbFYcaTO9RGgsl4eOuAeFSxQiN2CVheWpi8IIi1emy1HVSkD44UZBrBVlpY7NZBc1n3wcozEmjQgsdoOZpyMmYN1u5UV5v5qhMA5pZ",
      alt: "Modern high-tech data dashboard showing growth metrics",
    },
    intro: "In the wake of shifting market dynamics, the traditional sales and marketing silo is being dismantled. Organizations are now forced to integrate their tech stacks not just for efficiency, but for survival in an AI-first economy.",
    sections: [
      {
        title: "The Fragmentation of Data Streams",
        content: "Modern B2B enterprises often juggle upwards of 40 separate tools across their marketing, sales, and success departments. This fragmentation creates a &apos;data debt&apos; that impedes decision-making. To rethink the engine, we must first address the plumbing.",
        type: 'paragraph',
      },
      {
        content: "The winner of the 2024 growth race won&apos;t be the one with the most leads, but the one with the most integrated lead-to-revenue intelligence.",
        type: 'callout',
      },
      {
        title: "Three Pillars of the Integrated Stack",
        content: "When we analyze performance metrics from over 200 B2B organizations, those who implemented a centralized RevOps function saw a 19% faster growth rate and a 15% increase in profitability.",
        type: 'list',
        items: [
          { title: "Unified Customer Profile", description: "A single source of truth that spans CRM, MAP, and CDP." },
          { title: "Predictive Pipeline Scoring", description: "Moving from retrospective reporting to forward-looking signals." },
          { title: "Automated Remediation", description: "Systems that detect churn risks and trigger playbooks automatically." },
        ],
      },
    ],
    tags: ["RevenueOps", "GrowthStrategy", "B2B"],
  },
  sidebar: {
    relatedInsights: [
      {
        title: "Why MQLs are Dead: The Shift to Account-Based Engagement",
        date: "Nov 02, 2023",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKAuIw44ZbqY8eb-iimSfhfaS6h3g0hphx65OyUe63jclITmBhckQ53xSZXqq4WNU8QweSSQtGBl7GnPtGHbFustTdtmV8CMQlIcvwPZd05tt7YSwe_UsCCT9EL-7M0nkk_6QIfyhpA8INI5xQ53g3bE93vdEXvSXuZ7jBGk5i8UyRrUkJj3c5Fd0OaIctQIhvikpds-UBN5IwGOW9QReKR0hFecWyJQAJdbOdavhbz0xjcfvtHPBijsriWMHklBupGeTBKmger8Gs",
        href: "#",
        alt: "Bar chart showing rising revenue trends",
      },
      {
        title: "Generative AI in CRM: 5 Risks Every Ops Leader Must Mitigate",
        date: "Oct 30, 2023",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuD2h45FcxeNtx3gAMnCyIclOvt3jlC0UYB1bV9cgUsacHvCCrKiLdI17dKBL_mGeN8ETdOsXq4VzfGfBZbfs2ySl_6PwoXHcmo1L6cjeV1QVzTIFmesU-hmDb4U4Z5euWC7ZGfh5uPdgcQCkiWV7zg9L2IpUbHG2dKYhnazATdDVHXT-kxIcEk8wBpYgt1GjAo_IRGpBwcPAXTWngDYvrjUVrL9iEM5o1uwOmFx3EXs5SyEHPskjPkdztzzTcfqNqdceOFSwT7RfM",
        href: "#",
        alt: "Abstract digital network representing artificial intelligence",
      },
      {
        title: "Building a High-Performance RevOps Team from Scratch",
        date: "Oct 15, 2023",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjNgB3mk8rkIC6IxyiT8uiawLt8ekZdQ1wEr5U1pjyWwyKXWv5B0c2saqNernQt1iTt_m8aprzIxrfCLwii2CijxYuHs2UquVQ1LPtd2DpOtvOLFwUOaE5cWzC4crveSfrSKWlMv85Uy_tOb---ekzjMfieBnEjIEOGuiDBnvrS2mIf8SNz2uFw_CnKYWoqGAxHD59Kme84R7f65lFMgOFPZXuxe36mqW0lqdTl691q4CZOmHWJA-dJo5sbJzZcedgQPFdQ4RgU6g1",
        href: "#",
        alt: "Architectural blueprint representing organizational structure",
      },
    ],
    newsletter: {
      title: "GTM Intelligence Weekly",
      description: "Get the metrics, frameworks, and stacks powering the world&apos;s fastest-growing SaaS companies.",
      buttonText: "Subscribe Now",
      subscriberCount: "Join 12,000+ Revenue Leaders",
    },
  },
  footer: {
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Careers", href: "#" },
    ],
    copyright: "© 2024 GTMStack Consulting. All rights reserved.",
  },
};

/**
 * Inline Icons
 */
const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  Share2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
  ),
  Bookmark: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
  ),
  CheckCircle2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
};

/**
 * Main Template Component
 */
export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const content = (props.content as RevenueEngineContentProps) || DEFAULT_CONTENT;
  const { navigation, hero, article, sidebar, footer } = content;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-100 antialiased">
      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 px-6 lg:px-20 py-4 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <a href="/" className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <div className="size-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="size-5">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight uppercase">
              {navigation.logoText}
            </h2>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-1.5 w-48">
            <Icons.Search />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 w-full ml-2"
              placeholder={navigation.searchPlaceholder}
              type="text"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
            Explore the framework
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative topographic-bg border-b border-slate-200 dark:border-white/5 pt-16 pb-20 px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest">
            {hero.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                <a
                  href={crumb.href}
                  className={idx === hero.breadcrumbs.length - 1 ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-500 hover:text-blue-600 transition-colors"}
                >
                  {crumb.label}
                </a>
                {idx < hero.breadcrumbs.length - 1 && (
                  <Icons.ChevronRight />
                )}
              </React.Fragment>
            ))}
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-slate-100 leading-[1.05] mb-12 tracking-tight">
            {hero.title}
          </h1>
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="relative size-14 rounded-full border-2 border-blue-500/20 p-0.5 overflow-hidden">
                <img
                  src={hero.author.image}
                  alt={hero.author.name}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-slate-900 dark:text-slate-100 font-bold text-lg">{hero.author.name}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{hero.author.role}</p>
              </div>
            </div>
            <div className="h-12 w-px bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Published</span>
              <p className="text-slate-700 dark:text-slate-300 text-sm font-bold mt-1">{hero.publishedDate}</p>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Reading Time</span>
              <p className="text-slate-700 dark:text-slate-300 text-sm font-bold mt-1">{hero.readingTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Long-form content */}
          <article className="w-full lg:w-[65%]">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-video mb-16">
              <img
                src={article.featuredImage.src}
                alt={article.featuredImage.alt}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none 
              prose-headings:font-black prose-headings:tracking-tight 
              prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-[1.8]
              prose-strong:text-slate-900 dark:prose-strong:text-slate-100
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              space-y-12">
              
              <p className="text-2xl text-slate-800 dark:text-slate-200 leading-[1.6] font-medium border-l-4 border-blue-600 pl-8 py-2">
                {article.intro}
              </p>
              
              {article.sections.map((section, idx) => {
                if (section.type === 'callout') {
                  return (
                    <div key={idx} className="bg-blue-600/5 dark:bg-blue-600/[0.03] border border-blue-600/20 p-10 rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 size-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <h4 className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-[0.2em] text-xs mb-6">Key Takeaway</h4>
                      <p className="text-slate-900 dark:text-slate-100 italic font-bold text-2xl leading-snug relative z-10">
                        &quot;{section.content}&quot;
                      </p>
                    </div>
                  );
                }
                
                return (
                  <div key={idx} className="space-y-8">
                    {section.title && (
                      <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 pt-8">
                        {section.title}
                      </h2>
                    )}
                    <div className="text-lg prose-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} />
                    {section.type === 'list' && section.items && (
                      <ul className="space-y-6 list-none pl-0 mt-10">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-5 group">
                            <div className="mt-1.5 size-6 rounded-full bg-blue-600/10 dark:bg-blue-600/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                              <div className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors">
                                <Icons.CheckCircle2 />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-slate-900 dark:text-slate-100 font-black text-lg leading-tight">{item.title}</p>
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-8">
              <div className="flex gap-6">
                <button className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-bold uppercase text-xs tracking-widest">
                  <Icons.Share2 />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-bold uppercase text-xs tracking-widest">
                  <Icons.Bookmark />
                  <span>Save</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {article.tags.map(tag => (
                  <span key={tag} className="bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-lg text-xs text-slate-600 dark:text-slate-400 font-black uppercase tracking-wider border border-slate-200 dark:border-white/10">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-[35%] space-y-16">
            {/* About the Author */}
            <div className="bg-slate-50 dark:bg-white/[0.02] rounded-2xl p-10 border border-slate-200 dark:border-white/5 shadow-sm">
              <h4 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">About the Author</h4>
              <div className="space-y-6">
                <p className="text-slate-700 dark:text-slate-400 text-base leading-relaxed font-medium">
                  {hero.author.bio}
                </p>
                <a href={hero.author.profileLink} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-black flex items-center gap-2 group">
                  View {hero.author.name.split(' ')[0]}&apos;s Profile
                  <div className="group-hover:translate-x-1 transition-transform">
                    <Icons.ArrowRight />
                  </div>
                </a>
              </div>
            </div>

            {/* Related Articles */}
            <div className="space-y-8">
              <h4 className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Related Articles</h4>
              <div className="space-y-10">
                {sidebar.relatedInsights.map((insight, idx) => (
                  <a key={idx} href={insight.href} className="group flex gap-5">
                    <div className="relative size-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <img
                        src={insight.image}
                        alt={insight.alt}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                      <h5 className="text-slate-900 dark:text-slate-100 font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-lg">
                        {insight.title}
                      </h5>
                      <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">{insight.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="relative bg-blue-600 rounded-2xl p-10 overflow-hidden shadow-2xl shadow-blue-600/20">
              <div className="relative z-10">
                <h4 className="text-white text-3xl font-black leading-tight mb-4">{sidebar.newsletter.title}</h4>
                <p className="text-blue-100 text-base mb-8 font-medium leading-relaxed">{sidebar.newsletter.description}</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="w-full bg-white/10 border-white/20 rounded-xl px-5 py-4 placeholder:text-blue-200 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all outline-none"
                    placeholder="work@company.com"
                    type="email"
                  />
                  <button className="w-full bg-white text-blue-600 font-black py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg" type="submit">
                    {sidebar.newsletter.buttonText}
                  </button>
                </form>
                <p className="text-blue-200/60 text-[10px] uppercase font-black tracking-[0.2em] mt-6 text-center">
                  {sidebar.newsletter.subscriberCount}
                </p>
              </div>
              {/* Ambient Glow */}
              <div className="absolute -bottom-20 -right-20 size-64 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-20 -left-20 size-48 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 py-16 px-6 lg:px-20 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <div className="size-6 bg-blue-600 rounded flex items-center justify-center text-white">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="size-4">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-slate-900 dark:text-slate-100 font-black tracking-tight uppercase text-lg">GTMStack</span>
          </div>
          <div className="flex gap-10 text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            {footer.links.map(link => (
              <a key={link.label} href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-slate-400 dark:text-slate-600 text-xs font-medium">{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
