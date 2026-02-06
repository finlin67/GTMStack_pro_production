'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Banknote, TrendingUp, Rocket } from 'lucide-react';

/**
 * DemandGrowthTile
 * 
 * A self-contained, animated data visualization component.
 * Dimensions: Maintains a 1:1 aspect ratio, max width 600px.
 * Tech Stack: React, Tailwind CSS, Framer Motion, Lucide React.
 */
export default function DemandGrowthTile() {
  // Animation variants
  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatAnimationDelayed = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 5,
        delay: 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseGlow = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particleFlow = (delay: number) => ({
    animate: {
      y: [-20, 280],
      opacity: [0, 1, 0],
      x: [0, (Math.random() - 0.5) * 20], // Slight horizontal wobble
      transition: {
        duration: 2.5,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }
    }
  });

  return (
    <div 
      className="relative w-full aspect-square max-w-[600px] mx-auto bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-[#234848]"
      style={{
        // Replicating the grid-bg class locally
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(17, 212, 212, 0.05) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Decorative Glow Background */}
      <motion.div 
        className="absolute inset-0"
        variants={pulseGlow}
        animate="animate"
        style={{
          background: 'radial-gradient(circle, rgba(17, 212, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Main Container for Visualization Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-2/3 h-2/3 flex items-center justify-center">
          
          {/* Top Left Card: SEO Strategy */}
          <motion.div 
            className="absolute top-0 left-0 flex flex-col gap-2 p-4 rounded-lg border-l-4 border-l-[#11d4d4] z-20"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(17, 212, 212, 0.2)',
              borderRight: '1px solid rgba(17, 212, 212, 0.2)',
              borderBottom: '1px solid rgba(17, 212, 212, 0.2)',
            }}
            variants={floatAnimation}
            animate="animate"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#11d4d4]" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-white">SEO Strategy</span>
            </div>
            <div className="h-1 w-24 bg-[#11d4d4]/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#11d4d4]" 
                initial={{ width: "0%" }}
                animate={{ width: "66%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Top Right Card: Paid Media */}
          <motion.div 
            className="absolute top-10 -right-4 flex flex-col gap-2 p-4 rounded-lg border-l-4 border-l-emerald-400 z-20"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(17, 212, 212, 0.2)',
              borderRight: '1px solid rgba(17, 212, 212, 0.2)',
              borderBottom: '1px solid rgba(17, 212, 212, 0.2)',
            }}
            variants={floatAnimationDelayed}
            animate="animate"
          >
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-white">Paid Media</span>
            </div>
            <div className="h-1 w-24 bg-emerald-400/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-400" 
                initial={{ width: "0%" }}
                animate={{ width: "50%" }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </div>
          </motion.div>

          {/* The Funnel Shape */}
          <div 
            className="relative z-10 w-48 h-64 bg-gradient-to-b from-[#11d4d4]/40 to-emerald-500/10"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)' }}
          >
            {/* Flowing Particles */}
            <div className="absolute inset-0 overflow-hidden opacity-50">
              <motion.div 
                className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full blur-[1px]" 
                variants={particleFlow(0)} 
                animate="animate" 
              />
              <motion.div 
                className="absolute top-0 right-1/3 w-1.5 h-1.5 bg-[#11d4d4] rounded-full blur-[1px]" 
                variants={particleFlow(1)} 
                animate="animate" 
              />
              <motion.div 
                className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full blur-[1px]" 
                variants={particleFlow(0.5)} 
                animate="animate" 
              />
               <motion.div 
                className="absolute top-0 right-1/4 w-1 h-1 bg-white rounded-full blur-[1px]" 
                variants={particleFlow(1.5)} 
                animate="animate" 
              />
            </div>
          </div>

          {/* Upward Growth Curve (SVG) */}
          <div className="absolute bottom-0 w-full h-40 flex items-end justify-center pointer-events-none z-10">
            <svg 
              className="w-full h-full text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
            >
              <motion.path 
                d="M0,100 Q50,95 100,50 T200,0" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <motion.circle 
                cx="200" 
                cy="0" 
                fill="currentColor" 
                r="5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, duration: 0.3 }}
              />
            </svg>
          </div>

          {/* Bottom Left Card: Pipeline Growth */}
          <motion.div 
            className="absolute -left-4 bottom-1/4 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#11d4d4]/40 z-30"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
            }}
            variants={floatAnimationDelayed}
            animate="animate"
          >
            <p className="text-[#11d4d4] text-[10px] font-black uppercase tracking-widest mb-1">Pipeline Growth</p>
            <p className="text-3xl font-black text-white">+142%</p>
            <div className="flex items-center gap-1 text-[#0bda50] text-xs font-bold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>High Velocity</span>
            </div>
          </motion.div>

          {/* Bottom Right Card: Sales Velocity */}
          <motion.div 
            className="absolute -right-8 bottom-10 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-emerald-400/40 z-30"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
            }}
            variants={floatAnimation}
            animate="animate"
          >
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">Sales Velocity</p>
            <p className="text-3xl font-black text-white">2.4x</p>
            <div className="flex items-center gap-1 text-[#0bda50] text-xs font-bold mt-1">
              <Rocket className="w-3 h-3" />
              <span>Accelerated</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}