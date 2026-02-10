import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Eye, 
  MousePointer2, 
  History, 
  BadgeCheck, 
  Megaphone, 
  Shield, 
  Database, 
  Plus,
  Cpu,
  Server,
  Activity,
  Trash2,
  BarChart3,
  TrendingUp,
  Zap
} from 'lucide-react';

// --- Types ---
interface StatState {
  aware: number;
  engage: number;
  retain: number;
  loyal: number;
  activeUsers: number;
  engaged: number;
  conversion: number;
  campaigns: number;
}

interface PerfState {
  cpu: number;
  memory: number;
  network: number;
}

interface FeedItem {
  id: number;
  text: React.ReactNode;
  time: string;
  type: 'success' | 'info' | 'warning';
}

// --- Constants ---
const INITIAL_STATS: StatState = {
  aware: 48000,
  engage: 12000,
  retain: 8100,
  loyal: 2400,
  activeUsers: 124500,
  engaged: 42200,
  conversion: 3.8,
  campaigns: 6
};

const INITIAL_PERF: PerfState = {
  cpu: 42,
  memory: 68,
  network: 2.4
};

const FEED_ITEMS: FeedItem[] = [
  { id: 1, text: <>#8294 moved to <span className="text-emerald-500 font-bold">Loyal</span></>, time: 'Now', type: 'success' },
  { id: 2, text: <>Campaign: <span className="text-slate-400">Winter Splash</span></>, time: '2m', type: 'info' },
  { id: 3, text: <>#9921 moved to <span className="text-emerald-500 font-bold">Loyal</span></>, time: '5m', type: 'success' },
  { id: 4, text: <>Cohort: <span className="text-slate-400">Nov 07 Started</span></>, time: '12m', type: 'info' },
  { id: 5, text: <>#1023 risk <span className="text-orange-500 font-bold">High</span></>, time: '15m', type: 'warning' },
];

const getRetentionStyle = (value: number) => {
  if (value === 100) return "bg-[#00f3ff] text-[#0f172a]";
  if (value >= 90) return "bg-[#0ea5e9] text-white";
  if (value >= 80) return "bg-[#3b82f6] text-white";
  if (value >= 70) return "bg-[#6366f1] text-white";
  if (value >= 60) return "bg-[#8b5cf6] text-white";
  if (value >= 50) return "bg-[#a855f7] text-white";
  if (value >= 40) return "bg-[#7e22ce] text-white";
  if (value >= 30) return "bg-[#6b21a8] text-white";
  if (value >= 20) return "bg-[#581c87] text-white";
  if (value >= 10) return "bg-[#4c1d95] text-white";
  return "bg-[#1e1b4b] text-[#64748b]";
};

export default function Lifecycle360() {
  const [stats, setStats] = useState<StatState>(INITIAL_STATS);
  const [perf, setPerf] = useState<PerfState>(INITIAL_PERF);
  const [perfHistory, setPerfHistory] = useState<{ cpu: number[], memory: number[], network: number[] }>({
    cpu: Array(40).fill(40).map(() => 30 + Math.random() * 20),
    memory: Array(40).fill(60).map(() => 50 + Math.random() * 20),
    network: Array(40).fill(2).map(() => 1 + Math.random() * 2)
  });
  const [liveFeed, setLiveFeed] = useState<FeedItem[]>(FEED_ITEMS.slice(0, 3));

  // Organic Jitter: Stats
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 4,
        retain: prev.retain + Math.floor(Math.random() * 3) - 1,
        engage: prev.engage + Math.floor(Math.random() * 5) - 2,
      }));
      timeout = setTimeout(animate, 2500);
    };
    timeout = setTimeout(animate, 2500);
    return () => clearTimeout(timeout);
  }, []);

  // Organic Jitter: Performance & History
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      setPerf(prev => {
        const newCpu = Math.min(100, Math.max(10, prev.cpu + Math.floor(Math.random() * 15) - 7));
        const newMem = Math.min(95, Math.max(40, prev.memory + Math.floor(Math.random() * 5) - 2));
        const newNet = Math.max(0, +(prev.network + (Math.random() * 1.2 - 0.5)).toFixed(1));

        setPerfHistory(prevHist => ({
          cpu: [...prevHist.cpu.slice(1), newCpu],
          memory: [...prevHist.memory.slice(1), newMem],
          network: [...prevHist.network.slice(1), newNet]
        }));

        return {
          cpu: newCpu,
          memory: newMem,
          network: newNet
        };
      });
      timeout = setTimeout(animate, 1500);
    };
    timeout = setTimeout(animate, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Live Feed Simulation
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      const nextItemIndex = Math.floor(Math.random() * FEED_ITEMS.length);
      const newItem = { ...FEED_ITEMS[nextItemIndex], id: Date.now() }; 
      
      setLiveFeed(prev => {
        if (prev.length === 0) return prev; 
        const newFeed = [newItem, ...prev];
        return newFeed.slice(0, 4); 
      });
      timeout = setTimeout(animate, 4000);
    };
    timeout = setTimeout(animate, 4000);
    return () => clearTimeout(timeout);
  }, []);

  const formatK = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
  const formatComma = (num: number) => num.toLocaleString();

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#000000] text-white font-['Inter']">
      
      {/* 600x600 Fixed Tile Container */}
      <div className="w-[600px] h-[600px] bg-[#0a0f1a] border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col selection:bg-cyan-500/30">
        
        {/* Header (Top 7%) */}
        <header className="h-[40px] flex items-center justify-between border-b border-slate-800 px-3 bg-[#0a0f1a]/95 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-5 bg-[#135bec] rounded flex items-center justify-center shadow-[0_0_10px_rgba(19,91,236,0.5)]">
              <Video className="text-white w-3 h-3" />
            </div>
            <h2 className="font-bold tracking-tight text-sm text-white">Lifecycle Engine</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">v2.4 Live</span>
            <div className="flex gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>
          </div>
        </header>

        {/* Main Layout: Sandwich Design */}
        <div className="flex-1 flex flex-col relative z-10">
          
          {/* 1. Top Section: Key Metrics (Secondary Data) */}
          <div className="h-[90px] grid grid-cols-4 border-b border-slate-800/50 bg-slate-900/20">
             <StatMini label="Active Users" value={formatComma(stats.activeUsers)} change="+12%" />
             <StatMini label="New Signups" value="5.2k" change="+8.5%" />
             <StatMini label="Conversion" value={`${stats.conversion}%`} change="+0.4%" />
             <StatMini label="Avg Session" value="3m 15s" change="+0.9%" />
          </div>

          {/* 2. Hero Section: Flywheel (Optical Center) */}
          <div className="h-[140px] relative flex items-center justify-center border-b border-slate-800/50 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(19,91,236,0.08)_0%,transparent_70%)]">
             {/* Decorative Connecting Line */}
             <div className="absolute top-1/2 left-10 right-10 h-[1px] bg-slate-800/60 -translate-y-1/2 z-0" />
             
             <div className="relative z-10 flex justify-between w-full px-12 items-center">
                <FlywheelNode icon={Eye} label="Aware" value={formatK(stats.aware)} color="#135bec" />
                <FlywheelNode icon={MousePointer2} label="Engage" value={formatK(stats.engage)} color="#a855f7" />
                
                {/* Central Hero Pulse */}
                <div className="flex flex-col items-center gap-0.5 relative -mt-4">
                  <motion.div 
                     animate={{ 
                       boxShadow: ["0 0 10px rgba(249,115,22,0.2)", "0 0 25px rgba(249,115,22,0.5)", "0 0 10px rgba(249,115,22,0.2)"],
                       scale: [1, 1.05, 1]
                     }}
                     transition={{ duration: 3, repeat: Infinity }}
                     className="size-20 rounded-full border-2 border-orange-500 bg-[#0a0f1a] flex flex-col items-center justify-center text-center relative z-20 shadow-2xl"
                  >
                    <History className="text-white w-5 h-5 mb-0.5" />
                    <span className="font-black text-lg leading-none">{formatK(stats.retain)}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Retain</span>
                  </motion.div>
                  <div className="absolute -bottom-6 bg-emerald-500 text-[9px] px-2 py-0.5 rounded-full font-bold text-black border border-emerald-400 shadow-[0_4px_10px_rgba(16,185,129,0.4)] z-30">
                    +8%
                  </div>
                </div>

                <FlywheelNode icon={BadgeCheck} label="Loyal" value={formatK(stats.loyal)} color="#10b981" />
             </div>
          </div>

          {/* 3. Lower Section: Details Grid */}
          <div className="flex-1 flex border-b border-slate-800/50">
             {/* Left: Heatmap */}
             <div className="w-[320px] border-r border-slate-800/50 p-2 flex flex-col">
                <div className="flex items-center justify-between mb-2 px-1">
                   <h3 className="font-bold text-[10px] text-orange-400 uppercase tracking-wide flex items-center gap-1">
                     <TrendingUp className="w-3 h-3" /> Retention Heatmap
                   </h3>
                   <span className="text-[9px] text-slate-500">D30: 68%</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <table className="w-full text-center border-separate border-spacing-1">
                    <thead>
                      <tr className="text-[8px] font-bold text-slate-500 uppercase">
                        <th className="text-left font-normal">Cohort</th>
                        <th className="font-normal">Users</th>
                        <th className="font-normal">W0</th>
                        <th className="font-normal">W1</th>
                        <th className="font-normal">W2</th>
                        <th className="font-normal">W3</th>
                      </tr>
                    </thead>
                    <tbody className="text-[9px] font-bold font-mono">
                      <HeatmapRow date="Oct 23" users="1.2k" values={[100, 92, 84, 78]} />
                      <HeatmapRow date="Oct 30" users="1.4k" values={[100, 88, 76, 64]} />
                      <HeatmapRow date="Nov 06" users="1.1k" values={[100, 94, 88, 82]} />
                      <HeatmapRow date="Nov 13" users="0.9k" values={[100, 91, 85, -1]} />
                    </tbody>
                  </table>
                </div>
             </div>

             {/* Right: Live Feed */}
             <div className="flex-1 p-2 bg-slate-900/10">
                <div className="flex items-center justify-between mb-2 px-1">
                   <h3 className="font-bold text-[10px] text-slate-400 uppercase tracking-wide flex items-center gap-1">
                     <Zap className="w-3 h-3 text-yellow-500" /> Live Feed
                   </h3>
                   <button 
                      onClick={() => setLiveFeed([])} 
                      className="text-[8px] text-slate-600 hover:text-red-400 uppercase transition-colors"
                   >
                     Clear
                   </button>
                </div>
                <div className="space-y-1.5 relative h-[120px] overflow-hidden mask-linear-fade">
                   <AnimatePresence initial={false} mode='popLayout'>
                    {liveFeed.map((item) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-2 p-1.5 bg-slate-800/40 rounded border border-slate-700/30"
                      >
                        <div className={`size-1.5 rounded-full shrink-0 ${
                          item.type === 'warning' ? 'bg-orange-500 shadow-[0_0_6px_#f97316]' : 
                          item.type === 'success' ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 
                          'bg-[#135bec] shadow-[0_0_6px_#135bec]'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] truncate text-slate-300 font-medium leading-tight">
                            {item.text}
                          </p>
                        </div>
                        <span className="text-[8px] text-slate-600 shrink-0 font-mono">{item.time}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                   {liveFeed.length === 0 && (
                      <div className="text-center text-[9px] text-slate-600 py-8">Waiting for events...</div>
                   )}
                </div>
             </div>
          </div>
        </div>

        {/* 4. Telemetry Section: Bottom 15% (~90px) */}
        <div className="h-[90px] bg-[#0d121f] border-t border-slate-800 px-4 py-2 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
               <Cpu className="w-3 h-3 text-slate-500" />
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">System Telemetry</span>
            </div>
            <div className="grid grid-cols-3 gap-3 h-full">
              <PerfHorizontal label="CPU Load" value={perf.cpu} color="#00f3ff" history={perfHistory.cpu} />
              <PerfHorizontal label="Memory" value={perf.memory} color="#a855f7" history={perfHistory.memory} />
              <PerfHorizontal label="Network" value={perf.network} color="#10b981" history={perfHistory.network} unit=" MB/s" />
            </div>
        </div>

        {/* Footer */}
        <footer className="h-[25px] flex justify-between items-center px-3 text-[8px] text-slate-600 font-medium bg-[#05080f] z-30 shrink-0 border-t border-slate-800/50">
          <p className="font-mono">ID: LC-360-X92</p>
          <div className="flex gap-3">
            <span className="flex items-center gap-1 hover:text-slate-400 cursor-pointer transition-colors">
              <Shield className="w-2 h-2" /> ENCRYPTED
            </span>
            <span className="flex items-center gap-1 hover:text-slate-400 cursor-pointer transition-colors">
              <Database className="w-2 h-2" /> CONNECTED
            </span>
          </div>
        </footer>

        {/* FAB */}
        <button className="absolute bottom-[100px] right-4 size-8 bg-[#135bec] text-white rounded-full shadow-[0_4px_20px_rgba(19,91,236,0.4)] flex items-center justify-center hover:scale-110 transition-transform z-40 border border-blue-400/20 active:scale-95 group">
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function StatMini({ label, value, change }: { label: string, value: string, change: string }) {
   return (
      <div className="flex flex-col items-center justify-center border-r border-slate-800/30 last:border-r-0 p-2 hover:bg-slate-800/30 transition-colors group cursor-default">
         <span className="text-[9px] text-slate-500 uppercase mb-0.5 font-medium group-hover:text-slate-400">{label}</span>
         <span className="text-sm font-bold text-white leading-none mb-1">{value}</span>
         <span className="text-[8px] text-emerald-400 bg-emerald-500/10 px-1 rounded">{change}</span>
      </div>
   )
}

function FlywheelNode({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 z-10 bg-[#0a0f1a] py-1">
      <div className="size-10 rounded-full border border-opacity-30 bg-[#0a0f1a] flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group" style={{ borderColor: color }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: color }} />
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex flex-col items-center">
         <span className="font-bold text-[10px] leading-none text-white">{value}</span>
         <span className="text-[8px] text-slate-500 uppercase tracking-wide mt-0.5">{label}</span>
      </div>
    </div>
  );
}

function Tooltip({ history, unit, label, color }: { history: number[], unit: string, label: string, color: string }) {
  const peak = Math.max(...history).toFixed(1);
  const avg = (history.reduce((a, b) => a + b, 0) / history.length).toFixed(1);
  const max = Math.max(...history) || 100;
  const min = Math.min(...history) || 0;
  const range = max - min || 1;
  
  const width = 100;
  const height = 20;
  const points = history.map((val, i) => {
    const x = (i / (history.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      className="absolute bottom-full left-0 mb-2 w-32 bg-[#0f172a] border border-slate-700 p-2 rounded shadow-xl z-50 pointer-events-none"
    >
      <div className="flex justify-between items-center mb-1 pb-1 border-b border-slate-800">
        <span className="text-[8px] font-bold text-slate-400 uppercase">{label}</span>
        <span className="text-[8px] font-mono text-white">{history[history.length-1].toFixed(0)}{unit}</span>
      </div>
      <div className="relative h-5 w-full bg-slate-900/50 rounded overflow-hidden">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      </div>
    </motion.div>
  );
}

function PerfHorizontal({ label, value, color, history, unit = "%" }: { label: string, value: number, color: string, history: number[], unit?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col justify-end relative h-full group"
    >
      <AnimatePresence>
        {isHovered && <Tooltip history={history} unit={unit} label={label} color={color} />}
      </AnimatePresence>
      
      <div className="flex justify-between items-end mb-1">
         <span className="text-[9px] font-medium text-slate-400">{label}</span>
         <span className={`text-[9px] font-mono font-bold ${value > 90 ? 'text-orange-500' : 'text-slate-300'}`}>{value}{unit}</span>
      </div>
      
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: value > 85 ? '#f97316' : color }}
          animate={{ width: `${Math.min(100, Math.max(5, value))}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

function HeatmapRow({ date, users, values }: { date: string, users: string, values: number[] }) {
  return (
    <tr>
      <td className="text-left text-slate-400 py-0.5 pl-1 border-b border-slate-800/30">{date}</td>
      <td className="text-slate-300 border-b border-slate-800/30">{users}</td>
      {values.map((val, i) => (
        <td key={i} className="py-0.5 px-px border-b border-slate-800/30">
          {val === -1 ? (
            <div className="bg-[#1e1b4b] text-[#64748b] py-0.5 rounded-sm opacity-20 mx-0.5">-</div>
          ) : (
            <div className={`${getRetentionStyle(val)} py-0.5 rounded-sm shadow-sm text-[8px] mx-0.5`}>{val}</div>
          )}
        </td>
      ))}
    </tr>
  );
}
