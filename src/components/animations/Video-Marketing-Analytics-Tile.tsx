// FILE: Video-Marketing-Analytics-Tile.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, 
  Share2, 
  Camera, 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  BarChart3, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface StatsState {
  views: number;
  ctr: number;
  retention: number;
  viewDiff: number;
  ctrDiff: number;
  retDiff: number;
}

const TOOLTIP_DATA = {
  views: {
    title: "View Insights",
    detail: "Previous Week: 12.8M",
    peak: "Peak: 450k/hr",
    status: "Outperforming 92% of peers"
  },
  ctr: {
    title: "CTR Deep Dive",
    detail: "Industry Avg: 4.2%",
    peak: "Peak: 12.4%",
    status: "Strong thumbnail performance"
  },
  retention: {
    title: "Retention Stats",
    detail: "Top Decile: 72%",
    peak: "Drop-off: 2:14",
    status: "Exceptional mid-roll hook"
  }
};

export default function VideoMarketingAnalyticsTile() {
  const [stats, setStats] = useState<StatsState>({
    views: 2.4,
    ctr: 8.2,
    retention: 64,
    viewDiff: 18,
    ctrDiff: 5,
    retDiff: 3
  });

  const [videoProgress, setVideoProgress] = useState(45);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredStat, setHoveredStat] = useState<keyof typeof TOOLTIP_DATA | null>(null);

  // Stats organic jitter logic
  const updateStats = useCallback(() => {
    setStats(prev => ({
      ...prev,
      views: Number((prev.views + (Math.random() > 0.7 ? 0.01 : 0)).toFixed(2)),
      ctr: Number((prev.ctr + (Math.random() > 0.8 ? 0.1 : -0.05)).toFixed(1)),
      retention: Math.min(100, Math.max(0, prev.retention + (Math.random() > 0.5 ? 1 : -1)))
    }));

    const nextTimeout = Math.floor(Math.random() * 2000) + 2000;
    setTimeout(updateStats, nextTimeout);
  }, []);

  // Video progress logic converted to recursive setTimeout
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const animate = () => {
      setVideoProgress(prev => (prev >= 100 ? 0 : prev + 0.1));
      timeoutId = setTimeout(animate, 100);
    };

    if (isPlaying) {
      animate();
    }
    
    return () => clearTimeout(timeoutId);
  }, [isPlaying]);

  useEffect(() => {
    const initialDelay = setTimeout(updateStats, 2000);
    return () => clearTimeout(initialDelay);
  }, [updateStats]);

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center bg-background-dark font-display text-white selection:bg-primary/30">
      {/* 600px x 600px Fixed Container */}
      <div className="w-[600px] h-[600px] overflow-hidden relative bg-background-dark flex flex-col items-center p-6 gap-6 shadow-2xl rounded-xl ring-1 ring-white/5">
        
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
        >
          <h1 className="text-white text-2xl font-black leading-tight tracking-tight">
            Turn One Video Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-primary">Global Engagement.</span>
          </h1>
        </motion.div>

        {/* Video Player Section */}
        <div className="relative w-full aspect-video flex-shrink-0 group">
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-primary/20 rounded-xl blur"
          ></motion.div>
          
          <div className="relative h-full w-full bg-ui-dark rounded-xl overflow-hidden border border-white/5 flex flex-col shadow-2xl">
            <div 
              className="relative flex-1 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBxYtsuZr36eLd2eM61b69_hLczUEg5XzusxKRj4BZkdeuInATVAVc0OsBPyrbvcBERSbJVndF4jKBIhFw82ig-KKHjA3WVlGh3B-dYL8OJina_1rT43foo3sMSEgDI7YbHDYqEDbWZ9FM9IIckUm16XxTqQBnouVx0FG0ZHfnHZmArpD35GxNSM67cOyA4O2Ify_XYIt0HLo7b4szHWAi3BVZUDmq8r0NOeNAptiUNWKKMDbsfAkJs20Wt-6KXXylGvBYY9d_G5EbZ")' }}
            >
              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-dark p-1.5 rounded-full flex items-center gap-2 pr-3"
                >
                  <div className="bg-red-600/20 p-1 rounded-full text-red-500">
                    <PlayCircle size={14} />
                  </div>
                  <span className="text-[8px] font-bold text-white/70 uppercase tracking-tighter">YouTube</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-dark p-1.5 rounded-full flex items-center gap-2 pr-3"
                >
                  <div className="bg-blue-600/20 p-1 rounded-full text-blue-400">
                    <Share2 size={14} />
                  </div>
                  <span className="text-[8px] font-bold text-white/70 uppercase tracking-tighter">LinkedIn</span>
                </motion.div>
              </div>

              <div className="absolute top-3 right-3">
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-dark p-1.5 rounded-full flex items-center gap-2 pr-3"
                >
                  <div className="bg-gradient-to-tr from-yellow-500/50 to-purple-600/50 p-1 rounded-full text-white">
                    <Camera size={14} />
                  </div>
                  <span className="text-[8px] font-bold text-white/70 uppercase tracking-tighter">Instagram</span>
                </motion.div>
              </div>

              {/* Main Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="size-14 rounded-full bg-gradient-to-r from-violet-600 to-primary text-white flex items-center justify-center glow-accent shadow-xl z-10"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} className="ml-1" fill="currentColor" />}
                </motion.button>
              </div>

              {/* Video Controls Footer */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-1 flex-1 rounded-full bg-white/10 relative overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-violet-400 to-primary rounded-full relative"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-medium text-white/90 tabular-nums">01:42 / 03:20</span>
                </div>
                <div className="flex justify-between items-center text-white/60">
                  <div className="flex gap-4">
                    <Pause size={12} className="cursor-pointer hover:text-white transition-colors" />
                    <Volume2 size={12} className="cursor-pointer hover:text-white transition-colors" />
                  </div>
                  <Maximize size={12} className="cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full glass-dark rounded-xl p-4 flex flex-col gap-4 relative"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-primary" size={18} />
              <h3 className="text-white text-sm font-bold">Engagement Analytics</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <motion.div 
                animate={{ 
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0px rgba(11,218,135,0)", 
                    "0 0 5px rgba(11,218,135,0.6)", 
                    "0 0 0px rgba(11,218,135,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="size-1.5 bg-[#0bda87] rounded-full"
              ></motion.div>
              <div className="bg-ui-dark text-white/50 text-[8px] font-bold px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest">Live</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {/* Tooltip implementation */}
            <AnimatePresence>
              {hoveredStat && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-4 right-4 -top-24 glass-dark rounded-lg p-3 border border-primary/20 shadow-2xl z-20 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                        {TOOLTIP_DATA[hoveredStat].title}
                      </h4>
                      <p className="text-[11px] text-white/90 font-medium">
                        {TOOLTIP_DATA[hoveredStat].detail}
                      </p>
                      <p className="text-[9px] text-white/40 mt-1">
                        {TOOLTIP_DATA[hoveredStat].peak}
                      </p>
                    </div>
                    <div className="bg-primary/10 p-1.5 rounded-md">
                      <TrendingUp size={14} className="text-primary" />
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5">
                    <span className="text-[8px] font-bold text-[#0bda87] uppercase">
                      {TOOLTIP_DATA[hoveredStat].status}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Total Views Card */}
            <motion.div 
              onMouseEnter={() => setHoveredStat('views')}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="bg-white/5 rounded-lg p-2 flex flex-col items-center text-center cursor-help transition-colors border border-white/5 hover:border-white/10"
            >
              <span className="text-[8px] font-medium text-white/40 uppercase tracking-wider mb-1">Total Views</span>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-white tracking-tight">{stats.views}M</span>
                <span className="text-[#0bda87] text-[9px] font-bold">+{stats.viewDiff}%</span>
              </div>
            </motion.div>

            {/* CTR Rate Card */}
            <motion.div 
              onMouseEnter={() => setHoveredStat('ctr')}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="bg-white/5 rounded-lg p-2 flex flex-col items-center text-center cursor-help transition-colors border border-white/5 hover:border-white/10"
            >
              <span className="text-[8px] font-medium text-white/40 uppercase tracking-wider mb-1">CTR Rate</span>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-white tracking-tight">{stats.ctr}%</span>
                <span className="text-[#0bda87] text-[9px] font-bold">+{stats.ctrDiff}%</span>
              </div>
            </motion.div>

            {/* Retention Card */}
            <motion.div 
              onMouseEnter={() => setHoveredStat('retention')}
              onMouseLeave={() => setHoveredStat(null)}
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="bg-white/5 rounded-lg p-2 flex flex-col items-center text-center cursor-help transition-colors border border-white/5 hover:border-white/10"
            >
              <span className="text-[8px] font-medium text-white/40 uppercase tracking-wider mb-1">Retention</span>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-white tracking-tight">{stats.retention}%</span>
                <span className="text-[#0bda87] text-[9px] font-bold">+{stats.retDiff}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer/CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full flex items-center justify-between mt-auto px-2 pb-2"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img className="size-6 rounded-full border border-background-dark object-cover" alt="User 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq4ZK63JkY6Q2ht6j-mt7Y88MiNpwUWYx_6m-lXPvvPSn1kw2LO2ox47nF8AER2QtJVE7pQ2B0enBF2EczKum9fpRiSO8NF0Gr62ruD2E4KrEwATFgOpWc3egFAgpjoUtxbImo71OMV66_9BVnJtSFnZ9q-c2CW_qmTcYzq_NwYJDVvT8gGDbhHd_IgyyFcJuI8BEpvLduwh5PZ_My4SyOnn17wKRxH8WpZ_yve-NCPRt9yCRzRWe5fspMZ72KNi0mlPTxhsdAwMA3"/>
              <img className="size-6 rounded-full border border-background-dark object-cover" alt="User 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX78Y7EKU9-im3VNpiTE2Js_HqhCqUhpMrm6GIPND5yVHIejpYClLmCcD2l06_51muz-BWAav2luj6TENV8u6Id_A-YpnU5wPKdaXn9y0Daf7HeYYMys6erZEQG1lKhx4CicybCnwd6iZVi452Ws6dzuUVfjG12M-0U68UHauJ76LFVqsJZcV3fVh9io7gdxkdwOWUGdk9r1ECMR_4F2_zKXMlNDHHuhIVcr21x8txrRtRZPciaCPgZn_0dZieGtuBHmTtJzkzjyLG"/>
              <div className="size-6 rounded-full border border-background-dark bg-ui-dark flex items-center justify-center text-[7px] font-bold text-white">
                +5k
              </div>
            </div>
            <p className="text-white/40 text-[9px] leading-tight">
              Trusted by <span className="text-white font-bold">500+ creators</span>
            </p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-violet-600 to-primary text-white text-[10px] font-bold py-2 px-4 rounded-full flex items-center gap-1.5 transition-all shadow-lg hover:brightness-110"
          >
            <span>Analyze Video</span>
            <ArrowRight size={10} />
          </motion.button>
        </motion.div>

        {/* Subtle Copyright Footer */}
        <div className="absolute bottom-2 left-0 w-full text-center">
          <p className="text-white/10 text-[7px] font-medium tracking-[0.3em]">© 2024 VIDIOMARK ENGINE</p>
        </div>
      </div>
    </div>
  );
}