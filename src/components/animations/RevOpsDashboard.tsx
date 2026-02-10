'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  ArrowRightLeft, 
  ScrollText, 
  Bell, 
  Settings, 
  MoreVertical, 
  Search, 
  HelpCircle, 
  LayoutGrid, 
  Download, 
  ShieldCheck, 
  GitFork, 
  Zap, 
  Filter, 
  Database, 
  Megaphone, 
  CreditCard, 
  BrainCircuit, 
  Terminal, 
  CloudCog 
} from 'lucide-react';

interface MetricNode {
  id: string;
  name: string;
  subtext: string;
  status: string;
  latency: number;
  records: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  statusColorClass: string;
  statusBgClass: string;
}

export default function RevOpsDashboard() {
  const [stats, setStats] = useState({
    ingest: 18.4,
    clean: 99.8,
    route: 142,
    signals: 1240,
    storage: 64.2,
    inflow: 4.2,
    outflow: 2.8,
    meshLatency: 14,
  });

  const [nodes, setNodes] = useState<MetricNode[]>([
    {
      id: 'salesforce',
      name: 'Salesforce',
      subtext: '2m ago',
      status: 'ACTIVE',
      latency: 12,
      records: '842k',
      icon: Database,
      colorClass: 'text-sky-400',
      bgClass: 'bg-sky-500/10',
      statusColorClass: 'text-sky-400',
      statusBgClass: 'bg-sky-400/10',
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      subtext: 'Real-time',
      status: 'SYNCING',
      latency: 4,
      records: '1.2M',
      icon: Megaphone,
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-500/10',
      statusColorClass: 'text-emerald-400',
      statusBgClass: 'bg-emerald-400/10',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      subtext: 'Pending: 12',
      status: 'ACTIVE',
      latency: 32,
      records: '$4.2M',
      icon: CreditCard,
      colorClass: 'text-fuchsia-400',
      bgClass: 'bg-fuchsia-500/10',
      statusColorClass: 'text-fuchsia-400',
      statusBgClass: 'bg-fuchsia-400/10',
    },
    {
      id: 'ml',
      name: 'ML Insights',
      subtext: 'Growth',
      status: 'PROCESS',
      latency: 128,
      records: '428',
      icon: BrainCircuit,
      colorClass: 'text-primary',
      bgClass: 'bg-primary/20',
      statusColorClass: 'text-primary',
      statusBgClass: 'bg-primary/20',
    },
    {
      id: 'eventbus',
      name: 'Event Bus',
      subtext: 'Internal',
      status: 'STABLE',
      latency: 1,
      records: '4.2k/s',
      icon: Network,
      colorClass: 'text-slate-400',
      bgClass: 'bg-slate-500/10',
      statusColorClass: 'text-emerald-400',
      statusBgClass: 'bg-emerald-400/10',
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      subtext: 'External',
      status: 'STABLE',
      latency: 2,
      records: '928/m',
      icon: Terminal,
      colorClass: 'text-slate-400',
      bgClass: 'bg-slate-500/10',
      statusColorClass: 'text-emerald-400',
      statusBgClass: 'bg-emerald-400/10',
    },
  ]);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        inflow: Math.max(0, +(prev.inflow + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        outflow: Math.max(0, +(prev.outflow + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        meshLatency: Math.max(1, Math.floor(prev.meshLatency + (Math.random() * 4 - 2))),
        signals: Math.max(0, Math.floor(prev.signals + (Math.random() * 10 - 3))),
        ingest: Math.max(0, +(prev.ingest + (Math.random() * 0.05 - 0.01)).toFixed(1)),
      }));

      setNodes(prevNodes => prevNodes.map(node => {
        if (Math.random() > 0.7) {
          return {
            ...node,
            latency: Math.max(1, Math.floor(node.latency + (Math.random() * 6 - 3)))
          };
        }
        return node;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const activeNode = nodes.find(n => n.id === hoveredNodeId);

  const getTooltipPosition = (id: string) => {
    switch(id) {
      case 'salesforce': return { top: '3rem', left: '0.5rem' };
      case 'hubspot': return { bottom: '3rem', left: '0.5rem' };
      case 'stripe': return { top: '3rem', right: '0.5rem' };
      case 'ml': return { bottom: '3rem', right: '0.5rem' };
      case 'eventbus': return { top: '50%', left: '50%', transform: 'translate(-50%, 50%)', marginTop: '1.5rem' };
      default: return {};
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="w-full max-w-[600px] h-full max-h-[600px] bg-[#0f111a] text-slate-100 font-display overflow-hidden relative flex flex-col shadow-2xl rounded-xl border border-white/10 selection:bg-[#5a5cf2]/30">
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0f111a]">
          
          {/* Header */}
          <header className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#0f111a]/30 backdrop-blur-md z-10 shrink-0">
            <div className="flex items-center gap-4">
              <h2 className="text-white text-sm font-bold tracking-tight">Sync Mesh</h2>
              <div className="relative w-40 group hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                <input 
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 focus:ring-1 focus:ring-[#5a5cf2] focus:border-[#5a5cf2] placeholder:text-slate-600 transition-all outline-none" 
                  placeholder="Search..." 
                  type="text" 
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <motion.div 
                  className="size-1.5 bg-emerald-500 rounded-full"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-emerald-500 text-[10px] font-bold tracking-tight">ONLINE</span>
              </div>
              <button className="text-slate-400 hover:text-white transition-colors">
                 <Settings size={16} />
              </button>
            </div>
          </header>

          {/* Dashboard Grid */}
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
            
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3 flex-shrink-0">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Ingest</span>
                  <Download className="text-sky-400" size={14} />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <h4 className="text-sm font-mono text-white font-bold tracking-tighter">{stats.ingest.toFixed(1)}M</h4>
                  <span className="text-sky-400 text-[9px] font-bold hidden sm:inline">+12%</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Clean</span>
                  <ShieldCheck className="text-emerald-400" size={14} />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <h4 className="text-sm font-mono text-white font-bold tracking-tighter">{stats.clean}%</h4>
                  <span className="text-emerald-400 text-[9px] font-bold hidden sm:inline">OK</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Route</span>
                  <GitFork className="text-[#5a5cf2]" size={14} />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <h4 className="text-sm font-mono text-white font-bold tracking-tighter">{stats.route}K</h4>
                  <span className="text-[#5a5cf2] text-[9px] font-bold hidden sm:inline">LIVE</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-fuchsia-500/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Signals</span>
                  <Zap className="text-fuchsia-400" size={14} />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <h4 className="text-sm font-mono text-white font-bold tracking-tighter">{stats.signals}</h4>
                  <span className="text-fuchsia-400 text-[9px] font-bold hidden sm:inline">^</span>
                </div>
              </div>
            </div>

            {/* Lower Section: Split Table and Mesh */}
            <div className="flex flex-1 gap-4 overflow-hidden min-h-0">
              
              {/* Left: Table (Compact) */}
              <div className="flex-1 rounded-xl bg-white/5 border border-white/10 flex flex-col overflow-hidden min-w-0">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between flex-shrink-0">
                  <h3 className="text-white text-xs font-bold uppercase tracking-wider">Pipelines</h3>
                  <Filter className="text-slate-500 cursor-pointer hover:text-white" size={14} />
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#161822] z-10 border-b border-white/10">
                      <tr>
                        <th className="px-4 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">System</th>
                        <th className="px-4 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="px-4 py-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest text-right">Lat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <AnimatePresence>
                        {nodes.map((node) => (
                          <motion.tr 
                            key={node.id} 
                            className="hover:bg-white/5 transition-colors group cursor-pointer"
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onMouseEnter={() => setHoveredNodeId(node.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                          >
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded ${node.bgClass} ${node.colorClass}`}>
                                  <node.icon size={12} />
                                </div>
                                <p className="text-xs font-medium text-white truncate max-w-[80px] sm:max-w-none">{node.name}</p>
                              </div>
                            </td>
                            <td className="px-4 py-2.5">
                               <div className="flex items-center gap-1.5">
                                  <div className={`size-1.5 rounded-full ${node.statusBgClass.replace('bg-', 'bg-') === node.bgClass ? node.colorClass.replace('text-', 'bg-') : 'bg-emerald-400'}`}></div>
                                  <span className="text-[9px] text-slate-400 font-mono hidden sm:inline">{node.status}</span>
                               </div>
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              <span className="font-mono text-[10px] text-slate-300">{node.latency}ms</span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Mesh View (Compact) - Height Adjusted automatically via flex */}
              <div className="w-[140px] sm:w-[180px] flex-shrink-0 flex flex-col gap-3">
                <div className="flex-1 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-4">
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[9px] text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">LIVE</span>
                    </div>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {activeNode && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 5 }}
                          transition={{ duration: 0.15 }}
                          style={getTooltipPosition(activeNode.id)}
                          className="absolute z-30 w-36 bg-[#0f111a]/95 backdrop-blur-md border border-white/20 shadow-2xl rounded-lg p-2.5 flex flex-col gap-2 pointer-events-none"
                        >
                           <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
                              <div className={`p-1 rounded ${activeNode.bgClass} ${activeNode.colorClass}`}>
                                <activeNode.icon size={10} />
                              </div>
                              <span className="text-[10px] font-bold text-white leading-none">{activeNode.name}</span>
                           </div>
                           <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                             <div className="flex flex-col">
                               <span className="text-[8px] text-slate-500 uppercase font-bold">Latency</span>
                               <span className="text-[9px] font-mono text-white">{activeNode.latency}ms</span>
                             </div>
                             <div className="flex flex-col">
                               <span className="text-[8px] text-slate-500 uppercase font-bold">Status</span>
                               <span className={`text-[9px] font-bold ${activeNode.statusColorClass}`}>{activeNode.status}</span>
                             </div>
                             <div className="col-span-2 flex flex-col mt-0.5">
                               <span className="text-[8px] text-slate-500 uppercase font-bold">Throughput</span>
                               <span className="text-[9px] font-mono text-white">{activeNode.records}</span>
                             </div>
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Mesh Visual */}
                    <div className="relative size-32 flex items-center justify-center scale-90 sm:scale-100">
                      {/* Connecting Lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                         {/* Line 1: Top Left */}
                         <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
                         <motion.circle r="1.5" fill="#38bdf8" animate={{ cx: ["20%", "50%"], cy: ["20%", "50%"], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0 }} />
                         
                         {/* Line 2: Top Right */}
                         <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
                         <motion.circle r="1.5" fill="#e879f9" animate={{ cx: ["80%", "50%"], cy: ["20%", "50%"], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.2 }} />

                         {/* Line 3: Bottom Left */}
                         <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
                         <motion.circle r="1.5" fill="#34d399" animate={{ cx: ["20%", "50%"], cy: ["80%", "50%"], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.5 }} />

                         {/* Line 4: Bottom Right */}
                         <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
                         <motion.circle r="1.5" fill="#5a5cf2" animate={{ cx: ["50%", "80%"], cy: ["50%", "80%"], opacity: [0, 1, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: 0.8 }} />
                      </svg>

                      {/* Center Hub */}
                      <motion.div 
                          className="size-16 rounded-full flex items-center justify-center relative z-10 cursor-pointer"
                          style={{ background: 'radial-gradient(circle at center, #5a5cf2 0%, #111118 100%)', boxShadow: '0 0 20px rgba(90, 92, 242, 0.3)' }}
                          animate={{ boxShadow: ["0 0 20px rgba(90, 92, 242, 0.3)", "0 0 35px rgba(90, 92, 242, 0.5)", "0 0 20px rgba(90, 92, 242, 0.3)"] }}
                          transition={{ duration: 4, repeat: Infinity }}
                          onMouseEnter={() => setHoveredNodeId('eventbus')}
                          onMouseLeave={() => setHoveredNodeId(null)}
                      >
                          <CloudCog size={24} className="text-white" />
                      </motion.div>

                      {/* Satellites */}
                      <motion.div 
                        className="absolute top-2 left-2 p-1.5 rounded bg-sky-500/10 text-sky-400 border border-sky-400/20 cursor-pointer hover:bg-sky-500/20 hover:border-sky-400/40 transition-colors z-20" 
                        animate={{y: [0,-3,0]}} 
                        transition={{duration:3, repeat:Infinity}}
                        onMouseEnter={() => setHoveredNodeId('salesforce')}
                        onMouseLeave={() => setHoveredNodeId(null)}
                      >
                          <Database size={12} />
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-2 left-2 p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 cursor-pointer hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-colors z-20" 
                        animate={{y: [0,3,0]}} 
                        transition={{duration:3.5, repeat:Infinity}}
                        onMouseEnter={() => setHoveredNodeId('hubspot')}
                        onMouseLeave={() => setHoveredNodeId(null)}
                      >
                          <Megaphone size={12} />
                      </motion.div>
                      <motion.div 
                        className="absolute top-2 right-2 p-1.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-400/20 cursor-pointer hover:bg-fuchsia-500/20 hover:border-fuchsia-400/40 transition-colors z-20" 
                        animate={{y: [0,-2,0]}} 
                        transition={{duration:4, repeat:Infinity}}
                        onMouseEnter={() => setHoveredNodeId('stripe')}
                        onMouseLeave={() => setHoveredNodeId(null)}
                      >
                          <CreditCard size={12} />
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-2 right-2 p-1.5 rounded bg-primary/10 text-primary border border-primary/20 cursor-pointer hover:bg-primary/20 hover:border-primary/40 transition-colors z-20" 
                        animate={{y: [0,4,0]}} 
                        transition={{duration:3.2, repeat:Infinity}}
                        onMouseEnter={() => setHoveredNodeId('ml')}
                        onMouseLeave={() => setHoveredNodeId(null)}
                      >
                          <BrainCircuit size={12} />
                      </motion.div>
                    </div>
                    
                    {/* Mesh Stats */}
                    <div className="w-full mt-4 space-y-2">
                       <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase">
                          <span>Load</span>
                          <span className="text-white">Hi-Eff</span>
                       </div>
                       <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            className="bg-[#5a5cf2] h-full"
                            animate={{ width: `${(stats.inflow / 6) * 100}%` }}
                          />
                       </div>
                       <div className="flex justify-between text-[9px] font-mono">
                          <span className="text-slate-400">In: <span className="text-white">{stats.inflow}k</span></span>
                          <span className="text-slate-400">Out: <span className="text-white">{stats.outflow}k</span></span>
                       </div>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* Tailwind Style Injection for Scrollbar */}
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 3px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        `}</style>
      </div>
    </div>
  );
}