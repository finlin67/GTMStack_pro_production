
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Types for the particle system and state management
 */
interface StageCounts {
  awareness: number;
  interest: number;
  decision: number;
}

type ParticleShape = 'circle' | 'square' | 'diamond';

interface Particle {
  id: number;
  startX: number;
  initialColor: string;
  isAlive: boolean;
  size: number;
  shape: ParticleShape;
}

const STAGE_DESCRIPTIONS = {
  awareness: "Top of funnel: Potential leads identifying a problem and discovering your brand.",
  interest: "Middle of funnel: Prospects actively researching and evaluating your specific solutions.",
  decision: "Bottom of funnel: High-intent leads finalizing their purchase or partnership choice."
};

/**
 * LeadGenTileAnimation
 * 
 * A self-contained component that visualizes a lead generation funnel.
 * Includes fixed dimensions (463x632), animated particles, 
 * rotating background glow, and real-time statistics.
 * Now includes detailed tooltips for each funnel stage on hover.
 */
export default function LeadGenTileAnimation() {
  // Stats state
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [qualifiedLeads, setQualifiedLeads] = useState<number>(0);
  const [stageCounts, setStageCounts] = useState<StageCounts>({
    awareness: 0,
    interest: 0,
    decision: 0,
  });

  // UI state
  const [hoveredStage, setHoveredStage] = useState<keyof StageCounts | null>(null);

  // Customization state
  const [configColor, setConfigColor] = useState<string>('#ffffff');
  const [configSize, setConfigSize] = useState<number>(10);
  const [configShape, setConfigShape] = useState<ParticleShape>('circle');

  // Particle tracking state
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdCounter = useRef(0);

  // Constants for sizing and colors
  const WIDTH = 463;
  const HEIGHT = 632;
  const COLORS = {
    awareness: '#ffffff',
    interest: '#3b82f6', // blue-500
    decision: '#10b981', // emerald-500
  };

  /**
   * Helper to update the counts based on the particle's journey
   */
  const spawnParticle = (customConfig?: { color: string; size: number; shape: ParticleShape }) => {
    const id = ++particleIdCounter.current;
    const startX = Math.random() * 280 + 50; // Centered in funnel area

    // Step 1: Birth
    setTotalLeads(prev => prev + 1);
    setStageCounts(prev => ({ ...prev, awareness: prev.awareness + 1 }));
    
    const newParticle: Particle = {
      id,
      startX,
      initialColor: customConfig?.color || COLORS.awareness,
      size: customConfig?.size || 10,
      shape: customConfig?.shape || 'circle',
      isAlive: true
    };
    
    setParticles(prev => [...prev, newParticle]);

    // Logic paths
    const qualifiesInterest = Math.random() > 0.6; // 40% qualify
    const qualifiesDecision = qualifiesInterest && Math.random() > 0.5; // 50% of interest

    // Step 2: Move to Interest (1s in)
    setTimeout(() => {
      setStageCounts(prev => ({ ...prev, awareness: Math.max(0, prev.awareness - 1) }));
      if (qualifiesInterest) {
        setStageCounts(prev => ({ ...prev, interest: prev.interest + 1 }));
      } else {
        setParticles(prev => prev.map(p => p.id === id ? { ...p, isAlive: false } : p));
      }
    }, 1000);

    // Step 3: Move to Decision (2s in)
    setTimeout(() => {
      if (qualifiesInterest) {
        setStageCounts(prev => ({ ...prev, interest: Math.max(0, prev.interest - 1) }));
        if (qualifiesDecision) {
          setStageCounts(prev => ({ ...prev, decision: prev.decision + 1 }));
          setQualifiedLeads(prev => prev + 1);
        } else {
          setParticles(prev => prev.map(p => p.id === id ? { ...p, isAlive: false } : p));
        }
      }
    }, 2000);

    // Step 4: Exit (3s in)
    setTimeout(() => {
      if (qualifiesDecision) {
        setStageCounts(prev => ({ ...prev, decision: Math.max(0, prev.decision - 1) }));
      }
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 3000);
  };

  // Interval to spawn particles
  useEffect(() => {
    const interval = setInterval(() => spawnParticle(), 1500);
    return () => clearInterval(interval);
  }, []);

  // Conversion rate calculation
  const convRate = totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;

  const handleSpawnCustom = () => {
    spawnParticle({
      color: configColor,
      size: configSize,
      shape: configShape
    });
  };

  const getBorderRadius = (shape: ParticleShape) => {
    switch(shape) {
      case 'circle': return '50%';
      case 'square': return '2px';
      case 'diamond': return '2px';
      default: return '50%';
    }
  };

  return (
    <div 
      className="relative overflow-hidden flex flex-col p-6 rounded-[24px] shadow-2xl font-sans text-white select-none"
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      }}
    >
      {/* Background Glow Animation */}
      <motion.div
        className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Customization Panel (Lead Lab) */}
      <div className="relative z-30 mb-4 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Lead Lab</span>
          <button 
            onClick={handleSpawnCustom}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-[10px] font-bold uppercase tracking-tighter rounded-md transition-all shadow-lg shadow-indigo-500/20"
          >
            Spawn Custom Lead
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[8px] uppercase text-white/40">Color</label>
            <input 
              type="color" 
              value={configColor} 
              onChange={(e) => setConfigColor(e.target.value)}
              className="w-full h-6 bg-transparent border-0 cursor-pointer p-0"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[8px] uppercase text-white/40">Size ({configSize}px)</label>
            <input 
              type="range" 
              min="4" 
              max="24" 
              value={configSize} 
              onChange={(e) => setConfigSize(parseInt(e.target.value))}
              className="w-full h-6 accent-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[8px] uppercase text-white/40">Shape</label>
            <select 
              value={configShape} 
              onChange={(e) => setConfigShape(e.target.value as ParticleShape)}
              className="bg-slate-800 text-[10px] border-white/10 rounded-md h-6 px-1 focus:ring-1 focus:ring-indigo-500 outline-none"
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="diamond">Diamond</option>
            </select>
          </div>
        </div>
      </div>

      {/* Funnel Content Area */}
      <div className="flex-1 flex flex-col justify-evenly items-center relative z-10 py-2">
        
        {/* Particle Layer */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <AnimatePresence>
            {particles.map((particle) => (
              particle.isAlive && (
                <motion.div
                  key={particle.id}
                  initial={{ 
                    y: 40, 
                    x: particle.startX, 
                    scale: 0, 
                    opacity: 0,
                    rotate: 0,
                    filter: 'blur(0px)',
                    backgroundColor: particle.initialColor,
                    boxShadow: `0 0 15px ${particle.initialColor}`
                  }}
                  animate={{ 
                    y: [40, 240, 440, 490], 
                    scale: [0, 1.2, 1, 0.8], 
                    opacity: [0, 1, 1, 0],
                    rotate: particle.shape === 'diamond' ? 45 : 0,
                    filter: 'blur(0px)',
                    backgroundColor: [particle.initialColor, COLORS.interest, COLORS.decision, COLORS.decision],
                    boxShadow: [
                      `0 0 15px ${particle.initialColor}`,
                      `0 0 15px ${COLORS.interest}`,
                      `0 0 15px ${COLORS.decision}`,
                      `0 0 15px ${COLORS.decision}`
                    ]
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0, 
                    filter: 'blur(8px)',
                    x: particle.startX + (Math.random() * 40 - 20), // Drift on exit
                    y: '+=20', // Move down slightly on exit
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                  transition={{ 
                    duration: 3, 
                    ease: "linear",
                    times: [0, 0.33, 0.66, 1]
                  }}
                  className="absolute"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    borderRadius: getBorderRadius(particle.shape),
                    left: 0,
                    top: 0
                  }}
                />
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Stage 1: Awareness */}
        <div className="relative w-full max-w-[340px]">
          <StageTooltip visible={hoveredStage === 'awareness'} text={STAGE_DESCRIPTIONS.awareness} />
          <div 
            onMouseEnter={() => setHoveredStage('awareness')}
            onMouseLeave={() => setHoveredStage(null)}
            className="stage-tile w-full h-[100px] bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between px-6 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 hover:scale-[1.02] z-10 cursor-help"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                👥
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Stage 1</span>
                <span className="text-base font-bold text-white">Awareness</span>
              </div>
            </div>
            <span className="text-3xl font-bold text-white min-w-[40px] text-right">
              {stageCounts.awareness}
            </span>
          </div>
        </div>

        {/* Connector */}
        <div className="w-0.5 h-4 bg-gradient-to-b from-white/20 to-white/5 mx-auto -my-2 relative z-0" />

        {/* Stage 2: Interest */}
        <div className="relative w-[88%] max-w-[340px]">
          <StageTooltip visible={hoveredStage === 'interest'} text={STAGE_DESCRIPTIONS.interest} />
          <div 
            onMouseEnter={() => setHoveredStage('interest')}
            onMouseLeave={() => setHoveredStage(null)}
            className="stage-tile w-full h-[100px] bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between px-6 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 hover:scale-[1.02] z-10 cursor-help"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg bg-gradient-to-br from-blue-500 to-blue-700">
                🎯
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Stage 2</span>
                <span className="text-base font-bold text-white">Interest</span>
              </div>
            </div>
            <span className="text-3xl font-bold text-white min-w-[40px] text-right">
              {stageCounts.interest}
            </span>
          </div>
        </div>

        {/* Connector */}
        <div className="w-0.5 h-4 bg-gradient-to-b from-white/20 to-white/5 mx-auto -my-2 relative z-0" />

        {/* Stage 3: Decision */}
        <div className="relative w-[75%] max-w-[340px]">
          <StageTooltip visible={hoveredStage === 'decision'} text={STAGE_DESCRIPTIONS.decision} />
          <div 
            onMouseEnter={() => setHoveredStage('decision')}
            onMouseLeave={() => setHoveredStage(null)}
            className="stage-tile w-full h-[100px] bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between px-6 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/20 hover:scale-[1.02] z-10 cursor-help"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-700">
                ✅
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Stage 3</span>
                <span className="text-base font-bold text-white">Decision</span>
              </div>
            </div>
            <span className="text-3xl font-bold text-white min-w-[40px] text-right">
              {stageCounts.decision}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 relative z-10">
        <div className="text-center">
          <div className="text-xl font-bold text-white mb-0.5">{totalLeads}</div>
          <div className="text-[9px] font-semibold text-white/50 uppercase tracking-wider">Total</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-emerald-500 mb-0.5">{qualifiedLeads}</div>
          <div className="text-[9px] font-semibold text-white/50 uppercase tracking-wider">Qualified</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-500 mb-0.5">{convRate}%</div>
          <div className="text-[9px] font-semibold text-white/50 uppercase tracking-wider">Conv. Rate</div>
        </div>
      </div>
    </div>
  );
}

/**
 * StageTooltip Sub-component
 */
function StageTooltip({ visible, text }: { visible: boolean; text: string }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute bottom-full left-0 w-full z-50 pointer-events-none"
        >
          <div className="bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-2xl text-[11px] leading-relaxed text-white/90 text-center">
            {text}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-900/90" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
