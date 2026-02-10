'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Timer, Rocket, Activity, ArrowUpRight, Zap, Globe, Cpu } from 'lucide-react';

interface Stats {
    winRate: number;
    salesCycle: number;
    velocity: number;
    activeUsers: number;
    latency: number;
}

export default function SalesEnablementTile() {
    const [stats, setStats] = useState<Stats>({
        winRate: 39.2,
        salesCycle: 28.5,
        velocity: 45.2,
        activeUsers: 842,
        latency: 12
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                winRate: 39 + Math.random() * 0.5,
                salesCycle: 28 + Math.random() * 0.5,
                velocity: 45 + Math.random() * 1,
                activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1),
                latency: 12 + Math.floor(Math.random() * 3)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center p-4">
             <div className="relative w-full max-w-[500px] aspect-square bg-[#0f172a] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col font-sans select-none">
                
                {/* Background FX */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/60 to-slate-900" />
                </div>

                {/* --- HEADER (Top 12-15%) --- */}
                <div className="relative z-10 h-[12%] min-h-[60px] flex items-center justify-between px-6 border-b border-white/5 bg-slate-900/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-cyan-500/10 rounded-md border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                            <Network className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-slate-200 font-bold tracking-wider text-[10px] leading-none mb-0.5">SALESHERO</span>
                            <span className="text-slate-500 font-bold tracking-widest text-[8px] leading-none">OS v2.4</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
                        <div className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-400 tracking-wide">LIVE</span>
                    </div>
                </div>

                {/* --- MAIN CONTENT BODY --- */}
                <div className="relative z-10 flex-1 flex flex-col p-6 overflow-hidden">
                    
                    {/* Hero Section - Flexible Spacer to center strictly in available space */}
                    <div className="flex-1 flex items-center justify-center py-2">
                        <div className="relative">
                            {/* Animated Rings */}
                            <motion.div 
                                className="absolute inset-0 -m-8 border border-slate-700/50 rounded-full border-dashed"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute inset-0 -m-1 border border-cyan-500/30 rounded-full"
                                animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                                transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
                            />
                            
                            {/* Center Hero Content */}
                            <div className="relative w-40 h-40 bg-slate-900/80 backdrop-blur-xl rounded-full border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col items-center justify-center group">
                                <Zap className="w-5 h-5 text-cyan-400 mb-1 opacity-80 group-hover:text-white transition-colors" />
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Win Rate</span>
                                <motion.span 
                                    className="text-4xl font-black text-white tracking-tighter"
                                    key={Math.floor(stats.winRate)}
                                >
                                    +{stats.winRate.toFixed(1)}%
                                </motion.span>
                                <div className="mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                                    <span className="text-[9px] font-bold text-emerald-400">OPTIMAL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stacked Secondary Cards (Vertical List) */}
                    <div className="flex flex-col gap-3 mt-4">
                        {/* Card 1: Sales Cycle */}
                        <div className="group bg-slate-800/30 border border-white/5 hover:border-white/10 rounded-xl p-3 flex items-center justify-between transition-all hover:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                    <Timer className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">Sales Cycle</span>
                                    <span className="text-white text-sm font-bold">-{stats.salesCycle.toFixed(1)}% Redux</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end w-24">
                                <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-indigo-500" 
                                        initial={{ width: "0%" }}
                                        animate={{ width: "72%" }}
                                        transition={{ duration: 1.5 }}
                                    />
                                </div>
                                <span className="text-[9px] text-slate-500 mt-1 font-mono">TARGET: -30%</span>
                            </div>
                        </div>

                        {/* Card 2: Velocity */}
                        <div className="group bg-slate-800/30 border border-white/5 hover:border-white/10 rounded-xl p-3 flex items-center justify-between transition-all hover:bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:text-pink-300 transition-colors">
                                    <Rocket className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">Velocity</span>
                                    <span className="text-white text-sm font-bold">+{stats.velocity.toFixed(1)}% Boost</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end w-24">
                                <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-pink-500" 
                                        initial={{ width: "0%" }}
                                        animate={{ width: "85%" }}
                                        transition={{ duration: 1.5 }}
                                    />
                                </div>
                                <span className="text-[9px] text-slate-500 mt-1 font-mono">PEAK PERF</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER (Bottom 15%) --- */}
                <div className="relative z-10 h-[15%] min-h-[70px] bg-slate-900/40 backdrop-blur-md border-t border-white/5 flex items-center px-6 gap-6">
                    {/* Background Chart for Footer */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                         <svg className="w-full h-full" preserveAspectRatio="none">
                            <path d="M0,70 L600,70" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                            <motion.path 
                                d="M0,50 Q60,40 120,45 T240,30 T360,40 T480,20 T600,35"
                                fill="none"
                                stroke="#13a4ec"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 3, ease: "easeOut" }}
                            />
                         </svg>
                    </div>

                    {/* Telemetry Items */}
                    <div className="flex-1 flex justify-between items-center relative z-10">
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                                <Activity className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Agents</span>
                            </div>
                            <span className="text-sm font-mono font-bold text-white">{stats.activeUsers}</span>
                        </div>
                        
                        <div className="w-px h-8 bg-white/10" />

                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                                <Cpu className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Latency</span>
                            </div>
                            <span className="text-sm font-mono font-bold text-emerald-400">{stats.latency}ms</span>
                        </div>

                        <div className="w-px h-8 bg-white/10" />

                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5 text-slate-500 mb-0.5">
                                <Globe className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-wider">Region</span>
                            </div>
                            <span className="text-sm font-mono font-bold text-cyan-400">US-EAST</span>
                        </div>
                    </div>
                </div>

             </div>
        </div>
    );
}