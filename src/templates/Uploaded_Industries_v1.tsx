<<<<<<< HEAD
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { 
  Layers, 
  Menu, 
  Cloud, 
  Building2, 
  Stethoscope, 
  Shield, 
  ShoppingCart, 
  Factory, 
  Truck, 
  Briefcase, 
=======

'use client'; // <--- THIS MUST BE THE FIRST LINE
import React from "react";
import { 
  Layers, 
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
  ZapOff, 
  Timer, 
  Database, 
  Palette, 
  TrendingUp, 
  LineChart, 
  Network, 
  BadgeCheck, 
  Quote, 
  ExternalLink, 
  ArrowRight, 
  Globe, 
  Mail, 
  Share2 
} from "lucide-react";

<<<<<<< HEAD
interface TemplateProps {
  content?: unknown;
  pageTitle?: string;
}

export default function Template(props: TemplateProps) {
  const pageTitle = props.pageTitle || "GTM STACK - Expertise";

  const industries = [
    { name: "Enterprise SaaS", icon: Cloud, desc: "Scaling complex GTM motions for high-growth software platforms." },
    { name: "FinTech", icon: Building2, desc: "Navigating regulatory landscapes with trust-driven narrative engines." },
    { name: "HealthTech", icon: Stethoscope, desc: "Connecting providers and patients through precision digital experiences." },
    { name: "Cybersecurity", icon: Shield, desc: "Positioning authority in high-stakes environments with technical storytelling." },
    { name: "E-commerce", icon: ShoppingCart, desc: "Driving conversion and retention through omnichannel engagement systems." },
    { name: "Manufacturing", icon: Factory, desc: "Modernizing legacy sales cycles with digital-first demand generation." },
    { name: "Logistics", icon: Truck, desc: "Optimizing supply chain visibility through connected content ecosystems." },
    { name: "Professional Services", icon: Briefcase, desc: "Productizing expertise to scale high-value consulting and agency models." },
  ];

=======
const industriesData = [
  { id: "saas", name: "SaaS & Software", desc: "Scaling recurring revenue through optimized digital experiences.", icon: Database },
  { id: "fintech", name: "FinTech & Banking", desc: "Building trust and accelerating user acquisition in secure markets.", icon: LineChart },
  { id: "healthcare", name: "Healthcare & Life Sciences", desc: "Connecting patients and providers with compliant, clear messaging.", icon: Network },
  { id: "manufacturing", name: "Manufacturing & Logistics", desc: "Modernizing legacy sales motions into digital growth engines.", icon: Layers },
];

export default function Template(props: { content?: unknown; pageTitle?: string }) {
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
  const challenges = [
    { title: "Market Saturation", desc: "Breaking through the noise in overcrowded digital landscapes.", icon: ZapOff },
    { title: "Long Sales Cycles", desc: "Maintaining momentum across complex multi-stakeholder journeys.", icon: Timer },
    { title: "Data Silos", desc: "Unifying fragmented insights into actionable GTM strategies.", icon: Database },
    { title: "Brand Dilution", desc: "Ensuring consistency across global, multi-channel operations.", icon: Palette },
    { title: "Low Conversion", desc: "Optimizing touchpoints to turn passive interest into revenue.", icon: TrendingUp },
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0B132B] text-white font-sans selection:bg-[#06B6D4] selection:text-white antialiased overflow-x-hidden">
      {/* Inline Styles for Gradients and Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-gradient-cyan-blue {
          background: linear-gradient(135deg, #06B6D4 0%, #2463eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#0B132B]/95 backdrop-blur px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-[#2463eb] to-[#162447]">
            <Layers className="text-white size-5" />
          </div>
          <h2 className="text-white text-lg font-bold tracking-tight uppercase">GTM STACK</h2>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          {["Home", "Methodology", "Expertise", "Projects", "Industries", "About", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium transition-colors ${
                item === "Expertise" ? "text-white border-b-2 border-[#06B6D4] pb-0.5" : "text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <button className="hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-[#06B6D4] hover:bg-cyan-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all transform hover:scale-105">
          Get Audited
        </button>
        <button className="lg:hidden text-white">
          <Menu className="size-6" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative w-full py-24 lg:py-40 px-6 lg:px-20 overflow-hidden bg-[#0B132B]">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'conic-gradient(from 90deg at 50% 50%, #0B132B 0%, #1c2a4a 50%, #0B132B 100%)' }}></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#2463eb]/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 w-fit">
              <span className="size-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
              <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-widest">Expertise: Demand & Growth</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight text-white">
              {pageTitle.split(' - ')[1] || "Demand Growth"} <br />
              <span className="text-gradient-cyan-blue">& Engagement</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-xl leading-relaxed">
              Storytelling engines that build trust, demand, and lifetime value. We re-engineer how your brand speaks to the market.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center justify-center h-14 px-10 rounded-xl bg-[#2463eb] hover:bg-blue-700 text-white font-bold transition-all shadow-xl shadow-blue-500/20 group">
                <span>Explore Methodology</span>
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center h-14 px-10 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold transition-all">
                Request Audit
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-3xl bg-[#162447]/30 backdrop-blur-md group"
          >
            <img 
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" 
              alt="Digital connectivity"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent"></div>
            
            <div className="absolute top-12 left-12 p-5 bg-[#162447]/90 backdrop-blur-xl rounded-2xl border border-[#06B6D4]/30 shadow-2xl animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-[#06B6D4]/20 flex items-center justify-center">
                  <LineChart className="text-[#06B6D4] size-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Engagement</p>
                  <p className="text-lg font-black text-white">+343%</p>
=======
    <div className="min-h-screen bg-slate-900 selection:bg-cyan-500 selection:text-white font-sans">
      {/* Hero Section */}
      <section className="relative w-full py-24 lg:py-40 px-6 lg:px-20 overflow-hidden bg-slate-900">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 w-fit">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Industry Expertise</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight text-white">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400">Growth by Industry</span>
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-xl leading-relaxed">
              We don't just build marketing campaigns; we engineer revenue systems tailored to the unique physics of your specific market.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center justify-center h-14 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-xl shadow-indigo-500/20 group">
                <span>Explore Industries</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center h-14 px-10 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold transition-all">
                Request Industry Audit
              </button>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/50 backdrop-blur-md group">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="Global connectivity"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            
            {/* Floating Badges */}
            <div className="absolute top-12 left-12 p-5 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-cyan-500/30 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <LineChart className="text-cyan-400 h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Market Velocity</p>
                  <p className="text-lg font-black text-white">+124%</p>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="absolute bottom-20 right-12 p-5 bg-[#162447]/90 backdrop-blur-xl rounded-2xl border border-[#2463eb]/30 shadow-2xl animate-pulse-slow">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-[#2463eb]/20 flex items-center justify-center">
                  <Network className="text-[#2463eb] size-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Connected</p>
=======
            <div className="absolute bottom-20 right-12 p-5 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-indigo-500/30 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Network className="text-indigo-400 h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Connected GTM</p>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
                  <p className="text-lg font-black text-white">Unified</p>
                </div>
              </div>
            </div>
<<<<<<< HEAD
          </motion.div>
        </div>
      </section>

      {/* Challenges Section - Light Mode */}
      <section className="py-24 lg:py-32 px-6 bg-[#F1F4F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-[#0B132B] tracking-tight mb-6">
              Solving GTM <span className="text-[#2463eb]">Friction</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              We identify and eliminate the architectural bottlenecks that prevent your brand from scaling its narrative.
=======
          </div>
        </div>
      </section>

      {/* Challenges Section - Light Balance */}
      <section className="py-24 lg:py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Solving Industry-Specific <span className="text-indigo-600">Challenges</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Every industry has its own friction points. We identify and eliminate them through data-driven architectural shifts.
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
<<<<<<< HEAD
            {challenges.map((challenge, idx) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="size-14 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center mb-6 text-[#06B6D4] transition-colors">
                  <challenge.icon className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B132B] mb-3">{challenge.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{challenge.desc}</p>
              </motion.div>
=======
            {challenges.map((challenge) => (
              <div key={challenge.title} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-14 w-14 rounded-xl bg-cyan-50 flex items-center justify-center mb-6 text-cyan-600">
                  <challenge.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{challenge.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{challenge.desc}</p>
              </div>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Expertise Grid Section - Dark Mode */}
      <section className="py-24 lg:py-32 px-6 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
                Specialized <span className="text-gradient-cyan-blue">Verticals</span>
              </h2>
              <p className="text-lg text-gray-400 font-light">
                Deep expertise across the most competitive sectors in the global economy.
              </p>
            </div>
            <a href="#" className="text-[#06B6D4] hover:text-cyan-400 font-bold flex items-center gap-2 group">
              View All Industries
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
=======
      {/* Industries Grid Section - Bright/Clean Mode */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
                Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Verticals</span>
              </h2>
              <p className="text-lg text-slate-600 font-light">
                Deep expertise across the most competitive sectors in the global economy.
              </p>
            </div>
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-bold flex items-center gap-2 group">
              View All Industries
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<<<<<<< HEAD
            {industries.map((industry, idx) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative p-8 rounded-2xl bg-[#162447]/50 backdrop-blur-sm border border-white/5 hover:border-[#06B6D4]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
              >
                <div className="size-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-[#06B6D4] group-hover:scale-110 transition-transform">
                  <industry.icon className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#06B6D4] transition-colors">{industry.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{industry.desc}</p>
                <div className="mt-6 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    Case Study <ExternalLink className="size-3" />
                  </span>
                </div>
              </motion.div>
=======
            {industriesData.map((industry) => (
              <a key={industry.id} href={`/industry/${industry.id}`} className="group relative h-full p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden block">
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 group-hover:text-emerald-500 transition-all">
                    <industry.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{industry.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{industry.desc}</p>
                  <div className="mt-6 pt-6 border-t border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                      Case Study <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </a>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Proof Strip - Light Mode */}
      <div className="w-full bg-[#E8EDF4] border-y border-slate-200 py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-300">
          <div className="flex flex-col gap-2 px-4">
            <p className="text-6xl lg:text-7xl font-black text-[#2463eb] tracking-tighter">343%</p>
=======
      {/* Proof Strip */}
      <div className="w-full bg-indigo-50 border-y border-indigo-100 py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-200">
          <div className="flex flex-col gap-2 px-4">
            <p className="text-6xl lg:text-7xl font-black text-indigo-600 tracking-tighter">343%</p>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            <p className="text-slate-800 font-black uppercase tracking-widest text-sm mt-2">Engagement Lift</p>
            <p className="text-slate-500 text-sm font-medium">Average across SaaS clients</p>
          </div>
          <div className="flex flex-col gap-2 px-4 pt-12 md:pt-0">
<<<<<<< HEAD
            <p className="text-6xl lg:text-7xl font-black text-[#2463eb] tracking-tighter">4.2x</p>
=======
            <p className="text-6xl lg:text-7xl font-black text-emerald-500 tracking-tighter">4.2x</p>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            <p className="text-slate-800 font-black uppercase tracking-widest text-sm mt-2">Content ROI</p>
            <p className="text-slate-500 text-sm font-medium">Attributed revenue growth</p>
          </div>
          <div className="flex flex-col gap-2 px-4 pt-12 md:pt-0">
<<<<<<< HEAD
            <p className="text-6xl lg:text-7xl font-black text-[#2463eb] tracking-tighter">180%</p>
=======
            <p className="text-6xl lg:text-7xl font-black text-cyan-500 tracking-tighter">180%</p>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            <p className="text-slate-800 font-black uppercase tracking-widest text-sm mt-2">Market Reach</p>
            <p className="text-slate-500 text-sm font-medium">Organic authority expansion</p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
<<<<<<< HEAD
      <section className="py-24 lg:py-40 px-6 bg-[#F1F4F8] text-center">
        <div className="max-w-4xl mx-auto">
          <Quote className="size-20 text-slate-200 mx-auto mb-8" />
          <h2 className="text-4xl lg:text-6xl font-black text-[#0B132B] leading-[1.1] tracking-tight">
            Content isn’t filler — it’s <span className="text-gradient-cyan-blue">engineered connection.</span>
          </h2>
          <p className="mt-10 text-slate-600 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            In a world of noise, signal is the only currency. We apply rigorous data science to the art of storytelling to ensure every piece of content performs a specific revenue function.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="size-14 rounded-full bg-[#2463eb]/10 flex items-center justify-center">
              <BadgeCheck className="text-[#2463eb] size-8" />
            </div>
            <div className="text-left">
              <p className="font-black text-[#0B132B] uppercase tracking-tighter">GTM STACK Methodology</p>
=======
      <section className="py-24 lg:py-40 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <Quote className="h-20 w-20 text-slate-200 mx-auto mb-8" />
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Industry expertise isn't a checkbox — it's the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">foundation of signal.</span>
          </h2>
          <p className="mt-10 text-slate-600 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            In specialized markets, generic strategies are noise. We apply rigorous architectural principles to ensure your GTM motion resonates with the specific frequency of your buyers.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-14 w-14 rounded-full bg-emerald-50 flex items-center justify-center">
              <BadgeCheck className="text-emerald-500 h-8 w-8" />
            </div>
            <div className="text-left">
              <p className="font-black text-slate-900 uppercase tracking-tighter">GTM STACK Methodology</p>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
              <p className="text-sm text-slate-500">Validated across 50+ enterprise deployments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
<<<<<<< HEAD
      <section className="py-24 lg:py-32 px-6 bg-[#0B132B] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-30"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tight">
            Ready to Build Your <br /> <span className="text-[#06B6D4]">Narrative Engine?</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-light">
            Stop publishing noise. Start engineering growth with a GTM system built for the modern enterprise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-[#06B6D4] hover:bg-cyan-600 text-white font-black text-xl transition-all shadow-2xl shadow-cyan-500/40 transform hover:scale-105">
              Schedule Audit
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center h-16 px-12 rounded-2xl border border-white/20 hover:bg-white/5 text-white font-bold text-lg transition-all">
=======
      <section className="py-24 lg:py-32 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 tracking-tight">
            Ready to Architect Your <br /> <span className="text-cyan-400">Industry Dominance?</span>
          </h2>
          <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto font-light">
            Stop publishing noise. Start engineering growth with a GTM system built for your specific market physics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto inline-flex items-center justify-center h-16 px-12 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black text-xl transition-all shadow-xl shadow-cyan-500/20">
              Schedule Industry Audit
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center h-16 px-12 rounded-2xl border border-white/20 hover:bg-white/10 text-white font-bold text-lg transition-all">
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
<<<<<<< HEAD
      <footer className="bg-[#0B132B] border-t border-white/10 pt-24 pb-12 px-8">
=======
      <footer className="bg-slate-950 border-t border-white/10 pt-24 pb-12 px-8">
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
<<<<<<< HEAD
                <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-[#2463eb] to-[#162447]">
                  <Layers className="text-white size-6" />
                </div>
                <span className="text-white font-black text-2xl tracking-tighter uppercase">GTM STACK</span>
              </div>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed font-light">
=======
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
                  <Layers className="text-white h-6 w-6" />
                </div>
                <span className="text-white font-black text-2xl tracking-tighter uppercase">GTM STACK</span>
              </div>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed font-light">
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
                The global design system for high-velocity revenue engines. We combine data science with architectural strategy to build the future of GTM.
              </p>
              <div className="flex gap-6 mt-10">
                {[Globe, Mail, Share2, Network].map((Icon, i) => (
<<<<<<< HEAD
                  <a key={i} href="#" className="text-gray-500 hover:text-[#06B6D4] transition-colors">
                    <Icon className="size-6" />
=======
                  <a key={i} href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                    <Icon className="h-6 w-6" />
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest mb-8 text-sm">Expertise</h4>
<<<<<<< HEAD
              <ul className="space-y-4 text-gray-400 font-medium">
                {["Content Strategy", "Revenue Ops", "Demand Gen", "Brand Systems", "Data Science"].map((item) => (
                  <li key={item}><a className="hover:text-[#06B6D4] transition-colors" href="#">{item}</a></li>
=======
              <ul className="space-y-4 text-slate-400 font-medium">
                {["Content Strategy", "Revenue Ops", "Demand Gen", "Brand Systems", "Data Science"].map((item) => (
                  <li key={item}><a className="hover:text-cyan-400 transition-colors" href="#">{item}</a></li>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest mb-8 text-sm">Company</h4>
<<<<<<< HEAD
              <ul className="space-y-4 text-gray-400 font-medium">
                {["About GTM", "Our Process", "Careers", "Contact", "Privacy"].map((item) => (
                  <li key={item}><a className="hover:text-[#06B6D4] transition-colors" href="#">{item}</a></li>
=======
              <ul className="space-y-4 text-slate-400 font-medium">
                {["About GTM", "Our Process", "Careers", "Contact", "Privacy"].map((item) => (
                  <li key={item}><a className="hover:text-cyan-400 transition-colors" href="#">{item}</a></li>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
<<<<<<< HEAD
            <p className="text-gray-500 text-sm font-medium">© 2026 GTM STACK Global. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest">Cookies</a>
              <a href="#" className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest">Security</a>
=======
            <p className="text-slate-500 text-sm font-medium">© 2026 GTM STACK Global. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">Terms</a>
              <a href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">Cookies</a>
              <a href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">Security</a>
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> adcfd3e9eb8acc6351130debd6a19055607a9837
