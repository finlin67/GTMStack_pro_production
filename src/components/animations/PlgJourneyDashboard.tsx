'use client';


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle, Zap, TrendingUp, Rocket, Clock } from 'lucide-react';

// Custom hook for organic number generation
const useOrganicStats = () => {
  const [bars, setBars] = useState([40, 70, 50, 90, 60]);
  const [users1, setUsers1] = useState(7200);
  const [users2, setUsers2] = useState(4100);

  useEffect(() => {
    const interval = setInterval(() => {
      // Jitter bar chart
      setBars(prev => prev.map(h => {
        const change = Math.random() > 0.5 ? 5 : -5;
        return Math.max(20, Math.min(95, h + change));
      }));

      // Jitter user counts
      setUsers1(prev => prev + (Math.random() > 0.5 ? 15 : -5));
      setUsers2(prev => prev + (Math.random() > 0.5 ? 10 : -3));

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { bars, users1, users2 };
};

export default function PlgJourneyDashboard() {
  const { bars, users1, users2 } = useOrganicStats();

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-900 min-h-screen font-display p-8">
      <div className="w-[600px] h-[600px] bg-background-dark overflow-hidden relative border border-white/10 flex flex-col p-4 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4 z-10">
          <div>
            <h1 className="text-white text-2xl font-black tracking-tight leading-none mb-1">PLG Journey</h1>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Optimization Engine</p>
          </div>
          <motion.div 
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-2 py-1 rounded border border-white/10 bg-white/5 text-[10px] text-primary font-bold"
          >
            LIVE METRICS
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 relative">
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 z-30 bg-white/[0.03] backdrop-blur-[12px] border border-white/10 px-2 py-1 rounded-full border-emerald-500/30 text-emerald-400 text-[10px] font-black shadow-lg"
          >
            25% CONV
          </motion.div>
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white/[0.03] backdrop-blur-[12px] border border-white/10 px-2 py-1 rounded-full border-emerald-500/30 text-emerald-400 text-[10px] font-black shadow-lg"
          >
            40% CONV
          </motion.div>
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 z-30 bg-white/[0.03] backdrop-blur-[12px] border border-white/10 px-2 py-1 rounded-full border-emerald-500/30 text-emerald-400 text-[10px] font-black shadow-lg"
          >
            60% CONV
          </motion.div>

          {/* Top Left Card: Visitor/Freemium */}
          <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-2xl p-4 flex flex-col justify-between border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Users className="text-violet-400 w-6 h-6" />
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">Visitor</p>
                    <p className="text-slate-500 text-[10px]">Entry point</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-purple-400 w-6 h-6" />
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">Freemium</p>
                    <p className="text-slate-500 text-[10px]">Self-serve value</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              />
            </div>
          </div>

          {/* Top Right Card: Trial/PQL */}
          <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-2xl p-4 flex flex-col justify-between border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Zap className="text-purple-400 w-6 h-6" />
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Trial</p>
                  <p className="text-slate-500 text-[10px]">Active testing</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-fuchsia-400 w-6 h-6" />
                <div>
                  <p className="text-white text-sm font-bold leading-tight">PQL</p>
                  <p className="text-slate-500 text-[10px]">High engagement</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-end h-8">
              {bars.map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ height: `${height}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`flex-1 rounded-t-sm ${
                    i === 3 ? "bg-primary" : 
                    i === 4 ? "bg-primary/80" :
                    i === 2 ? "bg-primary/60" :
                    i === 1 ? "bg-primary/40" : "bg-primary/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Left Card: Customer */}
          <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-50"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-[1.5px] mb-3 shadow-[0_0_30px_rgba(168,85,247,0.3)] mx-auto">
                <div className="w-full h-full bg-background-dark rounded-full flex items-center justify-center">
                  <Rocket className="text-white w-10 h-10" />
                </div>
              </div>
              <p className="text-white font-black text-lg">Customer</p>
              <p className="text-fuchsia-400 text-[10px] font-bold uppercase tracking-wider">Revenue Expansion</p>
            </div>
          </div>

          {/* Bottom Right Card: Product Usage */}
          <div className="bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-2xl p-4 flex flex-col border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex justify-between items-center mb-4">
              <p className="text-slate-300 text-[11px] font-bold uppercase tracking-tight">Product Usage</p>
              <span className="text-emerald-400 text-[10px] font-bold">+18.4%</span>
            </div>
            <div className="flex-1 flex flex-col justify-around">
              <div className="flex items-center gap-3">
                <div className="w-full h-6 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      d="M0,35 Q10,10 20,25 T40,5 T60,20 T80,10 T100,25" 
                      fill="none" 
                      stroke="#a656f5" 
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                <span className="text-white text-[10px] font-mono">{(users1 / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full h-6 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                     <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
                      d="M0,20 Q20,35 40,15 T70,30 T100,5" 
                      fill="none" 
                      stroke="#d946ef" 
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
                <span className="text-white text-[10px] font-mono">{(users2 / 1000).toFixed(1)}k</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2 pt-2 border-t border-white/5">
              <Clock className="text-slate-500 w-3 h-3" />
              <span className="text-slate-500 text-[9px]">Updated 2m ago</span>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-4 flex gap-3">
          <div className="flex-1 bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-xl p-2 border-white/5 flex flex-col justify-center">
            <p className="text-slate-500 text-[9px] uppercase font-bold">Conversion</p>
            <p className="text-white text-sm font-black">+25.4%</p>
          </div>
          <div className="flex-1 bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-xl p-2 border-white/5 flex flex-col justify-center">
            <p className="text-slate-500 text-[9px] uppercase font-bold">TTV (h)</p>
            <p className="text-white text-sm font-black">1.2h</p>
          </div>
          <div className="flex-1 bg-white/[0.03] backdrop-blur-[12px] border border-white/10 rounded-xl p-2 border-white/5 flex flex-col justify-center">
            <p className="text-slate-500 text-[9px] uppercase font-bold">Expansion</p>
            <p className="text-white text-sm font-black">$2.4M</p>
          </div>
        </div>

        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}
