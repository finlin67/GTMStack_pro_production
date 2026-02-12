'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ArrowUpRight, 
  Zap, 
  Cpu, 
  Globe, 
  TrendingUp, 
  Target, 
  Lock,
  Server,
  type LucideIcon
} from 'lucide-react';

interface MetricStat {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  trend: string;
}

/**
 * NGOSDOTile
 * A 600x600 Dashboard Tile Component.
 * Features a vertical layout hierarchy: Header -> Hero Visualization -> Stacked Metrics -> Footer.
 */
export default function NGOSDOTile() {
  const [activeStatIndex, setActiveStatIndex] = useState<number>(0);

  // Auto-cycle the active stat highlight for monitoring effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats: MetricStat[] = [
    { 
      id: 'retention',
      label: "Donor Retention", 
      value: "+47%", 
      icon: TrendingUp, 
      color: "text-[#D62828]", 
      bg: "bg-[#D62828]",
      trend: "Rising" 
    },
    { 
      id: 'ltv',
      label: "Lifetime Value", 
      value: "3.1x", 
      icon: Target, 
      color: "text-[#F77F00]", 
      bg: "bg-[#F77F00]",
      trend: "Stable" 
    },
    { 
      id: 'velocity',
      label: "Impact Velocity", 
      value: "98.4%", 
      icon: Zap, 
      color: "text-emerald-600", 
      bg: "bg-emerald-600",
      trend: "Peak" 
    }
  ];

  return (
    <div className="relative w-full max-w-[600px] aspect-square mx-auto rounded-[2.5rem] overflow-hidden bg-white flex flex-col font-sans group shadow-2xl border border-gray-100 ring-1 ring-gray-900/5">
      {/* --- BACKGROUND FX --- */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-[#D62828]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#F77F00]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* --- HEADER (Top 15%) --- */}
      <div className="relative h-[15%] shrink-0 flex items-center justify-between px-8 border-b border-gray-100 bg-white/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-gradient-to-br from-[#D62828] to-[#b91c1c] text-white rounded-xl shadow-lg shadow-[#D62828]/20">
            <Cpu size={18} strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-black text-[#1a1a1a] uppercase tracking-wider leading-none mb-1">Impact OS</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400">v4.2.0 Stable</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
          <Server size={12} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-500 tracking-wide uppercase">US-EAST-1</span>
        </div>
      </div>

      {/* --- MAIN CONTENT (Flex Grow) --- */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Connecting Line (Vertical Flow) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-100 via-[#D62828]/20 to-transparent -translate-x-1/2 z-0" />

        {/* --- HERO SECTION (Optical Center) --- */}
        <div className="flex-1 flex items-center justify-center py-4 relative z-10">
          <div className="relative w-[260px] h-[260px]">
            {/* SVG Visualization */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 300">
              <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D62828" />
                  <stop offset="50%" stopColor="#F77F00" />
                  <stop offset="100%" stopColor="#D62828" />
                </linearGradient>
                <filter id="glowFilter">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background Track */}
              <circle cx="150" cy="150" r="110" fill="none" stroke="#f3f4f6" strokeWidth="16" />
              <circle cx="150" cy="150" r="110" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />

              {/* Active Arc Animation */}
              <motion.path
                d="M 150 40 A 110 110 0 1 1 40 150" 
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                filter="url(#glowFilter)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 0.75, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              />

              {/* Orbiting Particle */}
              <motion.g 
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ originX: "150px", originY: "150px" }}
              >
                {/* Wrapped in a group to handle hover scaling relative to the particle's own center */}
                <motion.g
                  whileHover={{ scale: 1.5 }}
                  style={{ originX: "150px", originY: "40px", cursor: "pointer" }}
                >
                  <circle cx="150" cy="40" r="6" fill="white" stroke="#D62828" strokeWidth="3" />
                  <motion.circle 
                    cx="150" 
                    cy="40" 
                    r="12" 
                    fill="none" 
                    stroke="#D62828" 
                    strokeWidth="1" 
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.6, strokeWidth: 2 }}
                  />
                </motion.g>
              </motion.g>

              {/* Inner Pulsing Circle */}
              <motion.circle 
                cx="150" 
                cy="150" 
                r="60" 
                fill="#D62828" 
                fillOpacity="0.03"
                animate={{ r: [60, 65, 60], opacity: [0.03, 0.08, 0.03] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Central Metric */}
              <foreignObject x="50" y="50" width="200" height="200">
                <div className="w-full h-full flex flex-col items-center justify-center pt-2">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <Activity size={28} className="text-[#D62828] mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <h1 className="text-5xl font-black text-[#1a1a1a] tracking-tighter leading-none">4.2x</h1>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2 group-hover:text-[#D62828] transition-colors">Multiplier</span>
                  </motion.div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </div>

        {/* --- STACKED DATA CARDS (Secondary Grouping) --- */}
        <div className="px-6 pb-6 flex flex-col gap-2.5 z-10 w-full max-w-[400px] mx-auto">
          {stats.map((stat, index) => {
            const isActive = activeStatIndex === index;
            return (
              <motion.div
                key={stat.id}
                layout
                initial={false}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  opacity: isActive ? 1 : 0.7,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(249, 250, 251, 0.6)'
                }}
                className={`group relative flex items-center justify-between p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isActive ? 'border-[#D62828]/20 shadow-xl shadow-[#D62828]/5' : 'border-transparent hover:bg-white hover:opacity-100'
                }`}
                onClick={() => setActiveStatIndex(index)}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div 
                    layoutId="activeBar"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-[#D62828] rounded-r-full" 
                  />
                )}

                <div className="flex items-center gap-3 pl-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${stat.bg} text-white shadow-sm`}>
                    <stat.icon size={14} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-tight">{stat.label}</span>
                    <span className={`text-lg font-bold leading-none ${stat.color} tracking-tight`}>{stat.value}</span>
                  </div>
                </div>

                <div className="pr-2">
                  <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${isActive ? 'bg-gray-100 text-gray-600' : 'bg-transparent text-gray-400'}`}>
                    {stat.trend}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                        >
                          <ArrowUpRight size={10} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- FOOTER (Bottom 15%) --- */}
      <div className="h-[15%] shrink-0 flex items-center justify-between px-8 border-t border-gray-100 bg-gray-50/50 backdrop-blur-sm text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        <div className="flex items-center gap-2 group cursor-help">
          <Globe size={14} className="text-gray-300 group-hover:text-[#D62828] transition-colors" />
          <span>Global Node</span>
        </div>
        <div className="flex items-center gap-2 group cursor-help">
          <Lock size={14} className="text-gray-300 group-hover:text-[#F77F00] transition-colors" />
          <span>E2E Encrypted</span>
        </div>
      </div>
    </div>
  );
}