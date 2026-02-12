'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundGrid from './BackgroundGrid';
import { AnimationPhase, ModuleData } from '../types';
import { Database, Layers, BarChart3, Globe, Zap, Target, Share2 } from 'lucide-react';

const CONTAINER_SIZE = 600;
const MODULE_WIDTH_STACK = 320;
const MODULE_HEIGHT_STACK = 50;
const MODULE_SIZE_CHAOS = 40;

// Predefined chaos positions to ensure they look "random" but aesthetically pleasing (scattered but contained)
const CHAOS_POSITIONS = [
  { x: 120, y: 150, r: 15 },
  { x: 450, y: 120, r: -10 },
  { x: 80, y: 350, r: 45 },
  { x: 500, y: 400, r: -20 },
  { x: 200, y: 500, r: 10 },
  { x: 350, y: 80, r: -5 },
  { x: 480, y: 250, r: 30 },
];

// Vibrant Gradient Palette: Blue, Purple, Green, Orange, Cyan, Red, Indigo
const COLORS = [
  'bg-gradient-to-br from-blue-500 to-blue-700',       // Data Layer
  'bg-gradient-to-br from-violet-500 to-violet-700',   // Global Network
  'bg-gradient-to-br from-emerald-500 to-emerald-700', // Integration
  'bg-gradient-to-br from-amber-500 to-orange-600',    // Automation
  'bg-gradient-to-br from-cyan-500 to-cyan-700',       // Stack Orchestration
  'bg-gradient-to-br from-rose-500 to-rose-700',       // Audience Targeting
  'bg-gradient-to-br from-purple-500 to-indigo-700',   // Analytics
];

const ICONS = [Database, Globe, Share2, Zap, Layers, Target, BarChart3];
const LABELS = ['Data Layer', 'Global Network', 'Integration', 'Automation', 'Stack Orchestration', 'Audience Targeting', 'Analytics'];

// Vibrant Cyan Accent
const ACCENT_COLOR = '#22d3ee'; // cyan-400
const TEXT_ACCENT_COLOR = '#22d3ee'; 

export default function GTMStackHero() {
  const [phase, setPhase] = useState<AnimationPhase>(AnimationPhase.CHAOS);

  // Generate module data
  const modules: ModuleData[] = useMemo(() => {
    return CHAOS_POSITIONS.map((pos, index) => ({
      id: `module-${index}`,
      label: LABELS[index],
      chaosX: pos.x,
      chaosY: pos.y,
      chaosRotation: pos.r,
      stackOrder: index,
      color: COLORS[index],
    }));
  }, []);

  // Animation Cycle
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const runCycle = () => {
      // 1. Start at Chaos (already set initially)
      // Wait 2s in Chaos, then switch to Routes
      timeout = setTimeout(() => {
        setPhase(AnimationPhase.ROUTES);
        
        // Wait 2s in Routes, then switch to Stack
        timeout = setTimeout(() => {
          setPhase(AnimationPhase.STACK);
          
          // Wait 4s in Stack (Clarity), then reset
          timeout = setTimeout(() => {
            setPhase(AnimationPhase.CHAOS);
            runCycle(); // Loop
          }, 5000);
        }, 2000);
      }, 2500);
    };

    runCycle();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#020617] p-8">
      
      {/* 600x600 Container - Matching the deep site background */}
      <div 
        className="relative bg-[#020617] rounded-3xl shadow-2xl overflow-hidden border border-[#1e293b]"
        style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE }}
      >
        <BackgroundGrid />

        {/* Layer: Routes (Visible in CHAOS and ROUTES phases, fade out in STACK) */}
        <div className="absolute inset-0 pointer-events-none z-10">
           <svg width="100%" height="100%">
             <AnimatePresence>
               {(phase === AnimationPhase.ROUTES || phase === AnimationPhase.CHAOS) && modules.map((m, i) => {
                 // Connect each node to the next one to form a "route"
                 const nextM = modules[(i + 1) % modules.length];
                 // Also connect to a central-ish point or random others for network effect
                 const crossM = modules[(i + 3) % modules.length];

                 return (
                   <React.Fragment key={`route-${i}`}>
                     {/* Primary path */}
                     <motion.path
                       d={`M${m.chaosX + MODULE_SIZE_CHAOS/2},${m.chaosY + MODULE_SIZE_CHAOS/2} Q300,300 ${nextM.chaosX + MODULE_SIZE_CHAOS/2},${nextM.chaosY + MODULE_SIZE_CHAOS/2}`}
                       fill="none"
                       stroke={ACCENT_COLOR}
                       strokeWidth="2"
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ 
                         pathLength: phase === AnimationPhase.ROUTES ? 1 : 0, 
                         opacity: phase === AnimationPhase.ROUTES ? 0.8 : 0.15
                       }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 1.5, ease: "easeInOut" }}
                     />
                     {/* Secondary path (fainter) */}
                      <motion.path
                       d={`M${m.chaosX + MODULE_SIZE_CHAOS/2},${m.chaosY + MODULE_SIZE_CHAOS/2} Q${m.chaosX},${crossM.chaosY} ${crossM.chaosX + MODULE_SIZE_CHAOS/2},${crossM.chaosY + MODULE_SIZE_CHAOS/2}`}
                       fill="none"
                       stroke={ACCENT_COLOR}
                       strokeWidth="1"
                       strokeDasharray="4 4"
                       initial={{ pathLength: 0, opacity: 0 }}
                       animate={{ 
                         pathLength: phase === AnimationPhase.ROUTES ? 1 : 0, 
                         opacity: phase === AnimationPhase.ROUTES ? 0.4 : 0
                       }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                     />
                   </React.Fragment>
                 );
               })}
             </AnimatePresence>
           </svg>
        </div>

        {/* Layer: Modules */}
        <div className="absolute inset-0 z-20">
          {modules.map((module, i) => {
            const Icon = ICONS[i];
            const isStack = phase === AnimationPhase.STACK;
            
            // Calculate Stack Position
            const stackTotalHeight = modules.length * (MODULE_HEIGHT_STACK + 8); // 8px gap
            const stackStartY = (CONTAINER_SIZE - stackTotalHeight) / 2 + 40; // +40 offset for text
            const stackY = stackStartY + module.stackOrder * (MODULE_HEIGHT_STACK + 8);
            const stackX = (CONTAINER_SIZE - MODULE_WIDTH_STACK) / 2;

            return (
              <motion.div
                key={module.id}
                initial={false}
                animate={{
                  x: isStack ? stackX : module.chaosX,
                  y: isStack ? stackY : module.chaosY,
                  width: isStack ? MODULE_WIDTH_STACK : MODULE_SIZE_CHAOS,
                  height: isStack ? MODULE_HEIGHT_STACK : MODULE_SIZE_CHAOS,
                  rotate: isStack ? 0 : module.chaosRotation,
                  borderRadius: isStack ? 6 : 12, // Slightly sharper corners for stack to match modern UI
                }}
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 12,
                  mass: 0.8,
                  delay: isStack ? i * 0.05 : 0 // Stagger effect on stack
                }}
                // Module Styling: Gradient background, white/20 border for contrast, deep shadow
                className={`absolute flex items-center justify-center ${module.color} text-white border border-white/20 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]`}
              >
                {/* Inner Highlight for Glass/Premium feel */}
                <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />

                {/* Content inside module */}
                <div className="relative w-full h-full flex items-center px-4 overflow-hidden">
                  <motion.div
                    layout
                    className="flex items-center justify-center shrink-0"
                    animate={{ 
                        marginRight: isStack ? 12 : 0,
                        width: isStack ? 'auto' : '100%',
                    }}
                  >
                     {/* Icon Color: White to stand out against vibrant gradients */}
                     <Icon size={isStack ? 18 : 20} className="text-white drop-shadow-sm" />
                  </motion.div>
                  
                  {/* Text Label - Only visible in Stack phase */}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: isStack ? 1 : 0,
                      x: isStack ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-semibold whitespace-nowrap tracking-wide text-white drop-shadow-sm"
                  >
                    {module.label}
                  </motion.span>

                  {/* Decorative faint grid lines inside the chip for "tech" feel */}
                  {!isStack && (
                     <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay"></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Layer: Text Overlay */}
        <div className="absolute top-12 left-0 right-0 z-30 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">
              From Chaos to Clarity
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-400 font-medium">
               <motion.span 
                 animate={{ 
                    color: phase === AnimationPhase.ROUTES ? TEXT_ACCENT_COLOR : '#64748b',
                    scale: phase === AnimationPhase.ROUTES ? 1.05 : 1
                 }}
               >
                 Global routes
               </motion.span>
               <span>&rarr;</span>
               <motion.span
                 animate={{ 
                    color: phase === AnimationPhase.STACK ? '#ffffff' : '#64748b',
                    scale: phase === AnimationPhase.STACK ? 1.05 : 1
                 }}
               >
                 aligned GTM stack
               </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Status Indicator (Bottom) - Optional subtle UI element */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
            {[AnimationPhase.CHAOS, AnimationPhase.ROUTES, AnimationPhase.STACK].map((p, i) => (
                <motion.div
                    key={p}
                    className={`h-1.5 rounded-full ${phase === p ? 'bg-[#22d3ee]' : 'bg-[#1e293b]'}`}
                    animate={{ width: phase === p ? 24 : 6 }}
                    transition={{ duration: 0.3 }}
                />
            ))}
        </div>

      </div>
      
      {/* Caption for the user viewing this demo */}
      <p className="mt-8 text-slate-500 text-sm font-light">
        GTMStack Concept Animation • 600x600 Tile
      </p>
    </div>
  );
}