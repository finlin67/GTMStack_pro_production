'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Network, 
  BarChart3, 
  Zap, 
  Edit3, 
  Users, 
  LineChart, 
  CreditCard,
  MousePointer2,
  Eye,
  Target
} from 'lucide-react';

// --- Types ---
interface AutomationStats {
  revenue: number;
  performance: number;
  growth: number;
  status: string;
  syncTime: string;
}

// --- Sub-components (Inlined) ---

const FlowComet = ({ delay = 0 }: { delay?: number }) => (
  <motion.div 
    animate={{ 
      y: ["-10%", "110%"],
      opacity: [0, 1, 1, 0]
    }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear", delay }}
    className="absolute left-0 w-full h-32 comet-particle pointer-events-none"
  />
);

const FeatureCard = ({ icon: Icon, color, label, sub }: { icon: any, color: string, label: string, sub: string }) => (
  <motion.div 
    whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.06)' }}
    className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-3 transition-colors group cursor-pointer"
  >
    <div className={`size-7 rounded-lg bg-${color}-500/10 flex items-center justify-center shrink-0 group-hover:bg-${color}-500/20 transition-colors`}>
      <Icon className={`text-${color}-500 size-4`} />
    </div>
    <div>
      <h4 className="text-[10px] font-bold text-white uppercase tracking-tight">{label}</h4>
      <p className="text-[9px] text-slate-500 leading-tight">{sub}</p>
    </div>
  </motion.div>
);

// --- Main Component ---

export default function LiveEmailAutomation() {
  const [stats, setStats] = useState<AutomationStats>({
    revenue: 12480.00,
    performance: 94.8,
    growth: 24,
    status: 'READY',
    syncTime: '0.4s'
  });

  const updateStats = useCallback(() => {
    setStats(prev => {
      const revenueJitter = (Math.random() - 0.5) * 25;
      const performanceJitter = (Math.random() - 0.5) * 0.15;
      const syncJitter = (Math.random() * 0.5 + 0.1).toFixed(1);
      
      return {
        ...prev,
        revenue: Math.max(12000, prev.revenue + revenueJitter),
        performance: Math.min(99.9, Math.max(92, prev.performance + performanceJitter)),
        syncTime: `${syncJitter}s`
      };
    });

    const nextInterval = 1500 + Math.random() * 2000;
    const timeoutId = setTimeout(updateStats, nextInterval);
    return timeoutId;
  }, []);

  useEffect(() => {
    const timeoutId = updateStats();
    return () => clearTimeout(timeoutId);
  }, [updateStats]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full max-w-[600px] max-h-[600px] aspect-square bg-slate-900 overflow-hidden relative border border-slate-800 shadow-2xl flex flex-col p-8 font-display select-none rounded-3xl"
      >
        <div className="w-full h-full scale-[0.95] md:scale-100 origin-center flex flex-col">
          
          {/* Top Status Header */}
          <div className="absolute top-0 right-0 flex items-center gap-2 px-3 py-1 bg-green-500/5 rounded-full border border-green-500/10 z-30">
            <div className="relative flex items-center justify-center">
              <motion.div 
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.3, 1],
                  filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="size-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
              />
            </div>
            <span className="text-[9px] font-mono font-bold text-green-400 tracking-[0.1em] uppercase">Live System Active</span>
          </div>

          {/* Title Section */}
          <div className="flex flex-col gap-1 mb-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
              Email Automation <span className="text-primary">Ecosystem</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Scale Your Content Workflow</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-4 sm:gap-8 flex-1 min-h-0">
            
            {/* Flow Column */}
            <div className="col-span-7 relative flex flex-col justify-between py-2">
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] overflow-hidden rounded-full pointer-events-none">
                <div className="absolute inset-0 flow-gradient-line opacity-20" />
                <FlowComet />
                <FlowComet delay={1.5} />
              </div>

              {/* Step 01 */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="step-badge text-cyan-400 border-cyan-500/30">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="size-1 rounded-full bg-cyan-400 mr-1.5" />
                  STEP 01
                </div>
                <div className="glass-card rounded-xl p-3 shadow-xl w-full max-w-[240px] border-white/10 group transition-all duration-300 hover:border-cyan-500/30">
                  <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Mail className="size-[12px]" /> Creation
                    </span>
                    <div className="flex gap-1">
                      <motion.div animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="size-1 rounded-full bg-cyan-500" />
                    </div>
                  </div>
                  <div className="h-4 w-full bg-white/5 rounded px-2 flex items-center justify-between">
                    <span className="text-[8px] text-slate-400 tracking-tight">Template: Growth_A_V2</span>
                    <span className="text-[8px] text-cyan-500 font-mono font-bold">{stats.status}</span>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative z-10 flex flex-col items-center py-2">
                <div className="step-badge text-blue-400 border-blue-500/30">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="size-1 rounded-full bg-blue-400 mr-1.5" />
                  STEP 02
                </div>
                <div className="relative">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150" />
                  <div className="relative size-10 sm:size-12 bg-slate-900 border border-primary/50 rounded-full flex items-center justify-center glow-node z-20">
                    <Network className="text-primary size-5 sm:size-6" />
                  </div>
                </div>
                <p className="text-white text-[10px] sm:text-[11px] font-bold mt-2 tracking-wide uppercase">Audience Intelligence</p>
              </div>

              {/* Step 03 */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="step-badge text-pink-400 border-pink-500/30">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="size-1 rounded-full bg-pink-400 mr-1.5" />
                  STEP 03
                </div>
                <div className="glass-card rounded-xl p-3 shadow-xl w-full max-w-[240px] border-pink-500/20 group hover:border-pink-500/40">
                  <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                      <BarChart3 className="size-[12px]" /> Conversion
                    </span>
                    <Zap className="size-[10px] text-pink-500 fill-pink-500 animate-pulse" />
                  </div>
                  <div className="flex items-baseline gap-2 justify-center py-1">
                    <span className="text-xl font-bold text-white tracking-tight">${stats.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    <span className="text-[9px] font-bold text-green-400">+{stats.growth}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Sidebar */}
            <div className="col-span-5 flex flex-col gap-3 py-2 min-h-0">
              <FeatureCard icon={Edit3} color="cyan" label="Creative" sub="Dynamic templates." />
              <FeatureCard icon={Users} color="blue" label="Audience" sub="Behavioral groups." />
              <FeatureCard icon={LineChart} color="indigo" label="Analytics" sub="Real-time sync." />
              <FeatureCard icon={CreditCard} color="pink" label="ROI Funnel" sub="Revenue attribution." />

              <div className="mt-auto pt-4">
                <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-xl p-4 border border-primary/20 relative overflow-hidden">
                  <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute inset-0 bg-primary/10" />
                  <div className="relative z-10">
                    <div className="text-[8px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Performance Index</div>
                    <div className="text-2xl font-black text-white leading-none">
                      {stats.performance.toFixed(1)}
                      <span className="text-xs font-normal text-slate-500 ml-1">/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-8 border-t border-white/5 pt-5 flex justify-between items-center px-1">
            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
              {[
                { color: 'cyan', label: 'Routing', icon: MousePointer2 },
                { color: 'blue', label: 'Tracking', icon: Eye },
                { color: 'pink', label: 'Conversion', icon: Target }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                  <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: idx * 0.4 }} className={`size-1.5 rounded-full bg-${item.color}-400`} />
                  <span className="text-[7px] sm:text-[8px] uppercase font-bold text-slate-500 tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 rounded-full border border-green-500/20">
              <div className="size-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[8px] sm:text-[9px] font-bold text-green-500 tracking-tighter uppercase whitespace-nowrap">Live {stats.syncTime}</span>
            </div>
          </div>
        </div>

        {/* Decor */}
        <div className="absolute -bottom-20 -right-20 size-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -top-20 -left-20 size-64 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
}
