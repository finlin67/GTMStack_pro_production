'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Database, CheckCircle2, Zap } from 'lucide-react';

export default function MarketingOperationsTile() {
    return (
        <div className="relative w-full max-w-[600px] aspect-square flex-1 bg-slate-900 dark:bg-[#0c1219] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px] group">
            {/* SVG Overlay for connections and curves */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
                {/* Connecting Bezier Lines */}
                <path className="stroke-teal-500/30 stroke-2 fill-none" d="M150 150 Q 300 150 300 300"></path>
                <path className="stroke-teal-500/30 stroke-2 fill-none" d="M450 150 Q 300 150 300 300"></path>
                <path className="stroke-teal-500/30 stroke-2 fill-none" d="M150 450 Q 300 450 300 300"></path>
                <path className="stroke-teal-500/30 stroke-2 fill-none" d="M450 450 Q 300 450 300 300"></path>
                {/* Efficiency Curve */}
                <path className="stroke-primary stroke-[3] fill-none [stroke-dasharray:4_2]" d="M50 500 C 150 480, 250 200, 550 100"></path>
            </svg>
            
            {/* Background Layers (Semantic Nodes) */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Integration Hub */}
                <div className="relative z-30 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-32 h-32 rounded-full bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-primary flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                            <SlidersHorizontal className="text-white" size={48} />
                        </div>
                    </div>
                    {/* Pulse Effect */}
                    <motion.div 
                        className="absolute -inset-4 border-2 border-cyan-400/20 rounded-full"
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.7, 0, 0.7]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
                
                {/* Top Left Node: Data Governance */}
                <div className="absolute top-[120px] left-[120px] z-20">
                    <div className="bg-slate-900/80 border border-slate-700 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <Database className="text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-white text-xs font-bold">DATA GOVERNANCE</p>
                            <p className="text-emerald-400 text-[10px] font-medium flex items-center"><CheckCircle2 className="text-xs mr-1" />Active</p>
                        </div>
                    </div>
                </div>

                {/* Top Right Node: Process Opt */}
                <div className="absolute top-[120px] right-[120px] z-20">
                    <div className="bg-slate-900/80 border border-slate-700 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                            <Zap className="text-violet-400" />
                        </div>
                        <div>
                            <p className="text-white text-xs font-bold">PROCESS OPT</p>
                            <div className="w-20 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                                <div className="w-[85%] h-full bg-violet-400"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Stat 1: Accuracy */}
                <div className="absolute bottom-[100px] left-[60px] z-40">
                    <div className="flex flex-col gap-1 rounded-xl p-5 border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-xl">
                        <p className="text-emerald-300 text-[10px] font-bold tracking-widest uppercase">Accuracy</p>
                        <p className="text-white text-3xl font-black leading-none">99.9%</p>
                        <div className="mt-2 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 border-2 border-emerald-500 shadow-[0_0_15px_rgba(11,218,94,0.4)]"></span>
                            <span className="text-emerald-400 text-[10px] font-medium">Real-time Validation</span>
                        </div>
                    </div>
                </div>

                {/* Floating Stat 2: Speed */}
                <div className="absolute bottom-[160px] right-[60px] z-40">
                    <div className="flex flex-col gap-1 rounded-xl p-5 border border-primary/30 bg-primary/20 backdrop-blur-xl">
                        <p className="text-blue-300 text-[10px] font-bold tracking-widest uppercase">Throughput</p>
                        <p className="text-white text-3xl font-black leading-none">4.2x</p>
                        <p className="text-blue-300 text-[10px] font-medium mt-1">Reporting Velocity</p>
                    </div>
                </div>

                {/* Floating Tech Stack Tags */}
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex flex-col gap-2 z-10 opacity-40">
                    <div className="bg-slate-800 h-8 px-3 rounded-full flex items-center text-slate-400 text-[10px] font-bold">SALESFORCE</div>
                    <div className="bg-slate-800 h-8 px-3 rounded-full flex items-center text-slate-400 text-[10px] font-bold">MARKETO</div>
                    <div className="bg-slate-800 h-8 px-3 rounded-full flex items-center text-slate-400 text-[10px] font-bold">HUBSPOT</div>
                </div>
            </div>
            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0c1219] to-transparent z-50"></div>
        </div>
    );
}
