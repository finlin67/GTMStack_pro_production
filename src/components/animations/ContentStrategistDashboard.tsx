'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Lightbulb, 
  FileText, 
  FilePenLine, 
  Share2, 
  TrendingUp, 
  Palette, 
  Zap, 
  Camera, 
  Linkedin,
  Activity
} from 'lucide-react';

// Custom colors from the original design
const COLORS = {
  primary: "#7f13ec",
  accentCyan: "#22d3ee",
  accentPink: "#f472b6",
};

// Types for our stats
interface DashboardStats {
  liveViews: number;
  convRate: number;
  avgSpend: number;
  apiLatency: number;
  velocity: number[];
}

export default function ContentStrategistDashboard() {
  const [time, setTime] = useState<string>("");
  const [stats, setStats] = useState<DashboardStats>({
    liveViews: 14200,
    convRate: 4.2,
    avgSpend: 24,
    apiLatency: 12,
    velocity: [40, 60, 30, 80, 50, 95, 70]
  });
  const [showNotification, setShowNotification] = useState(false);

  // Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'GMT' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Jitter/Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        liveViews: prev.liveViews + Math.floor(Math.random() * 50) - 20,
        convRate: Number((prev.convRate + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        apiLatency: Math.max(5, prev.apiLatency + Math.floor(Math.random() * 6) - 3),
        velocity: prev.velocity.map(h => Math.max(10, Math.min(100, h + Math.floor(Math.random() * 40) - 20)))
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSync = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative bg-slate-950 selection:bg-[#22d3ee]/30 p-4 flex flex-col gap-3 rounded-xl shadow-2xl shadow-[#7f13ec]/20 text-white font-sans antialiased">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#7f13ec]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#22d3ee]/5 blur-[80px] rounded-full pointer-events-none" />

        {/* Notification Toast */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute top-4 right-4 z-50 bg-[#0f172a]/95 backdrop-blur-md border border-[#22d3ee]/50 shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] pl-3 pr-5 py-2.5 rounded-lg flex items-center gap-3"
            >
              <div className="size-7 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/20 flex items-center justify-center shrink-0">
                <Activity className="w-3.5 h-3.5 text-[#22d3ee] animate-[spin_3s_linear_infinite]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white tracking-wide leading-none">SYNC_INITIATED</span>
                <span className="text-[9px] text-[#22d3ee] font-mono leading-none mt-1 opacity-80">UPLINK_ESTABLISHED...</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22d3ee]/5 to-transparent skew-x-12 animate-pulse pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 pb-2 z-10">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-[#7f13ec] rounded-md flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h1 className="text-sm font-bold tracking-tight">
              STRATEGIST_OS <span className="text-[#7f13ec] text-[10px] font-mono ml-1">v4.2</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
              SYSTEMS_NOMINAL
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest min-w-[60px]">
              {time} GMT
            </span>
          </div>
        </header>

        {/* Main Grid */}
        <div className="flex-1 grid grid-cols-12 gap-3 overflow-hidden z-10">
          
          {/* Left Column: Lifecycle Pipeline */}
          <div className="col-span-7 flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Lifecycle Pipeline</h2>
              <span className="text-[10px] text-[#22d3ee] font-mono">FLOW: 98%</span>
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1 [&::-webkit-scrollbar]:hidden overflow-y-auto">
              {/* Ideate Card */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex items-center gap-3 group hover:border-[#22d3ee]/50 transition-colors">
                <div className="size-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#f472b6] stroke-[url(#gradient)]" style={{ stroke: "url(#blue-pink-gradient)" }} />
                  {/* SVG Gradient Definition for Lucide Icons */}
                  <svg width="0" height="0">
                    <linearGradient id="blue-pink-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop stopColor="#f472b6" offset="0%" />
                      <stop stopColor="#22d3ee" offset="100%" />
                    </linearGradient>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold truncate">Ideate</h3>
                    <span className="text-[9px] px-1 bg-[#7f13ec]/20 text-[#7f13ec] rounded">ACTIVE</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-[#7f13ec] h-full" 
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-mono leading-none">12.4k</p>
                  <p className="text-[8px] text-slate-500 uppercase">Input</p>
                </div>
              </div>

              {/* Create Card */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex items-center gap-3 group border-l-2 border-l-[#22d3ee]">
                <div className="size-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" style={{ stroke: "url(#blue-pink-gradient)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold truncate">Create</h3>
                    <span className="text-[9px] px-1 bg-[#22d3ee]/20 text-[#22d3ee] rounded">PROCESS</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                      className="bg-[#22d3ee] h-full" 
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-mono leading-none">842</p>
                  <p className="text-[8px] text-slate-500 uppercase">Drafts</p>
                </div>
              </div>

              {/* Optimize Card */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex items-center gap-3 opacity-80">
                <div className="size-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                  <FilePenLine className="w-5 h-5" style={{ stroke: "url(#blue-pink-gradient)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold truncate">Optimize</h3>
                    <span className="text-[9px] px-1 bg-slate-700 text-slate-400 rounded">QUEUE</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
                    <div className="bg-slate-600 w-1/4 h-full"></div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-mono leading-none">SEO</p>
                  <p className="text-[8px] text-slate-500 uppercase">Target</p>
                </div>
              </div>

              {/* Publish Card */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex items-center gap-3 opacity-60">
                <div className="size-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5" style={{ stroke: "url(#blue-pink-gradient)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold truncate">Publish</h3>
                    <span className="text-[9px] px-1 bg-slate-700 text-slate-400 rounded">IDLE</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
                    <div className="bg-slate-600 w-0 h-full"></div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-mono leading-none">SYNC</p>
                  <p className="text-[8px] text-slate-500 uppercase">Ready</p>
                </div>
              </div>
            </div>

            {/* Velocity Metrics (Chart) */}
            <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-3 rounded-lg mt-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Velocity Metrics</span>
                <span className="text-[9px] text-[#f472b6]">LIVE TICKER</span>
              </div>
              <div className="flex gap-1 h-12 items-end">
                {stats.velocity.map((height, i) => {
                  let colorClass = "bg-[#7f13ec]";
                  if (i === 2 || i === 3) colorClass = "bg-[#22d3ee]";
                  if (i === 4 || i === 5) colorClass = "bg-[#f472b6]";
                  const opacity = i % 2 === 0 ? 0.4 : 1;
                  
                  return (
                    <motion.div
                      key={i}
                      animate={{ height: `${height}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-full rounded-sm ${colorClass}`}
                      style={{ opacity }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Engagement Core */}
          <div className="col-span-5 flex flex-col gap-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Engagement Core</h2>
            
            <div className="grid grid-cols-2 gap-2 flex-1">
              {/* Live Views */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex flex-col justify-between border-t-2 border-t-[#22d3ee]">
                <span className="text-[9px] text-slate-400 uppercase">Live Views</span>
                <div>
                  <div className="text-lg font-bold font-mono">{(stats.liveViews / 1000).toFixed(1)}k</div>
                  <div className="text-[9px] text-green-400 flex items-center">
                    <TrendingUp className="w-[10px] h-[10px] mr-0.5" /> 12%
                  </div>
                </div>
              </div>

              {/* Conv Rate */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex flex-col justify-between border-t-2 border-t-[#f472b6]">
                <span className="text-[9px] text-slate-400 uppercase">Conv. Rate</span>
                <div>
                  <div className="text-lg font-bold font-mono">{stats.convRate}%</div>
                  <div className="text-[9px] text-green-400 flex items-center">
                    <TrendingUp className="w-[10px] h-[10px] mr-0.5" /> 0.8%
                  </div>
                </div>
              </div>

              {/* Avg Spend */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex flex-col justify-between border-t-2 border-t-[#7f13ec]">
                <span className="text-[9px] text-slate-400 uppercase">Avg Spend</span>
                <div>
                  <div className="text-lg font-bold font-mono">${stats.avgSpend}k</div>
                  <div className="text-[9px] text-slate-400 flex items-center">
                    <Palette className="w-[10px] h-[10px] mr-0.5" /> NORM
                  </div>
                </div>
              </div>

              {/* Social Echo */}
              <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg flex flex-col justify-between border-t-2 border-t-yellow-500">
                <span className="text-[9px] text-slate-400 uppercase">Social Echo</span>
                <div>
                  <div className="text-lg font-bold font-mono">HIGH</div>
                  <div className="text-[9px] text-yellow-400 flex items-center">
                    <Zap className="w-[10px] h-[10px] mr-0.5 fill-yellow-400" /> PEAK
                  </div>
                </div>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="bg-[#191022]/40 backdrop-blur-md border border-[#7f13ec]/15 p-2 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Camera className="w-3.5 h-3.5 text-[#f472b6]" />
                  <span className="text-[10px] font-medium truncate">IG</span>
                </div>
                <div className="w-16 bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#f472b6] w-3/4 h-full"></div>
                </div>
                <span className="text-[9px] font-mono">48%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Linkedin className="w-3.5 h-3.5 text-[#22d3ee]" />
                  <span className="text-[10px] font-medium truncate">LI</span>
                </div>
                <div className="w-16 bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#22d3ee] w-1/3 h-full"></div>
                </div>
                <span className="text-[9px] font-mono">32%</span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-[#7f13ec] p-3 rounded-lg relative overflow-hidden group mt-auto">
              <div className="absolute -right-4 -bottom-4 size-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              <h4 className="text-[11px] font-bold leading-tight mb-2">Omni-Channel Sync Required</h4>
              <button 
                onClick={handleSync}
                className="w-full bg-white text-[#7f13ec] text-[10px] font-bold py-1.5 rounded uppercase tracking-wider hover:bg-slate-100 transition-colors cursor-pointer active:scale-95 duration-100"
              >
                EXECUTE_FLIGHT
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800 pt-2 flex items-center justify-between text-[8px] text-slate-500 font-mono tracking-tighter z-10">
          <div className="flex gap-4">
            <span>UPTIME: 142h 08m</span>
            <span>NODES: 4/4</span>
            <span>API_LATENCY: {stats.apiLatency}ms</span>
          </div>
          <div className="flex gap-3">
            <span className="text-[#7f13ec]">SECURE_CHANNEL_V3</span>
            <span>© 2024 FLOW_AI</span>
          </div>
        </footer>
      </div>
    </div>
  );
}