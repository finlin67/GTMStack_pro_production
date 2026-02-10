'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { Database, Award, TrendingUp, Zap, ArrowRight } from 'lucide-react';

// --- Interfaces ---

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  toFixed?: number;
  prefix?: string;
  suffix?: string;
}

// --- Helper Components ---

/**
 * AnimatedCounter
 * Animates a number from 0 to 'value' over 'duration'.
 */
function AnimatedCounter({ 
  value, 
  duration = 2, 
  toFixed = 0,
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const count = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const rounded = useTransform(count, (latest) => `${prefix}${latest.toFixed(toFixed)}${suffix}`);
  const [displayValue, setDisplayValue] = useState<string>(`${prefix}0${suffix}`);

  useEffect(() => {
    const animation = animate(count, value, { duration });
    return animation.stop;
  }, [value, duration, count]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplayValue(v));
  }, [rounded]);

  return <span>{displayValue}</span>;
}

// --- Main Component ---

export default function ABMPipeTrackerTile() {
  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-[600px] h-[600px] bg-[#020617] rounded-xl border border-[#eab308]/15 shadow-2xl flex flex-col justify-between p-12 overflow-hidden"
      >
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#eab308]/5 blur-[100px] rounded-full pointer-events-none" />

        {/* --- Header --- */}
        <header className="w-full flex items-center justify-between relative z-10">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Database className="text-[#eab308]" size={28} strokeWidth={1.5} />
            </motion.div>
            <motion.span 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white font-bold text-xs tracking-[0.2em] uppercase"
            >
              ABM Insights
            </motion.span>
          </motion.div>

          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(234, 179, 8, 0.15)", borderColor: "rgba(234, 179, 8, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#eab308]/30 rounded-md bg-[#eab308]/5 cursor-pointer"
          >
            <Award className="text-[#eab308]" size={16} />
            <span className="text-[#eab308] text-[10px] font-bold uppercase tracking-widest">
              Elite Enterprise
            </span>
          </motion.div>
        </header>

        {/* --- Main Content --- */}
        <main className="flex-1 flex flex-col items-center justify-center w-full space-y-10 relative z-10">
          
          {/* Label */}
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-[#eab308]"
          >
            <TrendingUp size={18} strokeWidth={2.5} />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em]">
              Pipeline Mastery
            </span>
          </motion.div>

          {/* Big Statistic */}
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="text-white font-[800] text-[120px] leading-none tracking-tighter flex items-baseline"
            >
              <AnimatedCounter value={87} duration={2.5} />
              <span className="text-[#eab308] font-[700] ml-1">%</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-4 text-white font-semibold text-lg tracking-[0.15em] uppercase"
            >
              YoY Pipeline Growth
            </motion.p>
          </div>

          {/* Metrics Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="w-full max-w-[340px] space-y-4"
          >
            {/* Row 1 */}
            <div className="flex items-center justify-between p-5 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors duration-300">
              <div className="flex items-center gap-3">
                <Zap className="text-[#eab308]" size={18} fill="#eab308" />
                <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">
                  Engagement
                </span>
              </div>
              <span className="text-white font-extrabold text-2xl">
                <AnimatedCounter value={4.2} duration={2} toFixed={1} suffix="x" />
              </span>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors duration-300 group">
                <span className="text-[#eab308] font-extrabold text-xl group-hover:scale-105 transition-transform">
                   <AnimatedCounter value={12.4} duration={2.2} toFixed={1} prefix="$" suffix="M" />
                </span>
                <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-2 text-center">
                  Influenced Rev
                </span>
              </div>
              <div className="flex flex-col items-center p-4 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors duration-300 group">
                <span className="text-[#eab308] font-extrabold text-xl group-hover:scale-105 transition-transform">
                  <AnimatedCounter value={3.4} duration={2.2} toFixed={1} suffix="x" />
                </span>
                <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-2 text-center">
                  Deal Velocity
                </span>
              </div>
            </div>
          </motion.div>

        </main>

        {/* --- Footer --- */}
        <footer className="w-full flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
          <div className="flex flex-col gap-2">
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-2.5"
            >
              <div className="size-1.5 rounded-full bg-blue-800" />
              <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">
                Enterprise Baseline
              </span>
            </motion.div>
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-2.5"
            >
              <div className="size-1.5