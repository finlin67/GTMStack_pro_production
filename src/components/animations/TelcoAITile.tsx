'use client';

import React, { useId, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  BarChart2, 
  Activity, 
  Brain, 
  Cpu, 
  Zap, 
  UserRoundSearch, 
  Network 
} from 'lucide-react';

interface MetricState {
  resolutionMultiplier: string;
  uptimeIncrease: string;
  modelDrift: string;
  optimizationScore: string;
}

export default function TelcoAITile() {
  const id = useId();
  const purpleFlowId = `purpleFlow-${id}`;
  const fadeLineId = `fadeLine-${id}`;
  const fadeGradId = `fadeGrad-${id}`;

  const [metrics, setMetrics] = useState<MetricState>({
    resolutionMultiplier: "2.7x",
    uptimeIncrease: "+30%",
    modelDrift: "0.02%",
    optimizationScore: "98.4"
  });

  // Use setTimeout for organic updates (jittery timing)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateMetrics = () => {
      setMetrics(prev => ({
        ...prev,
        resolutionMultiplier: (2.5 + Math.random() * 0.4).toFixed(1) + "x",
        modelDrift: (Math.random() * 0.05).toFixed(3) + "%",
        optimizationScore: (98 + Math.random() * 1.5).toFixed(1)
      }));

      // Random delay between 2s and 4s
      const nextDelay = 2000 + Math.random() * 2000;
      timeoutId = setTimeout(updateMetrics, nextDelay);
    };

    timeoutId = setTimeout(updateMetrics, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative w-[600px] h-[600px] bg-[#0f172a] overflow-hidden border border-purple-500/20 flex flex-col shadow-2xl font-display select-none">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.1) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <header className="h-[15%] w-full px-8 flex items-center justify-between z-50 border-b border-purple-500/10 bg-slate-950/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1973f0] to-[#a855f7] rounded flex items-center justify-center shadow-lg shadow-[#1973f0]/20">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-none">AIInTelecom</h1>
            <p className="text-[10px] text-[#a855f7] font-bold uppercase tracking-widest opacity-80 mt-1">
              Predictive Infrastructure v4.0
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1 justify-end">
            <motion.span 
              key={metrics.uptimeIncrease}
              initial={{ opacity: 0.5, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-black text-white"
            >
              {metrics.uptimeIncrease}
            </motion.span>
            <span className="text-[8px] font-bold uppercase text-[#1973f0] tracking-tighter">Uptime</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[70%] w-full relative flex flex-col items-center justify-between py-6 px-10 z-10">
        
        {/* Animated Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 600 420">
          <defs>
            <linearGradient id={purpleFlowId} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
            <mask id={fadeLineId}>
               <linearGradient id={fadeGradId} x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0" stopColor="white" stopOpacity="0"/>
                 <stop offset="0.2" stopColor="white" stopOpacity="1"/>
                 <stop offset="0.8" stopColor="white" stopOpacity="1"/>
                 <stop offset="1" stopColor="white" stopOpacity="0"/>
               </linearGradient>
               <rect x="0" y="0" width="600" height="420" fill={`url(#${fadeGradId})`}/>
            </mask>
          </defs>
          
          {/* Top Line */}
          <motion.path 
            d="M 300,50 L 300,160" 
            fill="none" 
            stroke={`url(#${purpleFlowId})`}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          
          {/* Bottom Line */}
          <motion.path 
            d="M 300,260 L 300,370" 
            fill="none" 
            stroke={`url(#${purpleFlowId})`}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </svg>

        {/* Top Nodes */}
        <section className="flex gap-4 z-10 w-full justify-center mt-2">
          {/* Node 1 */}
          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="p-3 bg-slate-900 border border-purple-500/40 rounded-lg backdrop-blur-md hover:border-purple-400 transition-colors duration-300">
              <BarChart2 className="text-purple-400 w-6 h-6" />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold group-hover:text-white/90 transition-colors">
              Subscriber Profiles
            </span>
          </div>
          
          {/* Node 2 */}
          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="p-3 bg-slate-900 border border-purple-500/40 rounded-lg backdrop-blur-md hover:border-purple-400 transition-colors duration-300">
              <Activity className="text-purple-400 w-6 h-6" />
            </div>
            <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold group-hover:text-white/90 transition-colors">
              Network Logs
            </span>
          </div>
        </section>

        {/* Center Brain/AI Core */}
        <section className="relative flex items-center justify-center z-20 my-4">
          {/* Pulse Ring 1 (Standard Tailwind) */}
          <div className="absolute w-44 h-44 rounded-full border border-purple-500/10 animate-pulse" />
          
          {/* Pulse Ring 2 (Custom Framer Motion) */}
          <motion.div 
            className="absolute w-36 h-36 rounded-full border border-purple-500/30"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [1, 0.8, 1],
              boxShadow: [
                "0 0 0 0 rgba(168, 85, 247, 0)",
                "0 0 70px 25px rgba(168, 85, 247, 0.4)",
                "0 0 0 0 rgba(168, 85, 247, 0)"
              ]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: [0.4, 0, 0.6, 1] 
            }}
          />

          {/* Core Circle */}
          <div className="w-28 h-28 bg-slate-900/80 backdrop-blur-xl border-2 border-purple-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_50px_15px_rgba(168,85,247,0.25)]">
            <Brain className="w-14 h-14 text-white" />
          </div>

          {/* Floating Chip Badge */}
          <motion.div 
            className="absolute -top-4 -right-4 p-2 bg-slate-900 border border-purple-400/50 rounded shadow-xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu className="text-purple-400 w-3 h-3" />
          </motion.div>

          {/* Floating Bolt Badge */}
          <motion.div 
            className="absolute -bottom-4 -left-4 p-2 bg-slate-900 border border-cyan-400/50 rounded shadow-xl"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Zap className="text-cyan-400 w-3 h-3" />
          </motion.div>
        </section>

        {/* Bottom Cards */}
        <section className="flex flex-col gap-3 z-10 w-full max-w-[320px]">
          {/* Card 1 */}
          <div className="flex items-center gap-4 p-3 bg-slate-950/60 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-purple-500/50 transition-all cursor-default group">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
              <UserRoundSearch className="text-purple-400 w-5 h-5" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold text-purple-400 mb-0.5">Strategy</div>
              <p className="text-[11px] font-medium leading-tight text-white/90">
                Proactive Retention Modeling & Churn Forecasting
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 p-3 bg-slate-950/60 backdrop-blur-md border border-purple-500/20 rounded-xl hover:border-purple-500/50 transition-all cursor-default group">
            <div className="w-10 h-10 rounded-lg bg-[#1973f0]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1973f0]/20 transition-colors">
              <Network className="text-[#1973f0] w-5 h-5" />
            </div>
            <div>
              <div className="text-[9px] uppercase font-bold text-[#1973f0] mb-0.5">Ops</div>
              <p className="text-[11px] font-medium leading-tight text-white/90">
                Autonomous Load Balancing & Predictive Scaling
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-[15%] w-full px-8 flex flex-col justify-center items-center gap-3 z-50 bg-slate-950/60 border-t border-purple-500/10">
        
        {/* Metric Header */}
        <div className="flex items-center gap-2">
          <motion.span 
            key={metrics.resolutionMultiplier}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          >
            {metrics.resolutionMultiplier}
          </motion.span>
          <span className="text-[10px] font-bold uppercase text-cyan-400/80 tracking-widest">
            Faster Resolution
          </span>
        </div>

        {/* Ticker Container */}
        <div className="w-full flex items-center h-7 bg-slate-950 border border-cyan-500/30 rounded overflow-hidden">
          
          {/* Live Badge */}
          <div className="flex items-center px-2 border-r border-cyan-500/20 bg-slate-900 h-full z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5 shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            <span className="text-[8px] font-mono font-bold text-cyan-400/90 tracking-tighter uppercase">
              Live
            </span>
          </div>

          {/* Marquee Area */}
          <div className="relative flex-1 h-full overflow-hidden flex items-center bg-slate-950/50">
            <div className="flex whitespace-nowrap overflow-hidden w-full">
               <motion.div 
                 className="flex gap-8 items-center text-[9px] font-mono text-cyan-200 uppercase whitespace-nowrap pl-[100%]"
                 animate={{ x: "-100%" }}
                 transition={{ 
                   repeat: Infinity, 
                   ease: "linear", 
                   duration: 25 
                 }}
               >
                 <span>Predictive Engine: Active</span>
                 <span className="opacity-30">•</span>
                 <span>Model Drift: {metrics.modelDrift}</span>
                 <span className="opacity-30">•</span>
                 <span>Auto-Remediation: Standby</span>
                 <span className="opacity-30">•</span>
                 <span>Anomaly Detected: Fixed (Node-4)</span>
                 <span className="opacity-30">•</span>
                 <span>Optimization Score: {metrics.optimizationScore}</span>
               </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlay Vignettes */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0f172a]/80 via-transparent to-[#0f172a]/60 z-0" />
      <div className="absolute inset-0 pointer-events-none border-[12px] border-[#0f172a] opacity-50 z-20" />
    </div>
  );
}