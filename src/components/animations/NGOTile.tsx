'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap,
  Cpu,
  Globe,
  TrendingUp,
  Target,
  Wifi,
  Server
} from 'lucide-react';

interface StatMetric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  sub: string;
}

/**
 * NGOTile
 * High-fidelity dashboard tile redesigned for a 1:1 aspect ratio (600x600).
 * Features vertical stacking, optical centering of the hero graphic, and strict section proportions.
 */
export default function NGOTile() {
  const [activeStat, setActiveStat] = useState<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stats Data
  const stats: StatMetric[] = [
    { label: "Donor Retention", value: "+47%", icon: TrendingUp, color: "text-[#D62828]", bg: "bg-[#D62828]", sub: "+12% Momentum" },
    { label: "Lifetime Value", value: "3.1x", icon: Target, color: "text-[#F77F00]", bg: "bg-[#F77F00]", sub: "Growth Peak" },
    { label: "Impact Velocity", value: "98.4%", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-600", sub: "High Urgency" }
  ];

  // Auto-cycle the active stat highlight with organic jitter
  useEffect(() => {
    const cycle = () => {
      setActiveStat((prev) => (prev + 1) % stats.length);
      // Add random jitter between 0-800ms to feel more organic/processing-like
      const jitter = Math.random() * 800;
      timeoutRef.current = setTimeout(cycle, 3500 + jitter);
    };

    timeoutRef.current = setTimeout(cycle, 3500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [stats.length]);

  return (
    <div className="relative w-full h-full bg-white flex flex-col font-sans group select-none rounded-[32px] overflow-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      {/* Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      {/* Ambient Gradients - Adjusted for vertical flow */}
      <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-[#D62828]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#F77F00]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- HEADER (12%) --- */}
      <div className="h-[12%] shrink-0 flex items-center justify-between px-8 border-b border-gray-100/80 bg-white/60 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="relative group/icon">
            <div className="p-2.5 bg-[#D62828] text-white rounded-xl shadow-lg shadow-[#D62828]/25 relative z-10">
              <Cpu size={20} strokeWidth={2.5} />
            </div>
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[#D62828] blur-lg rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-black text-[#1a1a1a] uppercase tracking-wider leading-none mb-1">Impact OS</h3>
            <div className="flex items-center gap-1.5">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
               <span className="text-[10px] font-bold text-gray-400 tracking-tight">v4.2.0 Stable</span>
            </div>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm backdrop-blur-sm">
           <Wifi size={12} className="text-emerald-500" />
           <span className="text-[10px] font-bold text-gray-500 tracking-wide uppercase">Connected</span>
        </div>
      </div>

      {/* --- MIDDLE SECTION (Flex Grow - Contains Hero & Cards) --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        
        {/* Grid Overlay for Tech Feel */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <div className="w-full h-px bg-black/50 absolute top-1/2 -translate-y-1/2"></div>
            <div className="h-full w-px bg-black/50 absolute left-1/2 -translate-x-1/2"></div>
        </div>

        {/* --- HERO GRAPHIC (Optical Center of available space) --- */}
        <div className="flex-1 flex items-center justify-center min-h-0 py-2">
          {/* Increased size to 280px to fill the space better */}
          <div className="relative w-[280px] h-[280px]">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 300">
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D62828" />
                  <stop offset="100%" stopColor="#F77F00" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Base Rings */}
              <circle cx="150" cy="150" r="120" fill="none" stroke="#f3f4f6" strokeWidth="20" />
              <circle cx="150" cy="150" r="120" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              
              {/* Inner Ticks Ring */}
              <circle cx="150" cy="150" r="90" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2 6" opacity="0.8" />

              {/* Dynamic Progress Arc */}
              <motion.path
                d="M 150 30 A 120 120 0 0 1 253.9 90"
                fill="none"
                stroke="url(#heroGradient)"
                strokeWidth="20"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
              />

              {/* Active Data Point on Arc */}
              <motion.circle 
                cx="253.9" cy="90" r="7" fill="white" stroke="#F77F00" strokeWidth="3"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 1.6, duration: 0.5 }}
              />

              {/* Orbiting Satellite Element */}
              <motion.g 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ originX: "150px", originY: "150px" }}
              >
                <g transform="translate(150, 50)">
                   <circle r="4" fill="#1a1a1a" />
                   <circle r="14" fill="none" stroke="#1a1a1a" strokeWidth="1" opacity="0.15" />
                </g>
              </motion.g>

              {/* Central Metric */}
              <foreignObject x="50" y="50" width="200" height="200">
                <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-center"
                  >
                     <div className="flex items-center gap-1.5 mb-2 bg-[#D62828]/10 px-2 py-0.5 rounded-full border border-[#D62828]/20">
                        <Activity size={12} className="text-[#D62828]" />
                        <span className="text-[9px] font-bold text-[#D62828] uppercase tracking-wider">Live Metric</span>
                     </div>
                     <span className="text-6xl font-black text-[#1a1a1a] tracking-tighter leading-[0.9]">4.2x</span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mt-1 text-center">Impact<br/>Multiplier</span>
                  </motion.div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        {/* --- VERTICAL STACKED CARDS --- */}
        <div className="px-8 pb-8 flex flex-col gap-3 shrink-0">
          {stats.map((stat, index) => {
            const isActive = activeStat === index;
            return (
              <motion.div
                key={stat.label}
                layout
                initial={false}
                animate={{
                   backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(249, 250, 251, 0.4)',
                   borderColor: isActive ? 'rgba(214, 40, 40, 0.15)' : 'transparent',
                   y: isActive ? 0 : 0,
                   scale: isActive ? 1.02 : 1,
                }}
                className={`relative flex items-center justify-between p-3 rounded-xl border transition-all ${isActive ? 'shadow-xl shadow-gray-200/60 z-10' : 'border-transparent z-0'}`}
              >
                {/* Active Indicator Bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlowBar"
                      initial={{ opacity: 0, height: '0%' }}
                      animate={{ opacity: 1, height: '60%' }}
                      exit={{ opacity: 0, height: '0%' }}
                      className="absolute left-0 top-[20%] w-[3px] bg-[#D62828] rounded-r-full" 
                    />
                  )}
                </AnimatePresence>
                
                <div className="flex items-center gap-3 pl-2">
                  <div className={`p-2 rounded-lg text-white shadow-sm ${stat.bg}`}>
                    <stat.icon size={16} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                      <span className={`text-[11px] font-bold uppercase tracking-wide ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                        {stat.label}
                      </span>
                      <AnimatePresence mode="wait">
                        {isActive && (
                            <motion.span 
                                initial={{ opacity: 0, height: 0, y: -5 }} 
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -5 }}
                                className="text-[10px] text-[#D62828] font-semibold"
                            >
                                {stat.sub}
                            </motion.span>
                        )}
                      </AnimatePresence>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-black tracking-tight ${stat.color}`}>{stat.value}</span>
                  <ArrowUpRight size={14} className={isActive ? "text-[#D62828] opacity-100" : "text-gray-300 opacity-50"} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- FOOTER (12%) --- */}
      <div className="h-[12%] shrink-0 flex items-center justify-between px-8 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm text-[10px] font-bold text-gray-400 uppercase tracking-wider relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 hover:text-gray-600 transition-colors cursor-help">
             <Globe size={12} className="text-gray-400" />
             <span>US-EAST-1</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1.5 hover:text-gray-600 transition-colors cursor-help">
             <Server size={12} className="text-gray-400" />
             <span>99.9% Uptime</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded-md shadow-sm">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span className="text-emerald-700">Encrypted</span>
        </div>

        {/* Decorative bottom progress line */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-gray-100 w-full overflow-hidden">
            <motion.div 
                className="h-full bg-gradient-to-r from-[#D62828] to-[#F77F00]" 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
        </div>
      </div>
    </div>
  );
}