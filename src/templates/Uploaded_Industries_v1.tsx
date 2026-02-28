"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  ShoppingBag, 
  HeartPulse, 
  Zap, 
  Globe, 
  BarChart3,
  ArrowRight,
  PlayCircle,
  Target,
  FileText,
  Video,
  Rocket,
  ChevronRight,
  EyeOff,
  Timer,
  Brain,
  Gavel,
  TrendingUp
} from 'lucide-react';

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  // Defensive fallback for content
  const content = (props.content as any) || {};
  const title = props.pageTitle || content.heroTitle || "Architecting Growth by Industry";

  const industries = [
    { name: "Enterprise SaaS", icon: Cpu, desc: "High-velocity PLG and SLG strategies for software leaders." },
    { name: "FinTech", icon: ShieldCheck, desc: "Navigating trust and security in the digital finance era." },
    { name: "HealthTech", icon: HeartPulse, desc: "Patient-centric growth models for regulated environments." },
    { name: "E-Commerce", icon: ShoppingBag, desc: "Optimizing conversion and LTV in the retail landscape." },
    { name: "Cybersecurity", icon: ShieldCheck, desc: "Communicating complex defense value to the C-suite." },
    { name: "Clean Energy", icon: Zap, desc: "Scaling sustainable solutions for a greener future." },
    { name: "Logistics", icon: Globe, desc: "Streamlining global supply chain communication." },
    { name: "AdTech", icon: BarChart3, desc: "Data-driven strategies for the attention economy." }
  ];

  const challenges = [
    { title: "Market Saturation", desc: "Breaking through the noise in crowded legacy sectors.", icon: EyeOff },
    { title: "Long Sales Cycles", desc: "Shortening the path from lead to closed-won revenue.", icon: Timer },
    { title: "Technical Complexity", desc: "Simplifying abstract value for non-technical buyers.", icon: Brain },
    { title: "Regulatory Hurdles", desc: "Navigating compliance without sacrificing speed.", icon: Gavel },
    { title: "Scale Inefficiency", desc: "Optimizing the unit economics of your GTM engine.", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0B132B] py-24 sm:py-32">
          {/* Glowing blur circles */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2463eb]/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#06B6D4]/20 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl"
            >
              <div className="mb-6 inline-flex items-center rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3 py-1 text-sm font-medium text-[#06B6D4] backdrop-blur-sm">
                <span className="mr-2 h-2 w-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
                Industry-Specific Growth
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-7xl mb-6">
                {title.split(' ').map((word: string, i: number) => {
                  const isGrowth = word.toLowerCase().includes('growth');
                  return (
                    <span key={i} className={isGrowth ? "bg-gradient-to-r from-[#06B6D4] to-[#2463eb] bg-clip-text text-transparent" : ""}>
                      {word}{' '}
                    </span>
                  );
                })}
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
                {content.heroSubtitle || "Precision-engineered GTM strategies tailored to the unique dynamics of your sector. Accelerate complex cycles with domain-specific expertise."}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2463eb] px-6 text-sm font-bold text-white transition-all hover:bg-blue-700">
                  <PlayCircle className="h-5 w-5" />
                  View Industry Solutions
                </button>
                <a className="text-sm font-semibold leading-6 text-white hover:text-[#06B6D4] transition-colors flex items-center gap-1" href="#industries">
                  Explore Sectors <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="bg-[#F1F4F8] py-24 text-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-[#2463eb] uppercase tracking-widest">The Challenge</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Common Industry Roadblocks</p>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Every sector faces distinct hurdles. We identify and dismantle the specific barriers preventing your high-velocity growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {challenges.map((challenge, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] mb-4">
                    <challenge.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{challenge.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{challenge.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Grid Section */}
        <section className="bg-[#0B132B] py-24 sm:py-32" id="industries">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-[#06B6D4] uppercase tracking-widest">Sectors We Serve</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Specialized GTM Architecture</p>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Domain expertise across 8 key verticals. We don't just understand your product; we understand your market.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="group relative flex flex-col gap-6 rounded-xl bg-[#162447]/50 backdrop-blur p-6 shadow-lg transition-all border border-white/5 hover:border-[#06B6D4]/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] group-hover:bg-[#06B6D4] group-hover:text-[#0B132B] transition-colors">
                    <industry.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-8 text-white">{industry.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{industry.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GTM Lifecycle */}
        <section className="bg-[#0B132B] py-24 relative overflow-hidden border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The GTM Lifecycle</h2>
              <p className="mt-4 text-lg text-slate-400">Our proven methodology ensures every tactic serves a revenue goal.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Audit & Strategy", icon: Target, desc: "Deep dive into your current metrics and market positioning." },
                { step: "02", title: "Stack Alignment", icon: FileText, desc: "Ensuring your tools and teams are perfectly synchronized." },
                { step: "03", title: "Execution", icon: Video, desc: "Launching high-impact campaigns across your key channels." },
                { step: "04", title: "Optimization", icon: Rocket, desc: "Continuous A/B testing and performance-driven scaling." }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#162447] border border-[#06B6D4] text-[#06B6D4] font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      {item.step}
                    </div>
                    {idx < 3 && <div className="hidden md:block h-px bg-[#06B6D4]/30 flex-1 ml-4"></div>}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <item.icon className="h-5 w-5 text-[#06B6D4]" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof Strip */}
        <section className="bg-[#E8EDF4] py-20 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="px-4 py-4">
                <dt className="text-base leading-7 text-slate-600 font-medium">Average Revenue Lift</dt>
                <dd className="order-first text-5xl font-black tracking-tight text-[#2463eb] sm:text-6xl">+42%</dd>
              </div>
              <div className="px-4 py-4">
                <dt className="text-base leading-7 text-slate-600 font-medium">Cycle Reduction</dt>
                <dd className="order-first text-5xl font-black tracking-tight text-[#2463eb] sm:text-6xl">-28%</dd>
              </div>
              <div className="px-4 py-4">
                <dt className="text-base leading-7 text-slate-600 font-medium">Pipeline Velocity</dt>
                <dd className="order-first text-5xl font-black tracking-tight text-[#2463eb] sm:text-6xl">2.4x</dd>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="bg-[#0B132B] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Industry Case Studies</h2>
                <p className="mt-2 text-slate-400">Real results for market-leading organizations.</p>
              </div>
              <a className="hidden md:flex items-center text-[#06B6D4] font-semibold hover:text-white transition-colors" href="#">
                View All Work <ArrowRight className="ml-1 h-5 w-5" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden rounded-xl bg-[#162447] cursor-pointer">
                <div className="aspect-video w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
                  <img src="https://picsum.photos/seed/fintech/800/450" alt="Fintech" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <PlayCircle className="h-16 w-16 text-[#06B6D4] opacity-90 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#06B6D4] transition-colors">Neobank Market Entry</h3>
                  <p className="mt-2 text-sm text-slate-400">How we architected a $10M pipeline in 6 months for a European challenger bank.</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl bg-[#162447] cursor-pointer">
                <div className="aspect-video w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
                  <img src="https://picsum.photos/seed/saas/800/450" alt="SaaS" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <PlayCircle className="h-16 w-16 text-[#06B6D4] opacity-90 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#06B6D4] transition-colors">Cloud Infrastructure Pivot</h3>
                  <p className="mt-2 text-sm text-slate-400">Repositioning a legacy provider for the AI-first enterprise market.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#050a18] border-t border-white/10 pt-16 pb-8 text-sm">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-[#2463eb] text-white text-xs font-bold">G</div>
                  <span className="font-bold text-white tracking-tighter">GTM STACK</span>
                </div>
                <p className="text-slate-500 pr-4">Designing high-velocity revenue engines for modern enterprise growth.</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-4">Expertise</h3>
                <ul className="flex flex-col gap-2 text-slate-400">
                  <li><a className="hover:text-[#06B6D4] transition-colors" href="#">Growth Strategy</a></li>
                  <li><a className="hover:text-[#06B6D4] transition-colors" href="#">Stack Audit</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-4">Industries</h3>
                <ul className="flex flex-col gap-2 text-slate-400">
                  <li><a className="hover:text-[#06B6D4] transition-colors" href="#">Enterprise SaaS</a></li>
                  <li><a className="hover:text-[#06B6D4] transition-colors" href="#">FinTech</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-4">Connect</h3>
                <div className="flex gap-4">
                  <a className="text-slate-400 hover:text-white transition-colors" href="#">LinkedIn</a>
                  <a className="text-slate-400 hover:text-white transition-colors" href="#">Twitter</a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-8 text-center text-slate-600">
              <p>© 2026 GTM STACK Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
