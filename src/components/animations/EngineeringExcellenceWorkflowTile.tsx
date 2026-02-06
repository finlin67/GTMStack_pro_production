'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  PlaneTakeoff, 
  Package, 
  ShieldAlert, 
  Award, 
  Shield 
} from 'lucide-react';

// --- Types & Interfaces ---

interface WorkflowItemProps {
  index: number;
  icon: React.ReactNode;
  title: string;
  duration: string;
  description?: string;
  tags?: string[];
  isFinal?: boolean;
  accentColor?: string;
}

// --- Sub-components (Inlined) ---

const WorkflowItem: React.FC<WorkflowItemProps> = ({ 
  index, 
  icon, 
  title, 
  duration, 
  description, 
  tags, 
  isFinal = false,
  accentColor = "border-l-[#2160f2]"
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover="hover"
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      className="flex items-start gap-4 group cursor-default"
    >
      <div className={`z-20 w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
        isFinal 
          ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
          : 'bg-white/[0.07] backdrop-blur-xl border border-white/10'
      }`}>
        <motion.div 
          className="text-white"
          variants={{
            hover: { 
              scale: 1.2, 
              rotate: [0, -10, 10, -5, 5, 0],
              transition: { duration: 0.5 }
            }
          }}
        >
          {icon}
        </motion.div>
      </div>
      <div className={`bg-white/[0.07] backdrop-blur-xl border border-white/10 p-3 rounded-xl flex-grow border-l-2 ${accentColor} ${isFinal ? 'border-emerald-500/30' : ''} transition-colors duration-300 group-hover:bg-white/10`}>
        <div className="flex justify-between items-start mb-1">
          <h3 className={`text-[13px] font-bold uppercase tracking-tight ${isFinal ? 'text-white' : ''}`}>
            {title}
          </h3>
          <span className={`text-[9px] font-black ${isFinal ? 'text-emerald-200' : 'text-blue-200'}`}>
            {duration}
          </span>
        </div>
        {description && (
          <p className="text-[11px] text-blue-100/80 leading-tight">
            {description}
          </p>
        )}
        {tags && (
          <div className="flex gap-2 mt-1">
            {tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-1 text-[9px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                <Shield className="w-[10px] h-[10px] text-yellow-400" /> {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Monolithic Component ---

export default function EngineeringExcellenceWorkflowTile() {
  const [stats, setStats] = useState({
    activeMonth: 1,
    jitter: 0,
    progress: 12
  });

  // Simulated "organic jitter" for real-time fidelity feel
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const updateStats = () => {
      setStats(prev => ({
        ...prev,
        jitter: Math.random() * 0.5,
        progress: (prev.progress + 0.5 + Math.random() * 1.5) % 100,
        activeMonth: Math.floor((Date.now() / 1000) % 36) + 1
      }));
      
      timeoutId = setTimeout(updateStats, 2000 + Math.random() * 1000);
    };

    updateStats();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#101522] p-4 font-sans">
      {/* Hero Tile Container */}
      <div className="w-full h-full max-w-[600px] max-h-[600px] aspect-square relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 text-white shadow-2xl flex flex-col">
        
        {/* Background Layers (Blueprint Grid) */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none"></div>
        
        {/* Top Glint/Scanline */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-1 bg-white/10"
        />

        <div className="relative z-10 h-full flex flex-col p-6 overflow-hidden">
          {/* Header */}
          <div className="text-center mb-6 shrink-0">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-tighter mb-2"
            >
              <Zap className="w-3 h-3" /> High-Fidelity Engineering
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-black tracking-tight leading-tight"
            >
              The 36-Month Engineering<br/>
              <span className="text-blue-200">Excellence Workflow</span>
            </motion.h1>
          </div>

          {/* Progress Bar Visualization */}
          <div className="mb-6 px-1 shrink-0">
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[9px] font-bold text-blue-200/70 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                System Load
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-300">
                {Math.floor(stats.progress)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/10 relative backdrop-blur-sm">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                 animate={{ width: `${stats.progress}%` }}
                 transition={{ type: "spring", stiffness: 40, damping: 15 }}
               />
               <motion.div
                 className="absolute top-0 bottom-0 w-12 bg-white/30 blur-[4px] -skew-x-12"
                 animate={{ left: ["-20%", "120%"] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 0.5 }}
               />
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="flex-grow relative flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
            {/* Timeline Vertical Line */}
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'calc(100% - 48px)' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-[23px] top-6 w-[2px] bg-gradient-to-b from-white/10 via-white/30 to-emerald-400/50"
            />

            <WorkflowItem 
              index={0}
              icon={<PlaneTakeoff className="w-5 h-5" />}
              title="Engineering Validation"
              duration="M 01-12"
              description="CAD Digital Twin & structural stress analysis for aerospace systems."
            />

            <WorkflowItem 
              index={1}
              icon={<Package className="w-5 h-5" />}
              title="Supply Chain Integration"
              duration="M 13-24"
              description="Optimizing global logistics and material sourcing for manufacturing readiness."
            />

            <WorkflowItem 
              index={2}
              icon={<ShieldAlert className="w-5 h-5" />}
              title="Certification Milestones"
              duration="M 25-34"
              tags={["FAA", "NHTSA", "ISO"]}
            />

            <WorkflowItem 
              index={3}
              icon={<Award className="w-5 h-5" />}
              title="Market Ready"
              duration="MONTH 36"
              description="Full certification award and global distribution kickoff achieved."
              isFinal={true}
              accentColor="border-l-emerald-500"
            />
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex gap-3 shrink-0"
          >
            <button className="flex-1 bg-[#2160f2] hover:bg-[#2160f2]/90 py-3 rounded-lg text-[11px] font-bold uppercase transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
              Schedule Tech Audit
            </button>
            <button className="flex-1 border border-white/20 hover:bg-white/5 py-3 rounded-lg text-[11px] font-bold uppercase transition-all">
              Download PDF
            </button>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-2 right-6 opacity-30 text-[8px] font-mono tracking-widest uppercase pointer-events-none">
          Month {stats.activeMonth.toString().padStart(2, '0')} / Tracking Active
        </div>
      </div>
      
      {/* Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
