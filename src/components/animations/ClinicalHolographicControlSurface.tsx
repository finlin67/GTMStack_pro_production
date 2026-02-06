'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Radar, 
  Shield, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  Sun,
  Moon
} from 'lucide-react';

/**
 * APPLICATION: Clinical Holographic Control Surface
 * ROLE: Standalone Production-Ready Library Component
 * CONSTRAINTS: 600x600px strict bounding box, dual-theme, real-time simulation.
 */

// --- Internal Simulation Hooks ---

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isDark = theme === 'dark';

  const colors = useMemo(() => ({
    primary: isDark ? '#6366f1' : '#4f46e5',
    secondary: isDark ? '#f97316' : '#ea580c',
    tertiary: isDark ? '#fbbf24' : '#d97706',
    success: isDark ? '#34d399' : '#059669',
    text: isDark ? 'text-slate-300' : 'text-slate-600',
    heading: isDark ? 'text-white' : 'text-slate-900',
    muted: isDark ? 'text-slate-500' : 'text-slate-400',
    border: isDark ? 'border-white/5' : 'border-slate-200',
    panel: isDark
      ? 'bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl'
      : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
    highlightPanel: isDark
      ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-xl border border-white/10'
      : 'bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-[0_8px_30px_rgb(79,70,229,0.08)]'
  }), [isDark]);

  return { theme, setTheme, isDark, colors };
}

function useSimulation() {
  const [stats, setStats] = useState({
    latency: 12,
    marketScore: 92,
    completion: 85,
    harvesting: 42,
    endpoints: 18
  });

  const historyData = useMemo(() => ({
    completion: [62, 65, 63, 70, 75, 72, 80, 82, stats.completion],
    harvesting: [25, 28, 22, 30, 35, 32, 38, 40, stats.harvesting]
  }), [stats.completion, stats.harvesting]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        latency: Math.max(8, Math.min(24, prev.latency + (Math.random() > 0.5 ? 1 : -1))),
        marketScore: Math.max(88, Math.min(98, prev.marketScore + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        harvesting: Math.min(100, Math.max(40, prev.harvesting + (Math.random() > 0.6 ? 1.5 : -0.5))),
        completion: Math.min(100, Math.max(80, prev.completion + (Math.random() > 0.7 ? 0.5 : -0.2)))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return { stats, historyData };
}

// --- Sub-Components ---

const Sparkline = React.memo(function Sparkline({ data, colorHex, label, isDark }: { data: number[], colorHex: string, label: string, isDark: boolean }) {
  const [hovered, setHovered] = useState(false);
  const width = 120;
  const height = 28;
  const min = Math.min(...data) * 0.9;
  const max = Math.max(...data, 100);
  const range = max - min || 1;

  const points = useMemo(() => data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' '), [data, min, range, width, height]);

  const areaPath = useMemo(() => `M 0,${height} ${data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `L ${x},${y}`;
  }).join(' ')} L ${width},${height} Z`, [data, min, range, width, height]);

  return (
    <div className="relative flex items-center justify-center cursor-crosshair group py-1 h-7" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={colorHex} stopOpacity={isDark ? 0.4 : 0.2} />
            <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={areaPath} fill={`url(#grad-${label})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
        <motion.polyline 
          points={points} 
          fill="none" 
          stroke={colorHex} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          initial={{ pathLength: 0 }} 
          animate={{ pathLength: 1 }} 
          transition={{ duration: 1.2, ease: "easeOut" }} 
        />
      </svg>
      <AnimatePresence>
        {hovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 5 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 5 }} 
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 ${isDark ? 'bg-slate-900/95 border-slate-700 text-white' : 'bg-white/95 border-slate-200 text-slate-900'} border rounded text-[10px] font-mono z-20 pointer-events-none shadow-xl min-w-[60px] text-center`}
          >
            <span style={{ color: colorHex }}>{data[data.length - 1].toFixed(1)}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// --- UI Sections ---

function Header({ isDark, colors, latency, setTheme }: any) {
  return (
    <header className={`flex items-center justify-between px-6 py-4 relative z-50 border-b ${colors.border} ${isDark ? 'bg-[#0F172A]/90' : 'bg-white/90'} backdrop-blur-xl h-[68px] shrink-0`}>
      <div className="flex items-center gap-3">
        <div className={`size-9 rounded-xl flex items-center justify-center text-white shadow-lg ${isDark ? 'bg-indigo-600 shadow-indigo-900/20' : 'bg-indigo-600 shadow-indigo-200'}`}>
          <LayoutDashboard size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.heading}`}>Pulse Core</h2>
          <p className={`text-[10px] font-medium opacity-60 ${colors.muted}`}>Node: RT-Alpha-9</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end pr-4 border-r border-white/10">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'} animate-pulse`} />
            <span className={`text-[10px] font-bold ${colors.text}`}>LIVE FEED</span>
          </div>
          <span className={`text-[9px] font-mono opacity-40 ${colors.text}`}>{latency}ms</span>
        </div>
        <button 
          onClick={() => setTheme((t: any) => t === 'light' ? 'dark' : 'light')} 
          className={`p-2 rounded-full transition-all ${isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}

// --- Main Application ---

export default function ClinicalHolographicControlSurface() {
  const { theme, setTheme, isDark, colors } = useTheme();
  const { stats, historyData } = useSimulation();

  return (
    <div className={`w-[600px] h-[600px] max-w-[600px] max-h-[600px] overflow-hidden relative font-['Manrope'] antialiased flex flex-col transition-colors duration-700 ${isDark ? 'bg-[#0F172A] text-slate-300' : 'bg-[#F8FAFC] text-slate-600'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 10px; }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,${isDark ? 'rgba(99,102,241,0.1)' : 'rgba(226,232,240,0.4)'}_0%,transparent_70%)]`} />
        <AnimatePresence>
          {isDark && (
            <motion.div 
              key="glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[100px]" 
            />
          )}
        </AnimatePresence>
      </div>

      <Header isDark={isDark} colors={colors} latency={stats.latency} setTheme={setTheme} />

      <main className="flex-1 p-5 flex flex-col gap-4 overflow-hidden relative z-10">
        
        {/* Top: Status & Market */}
        <div className="grid grid-cols-12 gap-4 h-[150px]">
          <div className={`col-span-8 ${colors.highlightPanel} rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center group border ${isDark ? 'border-white/10' : 'border-indigo-100'}`}>
            <div className="relative z-10">
              <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-[0.15em] mb-2 ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>Protocol Alpha</span>
              <h1 className={`text-xl font-extrabold tracking-tight ${colors.heading}`}>Regulatory <span style={{ color: colors.primary }}>Fabric</span></h1>
              <p className="text-[11px] font-medium opacity-70 mt-1 max-w-[220px]">Real-time synthesis of cross-regional clinical evidence and compliance pathways.</p>
              <button className={`mt-4 px-4 py-1.5 rounded-lg text-[9px] font-bold flex items-center gap-2 transition-all ${isDark ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'}`}>
                EXECUTE ANALYSIS <ArrowRight size={10} strokeWidth={3} />
              </button>
            </div>
            <Activity className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] rotate-[-15deg] group-hover:scale-110 transition-transform duration-1000" size={160} />
          </div>

          <div className={`col-span-4 ${colors.panel} rounded-2xl p-5 flex flex-col justify-between border ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-[9px] font-bold uppercase tracking-widest ${colors.muted}`}>Efficiency</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-4xl font-extralight tracking-tighter ${colors.heading}`}>{Math.floor(stats.marketScore)}</span>
                  <span className={`text-[10px] font-bold ${colors.muted}`}>%</span>
                </div>
              </div>
              <Radar size={18} style={{ color: colors.primary }} />
            </div>
            <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${stats.marketScore}%` }} className="h-full" style={{ backgroundColor: colors.primary }} />
            </div>
          </div>
        </div>

        {/* Middle: Data Visualization Table */}
        <div className={`${colors.panel} rounded-2xl flex-1 flex flex-col overflow-hidden border ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className={`px-5 py-3 border-b ${colors.border} flex justify-between items-center bg-white/5`}>
            <div className="flex items-center gap-2">
              <TrendingUp size={14} style={{ color: colors.primary }} />
              <h3 className={`text-[10px] font-bold uppercase tracking-widest ${colors.heading}`}>Evidence Engine</h3>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            <table className="w-full text-left">
              <thead className={`text-[8px] font-bold uppercase tracking-[0.2em] ${colors.muted}`}>
                <tr>
                  <th className="px-3 py-2">Metric Vector</th>
                  <th className="px-3 py-2">Velocity</th>
                  <th className="px-3 py-2">Historical (6M)</th>
                </tr>
              </thead>
              <tbody className="text-[10px] font-medium">
                <tr className={`border-b border-white/5 ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'} transition-colors`}>
                  <td className={`px-3 py-4 font-bold ${colors.heading}`}>Protocol Validation</td>
                  <td className="px-3 py-4 font-mono font-bold text-emerald-500">92.4%</td>
                  <td className="px-3 py-4 w-[140px]"><Sparkline data={historyData.completion} colorHex={colors.primary} label="prot" isDark={isDark} /></td>
                </tr>
                <tr className={`${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'} transition-colors`}>
                  <td className={`px-3 py-4 font-bold ${colors.heading}`}>Harvester Node RWD</td>
                  <td className="px-3 py-4 font-mono font-bold text-orange-500">48.2%</td>
                  <td className="px-3 py-4 w-[140px]"><Sparkline data={historyData.harvesting} colorHex={colors.secondary} label="harv" isDark={isDark} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom: Checklists & Journey */}
        <div className="grid grid-cols-2 gap-4 h-[140px]">
          <div className={`${colors.panel} rounded-2xl p-5 border ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest ${colors.heading} mb-3 flex items-center gap-2`}>
              <Shield size={12} /> Verification
            </h3>
            <div className="space-y-2">
              {[
                { id: 'h-1', name: 'HIPAA Layer', color: colors.success, icon: ShieldCheck, status: 'Active' },
                { id: 's-2', name: 'ISO-27001', color: colors.tertiary, icon: RefreshCw, status: 'Review' }
              ].map((item) => (
                <div key={item.id} className={`flex items-center justify-between p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-2">
                    <item.icon size={11} style={{ color: item.color }} />
                    <span className="text-[10px] font-bold">{item.name}</span>
                  </div>
                  <span className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`${colors.panel} rounded-2xl p-5 border ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest ${colors.heading} mb-3`}>Journey Map</h3>
            <div className="flex items-end justify-between gap-2 h-14 px-1">
              {[
                { id: 'b-1', val: 100, active: true },
                { id: 'b-2', val: 75, active: true },
                { id: 'b-3', val: 40, active: false },
                { id: 'b-4', val: 15, active: false }
              ].map((node) => (
                <div key={node.id} className="flex-1 flex flex-col items-center">
                  <div className={`w-full rounded-t-sm relative ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} style={{ height: `${node.val}%` }}>
                    <motion.div 
                      initial={{ scaleY: 0 }} 
                      animate={{ scaleY: 1 }} 
                      className="absolute inset-0 origin-bottom rounded-t-sm" 
                      style={{ 
                        backgroundColor: node.active ? colors.primary : colors.muted, 
                        opacity: node.active ? 0.7 : 0.3 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={`h-[32px] px-6 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.25em] border-t ${colors.border} ${isDark ? 'bg-slate-900/50 text-slate-500' : 'bg-white text-slate-400'} shrink-0`}>
        <span>System Log: Clear</span>
        <div className="flex gap-5">
          <button className="hover:text-indigo-400 transition-colors">Safety Matrix</button>
          <button className="hover:text-indigo-400 transition-colors">Documentation</button>
          <span className="opacity-20">|</span>
          <span>©2024 HT Core Pulse</span>
        </div>
      </footer>
    </div>
  );
}
