'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShieldCheck, 
  Calendar,
  BellRing,
  Users2,
  FileText,
  CheckCircle2,
  Network, 
  Monitor,
  FlaskConical,
  Vote,
  GraduationCap,
  Heart,
  Activity,
  TrendingUp,
  Sparkles,
  Loader2,
  X,
  Target,
  Zap
} from 'lucide-react';

// --- Types & Interfaces ---
interface StatsState {
  impact: number;
  growth: number;
  satisfaction: number;
  adoption: number;
  engagement: number;
}

/**
 * EduMarketersDashboard
 * 
 * A high-fidelity, monolithic dashboard strictly constrained to a 600x600px viewport.
 * Features a Modern SaaS Minimal (HubSpot-style) aesthetic with Indigo/Sky Blue accents.
 * Includes dynamic jittering metrics and Gemini-powered growth strategy generation.
 */
export default function EduMarketersDashboard() {
  const [stats, setStats] = useState<StatsState>({
    impact: 9.4,
    growth: 15,
    satisfaction: 94,
    adoption: 88,
    engagement: 42,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // Strategy Generation Logic (disabled - @google/genai removed)
  const generateStrategy = async () => {
    setIsGenerating(true);
    // AI features disabled - @google/genai removed
    setAiResult("AI features unavailable - package not installed.");
    setIsGenerating(false);
  };

  // Real-time Data Jitter Loop
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const performJitter = () => {
      setStats(prev => ({
        ...prev,
        impact: parseFloat((9.4 + (Math.random() * 0.1 - 0.05)).toFixed(1)),
        growth: Math.max(12, Math.min(18, prev.growth + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        satisfaction: Math.max(90, Math.min(99, prev.satisfaction + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        adoption: Math.max(80, Math.min(95, prev.adoption + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        engagement: Math.max(35, Math.min(55, prev.engagement + (Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
      }));
      timeoutId = setTimeout(performJitter, 3000);
    };
    timeoutId = setTimeout(performJitter, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-[#F1F5F9] p-4 font-sans overflow-hidden">
      {/* 600x600 Strict Frame Wrapper */}
      <div className="relative w-full h-full max-w-[600px] max-h-[600px] flex flex-col bg-white border border-slate-200 shadow-2xl overflow-hidden shrink-0 aspect-square rounded-xl">
        
        {/* Navigation Header */}
        <header className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-30 shrink-0">
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-100">
              <Target size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-slate-900 leading-none tracking-tight">EduMarketers</h1>
              <p className="text-[10px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">Growth System</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={generateStrategy}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-sky-100 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
            <span>{isGenerating ? 'Wait...' : 'Insight'}</span>
          </motion.button>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 space-y-4 scrollbar-hide">
          
          {/* Awareness & Compliance Row */}
          <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-indigo-50 shadow-sm shrink-0">
            <div className="flex gap-2">
              <Badge icon={<ShieldCheck size={12} />} label="FERPA" color="sky" />
              <Badge icon={<Zap size={12} />} label="ACTIVE" color="indigo" />
            </div>
            <div className="text-[9px] font-bold text-slate-300 tracking-tighter uppercase">Engine v4.9.2</div>
          </div>

          {/* Decision Path Tracker */}
          <section className="bg-white p-5 rounded-xl border border-indigo-50 shadow-sm shrink-0">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3.5 rounded-full bg-indigo-500"></div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Decision Funnel</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-slate-400">LIVE</span>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* B2C: Parent Advocacy */}
              <div className="relative">
                <div className="flex justify-between relative z-10">
                  <StepNode icon={<BellRing />} label="Ads" active />
                  <StepNode icon={<Search />} label="Audit" active />
                  <StepNode icon={<Users2 />} label="Demo" active />
                  <StepNode icon={<FileText />} label="Apply" />
                  <StepNode icon={<CheckCircle2 />} label="Adopt" />
                </div>
                <div className="absolute top-[18px] left-6 right-6 h-[1px] bg-slate-100 z-0"></div>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  className="absolute top-[18px] left-6 h-[1px] bg-sky-400 z-0"
                />
              </div>

              {/* B2B: District Procurement */}
              <div className="border-t border-slate-50 pt-8 relative">
                <div className="flex justify-between relative z-10">
                  <StepNode icon={<Network />} label="Sync" active />
                  <StepNode icon={<Monitor />} label="Pitch" />
                  <StepNode icon={<FlaskConical />} label="Pilot" />
                  <StepNode icon={<Vote />} label="Board" />
                  <StepNode icon={<GraduationCap />} label="Scale" />
                </div>
                <div className="absolute top-[50px] left-6 right-6 h-[1px] bg-slate-100 z-0"></div>
              </div>
            </div>
          </section>

          {/* Performance Grids */}
          <div className="grid grid-cols-2 gap-4">
            <MetricCard title="MOM GROWTH" value={`+${stats.growth}%`} status="positive" icon={<TrendingUp size={16} />} />
            <MetricCard title="USER SAT" value={`${stats.satisfaction}`} status="neutral" icon={<Heart size={16} />} />
            <MetricCard title="CONVERSION" value={`${stats.adoption}%`} status="positive" icon={<Users2 size={16} />} />
            <MetricCard title="RETENTION" value={`${stats.engagement}m`} status="neutral" icon={<Activity size={16} />} />
          </div>

          {/* Impact Visualization */}
          <div className="bg-white p-5 rounded-xl border border-indigo-50 shadow-sm shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <TrendingUp size={14} />
                </div>
                <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Synergy Score</span>
              </div>
              <div className="text-base font-black text-slate-900 tabular-nums tracking-tighter">{stats.impact}</div>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner border border-slate-50">
              <motion.div 
                animate={{ width: `${(stats.impact / 10) * 100}%` }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
        </main>

        {/* Strategic Insight Modal */}
        <AnimatePresence>
          {aiResult && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-slate-900/10 backdrop-blur-[4px] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white border border-indigo-100 w-full max-w-[340px] rounded-2xl p-6 shadow-3xl shadow-slate-200/50 relative"
              >
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3 text-sky-600">
                    <Sparkles size={18} />
                    <span className="font-extrabold uppercase text-[10px] tracking-widest">Growth Directive</span>
                  </div>
                  <button onClick={() => setAiResult(null)} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <div className="text-slate-700 text-[13px] leading-relaxed font-medium mb-6">
                  <p className="whitespace-pre-wrap">{aiResult}</p>
                </div>
                <button 
                  onClick={() => setAiResult(null)}
                  className="w-full py-3 bg-slate-950 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                  Apply Directive
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corporate Footer */}
        <footer className="px-5 py-3 border-t border-slate-50 bg-white text-center shrink-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300">© 2024 EDUMARKETERS ANALYTICS</p>
        </footer>
      </div>
    </div>
  );
}

// --- Supporting Monolithic Components ---

function Badge({ icon, label, color }: { icon: React.ReactNode, label: string, color: 'sky' | 'indigo' }) {
  const styles = {
    sky: "bg-sky-50 text-sky-600 border-sky-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  };
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-[9px] font-bold ${styles[color]} shadow-sm`}>
      <span className="shrink-0">{icon}</span>
      <span className="whitespace-nowrap tracking-wide">{label}</span>
    </div>
  );
}

function StepNode({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2 group flex-shrink-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-sky-100 text-sky-600 border border-sky-200 shadow-md shadow-sky-50' : 'bg-white text-slate-200 border border-slate-50 shadow-sm'} shrink-0 group-hover:scale-110`}>
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 16, strokeWidth: 2.5 }) : icon}
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-tight transition-colors ${active ? 'text-slate-900' : 'text-slate-200'}`}>{label}</span>
    </div>
  );
}

function MetricCard({ title, value, status, icon }: { title: string, value: string, status: 'positive' | 'neutral', icon: React.ReactNode }) {
  const isPos = status === 'positive';
  return (
    <div className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm flex flex-col gap-3 hover:border-indigo-200 transition-all duration-300 group shrink-0">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg transition-colors ${isPos ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'} group-hover:scale-110`}>
          {icon}
        </div>
        <AnimatePresence mode="wait">
          <motion.span 
            key={value}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-base font-black tabular-nums tracking-tighter ${isPos ? 'text-emerald-600' : 'text-slate-900'}`}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">{title}</h4>
    </div>
  );
}
