'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Zap, 
  Leaf, 
  Plug2, 
  BarChart3, 
  Home, 
  MapPin 
} from 'lucide-react';

export default function EnergyGridTile() {
  // --- Simulation State ---
  const [voltage, setVoltage] = useState<number>(415.2);
  const [loadFactor, setLoadFactor] = useState<number>(82);
  const [efficiency, setEfficiency] = useState<number>(94.2);

  // Simulate subtle live data fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setVoltage((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setLoadFactor((prev) => Math.min(99, Math.max(75, Math.floor(prev + (Math.random() * 2 - 1)))));
      setEfficiency((prev) => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[600px] h-[600px] bg-slate-950 border border-emerald-950 overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.5)] font-display text-slate-200 antialiased select-none group">
      
      {/* Background Micro-Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,#065f4622_0.5px,transparent_0.5px)] bg-[length:16px_16px]"
      />

      {/* --- Header --- */}
      <header className="h-[15%] w-full border-b border-emerald-900/30 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <div className="size-6 text-emerald-800">
            {/* Custom Logo SVG from original */}
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-emerald-800 uppercase">UtilitiesHero</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="size-1.5 rounded-full bg-emerald-700 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            />
            <span className="text-[10px] font-bold text-slate-500 tracking-tighter">SYSTEM: STABLE</span>
          </div>
          <div className="flex gap-1">
            <button className="size-6 bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">
              <Settings className="w-3 h-3 text-slate-500" />
            </button>
            <button className="size-6 bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">
              <Bell className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* Upper Section: Big Metric & List */}
        <div className="w-full flex items-center justify-center gap-8 mb-8">
          
          {/* Central Hero Metric */}
          <div className="flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="size-10 bg-emerald-950 border border-emerald-900/50 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(6,78,59,0.5)]"
            >
              <Zap className="w-5 h-5 text-emerald-500 fill-emerald-500" />
            </motion.div>
            <div className="text-[5rem] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
              +29%
            </div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em] mt-1">
              Grid Reliability
            </div>
          </div>

          {/* Right Side Status List */}
          <div className="flex flex-col gap-3 relative pl-4 border-l border-emerald-900/30">
            {/* List Item 1 */}
            <div className="flex items-center gap-3 group/item">
              <div className="size-8 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover/item:border-emerald-900 group-hover/item:text-emerald-500 transition-colors">
                <Leaf className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-slate-600 uppercase">Renewables</span>
                <span className="text-xs font-bold text-slate-300">ACTIVE</span>
              </div>
            </div>

            {/* List Item 2 */}
            <div className="flex items-center gap-3 group/item">
              <div className="size-8 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover/item:border-emerald-900 group-hover/item:text-emerald-500 transition-colors">
                <Plug2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-slate-600 uppercase">Substation A</span>
                <span className="text-xs font-bold text-slate-300">ONLINE</span>
              </div>
            </div>

            {/* List Item 3 */}
            <div className="flex items-center gap-3 group/item">
              <div className="size-8 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover/item:border-emerald-900 group-hover/item:text-emerald-500 transition-colors">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-slate-600 uppercase">Efficiency</span>
                <span className="text-xs font-bold text-slate-300">{efficiency}%</span>
              </div>
            </div>

            {/* List Item 4 */}
            <div className="flex items-center gap-3 group/item">
              <div className="size-8 bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover/item:border-emerald-900 group-hover/item:text-emerald-500 transition-colors">
                <Home className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-slate-600 uppercase">Smart Grid</span>
                <span className="text-xs font-bold text-slate-300">OPTIMIZED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Grid Metrics */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[480px]">
          {/* Card 1 */}
          <div className="p-3 bg-slate-900/40 border-l-2 border-emerald-900 hover:bg-slate-900/60 transition-colors">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Optimization</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">+41%</span>
              <span className="text-[9px] text-slate-600">Adoption</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-3 bg-slate-900/40 border-l-2 border-emerald-950 hover:bg-slate-900/60 transition-colors">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Performance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">22%</span>
              <span className="text-[9px] text-slate-600">Savings</span>
            </div>
          </div>

          {/* Card 3 - Dynamic Voltage */}
          <div className="p-3 bg-slate-900/40 border-l-2 border-emerald-950 hover:bg-slate-900/60 transition-colors">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Input Voltage</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white tabular-nums">{voltage} kV</span>
              <span className="text-[9px] text-emerald-800 font-bold uppercase">Normal</span>
            </div>
          </div>

          {/* Card 4 - Dynamic Load Factor */}
          <div className="p-3 bg-slate-900/40 border-l-2 border-emerald-900 hover:bg-slate-900/60 transition-colors">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Load Factor</p>
            <div className="w-full mt-1.5 flex items-center gap-2">
              <span className="text-xl font-bold text-white tabular-nums w-8">{loadFactor}%</span>
              <div className="flex-1 h-1 bg-slate-800 overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${loadFactor}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                  className="h-full bg-emerald-700"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="h-[15%] w-full border-t border-emerald-900/30 bg-slate-950 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <MapPin className="text-lg text-slate-600 w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-[8px] font-bold text-slate-600 uppercase">Node Location</span>
            <span className="text-[10px] font-bold text-slate-400">Berlin, Germany Central Station</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-[10px] font-bold border border-slate-800 text-slate-500 uppercase hover:bg-slate-900 transition-colors">
            Export
          </button>
          <button className="px-3 py-1.5 text-[10px] font-bold bg-emerald-950 border border-emerald-900 text-emerald-100 uppercase hover:bg-emerald-900 transition-colors animate-pulse">
            Emergency Shutdown
          </button>
        </div>
      </footer>

      {/* --- Animated Background Elements (SVG) --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0" viewBox="0 0 600 600">
        <motion.path 
          d="M300 90 L300 200" 
          fill="none" 
          stroke="#065f46" 
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.path 
          d="M300 400 L300 510" 
          fill="none" 
          stroke="#065f46" 
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
        
        {/* Rotating central ring */}
        <motion.circle 
          cx="300" 
          cy="300" 
          r="150" 
          fill="none" 
          stroke="#065f46" 
          strokeDasharray="4 4" 
          strokeWidth="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Subtle decorative ring */}
        <motion.circle 
          cx="300" 
          cy="300" 
          r="220" 
          fill="none" 
          stroke="#065f46" 
          strokeWidth="0.2"
          opacity="0.5"
          animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}