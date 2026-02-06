'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

// --- TYPES ---
type AppMode = 'OPERATIONAL' | 'MARKETING';
type ProcessStage = 'DESIGN' | 'PROTO' | 'PROD' | 'QUALITY';

export interface TelemetryData {
  cycleTime: number;
  energy: number;
  uptime: number;
  temp: number;
  yield: number;
  defects: number;
}

// --- STATIC INSIGHTS (no external API) ---
const FACTORY_INSIGHTS = [
  'Optimizing thermodynamic cycles for batch #4409. Systems running within nominal parameters.',
  'Cycle time and yield within target. Minor tuning on energy efficiency recommended.',
  'High uptime and low defect rate. Production line operating at optimal capacity.',
  'Real-time telemetry indicates stable throughput. Quality gates passing.',
];

const getFactoryInsights = async (_data: TelemetryData): Promise<string> => {
  const idx = Math.floor(Math.random() * FACTORY_INSIGHTS.length);
  return FACTORY_INSIGHTS[idx];
};

// --- SUB-COMPONENTS ---

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="glass-panel p-2 rounded-lg min-w-[65px] transition-transform hover:scale-105 border-white/5">
    <p className="text-[8px] font-bold text-blue-200/60 uppercase mb-0.5 truncate">{label}</p>
    <p className="text-xs font-black text-white">{value}</p>
  </div>
);

const ProgressBarCard: React.FC<{ 
  label: string; 
  value: string; 
  progress: number; 
  color: string; 
  borderColor: string;
}> = ({ label, value, progress, color, borderColor }) => (
  <div className={`glass-panel p-4 rounded-xl border-l-4 ${borderColor} transition-all hover:translate-x-1`}>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-black text-white">{value}</span>
      <span className={`text-[10px] font-bold uppercase mb-1 ${color.replace('bg-', 'text-')}`}>{label}</span>
    </div>
    <div className="w-24 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${Math.min(100, progress)}%` }}
      ></div>
    </div>
  </div>
);

const TelemetryGrid: React.FC<{ data: TelemetryData; history: { time: number; value: number }[] }> = ({ data, history }) => {
  return (
    <>
      <div className="absolute bottom-6 left-6 flex flex-col gap-3 z-20">
        <div className="glass-panel p-3 rounded-xl min-w-[180px] transition-transform hover:scale-105 overflow-hidden">
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="text-[10px] font-bold text-blue-200/60 uppercase">Cycle Time</p>
              <p className="text-lg font-extrabold text-white">{data.cycleTime}s</p>
            </div>
            <div className="h-8 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} hide />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#60a5fa" 
                    strokeWidth={2} 
                    dot={false} 
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-[8px] font-bold text-blue-400 uppercase tracking-tighter">Real-time Trend</span>
            <div className="flex-1 h-[1px] bg-blue-400/20"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Energy" value={`${data.energy}kW`} />
          <StatCard label="Uptime" value={`${data.uptime}%`} />
          <StatCard label="Temp" value={`${data.temp}°C`} />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-20">
        <ProgressBarCard 
          label="Yield" 
          value={`${data.yield}%`} 
          progress={data.yield} 
          color="bg-green-400" 
          borderColor="border-green-400" 
        />
        <ProgressBarCard 
          label="Defects" 
          value={`${data.defects}%`} 
          progress={data.defects * 5} 
          color="bg-orange-400" 
          borderColor="border-orange-400" 
        />
      </div>
    </>
  );
};

const Sidebar: React.FC<{ currentStage: ProcessStage; setStage: (stage: ProcessStage) => void }> = ({ currentStage, setStage }) => {
  const STAGES: { id: ProcessStage; label: string; icon: string }[] = [
    { id: 'DESIGN', label: 'Design', icon: 'edit_note' },
    { id: 'PROTO', label: 'Proto', icon: 'layers' },
    { id: 'PROD', label: 'Prod', icon: 'precision_manufacturing' },
    { id: 'QUALITY', label: 'Quality', icon: 'verified' },
  ];

  return (
    <div className="w-20 relative flex flex-col justify-between py-8 z-20">
      <div className="absolute left-3 top-10 bottom-10 w-[1px] bg-gradient-to-b from-white/0 via-white/40 to-white/0"></div>
      
      {STAGES.map((stage) => {
        const isActive = currentStage === stage.id;
        return (
          <button
            key={stage.id}
            onClick={() => setStage(stage.id)}
            className="relative flex items-center gap-2 group outline-none text-left"
          >
            <div 
              className={`w-7 h-7 rounded-full border flex items-center justify-center backdrop-blur-sm z-10 transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-400 border-white shadow-lg shadow-blue-500/50 scale-110' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              <span className={`material-symbols-outlined text-xs ${isActive ? 'text-indigo-900 font-bold' : 'text-white'}`}>
                {stage.icon}
              </span>
            </div>
            <span className={`text-[8px] font-bold uppercase tracking-tighter transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
              {stage.label}
            </span>
            {isActive && (
                <div className="absolute -right-1 w-1 h-3 bg-white/40 rounded-full blur-sm"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

// --- MAIN HERO TILE COMPONENT ---
export default function IndustrialMFGTile() {
  const [mode, setMode] = useState<AppMode>('OPERATIONAL');
  const [stage, setStage] = useState<ProcessStage>('PROD');
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    cycleTime: 4.2,
    energy: 12,
    uptime: 99.8,
    temp: 42,
    yield: 98.4,
    defects: 0.12,
  });
  const [cycleHistory, setCycleHistory] = useState<{ time: number; value: number }[]>([]);
  const [insight, setInsight] = useState<string>("Analyzing industrial patterns...");
  const historyCounter = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextCycleTime = Number((4.1 + Math.random() * 0.2).toFixed(2));
      
      setTelemetry(prev => ({
        ...prev,
        cycleTime: nextCycleTime,
        energy: Number((11.5 + Math.random() * 1.0).toFixed(1)),
        temp: Math.floor(40 + Math.random() * 5),
        yield: Number((98 + Math.random() * 1).toFixed(1)),
        defects: Number((0.1 + Math.random() * 0.05).toFixed(2)),
      }));

      setCycleHistory(prev => {
        const newHistory = [...prev, { time: historyCounter.current++, value: nextCycleTime }];
        return newHistory.slice(-10);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchInsights = useCallback(async () => {
    const text = await getFactoryInsights(telemetry);
    setInsight(text || "Optimal engine efficiency achieved.");
  }, [telemetry]);

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full aspect-square max-w-[600px] max-h-[600px] overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col font-display">
        
        {/* Top Switcher */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setMode('OPERATIONAL')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                mode === 'OPERATIONAL' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              Operational
            </button>
            <button 
              onClick={() => setMode('MARKETING')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                mode === 'MARKETING' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              Marketing
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative flex-1 flex p-6 mt-10">
          <Sidebar currentStage={stage} setStage={setStage} />

          <div className="flex-1 relative flex items-center justify-center">
            {/* Animation Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <svg className="wireframe-stroke animate-spin-slow" height="250" viewBox="0 0 100 100" width="250">
                <rect fill="none" height="80" stroke="white" strokeWidth="0.5" width="80" x="10" y="10" strokeDasharray="4"></rect>
                <circle cx="50" cy="50" fill="none" r="30" stroke="white" strokeWidth="0.5" strokeDasharray="2"></circle>
                <path d="M10 50 L90 50 M50 10 L50 90" stroke="white" strokeWidth="0.5" strokeDasharray="1"></path>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center scale-90 sm:scale-100">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-[2rem] glass-panel flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-blue-500/10 rounded-[2rem] blur-xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                <span className="material-symbols-outlined text-5xl sm:text-6xl text-white opacity-90 transition-transform group-hover:scale-110 duration-500">
                  {stage === 'PROD' ? 'precision_manufacturing' : stage === 'DESIGN' ? 'edit' : stage === 'PROTO' ? 'layers' : 'verified'}
                </span>
                <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-400 flex items-center justify-center shadow-lg border-2 border-indigo-700 animate-bounce">
                  <span className="material-symbols-outlined text-indigo-900 font-bold text-lg">check_circle</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-md">
                  Discrete Engine V4
                </h2>
                <p className="text-[10px] text-blue-100/70 font-semibold tracking-wide mt-0.5">
                  Batch ID: #4409-PRD
                </p>
                <div className="mt-3 px-4 py-1.5 glass-panel rounded-full max-w-[200px] mx-auto min-h-[30px] flex items-center justify-center">
                    <p className="text-[9px] italic text-blue-100/90 leading-tight">
                        {insight}
                    </p>
                </div>
              </div>
            </div>
          </div>

          <TelemetryGrid data={telemetry} history={cycleHistory} />
        </div>

        {/* Global Footer */}
        <div className="absolute bottom-0 left-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="px-6 py-4 bg-black/20 flex justify-between items-center backdrop-blur-xl border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-400 text-xs animate-pulse">analytics</span>
            <span className="text-[8px] font-extrabold text-white/50 uppercase tracking-[0.2em]">Nexus Real-time Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping absolute"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 relative"></div>
            <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">Active</span>
          </div>
        </div>

        <button 
            onClick={fetchInsights}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-white z-40 backdrop-blur-md"
        >
            <span className="material-symbols-outlined text-xs">auto_awesome</span>
            AI Insight
        </button>
      </div>
    </div>
  );
}
