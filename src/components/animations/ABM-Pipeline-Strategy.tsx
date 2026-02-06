// FILE: ABMPipelineStrategy.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  Settings, 
  Target, 
  Zap, 
  Workflow, 
  AlertTriangle, 
  Download, 
  Share2, 
  Rocket,
  ArrowUp,
  Search,
  Eye,
  Mail,
  MousePointer2,
  BarChart3
} from 'lucide-react';

/* --- TYPES --- */
interface StatState {
  targeting: number;
  engagement: number;
  opportunity: number;
  pipelineValue: number;
  engageRate: number;
  roi: number;
  targets: number;
}

interface FunnelCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  change: number;
  color: string;
  borderColor: string;
  shadowColor: string;
  children: React.ReactNode;
  isNeutral?: boolean;
}

interface TargetItemProps {
  initials: string;
  name: string;
  tier: string;
  value: string;
  status: string;
  statusColor: string;
  iconColor: string;
  iconBg: string;
  iconBorder: string;
  progress: number;
}

/* --- MAIN COMPONENT --- */
export default function ABMPipelineStrategy() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'quarterly'>('monthly');
  
  // Simulate live data updates with organic jitter
  const [stats, setStats] = useState<StatState>({
    targeting: 450,
    engagement: 120,
    opportunity: 80,
    pipelineValue: 1.2,
    engageRate: 26.6,
    roi: 4.5,
    targets: 450
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const updateStats = () => {
      setStats(prev => ({
        ...prev,
        targeting: prev.targeting + Math.floor(Math.random() * 5) - 2,
        engagement: prev.engagement + Math.floor(Math.random() * 3) - 1,
        engageRate: parseFloat((prev.engageRate + (Math.random() * 0.4 - 0.2)).toFixed(1))
      }));
      timeoutId = setTimeout(updateStats, 2000 + Math.random() * 1500);
    };

    updateStats();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-2 bg-slate-950/20">
      <div className="w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative bg-[#0a192f] text-slate-300 font-sans flex flex-col shadow-2xl rounded-xl border border-slate-800 selection:bg-[#00d2ff]/30">
        
        {/* HEADER */}
        <header className="flex-none h-14 flex items-center justify-between px-4 border-b border-[#233554] bg-[#0a192f]/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#00d2ff]/10 rounded border border-[#00d2ff]/20">
              <Network className="text-[#00d2ff]" size={18} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-tight uppercase italic flex items-center gap-2">
                ABM Pipeline
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-[9px] text-[#00d2ff] font-bold uppercase tracking-[0.1em]">Live Intelligence</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#112240] p-0.5 rounded flex relative border border-[#233554] h-6 w-24">
              <motion.div 
                className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-[#00d2ff] rounded-[2px] shadow-[0_0_8px_rgba(0,210,255,0.3)] z-0"
                initial={false}
                animate={{ x: activeTab === 'monthly' ? 2 : '100%' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button onClick={() => setActiveTab('monthly')} className={`relative z-10 flex-1 text-[8px] font-extrabold uppercase tracking-wide transition-colors ${activeTab === 'monthly' ? 'text-[#0a192f]' : 'text-slate-400'}`}>Month</button>
              <button onClick={() => setActiveTab('quarterly')} className={`relative z-10 flex-1 text-[8px] font-extrabold uppercase tracking-wide transition-colors ${activeTab === 'quarterly' ? 'text-[#0a192f]' : 'text-slate-400'}`}>Qtr</button>
            </div>
            <button className="text-slate-400 hover:text-[#00d2ff] transition-colors"><Settings size={16} /></button>
            <div className="w-7 h-7 rounded-full border border-[#00d2ff]/30 overflow-hidden">
               <img src="https://picsum.photos/100/100?random=88" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* MAIN CONTENT: 2-Column Grid */}
        <main className="flex-1 p-4 grid grid-cols-12 gap-4 overflow-hidden z-10">
          
          {/* LEFT COL: Funnel + Stats + Actions - 5/12 width */}
          <section className="col-span-5 flex flex-col h-full gap-3">
             <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Funnel Stages</h3>
                <span className="text-[9px] font-bold text-[#00d2ff]">+12%</span>
             </div>

             {/* Funnel Cards */}
             <div className="flex flex-col gap-2">
               <FunnelCard 
                  icon={<Target size={16} />} title="Targeting" value={stats.targeting} change={12.5} 
                  color="text-[#00d2ff]" borderColor="border-[#00d2ff]" shadowColor="rgba(0,210,255,0.1)"
                >
                   <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                      <motion.path d="M0 15 Q 50 2, 100 12" fill="none" stroke="#00d2ff" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} />
                   </svg>
                </FunnelCard>

                <FunnelCard 
                  icon={<Zap size={16} />} title="Engagement" value={stats.engagement} change={8.2} 
                  color="text-[#00d2ff]" borderColor="border-[#00d2ff]" shadowColor="rgba(0,210,255,0.1)"
                >
                   <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                      <motion.path d="M0 10 Q 50 18, 100 5" fill="none" stroke="#00d2ff" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.2 }} />
                   </svg>
                </FunnelCard>

                <FunnelCard 
                  icon={<Workflow size={16} />} title="Opportunity" value={stats.opportunity} change={-3.4} 
                  color="text-slate-400" borderColor="border-[#233554]" shadowColor="rgba(0,0,0,0)" isNeutral
                >
                   <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
                      <motion.path d="M0 12 Q 50 5, 100 15" fill="none" stroke="#00d2ff" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.4 }} />
                   </svg>
                </FunnelCard>
             </div>

             {/* KPIs Grid */}
             <div className="grid grid-cols-2 gap-2 mt-1">
                <CompactStat label="ROI" value={`${stats.roi}x`} trend="+0.5" isUp />
                <CompactStat label="Targets" value={stats.targets.toString()} trend="Flat" isUp={false} isFlat />
                <CompactStat label="Pipeline" value={`$${stats.pipelineValue}M`} trend="+12%" isUp />
                <CompactStat label="Engage" value={`${stats.engageRate}%`} trend="+3%" isUp />
             </div>

             {/* Action Area */}
             <div className="flex gap-2 mt-auto">
               <div className="flex flex-col gap-2">
                 <button className="p-2 h-full rounded bg-[#112240] text-slate-400 border border-[#233554] hover:text-white transition-colors flex items-center justify-center">
                    <Download size={12} />
                 </button>
                 <button className="p-2 h-full rounded bg-[#112240] text-slate-400 border border-[#233554] hover:text-white transition-colors flex items-center justify-center">
                    <Share2 size={12} />
                 </button>
               </div>
               
               <motion.button 
                 whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                 className="flex-1 relative h-full min-h-[50px] rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-indigo-400/30"
               >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="z-10 flex flex-col items-center">
                    <span className="leading-none mb-1">Launch Campaign</span>
                    <Rocket className="animate-bounce" size={14} />
                  </div>
               </motion.button>
             </div>
             
             {/* Bottleneck Alert */}
             <div className="bg-[#112240] rounded border border-[#f59f0a]/30 p-2.5 flex items-start gap-2.5">
                <AlertTriangle size={14} className="text-[#f59f0a] mt-0.5 shrink-0" />
                <div>
                   <p className="text-[10px] font-bold text-[#f59f0a] uppercase leading-none mb-1">Bottleneck</p>
                   <p className="text-[9px] text-slate-400 leading-tight">Conversion lag in mid-funnel.</p>
                </div>
             </div>
          </section>

          {/* RIGHT COL: Growth + List - 7/12 width */}
          <section className="col-span-7 flex flex-col gap-4 h-full">
            
            {/* Growth Chart Container - Expanded Height */}
            <div className="bg-[#112240] rounded-lg border border-[#233554] p-4 flex-1 min-h-[160px] flex flex-col relative overflow-hidden shadow-lg">
               <div className="flex justify-between items-center mb-3 z-10">
                  <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Growth Velocity</h3>
                  <div className="px-1.5 py-0.5 rounded bg-[#00d2ff]/10 border border-[#00d2ff]/20 text-[9px] font-bold text-[#00d2ff]">
                    4.5x
                  </div>
               </div>
               
               {/* Chart Area */}
               <div className="flex-1 relative bg-[#0a192f]/50 rounded border border-[#233554]/30 w-full">
                  <div className="absolute inset-0 grid grid-cols-4 divide-x divide-[#233554]/20">
                    <div /> <div /> <div /> <div />
                  </div>
                  <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 60" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#00d2ff" stopOpacity="1" />
                      </linearGradient>
                      <mask id="dashedLineMask">
                        <motion.path 
                          d="M0 55 C 30 55, 45 52, 65 35 S 85 20, 100 30" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
                        />
                      </mask>
                    </defs>
                    
                    {/* Dashed Orange Line (Masked for animation) */}
                    <path 
                      d="M0 55 C 30 55, 45 52, 65 35 S 85 20, 100 30" 
                      fill="none" 
                      stroke="#f59f0a" 
                      strokeDasharray="3 2" 
                      strokeWidth="1.5" 
                      opacity="0.7"
                      mask="url(#dashedLineMask)"
                    />
                    
                    {/* Main Blue Line */}
                    <motion.path 
                      d="M0 50 C 30 50, 40 45, 60 30 S 80 10, 100 20" 
                      fill="none" 
                      stroke="url(#lineGradient)" 
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }} 
                      animate={{ pathLength: 1 }} 
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                    
                    {/* Pulsing Data Point */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
                    >
                      {/* Pulsing Ring */}
                      <motion.circle 
                        cx="85" cy="18" r="4" 
                        fill="#00d2ff" 
                        opacity="0.5"
                        animate={{ r: [4, 12], opacity: [0.5, 0] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} 
                      />
                      {/* Core Dot */}
                      <circle cx="85" cy="18" r="4" fill="#00d2ff" />
                    </motion.g>
                  </svg>
               </div>
            </div>

            {/* Target List - Expanded to fill bottom */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Priority Targets</h3>
                 <Search size={12} className="text-slate-500" />
               </div>
               
               <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2">
                  <TargetItem 
                    initials="AC" name="Acme Corp" tier="Tier 1" value="$120k" 
                    status="Engaged" statusColor="text-emerald-400" 
                    iconColor="text-[#00d2ff]" iconBg="bg-[#00d2ff]/10" iconBorder="border-[#00d2ff]/20" 
                    progress={78}
                  />
                  <TargetItem 
                    initials="ST" name="Stark Ind" tier="Tier 1" value="$450k" 
                    status="Qualified" statusColor="text-[#00d2ff]" 
                    iconColor="text-[#f59f0a]" iconBg="bg-[#f59f0a]/10" iconBorder="border-[#f59f0a]/20" 
                    progress={45}
                  />
                  <TargetItem 
                    initials="WE" name="Wayne Ent" tier="Tier 2" value="$850k" 
                    status="Nurture" statusColor="text-[#f59f0a]" 
                    iconColor="text-rose-400" iconBg="bg-rose-400/10" iconBorder="border-rose-400/20" 
                    progress={62}
                  />
                  <TargetItem 
                    initials="CY" name="Cyberdyne" tier="Tier 3" value="$95k" 
                    status="New" statusColor="text-slate-400" 
                    iconColor="text-indigo-400" iconBg="bg-indigo-400/10" iconBorder="border-indigo-400/20" 
                    progress={10}
                  />
               </div>
            </div>

          </section>
        </main>

      </div>
    </div>
  );
}

/* --- SUBCOMPONENTS --- */

function FunnelCard({ icon, title, value, change, color, borderColor, shadowColor, children, isNeutral = false }: FunnelCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-[#0a192f]/40 border border-[#233554]/60 rounded p-2.5 flex items-center justify-between group cursor-pointer relative overflow-hidden h-14"
    >
       <div className="flex items-center gap-3 relative z-10">
          <div className={`w-8 h-8 rounded bg-[#0a192f] border flex items-center justify-center ${color} ${borderColor}`} style={{ boxShadow: `0 0 10px ${shadowColor}` }}>
             {icon}
          </div>
          <div>
             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{title}</p>
             <p className={`text-sm font-black tabular-nums leading-none mt-0.5 ${isNeutral ? 'text-slate-300' : 'text-white'}`}>{value}</p>
          </div>
       </div>
       <div className="w-12 h-6 opacity-50 relative z-0">
          {children}
       </div>
    </motion.div>
  );
}

function TargetItem({ initials, name, tier, value, status, statusColor, iconColor, iconBg, iconBorder, progress }: TargetItemProps) {
  const barColor = statusColor.includes('emerald') ? '#34d399' : (statusColor.includes('#f59f0a') ? '#f59f0a' : (statusColor.includes('slate') ? '#94a3b8' : '#00d2ff'));
  
  return (
    <div className="flex items-center justify-between p-2.5 rounded bg-[#0a192f] border border-[#233554] hover:border-[#00d2ff]/30 transition-colors cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded ${iconBg} border ${iconBorder} flex items-center justify-center font-black text-[10px] ${iconColor}`}>
          {initials}
        </div>
        <div>
          <p className="text-[11px] font-bold text-white group-hover:text-[#00d2ff] transition-colors leading-none">{name}</p>
          <p className="text-[9px] text-slate-500 uppercase leading-none mt-0.5">{tier}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end">
        <p className="text-[11px] font-bold text-white tabular-nums leading-none mb-1">{value}</p>
        <div className="w-12 h-1 bg-[#112240] rounded-full overflow-hidden border border-[#233554]/50">
             <motion.div 
               className="h-full rounded-full"
               style={{ backgroundColor: barColor, boxShadow: `0 0 4px ${barColor}` }}
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 1, delay: 0.2 }}
             />
        </div>
      </div>
    </div>
  );
}

function CompactStat({ label, value, trend, isUp, isFlat }: { label: string, value: string, trend: string, isUp: boolean, isFlat?: boolean }) {
  return (
    <div className="bg-[#0a192f] p-2 rounded border border-[#233554] relative overflow-hidden group hover:border-[#00d2ff]/20 transition-colors">
      <p className="text-[8px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">{label}</p>
      <div className="flex items-baseline justify-between relative z-10">
         <p className="text-xs font-black text-white group-hover:text-[#00d2ff] transition-colors">{value}</p>
         <div className={`flex items-center gap-0.5 text-[8px] font-bold ${isFlat ? 'text-slate-500' : (isUp ? 'text-emerald-400' : 'text-rose-400')}`}>
            {!isFlat && <ArrowUp size={8} className={isUp ? "" : "rotate-180"} />}
            {trend}
         </div>
      </div>
    </div>
  );
}