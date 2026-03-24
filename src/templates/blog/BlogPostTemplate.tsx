"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  DraftingCompass, 
  Calendar, 
  Clock, 
  User, 
  Network, 
  BarChart3, 
  Activity, 
  Terminal, 
  ChevronRight, 
  Mail, 
  Download, 
  Share2,
  Lock,
  LayoutTemplate
} from 'lucide-react';
import { sanitizeHtml } from '@/lib/sanitize-html';

/**
 * Expected content shape:
 * {
 *   header: { 
 *     logoText: string, 
 *     navLinks: Array<{ label: string, href: string, active?: boolean }> 
 *   },
 *   hero: { 
 *     tag: string, 
 *     title: string, 
 *     highlight: string, 
 *     date: string, 
 *     readTime: string, 
 *     author: string 
 *   },
 *   article: { 
 *     summaryTag: string, 
 *     categoryBadge: string, 
 *     efficiencyDelta: string, 
 *     efficiencyLabel: string, 
 *     leadParagraph: string, 
 *     bodyParagraphs: string[], 
 *     bodyHtml?: string, // sanitized HTML content
 *     quote: string, 
 *     metrics: Array<{ 
 *       category: string, 
 *       value: string, 
 *       label: string, 
 *       description: string, 
 *       accentColor: string 
 *     }> 
 *   },
 *   sidebar: { 
 *     telemetry: { index: string, actionability: number }, 
 *     cta: { title: string, description: string, buttonText: string }, 
 *     newsletter: { title: string, description: string, buttonText: string }, 
 *     relatedSpecs: Array<{ title: string, category: string, duration: string, href: string }> 
 *   }
 * }
 */

type Props = { 
  content: any; 
  pageTitle?: string; 
  theme?: string; 
  heroVisualId?: string 
};

/* 
MOVE TO globals.css:
.blueprint-grid {
  background-image: linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}
.dashboard-border {
  border: 1px solid rgba(75, 85, 99, 0.3);
}
.dashboard-border:hover {
  border-color: #06B6D4;
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.1);
}
.text-gradient-gold {
  background: linear-gradient(135deg, #F5C842 0%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.prose-custom p {
  margin-bottom: 1.5rem;
  color: #A0AEC0;
  line-height: 1.8;
}
.prose-custom h2 {
  font-weight: 900;
  font-size: 1.875rem;
  color: white;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  letter-spacing: -0.025em;
}
*/

export default function BlogPostTemplate({ content }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!content) return null;

  return (
    <div className="min-h-screen bg-[#0A1628] font-sans text-white antialiased">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'border-white/5 bg-[#0A1628]/95 backdrop-blur-md h-16' : 'border-transparent bg-[#0A1628] h-20'}`}>
        <div className="container-width h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <DraftingCompass className="text-[#4A86D8]" size={30} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#4A86D8] font-bold leading-none">Architecture</span>
                <span className="text-xl font-black tracking-tighter text-white uppercase">{content.header?.logoText}</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              {content.header?.navLinks?.map((link: any) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${link.active ? 'text-[#AED6F1] border-b-2 border-[#4A86D8]' : 'hover:text-[#AED6F1]'}`}
                >
                  {link.label}
                </Link>
              ))}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-cta"
              >
                Get Audited
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#0A1628]">
        <div className="absolute inset-0 blueprint-grid opacity-20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-width relative z-10 py-16 md:py-24"
        >
          <div className="flex flex-col gap-6">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#AED6F1]">
              ← Back to articles
            </Link>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A86D8]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4A86D8]">{content.hero?.tag}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
              {content.hero?.title} <span className="text-gradient-cobalt-ice">{content.hero?.highlight}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-2 text-[#4A86D8]"><Calendar size={14} /> {content.hero?.date}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {content.hero?.readTime}</span>
              <span className="flex items-center gap-2"><User size={14} /> {content.hero?.author}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container-width py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Article Area */}
          <div className="flex-1">
            <motion.article 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card-surface p-8 lg:p-12 mb-12 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                <LayoutTemplate className="text-[#4A86D8]" size={150} />
              </div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black tracking-[0.3em] text-[#4A86D8] uppercase">{content.article?.summaryTag}</span>
                  <span className="bg-[#4A86D8] text-white text-[10px] font-black px-3 py-1.5 rounded-xl tracking-widest uppercase inline-block w-fit">{content.article?.categoryBadge}</span>
                </div>
                <div className="text-right">
                  <span className="proof-gradient-text font-black text-6xl block">{content.article?.efficiencyDelta}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">{content.article?.efficiencyLabel}</span>
                </div>
              </div>

              <div className="relative z-10 mb-12 prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-slate-300 prose-p:leading-[1.8] prose-strong:text-white prose-a:text-[#AED6F1]">
                <p className="text-2xl text-white font-medium leading-relaxed mb-8">
                  {content.article?.leadParagraph}
                </p>
                {content.article?.bodyHtml ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.article.bodyHtml) }}
                  />
                ) : (
                  content.article?.bodyParagraphs?.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))
                )}
                
                {content.article?.quote && (
                  <div className="my-8 rounded-2xl border-l-4 border-[#4A86D8] bg-white/5 p-6">
                    <p className="text-white italic mb-0">&quot;{content.article.quote}&quot;</p>
                  </div>
                )}
              </div>

              <div className="mt-16 pt-12 border-t border-slate-800 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <BarChart3 className="text-[#E8A040]" size={20} />
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Key Takeaways & Metrics</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.article?.metrics?.map((metric: any) => (
                    <motion.div 
                      key={metric.label}
                      whileHover={{ y: -5 }}
                      className="card-dark bg-white/5 p-6"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-[#4A86D8]">{metric.category}</span>
                        <span className="proof-gradient-text font-black text-xl">{metric.value}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">{metric.label}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{metric.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Telemetry snapshot: Stable
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-[#4A86D8] px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#3C74BE]">
                      <Download size={14} /> Download PDF
                    </button>
                    <button className="btn-hero-outline flex-1 sm:flex-none text-xs font-black uppercase tracking-widest">
                      <Share2 size={14} /> Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="card-dark bg-[#112B3C] p-8 text-center">
              <blockquote className="text-2xl font-light text-white leading-tight italic max-w-2xl mx-auto">
                &quot;Revenue isn&apos;t a byproduct of effort; it&apos;s a <span className="text-[#AED6F1] font-bold not-italic">designed output</span> of a high-precision architectural system.&quot;
              </blockquote>
              <cite className="block mt-6 text-slate-400 font-bold tracking-widest uppercase text-[10px]">The Revenue Architect Manifesto</cite>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 space-y-6">
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card-surface-alt p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="text-[#4A86D8]" size={16} />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Post Telemetry</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Complexity Index</span>
                  <span className="text-xs font-black text-white">{content.sidebar?.telemetry?.index}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Actionability</span>
                  <span className="proof-gradient-text text-xs font-black">{content.sidebar?.telemetry?.actionability}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${content.sidebar?.telemetry?.actionability}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-[linear-gradient(135deg,#C2440F_0%,#E8A040_55%,#FFDB58_100%)]"
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-[#112B3C] p-8"
            >
              <div className="relative z-10">
                <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight">{content.sidebar?.cta?.title}</h4>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">{content.sidebar?.cta?.description}</p>
                <button className="nav-cta w-full">
                  {content.sidebar?.cta?.buttonText}
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-10 rotate-12">
                <DraftingCompass className="text-white" size={140} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="glass-card-surface-alt p-8"
            >
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal size={14} className="text-[#4A86D8]" /> {content.sidebar?.newsletter?.title}
              </h4>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">{content.sidebar?.newsletter?.description}</p>
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input 
                    className="w-full rounded-xl border border-white/10 bg-[#0A1628] pl-10 p-3 text-sm text-white outline-none transition-all focus:border-[#4A86D8]" 
                    placeholder="root@enterprise.com" 
                    type="email"
                  />
                </div>
                <button className="nav-cta w-full">
                  {content.sidebar?.newsletter?.buttonText}
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="glass-card-surface-alt p-6"
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">Related Specs</h3>
              <div className="space-y-4">
                {content.sidebar?.relatedSpecs?.map((spec: any) => (
                  <Link key={spec.title} className="block group" href={spec.href}>
                    <h4 className="text-sm font-bold text-slate-300 group-hover:text-[#AED6F1] transition-colors flex items-center gap-2">
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {spec.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 uppercase ml-5">{spec.category} {'\u2022'} {spec.duration}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-white/5 py-16">
        <div className="container-width">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <DraftingCompass className="text-[#4A86D8]" size={24} />
                <span className="text-lg font-black tracking-tighter text-white uppercase">{content.header?.logoText}</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
                The definitive resource for GTM systems engineering. We help enterprise leaders design, build, and scale high-precision revenue machines.
              </p>
              <div className="flex gap-4">
                <span aria-disabled="true" className="rounded-xl border border-white/10 p-2 text-slate-500 transition-all hover:border-[#AED6F1] hover:text-[#AED6F1] cursor-default"><Network size={18} /></span>
                <span aria-disabled="true" className="rounded-xl border border-white/10 p-2 text-slate-500 transition-all hover:border-[#AED6F1] hover:text-[#AED6F1] cursor-default"><Terminal size={18} /></span>
                <span aria-disabled="true" className="rounded-xl border border-white/10 p-2 text-slate-500 transition-all hover:border-[#AED6F1] hover:text-[#AED6F1] cursor-default"><Lock size={18} /></span>
              </div>
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Expertise</h5>
              <ul className="flex flex-col gap-4 text-xs text-slate-400 font-medium">
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/expertise">RevOps Audit</Link></li>
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/expertise">Data Strategy</Link></li>
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/expertise">GTM Modeling</Link></li>
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/expertise">Sales Stack</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Network</h5>
              <ul className="flex flex-col gap-4 text-xs text-slate-400 font-medium">
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/blog">All posts</Link></li>
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/gallery">Gallery</Link></li>
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/industries">Industries</Link></li>
                <li><Link className="hover:text-[#AED6F1] transition-colors" href="/about">About Me</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">© 2024 {content.header?.logoText} • BUILD_VERSION_1.0.4</p>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <Link className="text-[#4A86D8] transition-colors hover:text-[#AED6F1]" href="/blog">Back to blog</Link>
              <Link className="text-[#4A86D8] transition-colors hover:text-[#AED6F1]" href="/contact">Get in touch</Link>
            </div>
            <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-[#4A86D8]">
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#4A86D8]"></span> Engineered for Growth</span>
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#FFDB58]"></span> Precision Scale</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
