'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreHorizontal, 
  ClipboardCheck, 
  Microscope, 
  CalendarRange, 
  Medal, 
  Heart, 
  TrendingUp,
  Activity,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

const COLORS = {
  primary: "#00a4e6",
  primaryDark: "#0057B8",
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate800: "#1e293b",
  white: "#ffffff",
  rose: "#f43f5e",
  emerald: "#10b981",
  indigo: "#6366f1"
};

interface Step {
  id: number;
  title: string;
  subtitle: string;
  meta: string;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  { id: 1, title: "Onboarding", subtitle: "Profile Complete", meta: "Done", icon: ClipboardCheck },
  { id: 2, title: "Biometrics", subtitle: "Analysis In-Progress", meta: "Now", icon: Microscope },
  { id: 3, title: "Wellness Plan", subtitle: "Generating Roadmap", meta: "Next", icon: CalendarRange },
  { id: 4, title: "Performance", subtitle: "Goal Tracking", meta: "Future", icon: Medal },
];

export default function HealthCareTile() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [heartRate, setHeartRate] = useState<number>(98);
  const [scannedPercent, setScannedPercent] = useState(0);

  // Simulate Heart Rate
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next > 105 ? 105 : next < 90 ? 90 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate Scanning Progress for Active Step
  useEffect(() => {
    const interval = setInterval(() => {
      setScannedPercent(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const currentStepData = STEPS.find(s => s.id === activeStep) || STEPS[0];

  return (
    <div className="relative w-full max-w-[600px] aspect-square bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden font-sans">
      
      {/* --- HEADER (Top 15%) --- */}
      <div className="h-[15%] px-8 flex items-center justify-between border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm z-30">
        <div className="flex items-center gap-4">
           <div className="size-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-[#00a4e6] shadow-sm border border-blue-200">
             <Activity size={20} />
           </div>
           <div>
             <h3 className="font-bold text-slate-800 text-base leading-tight">Patient Status</h3>
             <div className="flex items-center gap-2 mt-0.5">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Monitoring</p>
             </div>
           </div>
        </div>
        <button className="size-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00a4e6] hover:border-[#00a4e6] transition-all bg-white shadow-sm group">
          <MoreHorizontal size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* --- BODY (Hero & Stack) --- */}
      <div className="flex-1 relative flex flex-col items-center py-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white">
        
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
            {Array.from({ length: 400 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-[#00a4e6]" />
            ))}
        </div>

        {/* HERO ELEMENT (Active Step Visualization) */}
        <div className="relative z-10 flex flex-col items-center justify-center shrink-0 mb-6">
            <div className="relative size-40 flex items-center justify-center">
                {/* Rotating Rings */}
                <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#00a4e6]/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                    className="absolute inset-2 rounded-full border border-[#00a4e6]/10"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Progress Circle */}
                <svg className="absolute inset-0 size-full -rotate-90">
                    <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-slate-100" />
                    <circle cx="80" cy="80" r="76" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-[#00a4e6]" 
                        strokeDasharray={477}
                        strokeDashoffset={477 - (477 * scannedPercent) / 100}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Central Icon */}
                <div className="relative z-20 size-24 rounded-full bg-white shadow-xl shadow-blue-100 flex items-center justify-center border-4 border-slate-50">
                    <motion.div
                        key={activeStep}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-[#00a4e6]"
                    >
                        {React.createElement(currentStepData.icon, { size: 40 })}
                    </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div 
                    className="absolute -bottom-2 bg-[#00a4e6] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {scannedPercent}%
                </motion.div>
            </div>

            <div className="text-center mt-4">
                <motion.h2 
                    key={activeStep + 'title'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-extrabold text-slate-800"
                >
                    {currentStepData.title}
                </motion.h2>
                <motion.p 
                    key={activeStep + 'sub'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-500 font-medium text-sm"
                >
                    {currentStepData.subtitle}
                </motion.p>
            </div>
        </div>

        {/* SECONDARY DATA STACK (Vertical List) */}
        <div className="w-full max-w-[320px] flex flex-col gap-3 z-10 px-4 flex-1 justify-center">
            {STEPS.map((step) => {
                if (step.id === activeStep) return null; // Hide active from list
                const isCompleted = step.id < activeStep;

                return (
                    <motion.button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                            flex items-center justify-between p-3 rounded-xl border w-full transition-all text-left
                            ${isCompleted ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-sm hover:border-blue-200'}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`size-8 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-slate-200 text-slate-500' : 'bg-blue-50 text-[#00a4e6]'}`}>
                                {isCompleted ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xs font-bold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                                    {step.title}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                    {isCompleted ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        </div>
                        {!isCompleted && <ChevronDown size={14} className="text-slate-300 -rotate-90" />}
                    </motion.button>
                )
            })}
        </div>

      </div>

      {/* --- FOOTER (Bottom 15% - Telemetry) --- */}
      <div className="h-[15%] px-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between z-30">
         
         {/* Metric 1: Heart Rate */}
         <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative size-12 flex items-center justify-center">
                <svg className="absolute inset-0 size-full -rotate-90">
                    <circle cx="24" cy="24" r="22" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                    <circle cx="24" cy="24" r="22" stroke="#f43f5e" strokeWidth="2" fill="none" 
                        strokeDasharray={138} 
                        strokeDashoffset={138 - (138 * 0.75)} 
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Heart size={16} className="text-rose-500 fill-rose-500 animate-pulse" />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Heart Rate</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-800 tabular-nums">{heartRate}</span>
                    <span className="text-xs text-slate-500 font-semibold">BPM</span>
                </div>
            </div>
         </div>

         {/* Vertical Divider */}
         <div className="h-8 w-px bg-slate-200" />

         {/* Metric 2: Readiness */}
         <div className="flex items-center gap-4">
             <div className="size-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                 <Zap size={20} className="text-indigo-500 fill-indigo-100" />
             </div>
             <div className="flex flex-col">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Readiness</p>
                 <div className="flex items-center gap-2">
                     <span className="text-xl font-black text-slate-800">94%</span>
                     <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full">+2%</span>
                 </div>
             </div>
         </div>

      </div>
    </div>
  );
}