
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Rocket, Users, Mail, TrendingUp, TrendingDown, Wallet, AreaChart, Blocks, Activity, Hash } from 'lucide-react';

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: 'easeOut',
        },
    }),
};

const numberVariant: Variants = {
  initial: { opacity: 0, y: 10, filter: 'blur(8px)' },
  animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
      opacity: 0, 
      y: -10, 
      filter: 'blur(8px)',
      transition: { duration: 0.2, ease: "easeIn" }
  },
};

export default function MarTechTile() {
    const [stats, setStats] = useState({ utilization: 68, roi: 3.7 });
    const [isOptimized, setIsOptimized] = useState(true);

    useEffect(() => {
        let intervalId: number | undefined;

        if (isOptimized) {
            intervalId = window.setInterval(() => {
                setStats({
                    utilization: 68 + (Math.random() * 4 - 2),
                    roi: 3.7 + (Math.random() * 0.2 - 0.1),
                });
            }, 3000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isOptimized]);

    const handleToggle = () => {
        const nextState = !isOptimized;
        setIsOptimized(nextState);
        if (nextState) {
            setStats({ utilization: 68, roi: 3.7 });
        } else {
            setStats({ utilization: 24, roi: 1.2 });
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center p-4">
            <div className="relative w-full max-w-[600px] aspect-square bg-[#16202e] rounded-3xl border border-[#223149] overflow-hidden shadow-2xl flex flex-col font-display">
                
                {/* --- HEADER (Top 15%) --- */}
                <div className="h-[12%] min-h-[60px] border-b border-[#223149] bg-[#16202e]/80 backdrop-blur z-30 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className={`relative flex items-center justify-center size-3`}>
                             <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${isOptimized ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                             <span className={`relative inline-flex rounded-full size-2 ${isOptimized ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        </div>
                        <span className="text-xs font-bold text-[#90a7cb] uppercase tracking-widest">System Status: <span className={isOptimized ? 'text-white' : 'text-red-400'}>{isOptimized ? 'OPTIMIZED' : 'DEGRADED'}</span></span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#101722] border border-[#223149]">
                        <Hash className="size-3 text-[#5b6e8a]" />
                        <span className="text-[10px] font-mono text-[#5b6e8a] font-bold">NODE-8492</span>
                    </div>
                </div>

                {/* --- BODY (Content Area) --- */}
                <div className="relative flex-1 w-full overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #223149 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    
                    {/* SVG Connections (Redrawn for Vertical Flow) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10" preserveAspectRatio="none" viewBox="0 0 600 400">
                        {/* Top Left to Center */}
                        <motion.path d="M120,80 C120,150 300,100 300,200" fill="none" animate={{stroke: isOptimized ? '#3d84f5' : '#4b5563', strokeDasharray: isOptimized ? "8 4" : "0 0"}} strokeWidth="2" />
                        {/* Top Right to Center */}
                        <motion.path d="M480,80 C480,150 300,100 300,200" fill="none" animate={{stroke: isOptimized ? '#3d84f5' : '#4b5563', strokeDasharray: isOptimized ? "8 4" : "0 0"}} strokeWidth="2" />
                        
                        {/* Center to Bottom Left (Stream Monitor) */}
                        <motion.path d="M300,200 C300,280 120,250 120,320" fill="none" animate={{stroke: isOptimized ? '#0bda5e' : '#ef4444'}} strokeWidth="2" />
                        {/* Center to Bottom Middle (Analytics) */}
                        <motion.path d="M300,200 C300,280 300,250 300,320" fill="none" animate={{stroke: isOptimized ? '#0bda5e' : '#ef4444'}} strokeWidth="2" />
                        {/* Center to Bottom Right (Contentful) */}
                        <motion.path d="M300,200 C300,280 480,250 480,320" fill="none" animate={{stroke: isOptimized ? '#0bda5e' : '#ef4444'}} strokeWidth="2" />
                    </svg>

                    {/* Central Hub (Optical Center) */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div 
                            animate={{boxShadow: isOptimized ? '0 0 30px rgba(61, 132, 245, 0.4)' : '0 0 30px rgba(239, 68, 68, 0.4)'}}
                            className={`size-24 rounded-full bg-[#16202e] border-2 border-[#3d84f5] flex items-center justify-center relative z-20`}
                        >
                            <Rocket className={`size-10 ${isOptimized ? 'text-primary' : 'text-red-500'}`} />
                        </motion.div>
                        {/* Pulse Ring */}
                        <motion.div 
                            className={`absolute inset-0 rounded-full border ${isOptimized ? 'border-primary' : 'border-red-500'} opacity-20`}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Input Nodes (Top Row) */}
                    <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} className="absolute top-[10%] left-[10%] z-20 flex flex-col items-center gap-2">
                         <div className="p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Users className="text-white size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur">
                            <p className="text-[10px] font-bold text-white tracking-tight">Salesforce</p>
                         </div>
                    </motion.div>

                    <motion.div custom={1.2} initial="hidden" animate="visible" variants={cardVariants} className="absolute top-[10%] right-[10%] z-20 flex flex-col items-center gap-2">
                         <div className="p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Mail className="text-white size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur">
                            <p className="text-[10px] font-bold text-white tracking-tight">Marketo</p>
                         </div>
                    </motion.div>

                    {/* Output Nodes (Bottom Row - Now 3 Columns) */}
                    
                    {/* Left: Stream Monitor */}
                    <motion.div custom={1.4} initial="hidden" animate="visible" variants={cardVariants} className="absolute bottom-[10%] left-[8%] z-20 flex flex-col-reverse items-center gap-2">
                         <div className="p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Activity className="text-white size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur">
                            <p className="text-[10px] font-bold text-white tracking-tight">Stream Monitor</p>
                         </div>
                    </motion.div>

                    {/* Center: Analytics (NEW) */}
                    <motion.div custom={1.5} initial="hidden" animate="visible" variants={cardVariants} className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 flex flex-col-reverse items-center gap-2">
                         <motion.div 
                            animate={{ borderColor: isOptimized ? 'rgba(61, 132, 245, 0.5)' : 'rgba(239, 68, 68, 0.5)' }}
                            className="p-3 bg-[#16202e] rounded-xl border border-[#3d84f5]/30 shadow-lg relative overflow-hidden"
                        >
                            <AreaChart className="text-white size-5 relative z-10" />
                            {/* Mini background chart animation */}
                            <svg className="absolute bottom-0 left-0 w-full h-8 opacity-20" viewBox="0 0 40 20" preserveAspectRatio="none">
                                <motion.path d="M0,15 L10,10 L20,12 L30,5 L40,10" fill="none" stroke="currentColor" strokeWidth="2"
                                    animate={{ d: isOptimized ? "M0,15 L10,5 L20,12 L30,2 L40,10" : "M0,10 L10,15 L20,18 L30,15 L40,20" }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    className={isOptimized ? 'text-primary' : 'text-red-500'}
                                />
                            </svg>
                         </motion.div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur">
                            <p className="text-[10px] font-bold text-white tracking-tight">Analytics</p>
                         </div>
                    </motion.div>

                    {/* Right: Contentful */}
                    <motion.div custom={1.6} initial="hidden" animate="visible" variants={cardVariants} className="absolute bottom-[10%] right-[8%] z-20 flex flex-col-reverse items-center gap-2">
                         <div className="p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Blocks className="text-white size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur">
                            <p className="text-[10px] font-bold text-white tracking-tight">Contentful</p>
                         </div>
                    </motion.div>
                </div>

                {/* --- FOOTER (Bottom 18%) --- */}
                <div className="h-[18%] min-h-[90px] bg-[#101722] border-t border-[#223149] z-30 grid grid-cols-3 divide-x divide-[#223149]">
                    
                    {/* Metric 1 */}
                    <div className="flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${isOptimized ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <p className="text-[10px] text-[#90a7cb] uppercase font-bold tracking-wider mb-1">Utilization</p>
                        <div className="flex items-center gap-1.5">
                            {isOptimized ? <TrendingUp className="size-4 text-[#0bda5e]" /> : <TrendingDown className="size-4 text-red-500" />}
                            <AnimatePresence mode="wait">
                                <motion.span key={`util-${isOptimized}`} variants={numberVariant} initial="initial" animate="animate" exit="exit" className="text-xl font-bold text-white tabular-nums">
                                    {stats.utilization.toFixed(0)}%
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-center justify-center p-2 gap-2 bg-[#0b0f17]">
                        <span className="text-[9px] text-[#5b6e8a] font-bold uppercase tracking-widest">Optimization Mode</span>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleToggle}>
                             <span className={`text-[10px] font-bold transition-colors ${!isOptimized ? 'text-white' : 'text-[#5b6e8a]'}`}>OFF</span>
                             <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${isOptimized ? 'bg-primary shadow-[0_0_10px_rgba(61,132,245,0.5)]' : 'bg-[#223149]'}`}>
                                <motion.div
                                    className="size-4 bg-white rounded-full shadow-sm"
                                    layout
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                             </div>
                             <span className={`text-[10px] font-bold transition-colors ${isOptimized ? 'text-white' : 'text-[#5b6e8a]'}`}>ON</span>
                        </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${isOptimized ? 'bg-primary' : 'bg-red-500'}`}></div>
                        <p className="text-[10px] text-[#90a7cb] uppercase font-bold tracking-wider mb-1">Return on Inv.</p>
                        <div className="flex items-center gap-1.5">
                            <Wallet className={`size-4 ${isOptimized ? 'text-primary' : 'text-red-500'}`} />
                            <AnimatePresence mode="wait">
                                <motion.span key={`roi-${isOptimized}`} variants={numberVariant} initial="initial" animate="animate" exit="exit" className="text-xl font-bold text-white tabular-nums">
                                    {stats.roi.toFixed(1)}x
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
