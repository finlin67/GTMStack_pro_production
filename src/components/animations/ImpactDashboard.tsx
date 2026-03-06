'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  TrendingUp, 
  Eye, 
  Heart, 
  Users, 
  Handshake, 
  Megaphone, 
  RefreshCcw,
  MousePointer2,
  LayoutDashboard,
  Target,
  Users2,
  Settings,
  Bell,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

/**
 * Interface Definitions
 */
interface LadderStep {
  label: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  description: string;
}

interface StatsState {
  retentionRate: number;
  activeCycle: string;
  advocatesCount: number;
  growthVelocity: number;
}

/**
 * ImpactAgencyDashboard
 * A high-fidelity donor engagement lifecycle dashboard.
 */
export default function ImpactAgencyDashboard() {
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'advocates'>('overview');
  const [stats, setStats] = useState<StatsState>({
    retentionRate: 78.4,
    activeCycle: 'Q3',
    advocatesCount: 5240,
    growthVelocity: 12.5
  });

  // Organic jitter simulation using recursive setTimeout for natural data movement
  const updateStats = useCallback(() => {
    setStats(prev => ({
      ...prev,
      retentionRate: +(prev.retentionRate + (Math.random() * 0.1 - 0.05)).toFixed(1),
      advocatesCount: prev.advocatesCount + (Math.random() > 0.7 ? 1 : 0),
      growthVelocity: +(prev.growthVelocity + (Math.random() * 0.4 - 0.2)).toFixed(1)
    }));
    
    const jitter = Math.random() * 2000 + 2000;
    const timeoutId = setTimeout(updateStats, jitter);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cleanup = updateStats();
    return cleanup;
  }, [updateStats]);

  const ladderSteps: LadderStep[] = [
    { 
      label: 'Awareness', 
      badge: 'Reach', 
      icon: Eye, 
      color: 'blue', 
      glow: 'shadow-blue-500/50', 
      description: 'Potential donors becoming aware of the mission.' 
    },
    { 
      label: 'Interest', 
      badge: 'Connect', 
      icon: Heart, 
      color: 'blue', 
      glow: 'shadow-blue-500/50', 
      description: 'Meaningful engagement with campaigns.' 
    },
    { 
      label: 'Involvement', 
      badge: 'Engage', 
      icon: Users, 
      color: 'purple', 
      glow: 'shadow-purple-500/50', 
      description: 'Active participation in events or community.' 
    },
    { 
      label: 'Commitment', 
      badge: 'Sustain', 
      icon: Handshake, 
      color: 'pink', 
      glow: 'shadow-pink-500/50', 
      description: 'Recurring monthly contributions established.' 
    },
    { 
      label: 'Advocacy', 
      badge: 'Amplify', 
      icon: Megaphone, 
      color: 'white', 
      glow: 'shadow-white/20', 
      description: 'Donors recruiting new members to the mission.' 
    },
  ];

  const sidebarItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'campaigns', icon: Target, label: 'Campaigns' },
    { id: 'advocates', icon: Users2, label: 'Advocates' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-full h-screen flex bg-[#0a0a0c] text-slate-100 overflow-hidden font-display">
      
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#121214]/50 backdrop-blur-xl flex flex-col items-center lg:items-start p-4 lg:p-6 space-y-8 z-50">
        <div className="flex items-center gap-3 px-2">
          <div className="size-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="hidden lg:block font-black text-xl tracking-tighter text-white">ImpactHub</span>
        </div>

        <nav className="flex-1 w-full space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => (item.id === 'overview' || item.id === 'campaigns' || item.id === 'advocates') && setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
              <span className="hidden lg:block font-medium">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="nav-indicator" className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        <div className="w-full pt-6 border-t border-white/5">
          <div className="bg-gradient-to-br from-charcoal to-[#1a1a1e] p-4 rounded-2xl border border-white/5">
             <div className="flex items-center justify-between mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Enterprise</span>
             </div>
             <p className="hidden lg:block text-xs text-slate-400 font-medium leading-relaxed">System Status: All nodes operational</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="h-20 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full lg:w-96">
            <Search className="w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search advocates or campaigns..." 
              className="bg-transparent border-none outline-none text-sm text-slate-300 placeholder:text-slate-600 w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#0a0a0c]" />
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Alex Sterling</p>
                <p className="text-[10px] text-slate-500 font-medium">Global Director</p>
              </div>
              <div className="size-10 rounded-full border border-white/10 shadow-xl overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                  alt="Global Director Alex Sterling Profile"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic View Section */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          
          {/* Global Background Decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 max-w-7xl mx-auto"
              >
                {/* Dashboard Intro */}
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-1">Impact Intelligence</h2>
                    <h1 className="text-4xl font-black text-white tracking-tight">Mission Journey</h1>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold transition-all">Export Data</button>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">New Campaign</button>
                  </div>
                </div>

                {/* Primary Metric Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Donor Retention', value: `${stats.retentionRate}%`, change: '+2.4%', icon: RefreshCcw, color: 'text-blue-400' },
                    { label: 'Active Advocates', value: stats.advocatesCount.toLocaleString(), change: '+128', icon: Users, color: 'text-purple-400' },
                    { label: 'Growth Velocity', value: `${stats.growthVelocity}%`, change: '+0.8%', icon: Zap, color: 'text-amber-400' },
                    { label: 'Lifecycle Value', value: '$2.4M', change: '+14.2%', icon: TrendingUp, color: 'text-emerald-400' },
                  ].map((metric, i) => (
                    <motion.div 
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-[#121214]/60 backdrop-blur-md border border-white/10 p-6 rounded-3xl group hover:border-primary/30 transition-all cursor-default"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-white/5 ${metric.color}`}>
                          <metric.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{metric.change}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{metric.label}</p>
                      <h3 className="text-2xl font-black text-white mt-1">{metric.value}</h3>
                    </motion.div>
                  ))}
                </div>

                {/* Engagement Ladder Visualization */}
                <div className="bg-gradient-to-br from-[#121214] to-[#0a0a0c] border border-white/10 rounded-[2.5rem] p-12 relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="text-center mb-16">
                      <h3 className="text-2xl font-black text-white mb-2">Strategy Alignment</h3>
                      <p className="text-slate-400 max-w-md mx-auto">Visualizing the movement of contributors through our strategic impact funnel.</p>
                    </div>

                    <div className="w-full relative flex items-center justify-between px-10">
                      {/* Animated Progression Line */}
                      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          className="h-full bg-gradient-to-r from-blue-500 via-primary to-pink-500"
                        />
                      </div>

                      {ladderSteps.map((step, idx) => {
                        const IconComp = step.icon;
                        const colors: any = {
                          blue: 'border-blue-500 text-blue-400 bg-blue-500/10',
                          purple: 'border-primary text-primary bg-primary/10',
                          pink: 'border-pink-500 text-pink-400 bg-pink-500/10',
                          white: 'border-white/20 text-white bg-white/10'
                        };

                        return (
                          <div 
                            key={step.label} 
                            className="relative z-10 flex flex-col items-center group/node"
                            onMouseEnter={() => setActiveHover(idx)}
                            onMouseLeave={() => setActiveHover(null)}
                          >
                            <motion.div 
                              whileHover={{ scale: 1.15, y: -5 }}
                              className={`size-16 sm:size-20 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xl ${colors[step.color]} ${step.glow} shadow-2xl`}
                            >
                              <IconComp className="w-8 h-8" />
                            </motion.div>
                            
                            <div className="mt-4 text-center">
                              <p className="font-bold text-white text-xs tracking-tight">{step.label}</p>
                            </div>

                            <AnimatePresence>
                              {activeHover === idx && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                  className="absolute -top-28 w-48 p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-3xl pointer-events-none text-center z-50"
                                >
                                  <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">{step.badge}</span>
                                  <p className="text-xs text-slate-200 leading-tight font-medium">{step.description}</p>
                                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-white/10 rotate-45" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-20 flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 font-medium">
                      <MousePointer2 className="w-3 h-3 text-primary animate-bounce" />
                      Hover nodes for phase deep-dive
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'campaigns' && (
              <motion.div 
                key="campaigns"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 max-w-7xl mx-auto"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-black text-white tracking-tight">Active Campaigns</h1>
                  <button className="p-2 bg-white/5 rounded-xl border border-white/10"><ArrowUpRight className="w-5 h-5" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: 'Global Water Initiative', progress: 78, goal: '$500,000', color: 'from-blue-500 to-cyan-500', days: 12 },
                    { title: 'Education Equality 2024', progress: 42, goal: '$1,200,000', color: 'from-primary to-purple-600', days: 28 },
                    { title: 'Rainforest Reforestation', progress: 91, goal: '$250,000', color: 'from-emerald-500 to-teal-500', days: 5 },
                    { title: 'Emergency Aid: Zone 7', progress: 15, goal: '$2,000,000', color: 'from-rose-500 to-pink-600', days: 45 },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-charcoal/60 border border-white/10 p-8 rounded-[2rem] hover:border-white/20 transition-all group overflow-hidden relative"
                    >
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                           <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center">
                              <Target className="w-6 h-6 text-slate-300" />
                           </div>
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.days} Days Left</span>
                        </div>
                        <h3 className="text-xl font-black text-white mb-4">{item.title}</h3>
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                           <span>Progress</span>
                           <span>{item.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-6">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              className={`h-full bg-gradient-to-r ${item.color}`}
                           />
                        </div>
                        <div className="flex justify-between items-center">
                           <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Goal Amount</p>
                              <p className="text-lg font-black text-white">{item.goal}</p>
                           </div>
                           <button className="size-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                              <ArrowUpRight className="w-5 h-5" />
                           </button>
                        </div>
                      </div>
                      <div className={`absolute -bottom-10 -right-10 size-40 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'advocates' && (
              <motion.div 
                key="advocates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8 max-w-7xl mx-auto"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-black text-white tracking-tight">Mission Advocates</h1>
                </div>

                <div className="bg-[#121214]/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5">
                        <th className="px-8 py-6">Member</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6">Impact Score</th>
                        <th className="px-8 py-6">Referrals</th>
                        <th className="px-8 py-6">Last Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { name: 'Sarah Jenkins', role: 'Platinum Advocate', score: 98, referrals: 12, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', status: 'Active' },
                        { name: 'Marcus Chen', role: 'Global Partner', score: 92, referrals: 8, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', status: 'Active' },
                        { name: 'Elena Rodriguez', role: 'Mission Lead', score: 85, referrals: 15, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', status: 'Away' },
                        { name: 'David Kim', role: 'Community Champion', score: 79, referrals: 4, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', status: 'Active' },
                        { name: 'Sophie Vane', role: 'Legacy Donor', score: 99, referrals: 24, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', status: 'Active' },
                      ].map((advocate, i) => (
                        <motion.tr 
                          key={advocate.name} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="group hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="size-10 rounded-full border border-white/10 overflow-hidden relative">
                                <Image
                                  src={advocate.img}
                                  alt={advocate.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{advocate.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{advocate.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${advocate.status === 'Active' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-slate-400/10 text-slate-400'}`}>
                              {advocate.status}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                               <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${advocate.score}%` }} />
                               </div>
                               <span className="text-xs font-black text-white">{advocate.score}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="text-sm font-bold text-slate-300">{advocate.referrals}</span>
                          </td>
                          <td className="px-8 py-5 text-slate-500 text-xs">
                            {Math.floor(Math.random() * 59) + 1}m ago
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
