
'use client'; // <--- THIS MUST BE THE FIRST LINE
import React from "react";
import { 
  Layers, 
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

const industriesData = [
  { id: "saas", name: "SaaS & Software", desc: "Scaling recurring revenue through optimized digital experiences.", icon: Database },
  { id: "fintech", name: "FinTech & Banking", desc: "Building trust and accelerating user acquisition in secure markets.", icon: LineChart },
  { id: "healthcare", name: "Healthcare & Life Sciences", desc: "Connecting patients and providers with compliant, clear messaging.", icon: Network },
  { id: "manufacturing", name: "Manufacturing & Logistics", desc: "Modernizing legacy sales motions into digital growth engines.", icon: Layers },
];

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const challenges = [
    { title: "Market Saturation", desc: "Breaking through the noise in overcrowded digital landscapes.", icon: ZapOff },
    { title: "Long Sales Cycles", desc: "Maintaining momentum across complex multi-stakeholder journeys.", icon: Timer },
    { title: "Data Silos", desc: "Unifying fragmented insights into actionable GTM strategies.", icon: Database },
    { title: "Brand Dilution", desc: "Ensuring consistency across global, multi-channel operations.", icon: Palette },
    { title: "Low Conversion", desc: "Optimizing touchpoints to turn passive interest into revenue.", icon: TrendingUp },
  ];

  return (
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
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 right-12 p-5 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-indigo-500/30 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Network className="text-indigo-400 h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Connected GTM</p>
                  <p className="text-lg font-black text-white">Unified</p>
                </div>
              </div>
            </div>
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
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.title} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-14 w-14 rounded-xl bg-cyan-50 flex items-center justify-center mb-6 text-cyan-600">
                  <challenge.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{challenge.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            ))}
          </div>
        </div>
      </section>

      {/* Proof Strip */}
      <div className="w-full bg-indigo-50 border-y border-indigo-100 py-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-indigo-200">
          <div className="flex flex-col gap-2 px-4">
            <p className="text-6xl lg:text-7xl font-black text-indigo-600 tracking-tighter">343%</p>
            <p className="text-slate-800 font-black uppercase tracking-widest text-sm mt-2">Engagement Lift</p>
            <p className="text-slate-500 text-sm font-medium">Average across SaaS clients</p>
          </div>
          <div className="flex flex-col gap-2 px-4 pt-12 md:pt-0">
            <p className="text-6xl lg:text-7xl font-black text-emerald-500 tracking-tighter">4.2x</p>
            <p className="text-slate-800 font-black uppercase tracking-widest text-sm mt-2">Content ROI</p>
            <p className="text-slate-500 text-sm font-medium">Attributed revenue growth</p>
          </div>
          <div className="flex flex-col gap-2 px-4 pt-12 md:pt-0">
            <p className="text-6xl lg:text-7xl font-black text-cyan-500 tracking-tighter">180%</p>
            <p className="text-slate-800 font-black uppercase tracking-widest text-sm mt-2">Market Reach</p>
            <p className="text-slate-500 text-sm font-medium">Organic authority expansion</p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
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
              <p className="text-sm text-slate-500">Validated across 50+ enterprise deployments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
                  <Layers className="text-white h-6 w-6" />
                </div>
                <span className="text-white font-black text-2xl tracking-tighter uppercase">GTM STACK</span>
              </div>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed font-light">
                The global design system for high-velocity revenue engines. We combine data science with architectural strategy to build the future of GTM.
              </p>
              <div className="flex gap-6 mt-10">
                {[Globe, Mail, Share2, Network].map((Icon, i) => (
                  <a key={i} href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest mb-8 text-sm">Expertise</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                {["Content Strategy", "Revenue Ops", "Demand Gen", "Brand Systems", "Data Science"].map((item) => (
                  <li key={item}><a className="hover:text-cyan-400 transition-colors" href="#">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase tracking-widest mb-8 text-sm">Company</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                {["About GTM", "Our Process", "Careers", "Contact", "Privacy"].map((item) => (
                  <li key={item}><a className="hover:text-cyan-400 transition-colors" href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 text-sm font-medium">© 2026 GTM STACK Global. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">Terms</a>
              <a href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">Cookies</a>
              <a href="#" className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}