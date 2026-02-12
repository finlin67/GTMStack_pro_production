'use client';

// FILE: NexusStakeholderPortal.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Search, 
  Bell, 
  Settings, 
  TrendingUp, 
  MoreHorizontal, 
  Plus, 
  CheckCircle2, 
  RefreshCcw, 
  Shield, 
  Cpu, 
  Zap, 
  BrainCircuit, 
  Lock, 
  ShieldCheck, 
  Sparkles,
  Activity,
  Server,
  Users,
  Box
} from 'lucide-react';

// --- Types ---
interface Stats {
  accuracy: number;
  gpuUtilization: number;
  memoryUtilization: number;
  latency: number;
  batchCount: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'complete' | 'active' | 'upcoming';
  comment?: {
    author: string;
    role: string;
    text: string;
    avatar: string;
  };
}

// --- Constants ---
const INITIAL_MILESTONES: Milestone[] = [
  {
    id: '1',
    title: 'Data Ingestion',
    description: '4.2TB unstructured data ingested. PII masking complete.',
    date: 'MAR 12',
    status: 'complete',
    comment: {
      author: 'Sarah Chen',
      role: 'Lead DS',
      text: 'Data quality score: 0.98. Ready for architecture selection.',
      avatar: 'https://picsum.photos/seed/sarah/100/100'
    }
  },
  {
    id: '2',
    title: 'Hyperparameter Tuning',
    description: 'Refining learning rates for edge cases.',
    date: 'ACTIVE',
    status: 'active',
    comment: {
      author: 'Marcus Thorne',
      role: 'MLOps',
      text: 'Spinning up 4 additional A100 instances.',
      avatar: 'https://picsum.photos/seed/marcus/100/100'
    }
  },
  {
    id: '3',
    title: 'Security Audit',
    description: 'Scheduled differential privacy verification.',
    date: 'UPCOMING',
    status: 'upcoming'
  }
];

export default function NexusStakeholderPortal() {
  const [stats, setStats] = useState<Stats>({
    accuracy: 98.42,
    gpuUtilization: 88,
    memoryUtilization: 64,
    latency: 12,
    batchCount: 4209
  });
  
  const [aiInsight, setAiInsight] = useState<string>("Analyzing metrics...");
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  // AI Insight Generator (disabled - @google/genai removed)
  const generateInsight = useCallback(async (currentStats: Stats) => {
    if (isGeneratingInsight) return;
    setIsGeneratingInsight(true);
    setAiInsight("Generating insight...");
    // AI features disabled - @google/genai removed
    setAiInsight("AI insights unavailable - package not installed.");
    setIsGeneratingInsight(false);
  }, [isGeneratingInsight]);

  // Organic Jitter Logic
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateStats = () => {
      setStats(prev => {
        const nextAccuracy = Math.min(99.99, Math.max(96.0, prev.accuracy + (Math.random() - 0.5) * 0.05));
        const nextLatency = Math.max(8, Math.min(25, prev.latency + (Math.random() - 0.5) * 2));
        const nextGpu = Math.max(80, Math.min(95, prev.gpuUtilization + (Math.random() - 0.5) * 1));
        
        return {
          ...prev,
          accuracy: nextAccuracy,
          latency: nextLatency,
          gpuUtilization: nextGpu,
          batchCount: prev.batchCount + (Math.random() > 0.8 ? 1 : 0)
        };
      });
      timeoutId = setTimeout(updateStats, 2000 + Math.random() * 1000);
    };
    updateStats();
    return () => clearTimeout(timeoutId);
  }, []);

  // Initial Insight on load
  useEffect(() => {
    generateInsight(stats);
    // Removed automatic periodic insight generation to prevent quota exhaustion.
    // const interval = setInterval(() => generateInsight(stats), 30000);
    // return () => clearInterval(interval);
  }, [generateInsight, stats]); // Added generateInsight and stats to dependency array

  return (
    <div className="w-full h-full flex justify-center items-center bg-black/90 p-10">
      <div className="w-[600px] h-[600px] bg-background-dark text-slate-100 font-display relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 flex flex-col selection:bg-primary/30">
        
        {/* Header */}
        <header className="h-14 border-b border-white/10 bg-white/5 backdrop-blur-md px-5 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-primary flex items-center justify-center rounded-lg text-white shadow-[0_0_15px_rgba(61,132,245,0.4)]">
              <Brain size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none tracking-tight">Nexus AI</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold opacity-80">Portal v4.2</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <Sparkles size={12} className="text-accent-cyan" />
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={aiInsight}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] font-medium max-w-[140px] truncate text-slate-300"
                  >
                    {aiInsight}
                  </motion.span>
                </AnimatePresence>
                 <button onClick={() => generateInsight(stats)} disabled={isGeneratingInsight} className="ml-1 text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed transition-colors">
                    <RefreshCcw size={12} className={isGeneratingInsight ? "animate-spin" : ""} />
                </button>
             </div>
            <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-accent-purple p-[1.5px]">
              <div className="w-full h-full rounded-full bg-background-dark overflow-hidden relative">
                <Image
                  alt="User"
                  src="https://picsum.photos/seed/nexus-user/100/100"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-5 grid grid-cols-12 gap-5 overflow-hidden">
          
          {/* Left Column: Stats */}
          <div className="col-span-5 flex flex-col gap-4">
            
            {/* Accuracy */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-xl p-4 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
                <TrendingUp size={14} className="text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">{stats.accuracy.toFixed(2)}</span>
                <span className="text-xs text-emerald-400">%</span>
              </div>
              <div className="h-12 w-full mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                  <motion.path 
                    animate={{ d: `M0,35 Q10,${20 + Math.random()*10} 30,${15 + Math.random()*10} T50,${25 + Math.random()*5} T70,${10 + Math.random()*10} T100,20` }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    fill="none" 
                    stroke="url(#line-gradient)" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_4px_rgba(0,242,255,0.5)]"
                  />
                  <defs>
                    <linearGradient id="line-gradient" x1="0%" x2="100%">
                      <stop offset="0%" stopColor="#3d84f5" />
                      <stop offset="100%" stopColor="#00f2ff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Utilization */}
            <div className="glass-card rounded-xl p-4 flex-1 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2 mb-1">
                 <Activity size={12} className="text-slate-400" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Compute</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-300">GPU Cluster</span>
                  <span className="text-accent-purple font-mono">{stats.gpuUtilization.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${stats.gpuUtilization}%` }} 
                    className="h-full bg-accent-purple shadow-[0_0_8px_rgba(188,19,254,0.4)]" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                 <div className="flex justify-between text-[10px]">
                  <span className="text-slate-300">Latency</span>
                  <span className="text-emerald-400 font-mono">{stats.latency.toFixed(0)}ms</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${Math.min(100, stats.latency * 4)}%` }} 
                    className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" 
                  />
                </div>
              </div>
            </div>

            {/* Active Users/Team */}
            <div className="glass-card rounded-xl p-3 flex items-center justify-between">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="size-6 rounded-full border border-white/10 overflow-hidden relative">
                     <Image
                       src={`https://picsum.photos/seed/user-${i}/50/50`}
                       alt={`User ${i}`}
                       fill
                       className="object-cover"
                       sizes="24px"
                     />
                   </div>
                 ))}
                 <div className="size-6 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-bold border border-white/10">+12</div>
               </div>
               <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                 On Call
               </div>
            </div>

          </div>

          {/* Right Column: Timeline */}
          <div className="col-span-7 glass-card rounded-xl border border-white/10 flex flex-col overflow-hidden relative">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="text-xs font-bold text-slate-200">Milestones</h3>
              <button className="text-[10px] bg-primary/20 text-primary hover:bg-primary hover:text-white px-2 py-1 rounded transition-colors flex items-center gap-1 font-bold">
                <Plus size={10} /> ADD
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10"></div>
              
              {INITIAL_MILESTONES.map((milestone, idx) => (
                <motion.div 
                  key={milestone.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex gap-4 ${milestone.status === 'upcoming' ? 'opacity-50 grayscale' : ''}`}
                >
                  <div className={`z-10 size-6 rounded-full border flex items-center justify-center shrink-0 ${
                    milestone.status === 'complete' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' :
                    milestone.status === 'active' ? 'bg-primary/20 border-primary text-primary' :
                    'bg-background-dark border-white/10 text-slate-500'
                  }`}>
                    {milestone.status === 'complete' ? <CheckCircle2 size={12} /> : 
                     milestone.status === 'active' ? <RefreshCcw size={12} className="animate-spin" /> : 
                     <Shield size={12} />}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white leading-tight">{milestone.title}</h4>
                      <span className="text-[9px] font-mono text-slate-500 bg-white/5 px-1 rounded">{milestone.date}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">{milestone.description}</p>
                    
                    {milestone.comment && (
                      <div className="mt-2 bg-white/5 rounded-lg p-2 border border-white/5 flex gap-2">
                        <div className="size-5 rounded-full overflow-hidden relative flex-shrink-0">
                          <Image
                            src={milestone.comment.avatar}
                            alt={milestone.comment.author}
                            fill
                            className="object-cover"
                            sizes="20px"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[9px] font-bold text-slate-200">{milestone.comment.author}</span>
                            <span className="text-[8px] bg-primary/10 text-primary px-1 rounded">{milestone.comment.role}</span>
                          </div>
                          <p className="text-[9px] text-slate-400 truncate">{milestone.comment.text}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="h-8 border-t border-white/10 bg-black/20 flex items-center justify-between px-5 text-[9px] font-bold tracking-widest text-slate-500 shrink-0">
          <div className="flex gap-4">
             <span className="flex items-center gap-1.5">
               <span className="size-1 rounded-full bg-emerald-500 animate-pulse"></span>
               SYSTEM: ONLINE
             </span>
             <span className="flex items-center gap-1.5">
               <Box size={10} />
               BUILD 4.2.0
             </span>
          </div>
          <div className="flex items-center gap-2">
             <Server size={10} />
             <span>US-EAST-1</span>
          </div>
        </footer>
        
      </div>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}