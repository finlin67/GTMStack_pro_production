'use client';

import React, { useState, useEffect } from 'react';

/**
 * @file Uploaded_GalleryModal_v1.tsx
 * @description A self-contained, high-performance project gallery component.
 */

interface RelatedProject {
  title: string;
  category: string;
  iconType: 'cpu' | 'network' | 'shield';
  categoryColorClass: string;
}

interface GalleryTag {
  label: string;
  colorClass: string;
}

interface GalleryContent {
  title: string;
  tags: GalleryTag[];
  description: string;
  githubUrl: string;
  loadingText: string;
  status: {
    label: string;
    type: 'success' | 'alert';
    latency: string;
    packets: string;
  };
  relatedProjects: RelatedProject[];
}

const DEFAULT_CONTENT: GalleryContent = {
  title: 'Neural Flux Simulation',
  tags: [
    { label: 'React', colorClass: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'ThreeJS', colorClass: 'text-cyan-600 bg-cyan-50 border-cyan-100' },
    { label: 'D3', colorClass: 'text-lime-600 bg-lime-50 border-lime-100' },
  ],
  description:
    'An advanced real-time visualization platform designed to model high-density neural data flows. This simulation leverages custom WebGL shaders and D3 force-directed logic to represent over 100,000 concurrent data points without performance degradation. Built for enterprise-level diagnostic monitoring and predictive analysis.',
  githubUrl: 'https://github.com',
  loadingText: 'Instrumenting simulation...',
  status: {
    label: 'SYSTEM NOMINAL',
    type: 'success',
    latency: '14ms',
    packets: '1,024/s',
  },
  relatedProjects: [
    {
      title: 'Quantum Ledger',
      category: 'Blockchain Visualization',
      iconType: 'cpu',
      categoryColorClass: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Synapse Core',
      category: 'AI Node Mapping',
      iconType: 'network',
      categoryColorClass: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      title: 'Sentinel Watch',
      category: 'Security Dashboard',
      iconType: 'shield',
      categoryColorClass: 'text-lime-600 bg-lime-50 border-lime-100',
    },
  ],
};

const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export default function Template(props: { content?: unknown; pageTitle?: string }) {
  const content = (props.content as GalleryContent) || DEFAULT_CONTENT;
  const [isSimulationActive, setIsSimulationActive] = useState(true);
  const [status, setStatus] = useState(content.status);

  // Handle status toggling for demo purposes
  const handleToggleStatus = () => {
    setStatus(prev => ({
      ...prev,
      type: prev.type === 'success' ? 'alert' : 'success',
      label: prev.type === 'success' ? 'CRITICAL ALERT' : 'SYSTEM NOMINAL'
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-12 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col lg:flex-row overflow-hidden min-h-[80vh]">
        
        {/* Left Column: Visual Preview Area */}
        <section className="w-full lg:w-3/5 bg-slate-950 relative flex flex-col items-center justify-center p-8 overflow-hidden">
          {/* Background Accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,192,207,0.08),transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"
                style={{ 
                  top: `${15 + i * 15}%`, 
                  transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Central Visualization Placeholder */}
          <div className="relative z-10 flex flex-col items-center gap-12 text-center">
            <div 
              className="relative cursor-pointer group"
              onClick={handleToggleStatus}
            >
              {/* Outer Ring */}
              <div 
                className={`w-40 h-40 rounded-full border-2 border-dashed transition-all duration-700 animate-[spin_10s_linear_infinite] ${
                  status.type === 'success' ? 'border-[#00F59B]/40' : 'border-[#FF3366]/40'
                }`} 
              />
              {/* Inner Ring */}
              <div 
                className={`absolute inset-4 rounded-full border-4 border-t-transparent transition-all duration-500 animate-[spin_3s_linear_infinite] ${
                  status.type === 'success' ? 'border-[#00F59B]' : 'border-[#FF3366]'
                }`} 
              />
              {/* Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-4 h-4 rounded-full animate-pulse shadow-lg transition-all duration-500 ${
                  status.type === 'success' ? 'bg-[#00F59B] shadow-[#00F59B]/50' : 'bg-[#FF3366] shadow-[#FF3366]/50'
                }`} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Click to test alert</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase animate-pulse">
                {content.loadingText}
              </p>
              <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase opacity-60">
                Real-time stream active
              </p>
            </div>
          </div>

          {/* Telemetry Stats */}
          <div className="absolute bottom-10 left-10 right-10 flex flex-wrap justify-between items-end gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-1 bg-slate-700 rounded-full" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Latency</span>
                <span className="text-slate-300 font-mono text-xs font-bold">{status.latency}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-1 h-1 bg-slate-700 rounded-full" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Packets</span>
                <span className="text-slate-300 font-mono text-xs font-bold">{status.packets}</span>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest block mb-1">System Status</span>
              <span className={`text-xs font-mono font-black tracking-tighter transition-colors duration-500 ${
                status.type === 'success' ? 'text-[#00F59B]' : 'text-[#FF3366]'
              }`}>
                {status.label}
              </span>
            </div>
          </div>
        </section>

        {/* Right Column: Content & Details */}
        <section className="w-full lg:w-2/5 p-8 md:p-16 flex flex-col bg-white">
          <div className="flex-1">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                {content.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {content.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className={`px-4 py-1.5 border text-[10px] font-bold rounded-full uppercase tracking-widest ${tag.colorClass}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-light mb-10">
                {content.description}
              </p>

              <a 
                href={content.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full bg-[#FFB800] hover:bg-[#FFB800]/90 text-slate-950 font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-100 hover:shadow-amber-200 hover:-translate-y-1 active:translate-y-0"
              >
                <GithubIcon />
                <span className="text-sm tracking-tight">VIEW SOURCE ON GITHUB</span>
              </a>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Related Systems</h2>
              <div className="grid grid-cols-1 gap-4">
                {content.relatedProjects.map((project, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 cursor-pointer group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300 ${project.categoryColorClass}`}>
                      {project.iconType === 'cpu' && <CpuIcon />}
                      {project.iconType === 'network' && <NetworkIcon />}
                      {project.iconType === 'shield' && <ShieldIcon />}
                    </div>
                    <div className="ml-5">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                        {project.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="mt-16 pt-8 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-slate-900 rounded-full" />
              <span className="text-[10px] font-black text-slate-900 tracking-tighter uppercase">GTMStack.pro</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">v1.0.4-stable</span>
          </div>
        </section>
      </div>
    </div>
  );
}
