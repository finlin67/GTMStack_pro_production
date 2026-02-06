'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  FileText, 
  Edit3, 
  Share2, 
  TrendingUp, 
  Video, 
  Mail, 
  Users, 
  ArrowUp, 
  DollarSign,
  Sparkles,
  Zap,
  RefreshCw,
  Target,
  BarChart3,
  MousePointer2,
  Eye,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle
} from 'lucide-react';
/**
 * TYPES & INTERFACES
 */
interface WorkflowStep {
  id: string;
  icon: typeof FileText;
  title: string;
  desc: string;
  color: string;
  progress: number;
  metric: string;
  metricValue: string;
}

interface StatProps {
  label: string;
  value: string;
  change: string;
  icon: typeof BarChart3;
  color: string;
}

interface Platform {
  id: string;
  name: string;
  icon: typeof Twitter;
  color: string;
}

/**
 * CONSTANTS
 */
const STEPS: WorkflowStep[] = [
  { id: 'idea', icon: FileText, title: 'Ideation', desc: 'AI-topic mapping', color: 'cyan', progress: 100, metric: 'Topics', metricValue: '142' },
  { id: 'create', icon: Edit3, title: 'Creation', desc: 'Content generation', color: 'purple', progress: 85, metric: 'Drafts', metricValue: '12' },
  { id: 'email', icon: Mail, title: 'Email', desc: 'Newsletter blast', color: 'amber', progress: 65, metric: 'Open Rate', metricValue: '42%' },
  { id: 'dist', icon: Share2, title: 'Distribution', desc: 'Multi-channel', color: 'pink', progress: 40, metric: 'Reach', metricValue: '85k' },
  { id: 'opt', icon: TrendingUp, title: 'Optimization', desc: 'ROI tracking', color: 'emerald', progress: 15, metric: 'Conv.', metricValue: '3.2%' },
];

const PLATFORMS: Platform[] = [
  { id: 'x', name: 'X', icon: Twitter, color: 'slate' },
  { id: 'li', name: 'LinkedIn', icon: Linkedin, color: 'blue' },
  { id: 'ig', name: 'Instagram', icon: Instagram, color: 'pink' },
  { id: 'fb', name: 'Facebook', icon: Facebook, color: 'indigo' },
  { id: 'th', name: 'Threads', icon: MessageCircle, color: 'slate' },
];

/**
 * SUB-COMPONENTS
 */
const StatCard: React.FC<StatProps> = ({ label, value, change, icon: Icon, color }) => (
  <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col justify-between h-full">
    <div className="flex justify-between items-start">
      <div className={`p-1.5 rounded-lg bg-${color}-500/10 text-${color}-400`}>
        <Icon size={14} />
      </div>
      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
        <ArrowUp size={8} /> {change}
      </span>
    </div>
    <div className="mt-2">
      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none mb-1">{label}</p>
      <h4 className="text-lg font-black tracking-tight leading-none">{value}</h4>
    </div>
  </div>
);

/**
 * MAIN COMPONENT
 */
export default function MarketingFlowAI() {
  const [activeStep, setActiveStep] = useState<string>('create');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInsight, setAiInsight] = useState("Select distribution channels and generate a tailored optimization strategy.");
  const [stats, setStats] = useState({ reach: 1.2, roi: 4.2 });
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['x', 'li']);

  // Organic Jitter Stats Simulation (Recursive setTimeout)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateStats = () => {
      setStats(prev => ({
        reach: +(prev.reach + Math.random() * 0.01).toFixed(2),
        roi: +(prev.roi + Math.random() * 0.05).toFixed(1)
      }));
      
      // Random delay between 2000ms and 4000ms for organic feel
      timeoutId = setTimeout(updateStats, 2000 + Math.random() * 2000);
    };

    updateStats();
    return () => clearTimeout(timeoutId);
  }, []);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (selectedPlatforms.length === 0) {
      setAiInsight("Please select at least one distribution channel first.");
      return;
    }

    setIsGenerating(true);
    
    try {
      const platformNames = selectedPlatforms.map(p => PLATFORMS.find(pl => pl.id === p)?.name).join(', ');
      const fallbackInsights = [
        "Synchronize LinkedIn thought leadership with rapid-fire X threads for maximum multi-touch attribution.",
        "Leverage short-form video hooks on Instagram to drive high-intent traffic to your LinkedIn lead magnets.",
        "Align paid social retargeting with organic content pillars for consistent messaging across channels.",
      ];
      await new Promise((r) => setTimeout(r, 600));
      setAiInsight(`For ${platformNames || 'your channels'}: ${fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)]}`);
    } catch (e) {
      setAiInsight("Leverage short-form video hooks on Instagram to drive high-intent traffic to your LinkedIn lead magnets.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-950 p-4">
      <div className="w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative bg-slate-900 text-white selection:bg-cyan-500/30 font-sans flex flex-col shadow-2xl rounded-2xl ring-1 ring-white/10">
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* NAV */}
        <header className="px-4 h-14 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl z-20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight leading-none">CONTENTFLOW</h1>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">AI Marketing Suite</p>
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-[11px] font-bold px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            {isGenerating ? <RefreshCw className="animate-spin" size={12} /> : <Sparkles size={12} />}
            {isGenerating ? 'Analyzing...' : 'Generate Insight'}
          </button>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-5 flex flex-col gap-6 overflow-hidden scale-[0.98] origin-top">
          
          {/* STATS ROW */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <StatCard label="Total Reach" value={`${stats.reach}M`} change="12.5%" icon={Eye} color="cyan" />
            <StatCard label="Avg. ROI" value={`${stats.roi}x`} change="8.2%" icon={Target} color="purple" />
            <StatCard label="Active Leads" value="2.8k" change="22.1%" icon={Users} color="pink" />
          </div>

          {/* WORKFLOW PIPELINE */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-4 relative shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Campaign Pipeline</h2>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-500 font-bold">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3 relative">
              {/* Connectors */}
              <div className="absolute top-6 left-[10%] right-[10%] h-[1px] bg-white/10 -z-10" />
              
              {STEPS.map((step) => (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ y: -2 }}
                  className={`relative flex flex-col items-center gap-2 group p-2 rounded-xl transition-colors ${activeStep === step.id ? 'bg-white/5' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    activeStep === step.id 
                      ? `bg-${step.color}-500 border-${step.color}-400 shadow-lg shadow-${step.color}-500/20` 
                      : 'bg-slate-800 border-white/10 group-hover:border-white/20'
                  }`}>
                    <step.icon size={18} className={activeStep === step.id ? 'text-white' : 'text-slate-400'} />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold leading-none">{step.title}</p>
                    <p className="text-[8px] text-slate-500 font-medium mt-1 truncate w-16">{step.desc}</p>
                  </div>
                  {activeStep === step.id && (
                    <motion.div 
                      layoutId="active-dot"
                      className={`absolute -bottom-1 w-1 h-1 rounded-full bg-${step.color}-400`}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Detailed View Area */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-white/5 flex flex-col gap-4"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-sm font-black flex items-center gap-2">
                        {STEPS.find(s => s.id === activeStep)?.title} Status
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">{STEPS.find(s => s.id === activeStep)?.progress}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${STEPS.find(s => s.id === activeStep)?.progress}%` }}
                        className={`h-full bg-gradient-to-r from-indigo-500 to-cyan-400`}
                      />
                    </div>
                  </div>
                  <div className="text-right border-l border-white/10 pl-4 min-w-[80px]">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{STEPS.find(s => s.id === activeStep)?.metric}</p>
                    <p className="text-lg font-black">{STEPS.find(s => s.id === activeStep)?.metricValue}</p>
                  </div>
                </div>

                {/* Step-specific controls */}
                {activeStep === 'dist' && (
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-indigo-400 font-black mb-3">Target Distribution Channels</p>
                    <div className="flex gap-2">
                      {PLATFORMS.map((platform) => (
                        <button
                          key={platform.id}
                          onClick={() => togglePlatform(platform.id)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all ${
                            selectedPlatforms.includes(platform.id)
                              ? `bg-white/10 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10`
                              : `bg-white/5 border-white/5 text-slate-400 hover:border-white/10`
                          }`}
                        >
                          <div className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center bg-${platform.color}-500/10 text-${platform.color}-400`}>
                            <platform.icon size={12} />
                          </div>
                          <span className="text-[10px] font-bold tracking-tight">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* AI INSIGHT BOX */}
          <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-2xl flex items-start gap-4 relative overflow-hidden group shrink-0">
            <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-500/10 flex items-center justify-center relative">
              <Sparkles className={`text-indigo-400 ${isGenerating ? 'animate-pulse' : ''}`} size={20} />
              {isGenerating && (
                <motion.div 
                  className="absolute inset-0 rounded-full border border-indigo-400/50"
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                Gemini Optimization Insight
                <span className={`h-1 w-1 rounded-full bg-indigo-500 ${isGenerating ? 'animate-ping' : 'animate-pulse'}`} />
              </h4>
              
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2 py-1"
                  >
                    <div className="h-2 w-full bg-indigo-500/10 rounded animate-pulse" />
                    <div className="h-2 w-3/4 bg-indigo-500/10 rounded animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.p 
                    key="content"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-indigo-100/80 leading-relaxed font-medium italic"
                  >
                    &quot;{aiInsight}&quot;
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="h-10 border-t border-white/5 bg-slate-900 px-4 flex items-center justify-between text-[8px] uppercase tracking-[0.2em] text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
            </div>
            <span>System Latency: 42ms</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1"><MousePointer2 size={8} /> Interactive</span>
            <span className="flex items-center gap-1 text-indigo-400"><Network size={8} /> v2.4.0-Stable</span>
          </div>
        </footer>

        {/* DYNAMIC TAILWIND COLOR SAFE-LIST (Inline) */}
        <div className="hidden border-cyan-400 border-purple-400 border-pink-400 border-emerald-400 border-blue-400 border-indigo-400 border-slate-400 border-amber-400 bg-cyan-500 bg-purple-500 bg-pink-500 bg-emerald-500 bg-blue-500 bg-indigo-500 bg-slate-500 bg-amber-500 text-cyan-400 text-purple-400 text-pink-400 text-emerald-400 text-blue-400 text-indigo-400 text-slate-400 text-amber-400 shadow-cyan-500/20 shadow-purple-500/20 shadow-pink-500/20 shadow-emerald-500/20 shadow-blue-500/20 shadow-indigo-500/20 shadow-slate-500/20 shadow-amber-500/20 bg-cyan-500/10 bg-purple-500/10 bg-pink-500/10 bg-emerald-500/10 bg-blue-500/10 bg-indigo-500/10 bg-slate-500/10 bg-amber-500/10" />
      </div>
    </div>
  );
}