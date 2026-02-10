import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, MoreHorizontal, TrendingUp, Target } from 'lucide-react';

export default function HigherEDMarketingTile() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const barVariants = {
    hidden: { height: '0%' },
    visible: ({ percent, index }: { percent: number; index: number }) => ({
      height: `${percent}%`,
      transition: {
        delay: 0.2 + index * 0.15,
        duration: 1.2,
        type: 'spring' as const,
        bounce: 0.2,
        damping: 18,
      },
    }),
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + index * 0.1,
        duration: 0.4,
      },
    }),
  };

  const graphPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.8, // Overlaps with the end of bar animations
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1] as const, // Smooth ease-out
      },
    },
  };

  const graphAreaVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.9,
        duration: 1.5,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, strokeWidth: 0 },
    visible: (delay: number) => ({
      scale: 1,
      strokeWidth: 3,
      transition: { delay, type: 'spring' as const, stiffness: 400, damping: 12 },
    }),
  };

  return (
    <div className="relative w-full h-full max-w-[600px] aspect-square flex flex-col justify-center mx-auto">
      {/* Background Glow Effect */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#1d4ed8]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Unified Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(6,54,108,0.15)] overflow-hidden flex flex-col relative z-10"
      >
        {/* Header Section */}
        <div className="flex justify-between items-start px-8 pt-8 pb-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#06366c]/5 rounded-lg text-[#06366c]">
                <Target size={18} strokeWidth={2.5} />
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Enrollment Overview
              </p>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-[#06366c] text-6xl font-black tracking-tighter">
                24.5k
              </h3>
              <div className="flex items-center gap-1.5 bg-emerald-100/50 border border-emerald-200/60 px-3 py-1 rounded-full mb-2">
                <ArrowUp className="text-[#065f46] w-3.5 h-3.5" strokeWidth={3} />
                <span className="text-[#065f46] font-bold text-xs">18%</span>
              </div>
            </div>
          </div>
          <button className="text-slate-300 hover:text-[#06366c] transition-colors p-2 hover:bg-slate-100 rounded-full">
            <MoreHorizontal size={24} />
          </button>
        </div>

        {/* Middle Section: Funnel Chart */}
        <div className="flex-1 px-8 py-4 flex flex-col justify-end relative">
          <div className="flex items-end justify-between gap-6 h-full w-full mb-4">
            {/* Bar 1: Applied */}
            <div className="flex-1 flex flex-col gap-3 group cursor-pointer h-full justify-end">
              <div className="relative w-full bg-slate-100/60 rounded-2xl overflow-hidden h-[90%] flex items-end">
                <div className="absolute inset-0 bg-slate-100/60" />
                <motion.div
                  custom={{ percent: 82, index: 0 }}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full bg-[#06366c] relative z-10 rounded-t-xl group-hover:bg-[#06366c]/90 transition-colors"
                />
                <motion.div
                  custom={0}
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-4 left-0 w-full text-center text-white/90 font-bold text-xl z-20"
                >
                  82%
                </motion.div>
              </div>
              <div className="text-center">
                <p className="text-[#06366c] text-sm font-extrabold tracking-tight">
                  Applied
                </p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  12,402
                </p>
              </div>
            </div>

            {/* Bar 2: Admitted */}
            <div className="flex-1 flex flex-col gap-3 group cursor-pointer h-full justify-end">
              <div className="relative w-full bg-slate-100/60 rounded-2xl overflow-hidden h-[75%] flex items-end">
                <div className="absolute inset-0 bg-slate-100/60" />
                <motion.div
                  custom={{ percent: 100, index: 1 }}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full bg-[#1d4ed8] relative z-10 rounded-t-xl group-hover:bg-[#1d4ed8]/90 transition-colors"
                />
                <motion.div
                  custom={1}
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-4 left-0 w-full text-center text-white/90 font-bold text-xl z-20"
                >
                  45%
                </motion.div>
              </div>
              <div className="text-center">
                <p className="text-[#06366c] text-sm font-extrabold tracking-tight">
                  Admitted
                </p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  8,420
                </p>
              </div>
            </div>

            {/* Bar 3: Enrolled */}
            <div className="flex-1 flex flex-col gap-3 group cursor-pointer h-full justify-end">
              <div className="relative w-full bg-slate-100/60 rounded-2xl overflow-hidden h-[50%] flex items-end">
                <div className="absolute inset-0 bg-slate-100/60" />
                <motion.div
                  custom={{ percent: 100, index: 2 }}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full bg-[#065f46] relative z-10 rounded-t-xl group-hover:bg-[#065f46]/90 transition-colors"
                />
                <motion.div
                  custom={2}
                  variants={labelVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute bottom-4 left-0 w-full text-center text-white/90 font-bold text-xl z-20"
                >
                  28%
                </motion.div>
              </div>
              <div className="text-center">
                <p className="text-[#06366c] text-sm font-extrabold tracking-tight">
                  Enrolled
                </p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  3,240
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="px-8 mt-2">
          <div className="h-px w-full bg-slate-100" />
        </div>

        {/* Bottom Section: Projection Graph */}
        <div className="h-[28%] p-8 pt-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white to-slate-50/50">
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#1d4ed8]" />
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Lifecycle Projection
              </span>
            </div>
            <span className="text-[#06366c] font-black text-sm">
              92% Net Growth
            </span>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[85%]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="curveGradientSquare"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <motion.path
                variants={graphAreaVariants}
                initial="hidden"
                animate="visible"
                d="M0,80 C120,70 180,20 250,40 C320,60 360,10 400,5 L400,100 L0,100 Z"
                fill="url(#curveGradientSquare)"
              />

              {/* Stroke Line */}
              <motion.path
                variants={graphPathVariants}
                initial="hidden"
                animate="visible"
                d="M0,80 C120,70 180,20 250,40 C320,60 360,10 400,5"
                fill="none"
                stroke="#1d4ed8"
                strokeLinecap="round"
                strokeWidth="3"
              />

              {/* Data Points - synced with line drawing */}
              <motion.circle
                custom={1.75} // 0.8s (delay) + ~0.63 * 1.5s (duration)
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                cx="250"
                cy="40"
                fill="white"
                r="5"
                stroke="#1d4ed8"
              />
              <motion.circle
                custom={2.3} // 0.8s (delay) + 1.0 * 1.5s (duration)
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                cx="400"
                cy="5"
                fill="white"
                r="5"
                stroke="#1d4ed8"
              />
            </svg>
          </div>

          <div className="flex justify-between items-end z-10 mt-auto pt-2">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Q1 2024
            </span>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Q4 2028
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}