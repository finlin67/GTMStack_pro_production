'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Landmark, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Shield, 
  Check, 
  Lock
} from 'lucide-react';

// --- Configuration & Constants ---
const COLORS = {
  primary: "#3B82F6",       // Bold blue
  vaultNavy: "#001D3D",     // Dark Navy
  slateDark: "#0F172A",     // Background
  cardDark: "#1E293B",      // Card BG
  growthGreen: "#2ECC71",   // Success Green
  slateGrey: "#94A3B8",     // Text Grey
  gridLine: "rgba(255, 255, 255, 0.03)",
};

// --- Sub-components for Cleaner Logic ---

// 1. Background Grid with animated data streams
const DataGridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
      {/* Static Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${COLORS.gridLine} 1px, transparent 1px),
            linear-gradient(to bottom, ${COLORS.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Horizontal Data Streams */}
      <motion.div 
        className="absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ top: '120px', left: 0 }}
        animate={{ x: ['-100%', '400%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      />
      <motion.div 
        className="absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ top: '240px', left: -200 }}
        animate={{ x: ['-100%', '400%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 8, delay: 2, ease: "linear", repeat: Infinity }}
      />
      <motion.div 
        className="absolute h-[1px] w-[150px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
        style={{ top: '400px', left: -100 }}
        animate={{ x: ['-100%', '400%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 8, delay: 5, ease: "linear", repeat: Infinity }}
      />

      {/* Vertical Data Streams */}
      <motion.div 
        className="absolute w-[1px] h-[150px] bg-gradient-to-b from-transparent via-white/50 to-transparent"
        style={{ left: '160px', top: 0 }}
        animate={{ y: ['-100%', '400%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-[1px] h-[150px] bg-gradient-to-b from-transparent via-white/50 to-transparent"
        style={{ left: '320px', top: -150 }}
        animate={{ y: ['-100%', '400%'], opacity: [0, 0.4, 0] }}
        transition={{ duration: 12, delay: 3, ease: "linear", repeat: Infinity }}
      />

      {/* Particles */}
      <motion.div 
        className="absolute w-[3px] h-[3px] bg-white rounded-full"
        style={{ top: '160px', left: '80px' }}
        animate={{ x: ['0%', '500%'], opacity: [0, 1, 0] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-[3px] h-[3px] bg-white rounded-full"
        style={{ top: '320px', left: '400px' }}
        animate={{ y: ['0%', '500%'], opacity: [0, 1, 0] }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
      />
      <motion.div 
        className="absolute w-[3px] h-[3px] bg-white rounded-full"
        style={{ top: '440px', left: '200px' }}
        animate={{ x: ['0%', '500%'], opacity: [0, 1, 0] }}
        transition={{ duration: 12, delay: 4, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
};

// 2. Corner Avatar Component
const AvatarNode = ({ 
  imgUrl, 
  positionClass, 
  delay = 0 
}: { 
  imgUrl: string; 
  positionClass: string; 
  delay?: number 
}) => {
  return (
    <motion.div 
      className={`absolute flex flex-col items-center gap-1 group z-20 ${positionClass}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div 
        className="w-12 h-12 rounded-full border-2 border-slate-700 shadow-md bg-cover bg-center relative"
        style={{ backgroundImage: `url('${imgUrl}')` }}
      />
      <div className="w-4 h-4 bg-[#2ECC71] rounded-full border-2 border-[#1E293B] -mt-3 ml-8 flex items-center justify-center shadow-sm z-30">
        <Check size={8} strokeWidth={4} className="text-white" />
      </div>
    </motion.div>
  );
};

// 3. Central Shield Animation
const CentralHub = () => {
  return (
    <div className="relative z-20 flex items-center justify-center">
      {/* Rotating outer ring */}
      <motion.div 
        className="absolute -inset-3 rounded-full border-2 border-[#2ECC71]/30 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      
      {/* Pulsing Core */}
      <motion.div 
        className="w-24 h-24 bg-[#3B82F6] rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        animate={{ 
          boxShadow: [
            "0 0 0 0 rgba(46, 204, 113, 0.4)",
            "0 0 0 15px rgba(46, 204, 113, 0)",
            "0 0 0 0 rgba(46, 204, 113, 0)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Shield size={48} fill="currentColor" className="text-white" />
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-full mt-1 opacity-80" style={{ clipPath: 'path("M0 0 L5 5 L10 0 Z")'}} ></div> 
        </div>
      </motion.div>
    </div>
  );
};

// 4. Background Connecting Lines (SVG)
const ConnectionLines = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-10" viewBox="0 0 500 250">
    <motion.path 
      d="M100,50 Q250,125 400,50" 
      fill="none" 
      stroke="#3B82F6" 
      strokeWidth="1.5" 
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
    <motion.path 
      d="M100,200 Q250,125 400,200" 
      fill="none" 
      stroke="#3B82F6" 
      strokeWidth="1.5" 
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
    {/* Nodes */}
    <circle cx="100" cy="50" fill="#2ecc71" r="3" />
    <circle cx="400" cy="50" fill="#2ecc71" r="3" />
    <circle cx="100" cy="200" fill="#2ecc71" r="3" />
    <circle cx="400" cy="200" fill="#2ecc71" r="3" />
  </svg>
);

// 5. Revenue Chart Component
const RevenueChart = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-16">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
        <defs>
          <linearGradient id="gradient-green" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#2ecc71" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2ecc71" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Fill Area - Animated to fade in after line is drawn */}
        <motion.path 
          d="M0,100 L0,80 C50,75 100,78 150,60 C200,42 250,45 300,25 C350,5 400,10 L400,100 Z" 
          fill="url(#gradient-green)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 3, ease: "easeOut" }}
        />
        
        {/* Stroke Line */}
        <motion.path 
          d="M0,80 C50,75 100,78 150,60 C200,42 250,45 300,25 C350,5 400,10" 
          fill="none" 
          stroke="#2ecc71" 
          strokeLinecap="round" 
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function FinancialTile() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[600px] h-[600px] bg-[#1E293B] border border-slate-700 shadow-2xl rounded-xl overflow-hidden flex flex-col relative font-sans text-slate-100 select-none"
    >
      {/* 1. Background Layer */}
      <DataGridBackground />

      {/* 2. Header */}
      <header className="px-6 py-4 border-b border-slate-700/50 flex justify-between items-center bg-[#1E293B]/95 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <Landmark className="text-[#3B82F6]" size={28} />
          <h1 className="font-bold text-lg tracking-tight uppercase text-white">
            Wealth Expansion
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#001D3D] text-[#3B82F6] rounded-full border border-blue-500/20">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Security Verified
          </span>
        </div>
      </header>

      {/* 3. Main Body */}
      <main className="flex-1 p-6 flex flex-col gap-6 relative z-10">
        
        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ borderColor: '#475569' }}
            className="bg-slate-800/40 backdrop-blur-sm border-l-4 border-[#2ECC71] p-4 rounded-lg shadow-sm border border-slate-700/50 transition-colors"
          >
            <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider">Total Managed Assets</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-white">$4.2B</span>
              <span className="text-[#2ECC71] text-xs font-bold flex items-center gap-0.5">
                <TrendingUp size={14} /> 12.4%
              </span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ borderColor: '#475569' }}
            className="bg-slate-800/40 backdrop-blur-sm border-l-4 border-[#3B82F6] p-4 rounded-lg shadow-sm border border-slate-700/50 transition-colors"
          >
            <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-wider">Growth Velocity</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold text-white">High</span>
              <span className="text-[#94A3B8] text-xs font-medium tracking-tight">Stable Path</span>
            </div>
          </motion.div>
        </div>

        {/* Center Visualization Area */}
        <div className="flex-1 flex items-center justify-center relative">
          <ConnectionLines />
          
          <CentralHub />

          {/* Avatars */}
          <AvatarNode 
            imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCfK-kwLiZexubi4G-PD6ZxpGjwgNpDLy3bHp7BizfRQyI8tvFxxuRXHHzeFKuwZZZ4Y1iNBonHvKP6znln_YaZfwJrUgY1a1GiMxs8XzFlR8zZlmbddD7SwpSVcnbwfMY_JeEKKA_slXby-nMxGkaC4-b0yS_rl4CGQ2d3qctR5MHGQpbQf9Yn3SEZzr_Pkrj3VA14Gyi6KyE4ZMlxbAESeGt8azJPIeilw7DYN0tzPjtqLC9s7OckbildwCAuYZzgUxJxaSsodw"
            positionClass="top-4 left-12"
            delay={0.2}
          />
           <AvatarNode 
            imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBIBekzhz3uW69_VRHgJYZ6-YYCKsfbl18ruBxVQHLYP0xrLjihLqyawTDLxGKqec-6V9TYGHG20nZvu9SnXu7nBrm6K-siXov0pB7_8fZ2h4o_YG0SvL9q_Dug2vGKgL45uAaqsbCxXht7HRa4OhaezMITqLFE_XU1I8QvM8wwKC35XeRE0irSkEmd_DYi20vvWi0_Vf1EW8brwN_KzyHf5nZBW5uzqynSTkjRmPJD7lBFiV0Q4r400S1PsDGb5iRuFAKV8YWu3w"
            positionClass="top-4 right-12"
            delay={0.4}
          />
           <AvatarNode 
            imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCCACQ6dWJIXZVn0YtdTiZXZJADlDVLtbKHgwmXMhfq7typSwaNKjQNo55P2EJENIs4mATUV0QLAWyflMoKaQD5eD7iTI8wzUWvdFzGPW1HBbKJde2E-PpLb04pI6JhPQPZS8RKn_eTWOyW83WxrlCFFbjEILskpIScUANxqp5nkj82cg3em3lbZ_DJ4nNi8ZD1N0oXZ38_QmIOZAedRUd5Hx_G6-3s__qjDAaSZ7oS9jiwOA-NCvZ9Oat2-70ePpqbQIPN0oIuwg"
            positionClass="bottom-4 left-12"
            delay={0.6}
          />
           <AvatarNode 
            imgUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAzQ9CAtAbKAWGQSAXm8M9pEMalt2bnzw153AkHZXXT3jrzalBHcBX2VYGelBEkJGQ_ClrXbMBjaY59pVrxh78eR2X7XV2MX4UExnP-WRz2SPoKIBHlMlK6JMkjEIXpEuwf75tKzZ8-uAkFngpACzczuWPWNQUQWfRuXTyegvOvpuqBDmpZKXnc0WB3zFblWdtIJFfQEcwSlwS7S_jsYtg8S9uxTwk4OBzGnVdKbAY_RYeCDZPrXD0J7MqRL0sTe2zbAzhiLaLbFA"
            positionClass="bottom-4 right-12"
            delay={0.8}
          />
        </div>

        {/* Bottom Graph Container */}
        <div className="h-32 w-full mt-4 bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 overflow-hidden relative shadow-inner z-20">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Steady Revenue Growth</p>
              <p className="text-sm font-bold text-white">Last 12 Months Projection</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71]"></div>
                <span className="text-[10px] text-[#94A3B8] font-medium">SAFE ZONE</span>
              </div>
            </div>
          </div>
          <RevenueChart />
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="px-6 py-4 bg-[#001D3D] border-t border-slate-700/30 flex items-center justify-between text-slate-400 z-30">
        <div className="flex gap-6 text-[11px] font-medium tracking-wide uppercase">
          <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
            <Lock size={14} className="text-[#3B82F6]" />
            Vault Standard
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
            <Activity size={14} className="text-[#3B82F6]" />
            Live Expansion
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-2 h-2 rounded-full bg-[#2ECC71]" 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-bold text-[#2ECC71]">SYSTEM STABLE</span>
        </div>
      </footer>
    </motion.div>
  );
}