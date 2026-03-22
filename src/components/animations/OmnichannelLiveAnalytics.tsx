'use client';
// FILE: OmnichannelLiveAnalytics.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Bell,
  TrendingUp,
  BarChart3,
  Target,
  ShoppingCart,
  Smartphone,
  ShoppingBag,
  Globe,
  Download,
  Settings,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface FunnelStats {
  label: string;
  value: string;
  subtext: string;
  gradient: string;
  width: string;
  connectorWidth: number;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  amount?: string;
  icon: React.ReactNode;
  color: string;
}

// --- Internal Helper Components ---

/**
 * A glassmorphism container with optional hover borders.
 */
const GlassPanel = ({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <div className={`bg-slate-900/60 backdrop-blur-md border border-cyan-500/15 rounded-xl ${hover ? 'hover:border-cyan-500/40 transition-all duration-300' : ''} ${className}`}>
    {children}
  </div>
);

/**
 * A compact statistical card with a micro-chart visualization.
 */
const StatCard = ({ label, value, trend, icon: Icon, colorClass }: { label: string; value: string; trend: string; icon: React.ElementType; colorClass: string }) => (
  <GlassPanel className="p-3 flex flex-col gap-1 group">
    <div className="flex justify-between items-start">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider group-hover:text-cyan-400/70 transition-colors">{label}</p>
      <Icon size={14} className={colorClass} />
    </div>
    <div className="flex items-baseline gap-1">
      <p className="text-lg font-bold tracking-tight text-white">{value}</p>
      <span className={`${colorClass} text-[10px] font-bold`}>{trend}</span>
    </div>
    <div className="h-4 w-full flex items-end gap-0.5 opacity-50">
      {[40, 60, 45, 70, 85, 100].map((h, i) => (
        <div 
          key={`bar-${i}`} 
          className={`flex-1 rounded-t-[1px] ${i === 5 ? 'bg-cyan-400' : 'bg-cyan-400/20'}`} 
          style={{ height: `${h}%` }} 
        />
      ))}
    </div>
  </GlassPanel>
);

/**
 * OmnichannelLiveAnalytics: A high-fidelity, real-time analytics dashboard
 * strictly constrained to a 600x600px square display.
 */
export default function OmnichannelLiveAnalytics() {
  const [sales, setSales] = useState(128430.42);
  const [traffic, setTraffic] = useState(4292);
  const [time, setTime] = useState(new Date());

  // Simulation of live data updates with organic jitter
  useEffect(() => {
    const timer = setInterval(() => {
      setSales(prev => prev + (Math.random() * 12 - 4));
      setTraffic(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
      setTime(new Date());
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const funnelSteps: FunnelStats[] = [
    { label: "Awareness", value: "1.2M", subtext: "Reach", gradient: "from-[#1e1b4b] to-[#312e81]", width: "w-full", connectorWidth: 260 },
    { label: "Interest", value: "450K", subtext: "Engaged", gradient: "from-[#312e81] to-[#4338ca]", width: "w-[85%]", connectorWidth: 220 },
    { label: "Consideration", value: "128K", subtext: "Viewed Items", gradient: "from-[#4338ca] to-[#3b82f6]", width: "w-[70%]", connectorWidth: 180 },
    { label: "Purchase", value: "42.2K", subtext: "Conversions", gradient: "from-[#3b82f6] to-[#00f2ff]", width: "w-[55%]", connectorWidth: 0 },
  ];

  const activities: ActivityItem[] = [
    { id: 'act-1', user: '#8921', action: 'Instagram → Web Store', time: '2s ago', icon: <Smartphone size={14} />, color: 'text-cyan-400' },
    { id: 'act-2', user: '#4292', action: 'Purchase in NY Store', time: '14s ago', amount: '+$142', icon: <ShoppingBag size={14} />, color: 'text-cyan-400' },
    { id: 'act-3', user: '#1104', action: 'Cart: 3 items (Market)', time: '1m ago', icon: <Globe size={14} />, color: 'text-purple-400' },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#010409] p-4 overflow-hidden">
      <div className="max-w-[600px] max-h-[600px] w-full h-full aspect-square overflow-hidden relative bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 flex flex-col border border-white/5 shadow-2xl rounded-2xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-cyan-500/20 px-4 py-3 bg-slate-900/60 backdrop-blur-xl z-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-7 bg-cyan-400 rounded flex items-center justify-center text-slate-900 shadow-[0_0_15px_rgba(0,242,255,0.4)]">
              <Activity size={16} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm font-bold tracking-tight text-white leading-none">Omnichannel Live</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <motion.span 
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#00f2ff]"
                />
                <span className="text-[8px] uppercase tracking-widest text-cyan-400/70 font-black">System Live</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="size-8 flex items-center justify-center rounded-lg bg-cyan-500/5 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition-colors">
              <Bell size={16} />
            </button>
            <div className="size-8 rounded-full border-2 border-cyan-400/50 bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("/images/placeholder-avatar.svg")' }}>
              <span className="sr-only">User Profile</span>
            </div>
          </div>
        </header>

        {/* Scrollable Main Layout */}
        <main className="p-4 flex-1 overflow-y-auto space-y-4 pb-6 scrollbar-hide">
          {/* Statistics Overview */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Total Sales (24h)" value={`$${sales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} trend="+12.5%" icon={TrendingUp} colorClass="text-cyan-400" />
            <StatCard label="Active Traffic" value={traffic.toLocaleString()} trend="+5.2%" icon={BarChart3} colorClass="text-cyan-400" />
            <StatCard label="Current ROI" value="340%" trend="+8.1%" icon={Target} colorClass="text-cyan-400" />
            <StatCard label="Abandonment" value="22.4%" trend="-2.1%" icon={ShoppingCart} colorClass="text-purple-400" />
          </div>

          {/* Funnel Visualization */}
          <div className="space-y-4">
            <GlassPanel className="p-4" hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Conversion Funnel</h3>
                <div className="flex gap-1">
                  <span className="text-[9px] bg-cyan-400 text-slate-900 px-1.5 py-0.5 rounded font-bold">LIVE</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                {funnelSteps.map((step) => (
                  <React.Fragment key={step.label}>
                    <div className={`${step.width} h-10 bg-gradient-to-b ${step.gradient} flex items-center justify-between px-4 border-x border-cyan-500/10 transition-all ${step.label === 'Awareness' ? 'rounded-t-lg border-t' : ''} ${step.label === 'Purchase' ? 'rounded-b-lg border-b shadow-[0_5px_15px_rgba(0,242,255,0.2)]' : ''}`}>
                      <span className={`text-[10px] font-bold ${step.label === 'Purchase' ? 'text-slate-900' : 'text-white'}`}>{step.label}</span>
                      <div className="text-right">
                        <p className={`text-xs font-black leading-none ${step.label === 'Purchase' ? 'text-slate-900' : 'text-white'}`}>{step.value}</p>
                        <p className={`text-[8px] font-bold opacity-70 ${step.label === 'Purchase' ? 'text-slate-800' : 'text-cyan-300'}`}>{step.subtext}</p>
                      </div>
                    </div>
                    {step.connectorWidth > 0 && (
                      <div 
                        className="w-0 h-0 border-t-[10px] border-t-indigo-900/40 border-l-transparent border-r-transparent"
                        style={{ borderLeftWidth: step.connectorWidth / 2, borderRightWidth: step.connectorWidth / 2 }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 text-center border-t border-cyan-500/10 pt-3">
                {[
                  { label: 'Retention', val: '68%', color: 'text-cyan-400' },
                  { label: 'Growth', val: '14.2%', color: 'text-white' },
                  { label: 'Session', val: '2.4m', color: 'text-white' },
                  { label: 'Avg Order', val: '$84', color: 'text-white' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className={`${item.color} text-xs font-black tracking-tight`}>{item.val}</p>
                    <p className="text-slate-500 text-[8px] uppercase font-bold tracking-tighter">{item.label}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            {/* Activity Feed */}
            <GlassPanel className="p-4" hover={false}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Live Activity</h3>
                <span className="text-[8px] text-slate-500 font-bold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {activities.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id} 
                      className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/40 border border-cyan-500/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
                    >
                      <div className={`size-8 rounded-full flex items-center justify-center bg-cyan-500/10 ${item.color} border border-cyan-500/10`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-bold text-slate-100">User {item.user}</p>
                          <span className="text-[8px] text-slate-500 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 truncate pr-2">{item.action}</p>
                      </div>
                      {item.amount ? (
                        <span className="text-cyan-400 font-bold text-[10px] shrink-0">{item.amount}</span>
                      ) : (
                        <ArrowRight size={12} className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </GlassPanel>
          </div>
        </main>

        {/* Footer Branding & Actions */}
        <footer className="px-4 py-3 border-t border-cyan-500/20 flex items-center justify-between bg-slate-900/60 backdrop-blur-xl shrink-0">
          <p className="text-[9px] text-slate-500 font-medium">Synced: <span className="text-cyan-400/70">{time.toLocaleTimeString()} GMT</span></p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded bg-slate-800 text-slate-400 border border-cyan-500/10 hover:text-cyan-400 transition-colors" title="Export Data">
              <Download size={12} />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 rounded text-[9px] font-black text-slate-900 uppercase tracking-tighter shadow-[0_0_10px_rgba(0,242,255,0.3)] hover:brightness-110 transition-all">
              <Settings size={12} /> Config
            </button>
          </div>
        </footer>

        {/* Subtle Visual Flourishes */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-[80px] -z-10 pointer-events-none" />
      </div>
    </div>
  );
}
