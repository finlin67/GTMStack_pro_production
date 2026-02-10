'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  UserPlus, 
  Zap, 
  BadgeCheck, 
  TrendingUp 
} from 'lucide-react';

export interface GrowthMetrics {
  netRetention: string;
  signUpCount: string;
  signUpWidth: string;
  activationRate: string;
  activationWidth: string;
  advocacyCount: string;
  advocacyWidth: string;
  monthlyRevenue: string;
  revenueGrowth: string;
  expansionMultiplier: string;
  avatar1Url: string;
  avatar2Url: string;
}

interface GrowthMarketingTileProps {
  metrics?: Partial<GrowthMetrics>;
}

export default function GrowthMarketingTile({ metrics: initialMetrics }: GrowthMarketingTileProps) {
  const [metrics] = useState<GrowthMetrics>({
    netRetention: "112%",
    signUpCount: "4.2k",
    signUpWidth: "33%",
    activationRate: "+58%",
    activationWidth: "58%",
    advocacyCount: "1.8k",
    advocacyWidth: "75%",
    monthlyRevenue: "$4.2M",
    revenueGrowth: "+84%",
    expansionMultiplier: "3.4x",
    avatar1Url: "https://picsum.photos/100/100?random=1",
    avatar2Url: "https://picsum.photos/100/100?random=2",
    ...initialMetrics
  });

  return (
    <div className="relative w-full aspect-square max-w-[580px] mx-auto group select-none">
      {/* Container Background */}
      <div 
        className="absolute inset-0 rounded-3xl bg-slate-900/50 border border-white/10 overflow-hidden backdrop-blur-sm"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.08) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      >
        {/* Background Gradient SVG Path */}
        <div className="absolute inset-0 flex items-end">
          <svg
            className="w-full h-full opacity-40"
            fill="none"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="450" x2="500" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="0.5" stopColor="#8b5cf6" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 450C50 440 100 400 150 380C200 360 250 320 300 250C350 180 400 100 500 20"
              stroke="url(#gradient)"
              strokeLinecap="round"
              strokeWidth="6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          
          {/* Main Central Hub Node */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative mb-12 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-purple-500 to-blue-500 shadow-[0_0_40px_rgba(168,85,247,0.5)]"
          >
            <div className="bg-slate-950 rounded-full p-8 flex flex-col items-center justify-center border border-white/10 w-40 h-40 z-10 relative">
              <Network className="w-10 h-10 text-purple-500 mb-1" />
              <div className="text-3xl font-black text-white leading-none">{metrics.netRetention}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-blue-300 mt-1">Net Retention</div>
            </div>

            {/* Orbiting Avatar 1 (Top Right) */}
            <motion.div 
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full border-2 border-purple-500 bg-slate-900 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center overflow-hidden z-20"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                alt="Active user"
                className="w-full h-full object-cover"
                src={metrics.avatar1Url}
              />
            </motion.div>

            {/* Orbiting Avatar 2 (Left) */}
            <motion.div 
              className="absolute top-1/2 -left-8 w-8 h-8 rounded-full border-2 border-blue-500 bg-slate-900 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center overflow-hidden z-20"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <img
                alt="Advocate user"
                className="w-full h-full object-cover"
                src={metrics.avatar2Url}
              />
            </motion.div>
          </motion.div>

          {/* Stats Bars List */}
          <div className="w-full flex flex-col items-center gap-3">
            {/* Bar 1: Sign-Up */}
            <motion.div 
              className="w-[80%] h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between px-4 relative overflow-hidden"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 bg-purple-500/10"
                initial={{ width: 0 }}
                animate={{ width: metrics.signUpWidth }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
              <span className="text-xs font-bold text-blue-200 flex items-center gap-2 relative z-10">
                <UserPlus className="w-4 h-4" /> SIGN-UP
              </span>
              <span className="text-sm font-black text-white relative z-10">{metrics.signUpCount}</span>
            </motion.div>

            {/* Bar 2: Activation */}
            <motion.div 
              className="w-[60%] h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between px-4 relative overflow-hidden"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 bg-purple-500/20"
                initial={{ width: 0 }}
                animate={{ width: metrics.activationWidth }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
              />
              <span className="text-xs font-bold text-blue-200 flex items-center gap-2 relative z-10">
                <Zap className="w-4 h-4" /> ACTIVATION
              </span>
              <span className="text-sm font-black text-white relative z-10">{metrics.activationRate}</span>
            </motion.div>

            {/* Bar 3: Advocacy */}
            <motion.div 
              className="w-[40%] h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between px-4 relative overflow-hidden"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div 
                className="absolute inset-0 bg-blue-500/10"
                initial={{ width: 0 }}
                animate={{ width: metrics.advocacyWidth }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
              />
              <span className="text-xs font-bold text-blue-200 flex items-center gap-2 relative z-10">
                <BadgeCheck className="w-4 h-4" /> ADVOCACY
              </span>
              <span className="text-sm font-black text-white relative z-10">{metrics.advocacyCount}</span>
            </motion.div>
          </div>
        </div>

        {/* Floating Card: Monthly Revenue */}
        <motion.div 
          className="absolute top-8 left-8 p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl z-30"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium text-blue-200/70">Monthly Revenue</div>
            <div className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {metrics.monthlyRevenue}
              <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> {metrics.revenueGrowth}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Floating Card: Expansion Multiplier */}
        <motion.div 
          className="absolute bottom-12 right-8 p-4 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl z-30"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <div className="flex flex-col gap-1">
            <div className="text-xs font-medium text-blue-200/70">Expansion Multiplier</div>
            <div className="text-2xl font-black text-purple-500 tracking-tight">{metrics.expansionMultiplier}</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur Blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}