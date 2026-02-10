'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Users, Radar, MessageSquare, BookOpen } from 'lucide-react';

export default function GTMAudienceTile() {
  // GTM Stack Pro Color Palette
  // Matches the provided screenshot: Deep Navy background, Cyan primary, Orange secondary.
  const colors = {
    cyan: '#22d3ee',    // "GTM" Logo Blue / "Get Started" button
    orange: '#f97316',  // "View Services" button
    blue: '#3b82f6',    // Tech accent
    slate: '#94a3b8',   // Muted text
    navydark: '#020617' // Background void
  };

  // Shared glassmorphism style
  const glassClass = "bg-[#0f172a]/40 backdrop-blur-md border border-cyan-500/10 shadow-lg";

  return (
    <div className="relative w-[600px] h-[600px] rounded-[2rem] border border-cyan-500/10 shadow-2xl overflow-hidden font-sans select-none bg-[#020617]">
      {/* Background Gradient - Deep Navy Void */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, #1e293b 0%, ${colors.navydark} 100%)`
        }}
      />

      {/* Ambient Background Blobs - Updated to Cyan/Blue */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ backgroundColor: colors.blue }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ backgroundColor: colors.cyan }}></div>
      </div>

      {/* SVG Orbit Lines - Tinted Cyan for Tech feel */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 600">
        <g fill="none" stroke={colors.cyan} strokeOpacity="0.1" strokeWidth="1.5">
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 150 150" />
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 120 420" />
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 480 200" />
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 450 450" />
        </g>
        <circle cx="300" cy="300" fill="none" r="120" stroke={colors.cyan} strokeOpacity="0.05" />
        <circle cx="300" cy="300" fill="none" r="220" stroke={colors.cyan} strokeOpacity="0.05" />
      </svg>

      {/* Center Content: Core Product (Cyan Glow) */}
      <div className="absolute inset-0 p-12 flex flex-col items-center justify-center z-20">
        <div className="relative group cursor-pointer" onClick={() => console.log('Core Product clicked')}>
          {/* Pulsing Core Glow */}
          <div className="absolute inset-0 rounded-full scale-150 blur-2xl transition-all duration-700 group-hover:bg-opacity-40" style={{ backgroundColor: `${colors.cyan}20` }}></div>
          
          <div className={`w-48 h-48 rounded-full ${glassClass} flex flex-col items-center justify-center text-center p-6 border-2 relative z-10`} style={{ borderColor: `${colors.cyan}80`, boxShadow: `0 0 50px ${colors.cyan}20` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.cyan}, ${colors.blue})` }}>
              <Gem className="text-white w-6 h-6" />
            </div>
            <h2 className="font-[Poppins] font-bold text-xs uppercase tracking-widest mb-1" style={{ color: colors.cyan }}>Core Product</h2>
            <div className="font-[Poppins] text-2xl font-extrabold text-white leading-tight">VALUE</div>
            <div className="w-8 h-1 mt-3 rounded-full" style={{ backgroundColor: colors.cyan }}></div>
          </div>
        </div>
      </div>

      {/* Floating Card: Audience (Top Left) - Orange Accent */}
      <motion.div 
        className="absolute top-16 left-16 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      >
        <div 
          onClick={() => console.log('Audience card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-44 border-l-4 flex flex-col gap-2 cursor-pointer hover:bg-white/5 transition-colors`} 
          style={{ borderLeftColor: colors.orange }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-500/10">
              <Users className="w-5 h-5" style={{ color: colors.orange }} />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.orange }}>Audience</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Segment Growth</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed italic font-[Inter]">"Identify key demographics & psychographics"</p>
        </div>
      </motion.div>

      {/* Floating Card: Landscape (Bottom Left) - Cyan/Blue Accent */}
      <motion.div 
        className="absolute bottom-20 left-10 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div 
          onClick={() => console.log('Landscape card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-40 border-l-4 flex flex-col gap-2 cursor-pointer hover:bg-white/5 transition-colors`} 
          style={{ borderLeftColor: colors.blue }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10">
              <Radar className="w-5 h-5" style={{ color: colors.blue }} />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.blue }}>Landscape</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Market Intel</h4>
          <div className="flex gap-1 mt-1">
            <div className="w-full h-1 rounded-full overflow-hidden bg-blue-900/50">
              <div className="h-full w-2/3" style={{ backgroundColor: colors.blue }}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Card: Messaging (Top Right) - Cyan Accent */}
      <motion.div 
        className="absolute top-24 right-12 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div 
          onClick={() => console.log('Messaging card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-48 border-l-4 flex flex-col gap-2 cursor-pointer hover:bg-white/5 transition-colors`} 
          style={{ borderLeftColor: colors.cyan }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10">
              <MessageSquare className="w-5 h-5" style={{ color: colors.cyan }} />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.cyan }}>Messaging</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Value Prop Sync</h4>
          <p className="text-[10px] text-slate-400 font-[Inter]">Strategic alignment of messaging across all touchpoints.</p>
        </div>
      </motion.div>

      {/* Floating Card: Narrative (Bottom Right) - White/Blue Accent */}
      <motion.div 
        className="absolute bottom-16 right-16 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
      >
        <div 
          onClick={() => console.log('Narrative card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-44 border-l-4 flex flex-col gap-2 border-white/20 cursor-pointer hover:bg-white/5 transition-colors`}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-white/90" />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold text-slate-300 uppercase tracking-wider">Narrative</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Brand Story</h4>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold font-[Inter]" style={{ color: colors.orange }}>Market Potential: High</span>
          </div>
        </div>
      </motion.div>

      {/* Header Text */}
      <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none">
        <span className="font-[Poppins] text-[10px] text-cyan-200/50 uppercase tracking-[0.6em] font-medium">Strategic Go-to-Market Framework</span>
      </div>

      {/* Footer Legend */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 opacity-60 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.cyan }}></span>
          <span className="text-[9px] uppercase tracking-widest font-bold font-[Inter] text-slate-300">Research</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.orange }}></span>
          <span className="text-[9px] uppercase tracking-widest font-bold font-[Inter] text-slate-300">Activation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.blue }}></span>
          <span className="text-[9px] uppercase tracking-widest font-bold font-[Inter] text-slate-300">Retention</span>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-cyan-500/30 rounded-tl-xl z-20 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-cyan-500/30 rounded-br-xl z-20 pointer-events-none"></div>
    </div>
  );
}