'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TrendingUp, Brain, Sparkles } from 'lucide-react';

export default function AIGrowth() {
  // Animation variants for the floating effect
  const floatVariant = (delay: number): Variants => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    <div className="relative aspect-square w-full max-w-[600px] mx-auto flex items-center justify-center select-none">
      {/* Background Animated Dots */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <motion.div
          variants={floatVariant(0)}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full"
        />
        <motion.div
          variants={floatVariant(2)}
          animate="animate"
          className="absolute top-3/4 left-1/3 w-2 h-2 bg-red-500 rounded-full"
        />
        <motion.div
          variants={floatVariant(1)}
          animate="animate"
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full"
        />
        <motion.div
          variants={floatVariant(3)}
          animate="animate"
          className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-green-500 rounded-full"
        />
      </div>

      {/* Center Main Card */}
      <div className="relative z-20 flex flex-col items-center justify-center p-8 bg-slate-900 border-4 border-slate-700 h-[280px] w-[280px] md:h-[340px] md:w-[340px] shadow-2xl shadow-black/50">
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
          Revenue Growth
        </p>
        <h2 className="text-6xl md:text-7xl font-bold leading-none tracking-tighter bg-gradient-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent">
          +42%
        </h2>
        <p className="text-white/80 font-bold text-sm mt-1 uppercase tracking-tighter">
          Conversion Lift
        </p>
        <div className="mt-6 flex flex-col items-center">
          <span className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">
            Growth Engine v2.0
          </span>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 mt-2"></div>
        </div>
      </div>

      {/* Top Left Panel (Blue) */}
      <motion.div
        variants={floatVariant(0)}
        animate="animate"
        className="absolute top-[10%] left-[-5%] md:left-0 z-30 bg-[#1e293b] border-l-4 border-blue-500 p-4 w-[160px] md:w-[200px] shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-white">Market Intel</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-slate-700 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-blue-500" 
            />
          </div>
          <p className="text-[10px] text-white/50">Analyzing 24 data streams</p>
        </div>
      </motion.div>

      {/* Bottom Left Panel (Green) */}
      <motion.div
        variants={floatVariant(1.5)}
        animate="animate"
        className="absolute bottom-[15%] left-[-2%] md:left-[5%] z-30 bg-[#1e293b] border-l-4 border-green-500 p-4 w-[160px] md:w-[200px] shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-4 h-4 text-green-400" />
          <span className="text-xs font-bold text-white">Sentiment Analysis</span>
        </div>
        <div className="flex items-end gap-1 h-8">
          <div className="w-2 bg-green-500/20 h-1/2"></div>
          <div className="w-2 bg-green-500/40 h-3/4"></div>
          <div className="w-2 bg-green-500 h-full"></div>
          <div className="w-2 bg-green-400 h-2/3"></div>
          <div className="w-2 bg-green-300 h-1/3"></div>
        </div>
      </motion.div>

      {/* Top Right Panel (Red) */}
      <motion.div
        variants={floatVariant(0.8)}
        animate="animate"
        className="absolute top-[15%] right-[-5%] md:right-0 z-30 bg-[#1e293b] border-l-4 border-red-500 p-4 w-[180px] md:w-[220px] shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-tighter">
            Messaging Node
          </span>
          <span className="text-[9px] bg-red-600 text-white px-1.5 border border-red-500">
            99.2% ROI
          </span>
        </div>
        <p className="text-[11px] text-white/80 leading-relaxed italic">
          &quot;Unlock unprecedented scale with AI-driven market intelligence...&quot;
        </p>
      </motion.div>

      {/* Bottom Right Panel (Purple) */}
      <motion.div
        variants={floatVariant(2.2)}
        animate="animate"
        className="absolute bottom-[10%] right-[-2%] md:right-[5%] z-30 bg-[#1e293b] border-l-4 border-purple-500 p-4 w-[180px] md:w-[220px] shadow-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-white">Growth Assets</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-full bg-slate-700"></div>
          <div className="h-2 w-2/3 bg-slate-700"></div>
          <div className="h-2 w-4/5 bg-purple-600"></div>
        </div>
      </motion.div>

      {/* Connecting SVG Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 600 600"
      >
        <path
          d="M150 120 Q 200 150, 250 250"
          fill="none"
          stroke="url(#blue-grad-line)"
          strokeWidth="2"
        />
        <path
          d="M160 500 Q 220 450, 260 350"
          fill="none"
          stroke="url(#green-grad-line)"
          strokeWidth="2"
        />
        <path
          d="M350 250 Q 400 180, 480 140"
          fill="none"
          stroke="url(#red-grad-line)"
          strokeWidth="2"
        />
        <path
          d="M350 350 Q 420 420, 480 500"
          fill="none"
          stroke="url(#purple-grad-line)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="blue-grad-line" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="red-grad-line" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="purple-grad-line" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="green-grad-line" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}