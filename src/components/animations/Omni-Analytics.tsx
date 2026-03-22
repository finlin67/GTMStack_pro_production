'use client';

// FILE: Omni-Analytics.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Smartphone, 
  ShoppingBag, 
  Globe, 
  Activity,
  Store,
  Instagram
} from 'lucide-react';

/**
 * TYPES & INTERFACES
 */
interface ActivityItem {
  id: string;
  user: string;
  action: string;
  source: string;
  time: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
}

interface Stats {
  totalSales: number;
  activeTraffic: number;
  roi: number;
  cartAbandonment: number;
  funnel: {
    awareness: string;
    interest: string;
    consideration: string;
    purchase: string;
  };
}

/**
 * MOCK DATA CONSTANTS
 */
const INITIAL_ACTIVITIES: ActivityItem[] = [
  { id: '1', user: '#8921', action: 'Switched', source: 'IG', time: '2s', icon: Smartphone, color: 'text-blue-400' },
  { id: '2', user: '#4292', action: 'Paid', source: 'NY', time: '14s', icon: ShoppingBag, color: 'text-green-400', badge: '+$142' },
  { id: '3', user: '#1104', action: 'Carted', source: 'Web', time: '1m', icon: Globe, color: 'text-purple-400' },
];

/**
 * INLINED SUB-COMPONENTS (Not Exported)
 */
const MetricCard = ({ label, value, trend, icon: Icon, bars, isNegative = false }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col justify-between h-[75px]">
    <div className="flex justify-between items-start">
      <span className="text-[9px] uppercase font-bold text-white/40 tracking-wider leading-none">{label}</span>
      <Icon className={`size-3 ${isNegative ? 'text-red-500' : 'text-primary'}`} />
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-sm font-bold truncate">{value}</span>
      <span className={`text-[8px] font-bold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>{trend}</span>
    </div>
    <div className="h-4 w-full flex items-end gap-0.5 mt-1">
      {bars.map((h: number, i: number) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          className={`flex-1 rounded-t-[1px] ${i === bars.length - 1 ? (isNegative ? 'bg-red-500' : 'bg-primary') : 'bg-white/10'}`}
        />
      ))}
    </div>
  </div>
);

const FunnelStep = ({ label, value, width, color, rounded = "" }: any) => (
  <div className={`${width} h-8 ${color} ${rounded} flex items-center justify-between px-3 relative group overflow-hidden`}>
    <span className="text-[10px] font-bold text-white/90">{label}</span>
    <span className="text-[10px] font-black text-white">{value}</span>
    <motion.div 
      className="absolute inset-0 bg-white/20"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
    />
  </div>
);

const ChannelMini = ({ icon: Icon, label, val }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex items-center gap-2 overflow-hidden">
    <Icon className="size-3 text-primary shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[8px] font-bold truncate uppercase">{label}</span>
        <span className="text-[8px] font-bold text-white/40">{val}</span>
      </div>
      <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: val }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  </div>
);

/**
 * MAIN COMPONENT: OmnichannelAnalytics
 * Optimized for Landing Page Tiles.
 * Scales responsively within a w-full h-full parent.
 */
export default function OmnichannelAnalytics() {
  const [stats, setStats] = useState<Stats>({
    totalSales: 128430.00,
    activeTraffic: 4292,
    roi: 340,
    cartAbandonment: 22.4,
    funnel: { awareness: '1.2M', interest: '450K', consideration: '128K', purchase: '42K' }
  });
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const timerRef = useRef<any>(null);

  const updateStats = useCallback(() => {
    setStats(prev => ({
      ...prev,
      totalSales: prev.totalSales + (Math.random() - 0.45) * 50,
      activeTraffic: prev.activeTraffic + Math.floor((Math.random() - 0.5) * 10),
      roi: Math.min(prev.roi + (Math.random() - 0.5) * 0.5, 500),
    }));

    if (Math.random() > 0.7) {
      const newItem: ActivityItem = {
        id: Math.random().toString(36).substr(2, 5),
        user: `#${Math.floor(Math.random() * 9000) + 1000}`,
        action: 'Viewed',
        source: 'Landing',
        time: 'now',
        icon: Activity,
        color: 'text-primary'
      };
      setActivities(prev => [newItem, ...prev.slice(0, 2)]);
    }
    timerRef.current = setTimeout(updateStats, 3000);
  }, []);

  useEffect(() => {
    updateStats();
    return () => clearTimeout(timerRef.current);
  }, [updateStats]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#120a06]">
      <div className="relative w-full h-full aspect-square max-w-[600px] max-h-[600px] overflow-hidden bg-[#120a06] text-white font-sans p-4 flex flex-col gap-4 selection:bg-primary/30 border border-white/5 shadow-2xl rounded-2xl">
        {/* Header */}
        <header className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-7 bg-primary rounded flex items-center justify-center shadow-[0_0_10px_rgba(248,105,22,0.4)]">
              <BarChart3 className="size-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight leading-none uppercase">Omnichannel</h1>
              <div className="flex items-center gap-1 mt-1">
                <motion.div 
                  animate={{ opacity: [1, 0.3, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="size-1.5 rounded-full bg-green-500" 
                />
                <span className="text-[8px] uppercase tracking-tighter text-white/40 font-bold">Real-time Stream Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-[8px] text-white/40 font-bold uppercase">System Status</p>
              <p className="text-[10px] font-bold text-green-400">OPTIMIZED</p>
            </div>
            <div className="size-8 rounded-full border border-white/10 bg-[url('/images/placeholder-avatar.svg')] bg-cover" />
          </div>
        </header>

        {/* Metric Grid (2x2) */}
        <div className="grid grid-cols-2 gap-2 shrink-0">
          <MetricCard label="Total Sales" value={`$${stats.totalSales.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} trend="+12%" icon={TrendingUp} bars={[30, 50, 40, 70, 90]} />
          <MetricCard label="Active Users" value={stats.activeTraffic} trend="+5%" icon={Users} bars={[20, 40, 60, 50, 80]} />
          <MetricCard label="ROI Efficiency" value={`${Math.round(stats.roi)}%`} trend="+8%" icon={Activity} bars={[60, 50, 70, 60, 95]} />
          <MetricCard label="Abandon Rate" value={`${stats.cartAbandonment}%`} trend="-2%" icon={ShoppingCart} bars={[80, 60, 50, 40, 30]} isNegative />
        </div>

        {/* Main Analysis Section (Split View) */}
        <div className="flex gap-3 flex-1 min-h-0">
          {/* Conversion Funnel (Left) */}
          <div className="w-[55%] bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col">
            <h3 className="text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest">Conversion Flow</h3>
            <div className="flex-1 flex flex-col items-center justify-center gap-1">
              <FunnelStep label="AWARENESS" value={stats.funnel.awareness} width="w-full" color="bg-orange-500" rounded="rounded-t-lg" />
              <FunnelStep label="INTEREST" value={stats.funnel.interest} width="w-[85%]" color="bg-orange-600" />
              <FunnelStep label="CONSIDER" value={stats.funnel.consideration} width="w-[70%]" color="bg-red-500" />
              <FunnelStep label="PURCHASE" value={stats.funnel.purchase} width="w-[55%]" color="bg-red-700" rounded="rounded-b-lg" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="text-center">
                <p className="text-xs font-bold text-primary">68%</p>
                <p className="text-[7px] uppercase font-bold text-white/30">Retention</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold">$84</p>
                <p className="text-[7px] uppercase font-bold text-white/30">Avg Order</p>
              </div>
            </div>
          </div>

          {/* Activity Feed (Right) */}
          <div className="w-[45%] flex flex-col gap-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 flex flex-col overflow-hidden">
              <h3 className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">Live Activity</h3>
              <div className="space-y-2 flex-1 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {activities.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white/5 border border-white/5 rounded p-2 flex items-center gap-2 group cursor-pointer"
                    >
                      <div className={`size-6 rounded-full bg-white/5 flex items-center justify-center ${item.color} shrink-0`}>
                        <item.icon className="size-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold truncate">{item.user}</span>
                          <span className="text-[7px] text-white/30">{item.time}</span>
                        </div>
                        <p className="text-[8px] text-white/50 truncate">{item.action} {item.source}</p>
                      </div>
                      {item.badge && <span className="text-[8px] font-black text-green-400 shrink-0">{item.badge}</span>}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Channels */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <ChannelMini icon={Globe} label="Web" val="75%" />
          <ChannelMini icon={Instagram} label="Social" val="38%" />
          <ChannelMini icon={Store} label="Store" val="45%" />
        </div>

        <footer className="shrink-0 flex justify-between items-center border-t border-white/10 pt-2">
          <p className="text-[7px] text-white/20 font-bold uppercase tracking-widest">Encrypted Live Pipeline v4.2.0</p>
          <div className="flex gap-2">
            <div className="size-1.5 rounded-full bg-primary" />
            <div className="size-1.5 rounded-full bg-white/10" />
            <div className="size-1.5 rounded-full bg-white/10" />
          </div>
        </footer>
      </div>
    </div>
  );
}
