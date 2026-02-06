'use client';
// FILE: EngineeringWorkflow.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, TrendingDown, ShieldCheck, Plane, 
  Package, Award, Loader2, Search, Binary 
} from 'lucide-react';
// @ts-ignore - Optional dependency, may not be installed
let GoogleGenAI: any;
try {
  GoogleGenAI = require("@google/genai").GoogleGenAI;
} catch {
  GoogleGenAI = null;
}

interface StatsState {
  duration: number;
  compliance: number;
  optimization: number;
}

interface ValidationReport {
  component: string;
  roadmap: string[];
  riskFactor: string;
}

export default function EngineeringWorkflow() {
  // --- STATE ---
  const [stats, setStats] = useState<StatsState>({
    duration: 36,
    compliance: 100,
    optimization: -15
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [componentName, setComponentName] = useState('');
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [conceptImage, setConceptImage] = useState<string | null>(null);

  // --- ANIMATION / JITTER LOGIC ---
  const updateStats = useCallback(() => {
    const jitter = () => {
      setStats(prev => ({
        ...prev,
        compliance: Math.min(100, Math.max(99.8, prev.compliance + (Math.random() - 0.5) * 0.05)),
        optimization: Math.min(-14.5, Math.max(-15.5, prev.optimization + (Math.random() - 0.5) * 0.1))
      }));
      setTimeout(jitter, 2000 + Math.random() * 3000);
    };
    const timer = setTimeout(jitter, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    updateStats();
  }, [updateStats]);

  // --- AI HANDLER ---
  const handleAnalyze = async () => {
    if (!componentName.trim()) return;
    setAiLoading(true);
    setReport(null);
    setConceptImage(null);

    if (!GoogleGenAI) {
      setAiLoading(false);
      setReport({ component: componentName, roadmap: ["AI features unavailable"], riskFactor: "Low" });
      return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    try {
      // 1. Generate Report
      const textResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a short technical engineering validation roadmap for a "${componentName}" in a 36-month aerospace/automotive cycle. 
        Format as JSON: { "component": "${componentName}", "roadmap": ["Phase 1: ...", "Phase 2: ...", "Phase 3: ..."], "riskFactor": "Low/Medium/High" }`,
        config: { responseMimeType: "application/json" }
      });

      const parsedReport = JSON.parse(textResponse.text || '{}');
      setReport(parsedReport);

      // 2. Generate Concept Image
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A high-tech blueprint and 3D render of an advanced engineering component: ${componentName}. Cyberpunk aesthetic, blueprint grid background, cinematic lighting, 4k resolution. Wide aspect ratio.` }]
        }
      });

      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setConceptImage(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="w-[600px] h-[600px] bg-slate-900/50 backdrop-blur-xl relative overflow-hidden font-display text-white selection:bg-sky-500/30 flex flex-col shadow-2xl rounded-xl border border-slate-700/80 mx-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      
      {/* --- HEADER --- */}
      <header className="h-14 border-b border-slate-700 bg-slate-950/30 backdrop-blur-md flex items-center justify-between px-5 shrink-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-sky-500 rounded shadow-lg shadow-sky-500/20">
            <Cpu className="text-white w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold tracking-tight uppercase">
            AeroAuto <span className="text-sky-400">Engage</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-[10px] font-medium text-teal-400 uppercase tracking-wider">System Active</span>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-5 relative z-10">
        
        {/* KPI Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div whileHover={{ y: -2 }} className="glass-card p-4 rounded-lg border-l-2 border-l-sky-500">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Duration</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight">{stats.duration}</span>
              <span className="text-xs text-slate-300">Mo</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="glass-card p-4 rounded-lg border-l-2 border-l-sky-500">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Compliance</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight">{stats.compliance.toFixed(1)}</span>
              <span className="text-xs text-slate-300">%</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="glass-card p-4 rounded-lg border-l-2 border-l-amber-500">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Optimization</p>
            <div className="flex items-baseline gap-1.5 text-amber-500">
              <TrendingDown className="w-3 h-3" />
              <span className="text-lg font-bold tracking-tight">{stats.optimization.toFixed(1)}%</span>
            </div>
          </motion.div>
        </div>

        {/* Compact Timeline */}
        <div className="glass-card p-4 rounded-lg">
          <div className="flex items-center justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-[14px] left-4 right-4 h-[2px] bg-slate-700/50 -z-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-teal-400" 
              />
            </div>
            
            {[
              { label: "Valid.", icon: Plane, active: true },
              { label: "Integ.", icon: Package, active: true },
              { label: "Cert.", icon: ShieldCheck, active: true },
              { label: "Ready", icon: Award, last: true }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 group cursor-default">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step.last ? 'bg-teal-500 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)]' : 'bg-slate-900 border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.3)]'}`}>
                  <step.icon className={`w-3.5 h-3.5 ${step.last ? 'text-white' : 'text-slate-200'}`} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide transition-colors ${step.last ? 'text-teal-400' : 'text-slate-400 group-hover:text-white'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="flex-1 flex flex-col gap-4 min-h-[220px]">
          {/* Input Area */}
          <div className="flex gap-2">
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Component (e.g., Titanium Fan Blade)" 
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                className="w-full bg-slate-800/60 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:bg-slate-800 transition-all"
              />
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={aiLoading}
              className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 rounded-lg text-white transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center min-w-[50px]"
            >
              {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            </button>
          </div>

          {/* Dynamic Content Area */}
          <div className="relative flex-1 rounded-xl overflow-hidden border border-slate-700 bg-slate-950/30 group">
            <AnimatePresence mode="wait">
              {!report && !aiLoading ? (
                // Default State (Hero)
                <motion.div 
                  key="hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800/60 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                    <Binary className="w-6 h-6 text-sky-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">AI Engineering Analyst</h3>
                  <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
                    Enter a component name to generate a 36-month validation roadmap and concept render.
                  </p>
                </motion.div>
              ) : (
                // Results State
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-0 flex flex-col"
                >
                  {/* Image Area */}
                  <div className="h-32 w-full bg-slate-950 relative overflow-hidden border-b border-slate-700">
                    {conceptImage ? (
                      <Image
                        src={conceptImage}
                        alt="Concept"
                        fill
                        className="object-cover"
                        sizes="100%"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                        <span className="text-[10px] font-mono text-sky-400 animate-pulse">RENDERING_BLUEPRINT...</span>
                      </div>
                    )}
                    {/* Risk Badge Overlay */}
                    {report && (
                      <div className="absolute top-2 right-2">
                         <span className={`px-2 py-1 rounded text-[10px] font-black uppercase border shadow-lg backdrop-blur-md ${
                           report.riskFactor === 'High' ? 'bg-red-500/20 border-red-500/50 text-red-300' : 
                           report.riskFactor === 'Medium' ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 
                           'bg-teal-500/20 border-teal-500/50 text-teal-300'
                         }`}>
                          Risk: {report.riskFactor}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Roadmap List */}
                  <div className="flex-1 overflow-y-auto p-4 bg-slate-900/50">
                    {report ? (
                      <div className="space-y-3">
                        {report.roadmap.map((step, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-3"
                          >
                            <div className="mt-1 min-w-[4px] h-4 rounded-full bg-sky-500/50" />
                            <div>
                              <p className="text-[10px] font-bold text-sky-400 uppercase mb-0.5">Phase 0{i+1}</p>
                              <p className="text-xs text-slate-300 leading-snug">{step}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 px-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex gap-3 animate-pulse">
                            <div className="w-1 h-8 rounded bg-slate-700" />
                            <div className="flex-1 space-y-1 py-1">
                              <div className="h-2 bg-slate-700 rounded w-1/4" />
                              <div className="h-2 bg-slate-800 rounded w-3/4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </main>
    </div>
  );
}