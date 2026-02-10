'use client';

import React from "react";
import { motion } from "framer-motion";
import {
  Store,
  ShoppingCart,
  Heart,
  TrendingUp,
  Zap,
  Rocket,
  ArrowRight,
  LineChart,
} from "lucide-react";

export default function OmniRetailTile() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-[600px] aspect-square rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10 select-none">
        {/* Background Layer: Cosmic Gradient */}
        <div
          className="absolute inset-0 z-0 bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_30%,#4c1d95_70%,#831843_100%)]"
        />

        {/* Background Layer: Journey Grid Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-100 bg-[radial-gradient(circle_at_2px_2px,rgba(217,70,239,0.08)_1px,transparent_0)] bg-[length:32px_32px]"
        />

        {/* Background Layer: Ambient Glow Orbs */}
        <div className="absolute -top-40 -left-40 size-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 size-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

        {/* --- HEADER --- */}
        <header className="relative z-20 flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-2 rounded-xl shadow-lg">
              <LineChart className="text-white w-6 h-6" />
            </div>
            <h1 className="text-white text-lg font-black tracking-tighter uppercase">
              RetailHero
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">
                Live View
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-pink-500/30 p-0.5">
              <img
                alt="User avatar"
                className="w-full h-full object-cover rounded-full"
                src="https://picsum.photos/100/100?random=1"
              />
            </div>
          </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 relative z-10 flex flex-col justify-center px-8">
          {/* Background SVG Path Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-16 h-px opacity-30 pointer-events-none">
            <svg
              className="overflow-visible w-full h-[120px]"
              viewBox="0 0 800 120"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 60C200 60 200 20 400 20C600 20 600 100 800 100"
                stroke="url(#path-grad)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10 10"
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <defs>
                <linearGradient
                  id="path-grad"
                  x1="0"
                  x2="800"
                  y1="0"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6366f1" />
                  <stop offset="0.5" stopColor="#a855f7" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 gap-4 relative z-10 h-full py-6">
            {/* Card 1: Store */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <div className="relative w-full rounded-2xl p-4 flex flex-col items-center text-center border-t border-t-indigo-500/40 translate-y-2 bg-white/[0.03] backdrop-blur-xl border-x border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/[0.05] transition-colors duration-300 group">
                {/* Floating Animation for icon */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-14 h-14 rounded-2xl bg-[#1e1b4b]/50 border border-indigo-500/50 flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform"
                >
                  <Store className="text-indigo-300 w-7 h-7" />
                </motion.div>

                <p className="text-indigo-300/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                  Store
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                <div className="flex flex-col gap-1">
                  <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider">
                    Conv. Lift
                  </p>
                  <h3 className="text-white text-3xl font-black tracking-tighter">
                    +44%
                  </h3>
                  <div className="flex items-center justify-center gap-1 mt-1 text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-[9px] font-bold">+12% vs LY</span>
                  </div>
                </div>

                {/* Overlapping Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-6 -right-3 w-8 h-8 rounded-full border-2 border-indigo-400 overflow-hidden shadow-2xl"
                >
                  <img
                    alt="User"
                    className="w-full h-full object-cover"
                    src="https://picsum.photos/100/100?random=2"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Card 2: Web Cart */}
            <motion.div
              className="flex flex-col items-center justify-end pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-full rounded-2xl p-4 flex flex-col items-center text-center border-t border-t-violet-500/40 bg-white/[0.03] backdrop-blur-xl border-x border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/[0.05] transition-colors duration-300 group">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="w-14 h-14 rounded-2xl bg-[#2e1065]/50 border border-violet-500/50 flex items-center justify-center mb-4 shadow-xl shadow-violet-500/20 group-hover:scale-110 transition-transform"
                >
                  <ShoppingCart className="text-violet-300 w-7 h-7" />
                </motion.div>

                <p className="text-violet-300/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                  Web Cart
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                <div className="flex flex-col gap-1">
                  <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider">
                    Active Users
                  </p>
                  <h3 className="text-white text-2xl font-black tracking-tighter">
                    42.8k
                  </h3>
                  <div className="flex items-center justify-center gap-1 mt-1 text-violet-400">
                    <Zap className="w-3 h-3" />
                    <span className="text-[9px] font-bold">+11%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Loyalty */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="relative w-full rounded-2xl p-4 flex flex-col items-center text-center border-t border-t-pink-500/40 translate-y-6 bg-white/[0.03] backdrop-blur-xl border-x border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/[0.05] transition-colors duration-300 group">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="w-14 h-14 rounded-2xl bg-[#831843]/50 border border-pink-500/50 flex items-center justify-center mb-4 shadow-xl shadow-pink-500/20 group-hover:scale-110 transition-transform"
                >
                  <Heart className="text-pink-300 w-7 h-7" />
                </motion.div>

                <p className="text-pink-300/80 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                  Loyalty
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                <div className="flex flex-col gap-1">
                  <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider">
                    LTV Growth
                  </p>
                  <h3 className="text-white text-3xl font-black tracking-tighter">
                    2.7x
                  </h3>
                  <div className="flex items-center justify-center gap-1 mt-1 text-pink-400">
                    <Rocket className="w-3 h-3" />
                    <span className="text-[9px] font-bold">+0.5x QoQ</span>
                  </div>
                </div>

                {/* Overlapping Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-4 -left-3 w-10 h-10 rounded-full border-2 border-pink-400 overflow-hidden shadow-2xl"
                >
                  <img
                    alt="User"
                    className="w-full h-full object-cover"
                    src="https://picsum.photos/100/100?random=3"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="relative z-20 px-8 py-6 flex items-center justify-between bg-white/5 border-t border-white/10 backdrop-blur-md">
          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <div>
                <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">
                  Revenue
                </p>
                <p className="text-white text-base font-black">
                  $1.2M{" "}
                  <span className="text-emerald-400 font-bold text-[10px] ml-1">
                    +24%
                  </span>
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 border-l border-white/10 pl-8">
              <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
              <div>
                <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">
                  Growth
                </p>
                <p className="text-white text-base font-black">
                  High{" "}
                  <span className="text-pink-400 font-bold text-[10px] ml-1">
                    Steady
                  </span>
                </p>
              </div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 active:scale-95 transition-all text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-pink-500/20 group">
            Report
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>
      </div>
    </div>
  );
}