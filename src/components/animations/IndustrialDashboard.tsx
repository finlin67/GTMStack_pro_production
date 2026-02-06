
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Factory, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Cpu, 
  HardHat, 
  DollarSign, 
  Network,
  FileText,
  Rocket
} from 'lucide-react';

interface StatsState {
  oeeGain: number;
  downtime: number;
  payback: number;
  uptime: number;
}

export default function IndustrialDashboard() {
  const [stats, setStats] = useState<StatsState>({
    oeeGain: 15.0,
    downtime: 22.0,
    payback: 14.2,
    uptime: 99.9
  });

  // Simulated live jitter for metrics
  const updateStats = useCallback(() => {
    setStats(prev => ({
      oeeGain: +(prev.oeeGain + (Math.random() * 0.2 - 0.1)).toFixed(1),
      downtime: +(prev.downtime + (Math.random() * 0.2 - 0.1)).toFixed(1),
      payback: +(prev.payback + (Math.random() * 0.02 - 0.01)).toFixed(1),
      uptime: Math.min(100, +(prev.uptime + (Math.random() * 0.02 - 0.01)).toFixed(1))
    }));

    const timeoutId = setTimeout(updateStats, 2000 + Math.random() * 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cleanup = updateStats();
    return cleanup;
  }, [updateStats]);

  return (
    <div className="w-[600px] h-[600px] bg-slate-900 text-slate-100 p-4 border border-slate-800 shadow-2xl relative flex flex-col overflow-hidden font-sans">
      
      {/* Header */}
      <header className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-[#308ce8] p-1.5 rounded">
            <Factory className="text-white w-4 h-4" />
          </div>
          <h1 className="text-sm font-bold tracking-tight uppercase">Efficiency & ROI Dashboard</h1>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase"
        >
          ROI Validated
        </motion.div>
      </header>

      {/* Progress Stepper */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="flex flex-col gap-1">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="h-1 w-full bg-[#308ce8] rounded-full"
          />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-[#308ce8]">01</span>
            <span className="text-[10px] text-slate-300 font-medium">Concept</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-[#308ce8]/40 h-full w-1/2"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-500">02</span>
            <span className="text-[10px] text-slate-400 font-medium">Pilot</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-1 w-full bg-slate-700 rounded-full"></div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-500">03</span>
            <span className="text-[10px] text-slate-400 font-medium">Rollout</span>
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">OEE Gain</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-white">+{stats.oeeGain}%</span>
            <TrendingUp className="text-[#308ce8] w-3 h-3" />
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Downtime</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-red-400">-{stats.downtime}%</span>
            <TrendingDown className="text-red-400 w-3 h-3" />
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Payback</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-bold text-white">{stats.payback}</span>
            <span className="text-[10px] text-slate-500 font-medium italic">mos</span>
          </div>
        </motion.div>
      </div>

      {/* Matrix Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs font-bold uppercase text-slate-400 tracking-widest flex items-center gap-2">
          <Users className="w-3 h-3 text-[#308ce8]" /> Stakeholder Matrix
        </h2>
        <span className="text-[9px] text-slate-500">Phase 02 Optimization</span>
      </div>

      {/* Stakeholder Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
        {/* Operations */}
        <motion.div 
          whileHover={{ borderColor: "rgba(48, 140, 232, 0.5)" }}
          className="bg-slate-800/30 border border-slate-700 rounded-lg p-3 flex flex-col justify-between group transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="text-[#308ce8] w-4 h-4" />
              <h3 className="text-xs font-bold">Operations</h3>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">Throughput Optimization</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">Reduced Cycle Times</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-700/50">
            <p className="text-[9px] text-slate-500 uppercase font-bold">Metric: +12% OEE</p>
          </div>
        </motion.div>

        {/* Engineering */}
        <motion.div 
          whileHover={{ borderColor: "rgba(48, 140, 232, 0.5)" }}
          className="bg-slate-800/30 border border-slate-700 rounded-lg p-3 flex flex-col justify-between group transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <HardHat className="text-[#308ce8] w-4 h-4" />
              <h3 className="text-xs font-bold">Engineering</h3>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">Real-time Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">API Integration</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-700/50">
            <p className="text-[9px] text-slate-500 uppercase font-bold">Metric: Zero Latency</p>
          </div>
        </motion.div>

        {/* Finance */}
        <motion.div 
          whileHover={{ borderColor: "rgba(48, 140, 232, 0.5)" }}
          className="bg-slate-800/30 border border-slate-700 rounded-lg p-3 flex flex-col justify-between group transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="text-[#308ce8] w-4 h-4" />
              <h3 className="text-xs font-bold">Finance</h3>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">Capex ROI Mapping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">TCO Reduction</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-700/50">
            <p className="text-[9px] text-slate-500 uppercase font-bold">Metric: 18mo Payback</p>
          </div>
        </motion.div>

        {/* IT/Security */}
        <motion.div 
          whileHover={{ borderColor: "rgba(48, 140, 232, 0.5)" }}
          className="bg-slate-800/30 border border-slate-700 rounded-lg p-3 flex flex-col justify-between group transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Network className="text-[#308ce8] w-4 h-4" />
              <h3 className="text-xs font-bold">IT/Security</h3>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">SOC2 Compliance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] text-slate-400">Edge Connectivity</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-700/50">
            <p className="text-[9px] text-slate-500 uppercase font-bold">Metric: {stats.uptime}% Uptime</p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">System Status</span>
          <div className="flex items-center gap-1">
            <motion.span 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
            />
            <span className="text-[10px] text-slate-300">Live Simulation Active</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-md text-[10px] font-bold border border-slate-700 transition-all flex items-center gap-1.5">
            <FileText className="w-3 h-3" /> Export PDF
          </button>
          <button className="bg-[#308ce8] hover:bg-[#308ce8]/90 text-white px-3 py-1.5 rounded-md text-[10px] font-bold shadow-lg shadow-[#308ce8]/20 transition-all flex items-center gap-1.5">
            <Rocket className="w-3 h-3" /> Scale Pilot
          </button>
        </div>
      </footer>
    </div>
  );
}
