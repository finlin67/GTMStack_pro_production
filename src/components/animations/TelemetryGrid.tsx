'use client';

import React from 'react';
import { TelemetryData } from './Industrial-MFG-Tile';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface TelemetryGridProps {
  data: TelemetryData;
  history: { time: number; value: number }[];
}

export const TelemetryGrid: React.FC<TelemetryGridProps> = ({ data, history }) => {
  return (
    <>
      <div className="absolute bottom-8 left-8 flex flex-col gap-3 z-20">
        {/* Cycle Time with Trend Line */}
        <div className="glass-panel p-3 rounded-xl min-w-[212px] transition-transform hover:scale-105 overflow-hidden">
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="text-[10px] font-bold text-blue-200/60 uppercase">Cycle Time</p>
              <p className="text-lg font-extrabold text-white">{data.cycleTime}s</p>
            </div>
            <div className="h-8 w-24">
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

        {/* Other metrics in a small grid below */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Energy" value={`${data.energy}kW`} />
          <StatCard label="Uptime" value={`${data.uptime}%`} />
          <StatCard label="Temp" value={`${data.temp}°C`} />
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col gap-3 z-20">
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
