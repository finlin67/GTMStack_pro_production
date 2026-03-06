'use client';


import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Search, 
  Bell, 
  Lightbulb, 
  FilePenLine, 
  Palette, 
  FileText, 
  Share2, 
  Mail, 
  PlayCircle, 
  Rocket, 
  TrendingUp, 
  Zap 
} from 'lucide-react';

// Reusable glass card style to match the original CSS
const glassClass = "bg-slate-900/60 backdrop-blur-md border border-white/10";
const neonGlowPrimary = "shadow-[0_0_20px_rgba(5,183,214,0.4)]";
const neonGlowPink = "shadow-[0_0_20px_rgba(236,72,153,0.4)]";

export default function CampaignTile() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-[600px] h-[600px] bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 font-sans select-none">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:24px_24px]" />
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#05b7d6]/10 blur-[100px] rounded-full -mr-20 -mt-20 z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ec4899]/10 blur-[100px] rounded-full -ml-20 -mb-20 z-0" />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="text-primary"
          >
            <Network size={24} />
          </motion.div>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white text-sm font-bold tracking-tight uppercase"
          >
            Content Command
          </motion.h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
          </button>
          <div className="size-8 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgx_N5FcK2OGYq0VGuobO00Du9EWNX0nbyYRHT2h8Sj4wDw12XgIoEnu5HdXFtEwy3jU4dISwOtMyRQRxK8iSsNFcvNxY4k2AbZdl2Wxmmn8tKJHHK2T_reH7F9qPDnOzz2lvfb9LXyDDWjJMefRIHdXsLL5OhIHzi-_G1u3FOC5ELVrFATLwp-Zqk-gGEytorX_FZK44TwizawQOsdwTgYvk7eDzPpjKetyrhwWBmZOJq-C7eNeJNtcgHBjuuwU9cxfZ63C_z441g" 
              alt="Marketing Campaign Manager Profile"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] relative pointer-events-auto">
          
          {/* Central Revenue Curve (SVG) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 z-0">
            <svg className="w-full h-full" viewBox="0 0 520 520">
              <defs>
                <linearGradient id="lineGrad" x1="0%" x2="100%" y1="100%" y2="0%">
                  <stop offset="0%" stopColor="#05b7d6" stopOpacity="1" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur result="blur" stdDeviation="4" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path 
                d="M 0 450 Q 130 440, 260 260 T 520 80" 
                fill="none" 
                filter="url(#glow)" 
                stroke="url(#lineGrad)" 
                strokeWidth="4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </div>

          {/* Workflow Pipeline (Left Side) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-20">
            {[
              { id: 1, label: 'Ideate', icon: Lightbulb, step: '01' },
              { id: 2, label: 'Write', icon: FilePenLine, step: '02' },
              { id: 3, label: 'Design', icon: Palette, step: '03' },
            ].map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + (index * 0.2), type: "spring" }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className={`size-10 ${glassClass} rounded-lg flex items-center justify-center text-slate-300 border-slate-700 transition-colors group-hover:border-primary/50 group-hover:text-primary`}>
                  <item.icon size={20} />
                </div>
                <div className="hidden lg:block">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Step {item.step}</p>
                  <p className="text-white text-xs font-semibold">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Channel Radials (Right Side Fanning Out) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-10 items-end z-20">
            {[
              { id: 'blog', label: 'Blog', icon: FileText, color: 'text-primary', border: 'border-primary/30', glow: neonGlowPrimary, margin: 'mr-0' },
              { id: 'social', label: 'Social', icon: Share2, color: 'text-accent-pink', border: 'border-accent-pink/30', glow: neonGlowPink, margin: '-mr-6' },
              { id: 'email', label: 'Email', icon: Mail, color: 'text-accent-purple', border: 'border-accent-purple/30', glow: '', margin: '-mr-6' },
              { id: 'video', label: 'Video', icon: PlayCircle, color: 'text-white', border: 'border-slate-600', glow: '', margin: 'mr-0' },
            ].map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 - (index * 0.2), type: "spring" }}
                className={`flex flex-row-reverse items-center gap-3 ${item.margin}`}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`size-12 ${glassClass} rounded-full flex items-center justify-center ${item.color} ${item.border} ${item.glow}`}
                >
                  <item.icon size={24} strokeWidth={1.5} />
                </motion.div>
                <p className="text-white text-sm font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Central Publish Node */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="relative group cursor-pointer">
              {/* Glow Rings */}
              <div className="absolute inset-0 animate-ping opacity-20 bg-primary rounded-full" />
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`size-24 rounded-full bg-slate-900 border-2 border-primary flex flex-col items-center justify-center shadow-2xl relative z-10 ${neonGlowPrimary}`}
              >
                <Rocket className="text-primary mb-1" size={32} />
                <p className="text-[10px] text-primary font-black tracking-widest uppercase">Publish</p>
              </motion.div>

              {/* Connecting Lines (Visual Decor) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[400px]">
                <div className="flex justify-between items-center opacity-30">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "50%" }} 
                    transition={{ delay: 1, duration: 1 }} 
                    className="h-[1px] bg-gradient-to-r from-transparent to-primary" 
                  />
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "50%" }} 
                    transition={{ delay: 1, duration: 1 }} 
                    className="h-[1px] bg-gradient-to-l from-transparent to-primary" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Metric Cards */}
          <AnimatePresence>
            {mounted && (
              <>
                {/* Metric 1: YoY Visitors */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                  className="absolute top-12 left-12 z-40"
                >
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className={`${glassClass} p-4 rounded-xl border-l-4 border-l-primary shadow-xl`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="text-primary" size={14} />
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">YoY Visitors</p>
                    </div>
                    <p className="text-white text-3xl font-black">
                      <Counter from={0} to={164} duration={2} />%
                    </p>
                    <div className="h-1 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ delay: 2.5, duration: 1 }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Metric 2: Engagement Rate */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  className="absolute bottom-16 left-1/4 z-40"
                >
                   <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className={`${glassClass} p-4 rounded-xl border-l-4 border-l-accent-pink shadow-xl`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="text-accent-pink" size={14} />
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Engagement Rate</p>
                    </div>
                    <p className="text-white text-3xl font-black">
                      +<Counter from={0} to={285} duration={2} />%
                    </p>
                    <p className="text-[10px] text-accent-pink font-medium mt-1">High Volatility Peak</p>
                  </motion.div>
                </motion.div>

                {/* Metric 3: Revenue Label */}
                <motion.div 
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 2.5 }}
                   className="absolute top-20 right-24 z-40"
                >
                   <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className={`${glassClass} px-3 py-1.5 rounded-full border-slate-700 flex items-center gap-2`}
                  >
                    <div className="size-2 rounded-full bg-accent-pink animate-pulse" />
                    <p className="text-white text-[11px] font-bold uppercase tracking-tighter">Revenue Growth</p>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Visual Info */}
      <footer className="absolute bottom-0 left-0 w-full px-8 py-6 flex items-end justify-between z-50">
        <div>
          <h1 className="text-white text-2xl font-black leading-tight tracking-tight mb-1">
            Content Engagement Hero
          </h1>
          <p className="text-slate-400 text-xs max-w-[280px]">
            Optimize your multi-channel distribution from a single command center.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-primary text-slate-950 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-white transition-colors">
            Start Workflow
          </button>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors">
            Analytics
          </button>
        </div>
      </footer>
    </div>
  );
}

// Helper to count up numbers smoothly
function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(from + (to - from) * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <>{count}</>;
}
