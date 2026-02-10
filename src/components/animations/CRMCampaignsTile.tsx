'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Database, TrendingUp, Cpu, Target, Package } from 'lucide-react';

// Interfaces for type safety
interface FlowPathProps {
  d: string;
  gradientId: string;
  delay?: number;
}

interface GlassCardProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
  color: string;
}

interface GlassCardRightProps {
  icon: React.ReactNode;
  label: string;
  sub: string;
  barColor: string;
  barWidth: string;
  labelColor: string;
  borderColor: string;
}

interface CornerMarkerProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  color: string;
}

export default function CRMCampaignsTile() {
  // Brand colors defined locally to ensure isolation
  const colors = {
    primary: '#0da6f2',
    purple: '#a855f7',
    bgDark: '#050b0d',
  };

  // Reusable flow path component for the SVG animations
  const FlowPath = ({ d, gradientId, delay = 0 }: FlowPathProps) => (
    <>
      {/* Background static path */}
      <path d={d} fill="none" stroke="rgba(13, 166, 242, 0.15)" strokeWidth="1.5" />
      {/* Animated flow path */}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeDasharray="10 10"
        initial={{ strokeDashoffset: 100 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
          delay: delay,
        }}
      />
    </>
  );

  return (
    <div 
      className="relative w-[600px] h-[600px] overflow-hidden rounded-xl group select-none"
      style={{ 
        backgroundColor: colors.bgDark,
        borderColor: 'rgba(13, 166, 242, 0.2)',
        borderWidth: '1px',
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(13, 166, 242, 0.05) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* --- SVG Layer --- */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
        <defs>
          <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="50%" stopColor={colors.primary} stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="50%" stopColor={colors.purple} stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Connection Lines */}
        <FlowPath d="M120 150 Q 220 150, 300 300" gradientId="grad1" delay={0} />
        <FlowPath d="M80 300 Q 200 300, 300 300" gradientId="grad1" delay={-1} />
        <FlowPath d="M120 450 Q 220 450, 300 300" gradientId="grad1" delay={-2.5} />
        
        {/* Outgoing Lines */}
        <FlowPath d="M300 300 Q 400 140, 500 140" gradientId="grad2" delay={-0.5} />
        <FlowPath d="M300 300 Q 400 460, 500 460" gradientId="grad2" delay={-2} />
      </svg>

      {/* --- Content Layer --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full relative p-12">
          
          {/* Top Left: CRM */}
          <div className="absolute left-10 top-24 z-30 pointer-events-auto">
            <GlassCard 
              icon={<Users size={18} />} 
              label="CRM" 
              sub="User Data" 
              color={colors.primary} 
            />
          </div>

          {/* Middle Left: Sales */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            <GlassCard 
              icon={<Database size={18} />} 
              label="Sales" 
              sub="Transactions" 
              color={colors.primary} 
            />
          </div>

          {/* Bottom Left: Behavior */}
          <div className="absolute left-10 bottom-24 z-30 pointer-events-auto">
            <GlassCard 
              icon={<TrendingUp size={18} />} 
              label="Behavior" 
              sub="Patterns" 
              color={colors.primary} 
            />
          </div>

          {/* Center: Hybrid Cloud Engine */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Ping Animations */}
              <div className="absolute -inset-10 rounded-full border border-[rgba(13,166,242,0.1)] animate-[ping_4s_infinite]" />
              <div className="absolute -inset-20 rounded-full border border-[rgba(13,166,242,0.05)] animate-[ping_6s_infinite] delay-700" />
              
              {/* Main Center Card */}
              <div 
                className="w-56 h-56 rounded-full flex flex-col items-center justify-center p-6 text-center border-2 relative overflow-hidden pointer-events-auto backdrop-blur-md"
                style={{
                  background: 'rgba(16, 28, 34, 0.7)',
                  borderColor: 'rgba(13, 166, 242, 0.4)',
                  boxShadow: '0 0 30px rgba(13, 166, 242, 0.2), 0 0 60px rgba(13, 166, 242, 0.1)'
                }}
              >
                <div className="absolute inset-0 bg-[rgba(13,166,242,0.05)] pointer-events-none" />
                
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_#0da6f2]"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Cpu className="text-white" size={24} />
                </div>
                
                <h3 className="text-[9px] uppercase tracking-[0.2em] font-black mb-1" style={{ color: colors.primary }}>
                  Hybrid Cloud Engine
                </h3>
                
                <div className="text-4xl font-black text-white leading-tight drop-shadow-sm">
                  +25%
                </div>
                
                <p className="text-[10px] text-white/70 max-w-[120px] leading-relaxed mt-1">
                  Supply Chain Efficiency Gained
                </p>
                
                {/* Dots */}
                <div className="mt-4 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(13,166,242,0.4)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(13,166,242,0.4)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Right: Campaigns */}
          <div className="absolute right-6 top-24 z-30 pointer-events-auto">
             <GlassCardRight
               icon={<Target size={18} className="text-purple-400" />}
               label="Campaigns"
               sub="Personalized Customer Outreach"
               barColor={colors.purple}
               barWidth="75%"
               labelColor="text-purple-400"
               borderColor="border-purple-500"
             />
          </div>

          {/* Bottom Right: Logistics */}
          <div className="absolute right-6 bottom-24 z-30 pointer-events-auto">
            <GlassCardRight
               icon={<Package size={18} className="text-[#0da6f2]" />}
               label="Logistics"
               sub="Predictive Inventory Optimization"
               barColor={colors.primary}
               barWidth="91%"
               labelColor="text-[#0da6f2]"
               borderColor="border-[#0da6f2]"
             />
          </div>

          {/* Decorator Text */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-[rgba(13,166,242,0.3)] uppercase tracking-[1em] font-bold">
            Technical Workflow Node v2.4
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-[rgba(13,166,242,0.3)] uppercase tracking-[0.5em] font-bold">
            Secure ML Pipeline Integration
          </div>
        </div>
      </div>

      {/* Corner Markers */}
      <CornerMarker top left color={colors.primary} />
      <CornerMarker top right color={colors.primary} />
      <CornerMarker bottom left color={colors.primary} />
      <CornerMarker bottom right color={colors.primary} />
    </div>
  );
}

// --- Sub-components for cleaner structure ---

function GlassCard({ icon, label, sub, color }: GlassCardProps) {
  return (
    <div 
      className="p-3 rounded-lg flex items-center gap-3 w-40 transform hover:scale-110 transition-transform duration-300 backdrop-blur-md border border-[rgba(13,166,242,0.2)]"
      style={{ background: 'rgba(16, 28, 34, 0.7)' }}
    >
      <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(13, 166, 242, 0.2)', color: color }}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] opacity-70 uppercase tracking-widest font-bold" style={{ color: color }}>{label}</span>
        <span className="text-xs font-medium text-white">{sub}</span>
      </div>
    </div>
  );
}

function GlassCardRight({ icon, label, sub, barColor, barWidth, labelColor, borderColor }: GlassCardRightProps) {
  return (
    <div 
      className={`p-4 rounded-lg w-48 border-l-4 transform hover:scale-105 transition-transform duration-300 backdrop-blur-md border-t border-r border-b border-[rgba(13,166,242,0.2)] ${borderColor}`}
      style={{ background: 'rgba(16, 28, 34, 0.7)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className={`text-[10px] font-bold uppercase tracking-wider ${labelColor}`}>{label}</span>
      </div>
      <p className="text-xs font-semibold text-white/90">{sub}</p>
      <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ backgroundColor: barColor, width: barWidth }}></div>
      </div>
    </div>
  );
}

function CornerMarker({ top, bottom, left, right, color }: CornerMarkerProps) {
  const classes = [
    "absolute w-4 h-4",
    top ? "top-4 border-t-2" : "",
    bottom ? "bottom-4 border-b-2" : "",
    left ? "left-4 border-l-2" : "",
    right ? "right-4 border-r-2" : "",
  ].join(" ");

  return <div className={classes} style={{ borderColor: 'rgba(13, 166, 242, 0.3)' }}></div>;
}
