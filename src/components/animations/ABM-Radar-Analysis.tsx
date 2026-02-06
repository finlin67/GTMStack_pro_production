'use client';


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
// @ts-ignore - Optional dependency, may not be installed
let GoogleGenAI: any;
try {
  GoogleGenAI = require("@google/genai").GoogleGenAI;
} catch {
  // Package not installed, AI features will be disabled
  GoogleGenAI = null;
}

// --- TYPES ---
export type AppMode = 'OPERATIONAL' | 'MARKETING';
export type ProcessStage = 'DESIGN' | 'PROTO' | 'PROD' | 'QUALITY';

export interface TelemetryData {
  cycleTime: number;
  energy: number;
  uptime: number;
  temp: number;
  yield: number;
  defects: number;
  pressure: number;
  vibration: number;
  torque: number;
}

// --- CONSTANTS & SERVICES ---
const getFactoryInsights = async (data: TelemetryData) => {
  if (!GoogleGenAI) {
    return "AI insights unavailable - package not installed.";
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this factory engine telemetry data and provide a 2-sentence optimization insight:
      Cycle Time: ${data.cycleTime}s
      Pressure: ${data.pressure} PSI
      Vibration: ${data.vibration} mm/s
      Torque: ${data.torque} Nm
      Energy: ${data.energy}kW
      Uptime: ${data.uptime}%
      Yield: ${data.yield}%
      Defects: ${data.defects}%`,
      config: {
        systemInstruction: "You are a senior industrial manufacturing engineer. Provide concise, high-value technical insights.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Optimizing thermodynamic cycles for batch #4409. Systems running within nominal parameters.";
  }
};

// --- SUB-COMPONENTS ---

const TrendCard: React.FC<{
  label: string;
  value: string;
  unit: string;
  data: { time: number; value: number }[];
  color: string;
  stroke: string;
}> = ({ label, value, unit, data, color, stroke }) => (
  <div className="glass-panel p-3 rounded-xl min-w-[180px] transition-transform hover:scale-105 overflow-hidden relative group backdrop-blur-md">
    <div className="flex justify-between items-start mb-1">
      <div>
        <p className={`text-[9px] font-bold ${color} opacity-80 uppercase tracking-wider`}>{label}</p>
        <p className="text-lg font-extrabold text-white leading-none mt-1">
          {value}<span className="text-[10px] ml-0.5 opacity-50 font-medium">{unit}</span>
        </p>
      </div>
      <div className="h-8 w-20 opacity-80 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
            <Line
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    {/* Trend Indicator Line */}
    <div className="flex gap-1 items-center mt-2 opacity-50">
      <div className={`w-1 h-1 rounded-full`} style={{ backgroundColor: stroke }}></div>
      <div className={`flex-1 h-[1px] bg-white/20`}></div>
    </div>
  </div>
);

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="glass-panel p-2 rounded-lg min-w-[60px] transition-transform hover:scale-105 border-white/5 flex flex-col justify-center">
    <p className="text-[7px] font-bold text-blue-200/60 uppercase mb-0.5 truncate tracking-wide">{label}</p>
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
  <div className={`glass-panel p-3 rounded-xl border-l-2 ${borderColor} transition-all hover:translate-x-1`}>
    <div className="flex justify-between items-end gap-2">
        <div>
            <span className={`text-[8px] font-bold uppercase block mb-0.5 ${color.replace('bg-', 'text-')}`}>{label}</span>
            <span className="text-xl font-black text-white leading-none">{value}</span>
        </div>
    </div>
    <div className="w-24 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${Math.min(100, progress)}%` }}
      ></div>
    </div>
  </div>
);

const TelemetryGrid: React.FC<{ 
    data: TelemetryData; 
    history: { 
        cycle: { time: number; value: number }[],
        pressure: { time: number; value: number }[],
        vibration: { time: number; value: number }[],
        torque: { time: number; value: number }[]
    } 
}> = ({ data, history }) => {
  return (
    <>
      <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-20">
        <TrendCard 
            label="Cycle Time" 
            value={data.cycleTime.toFixed(2)} 
            unit="s" 
            data={history.cycle} 
            color="text-blue-300"
            stroke="#93c5fd"
        />
        <TrendCard 
            label="Pressure" 
            value={Math.round(data.pressure).toString()} 
            unit="PSI" 
            data={history.pressure} 
            color="text-cyan-300"
            stroke="#67e8f9"
        />
        
        {/* Small stats row */}
        <div className="flex gap-2 mt-1">
          <StatCard label="Energy" value={`${data.energy}kW`} />
          <StatCard label="Uptime" value={`${data.uptime}%`} />
          <StatCard label="Temp" value={`${data.temp}°C`} />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20 items-end">
        <TrendCard 
            label="Torque" 
            value={Math.round(data.torque).toString()} 
            unit="Nm" 
            data={history.torque} 
            color="text-amber-300"
            stroke="#fcd34d"
        />
        <TrendCard 
            label="Vibration" 
            value={data.vibration.toFixed(2)} 
            unit="mm/s" 
            data={history.vibration} 
            color="text-fuchsia-300"
            stroke="#f0abfc"
        />
        
        {/* Yield/Defects moved to a compact row below right charts */}
        <div className="flex gap-2 mt-1">
            <ProgressBarCard 
            label="Yield" 
            value={`${data.yield}%`} 
            progress={data.yield} 
            color="bg-emerald-400" 
            borderColor="border-emerald-400" 
            />
            <ProgressBarCard 
            label="Defects" 
            value={`${data.defects}%`} 
            progress={data.defects * 5} 
            color="bg-rose-400" 
            borderColor="border-rose-400" 
            />
        </div>
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
    <div className="w-24 relative flex flex-col justify-between py-10 z-20">
      <div className="absolute left-4 top-14 bottom-14 w-[1px] bg-gradient-to-b from-white/0 via-white/40 to-white/0"></div>
      
      {STAGES.map((stage) => {
        const isActive = currentStage === stage.id;
        return (
          <button
            key={stage.id}
            onClick={() => setStage(stage.id)}
            className="relative flex items-center gap-3 group outline-none text-left"
          >
            <div 
              className={`w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-sm z-10 transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-400 border-white shadow-lg shadow-blue-500/50 scale-110' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isActive ? 'text-indigo-900 font-bold' : 'text-white'}`}>
                {stage.icon}
              </span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
              {stage.label}
            </span>
            {isActive && (
                <div className="absolute -right-2 w-1 h-4 bg-white/40 rounded-full blur-sm"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [mode, setMode] = useState<AppMode>('OPERATIONAL');
  const [stage, setStage] = useState<ProcessStage>('PROD');
  
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    cycleTime: 4.2,
    energy: 12,
    uptime: 99.8,
    temp: 42,
    yield: 98.4,
    defects: 0.12,
    pressure: 2400,
    vibration: 1.2,
    torque: 450
  });

  // Consolidated history state for all trend lines
  const [history, setHistory] = useState<{
    cycle: { time: number; value: number }[];
    pressure: { time: number; value: number }[];
    vibration: { time: number; value: number }[];
    torque: { time: number; value: number }[];
  }>({
    cycle: [],
    pressure: [],
    vibration: [],
    torque: []
  });

  const [insight, setInsight] = useState<string>("Analyzing industrial patterns...");
  const historyCounter = useRef(0);

  // Simulation of live engine telemetry data
  useEffect(() => {
    const interval = setInterval(() => {
      const t = historyCounter.current++;

      // Generate random fluctuations
      const nextCycleTime = Number((4.1 + Math.random() * 0.2).toFixed(2));
      const nextPressure = Math.floor(2350 + Math.random() * 100);
      const nextVibration = Number((1.0 + Math.random() * 1.5).toFixed(2));
      const nextTorque = Math.floor(440 + Math.random() * 30);

      setTelemetry(prev => ({
        ...prev,
        cycleTime: nextCycleTime,
        energy: Number((11.5 + Math.random() * 1.0).toFixed(1)),
        temp: Math.floor(40 + Math.random() * 5),
        yield: Number((98 + Math.random() * 1).toFixed(1)),
        defects: Number((0.1 + Math.random() * 0.05).toFixed(2)),
        pressure: nextPressure,
        vibration: nextVibration,
        torque: nextTorque
      }));

      setHistory(prev => {
        const keepLast = (arr: any[], item: any) => [...arr, item].slice(-15);
        return {
          cycle: keepLast(prev.cycle, { time: t, value: nextCycleTime }),
          pressure: keepLast(prev.pressure, { time: t, value: nextPressure }),
          vibration: keepLast(prev.vibration, { time: t, value: nextVibration }),
          torque: keepLast(prev.torque, { time: t, value: nextTorque }),
        };
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark">
      <div className="w-full max-w-[640px] h-[640px] overflow-hidden relative bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col font-display">
        
        {/* Top Switcher */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md p-1 rounded-full border border-white/10">
            <button 
              onClick={() => setMode('OPERATIONAL')}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                mode === 'OPERATIONAL' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              Operational
            </button>
            <button 
              onClick={() => setMode('MARKETING')}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                mode === 'MARKETING' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              Marketing
            </button>
          </div>
        </div>

        {/* Main Interface Content */}
        <div className="relative flex-1 flex p-8 mt-12">
          {/* Left Sidebar Navigation */}
          <Sidebar currentStage={stage} setStage={setStage} />

          {/* Central Interactive Display */}
          <div className="flex-1 relative flex items-center justify-center">
            {/* Background Wireframe Decorator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <svg className="wireframe-stroke animate-spin-slow" height="300" viewBox="0 0 100 100" width="300">
                <rect fill="none" height="80" stroke="white" stroke-width="0.5" width="80" x="10" y="10" strokeDasharray="4"></rect>
                <circle cx="50" cy="50" fill="none" r="30" stroke="white" stroke-width="0.5" strokeDasharray="2"></circle>
                <path d="M10 50 L90 50 M50 10 L50 90" stroke="white" stroke-width="0.5" strokeDasharray="1"></path>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center mb-12">
              <div className="w-48 h-48 rounded-[2.5rem] glass-panel flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-blue-500/10 rounded-[2.5rem] blur-xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                
                {/* Dynamic Stage Icon */}
                <span className="material-symbols-outlined text-7xl text-white opacity-90 transition-transform group-hover:scale-110 duration-500">
                  {stage === 'PROD' ? 'precision_manufacturing' : stage === 'DESIGN' ? 'edit' : stage === 'PROTO' ? 'token' : 'verified'}
                </span>

                {/* Status Indicator */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-green-400 flex items-center justify-center shadow-lg border-4 border-indigo-700 animate-bounce transition-all">
                  <span className="material-symbols-outlined text-indigo-900 font-bold text-2xl">check_circle</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                  Discrete Engine V4
                </h2>
                <p className="text-sm text-blue-100/70 font-semibold tracking-wide mt-1">
                  Batch ID: #4409-PRD
                </p>
                
                {/* Gemini-Powered Insights Display */}
                <div className="mt-4 px-6 py-2 glass-panel rounded-full max-w-xs mx-auto min-h-[40px] flex items-center justify-center">
                    <p className="text-[10px] italic text-blue-100/90 leading-tight">
                        {insight}
                    </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Overlays */}
          <TelemetryGrid data={telemetry} history={history} />
        </div>

        {/* Global Dashboard Footer */}
        <div className="absolute bottom-0 left-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="px-8 py-5 bg-black/20 flex justify-between items-center backdrop-blur-xl border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-400 text-sm animate-pulse">analytics</span>
            <span className="text-[10px] font-extrabold text-white/50 uppercase tracking-[0.3em]">Nexus Real-time Telemetry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping absolute"></div>
            <div className="w-2 h-2 rounded-full bg-green-400 relative"></div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">System Active</span>
          </div>
        </div>
      </div>
      
      {/* External Action Controls */}
      <div className="mt-8 flex gap-4">
        <button 
            onClick={fetchInsights}
            className="px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-white"
        >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Refresh AI Insights
        </button>
      </div>
    </div>
  );
}