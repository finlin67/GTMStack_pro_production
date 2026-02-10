
'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  X, 
  BarChart3, 
  Route, 
  Clock, 
  ChevronRight 
} from 'lucide-react';

interface ActivityItem {
  id: string;
  date: string;
  route: string;
  time: string;
  status: 'On-Time' | 'Delay';
  color: 'emerald' | 'amber';
}

const ACTIVITY_DATA: ActivityItem[] = [
  { 
    id: '1', 
    date: 'Oct 24, 2023', 
    route: 'ORD → Nashville Park', 
    time: '+0m', 
    status: 'On-Time', 
    color: 'emerald' 
  },
  { 
    id: '2', 
    date: 'Oct 23, 2023', 
    route: 'St. Louis → Chicago Hub', 
    time: '+14m', 
    status: 'Delay', 
    color: 'amber' 
  },
  { 
    id: '3', 
    date: 'Oct 22, 2023', 
    route: 'Indianapolis → St. Louis', 
    time: '+0m', 
    status: 'On-Time', 
    color: 'emerald' 
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 + (i * 0.1), duration: 0.3 }
  })
};

const progressVariants: Variants = {
  hidden: { width: 0 },
  visible: (width: string) => ({
    width,
    transition: { delay: 0.4, duration: 1, ease: "circOut" }
  })
};

export default function FleetTile() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return standard layout without animations during SSR/initial mount if needed
    // In this case, we proceed to render to avoid layout shift, but animations trigger on mount.
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex flex-col w-[600px] h-[600px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden font-display text-slate-900 dark:text-white shadow-[0_0_50px_-10px_rgba(9,178,215,0.2)]"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:20px_20px]" />

      {/* Header */}
      <header className="relative z-10 h-[15%] px-6 flex items-center justify-between border-b border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <img 
            src="https://i.pravatar.cc/150?u=fo8842"
            alt="Driver Profile"
            className="w-12 h-12 rounded-xl border border-primary/30 object-cover shadow-sm"
          />
          <div>
            <h2 className="text-lg font-black text-white leading-tight">Marcus Sterling</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ID: FO-8842-MS</p>
          </div>
        </div>
        <div className="flex flex-col items-end mr-8">
          <span className="text-[10px] font-black text-primary uppercase tracking-tighter mb-1">Performance Rating</span>
          <div className="px-3 py-1 rounded-full bg-emerald-500 text-slate-900 text-xs font-black shadow-[0_0_15px_rgba(11,218,84,0.4)]">
            98.4% EXCELLENT
          </div>
        </div>
        <button 
          type="button"
          className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6 overflow-hidden relative z-10">
        
        {/* Hero Card */}
        <div className="w-full bg-slate-800/40 border border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-[inset_0_0_20px_rgba(9,178,215,0.1),0_10px_30px_-10px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <BarChart3 size={60} className="text-primary" />
          </div>
          
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Weekly Aggregate</h3>
          
          <div className="grid grid-cols-2 gap-8 relative z-10">
            {/* Metric 1 */}
            <div>
              <p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">On-Time Rate</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">99.1</span>
                <span className="text-lg font-bold text-emerald-500">%</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  variants={progressVariants}
                  custom="99.1%"
                  className="h-full bg-emerald-500 shadow-[0_0_8px_#0bda54]" 
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">Average Delay</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">04</span>
                <span className="text-lg font-bold text-amber-400">min</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  variants={progressVariants}
                  custom="15%"
                  className="h-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" 
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-2">
              <Route size={16} className="text-primary" />
              <span className="text-xs font-bold text-slate-300">1,248 Total Miles</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span className="text-xs font-bold text-slate-300">24.5h Duration</span>
            </div>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="w-full flex-1 flex flex-col gap-2 overflow-y-auto px-2 min-h-0">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Recent Activity</span>
            <button 
              type="button"
              className="flex items-center gap-1 text-[9px] font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
            >
              View Full History <ChevronRight size={10} />
            </button>
          </div>

          {/* List Items */}
          {ACTIVITY_DATA.map((item, i) => (
            <motion.div 
              key={item.id}
              custom={i}
              variants={listItemVariants}
              className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/10 transition-colors cursor-default group"
            >
              <div 
                className={`w-3 h-3 rounded-full ${item.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_#0bda54]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'} group-hover:scale-110 transition-transform`}
              />
              <div className="flex-1">
                <p className="text-xs font-bold text-white">{item.date}</p>
                <p className="text-[10px] text-slate-500">{item.route}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs font-black ${item.color === 'emerald' ? 'text-emerald-500' : 'text-amber-400'}`}>
                  {item.time}
                </p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{item.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 h-[15%] px-6 bg-slate-950 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-6">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Safety Score</p>
            <p className="text-sm font-black text-white">94%</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Fuel Eff.</p>
            <p className="text-sm font-black text-white">8.4<span className="text-[10px] text-slate-500 ml-1">MPG</span></p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-[11px] hover:bg-slate-700 transition-all border border-slate-700 active:scale-95"
          >
            CSV
          </button>
          <button 
            type="button"
            className="px-5 py-2.5 rounded-xl bg-primary text-slate-900 font-black text-[11px] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(9,178,215,0.3)] uppercase tracking-tight active:scale-95 active:shadow-none"
          >
            Generate Full Report
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
    