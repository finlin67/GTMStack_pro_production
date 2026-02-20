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
    <div className="dark font-display bg-[#0A0F2D] text-white antialiased">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'border-slate-800 bg-[#0A0F2D]/95 backdrop-blur-md h-16' : 'border-transparent bg-[#0A0F2D] h-20'}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <DraftingCompass className="text-[#2463EB]" size={30} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#2463EB] font-bold leading-none">Architecture</span>
                <span className="text-xl font-black tracking-tighter text-white uppercase">{content.header?.logoText}</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-8">
              {content.header?.navLinks?.map((link: any) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${link.active ? 'text-[#00A8A8] border-b-2 border-[#00A8A8]' : 'hover:text-[#00A8A8]'}`}
                >
                  {link.label}
                </Link>
              ))}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#2463EB] hover:bg-[#1E5CB8] text-white px-6 py-2.5 rounded text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
              >
                Get Audited
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative border-b border-slate-800 overflow-hidden bg-[#0A0F2D]">
        <div className="absolute inset-0 blueprint-grid opacity-20"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A8A8] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8]">{content.hero?.tag}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
              {content.hero?.title} <span className="text-[#FFD700]">{content.hero?.highlight}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-widest text-[#A0AEC0]">
              <span className="flex items-center gap-2 text-[#00A8A8]"><Calendar size={14} /> {content.hero?.date}</span>
              <span className="flex items-center gap-2"><Clock size={14} /> {content.hero?.readTime}</span>
              <span className="flex items-center gap-2"><User size={14} /> {content.hero?.author}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Article Area */}
          <div className="flex-1">
            <motion.article 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1E2A5E] dashboard-border p-8 lg:p-12 mb-12 relative overflow-hidden group rounded-lg"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                <LayoutTemplate className="text-[#00A8A8]" size={150} />
              </div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black tracking-[0.3em] text-[#00A8A8] uppercase">{content.article?.summaryTag}</span>
                  <span className="bg-[#00A8A8] text-white text-[10px] font-black px-3 py-1.5 rounded tracking-widest uppercase inline-block w-fit">{content.article?.categoryBadge}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#FFD700] font-black text-6xl block">{content.article?.efficiencyDelta}</span>
                  <span className="text-[10px] text-[#A0AEC0] uppercase font-bold">{content.article?.efficiencyLabel}</span>
                </div>
              </div>

              <div className="relative z-10 prose-custom mb-12">
                <p className="text-2xl text-white font-medium leading-relaxed mb-8">
                  {content.article?.leadParagraph}
                </p>
                {content.article?.bodyHtml ? (
                  <div 
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(content.article.bodyHtml) }}
                  />
                ) : (
                  content.article?.bodyParagraphs?.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))
                )}
                
                {content.article?.quote && (
                  <div className="p-6 bg-slate-900/60 border-l-4 border-[#00A8A8] my-8">
                    <p className="text-white italic mb-0">&quot;{content.article.quote}&quot;</p>
                  </div>
                )}
              </div>

              <div className="mt-16 pt-12 border-t border-slate-800 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <BarChart3 className="text-[#FFD700]" size={20} />
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Key Takeaways & Metrics</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.article?.metrics?.map((metric: any) => (
                    <motion.div 
                      key={metric.label}
                      whileHover={{ y: -5 }}
                      className={`p-6 bg-slate-900/40 border-l-2 ${metric.accentColor === 'teal' ? 'border-[#00A8A8]' : metric.accentColor === 'cyan' ? 'border-[#36C0CF]' : metric.accentColor === 'gold' ? 'border-[#FFD700]' : 'border-[#2463EB]'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold ${metric.accentColor === 'teal' ? 'text-[#00A8A8]' : metric.accentColor === 'cyan' ? 'text-[#36C0CF]' : metric.accentColor === 'gold' ? 'text-[#FFD700]' : 'text-[#2463EB]'} uppercase tracking-tighter`}>{metric.category}</span>
                        <span className="text-[#00A8A8] font-black text-xl">{metric.value}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">{metric.label}</h4>
                      <p className="text-[11px] text-[#A0AEC0] leading-relaxed">{metric.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="flex gap-1.5 items-end h-8">
                      <motion.div initial={{ height: "40%" }} animate={{ height: "60%" }} transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 1 }} className="w-1.5 bg-[#00A8A8]"></motion.div>
                      <motion.div initial={{ height: "80%" }} animate={{ height: "100%" }} transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 1.2 }} className="w-1.5 bg-[#00A8A8]"></motion.div>
                      <motion.div initial={{ height: "50%" }} animate={{ height: "70%" }} transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 0.8 }} className="w-1.5 bg-[#00A8A8]"></motion.div>
                      <motion.div initial={{ height: "70%" }} animate={{ height: "90%" }} transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 1.1 }} className="w-1.5 bg-[#00A8A8]"></motion.div>
                    </div>
                    <div className="text-[10px] text-[#A0AEC0] font-bold uppercase tracking-widest">
                      Telemetry: Stable
                    </div>
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#2463EB] hover:bg-[#2463EB]/80 text-white px-6 py-3 rounded text-xs font-black uppercase tracking-widest transition-all">
                      <Download size={14} /> Download PDF
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-slate-700 hover:border-[#00A8A8] text-white px-6 py-3 rounded text-xs font-black uppercase tracking-widest transition-all">
                      <Share2 size={14} /> Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="bg-[#0A0F2D] border border-slate-800 p-8 text-center rounded">
              <blockquote className="text-2xl font-light text-white leading-tight italic max-w-2xl mx-auto">
                &quot;Revenue isn&apos;t a byproduct of effort; it&apos;s a <span className="text-[#2463EB] font-bold not-italic">designed output</span> of a high-precision architectural system.&quot;
              </blockquote>
              <cite className="block mt-6 text-[#A0AEC0] font-bold tracking-widest uppercase text-[10px]">&mdash; The Revenue Architect Manifesto</cite>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 space-y-6">
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1E2A5E] dashboard-border p-6 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="text-[#00A8A8]" size={16} />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Post Telemetry</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#A0AEC0]">Complexity Index</span>
                  <span className="text-xs font-black text-white">{content.sidebar?.telemetry?.index}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#A0AEC0]">Actionability</span>
                  <span className="text-xs font-black text-[#00A8A8]">{content.sidebar?.telemetry?.actionability}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 mt-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${content.sidebar?.telemetry?.actionability}%` }}
                    transition={{ duration: 1.5 }}
                    className="bg-[#00A8A8] h-full"
                  ></motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#2463EB] p-8 relative overflow-hidden group rounded-lg"
            >
              <div className="relative z-10">
                <h4 className="text-white font-black text-xl mb-3 uppercase tracking-tight">{content.sidebar?.cta?.title}</h4>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">{content.sidebar?.cta?.description}</p>
                <button className="w-full bg-white text-[#2463EB] font-black py-3 rounded uppercase text-xs tracking-widest hover:bg-slate-100 transition-colors">
                  {content.sidebar?.cta?.buttonText}
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 pointer-events-none group-hover:scale-110 transition-transform duration-500 opacity-10 rotate-12">
                <DraftingCompass className="text-white" size={140} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-lg"
            >
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <Terminal size={14} className="text-[#00A8A8]" /> {content.sidebar?.newsletter?.title}
              </h4>
              <p className="text-[#A0AEC0] text-xs mb-6 leading-relaxed">{content.sidebar?.newsletter?.description}</p>
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input 
                    className="w-full bg-[#0A0F2D] border border-slate-700 text-white pl-10 p-3 rounded text-sm focus:border-[#00A8A8] outline-none transition-all" 
                    placeholder="root@enterprise.com" 
                    type="email"
                  />
                </div>
                <button className="w-full bg-[#00A8A8] hover:bg-[#00A8A8]/80 text-white font-black py-3 rounded uppercase text-xs tracking-widest transition-colors shadow-lg shadow-[#00A8A8]/20">
                  {content.sidebar?.newsletter?.buttonText}
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-[#1E2A5E] dashboard-border p-6 rounded-lg"
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">Related Specs</h3>
              <div className="space-y-4">
                {content.sidebar?.relatedSpecs?.map((spec: any) => (
                  <Link key={spec.title} className="block group" href={spec.href}>
                    <h4 className="text-sm font-bold text-[#A0AEC0] group-hover:text-[#00A8A8] transition-colors flex items-center gap-2">
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
      <footer className="bg-[#0A0F2D] border-t border-slate-800 py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <DraftingCompass className="text-[#2463EB]" size={24} />
                <span className="text-lg font-black tracking-tighter text-white uppercase">{content.header?.logoText}</span>
              </div>
              <p className="text-sm text-[#A0AEC0] leading-relaxed mb-6 max-w-sm">
                The definitive resource for GTM systems engineering. We help enterprise leaders design, build, and scale high-precision revenue machines.
              </p>
              <div className="flex gap-4">
                <Link className="text-slate-500 hover:text-[#00A8A8] p-2 border border-slate-800 rounded hover:border-[#00A8A8] transition-all" href="#"><Network size={18} /></Link>
                <Link className="text-slate-500 hover:text-[#00A8A8] p-2 border border-slate-800 rounded hover:border-[#00A8A8] transition-all" href="#"><Terminal size={18} /></Link>
                <Link className="text-slate-500 hover:text-[#00A8A8] p-2 border border-slate-800 rounded hover:border-[#00A8A8] transition-all" href="#"><Lock size={18} /></Link>
              </div>
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Expertise</h5>
              <ul className="flex flex-col gap-4 text-xs text-[#A0AEC0] font-medium">
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">RevOps Audit</Link></li>
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">Data Strategy</Link></li>
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">GTM Modeling</Link></li>
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">Sales Stack</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Network</h5>
              <ul className="flex flex-col gap-4 text-xs text-[#A0AEC0] font-medium">
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">Methodology</Link></li>
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">Gallery</Link></li>
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">Industries</Link></li>
                <li><Link className="hover:text-[#00A8A8] transition-colors" href="#">About Me</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">© 2024 {content.header?.logoText} — BUILD_VERSION_1.0.4</p>
            <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-[#00A8A8]">
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#00A8A8]"></span> Engineered for Growth</span>
              <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-[#FFD700]"></span> Precision Scale</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
