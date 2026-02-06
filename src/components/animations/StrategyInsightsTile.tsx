'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, Target, TrendingUp } from 'lucide-react';

export default function StrategyInsightsTile() {
  return (
    <div className="relative aspect-square w-full max-w-[600px] mx-auto rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-[#0b0a0f]">
      {/* Grid Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(124, 60, 236, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          backgroundPosition: {
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Center Hub Assembly */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div 
          className="relative w-32 h-32 rounded-full bg-[#7c3cec]/20 border-2 border-[#7c3cec]/50 flex items-center justify-center"
          style={{ boxShadow: '0 0 40px rgba(124, 60, 236, 0.3)' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inner Pulsing Core */}
          <motion.div 
            className="w-24 h-24 rounded-full bg-[#7c3cec] flex items-center justify-center z-20"
            animate={{ boxShadow: ['0 0 0px rgba(124, 60, 236, 0)', '0 0 20px rgba(124, 60, 236, 0.6)', '0 0 0px rgba(124, 60, 236, 0)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Network className="text-white w-10 h-10" strokeWidth={1.5} />
          </motion.div>

          {/* Outer Rings */}
          <div className="absolute -inset-8 border border-[#7c3cec]/20 rounded-full" />
          <div className="absolute -inset-16 border border-[#7c3cec]/10 rounded-full" />
        </motion.div>
      </div>

      {/* Floating Card 1: ABM Strategy (Top Left) */}
      <motion.div 
        className="absolute top-[25%] left-[15%] z-20 p-4 rounded-xl flex flex-col gap-2 border border-[#7c3cec]/30 bg-[#2e2938]/40 backdrop-blur-md"
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Target className="text-[#7c3cec] w-5 h-5" />
          <span className="text-xs font-bold text-white/60">ABM STRATEGY</span>
        </div>
        <p className="text-2xl font-black text-white">+28%</p>
        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">Win Rate Increase</p>
      </motion.div>

      {/* Floating Card 2: Pipeline (Bottom Right) */}
      <motion.div 
        className="absolute bottom-[20%] right-[15%] z-20 p-4 rounded-xl flex flex-col gap-2 border border-[#7c3cec]/30 bg-[#2e2938]/40 backdrop-blur-md"
        initial={{ y: 0 }}
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="text-[#7c3cec] w-5 h-5" />
          <span className="text-xs font-bold text-white/60">PIPELINE</span>
        </div>
        <p className="text-2xl font-black text-white">+33%</p>
        <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">Growth Metrics</p>
      </motion.div>

      {/* Floating Card 3: Revenue Growth (Right Edge) */}
      <motion.div 
        className="absolute top-1/2 -right-4 z-20 p-4 rounded-xl flex flex-col gap-1 w-48 border border-white/10 bg-[#2e2938]/40 backdrop-blur-md"
        style={{ x: '-50%', y: '-50%' }}
        animate={{ x: '-50%', y: ['-55%', '-45%', '-55%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-xs font-medium text-white/60">Revenue Growth</p>
        <div className="h-12 w-full mt-2 overflow-hidden relative">
          <svg className="w-full h-full" viewBox="0 0 100 40">
            <defs>
              <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#7c3cec', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#7c3cec', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <motion.path 
              d="M0 35 Q 25 35, 40 20 T 70 15 T 100 5" 
              fill="none" 
              stroke="#7c3cec" 
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <path d="M0 35 Q 25 35, 40 20 T 70 15 T 100 5 V 40 H 0 Z" fill="url(#grad)" opacity="0.2" />
          </svg>
        </div>
      </motion.div>

      {/* Connecting Lines Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <motion.line 
          x1="25%" y1="25%" x2="50%" y2="50%" 
          stroke="rgba(124, 60, 236, 0.4)" 
          strokeDasharray="4" 
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.line 
          x1="75%" y1="75%" x2="50%" y2="50%" 
          stroke="rgba(124, 60, 236, 0.4)" 
          strokeDasharray="4" 
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        <motion.line 
          x1="80%" y1="30%" x2="50%" y2="50%" 
          stroke="rgba(124, 60, 236, 0.4)" 
          strokeDasharray="4" 
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        />
      </svg>

      {/* Decorative Orbs */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#7c3cec]"
        style={{ boxShadow: '0 0 40px rgba(124, 60, 236, 0.3)' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-[#7c3cec]/40"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      
      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0a0f] to-transparent pointer-events-none z-30" />
    </div>
  );
}