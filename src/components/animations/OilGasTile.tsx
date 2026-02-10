'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Factory, Waypoints, Truck } from 'lucide-react';

export default function OilGasTile() {
  // Animation variants for floating elements (simulating organic movement)
  const floaty = (delay = 0) => ({
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
        delay: delay,
      },
    },
  });

  const pulse = {
    animate: {
      scale: [1, 1.02, 1],
      boxShadow: [
        "0 30px 60px rgba(0,40,85,0.15)",
        "0 35px 70px rgba(0,40,85,0.25)",
        "0 30px 60px rgba(0,40,85,0.15)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[520px] max-w-[650px] aspect-square p-4">
      {/* Main Container */}
      <div className="relative w-full h-full bg-white rounded-[2rem] border border-[#8D99AE]/20 shadow-[0_20px_50px_rgba(0,40,85,0.05)] overflow-hidden flex items-center justify-center">
        
        {/* Grid Background Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #8D99AE 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />

        {/* Inner Content Wrapper - Fixed size for consistent layout */}
        <div className="relative w-[520px] h-[520px] select-none">
          
          {/* Background Decorative SVG (Waves) */}
          <div className="absolute inset-0 flex items-center opacity-20 pointer-events-none">
            <svg fill="none" height="200" viewBox="0 0 520 200" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="hero-gradient" x1="260" x2="260" y1="20" y2="200">
                  <stop stopColor="#004B87" stopOpacity="0.3"></stop>
                  <stop offset="1" stopColor="#004B87" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M0 160C50 160 80 40 130 40C180 40 220 120 280 120C340 120 380 20 450 20C520 20 520 100 520 100V200H0V160Z" 
                fill="url(#hero-gradient)"
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0 160C50 160 80 40 130 40C180 40 220 120 280 120C340 120 380 20 450 20C520 20" 
                stroke="#004B87" 
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Connection Lines Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 520 520">
            {/* Top Left Line */}
            <motion.path 
              d="M90 90 L260 260" 
              stroke="#002855" 
              strokeWidth="2" 
              strokeDasharray="8 4" 
              className="opacity-20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            {/* Top Right Line */}
            <motion.path 
              d="M430 90 L260 260" 
              stroke="#004B87" 
              strokeWidth="2" 
              strokeDasharray="8 4" 
              className="opacity-20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            {/* Bottom Left Line */}
            <motion.path 
              d="M90 430 L260 260" 
              stroke="#8D99AE" 
              strokeWidth="2" 
              strokeDasharray="8 4" 
              className="opacity-20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            {/* Bottom Right Line */}
            <motion.path 
              d="M430 430 L260 260" 
              stroke="#002855" 
              strokeWidth="2" 
              strokeDasharray="8 4" 
              className="opacity-20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </svg>

          {/* Central Hub - Reduced size (w-56) to prevent overlap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div 
              variants={pulse}
              animate="animate"
              className="bg-white border-[8px] border-[#002855] w-56 h-56 rounded-full flex flex-col items-center justify-center text-center relative z-20"
            >
              <Sparkles className="text-[#002855] w-12 h-12 mb-2" strokeWidth={1.5} />
              <motion.p 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-[#002855] text-5xl font-black tracking-tight"
              >
                +31%
              </motion.p>
              <p className="text-[#8D99AE] text-sm font-bold uppercase tracking-widest mt-1">Efficiency Delta</p>
            </motion.div>
          </div>

          {/* Node: Upstream (Top Left) */}
          <motion.div 
            variants={floaty(0)}
            animate="animate"
            className="absolute top-[35px] left-[35px] bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#8D99AE]/30 flex flex-col items-center shadow-lg w-28 h-28 justify-center z-10"
          >
            <Factory className="text-[#002855] w-8 h-8 mb-2" strokeWidth={1.5} />
            <span className="text-[10px] text-[#002855] font-bold tracking-wider">UPSTREAM</span>
          </motion.div>

          {/* Node: Midstream (Top Right) */}
          <motion.div 
            variants={floaty(1.2)}
            animate="animate"
            className="absolute top-[35px] right-[35px] bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#8D99AE]/30 flex flex-col items-center shadow-lg w-28 h-28 justify-center z-10"
          >
            <Waypoints className="text-[#004B87] w-8 h-8 mb-2" strokeWidth={1.5} />
            <span className="text-[10px] text-[#002855] font-bold tracking-wider">MIDSTREAM</span>
          </motion.div>

          {/* Node: Downstream (Bottom Left) */}
          <motion.div 
            variants={floaty(2.4)}
            animate="animate"
            className="absolute bottom-[35px] left-[35px] bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#8D99AE]/30 flex flex-col items-center shadow-lg w-28 h-28 justify-center z-10"
          >
            <Truck className="text-[#8D99AE] w-8 h-8 mb-2" strokeWidth={1.5} />
            <span className="text-[10px] text-[#002855] font-bold tracking-wider">DOWNSTREAM</span>
          </motion.div>

          {/* Stats Card: Cost Alpha - Moved further right (-right-64px) and adjusted top for spacing */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
            transition={{ 
              opacity: { delay: 0.5, duration: 0.5 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="absolute top-[165px] -right-[64px] bg-white/95 backdrop-blur-md p-5 rounded-xl border-l-4 border-emerald-500 shadow-xl min-w-[160px] z-30"
          >
            <p className="text-[#8D99AE] text-xs font-semibold uppercase tracking-wider">Cost Alpha</p>
            <p className="text-emerald-600 text-3xl font-black my-1">24%</p>
            <p className="text-[10px] text-[#8D99AE] font-medium">YTD SAVINGS</p>
          </motion.div>

          {/* Stats Card: Net Yield - Moved further right (-right-64px) and adjusted bottom for spacing */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
             transition={{ 
               opacity: { delay: 0.8, duration: 0.5 },
               y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }
             }}
            className="absolute bottom-[90px] -right-[64px] bg-white/95 backdrop-blur-md p-5 rounded-xl border-l-4 border-[#004B87] shadow-xl min-w-[160px] z-30"
          >
            <p className="text-[#8D99AE] text-xs font-semibold uppercase tracking-wider">Net Yield</p>
            <p className="text-[#004B87] text-3xl font-black my-1">+19%</p>
            <p className="text-[10px] text-[#8D99AE] font-medium">ABOVE FORECAST</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}