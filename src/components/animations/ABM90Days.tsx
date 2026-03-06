'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Factory,
  Verified,
  Settings,
  Building2,
  Workflow,
  Award,
  Target,
  TrendingUp,
  FileBarChart,
  ArrowRight,
  Check
} from 'lucide-react';

export default function ABM90Days() {
  // Animation variants for floating elements (simulating the 'organic' feel)
  const floatVariant = (delay: number): Variants => ({
    animate: {
      y: [0, -10, 0],
      rotate: [0, 1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    <div className="relative w-[600px] h-[600px] bg-[#020617] rounded-xl overflow-hidden flex flex-col justify-between border border-blue-500/20 shadow-2xl font-sans text-slate-100 selection:bg-emerald-500/30">
      
      {/* --- Background Effects --- */}
      {/* Grid Pattern (Blue Tint) */}
      <div 
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.08) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      {/* Radial Glow (Deep Blue/Slate) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#172554_0%,_#020617_90%)] pointer-events-none" />

      {/* --- Header Section --- */}
      <div className="relative w-full px-8 pt-8 flex justify-between items-start z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-blue-400">
            <Factory size={14} strokeWidth={2.5} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Discrete Manufacturing</span>
          </div>
          <h3 className="text-white text-lg font-bold">Enterprise Deal Progression</h3>
        </div>
        
        {/* Closed Won Badge (Updated for Readability: White Text on Dark Emerald) */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_4px_15px_rgba(5,150,105,0.4)] border border-emerald-500/20"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
        >
          <Verified size={14} className="text-white fill-white/10" strokeWidth={3} />
          <span className="text-white text-[10px] font-extrabold uppercase tracking-wider">Closed-Won Success</span>
        </motion.div>
      </div>

      {/* --- Center Visuals (Floating Elements) --- */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            
            {/* Avatar 1: Buying Committee */}
            <motion.div 
              variants={floatVariant(0)}
              initial="initial"
              animate="animate"
              className="absolute top-[20%] left-[20%]"
            >
              <div className="size-12 rounded-full border-2 border-blue-500/30 p-0.5 bg-[#0f172a] overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1wgq0srUJ72Ewc4kqi9W0RRsDzUFhJ444jGib-JF0LPp3olGKQyHwEKaVl2QHMAuVWsoau_W07LMUEJI_UmFtkZ30Hxg6ock1LUbQZ4S471CUBbByPS4kcub-F_XpGmDkfzmOpV9CCzBFZ7eOa9M6JBdxdztEIfCXNwZQszAtLFEQa0y9wZYga4wXqGVhEKBuMpRErDKeGHZru696F-67Wpb79EIUcOeGTBC4nuhCdHx0_urSpQ6th1fa8uD987sp-3dI9j19Hqs" 
                  alt="Buying Committee Member Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 size-4 rounded-full flex items-center justify-center shadow-lg">
                <Check size={10} className="text-white stroke-[4]" />
              </div>
            </motion.div>

            {/* Avatar 2: Technical Stakeholder */}
            <motion.div 
              variants={floatVariant(1.2)}
              initial="initial"
              animate="animate"
              className="absolute top-[15%] right-[25%]"
            >
              <div className="size-10 rounded-full border-2 border-violet-500/30 p-0.5 bg-[#0f172a] overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9M1oLpEnjvqEqeS_QqwzRejTXqHPmAZ6oQ62aIeAv9fPC70YLxgf9yq9fL7IAvcpStEEF-57oTIz2n_PtD05ET0E68AWpvmi8otx9UMZh44Ds_pMPGQ25QAYnJ9At0mUPY42BpWN27dAcvVOzykXpoY3cZaTG09ROlD3ZmeQQ9dFlmyJi6waV_58HiYPS-Bf0f4HsDQkcbFvEJw21PgpX4p4emByvn6XXT17xAAYV6bXAeMedcgzFEXoHALva4aHm6tHr926vuyI" 
                  alt="Technical Stakeholder Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>

             {/* Avatar 3: C-Level */}
            <motion.div 
              variants={floatVariant(0.5)}
              initial="initial"
              animate="animate"
              className="absolute bottom-[30%] left-[10%]"
            >
               <div className="size-14 rounded-full border-2 border-blue-400/30 p-0.5 bg-[#0f172a] overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOSHjgS4p2zMc3aq27SFo65x_mG4zsW2HeDnTA4gHsD6uTB2H8aCn3KS_xcoVd9UROxSrwE3l2yPaQmfpQzFurlYTa4jmrb5Dnz6Qqxm0jHvZMCtofi-mKbx1Ou39RhuLxlZsiHqC-lpU8GcXwdQNeheoTKKuWPbASi0tMPznNkPXyCSSmRABD0lF7yvvPslxZUXlbWQHnkyyYTi7Z-5Be2Vb5JCCdLH2HnOXuyWzE1u2M_5R-6HTe_X0I-NNQTtm-z-2UoVKEs0o" 
                  alt="C-Level Executive Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>

            {/* Background Icons (Gradient Text: Blue -> Purple) */}
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[40%] left-[15%]">
              <Settings className="w-10 h-10 text-transparent stroke-[1.5]" style={{ stroke: 'url(#gradient-icon)', fill: 'none' }} />
            </motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[25%] right-[15%]">
              <Building2 className="w-12 h-12 text-transparent stroke-[1.5]" style={{ stroke: 'url(#gradient-icon)', fill: 'none' }} />
            </motion.div>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[20%] right-[20%]">
              <Workflow className="w-10 h-10 text-transparent stroke-[1.5]" style={{ stroke: 'url(#gradient-icon)', fill: 'none' }} />
            </motion.div>

            {/* Hidden SVG definition for gradient strokes (Blue -> Violet) */}
            <svg width="0" height="0">
              <linearGradient id="gradient-icon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor="#60A5FA" offset="0%" /> {/* Blue 400 */}
                <stop stopColor="#A78BFA" offset="100%" /> {/* Violet 400 */}
              </linearGradient>
            </svg>
          </div>
        </div>

        {/* --- Main Data Card --- */}
        <div className="relative flex flex-col items-center text-center px-4 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#1e1b4b]/20 backdrop-blur-xl rounded-2xl p-10 border border-blue-500/20 transition-transform duration-500"
            style={{ boxShadow: '0 0 50px rgba(59, 130, 246, 0.15)' }}
          >
            {/* Orange used for Award icon */}
            <Award className="w-12 h-12 mx-auto mb-2 text-orange-400" style={{ filter: 'drop-shadow(0 0 10px rgba(251, 146, 60, 0.4))' }} />
            
            {/* Animated Text Gradient: Green for Performance/Revenue */}
            <motion.h1 
              className="text-[90px] leading-[0.85] font-extrabold tracking-tighter drop-shadow-2xl text-transparent bg-clip-text"
              style={{
                // Emerald-300 -> Emerald-500 -> Teal-600 -> Emerald-500 -> Emerald-300 (seamless loop)
                backgroundImage: "linear-gradient(to right, #6ee7b7, #10b981, #059669, #10b981, #6ee7b7)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
              }}
              animate={{
                backgroundPosition: "200% center",
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              $1.2M
            </motion.h1>
            <p className="text-blue-200 text-2xl font-bold tracking-tight mt-3">Pipeline in 90 Days</p>
          </motion.div>

          <div className="flex gap-8 mt-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Target size={18} />
                <span className="text-xl font-bold">100%</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Account Penetration</span>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <TrendingUp size={18} />
                <span className="text-xl font-bold">6/6</span>
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Engagement Met</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Section --- */}
      <div className="relative w-full px-8 pb-8 z-10 flex flex-col gap-6">
        
        {/* Progress Bar with Wave Animation (Blue -> Green -> Blue) */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-slate-400 text-xs font-medium">Pipeline Journey Complete</span>
            <span className="text-emerald-400 text-sm font-bold tracking-wider">STAGE 5: CLOSED-WON</span>
          </div>
          <div className="h-4 w-full bg-[#0f172a] rounded-full border border-white/5 p-1 overflow-hidden shadow-inner">
            <motion.div 
              className="h-full rounded-full flex items-center justify-end pr-2 relative"
              style={{
                // Blue -> Emerald -> Lighter Emerald -> Emerald -> Blue (seamless loop)
                backgroundImage: "linear-gradient(90deg, #3b82f6 0%, #10b981 25%, #34d399 50%, #10b981 75%, #3b82f6 100%)",
                backgroundSize: "200% 100%"
              }}
              initial={{ width: "0%" }}
              animate={{ 
                width: "100%",
                backgroundPosition: ["0% 50%", "-200% 50%"]
              }}
              transition={{ 
                width: { duration: 1.5, ease: "circOut", delay: 0.2 },
                backgroundPosition: { duration: 6, ease: "linear", repeat: Infinity }
              }}
            >
              <div className="size-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
            </motion.div>
          </div>
        </div>

        {/* Analytics Button Card (Violet Theme) */}
        <div className="flex items-center justify-between bg-violet-950/20 backdrop-blur-md p-3.5 rounded-lg border border-violet-500/20">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
              <FileBarChart className="text-violet-400" size={20} />
            </div>
            <div>
              <p className="text-white text-[11px] font-bold">Campaign Impact Report</p>
              <p className="text-violet-300/60 text-[9px] uppercase tracking-wider">Generated 2 mins ago</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-bold px-5 py-2.5 rounded shadow-lg transition-all transform active:scale-95 group border border-blue-400/20">
            <span>View Analytics</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* --- Decoration Lines (Blue gradients) --- */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent pointer-events-none" />

    </div>
  );
}