'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  UserPlus, 
  Users, 
  Share2, 
  BadgeDollarSign 
} from 'lucide-react';

export default function EventMarketing() {
  // Animation variants for floating avatars
  const floatAnimation = (delay: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  // Pulse animation for the central node
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Path animation for the connecting dots
  const pathAnimation = (delay: number) => ({
    opacity: [0.4, 1, 0.4],
    r: [1, 2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  });

  return (
    <div className="relative w-full aspect-square max-w-[600px] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl mx-auto xl:mx-0">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-600/10"></div>

      {/* Center Node - Pipeline Impact */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <motion.div 
          className="size-32 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_40px_10px_rgba(34,211,238,0.2)]"
          animate={pulseAnimation}
        >
          <div className="size-20 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.6)]">
            <Rocket className="text-slate-950 w-10 h-10 fill-current" />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 px-4 py-1.5 bg-slate-900/80 backdrop-blur-md border border-cyan-400/30 rounded-full"
        >
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Pipeline Impact</p>
        </motion.div>
      </div>

      {/* Curved Event Timeline Path (Simulated) */}
      <svg className="absolute inset-0 w-full h-full p-20 z-10" viewBox="0 0 100 100">
        <path d="M10,80 Q50,90 90,80 T90,20 Q50,10 10,20" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="2,2" strokeWidth="0.5"></path>
        <motion.circle cx="20" cy="50" fill="rgba(37,106,244,0.4)" animate={pathAnimation(0)} />
        <motion.circle cx="50" cy="20" fill="rgba(37,106,244,0.4)" animate={pathAnimation(0.5)} />
        <motion.circle cx="80" cy="50" fill="rgba(37,106,244,0.4)" animate={pathAnimation(1)} />
      </svg>

      {/* Stage Markers & Content Panels */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {/* Top Left Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 max-w-[140px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <UserPlus className="text-blue-400 w-3.5 h-3.5" />
              <p className="text-white text-[10px] font-bold uppercase tracking-tighter">Registration</p>
            </div>
            <p className="text-2xl font-black text-white">4.2k</p>
            <p className="text-[#0bda5e] text-[10px] font-medium">+18% vs prev.</p>
          </motion.div>

          {/* Top Right Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 max-w-[140px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="text-purple-400 w-3.5 h-3.5" />
              <p className="text-white text-[10px] font-bold uppercase tracking-tighter">Attendance</p>
            </div>
            <p className="text-2xl font-black text-white">82%</p>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ delay: 0.8, duration: 1 }}
                className="bg-purple-400 h-full" 
              />
            </div>
          </motion.div>
        </div>

        {/* Connection Lines (Visual Elements) */}
        <div className="absolute top-1/4 left-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"></div>
        <div className="absolute top-1/2 right-1/4 h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>

        <div className="flex justify-between items-end">
          {/* Bottom Left Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 max-w-[140px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <Share2 className="text-cyan-400 w-3.5 h-3.5" />
              <p className="text-white text-[10px] font-bold uppercase tracking-tighter">Networking</p>
            </div>
            <p className="text-2xl font-black text-white">12k+</p>
            <p className="text-[#9ca6ba] text-[10px]">Connections formed</p>
          </motion.div>

          {/* Bottom Right Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 max-w-[140px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <BadgeDollarSign className="text-green-400 w-3.5 h-3.5" />
              <p className="text-white text-[10px] font-bold uppercase tracking-tighter">Pipeline</p>
            </div>
            <p className="text-2xl font-black text-white">$1.2M</p>
            <p className="text-cyan-400 text-[10px] font-bold">+38% Lift</p>
          </motion.div>
        </div>
      </div>

      {/* Moving Avatars */}
      <motion.div 
        className="absolute top-[30%] left-[25%] size-8 rounded-full border-2 border-primary overflow-hidden shadow-lg shadow-primary/20"
        animate={floatAnimation(0)}
      >
        <img className="w-full h-full object-cover" alt="Attendee" src="https://picsum.photos/100/100?random=1" />
      </motion.div>

      <motion.div 
        className="absolute top-[70%] left-[65%] size-10 rounded-full border-2 border-purple-500 overflow-hidden shadow-lg shadow-purple-500/20"
        animate={floatAnimation(1)}
      >
        <img className="w-full h-full object-cover" alt="Attendee" src="https://picsum.photos/100/100?random=2" />
      </motion.div>

      <motion.div 
        className="absolute top-[45%] right-[15%] size-7 rounded-full border-2 border-cyan-400 overflow-hidden shadow-lg shadow-cyan-400/20"
        animate={floatAnimation(2)}
      >
        <img className="w-full h-full object-cover" alt="Attendee" src="https://picsum.photos/100/100?random=3" />
      </motion.div>
    </div>
  );
}