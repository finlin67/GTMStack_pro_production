// FILE: SEOAnimation.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  ArrowRight, 
  ChevronUp, 
  Globe,
  Zap,
  Target,
  MousePointer2,
  ExternalLink
} from 'lucide-react';

/** 
 * TYPES 
 */
interface RankingItem {
  id: number;
  keyword: string;
  rank: number;
  prevRank: number;
  traffic: string;
}

interface Stats {
  organic: number;
  ctr: number;
  leads: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

const KEYWORDS = [
  "B2B Demand Generation",
  "SaaS Growth Marketing",
  "SEO Content Strategy",
  "Conversion Optimization",
  "Pipeline Acceleration"
];

const INITIAL_RANKINGS: RankingItem[] = [
  { id: 1, keyword: "B2B Demand Gen", rank: 1, prevRank: 12, traffic: "24.5k" },
  { id: 2, keyword: "Growth Agency", rank: 2, prevRank: 8, traffic: "18.2k" },
  { id: 3, keyword: "SaaS Strategy", rank: 3, prevRank: 15, traffic: "12.1k" },
  { id: 4, keyword: "Lead Engine", rank: 5, prevRank: 22, traffic: "9.4k" },
];

/**
 * SUB-COMPONENTS (Inlined)
 */
const StatCard = ({ label, value, trend }: { label: string; value: string; trend: string }) => (
  <div className="bg-white/5 rounded-lg p-3 flex flex-col items-center text-center border border-white/5 hover:border-emerald-500/20 transition-colors">
    <span className="text-[9px] font-medium text-white/40 uppercase tracking-wider mb-1">{label}</span>
    <div className="flex items-center gap-1.5">
      <span className="text-lg font-black text-white">{value}</span>
      <span className="text-[#10b981] text-[9px] font-bold">{trend}</span>
    </div>
  </div>
);

/**
 * MAIN COMPONENT
 */
export default function SEOAnimation() {
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [stats, setStats] = useState<Stats>({
    organic: 245000,
    ctr: 8.4,
    leads: 1284
  });
  const [particles, setParticles] = useState<Particle[]>([]);

  // 1. TYPING ENGINE
  useEffect(() => {
    let timeout: any;
    const fullText = KEYWORDS[keywordIndex];

    if (isTyping) {
      if (currentKeyword.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentKeyword(fullText.slice(0, currentKeyword.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2500);
      }
    } else {
      if (currentKeyword.length > 0) {
        timeout = setTimeout(() => {
          setCurrentKeyword(currentKeyword.slice(0, currentKeyword.length - 1));
        }, 40);
      } else {
        setKeywordIndex((prev) => (prev + 1) % KEYWORDS.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [currentKeyword, isTyping, keywordIndex]);

  // 2. LIVE STATS JITTER
  const updateStats = useCallback(() => {
    setStats(prev => ({
      organic: prev.organic + Math.floor(Math.random() * 15),
      ctr: Number((prev.ctr + (Math.random() * 0.04 - 0.02)).toFixed(2)),
      leads: prev.leads + (Math.random() > 0.95 ? 1 : 0)
    }));
    const timer = setTimeout(updateStats, 1500 + Math.random() * 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = updateStats();
    return cleanup;
  }, [updateStats]);

  // 3. REFINED TRAFFIC PARTICLE SYSTEM
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-25), // Maintain a pool of active particles
        { 
          id: Math.random(), 
          x: Math.random() * 60 - 30, 
          y: Math.random() * 40 - 20,
          duration: 3 + Math.random() * 3, // Variable speed: 3s to 6s
          delay: Math.random() * 0.5 
        }
      ]);
    }, 400); // More frequent emission for organic density
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[600px] h-[600px] overflow-hidden relative bg-[#020617] text-white selection:bg-emerald-500/30 font-display flex flex-col p-6 gap-5">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-black leading-tight tracking-tight">
          Turn Search Intent Into <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-400">
            Predictable Revenue Growth.
          </span>
        </h1>
      </motion.div>

      {/* SEARCH INTERFACE VISUAL */}
      <div className="relative w-full aspect-[16/10] flex-shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-blue-500/20 rounded-xl blur-lg opacity-50"></div>
        
        <div className="relative h-full w-full bg-[#1e293b] rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl">
          {/* Browser Bar */}
          <div className="bg-[#0f172a]/95 border-b border-white/5 p-2.5 flex items-center gap-3">
            <div className="flex gap-1.5 ml-1">
              <div className="size-2 rounded-full bg-red-500/40" />
              <div className="size-2 rounded-full bg-yellow-500/40" />
              <div className="size-2 rounded-full bg-green-500/40" />
            </div>
            <div className="flex-1 glass-dark rounded-full h-8 flex items-center px-4 gap-2 border border-white/5">
              <Search className="size-3.5 text-emerald-400" />
              <span className="text-[11px] font-semibold text-white/80 whitespace-nowrap overflow-hidden">
                {currentKeyword}
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-[1.5px] h-3.5 bg-emerald-400 ml-1 translate-y-0.5"
                />
              </span>
            </div>
            <Globe className="size-3.5 text-white/20 mr-1" />
          </div>

          {/* SERP RESULTS GRID */}
          <div className="relative flex-1 p-4 bg-gradient-to-b from-[#0f172a] to-[#020617] flex gap-4 overflow-hidden">
            
            {/* RESULTS LIST */}
            <div className="flex-1 flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Ranked Content</span>
                <div className="flex items-center gap-1 text-emerald-400/50 text-[9px] font-bold">
                  <TrendingUp className="size-2.5" />
                  <span>ALGO UPDATED</span>
                </div>
              </div>
              
              <AnimatePresence mode="popLayout">
                {INITIAL_RANKINGS.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-dark p-2.5 rounded-lg flex items-center justify-between border border-white/5 group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="size-7 rounded bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                        <span className="text-[11px] font-black text-emerald-400">#{item.rank}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-white group-hover:text-emerald-300 transition-colors">{item.keyword}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] text-white/30 font-medium">agency.com/guide...</span>
                          <motion.div 
                            initial={{ y: 2 }}
                            animate={{ y: -2 }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            className="flex items-center text-emerald-400 text-[9px] font-black"
                          >
                            <ChevronUp className="size-3" />
                            {item.prevRank - item.rank}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right relative z-10">
                      <div className="text-[10px] font-black text-white/90">{item.traffic}</div>
                      <div className="text-[7px] text-white/30 uppercase font-bold">Visits/mo</div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-1000" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* FLOW VISUALIZER SIDEBAR */}
            <div className="w-36 flex flex-col gap-3">
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] px-1">Lead Engine</span>
              <div className="flex-1 bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-emerald-400 rounded-full blur-[40px]" 
                />
                
                <Target className="size-7 text-emerald-400 mb-3 relative z-10" />
                <div className="text-[10px] font-bold text-white/60 mb-0.5 relative z-10 uppercase tracking-tight">Leads Generated</div>
                <motion.div 
                  key={stats.leads}
                  initial={{ scale: 1.2, color: "#34d399" }}
                  animate={{ scale: 1, color: "#10b981" }}
                  className="text-2xl font-black relative z-10"
                >
                  {stats.leads.toLocaleString()}
                </motion.div>
                
                <div className="mt-4 flex gap-1.5 relative z-10">
                  <div className="size-1.5 rounded-full bg-emerald-500/40 animate-ping" />
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  <div className="size-1.5 rounded-full bg-emerald-500/40 animate-ping delay-300" />
                </div>
              </div>
            </div>

            {/* PARTICLE OVERLAY (Refined Traffic Animation) */}
            <div className="absolute inset-0 pointer-events-none">
              <AnimatePresence>
                {particles.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 180 + p.x, y: 280, opacity: 0, scale: 0 }}
                    animate={{ 
                      x: 390 + (p.x/2), 
                      y: 180 + (p.y/3), 
                      opacity: [0, 1, 1, 0], // Smooth gradual fade in and out
                      scale: [0.2, 1.2, 1, 0.5]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: p.duration, 
                      delay: p.delay,
                      ease: "linear",
                      times: [0, 0.2, 0.8, 1] // Defines how much of the duration is spent at each opacity stage
                    }}
                    className="absolute"
                  >
                    <div className="size-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.9)] blur-[0.5px]" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* GROWTH ANALYTICS FOOTER PANEL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full glass-dark rounded-xl p-4 flex flex-col gap-4 border border-white/5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-emerald-400" />
            <h3 className="text-white text-[12px] font-black uppercase tracking-tight">Growth Intelligence Dashboard</h3>
          </div>
          <div className="bg-[#1e293b] text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded border border-emerald-500/20 uppercase tracking-widest flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE METRICS
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Monthly Reach" value={(stats.organic / 1000).toFixed(1) + "k"} trend="+24%" />
          <StatCard label="SERP Efficiency" value={stats.ctr + "%"} trend="+12%" />
          <StatCard label="Conversion" value={stats.leads > 0 ? ((stats.leads / stats.organic) * 100).toFixed(1) + "%" : "3.1%"} trend="+8.4%" />
        </div>
      </motion.div>

      {/* FOOTER CTA SECTION */}
      <div className="w-full flex items-center justify-between mt-auto px-1 pb-1">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2.5">
            {[1, 2, 3, 4].map(i => (
              <img 
                key={i}
                className="size-7 rounded-full border-2 border-[#020617] object-cover ring-1 ring-emerald-500/20" 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=growth${i}`}
                alt="Expert"
              />
            ))}
            <div className="size-7 rounded-full border-2 border-[#020617] bg-[#1e293b] flex items-center justify-center text-[8px] font-black text-emerald-400 ring-1 ring-emerald-500/20">
              +4k
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-white/80 text-[10px] font-bold leading-none">Trusted by Global CMOs</p>
            <p className="text-white/30 text-[8px] uppercase tracking-tighter">Demand Excellence Award 2024</p>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[11px] font-black py-2.5 px-6 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400/20 hover:brightness-110 transition-all group"
        >
          <span>SCALE PIPELINE</span>
          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* SYSTEM TAG */}
      <div className="absolute bottom-2 left-0 w-full text-center pointer-events-none">
        <p className="text-white/5 text-[7px] font-bold tracking-[0.4em] uppercase">GrowthFlow Engine • v4.2 Deployment</p>
      </div>
    </div>
  );
}
