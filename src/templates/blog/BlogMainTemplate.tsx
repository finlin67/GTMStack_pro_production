"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Search, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Activity, 
  LineChart, 
  PieChart, 
  Gauge, 
  PiggyBank, 
  ArrowUpRight, 
  BarChart4 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Expected content shape:
 * {
 *   navItems: string[],
 *   heroReportTag: string,
 *   heroTitle: string,
 *   heroDescription: string,
 *   featuredPosts: Array<{
 *     id: number,
 *     category: string,
 *     categoryColor: string,
 *     metric: string,
 *     title: string,
 *     description: string
 *   }>,
 *   categories: string[],
 *   feedPosts: Array<{
 *     id: number,
 *     tag: string,
 *     tagColor: string,
 *     date: string,
 *     readTime: string,
 *     title: string,
 *     description: string,
 *     statIconName: string, // 'PieChart' | 'Gauge' | 'PiggyBank' | 'TrendingUp' | 'Activity' | 'BarChart3'
 *     statText: string,
 *     graphicType: 'line' | 'bar' | 'circle'
 *   }>,
 *   footerLinks: string[]
 * }
 */

type Props = { 
  content: any; 
  pageTitle?: string; 
  theme?: string; 
  heroVisualId?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryClick?: (category: string) => void;
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
};

// MOVE TO globals.css:
/*
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/

const IconRenderer = ({ name, size = 18, className = "" }: { name: string; size?: number; className?: string }) => {
  const icons: Record<string, any> = {
    PieChart, 
    Gauge, 
    PiggyBank, 
    TrendingUp, 
    Activity, 
    BarChart3, 
    LineChart
  };
  const Icon = icons[name] || Activity;
  return <Icon size={size} className={className} />;
};

const PostGraphic = ({ type }: { type: 'line' | 'bar' | 'circle' }) => {
  if (type === 'line') {
    return (
      <svg className="w-2/3 h-2/3" fill="none" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 80C20 80 40 20 60 20C80 20 100 60 120 60C140 60 160 10 180 10" stroke="#1e5df1" strokeLinecap="round" strokeWidth="4"></path>
        <path d="M0 90C30 90 50 40 80 40C110 40 130 70 160 70C190 70 210 30 240 30" stroke="#4ADE80" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="2"></path>
      </svg>
    );
  }
  if (type === 'bar') {
    return (
      <div className="grid grid-cols-8 gap-1 p-4 w-full h-full">
        <div className="bg-[#2463EB]/40 h-full rounded-sm"></div>
        <div className="bg-[#2463EB]/20 h-full rounded-sm mt-4"></div>
        <div className="bg-[#2463EB]/60 h-full rounded-sm mt-2"></div>
        <div className="bg-[#2463EB]/30 h-full rounded-sm mt-8"></div>
        <div className="bg-[#2463EB]/50 h-full rounded-sm mt-1"></div>
        <div className="bg-[#2463EB]/20 h-full rounded-sm mt-6"></div>
        <div className="bg-[#2463EB]/70 h-full rounded-sm"></div>
        <div className="bg-[#2463EB]/40 h-full rounded-sm mt-3"></div>
      </div>
    );
  }
  return (
    <div className="w-32 h-32 border-4 border-[#00A8A8] rounded-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-[#2463EB] rounded-full border-dashed animate-spin-slow"></div>
    </div>
  );
};

const NetworkLoadGraphic = () => {
  const [heights, setHeights] = useState([40, 60, 85, 55, 95, 70, 50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(prev => prev.map(h => Math.max(20, Math.min(100, h + (Math.random() * 20 - 10)))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-1 h-24 mb-6">
      {heights.map((h, i) => (
        <motion.div 
          key={i} 
          animate={{ height: `${h}%` }}
          className="bg-[#2463EB]/50 w-full rounded-t-sm"
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      ))}
    </div>
  );
};

export default function BlogMain({ content, pageTitle, theme, heroVisualId, searchValue = '', onSearchChange, selectedCategory = '', onCategoryClick, error, pagination }: Props) {
  const [searchFocused, setSearchFocused] = useState(false);

  if (!content) return null;

  return (
    <div className={`dark min-h-screen bg-[#0A0F2D] text-slate-100 selection:bg-[#2463EB]/30 selection:text-[#2463EB] ${theme || ''}`}>
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#0A0F2D]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-[#2463EB] p-1.5 rounded-lg text-white transform group-hover:scale-110 transition-transform">
                <LineChart size={20} />
              </div>
              <span className="text-xl font-black tracking-tight uppercase">Ledger</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
              {content.navItems?.map((item: string) => (
                <Link key={item} className="hover:text-[#2463EB] transition-colors" href="#">{item}</Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors ${searchFocused ? 'text-[#2463EB]' : ''}`} size={18} />
              <input 
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="bg-[#1E2A5E] border-none rounded-lg pl-10 pr-4 py-2 text-sm w-48 focus:ring-2 focus:ring-[#2463EB] focus:w-64 transition-all outline-none" 
                placeholder="Search insights..." 
                type="text"
              />
            </div>
            <button className="bg-[#2463EB] hover:bg-[#2463EB]/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap active:scale-95">
              Start Your Build
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-20">
          <div className="flex flex-col justify-center py-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2463EB]/10 text-[#2463EB] text-xs font-bold uppercase tracking-widest mb-6 w-fit"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#2463EB] animate-pulse"></span>
              {content.heroReportTag}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8 tracking-tight"
            >
              {content.heroTitle || pageTitle} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2463EB] to-[#00A8A8]">Ledger</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10"
            >
              {content.heroDescription}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <button className="bg-[#2463EB] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#2463EB]/20 transition-all active:scale-95">
                Subscribe to Deep Dives
                <ArrowRight size={20} />
              </button>
              <div className="flex -space-x-3 overflow-hidden p-1">
                {[121, 122, 123].map((seed) => (
                  <div key={seed} className="relative h-10 w-10 rounded-full ring-2 ring-[#0A0F2D] overflow-hidden">
                    <Image 
                      alt="User avatar" 
                      src={`https://picsum.photos/seed/${seed}/100/100`}
                      width={100}
                      height={100}
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-[#0A0F2D] bg-slate-800 text-xs font-bold text-white border border-slate-700">+2k</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Featured */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-[#2463EB]" /> Must Read
            </h3>
            {content.featuredPosts?.map((post: any) => (
              <motion.div 
                key={post.id}
                whileHover={{ x: 4 }}
                className="group bg-[#1E2A5E] rounded-xl p-5 border border-slate-800 hover:border-[#2463EB]/50 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`${post.categoryColor} text-[10px] font-bold px-2 py-0.5 rounded`}>
                    {post.category}
                  </span>
                  <span className="text-[#FFD700] text-xs font-bold flex items-center gap-1">
                    <TrendingUp size={12} />
                    {post.metric}
                  </span>
                </div>
                <h4 className="text-white font-bold mb-2 group-hover:text-[#2463EB] transition-colors">{post.title}</h4>
                <p className="text-slate-400 text-sm line-clamp-2">{post.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          {content.categories?.map((cat: string, idx: number) => {
            const isAllPosts = cat === 'All Posts' || idx === 0;
            const isActive = isAllPosts ? !selectedCategory : selectedCategory === cat.toLowerCase().replace(/\s+/g, '-');
            return (
              <button 
                key={cat}
                onClick={() => onCategoryClick?.(isAllPosts ? '' : cat.toLowerCase().replace(/\s+/g, '-'))}
                className={`${
                  isActive
                  ? 'bg-[#2463EB] text-white border-transparent' 
                  : 'bg-[#1E2A5E] text-slate-400 hover:text-white border-slate-800'
                } px-4 py-2 rounded-lg text-sm font-bold shrink-0 border transition-all active:scale-95`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && (!content.feedPosts || content.feedPosts.length === 0) && (
          <div className="rounded-xl border-2 border-white/20 bg-[#1E2A5E]/40 p-12 text-center text-slate-100 mb-20">
            No posts found.
          </div>
        )}

        {/* Feed Grid */}
        {content.feedPosts && content.feedPosts.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {content.feedPosts.map((post: any) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col group"
            >
              <div className="aspect-video mb-6 rounded-xl overflow-hidden bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2463EB]/20 to-[#00A8A8]/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity">
                  <PostGraphic type={post.graphicType} />
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="bg-[#0A0F2D]/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded border border-slate-700">
                    {post.readTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`${post.tagColor} text-[10px] font-black tracking-tighter uppercase`}>{post.tag}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span className="text-slate-500 text-[10px] font-bold">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#2463EB] transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <IconRenderer name={post.statIconName} className="text-[#FFD700]" />
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-widest">{post.statText}</span>
                </div>
                <ArrowUpRight className="text-slate-600 group-hover:text-[#2463EB] transition-colors" size={20} />
              </div>
            </motion.div>
            ))}
          </section>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <nav className="flex items-center justify-center gap-3 mb-20" aria-label="Blog pagination">
            <button
              onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage <= 1}
              className="px-5 py-2.5 rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-[#1E2A5E] text-white hover:bg-[#2463EB] disabled:hover:bg-[#1E2A5E]"
            >
              Previous
            </button>
            <span className="text-slate-400 text-sm px-4 font-medium">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="px-5 py-2.5 rounded-xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-[#1E2A5E] text-white hover:bg-[#2463EB] disabled:hover:bg-[#1E2A5E]"
            >
              Next
            </button>
          </nav>
        )}

        {/* CTA Section */}
        <section className="bg-[#1E2A5E] border border-slate-800 rounded-2xl p-8 lg:p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <BarChart4 size={200} className="text-[#2463EB] transform rotate-12" />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-black mb-6">Build your performance edge.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Join 25,000+ infrastructure engineers and growth strategists receiving our bi-weekly technical deep dives. No fluff, just raw data and actionable patterns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                <input 
                  className="flex-grow bg-[#0A0F2D] border border-slate-700 rounded-xl px-6 py-4 focus:ring-2 focus:ring-[#2463EB] outline-none text-white transition-all" 
                  placeholder="work@company.com" 
                  type="email"
                />
                <button className="bg-[#2463EB] hover:bg-[#2463EB]/90 text-white font-bold px-8 py-4 rounded-xl transition-all whitespace-nowrap active:scale-95 shadow-lg shadow-[#2463EB]/10">
                  Join the Ledger
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-end"
            >
              <div className="bg-[#0A0F2D]/50 border border-slate-700 rounded-xl p-6 w-72 backdrop-blur-sm hover:border-[#2463EB]/50 transition-colors">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Network Load</span>
                  <span className="text-[#00A8A8] text-xs font-bold uppercase tracking-widest animate-pulse">Stable</span>
                </div>
                
                <NetworkLoadGraphic />

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500 uppercase">Avg Response</span>
                    <span className="text-white">124ms</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500 uppercase">Throughput</span>
                    <span className="text-white">1.2GB/s</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-[#1E2A5E] py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 group">
            <div className="bg-[#2463EB] p-1.5 rounded-lg text-white">
              <LineChart size={20} />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">Ledger</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-500">
            {content.footerLinks?.map((link: string) => (
              <Link key={link} className="hover:text-[#2463EB] transition-colors" href="#">{link}</Link>
            ))}
          </div>
          <p className="text-slate-600 text-xs">© 2024 Performance Ledger. Technical Marketing Excellence.</p>
        </div>
      </footer>
    </div>
  );
}
