'use client';

import React from 'react';

/**
 * @file Uploaded_AnimationGallery_v1.tsx
 * @description Consolidated Gallery template with inline SVGs and strict constraints.
 */

interface NavLink {
  label: string;
  href: string;
}

interface Action {
  label: string;
  href: string;
}

interface Social {
  platform: string;
  href: string;
  iconName: 'terminal' | 'mail' | 'link';
}

interface Card {
  id: string | number;
  isFeatured?: boolean;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
}

interface GalleryContentProps {
  header: {
    logo: {
      primary: string;
      secondary: string;
    };
    navLinks: NavLink[];
  };
  hero: {
    title: string;
    subtitle: string;
    primaryAction: Action;
    secondaryAction: Action;
  };
  sidebar: {
    searchLabel: string;
    searchPlaceholder: string;
    functionsLabel: string;
    functions: string[];
    taxonomyLabel: string;
    tags: string[];
    displayLogicLabel: string;
    sortOptions: string[];
  };
  gallery: {
    displayedItems: number;
    totalItems: number;
    cards: Card[];
  };
  footer: {
    description: string;
    taxonomy: NavLink[];
    documentation: NavLink[];
    socials: Social[];
    copyright: string;
    legalLinks: NavLink[];
  };
}

const DEFAULT_CONTENT: GalleryContentProps = {
  header: {
    logo: {
      primary: 'GTM',
      secondary: 'STACK',
    },
    navLinks: [
      { label: 'Gallery', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  hero: {
    title: 'Animation & Interaction Gallery',
    subtitle: 'Explore our curated collection of high-performance web animations and interactive components designed for modern digital experiences.',
    primaryAction: { label: 'Explore Library', href: '#' },
    secondaryAction: { label: 'View Documentation', href: '#' },
  },
  sidebar: {
    searchLabel: 'Search Animations',
    searchPlaceholder: 'e.g. Hover effects...',
    functionsLabel: 'Marketing Function',
    functions: ['All Functions', 'Lead Generation', 'Conversion', 'Engagement', 'Retention'],
    taxonomyLabel: 'Categories',
    tags: ['All Assets', 'Digital Blueprints', 'UI Motion', '3D Node Assets'],
    displayLogicLabel: 'Featured Filters',
    sortOptions: ['Enterprise Ready', 'Glassmorphism', 'Motion Blur'],
  },
  gallery: {
    displayedItems: 6,
    totalItems: 148,
    cards: [
      {
        id: 1,
        isFeatured: true,
        image: 'https://picsum.photos/seed/anim1/800/450',
        imageAlt: 'Dynamic Hover State',
        title: 'Dynamic Magnetic Hover',
        description: 'A sophisticated magnetic attraction effect for buttons and interactive elements using physics-based motion.',
        tags: ['UI/UX', 'Motion'],
      },
      {
        id: 2,
        image: 'https://picsum.photos/seed/anim2/800/450',
        imageAlt: 'Parallax Scroll',
        title: 'Smooth Parallax Engine',
        description: 'Ultra-smooth scroll-driven parallax effects optimized for performance across all device types.',
        tags: ['SVG', '3D Transforms'],
      },
      {
        id: 3,
        image: 'https://picsum.photos/seed/anim3/800/450',
        imageAlt: 'Glassmorphism UI',
        title: 'Glassmorphism Transition',
        description: 'Elegant blurred backdrop transitions with dynamic lighting and shadow adjustments.',
        tags: ['Micro-interactions', 'UI/UX'],
      },
      {
        id: 4,
        image: 'https://picsum.photos/seed/anim4/800/450',
        imageAlt: 'SVG Path Animation',
        title: 'SVG Path Morphing',
        description: 'Complex vector shape morphing for storytelling and data visualization components.',
        tags: ['SVG', 'Motion'],
      },
      {
        id: 5,
        image: 'https://picsum.photos/seed/anim5/800/450',
        imageAlt: '3D Card Flip',
        title: 'Perspective Card Flip',
        description: 'High-fidelity 3D card rotations with realistic depth and lighting calculations.',
        tags: ['3D Transforms', 'Micro-interactions'],
      },
      {
        id: 6,
        image: 'https://picsum.photos/seed/anim6/800/450',
        imageAlt: 'Text Reveal',
        title: 'Kinetic Typography Reveal',
        description: 'Staggered character animations for impactful headlines and editorial content.',
        tags: ['Motion', 'UI/UX'],
      },
    ],
  },
  footer: {
    description: 'GTMStack.pro provides premium animation templates and interaction design systems for high-growth digital products.',
    taxonomy: [
      { label: 'UI Components', href: '#' },
      { label: 'Interaction Design', href: '#' },
      { label: 'Motion Systems', href: '#' },
      { label: 'Visual Effects', href: '#' },
    ],
    documentation: [
      { label: 'Getting Started', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Best Practices', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
    socials: [
      { platform: 'Twitter', href: '#', iconName: 'link' },
      { platform: 'GitHub', href: '#', iconName: 'terminal' },
      { platform: 'Email', href: '#', iconName: 'mail' },
    ],
    copyright: '© 2026 GTMStack.pro. All rights reserved.',
    legalLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
};

// Inline SVG Icons to avoid external dependencies
const Icons = {
  Box: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  PlayCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  ChevronLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  LayoutGrid: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
  ),
  Layers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.27a1 1 0 0 0 0 1.83l8.57 4.09a2 2 0 0 0 1.66 0l8.57-4.09a1 1 0 0 0 0-1.83Z"/><path d="m2.6 11.41 8.57 4.09a2 2 0 0 0 1.66 0l8.57-4.09"/><path d="m2.6 15.73 8.57 4.09a2 2 0 0 0 1.66 0l8.57-4.09"/></svg>
  ),
  MousePointer2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/><path d="M13 13l6 6"/></svg>
  ),
  BoxSelect: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M14 3h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/><path d="M9 21h1"/><path d="M14 21h1"/><rect width="6" height="6" x="9" y="9" rx="1"/></svg>
  ),
  List: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
  ),
  Terminal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Link: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  )
};

export default function Template(props: { content?: unknown; pageTitle?: string; onCardClick?: (cardId: string | number) => void }) {
  const content = (props.content as GalleryContentProps) || DEFAULT_CONTENT;
  const { header, hero, sidebar, gallery, footer } = content;
  const { onCardClick } = props;

  const [selectedTag, setSelectedTag] = React.useState('All Assets');

  const filteredCards = selectedTag === 'All Assets' 
    ? gallery.cards 
    : gallery.cards.filter(card => card.tags.includes(selectedTag));

  const tagIcons: Record<string, React.ReactNode> = {
    'All Assets': <Icons.LayoutGrid />,
    'Digital Blueprints': <Icons.Layers />,
    'UI Motion': <Icons.MousePointer2 />,
    '3D Node Assets': <Icons.BoxSelect />,
  };

  return (
    <div className="bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans min-h-screen selection:bg-cyan-500/30 flex">
      {/* Sidebar Navigation */}
      <aside className="w-72 flex-shrink-0 bg-[#020617] border-r border-slate-800/50 p-8 hidden lg:flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="mb-12">
          <a href="/" className="flex items-center gap-3 group">
            <div className="text-[#24cae0] w-8 h-8 group-hover:rotate-12 transition-transform">
              <Icons.Box />
            </div>
            <h1 className="text-xl font-black tracking-tight uppercase">
              {header.logo.primary}<span className="text-[#24cae0]">{header.logo.secondary}</span>
            </h1>
          </a>
        </div>

        <nav className="space-y-12">
          {/* Categories */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{sidebar.taxonomyLabel}</label>
            <div className="space-y-1">
              {sidebar.tags.map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                    selectedTag === tag 
                      ? "bg-[#24cae0]/10 text-[#24cae0]" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className={`w-5 h-5 ${selectedTag === tag ? "text-[#24cae0]" : "text-slate-500 group-hover:text-white"}`}>
                    {tagIcons[tag] || <Icons.LayoutGrid />}
                  </div>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Filters */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{sidebar.displayLogicLabel}</label>
            <div className="space-y-3">
              {sidebar.sortOptions.map((option) => (
                <label key={option} className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox" 
                      className="peer appearance-none w-5 h-5 border-2 border-slate-700 rounded-md checked:bg-[#24cae0] checked:border-[#24cae0] transition-all cursor-pointer" 
                    />
                    <div className="absolute text-[#020617] opacity-0 peer-checked:opacity-100 pointer-events-none w-3 h-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-auto pt-8">
          <div className="bg-gradient-to-br from-[#24cae0]/20 to-transparent p-6 rounded-2xl border border-[#24cae0]/20">
            <p className="text-xs font-bold text-white mb-2">Pro Access</p>
            <p className="text-[10px] text-slate-400 leading-relaxed mb-4">Unlock 500+ premium motion assets and source files.</p>
            <button className="w-full py-2 bg-[#24cae0] text-[#020617] text-[10px] font-black uppercase rounded-lg hover:bg-[#24cae0]/90 transition-colors">Upgrade Now</button>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#020617] py-32 px-12 border-b border-slate-800/50">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ 
                 backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
                 backgroundSize: '60px 60px' 
               }} />
          
          <div className="max-w-5xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#24cae0]/10 border border-[#24cae0]/20 px-3 py-1 rounded-full mb-8">
              <div className="w-3 h-3 text-[#24cae0]">
                <Icons.Box />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#24cae0]">New Release V2.4</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              GTM Animation<br />
              <span className="text-[#24cae0]/40">Architecture Gallery</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed mb-12">
              A curated ecosystem of digital blueprints, professional enterprise motion assets, and architectural UI transitions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#"
                className="bg-[#24cae0] hover:bg-[#24cae0]/90 text-[#020617] font-black py-5 px-12 rounded-xl text-sm uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl shadow-[#24cae0]/20"
              >
                Explore Assets
              </a>
              <a 
                href="#"
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-5 px-12 rounded-xl text-sm uppercase tracking-widest transition-all"
              >
                Documentation
              </a>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#24cae0]/5 to-transparent pointer-events-none" />
        </section>

        {/* Main Grid Area */}
        <main className="px-12 py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Featured Animations</h2>
            <div className="flex items-center gap-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Showing <span className="text-white">{filteredCards.length}</span> Results
              </p>
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-[#24cae0]/10 text-[#24cae0]">
                  <Icons.LayoutGrid />
                </button>
                <button className="p-2 rounded-lg text-slate-600 hover:text-white transition-colors">
                  <Icons.List />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCards.map((card) => (
              <div 
                key={card.id} 
                onClick={() => onCardClick?.(card.id)}
                className="group relative bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-[#24cae0]/60 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#24cae0]/10 cursor-pointer"
              >
                {card.isFeatured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-amber-500 text-[#0B132B] text-[10px] font-black uppercase px-3 py-1.5 rounded-md shadow-xl">
                      Featured
                    </span>
                  </div>
                )}
                <div className="aspect-video relative overflow-hidden bg-slate-800">
                  <img 
                    src={card.image} 
                    alt={card.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#0B132B]/60 backdrop-blur-[4px] transition-all duration-500">
                    <div className="flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-white w-16 h-16">
                        <Icons.PlayCircle />
                      </div>
                      <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Preview Simulation</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-[#24cae0] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                  <div className="pt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Pagination */}
          <div className="mt-20 flex justify-center items-center gap-4">
            <button className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
              <div className="w-5 h-5">
                <Icons.ChevronLeft />
              </div>
            </button>
            <div className="flex items-center gap-2">
              <button className="w-12 h-12 rounded-xl bg-[#24cae0] text-[#0B132B] font-black shadow-lg shadow-[#24cae0]/20">1</button>
              <button className="w-12 h-12 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 font-bold transition-colors">2</button>
              <button className="w-12 h-12 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 font-bold transition-colors">3</button>
              <span className="text-slate-600 px-2 font-bold">...</span>
              <button className="w-12 h-12 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 font-bold transition-colors">12</button>
            </div>
            <button className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
              <div className="w-5 h-5">
                <Icons.ChevronRight />
              </div>
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-32 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-20 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="text-[#24cae0] w-6 h-6">
                <Icons.Box />
              </div>
              <h2 className="font-black tracking-tight uppercase text-xl">
                {header.logo.primary} <span className="text-[#24cae0]">{header.logo.secondary}</span>
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              {footer.description}
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Taxonomy</h4>
            <ul className="space-y-4 text-sm">
              {footer.taxonomy.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-[#24cae0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Documentation</h4>
            <ul className="space-y-4 text-sm">
              {footer.documentation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-[#24cae0] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Connect</h4>
            <div className="flex gap-4">
              {footer.socials.map((social) => {
                return (
                  <a 
                    key={social.platform}
                    href={social.href} 
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#24cae0] hover:text-[#0B132B] transition-all text-slate-500 dark:text-slate-400 group"
                  >
                    <div className="w-5 h-5 group-hover:scale-110 transition-transform">
                      {social.iconName === 'terminal' ? <Icons.Terminal /> : social.iconName === 'mail' ? <Icons.Mail /> : <Icons.Link />}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <p>{footer.copyright}</p>
          <div className="flex gap-8">
            {footer.legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-[#24cae0] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  </div>
);
}
