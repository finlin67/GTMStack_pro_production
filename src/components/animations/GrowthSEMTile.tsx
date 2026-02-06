'use client';


import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  Banknote, 
  ChevronsRight, 
  Coins, 
  MousePointer2 
} from 'lucide-react';

const RoasCounter = ({ value }: { value: MotionValue<number> }) => {
  const rounded = useTransform(value, (latest) => latest.toFixed(1) + "x");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Subscribe to updates to avoid re-rendering the component on every frame
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest;
      }
    });
    return unsubscribe;
  }, [rounded]);

  return <span ref={ref} className="text-[#0ddff2] text-4xl font-black">0.0x</span>;
};

export default function GrowthSEMTile() {
  const [mounted, setMounted] = useState(false);
  
  // Unified motion value for the ROAS metric
  const roasValue = useMotionValue(0);
  
  // Map the ROAS value (0 to 6.0 scale) to the circle's path length (0 to 1)
  // 4.8 / 6.0 = 0.8 (80% fill)
  const pathLength = useTransform(roasValue, [0, 6], [0, 1]);

  useEffect(() => {
    setMounted(true);
    
    // Animate the value from 0 to 4.8
    const controls = animate(roasValue, 4.8, { 
      duration: 3.5, 
      ease: [0.22, 1, 0.36, 1], // Custom "out-quart" style easing for a smooth finish
      delay: 0.5 
    });
    
    return controls.stop;
  }, []);

  return (
    <div className="relative w-full max-w-[600px] aspect-square bg-[#0c1a1b] rounded-2xl border border-[#224649] overflow-hidden flex items-center justify-center shadow-2xl">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #224649 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Concentric Circles Background Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full w-[450px] h-[450px] border border-[#0ddff2]/10"
        />
        <motion.div 
          animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute rounded-full w-[300px] h-[300px] border border-[#0ddff2]/10"
        />
        <motion.div 
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full w-[150px] h-[150px] border border-[#0ddff2]/10"
        />
      </div>

      {/* Central Target & Dial */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative size-48 rounded-full flex items-center justify-center bg-[#102122]/80 backdrop-blur-md shadow-[0_0_20px_rgba(13,223,242,0.2)]">
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Track */}
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="#0ddff2" 
              strokeWidth="4"
              strokeOpacity="0.1"
            />
            {/* Dynamic Progress Indicator */}
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="#0ddff2"
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-[0_0_4px_rgba(13,223,242,0.5)]"
              style={{ pathLength }}
            />
          </svg>
          
          <div className="flex flex-col items-center z-10">
            <RoasCounter value={roasValue} />
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">ROAS</span>
          </div>
        </div>

        {/* Target Precision Badge */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-4 px-4 py-2 bg-[#0ddff2]/10 border border-[#0ddff2]/30 rounded-lg backdrop-blur-sm"
        >
          <p className="text-[#0ddff2] text-sm font-bold flex items-center gap-2">
            <Target className="w-4 h-4" />
            Target Precision: 98.4%
          </p>
        </motion.div>
      </div>

      {/* Floating Stat Badge: Revenue Lift */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 p-4 rounded-xl bg-[#102122]/80 border border-white/10 backdrop-blur-md shadow-lg z-20"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">+285%</p>
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Revenue Lift</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Stat Badge: Optimized CPC */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-10 p-4 rounded-xl bg-[#102122]/80 border border-white/10 backdrop-blur-md shadow-lg z-20"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#0ddff2]/20 text-[#0ddff2]">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">$0.42</p>
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Optimized CPC</p>
          </div>
        </div>
      </motion.div>

      {/* Audience Segments Lines (Right Side) */}
      <div className="absolute top-1/4 right-8 flex flex-col items-end gap-4 pointer-events-none">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-2 text-white/40 text-xs"
        >
          <span className="w-12 h-[1px] bg-white/20"></span>
          Intent Mapping
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-2 text-white/40 text-xs"
        >
          <span className="w-16 h-[1px] bg-white/20"></span>
          Demographics
        </motion.div>
      </div>

      {/* Bid Stream Flow (Left Side) */}
      <div className="absolute bottom-1/4 left-12 flex flex-col gap-4 z-0">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5], x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-3"
        >
          <ChevronsRight className="text-[#0ddff2] w-5 h-5" />
          <span className="text-[10px] font-bold text-[#0ddff2]/70 uppercase">Bid Stream</span>
        </motion.div>
        <div className="h-24 w-px bg-gradient-to-t from-[#0ddff2]/0 via-[#0ddff2]/40 to-[#0ddff2]/0 ml-2"></div>
      </div>

      {/* Funnel/Coin Visualization (Bottom Center) */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-[2px]"></div>
          <Coins className="text-amber-400 w-8 h-8 mt-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        </div>
      </motion.div>

      {/* Interactive Cursor Simulation */}
      <motion.div
        className="absolute pointer-events-none text-white drop-shadow-md z-50"
        animate={{
          x: [100, 300, 250, 450],
          y: [100, 200, 400, 300],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MousePointer2 className="w-6 h-6 fill-white text-black" />
      </motion.div>
    </div>
  );
}