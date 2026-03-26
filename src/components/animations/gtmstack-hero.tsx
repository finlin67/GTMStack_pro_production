import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Target, Zap, Database, BarChart3 } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const GTMStackHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      return () => canvas.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { icon: TrendingUp, value: "76%", label: "Pipeline Lift", color: "from-emerald-400 to-teal-500" },
    { icon: Target, value: "$500M+", label: "Pipeline Generated", color: "from-blue-400 to-cyan-500" },
    { icon: Zap, value: "150%", label: "Lead Gen Lift", color: "from-violet-400 to-purple-500" },
    { icon: BarChart3, value: "63%", label: "ACV Increase", color: "from-orange-400 to-amber-500" }
  ];

  const layers = [
    { name: "Strategy & Insights", position: "top-[15%]", delay: "0s" },
    { name: "Content & Engagement", position: "top-[35%]", delay: "0.2s" },
    { name: "Demand & Growth", position: "top-[55%]", delay: "0.4s" },
    { name: "Systems & Operations", position: "top-[75%]", delay: "0.6s" }
  ];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background particles */}
      <div ref={canvasRef} className="absolute inset-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px rgba(34, 211, 238, ${p.opacity})`
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '1s' }} />

      {/* GTM Stack Layers - Left Side */}
      <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 space-y-6 z-10">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className="relative group"
            style={{ animation: `slideInLeft 0.8s ease-out ${layer.delay} both` }}
          >
            <div className="h-1 w-48 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-6 left-0 text-xs font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
              {layer.name}
            </div>
            <div className="absolute top-0 -left-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" 
                 style={{ animationDelay: layer.delay }} />
            <div className="absolute top-0 -right-2 w-2 h-2 bg-violet-400 rounded-full" />
          </div>
        ))}
      </div>

      {/* Central Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <div className="text-center space-y-6 max-w-4xl">
          {/* Main Title */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight"
                style={{ animation: 'fadeInUp 1s ease-out both' }}>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">
                GTMstack
              </span>
              <span className="text-slate-200">.pro</span>
            </h1>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mx-auto"
             style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
            Operator-first GTM: one shared system for strategy, signals, execution, and proof across B2B technology companies
          </p>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-slate-400 font-mono max-w-xl mx-auto"
             style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}>
            Strategy → Data → Automation → Results
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-5xl mx-auto"
               style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  style={{ animation: `scaleIn 0.5s ease-out ${0.8 + idx * 0.1}s both` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg backdrop-blur-sm border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-300" />
                  <div className="relative p-4 space-y-2">
                    <Icon className={`w-6 h-6 mx-auto bg-gradient-to-br ${metric.color} text-transparent`} 
                          style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                    <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-br ${metric.color} text-transparent bg-clip-text`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 flex gap-4 justify-center"
               style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Explore the framework
                <Zap className="w-4 h-4" />
              </span>
            </button>
            <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg font-semibold text-slate-200 hover:bg-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
              View Case Studies
            </button>
          </div>
        </div>
      </div>

      {/* Data Flow Lines - Right Side */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-64 h-64 z-10">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle
                cx="100"
                cy="100"
                r={30 + i * 20}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="1"
                opacity="0.3"
                style={{
                  animation: `rotate ${10 + i * 2}s linear infinite`
                }}
              />
              <circle
                cx="100"
                cy={100 - 30 - i * 20}
                r="3"
                fill="#22d3ee"
                opacity="0.8"
                style={{
                  animation: `rotate ${10 + i * 2}s linear infinite`,
                  transformOrigin: '100px 100px'
                }}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GTMStackHero;
