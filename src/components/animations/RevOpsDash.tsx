'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Target, 
  Users, 
  BarChart3, 
  Layers, 
  Bell, 
  Search, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Hexagon,
  Globe
} from 'lucide-react';

// --- TYPES & INTERFACES ---
interface StreamEvent {
  id: string;
  time: string;
  type: 'success' | 'warning' | 'neutral';
  message: string;
  value?: string;
}

// --- MAIN COMPONENT ---
export default function RevOpsDash() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview');
  
  const [metrics, setMetrics] = useState({
    revenue: { value: 4.28, label: 'Total Revenue', trend: 12.5, unit: 'M' },
    velocity: { value: 14, label: 'Pipeline Velocity', trend: -2.4, unit: 'd' },
    winRate: { value: 34.2, label: 'Win Rate', trend: 5.1, unit: '%' },
    ltv: { value: 8.5, label: 'LTV Ratio', trend: 0.8, unit: 'x' }
  });

  const [stream, setStream] = useState<StreamEvent[]>([
    { id: '1', time: '10:42', type: 'success', message: 'Deal Closed: Enterprise', value: '$124k' },
    { id: '2', time: '10:38', type: 'warning', message: 'Churn Risk: Mid-Market', value: 'High' },
    { id: '3', time: '10:15', type: 'neutral', message: 'Sync Complete: Salesforce', value: '100%' },
  ]);

  // --- ANIMATION LOOPS ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Jitter metrics for live feel
      setMetrics(prev => ({
        ...prev,
        revenue: { ...prev.revenue, value: +(prev.revenue.value + (Math.random() * 0.05 - 0.02)).toFixed(2) },
        winRate: { ...prev.winRate, value: +(prev.winRate.value + (Math.random() * 0.4 - 0.2)).toFixed(1) }
      }));

      // Random stream update logic
      if (Math.random() > 0.7) {
        const newEvent: StreamEvent = {
          id: Date.now().toString(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          type: Math.random() > 0.5 ? 'success' : (Math.random() > 0.5 ? 'warning' : 'neutral'),
          message: ['New Lead', 'Pipeline Update', 'Server Sync', 'Audit Log'][Math.floor(Math.random() * 4)],
          value: ['+12%', 'Pending', 'OK', 'Review'][Math.floor(Math.random() * 4)]
        };
        setStream(prev => [newEvent, ...prev.slice(0, 3)]);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // --- THEME CONSTANTS ---
  const GLASS = 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl';

  return (
    <div className="w-[600px] h-[600px] bg-[#020617] text-slate-200 overflow-hidden relative font-sans selection:bg-blue-500/30 flex flex-col">
      
      {/* --- AMBIENT LIGHTING --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[40%] left-[30%] w-[200px] h-[200px] bg-orange-900/10 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />

      {/* --- HEADER --- */}
      <header className="relative z-20 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Hexagon className="text-white fill-white/20" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight tracking-tight">RevOps<span className="text-blue-400">.Neural</span></h1>
            <p className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">Dashboard v2.0</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className={`size-9 rounded-full flex items-center justify-center ${GLASS} hover:bg-white/10 transition-all`}>
            <Search size={16} className="text-slate-400" />
          </button>
          <button className={`size-9 rounded-full flex items-center justify-center ${GLASS} hover:bg-white/10 transition-all relative`}>
            <Bell size={16} className="text-slate-400" />
            <span className="absolute top-2 right-2.5 size-1.5 bg-orange-500 rounded-full animate-pulse" />
          </button>
          <div className="pl-2">
            <div className="size-9 rounded-full bg-gradient-to-tr from-blue-500 to-orange-400 p-[2px]">
              <img src="https://picsum.photos/id/433/100/100" alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-[#020617]" />
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative z-10 p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
        
        {/* HERO SECTION: REVENUE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative w-full h-48 rounded-2xl p-6 ${GLASS} flex flex-col justify-between overflow-hidden group`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 transition-colors duration-500" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                  Global ARR
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/10">
                  <ArrowUpRight size={10} /> {metrics.revenue.trend}%
                </span>
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
                ${metrics.revenue.value}
                <span className="text-blue-400/80">{metrics.revenue.unit}</span>
              </h2>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400">
              <MoreHorizontal size={20} />
            </div>
          </div>

          <div className="relative h-20 w-full mt-2">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                d="M0 35 C 10 35, 10 20, 20 20 C 30 20, 30 30, 40 28 C 50 26, 50 10, 60 10 C 70 10, 70 25, 80 20 C 90 15, 90 5, 100 5 L 100 40 L 0 40 Z" 
                fill="url(#chartGradient)" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                d="M0 35 C 10 35, 10 20, 20 20 C 30 20, 30 30, 40 28 C 50 26, 50 10, 60 10 C 70 10, 70 25, 80 20 C 90 15, 90 5, 100 5" 
                fill="none" 
                stroke="url(#lineGradient)" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
        </motion.div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-3 gap-4">
          <MetricCard 
            label="Win Rate" 
            value={`${metrics.winRate.value}${metrics.winRate.unit}`} 
            trend={metrics.winRate.trend} 
            icon={<Target size={18} className="text-orange-400" />}
            color="orange"
            delay={0.1}
          />
          <MetricCard 
            label="Velocity" 
            value={`${metrics.velocity.value}${metrics.velocity.unit}`} 
            trend={metrics.velocity.trend} 
            icon={<Zap size={18} className="text-blue-400" />}
            color="blue"
            delay={0.2}
          />
          <MetricCard 
            label="LTV Ratio" 
            value={`${metrics.ltv.value}${metrics.ltv.unit}`} 
            trend={metrics.ltv.trend} 
            icon={<Layers size={18} className="text-amber-400" />}
            color="amber"
            delay={0.3}
          />
        </div>

        {/* DATA STREAM WIDGET */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`flex-1 rounded-2xl p-5 ${GLASS} flex flex-col gap-4 overflow-hidden relative`}
        >
          <div className="flex items-center justify-between z-10">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Activity size={14} className="text-blue-400" />
              Live Intelligence
            </h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </div>

          <div className="space-y-3 relative z-10">
            <AnimatePresence mode="popLayout">
              {stream.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className={`size-2 rounded-full shrink-0 ${
                    event.type === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                    event.type === 'warning' ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]' :
                    'bg-slate-400'
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-xs font-medium text-slate-200 truncate">{event.message}</p>
                      <span className="text-[10px] text-slate-500 font-mono ml-2">{event.time}</span>
                    </div>
                    {event.value && (
                      <p className={`text-[10px] font-bold ${
                        event.type === 'success' ? 'text-emerald-400' : 
                        event.type === 'warning' ? 'text-orange-400' : 'text-slate-400'
                      }`}>
                        {event.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

      </main>

      {/* --- FLOATING DOCK NAVIGATION --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1 p-1.5 rounded-2xl bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50"
        >
          <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Globe size={20} />} />
          <NavButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<BarChart3 size={20} />} />
          <NavButton active={activeTab === 'team'} onClick={() => setActiveTab('team')} icon={<Users size={20} />} />
          <div className="w-px h-6 bg-white/10 mx-1" />
          <NavButton active={false} onClick={() => {}} icon={<div className="size-5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold">AI</div>} />
        </motion.div>
      </div>

    </div>
  );
}

// --- SUB-COMPONENTS (Consolidated) ---

function MetricCard({ label, value, trend, icon, color, delay }: any) {
  const isPositive = trend >= 0;
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between h-28 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
    >
      <div className="flex justify-between items-start">
        <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 ${
          color === 'blue' ? 'text-blue-400' : color === 'orange' ? 'text-orange-400' : 'text-amber-400'
        }`}>
          {icon}
        </div>
        <div className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
          isPositive ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10' : 'text-rose-400 bg-rose-500/10 border-rose-500/10'
        }`}>
          {isPositive ? <ArrowUpRight size={10} className="mr-0.5"/> : <ArrowDownRight size={10} className="mr-0.5"/>}
          {Math.abs(trend)}%
        </div>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-white tracking-tight">{value}</h4>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

function NavButton({ active, onClick, icon }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative size-10 rounded-xl flex items-center justify-center transition-all ${
        active ? 'bg-white/10 text-white shadow-inner shadow-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {active && (
        <motion.div layoutId="active-dot" className="absolute -bottom-1 size-1 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" />
      )}
    </button>
  );
}