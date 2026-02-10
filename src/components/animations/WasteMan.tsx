'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Calendar, 
  Cpu, 
  Map, 
  Truck, 
  Terminal, 
  ArrowRight
} from 'lucide-react';

export default function WasteMan() {
  // State for the "efficiency" counter animation
  const [efficiency, setEfficiency] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = 27;
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = target / steps;
    
    let timerId: ReturnType<typeof setTimeout>;

    const step = () => {
      current += increment;
      if (current >= target) {
        setEfficiency(target);
      } else {
        setEfficiency(Math.floor(current));
        timerId = setTimeout(step, intervalTime);
      }
    };

    // Start the animation
    timerId = setTimeout(step, intervalTime);

    return () => clearTimeout(timerId);
  }, []);

  // Strict Typed Event Handlers
  const handleSpecsClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("System Specs Clicked");
  }, []);

  const handleDemoClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Request Demo Clicked");
  }, []);

  return (
    <div className="relative w-full max-w-[600px] aspect-square bg-[#020617] rounded-xl overflow-hidden border border-[#1e293b] shadow-2xl flex flex-col items-center justify-between p-8 font-display select-none">
      
      {/* 1. Technical Grid Background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(13, 166, 242, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 166, 242, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. Radial Glow Ambient */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#0da6f2]/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* 3. Corner Decorations */}
      <div className="absolute top-4 left-4 flex gap-1.5 z-30">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      <div className="absolute top-4 right-4 font-mono text-[10px] text-slate-500 tracking-tighter z-30">
        CORE_ID: AF-2900-X1
      </div>

      {/* 4. Background Data Particles (Floating) */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-y-1/2 w-1 h-1 bg-[#0da6f2] rounded-full shadow-[0_0_8px_#0da6f2]"
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 -translate-y-1/2 w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"
      />

      {/* 5. SVG Pipelines Layer (Absolute Full Size) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         <svg className="w-full h-full" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="cyan-grad-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0da6f2" stopOpacity="0" />
              <stop offset="100%" stopColor="#0da6f2" />
            </linearGradient>
            <linearGradient id="purple-grad-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Path 1: Top Left Input -> Center Node */}
          <motion.path 
            d="M 110,120 Q 110,230 280,240" 
            fill="none" 
            stroke="url(#cyan-grad-vertical)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
           <motion.circle r="3" fill="#0da6f2">
             <animateMotion 
               path="M 110,120 Q 110,230 280,240"
               dur="3s"
               repeatCount="indefinite"
               rotate="auto"
             />
           </motion.circle>

          {/* Path 2: Top Right Input -> Center Node */}
          <motion.path 
            d="M 490,120 Q 490,230 320,240" 
            fill="none" 
            stroke="url(#cyan-grad-vertical)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
           <motion.circle r="3" fill="#0da6f2">
             <animateMotion 
               path="M 490,120 Q 490,230 320,240"
               dur="4s"
               repeatCount="indefinite"
               rotate="auto"
             />
           </motion.circle>

          {/* Path 3: Center Node -> Bottom Left Output */}
          <motion.path 
            d="M 280,360 Q 110,370 110,460" 
            fill="none" 
            stroke="url(#purple-grad-vertical)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
          />

          {/* Path 4: Center Node -> Bottom Right Output */}
          <motion.path 
            d="M 320,360 Q 490,370 490,460" 
            fill="none" 
            stroke="url(#purple-grad-vertical)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
          />
         </svg>
      </div>

      {/* 6. Main Content - Vertical Layout */}
      
      {/* TOP ROW: Inputs */}
      <div className="relative z-10 flex justify-between w-full mt-8 px-2">
         <InputCard 
          title="Sensor Data"
          subtitle="IoT Network Delta"
          icon={<Activity size={20} className="text-[#0da6f2]" />}
          label="Live Feed"
          delay={0}
          align="left"
        />
        <InputCard 
          title="Schedules"
          subtitle="Dynamic Slots"
          icon={<Calendar size={20} className="text-[#0da6f2]" />}
          label="Workflow"
          delay={0.2}
          align="right"
        />
      </div>

      {/* CENTER: AI Core (Optical Center) */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto">
        {/* Core Halo */}
        <div className="relative group">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#0da6f2]/20 rounded-full blur-2xl"
          />
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-32 h-32 rounded-3xl p-[1px] shadow-[0_0_50px_rgba(13,166,242,0.3)] bg-gradient-to-br from-[#0da6f2] via-blue-600 to-purple-600"
          >
            <div className="w-full h-full bg-[#020617] rounded-[23px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
              <Cpu size={64} className="text-white drop-shadow-[0_0_10px_rgba(13,166,242,0.8)]" />
            </div>
          </motion.div>
        </div>

        {/* Efficiency Metric - Directly under the core */}
        <div className="mt-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-white text-5xl font-bold tracking-tighter drop-shadow-2xl"
          >
            +{efficiency}%
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-[#0da6f2] text-sm font-bold tracking-widest uppercase mt-1"
          >
            Efficiency
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ROW: Outputs */}
      <div className="relative z-10 flex justify-between w-full mb-20 px-2">
        <InputCard 
          title="Route Plans"
          subtitle="Fleet Disp -12%"
          icon={<Map size={20} className="text-purple-400" />}
          label="Optimized"
          delay={0.6}
          align="left"
          theme="purple"
        />
        <InputCard 
          title="Fleet Mgmt"
          subtitle="Uptime: 99.8%"
          icon={<Truck size={20} className="text-purple-400" />}
          label="Management"
          delay={0.8}
          align="right"
          theme="purple"
        />
      </div>

      {/* FOOTER: Actions (Bottom 15%) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30 w-full justify-center px-8">
        <button 
          onClick={handleSpecsClick}
          className="flex-1 py-3 bg-[#0da6f2]/10 border border-[#0da6f2]/50 rounded-lg text-[#0da6f2] text-xs font-bold hover:bg-[#0da6f2]/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95"
        >
          <Terminal size={14} />
          Specs
        </button>
        <button 
          onClick={handleDemoClick}
          className="flex-1 py-3 bg-purple-500/10 border border-purple-500/50 rounded-lg text-purple-400 text-xs font-bold hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95"
        >
          Demo
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}

// --- Sub-Components ---

export interface InputCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  label: string;
  delay: number;
  align: 'left' | 'right';
  theme?: 'cyan' | 'purple';
}

const InputCard = React.memo(function InputCard({ title, subtitle, icon, label, delay, align, theme = 'cyan' }: InputCardProps) {
  const isCyan = theme === 'cyan';
  const borderColor = isCyan ? 'border-[#0da6f2]/20' : 'border-purple-500/20';
  const glowColor = isCyan ? 'shadow-[0_0_15px_rgba(13,166,242,0.15)]' : 'shadow-[0_0_15px_rgba(168,85,247,0.15)]';
  const labelColor = isCyan ? 'text-[#0da6f2]/80' : 'text-purple-400/80';
  const bgColor = isCyan ? 'bg-[#101c22]/80' : 'bg-purple-950/20';

  return (
    <motion.div 
      initial={{ opacity: 0, y: align === 'left' ? -10 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {align === 'left' && icon}
        <span className={`${labelColor} text-[10px] font-medium uppercase tracking-widest`}>
          {label}
        </span>
        {align === 'right' && icon}
      </div>
      
      <div className={`
        ${bgColor} backdrop-blur-md border ${borderColor} p-3 rounded-lg 
        ${glowColor} hover:border-opacity-40 transition-colors w-36
      `}>
        <h3 className="text-white text-xs font-bold whitespace-nowrap">{title}</h3>
        <p className={`${isCyan ? 'text-[#0da6f2]/60' : 'text-purple-400/60'} text-[10px] leading-tight mt-1 whitespace-nowrap`}>
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
});