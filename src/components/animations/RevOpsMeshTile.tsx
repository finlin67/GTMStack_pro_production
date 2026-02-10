'use client';

import React, { useEffect, useState } from "react";
import { 
  Download, 
  ShieldCheck, 
  GitBranch, 
  Zap, 
  Database, 
  Megaphone, 
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";

export default function RevOpsMeshTile() {
  // Simulate some live data updates for the "Latency" or stats
  const [latency, setLatency] = useState(14);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(10, Math.min(20, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[600px] h-[600px] relative overflow-hidden bg-[#0f111a] border border-white/10 flex flex-col font-display shadow-2xl rounded-none text-slate-100 select-none">
      
      {/* --- Header --- */}
      <header className="h-[15%] flex flex-col justify-center px-6 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white text-lg font-bold tracking-tight">Data Sync Mesh</h2>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">v2.4.0-pro</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="size-2 bg-emerald-500 rounded-full" 
            />
            <span className="text-emerald-500 text-[10px] font-bold tracking-tighter uppercase leading-none">SYSTEM OPERATIONAL</span>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="h-[70%] flex flex-col px-6 py-4 justify-between overflow-hidden relative">
        
        {/* Top Grid Stats */}
        <section className="grid grid-cols-2 gap-2 shrink-0 z-10">
          <StatCard label="Ingest" value="18.4M" icon={<Download size={14} className="text-sky-400" />} />
          <StatCard label="Clean" value="99.8%" icon={<ShieldCheck size={14} className="text-emerald-400" />} />
          <StatCard label="Route" value="142K" icon={<GitBranch size={14} className="text-[#5a5cf2]" />} />
          <StatCard label="Signals" value="1,240" icon={<Zap size={14} className="text-fuchsia-400" />} isLast />
        </section>

        {/* Central Hub Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center py-2 relative">
          
          {/* Animated Background Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
            <motion.line 
              x1="100" x2="100" y1="0" y2="200" 
              stroke="white" strokeWidth="0.5" strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -8] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.line 
              x1="0" x2="200" y1="100" y2="100" 
              stroke="white" strokeWidth="0.5" strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, 8] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="0.2" className="opacity-50" />
            <motion.circle 
              cx="100" cy="100" r="58" fill="none" stroke="white" strokeWidth="0.1" 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "100px 100px" }}
              strokeDasharray="10 20"
            />
          </svg>

          {/* Central Orb */}
          <motion.div 
            animate={{ boxShadow: ["0 0 30px rgba(90, 92, 242, 0.25)", "0 0 50px rgba(90, 92, 242, 0.4)", "0 0 30px rgba(90, 92, 242, 0.25)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="size-24 rounded-full flex flex-col items-center justify-center border-4 border-white/5 relative z-10"
            style={{ background: "radial-gradient(circle at center, #5a5cf2 0%, #111118 100%)" }}
          >
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="text-white opacity-90" size={28} />
            </motion.div>
            <span className="text-white text-[9px] font-bold mt-1">WH-HUB</span>
          </motion.div>

          {/* Floating Connectors Left */}
          <motion.div 
            animate={{ y: ["-50%", "-55%", "-50%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-[15%] -translate-y-1/2 p-2 rounded-lg bg-sky-500/5 text-sky-400/60 border border-sky-400/10 backdrop-blur-sm"
          >
            <Database size={18} />
          </motion.div>

          {/* Floating Connectors Right */}
          <motion.div 
            animate={{ y: ["-50%", "-45%", "-50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 right-[15%] -translate-y-1/2 p-2 rounded-lg bg-emerald-500/5 text-emerald-400/60 border border-emerald-400/10 backdrop-blur-sm"
          >
            <Megaphone size={18} />
          </motion.div>

          <p className="text-[9px] text-slate-500 font-mono mt-4 tracking-[0.2em] uppercase">Live_Mesh_Active</p>
        </div>

        {/* Active Pipelines List */}
        <div className="shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mb-2 z-10">
          <div className="bg-white/5 px-3 py-1.5 border-b border-white/10">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active Pipelines</span>
          </div>
          <div className="divide-y divide-white/10">
            <PipelineRow 
              icon={<Database size={12} />} 
              iconColor="text-sky-400" 
              iconBg="bg-sky-500/10"
              name="Salesforce CRM"
              status="ACTIVE"
              statusColor="text-sky-400"
              statusBg="bg-sky-400/10"
              latency="12ms"
            />
            <PipelineRow 
              icon={<Megaphone size={12} />} 
              iconColor="text-emerald-400" 
              iconBg="bg-emerald-500/10"
              name="HubSpot MAP"
              status="SYNCING"
              statusColor="text-emerald-400"
              statusBg="bg-emerald-400/10"
              latency="4ms"
            />
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="h-[15%] flex flex-col justify-center px-6 gap-2 bg-black/40 border-t border-white/10">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-[8px] font-bold uppercase tracking-wider leading-none">Mesh Load</span>
            <span className="text-white font-mono text-[9px]">High Efficiency 80%</span>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-[#5a5cf2] h-full" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/5">
          <FooterStat label="Availability" value="100%" color="text-emerald-400" />
          <FooterStat label="Latency" value={`${latency}ms`} color="text-sky-400" />
          <FooterStat label="Error Rate" value="0.002%" color="text-slate-300" />
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents for Cleanliness ---

function StatCard({ label, value, icon, isLast }: { label: string; value: string; icon: React.ReactNode; isLast?: boolean }) {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 p-2.5 rounded-lg flex items-center justify-between ${isLast ? 'border-fuchsia-500/20' : ''}`}>
      <div>
        <p className="text-slate-500 text-[8px] font-bold uppercase tracking-wider">{label}</p>
        <h4 className="text-sm font-mono text-white font-bold">{value}</h4>
      </div>
      {icon}
    </div>
  );
}

function PipelineRow({ icon, iconColor, iconBg, name, status, statusColor, statusBg, latency }: any) {
  return (
    <div className="px-3 py-2 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
      <div className="flex items-center gap-2">
        <div className={`size-6 rounded ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <span className="text-xs font-bold text-white group-hover:text-slate-200 transition-colors">{name}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-[8px] ${statusColor} font-bold px-1.5 py-0.5 rounded ${statusBg}`}>{status}</span>
        <span className="font-mono text-[10px] text-slate-400">{latency}</span>
      </div>
    </div>
  );
}

function FooterStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <p className="text-slate-500 text-[7px] uppercase font-bold">{label}</p>
      <p className={`${color} font-mono text-[10px]`}>{value}</p>
    </div>
  );
}