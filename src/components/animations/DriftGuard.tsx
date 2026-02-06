'use client';

// FILE: DriftGuard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Cpu, 
  Zap, 
  Target, 
  ShieldCheck, 
  ChevronRight,
  RefreshCw
} from "lucide-react";

/**
 * TYPES & INTERFACES
 */
interface MetricState {
  confidence: number;
  drift: number;
  latency: number;
  throughput: number;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  msg: string;
  time: string;
}

/**
 * SUB-COMPONENTS
 */
const MetricCard = ({ icon: Icon, label, value, unit, color, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-panel p-3 flex flex-col justify-between border border-white/5 bg-[#1a1f24]/40 rounded-lg h-[110px]"
  >
    <div className="flex justify-between items-start">
      <div className={`p-1.5 rounded-md ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={16} />
      </div>
      <span className={`text-[10px] font-bold ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-black tabular-nums tracking-tight">{value}</span>
        <span className="text-[10px] font-bold text-slate-400">{unit}</span>
      </div>
    </div>
  </motion.div>
);

/**
 * MAIN COMPONENT: DriftGuard
 * A high-density 600x600 AI Performance Monitoring Dashboard
 */
export default function DriftGuard() {
  // --- STATE ---
  const [metrics, setMetrics] = useState<MetricState>({
    confidence: 94.2,
    drift: 0.041,
    latency: 12.8,
    throughput: 1240
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', type: 'critical', msg: 'Concept drift detected in NLP-Core-v2', time: '2m ago' },
    { id: '2', type: 'warning', msg: 'Latency spike in us-east-1 endpoint', time: '5m ago' },
    { id: '3', type: 'info', msg: 'New model weights deployed (v2.4.1)', time: '14m ago' }
  ]);

  // --- LOGIC: Real-time Data Jitter ---
  useEffect(() => {
    const updateLoop = () => {
      setMetrics(prev => ({
        confidence: Number((prev.confidence + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        drift: Number((prev.drift + (Math.random() * 0.004 - 0.002)).toFixed(3)),
        latency: Number((prev.latency + (Math.random() * 1.2 - 0.6)).toFixed(1)),
        throughput: Math.floor(prev.throughput + (Math.random() * 20 - 10))
      }));
      setTimeout(updateLoop, 2000 + Math.random() * 1000);
    };

    const timer = setTimeout(updateLoop, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simplified chart visualization points
  const chartPoints = useMemo(() => Array.from({ length: 12 }, () => Math.random() * 40 + 20), []);

  return (
    <div className="w-[600px] h-[600px] overflow-hidden relative bg-[#0a0c0e] text-white selection:bg-[#13a4ec]/30 font-['Space_Grotesk'] border border-white/10 shadow-2xl">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#13a4ec 1px, transparent 1px), linear-gradient(90deg, #13a4ec 1px, transparent 1px)',
             backgroundSize: '30px 30px' 
           }} 
      />
      
      {/* HEADER */}
      <header className="h-14 px-5 border-b border-white/5 flex items-center justify-between bg-[#0a0c0e]/80 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#13a4ec] rounded flex items-center justify-center">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase italic leading-none">DriftGuard</h1>
            <p className="text-[9px] text-[#13a4ec] font-bold tracking-tighter uppercase opacity-80">AI Sentinel Engine</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">System Optimal</span>
          </div>
          <RefreshCw size={14} className="text-slate-500 cursor-pointer hover:text-[#13a4ec] transition-colors" />
        </div>
      </header>

      <main className="p-4 relative z-10 flex flex-col gap-4 h-[calc(600px-56px)]">
        
        {/* TOP GRID: 4 Core Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            icon={Target} 
            label="Avg Confidence" 
            value={metrics.confidence} 
            unit="%" 
            color="text-[#13a4ec]" 
            trend={+0.4} 
          />
          <MetricCard 
            icon={BarChart3} 
            label="Model Drift" 
            value={metrics.drift} 
            unit="σ" 
            color="text-purple-500" 
            trend={-1.2} 
          />
          <MetricCard 
            icon={Zap} 
            label="P99 Latency" 
            value={metrics.latency} 
            unit="ms" 
            color="text-amber-400" 
            trend={+2.1} 
          />
          <MetricCard 
            icon={Activity} 
            label="Throughput" 
            value={(metrics.throughput / 1000).toFixed(1)} 
            unit="k/s" 
            color="text-cyan-400" 
            trend={+0.8} 
          />
        </div>

        {/* MIDDLE SECTION: Performance Visualization */}
        <div className="glass-panel p-4 border border-white/5 bg-[#1a1f24]/20 rounded-lg flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-[#13a4ec]" />
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] italic">Real-time Performance</h2>
            </div>
            <div className="flex gap-2 text-[9px] font-bold text-slate-500 uppercase">
              <span className="text-[#13a4ec] underline underline-offset-4">Inference</span>
              <span>Training</span>
            </div>
          </div>
          
          <div className="flex-1 w-full relative flex items-end justify-between px-2 overflow-hidden border-b border-white/5">
            {chartPoints.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="w-[12px] bg-gradient-to-t from-[#13a4ec]/5 via-[#13a4ec]/40 to-[#13a4ec] rounded-t-sm"
              />
            ))}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              {[0, 1, 2, 3].map(j => <div key={j} className="w-full h-px bg-white/10" />)}
            </div>
          </div>
          <div className="flex justify-between mt-2 px-1">
             <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">-60M</span>
             <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">-30M</span>
             <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">NOW</span>
          </div>
        </div>

        {/* BOTTOM SECTION: Alerts Feed */}
        <div className="glass-panel p-4 border border-white/5 bg-[#1a1f24]/20 rounded-lg h-[150px] overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-500" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] italic">Drift Alerts</h3>
            </div>
            <button className="text-[9px] font-bold text-[#13a4ec] hover:underline uppercase tracking-widest">Clear All</button>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {alerts.map((alert) => (
                <motion.div 
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5 group cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      alert.type === 'critical' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 
                      alert.type === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 
                      'bg-sky-500 shadow-[0_0_8px_#0ea5e9]'
                    }`} />
                    <p className="text-[10px] font-bold text-slate-200 truncate pr-4">{alert.msg}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[9px] text-slate-500 font-medium italic">{alert.time}</span>
                    <ChevronRight size={12} className="text-slate-700 group-hover:text-[#13a4ec] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* FOOTER DECOR */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#13a4ec]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}
