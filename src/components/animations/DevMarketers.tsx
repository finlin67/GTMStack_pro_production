'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  GitBranch, 
  Rocket, 
  Zap, 
  Star, 
  CheckCircle2, 
  Database, 
  Shield, 
  Cpu
} from 'lucide-react';

/**
 * LOGO SVG Component (Preserved 1:1 Brand Identity)
 */
const Logo = ({ className }: { className?: string }) => (
  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
    <path clipRule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fillRule="evenodd"></path>
  </svg>
);

export default function DevMarketers() {
  const [stats, setStats] = useState({
    latency: 12,
    status: 'deploying',
    branch: 'main',
    stars: 1240
  });

  // Simulation logic for real-time jitter
  const updateStats = useCallback(() => {
    const latencyJitter = Math.floor(Math.random() * 4) - 2;
    const starIncrement = Math.random() > 0.8 ? 1 : 0;
    const statuses = ['deploying', 'verifying', 'sharding', 'deploying'];
    
    setStats(prev => ({
      ...prev,
      latency: Math.max(8, Math.min(prev.latency + latencyJitter, 16)),
      stars: prev.stars + starIncrement,
      status: Math.random() > 0.9 ? statuses[Math.floor(Math.random() * statuses.length)] : prev.status
    }));

    const nextTimeout = 1500 + Math.random() * 2000;
    setTimeout(updateStats, nextTimeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateStats, 2000);
    return () => clearTimeout(timer);
  }, [updateStats]);

  return (
    <div className="w-full h-full aspect-square flex items-center justify-center bg-slate-950 font-display">
      <div className="w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative flex flex-col bg-[#0b0f1a] text-slate-100 border border-slate-800 shadow-2xl">
        
        {/* Compressed Navigation */}
        <header className="flex items-center justify-between px-4 py-3 bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-slate-800 z-30">
          <div className="flex items-center gap-2">
            <Logo className="size-6 text-primary" />
            <span className="font-bold text-sm tracking-tight">DevMarketers</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden xs:flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              <Star className="size-3 text-yellow-500 fill-yellow-500/20" />
              <span className="text-[10px] font-mono font-bold">{(stats.stars / 1000).toFixed(1)}k</span>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-md uppercase tracking-wider"
            >
              Get Audit
            </motion.button>
          </div>
        </header>

        {/* Adaptive Main Content */}
        <main className="flex-1 flex flex-col p-4 gap-4 grid-bg relative overflow-hidden">
          
          {/* Hero Segment */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 relative z-10"
          >
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[9px] font-mono w-fit">
              <Terminal className="size-3" />
              <span>STABLE_BUILD_V1.0.4</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black leading-tight tracking-tight max-w-[85%]">
              Master the <span className="text-primary">Bottom-Up</span> Adoption Loop.
            </h1>
          </motion.div>

          {/* Real-time Dashboard Row */}
          <div className="grid grid-cols-3 gap-2 z-10">
            {[
              { label: 'Branch', value: stats.branch, icon: GitBranch, color: 'text-primary' },
              { label: 'Status', value: stats.status, icon: Rocket, color: 'text-emerald-500' },
              { label: 'Latency', value: `${stats.latency}ms`, icon: Zap, color: 'text-amber-500' }
            ].map((item, idx) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="flex flex-col gap-0.5 p-2 rounded-lg bg-slate-900/50 border border-slate-800 backdrop-blur-md"
              >
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">{item.label}</span>
                <div className={`flex items-center gap-1.5 ${item.color}`}>
                  <item.icon className="size-3" />
                  <span className="text-[10px] font-mono font-bold truncate capitalize">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Core: Adoption Loop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-slate-900/80 border border-slate-800 rounded-xl relative flex flex-col shadow-inner overflow-hidden"
          >
            {/* Window Decorator */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 bg-slate-950/40">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-red-500/30" />
                <div className="size-2 rounded-full bg-yellow-500/30" />
                <div className="size-2 rounded-full bg-emerald-500/30" />
              </div>
              <span className="text-[8px] font-mono text-slate-500">adoption_engine.sh</span>
            </div>

            {/* Loop Diagram */}
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
              <div className="grid grid-cols-[24px_1fr] gap-x-3">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <motion.div 
                    animate={{ boxShadow: ["0 0 10px rgba(19,91,236,0.2)", "0 0 20px rgba(19,91,236,0.4)", "0 0 10px rgba(19,91,236,0.2)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 z-10"
                  >
                    <Star className="size-3.5 fill-current" />
                  </motion.div>
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 to-indigo-500/40 my-0.5" />
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[7px] font-mono text-slate-500">INIT</span>
                    <span className="text-[8px] font-bold text-primary bg-primary/10 px-1 rounded">AWARENESS</span>
                  </div>
                  <h3 className="text-[11px] font-bold">Community Seed</h3>
                  <div className="mt-1 bg-black/40 rounded p-1.5 border border-slate-800/50">
                    <code className="text-[9px] font-mono text-cyan-400">$ npx <span className="text-slate-500">init-traction</span></code>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <motion.div 
                    animate={{ boxShadow: ["0 0 10px rgba(99,102,241,0.2)", "0 0 20px rgba(99,102,241,0.4)", "0 0 10px rgba(99,102,241,0.2)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="size-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 z-10"
                  >
                    <Terminal className="size-3.5" />
                  </motion.div>
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-indigo-500/40 to-emerald-500/40 my-0.5" />
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[7px] font-mono text-slate-500">POC</span>
                    <span className="text-[8px] font-bold text-indigo-400 bg-indigo-500/10 px-1 rounded">VALIDATION</span>
                  </div>
                  <h3 className="text-[11px] font-bold">Developer Experience</h3>
                  <div className="mt-1 bg-black/40 rounded p-1.5 border border-slate-800/50">
                    <code className="text-[9px] font-mono text-indigo-400">npm <span className="text-slate-500">run local-test</span></code>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <motion.div 
                    animate={{ boxShadow: ["0 0 10px rgba(16,185,129,0.2)", "0 0 20px rgba(16,185,129,0.4)", "0 0 10px rgba(16,185,129,0.2)"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    className="size-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 z-10"
                  >
                    <CheckCircle2 className="size-3.5" />
                  </motion.div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[7px] font-mono text-slate-500">PROD</span>
                    <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded">STANDARD</span>
                  </div>
                  <h3 className="text-[11px] font-bold">Corporate Buy-In</h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer Values */}
          <div className="grid grid-cols-3 gap-2 mt-auto">
            {[
              { icon: Database, label: 'Bottom-Up', color: 'text-primary' },
              { icon: Shield, label: 'Credibility', color: 'text-indigo-400' },
              { icon: Cpu, label: 'Systems', color: 'text-emerald-400' }
            ].map((v) => (
              <div key={v.label} className="flex flex-col items-center gap-1 py-1 px-2 border border-slate-800 bg-slate-900/30 rounded-lg">
                <v.icon className={`size-3 ${v.color}`} />
                <span className="text-[8px] font-bold text-slate-500 tracking-tighter uppercase">{v.label}</span>
              </div>
            ))}
          </div>
        </main>

        {/* Compressed Footer */}
        <footer className="px-4 py-2 border-t border-slate-800 flex justify-between items-center bg-slate-950/80">
          <div className="flex items-center gap-1">
            <Logo className="size-3.5 text-slate-600" />
            <span className="text-[8px] font-bold text-slate-600 tracking-widest uppercase">DevMarketers</span>
          </div>
          <div className="flex gap-3">
             <span className="text-[8px] font-mono text-slate-600">LICENSE.md</span>
             <span className="text-[8px] font-mono text-slate-600">TERMS.log</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
