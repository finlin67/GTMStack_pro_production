
'use client';
// FILE: PowerGridDashboard.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Activity, 
  Scale, 
  Users, 
  Sun, 
  Moon, 
  Clock, 
  Network, 
  BarChart3, 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';

// --- Interfaces & Types ---
interface Stats {
  managedCapital: string;
  capitalChange: string;
  reliability: string;
  reliabilityStatus: string;
  esgIndex: number;
  monthActive: number;
}

// --- Sub-components (Inlined) ---
const Header = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => (
  <header className="flex items-center justify-between border-b border-solid border-border-light dark:border-border-dark px-3 py-1.5 bg-surface-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
    <div className="flex items-center gap-2 text-text-main-light dark:text-text-main-dark">
      <div className="size-3 text-primary">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
        </svg>
      </div>
      <h2 className="text-[10px] font-bold leading-tight tracking-tight uppercase">PowerGrid Digital</h2>
    </div>
    <div className="flex gap-2 items-center">
      <button 
        className="p-1 rounded bg-gray-100 dark:bg-surface-highlight text-text-main-light dark:text-text-main-dark hover:bg-primary/10 transition-colors"
        onClick={toggleDarkMode}
        aria-label="Toggle Theme"
      >
        {darkMode ? <Sun className="size-3" /> : <Moon className="size-3" />}
      </button>
      <div className="size-5 rounded-full border border-primary/20 bg-cover bg-center bg-[url('/images/placeholder-avatar.svg')]" />
    </div>
  </header>
);

const StatCard = ({ label, value, subValue, icon }: { label: string; value: string; subValue?: string | React.ReactNode; icon?: React.ReactNode }) => (
  <div className="flex flex-col gap-0.5 rounded-md p-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
    <p className="text-text-muted-light dark:text-text-muted-dark text-[8px] font-medium truncate uppercase tracking-tighter">{label}</p>
    <div className="flex items-end gap-1 overflow-hidden">
      <p className="text-xs font-bold text-text-main-light dark:text-text-main-dark truncate">{value}</p>
      {typeof subValue === 'string' ? (
        <p className={`text-[7px] font-bold mb-0.5 ${subValue.includes('+') ? 'text-[#07880b]' : 'text-primary'}`}>{subValue}</p>
      ) : subValue}
      {icon}
    </div>
  </div>
);

const SpokeCard = ({ icon: Icon, title, description, progress, trend, delay, x, y }: { 
  icon: any; 
  title: string; 
  description: string; 
  progress?: number; 
  trend?: string; 
  delay: number;
  x: string;
  y: string;
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    style={{ left: x, top: y }}
    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
  >
    <div className="bg-surface-light/95 dark:bg-surface-dark/95 p-1.5 rounded-lg border border-border-light dark:border-border-dark shadow-xl w-28 backdrop-blur-sm group-hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-1.5 mb-0.5">
        <div className="size-5 rounded bg-primary/20 flex items-center justify-center text-primary">
          <Icon className="size-3" />
        </div>
        <h4 className="font-bold text-[8px] text-text-main-light dark:text-text-main-dark leading-tight">{title}</h4>
      </div>
      <p className="text-[7px] text-text-muted-light dark:text-text-muted-dark leading-tight line-clamp-2">{description}</p>
      {progress !== undefined && (
        <div className="mt-1 h-0.5 w-full bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, delay: delay + 0.3 }}
            className="bg-primary h-full" 
          />
        </div>
      )}
      {trend && <div className="mt-0.5 text-[7px] font-bold text-primary">{trend}</div>}
    </div>
  </motion.div>
);

// --- Main Component ---
export default function PowerGridDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [stats, setStats] = useState<Stats>({
    managedCapital: "$4.200B",
    capitalChange: "+12.5%",
    reliability: "99.90%",
    reliabilityStatus: "CRITICAL",
    esgIndex: 88,
    monthActive: 14
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  const updateStats = useCallback(() => {
    setStats(prev => {
      const capVal = parseFloat(prev.managedCapital.replace('$', '').replace('B', ''));
      const jitterCap = (capVal + (Math.random() - 0.5) * 0.001).toFixed(3);
      
      const relVal = parseFloat(prev.reliability.replace('%', ''));
      const jitterRel = Math.min(99.99, Math.max(99.00, relVal + (Math.random() - 0.5) * 0.05)).toFixed(2);
      
      return {
        ...prev,
        managedCapital: `$${jitterCap}B`,
        reliability: `${jitterRel}%`
      };
    });
    
    const nextTick = 2000 + Math.random() * 3000;
    setTimeout(updateStats, nextTick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateStats, 1000);
    return () => clearTimeout(timer);
  }, [updateStats]);

  return (
    <div className="w-full h-full aspect-square flex items-center justify-center bg-slate-900 overflow-hidden font-display">
      <div className="w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative shadow-2xl bg-background-light dark:bg-background-dark flex flex-col transition-colors duration-300">
        
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="flex-1 flex flex-col p-3 relative grid-bg overflow-hidden">
          
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-3 z-10"
          >
            <span className="text-primary font-bold tracking-widest text-[7px] uppercase mb-0.5 block">Infrastructure Lifecycle</span>
            <h1 className="text-base font-black leading-tight tracking-tight text-text-main-light dark:text-text-main-dark">Grid Modernization V2</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark text-[9px] mt-0.5">Asset investment & real-time ESG monitoring.</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mb-3 relative z-10">
            <StatCard label="Managed Capital" value={stats.managedCapital} subValue={stats.capitalChange} />
            <StatCard label="Reliability" value={stats.reliability} subValue={stats.reliabilityStatus} />
            <StatCard 
              label="ESG Index" 
              value={`${stats.esgIndex}/100`} 
              icon={<TrendingUp className="text-[#07880b] size-2.5 mb-0.5" />}
            />
          </div>

          {/* Core Spoke System */}
          <div className="relative flex-1 flex flex-col items-center justify-center min-h-0">
            {/* Visual Energy Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 dark:opacity-50">
              <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1], scaleX: [1, 1.1, 1] }} 
                transition={{ duration: 6, repeat: Infinity }}
                className="w-full h-[1px] energy-line energy-line-glow absolute" 
              />
              <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1], scaleY: [1, 1.1, 1] }} 
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                className="h-full w-[1px] energy-line energy-line-glow absolute" 
              />
              <div className="w-full h-[1px] energy-line energy-line-glow absolute rotate-45" />
              <div className="w-full h-[1px] energy-line energy-line-glow absolute -rotate-45" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="size-64 rounded-full border border-primary/10 absolute border-dashed"
              />
            </div>

            {/* Central Hub */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative z-20 size-20 rounded-full bg-background-dark dark:bg-surface-dark border-2 border-primary flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(235,81,10,0.3)]"
            >
              <motion.div 
                animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-primary mb-0.5"
              >
                <Zap className="size-5 fill-primary" />
              </motion.div>
              <h3 className="text-[7px] font-bold uppercase tracking-widest text-white">Investment</h3>
              <p className="text-[6px] text-primary font-mono mt-0.5">CORE ACTIVE</p>
            </motion.div>

            {/* Floating Nodes */}
            <SpokeCard x="22%" y="15%" delay={0.2} icon={Activity} title="Planning" description="Resource allocation & modeling." progress={75} />
            <SpokeCard x="78%" y="15%" delay={0.4} icon={Scale} title="Regulatory" description="Compliance automation tracker." />
            <SpokeCard x="22%" y="85%" delay={0.6} icon={Users} title="Community" description="Sentiment & impact reporting." trend="+18% Eng." />
            <SpokeCard x="78%" y="85%" delay={0.8} icon={Leaf} title="ESG Index" description="Carbon footprint reduction." progress={50} />
          </div>

          {/* Phase Track (Bottom of Main) */}
          <div className="mt-2 bg-surface-light/40 dark:bg-surface-dark/40 p-2 rounded-lg border border-border-light dark:border-border-dark shadow-inner">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[7px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-text-main-light dark:text-text-main-dark">
                <Clock className="text-primary size-2.5" />
                Cycle Progression
              </h3>
              <span className="text-[7px] font-mono font-bold text-primary">MO {stats.monthActive} / 36</span>
            </div>
            <div className="relative h-6 flex items-center px-0.5">
              <div className="absolute h-0.5 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "42%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute h-0.5 energy-line rounded energy-line-glow" 
              />
              <div className="relative w-full flex justify-between">
                {[1, 2, 3, 4].map((p, i) => (
                  <div key={p} className={`flex flex-col items-center -mt-0.5 ${i > 1 ? 'opacity-30' : ''}`}>
                    <div className={`size-2 rounded-full border ${i <= 1 ? 'border-primary bg-primary' : 'border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800'} z-10`} />
                    <span className="text-[6px] mt-0.5 font-bold text-text-main-light dark:text-text-main-dark">PHASE {p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>

        {/* Global Hub Navigation */}
        <div className="bg-surface-light dark:bg-[#110a08] border-t border-border-light dark:border-primary/10 p-2 px-6 flex justify-between items-center">
          {[Network, BarChart3, ShieldCheck, Leaf].map((Icon, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex flex-col items-center gap-0.5 group cursor-pointer"
            >
              <div className="size-6 rounded flex items-center justify-center bg-gray-50 dark:bg-surface-dark border border-transparent group-hover:border-primary/30 transition-all">
                <Icon className="size-3 text-text-muted-light dark:text-text-muted-dark group-hover:text-primary" />
              </div>
              <span className="text-[5px] uppercase font-bold text-gray-400 group-hover:text-primary tracking-tighter">
                {['Assets', 'Growth', 'Shield', 'ESG'][i]}
              </span>
            </motion.div>
          ))}
          <button className="bg-primary text-white p-1.5 px-3 rounded text-[7px] font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-primary/20">
            Action Center
          </button>
        </div>

      </div>
    </div>
  );
}
