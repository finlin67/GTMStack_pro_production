'use client';
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Edit3, 
  BarChart3, 
  Rss, 
  Activity, 
  Cpu, 
  RefreshCcw,
  Rocket,
  ShieldAlert,
  BrainCircuit,
  ChevronRight,
  X,
  Clock,
  Database,
  Layers
} from 'lucide-react';
// --- TYPES ---
interface MetricState {
  cpuLoad: number;
  flowVel: number;
  views: number;
  conversionRate: number;
}

interface WorkflowStep {
  id: string;
  label: string;
  subtext: string;
  icon: React.ElementType;
  details: {
    estTime: string;
    allocation: string;
    threads: number;
    status: string;
  };
}

interface LogEntry {
  id: string;
  text: string;
  type: 'info' | 'ai' | 'error';
}

// --- SUB-COMPONENTS ---
const MetricBar: React.FC<{ label: string; value: string; progress: number }> = ({ label, value, progress }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px]">
      <span className="text-slate-500 font-bold tracking-tighter">{label}</span>
      <span className="text-cyan-400 tabular-nums font-bold">{value}</span>
    </div>
    <div className="w-full bg-white/5 h-[2px] overflow-hidden border-r border-cyan-500/20">
      <motion.div 
        className="bg-cyan-400 h-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, progress)}%` }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      />
    </div>
  </div>
);

const WorkflowItem: React.FC<{ 
  step: WorkflowStep; 
  isActive: boolean; 
  index: number;
  onSelect: (step: WorkflowStep) => void;
}> = ({ step, isActive, index, onSelect }) => (
  <motion.div 
    layout
    onClick={() => onSelect(step)}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className={`group flex items-center gap-3 p-1.5 rounded-sm border cursor-pointer hover:bg-cyan-400/5 transition-all ${isActive ? 'bg-cyan-400/10 border-cyan-400/30' : 'border-transparent'}`}
  >
    <div className={`${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-600 group-hover:text-cyan-400/70 transition-colors'}`}>
      <step.icon size={14} strokeWidth={2.5} />
    </div>
    <div>
      <p className={`text-[10px] font-black uppercase tracking-tight ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}`}>
        0{index + 1}_{step.label}
      </p>
      <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{step.subtext}</p>
    </div>
    {isActive && (
      <motion.div 
        layoutId="active-indicator"
        className="ml-auto flex items-center gap-1"
      >
        <span className="text-[8px] text-cyan-400 font-black animate-pulse">RUNNING</span>
        <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]" />
      </motion.div>
    )}
  </motion.div>
);

const TelemetryCard: React.FC<{ label: string; value: string; trend: string; isUp: boolean }> = ({ label, value, trend, isUp }) => (
  <div className="relative group">
    <p className="text-[9px] text-slate-500 mb-1 uppercase tracking-[0.1em] font-black">{label}</p>
    <div className="flex items-baseline gap-2">
      <motion.p 
        key={value}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl font-black text-cyan-400 tabular-nums tracking-tighter"
      >
        {value}
      </motion.p>
      <span className={`text-[8px] font-black px-1 py-0.5 rounded ${isUp ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
        {isUp ? '▲' : '▼'} {trend}
      </span>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function DevConsole() {
  const [metrics, setMetrics] = useState<MetricState>({
    cpuLoad: 42.8,
    flowVel: 892,
    views: 14284,
    conversionRate: 4.2
  });
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [now, setNow] = useState(new Date());
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', text: 'SYSTEM_BOOT_COMPLETE', type: 'info' },
    { id: '2', text: 'LISTENING_FOR_INPUT...', type: 'info' }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Helper to add logs
  const addLog = useCallback((text: string, type: 'info' | 'ai' | 'error' = 'info') => {
    setLogs(prev => [...prev.slice(-15), { id: Date.now().toString(), text, type }]);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // System updates
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const updateSystem = () => {
      setNow(new Date());
      setMetrics(prev => ({
        cpuLoad: Math.min(100, Math.max(0, prev.cpuLoad + (Math.random() - 0.5) * 4)),
        flowVel: Math.round(Math.min(2000, Math.max(100, prev.flowVel + (Math.random() - 0.5) * 80))),
        views: prev.views + Math.floor(Math.random() * 8),
        conversionRate: parseFloat((prev.conversionRate + (Math.random() - 0.5) * 0.15).toFixed(2))
      }));
      timeoutId = setTimeout(updateSystem, 1000 + Math.random() * 1000);
    };

    updateSystem();
    return () => clearTimeout(timeoutId);
  }, []);

  // Step Rotator
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const nextStep = () => {
      setActiveStep(prev => (prev + 1) % 4);
      timeoutId = setTimeout(nextStep, 8000);
    };

    timeoutId = setTimeout(nextStep, 8000);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSync = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    addLog('REQUESTING_AI_INSIGHT...', 'ai');
    const fallbackInsights = [
      'ALL_NODES_OPTIMIZED_CONVERSION_PEAK_DETECTED',
      'SYSTEM_THROUGHPUT_MAXIMUM_CACHE_WARM',
      'WORKFLOW_ALIGNED_ENGAGEMENT_METRICS_STABLE',
    ];
    try {
      await new Promise((r) => setTimeout(r, 500));
      const insight = fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)];
      addLog(insight, 'ai');
    } catch (e) {
      addLog('AI_GATEWAY_TIMEOUT', 'error');
    } finally {
      setIsAiLoading(false);
    }
  };

  const workflowSteps: WorkflowStep[] = useMemo(() => [
    { 
      id: 'ideate', 
      label: 'IDEATE', 
      subtext: 'STRATEGY_SPARK.EXE', 
      icon: Terminal,
      details: { estTime: '00:14:22', allocation: 'Low-Latency Core', threads: 4, status: 'COMPLETED' }
    },
    { 
      id: 'create', 
      label: 'CREATE', 
      subtext: 'MULTI_FORMAT_GEN.LOG', 
      icon: Edit3, 
      details: { estTime: '01:45:00', allocation: 'GPU Cluster A', threads: 12, status: 'PROCESSING' }
    },
    { 
      id: 'optimize', 
      label: 'OPTIMIZE', 
      subtext: 'SEO_ALIGNED_V4', 
      icon: BarChart3,
      details: { estTime: '00:08:15', allocation: 'Neural Engine', threads: 2, status: 'PENDING' }
    },
    { 
      id: 'publish', 
      label: 'PUBLISH', 
      subtext: 'OMNICHANNEL_DIST', 
      icon: Rss,
      details: { estTime: '00:02:30', allocation: 'Net-Gateway', threads: 1, status: 'QUEUED' }
    },
  ], []);

  const formattedTimestamp = now.toISOString().split('.')[0].replace('T', ' ');

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#0f172a] p-4">
      <div className="w-full h-full max-w-[600px] max-h-[600px] aspect-square overflow-hidden relative bg-[#070b14] text-white selection:bg-cyan-500/40 flex flex-col p-5 font-mono border-[12px] border-slate-900 shadow-[inset_0_0_100px_rgba(0,0,0,0.8),0_20px_50px_rgba(0,0,0,1)]">
        
        {/* CRT SCANLINE EFFECTS */}
        <div className="absolute inset-0 pointer-events-none z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] opacity-40"></div>
        <div className="absolute inset-0 pointer-events-none z-[101] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>
        
        {/* HEADER SECTION */}
        <header className="flex justify-between items-end border-b-2 border-cyan-500/20 pb-4 mb-4 relative z-10">
          <div className="absolute top-0 right-0 size-1 bg-cyan-400 animate-ping opacity-50" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert size={16} className="text-cyan-400" />
              <h1 className="text-xs font-black uppercase tracking-[-0.05em] text-cyan-400/90 flex items-baseline gap-1">
                DEV_CONSOLE <span className="text-[10px] text-slate-500">[V2.0.4-STABLE]</span>
              </h1>
            </div>
            <p className="text-[9px] text-slate-600 font-black tracking-widest leading-none">CORE_HEARTBEAT: ACTIVE</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-cyan-400/70 font-black flex items-center justify-end gap-1">
              <div className="size-1 bg-cyan-400 rounded-full animate-pulse" />
              SYNC_ONLINE
            </p>
            <p className="text-[9px] text-slate-600 tabular-nums font-bold tracking-tighter">NODE_ID: 0x7F2A_9001</p>
          </div>
        </header>

        {/* MAIN CONSOLE GRID */}
        <div className="grid grid-cols-2 gap-5 flex-1 min-h-0 relative z-10">
          
          {/* WORKFLOW TRACKER (LEFT) */}
          <div className="flex flex-col gap-5 border-r border-white/5 pr-3">
            <div className="space-y-3">
              <h2 className="text-[9px] text-slate-500 font-black uppercase tracking-[0.25em] flex items-center gap-2">
                <ChevronRight size={10} className="text-cyan-500" />
                {'// workflow_sequence'}
              </h2>
              <div className="space-y-3">
                {workflowSteps.map((step, idx) => (
                  <WorkflowItem 
                    key={step.id} 
                    step={step} 
                    isActive={activeStep === idx} 
                    index={idx} 
                    onSelect={setSelectedStep}
                  />
                ))}
              </div>
            </div>

            {/* SYSTEM LOGS (INTEGRATED) */}
            <div className="mt-auto border-t border-white/10 pt-3">
              <h2 className="text-[9px] text-slate-500 font-black uppercase tracking-[0.25em] mb-2">{'// console_log'}</h2>
              <div 
                ref={logContainerRef}
                className="h-20 overflow-y-auto space-y-1 pr-1 font-bold text-[8px] scroll-smooth"
              >
                <AnimatePresence mode="popLayout">
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-2 ${
                        log.type === 'ai' ? 'text-amber-400' : 
                        log.type === 'error' ? 'text-rose-500' : 'text-slate-400'
                      }`}
                    >
                      <span className="shrink-0 text-slate-600">{'>'}</span>
                      <span className="uppercase break-all">{log.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* METRICS & CHANNELS (RIGHT) */}
          <div className="flex flex-col gap-6 pl-2">
            <div className="space-y-5">
              <h2 className="text-[9px] text-slate-500 font-black uppercase tracking-[0.25em] flex items-center gap-2">
                <ChevronRight size={10} className="text-cyan-500" />
                {'// telemetry_live'}
              </h2>
              <div className="grid gap-4">
                <TelemetryCard 
                  label="Omni_Channel_Reach" 
                  value={metrics.views.toLocaleString()} 
                  trend={`${(metrics.views % 10).toFixed(1)}% UP`} 
                  isUp={true} 
                />
                <TelemetryCard 
                  label="Retention_Coefficient" 
                  value={`${metrics.conversionRate.toFixed(1)}%`} 
                  trend="STABLE" 
                  isUp={true} 
                />
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-4">
              <h2 className="text-[9px] text-slate-500 font-black uppercase tracking-[0.25em] flex items-center gap-2">
                <ChevronRight size={10} className="text-cyan-500" />
                {'// load_balancing'}
              </h2>
              <div className="space-y-4">
                <MetricBar 
                  label="CPU_CORE_HEURISTICS" 
                  value={`${metrics.cpuLoad.toFixed(1)}%`} 
                  progress={metrics.cpuLoad} 
                />
                <MetricBar 
                  label="THROUGHPUT_EFFICIENCY" 
                  value={`${metrics.flowVel} KB/S`} 
                  progress={(metrics.flowVel / 2000) * 100} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS PANE OVERLAY */}
        <AnimatePresence>
          {selectedStep && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="absolute inset-0 z-50 bg-[#070b14]/80 backdrop-blur-[2px] flex items-center justify-center p-8"
            >
              <motion.div
                initial={{ scale: 0.95, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[400px] bg-[#0b1221] border border-cyan-500/30 p-6 shadow-[0_0_50px_rgba(34,211,238,0.1)] relative overflow-hidden"
              >
                 {/* Decorative Corner */}
                <div className="absolute top-0 right-0 p-2">
                   <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-md" />
                </div>

                {/* Header */}
                <div className="flex justify-between items-start mb-8 relative">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-cyan-900/20 rounded-md border border-cyan-500/20">
                            <selectedStep.icon className="text-cyan-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tighter uppercase leading-none mb-1">{selectedStep.label}</h3>
                            <p className="text-[9px] text-cyan-400 font-bold tracking-widest uppercase">{selectedStep.subtext}</p>
                        </div>
                    </div>
                    <button 
                      onClick={() => setSelectedStep(null)} 
                      className="text-slate-500 hover:text-white hover:bg-white/10 p-1 rounded transition-all"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#0f172a] p-3 rounded-sm border border-white/5 group hover:border-cyan-500/20 transition-colors">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Clock size={10} />
                            <span className="text-[8px] font-bold uppercase tracking-widest">Est. Time</span>
                        </div>
                        <p className="text-lg font-mono text-cyan-50 group-hover:text-cyan-400 transition-colors">{selectedStep.details.estTime}</p>
                    </div>
                    <div className="bg-[#0f172a] p-3 rounded-sm border border-white/5 group hover:border-cyan-500/20 transition-colors">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Database size={10} />
                            <span className="text-[8px] font-bold uppercase tracking-widest">Resource</span>
                        </div>
                        <p className="text-lg font-mono text-cyan-50 group-hover:text-cyan-400 transition-colors">{selectedStep.details.allocation}</p>
                    </div>
                    <div className="bg-[#0f172a] p-3 rounded-sm border border-white/5 group hover:border-cyan-500/20 transition-colors">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Layers size={10} />
                            <span className="text-[8px] font-bold uppercase tracking-widest">Threads</span>
                        </div>
                        <p className="text-lg font-mono text-cyan-50 group-hover:text-cyan-400 transition-colors">{selectedStep.details.threads}</p>
                    </div>
                    <div className="bg-[#0f172a] p-3 rounded-sm border border-white/5 group hover:border-cyan-500/20 transition-colors">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Activity size={10} />
                            <span className="text-[8px] font-bold uppercase tracking-widest">Status</span>
                        </div>
                        <p className="text-lg font-mono text-cyan-50 group-hover:text-cyan-400 transition-colors">{selectedStep.details.status}</p>
                    </div>
                </div>

                {/* Footer Status Line */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                   <div className="h-1.5 w-1.5 bg-cyan-500 animate-pulse rounded-full" />
                   <p className="text-[8px] text-cyan-500/60 font-mono uppercase tracking-widest">
                     DATA_STREAM_ACTIVE // {selectedStep.id.toUpperCase()}_NODE
                   </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIONS FOOTER */}
        <footer className="mt-6 pt-4 border-t-2 border-white/10 flex items-center justify-between gap-4 z-10 relative">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="size-3 bg-emerald-500 rounded-sm shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-white tracking-tighter">SECURE_LINK</span>
              <span className="text-[8px] text-slate-500 tabular-nums uppercase">{formattedTimestamp}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleSync}
              disabled={isAiLoading}
              className={`group relative flex items-center gap-2 px-3 py-2 border border-cyan-400/40 text-cyan-400 text-[10px] font-black uppercase tracking-tighter hover:bg-cyan-400/10 active:scale-95 transition-all disabled:opacity-50`}
            >
              {isAiLoading ? (
                <RefreshCcw size={12} className="animate-spin" />
              ) : (
                <BrainCircuit size={12} className="group-hover:rotate-12 transition-transform" />
              )}
              AI_ADVISOR
              <div className="absolute -top-1 -right-1 size-1 bg-cyan-400" />
            </button>
            
            <button 
              onClick={() => addLog('INITIATING_CAMPAIGN_SEQUENCE...', 'info')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#070b14] text-[10px] font-black uppercase tracking-tighter hover:bg-cyan-400 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <Rocket size={12} />
              DEPLOY_CORE
            </button>
          </div>
        </footer>

        {/* BACKGROUND DECORATIVE GLITCH UI */}
        <div className="absolute bottom-10 right-10 opacity-[0.03] pointer-events-none select-none z-0">
          <Cpu size={180} className="text-cyan-400" strokeWidth={1} />
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent z-0" />
      </div>
    </div>
  );
}