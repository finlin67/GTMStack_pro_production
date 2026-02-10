import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Database,
  ClipboardList,
  FolderSearch,
  BadgeCheck,
  LineChart,
  ShieldCheck,
} from "lucide-react";

// Color definitions matched to the original HTML design
const COLORS = {
  primary: "#1e56f1", // Blue
  dark: "#101522", // Background Dark
  cyan: "#06b6d4", // Accent Cyan
  purple: "#8b5cf6", // Accent Purple
  grid: "#232d48", // Grid Dot Color
};

export default function PubSecTile() {
  return (
    <div className="relative w-[600px] h-[600px] shrink-0 bg-[#101522] rounded-3xl border border-[#1e56f1]/20 overflow-hidden shadow-2xl font-sans select-none">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${COLORS.grid} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* SVG Connections Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 600 600"
      >
        <defs>
          <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0" />
            <stop offset="50%" stopColor={COLORS.primary} stopOpacity="1" />
            <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- Left to Center Connections --- */}
        {/* Top Left Path */}
        <path
          className="stroke-[#324067]"
          strokeWidth="2"
          fill="none"
          d="M140 180 Q 220 180, 300 300"
          opacity="0.4"
        />
        {/* Middle Left Path (Active) */}
        <motion.path
          d="M140 300 Q 220 300, 300 300"
          stroke={COLORS.primary}
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 8"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -100 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Bottom Left Path */}
        <path
          className="stroke-[#324067]"
          strokeWidth="2"
          fill="none"
          d="M140 420 Q 220 420, 300 300"
          opacity="0.4"
        />

        {/* --- Center to Right Connections --- */}
        {/* Top Right Path (Active) */}
        <motion.path
          d="M300 300 Q 380 180, 460 180"
          stroke={COLORS.primary}
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 8"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -100 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle Right Path */}
        <path
          className="stroke-[#324067]"
          strokeWidth="2"
          fill="none"
          d="M300 300 Q 380 300, 460 300"
          opacity="0.4"
        />
        {/* Bottom Right Path (Active) */}
        <motion.path
          d="M300 300 Q 380 420, 460 420"
          stroke={COLORS.primary}
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 8"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -100 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Central Engine Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-32 h-32 rounded-full bg-[#101522] border-4 border-[#1e56f1] flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(30,86,241,0.4)] relative">
          <div className="absolute inset-0 rounded-full border border-[#06b6d4]/50 animate-ping opacity-20"></div>
          <Cpu className="w-10 h-10 text-[#1e56f1] mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1e56f1]/80">
            Hybrid Cloud
          </span>
          <span className="text-sm font-bold text-white">AI CORE</span>
        </div>
      </div>

      {/* Input Cards (Left) */}
      <div className="absolute left-8 top-[140px] w-44 space-y-24 z-20">
        {/* Input 01 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#101522]/80 backdrop-blur-md border border-[#1e56f1]/20 p-3 rounded-lg flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded bg-[#1e56f1]/20 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4 text-[#1e56f1]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#1e56f1] font-bold uppercase">
              Input 01
            </span>
            <span className="text-xs font-semibold text-white">
              Constituent Data
            </span>
          </div>
        </motion.div>

        {/* Input 02 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#101522]/80 backdrop-blur-md border border-[#1e56f1]/40 p-3 rounded-lg flex items-center gap-3 shadow-lg shadow-[#1e56f1]/10"
        >
          <div className="w-8 h-8 rounded bg-[#1e56f1] flex items-center justify-center shrink-0">
            <ClipboardList className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white font-bold uppercase">
              Input 02
            </span>
            <span className="text-xs font-semibold text-white">
              Service Requests
            </span>
          </div>
        </motion.div>

        {/* Input 03 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#101522]/80 backdrop-blur-md border border-[#1e56f1]/20 p-3 rounded-lg flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded bg-[#1e56f1]/20 flex items-center justify-center shrink-0">
            <FolderSearch className="w-4 h-4 text-[#1e56f1]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#1e56f1] font-bold uppercase">
              Input 03
            </span>
            <span className="text-xs font-semibold text-white">
              Public Records
            </span>
          </div>
        </motion.div>
      </div>

      {/* Output Cards (Right) */}
      <div className="absolute right-8 top-[140px] w-44 space-y-24 z-20">
        {/* Output A */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#1e56f1]/10 backdrop-blur-md border border-[#06b6d4]/40 p-3 rounded-lg flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded bg-[#06b6d4] flex items-center justify-center shrink-0">
            <BadgeCheck className="w-4 h-4 text-[#101522]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#06b6d4] font-bold uppercase">
              Output A
            </span>
            <span className="text-xs font-semibold text-white">Permitting</span>
          </div>
        </motion.div>

        {/* Output B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-[#101522]/80 backdrop-blur-md border border-[#1e56f1]/20 p-3 rounded-lg flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded bg-[#1e56f1]/20 flex items-center justify-center shrink-0">
            <LineChart className="w-4 h-4 text-[#1e56f1]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#1e56f1] font-bold uppercase">
              Output B
            </span>
            <span className="text-xs font-semibold text-white">
              Allocations
            </span>
          </div>
        </motion.div>

        {/* Output C */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-[#1e56f1]/10 backdrop-blur-md border border-[#8b5cf6]/40 p-3 rounded-lg flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded bg-[#8b5cf6] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#8b5cf6] font-bold uppercase">
              Output C
            </span>
            <span className="text-xs font-semibold text-white">Compliance</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Metrics Cards */}
      {/* Top Right Metric */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="absolute top-12 right-12 z-30"
      >
        <div className="bg-[#101522]/90 border-l-4 border-l-[#06b6d4] p-4 rounded-lg shadow-2xl backdrop-blur-md">
          <div className="text-white text-3xl font-black">+26%</div>
          <div className="text-[10px] text-white/60 font-medium uppercase tracking-widest">
            Service Delivery
          </div>
        </div>
      </motion.div>

      {/* Bottom Left Metric */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7, type: "spring" }}
        className="absolute bottom-12 left-12 z-30"
      >
        <div className="bg-[#101522]/90 border-l-4 border-l-[#1e56f1] p-4 rounded-lg shadow-2xl backdrop-blur-md">
          <div className="text-white text-3xl font-black">2.9x</div>
          <div className="text-[10px] text-white/60 font-medium uppercase tracking-widest">
            Policy Insights
          </div>
        </div>
      </motion.div>

      {/* HUD Elements */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-30">
        <div className="h-1 w-8 bg-[#1e56f1] rounded-full"></div>
        <div className="h-1 w-2 bg-[#1e56f1]/30 rounded-full"></div>
        <div className="h-1 w-2 bg-[#1e56f1]/30 rounded-full"></div>
      </div>
      <div className="absolute top-4 left-4 z-30">
        <span className="text-[10px] font-mono text-[#1e56f1] opacity-50">
          GS-MODEL-v4.2.1-SECURED
        </span>
      </div>
    </div>
  );
}
