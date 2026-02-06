import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  Search, 
  Bell, 
  User, 
  Cpu, 
  ArrowUp, 
  ArrowDown, 
  Rocket, 
  CheckCheck, 
  Clock, 
  Sparkles, 
  Send 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// --- TYPES ---

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  trendLabel?: string;
  colorClass: string;
  isDarkText?: boolean;
}

interface PipelineItem {
  id: string;
  statusColor: string;
  iconType: 'user' | 'rocket' | 'check';
  title: string;
  subtitle: string;
  progress: number;
}

// --- SUB-COMPONENTS ---

const Header: React.FC = () => {
  return (
    <header className="bg-white text-navy-blue w-full sticky top-0 z-50 border-b border-navy-blue/10">
      <div className="w-full px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-blue/10">
            <Cpu className="w-5 h-5 text-navy-blue" />
          </div>
          <h2 className="text-lg font-bold tracking-tight text-navy-blue">
            Automation Engine
          </h2>
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3">
           {/* Search Icon only */}
           <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-navy-blue/5 transition-colors text-navy-blue/40">
            <Search className="w-4 h-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-navy-blue/10 transition-colors">
            <Bell className="w-4 h-4 text-navy-blue" />
          </button>
          <div className="h-8 w-8 rounded-full bg-navy-blue/10 flex items-center justify-center border border-navy-blue/20">
            <User className="w-4 h-4 text-navy-blue" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 h-4 w-8 bg-dark-bg rounded-tl-[16px]"></div>
    </header>
  );
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  colorClass,
  isDarkText = false,
}) => {
  const isPositive = trend > 0;
  const textColor = isDarkText ? 'text-content-text' : 'text-white';
  const subTextColor = isDarkText ? 'text-content-text-muted' : 'text-white/80';
  const trendColor = isDarkText ? (isPositive ? 'text-teal' : 'text-salmon-pink') : 'text-white/80';

  return (
    <div className={`flex flex-col gap-0.5 rounded-medium p-4 shadow-sm border-none ${colorClass}`}>
      <p className={`text-xs font-semibold ${subTextColor}`}>{title}</p>
      <p className={`text-2xl font-black ${textColor} tabular`}>{value}</p>
      <div className={`flex items-center gap-1 text-[11px] font-bold ${trendColor}`}>
        {isPositive ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
        <span>{Math.abs(trend)}%</span>
      </div>
    </div>
  );
};

const PipelineCard: React.FC<{ item: PipelineItem }> = ({ item }) => {
  const Icon = item.iconType === 'user' ? User : item.iconType === 'rocket' ? Rocket : CheckCheck;
  const iconColorClass = item.iconType === 'user' ? 'text-purple-400' : item.iconType === 'rocket' ? 'text-vibrant-blue' : 'text-teal';
  
  return (
    <div className="flex w-60 flex-shrink-0 flex-col gap-3 rounded-xl bg-card-bg p-4 shadow-lg border border-white/10">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold text-content-text-muted">{item.id}</span>
        <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: item.statusColor }}></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
          <Icon className={`w-5 h-5 ${iconColorClass}`} />
        </div>
        <div>
          <p className="text-xs font-bold text-content-text">{item.title}</p>
          <p className="text-[10px] text-content-text-muted">{item.subtitle}</p>
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${item.progress}%`, backgroundColor: item.statusColor }}
        ></div>
      </div>
    </div>
  );
};

const PipelineMarquee: React.FC = () => {
  const items: PipelineItem[] = [
    {
      id: '#LD_9901',
      statusColor: '#a855f7', 
      iconType: 'user',
      title: 'Enterprise Lead',
      subtitle: 'Enriching',
      progress: 50,
    },
    {
      id: '#USR_2104',
      statusColor: '#2563eb', 
      iconType: 'rocket',
      title: 'App Interaction',
      subtitle: 'Calculating',
      progress: 75,
    },
    {
      id: '#CNV_0112',
      statusColor: '#10b981', 
      iconType: 'check',
      title: 'Checkout',
      subtitle: 'Routing',
      progress: 100,
    },
     {
      id: '#LD_9902',
      statusColor: '#f43f5e',
      iconType: 'user',
      title: 'Small Biz',
      subtitle: 'Validating',
      progress: 25,
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-large bg-card-bg p-5 shadow-sm border border-white/5">
      <div className="flex items-center justify-between mb-0">
        <h3 className="text-sm font-bold text-content-text">Real-time Orchestration</h3>
        <span className="text-[10px] font-bold text-content-text-muted uppercase tracking-widest">
          Active Pipeline
        </span>
      </div>
      <div className="relative flex h-36 w-full flex-col overflow-hidden rounded-xl bg-black/20 border border-white/5">
        <div className="absolute inset-0 belt-texture opacity-100"></div>
        <div className="z-10 flex h-full items-center overflow-hidden">
          <motion.div 
            className="flex gap-4 px-4"
            animate={{ x: "-50%" }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 15
            }}
          >
            {items.map((item, idx) => (
              <PipelineCard key={`a-${idx}`} item={item} />
            ))}
            {items.map((item, idx) => (
              <PipelineCard key={`b-${idx}`} item={item} />
            ))}
             {items.map((item, idx) => (
              <PipelineCard key={`c-${idx}`} item={item} />
            ))}
             {items.map((item, idx) => (
              <PipelineCard key={`d-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const performanceData = [
  { time: '60m', value: 15 },
  { time: '55m', value: 22 },
  { time: '50m', value: 25 },
  { time: '45m', value: 18 },
  { time: '40m', value: 30 },
  { time: '35m', value: 45 },
  { time: '30m', value: 65 },
  { time: '25m', value: 50 },
  { time: '20m', value: 25 },
  { time: '15m', value: 10 },
  { time: '10m', value: 35 },
  { time: '5m', value: 70 },
  { time: 'Now', value: 50 },
];

const PerformanceChart: React.FC = () => {
  const [chartData, setChartData] = useState(performanceData);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateData = () => {
    setChartData((prev) => {
      const newData = [...prev];
      const lastValue = newData[newData.length - 1].value;
      const randomChange = Math.floor(Math.random() * 20) - 10;
      let newValue = lastValue + randomChange;
      if (newValue < 5) newValue = 5;
      if (newValue > 95) newValue = 95;
      
      newData[newData.length - 1] = { ...newData[newData.length - 1], value: newValue };
      return newData;
    });

    const nextTick = Math.random() * 1000 + 1000;
    timeoutRef.current = setTimeout(updateData, nextTick);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(updateData, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-large bg-card-bg p-5 shadow-sm border border-white/5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-content-text">Processing Performance</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-vibrant-blue/20 border border-vibrant-blue"></div>
            <span className="text-[10px] font-semibold text-content-text-muted">Success</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-white/10 border border-white/20"></div>
            <span className="text-[10px] font-semibold text-content-text-muted">Load</span>
          </div>
        </div>
      </div>

      <div className="relative h-32 w-full">
        <div className="absolute inset-0 chart-grid pointer-events-none"></div>
        
        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between py-1 text-[8px] font-bold text-content-text-muted h-full">
            <span>100</span>
            <span>0</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip 
                contentStyle={{ backgroundColor: '#262626', borderColor: '#333', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#f5f5f5' }}
            />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 100]} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex flex-col gap-1 rounded-medium bg-card-bg p-4 shadow-sm border border-white/5">
        <div className="flex items-center gap-2 text-content-text-muted">
          <Clock className="w-3.5 h-3.5" />
          <h2 className="text-[9px] font-bold uppercase tracking-widest">Queue</h2>
        </div>
        <div className="flex flex-col mt-0.5">
          <p className="tabular text-xl font-black text-content-text leading-tight">1,240</p>
          <p className="text-[9px] font-semibold text-content-text-muted uppercase">leads</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-medium bg-card-bg p-4 shadow-sm border border-white/5">
        <div className="flex items-center gap-2 text-content-text-muted">
          <Sparkles className="w-3.5 h-3.5" />
          <h2 className="text-[9px] font-bold uppercase tracking-widest">Done</h2>
        </div>
        <div className="flex flex-col mt-0.5">
          <p className="tabular text-xl font-black text-content-text leading-tight">18.4k</p>
          <p className="text-[9px] font-semibold text-content-text-muted uppercase">records</p>
        </div>
      </div>

      <div className="flex flex-col gap-1 rounded-medium bg-card-bg p-4 shadow-sm border border-white/5">
        <div className="flex items-center gap-2 text-content-text-muted">
          <Send className="w-3.5 h-3.5" />
          <h2 className="text-[9px] font-bold uppercase tracking-widest">Sent</h2>
        </div>
        <div className="flex flex-col mt-0.5">
          <p className="tabular text-xl font-black text-content-text leading-tight">21.2k</p>
          <p className="text-[9px] font-semibold text-content-text-muted uppercase">synced</p>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="mt-2 border-t border-white/10 pt-4 pb-2">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-large bg-card-bg p-4 shadow-md border border-white/5">
        <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-widest text-content-text-muted">
              Cumulative
            </span>
            <span className="tabular text-lg font-black text-content-text">24.5k</span>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-navy-blue px-4 py-2 text-xs font-bold text-white shadow-lg">
            System Health
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APPLICATION COMPONENT ---

export default function AutomationEngineDashboard() {
  const [dateRange, setDateRange] = useState("May 18 - Jun 16");

  // Scaling Strategy:
  // Render content at 750px width (compact layout)
  // Scale down to fit container
  // Base scale factor = 600 / 750 = 0.8
  // Additional scale for hero embedding = 500 / 600 = 0.833
  // Combined scale = 0.8 * 0.833 ≈ 0.667
  
  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Thumbnail Container - sized to fit hero visual */}
      <div className="w-[500px] h-[500px] overflow-hidden relative bg-dark-bg rounded-xl shadow-2xl border border-white/10">
        
        {/* Scaled Content Wrapper */}
        <div 
          className="absolute top-0 left-0 w-[750px] origin-top-left bg-dark-bg font-display text-content-text selection:bg-navy-blue/30"
          style={{ transform: "scale(0.667)", height: "750px" }}
        >
          <Header />
          
          <main className="mx-auto flex w-full flex-col gap-5 p-5 pb-8">
            
            {/* Filters Bar - Compact */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-card-bg border border-white/10 rounded-lg text-xs font-medium shadow-sm hover:bg-white/5 transition-colors">
                <Calendar className="text-content-text-muted w-3.5 h-3.5" />
                <span>{dateRange}</span>
                <ChevronDown className="text-content-text-muted w-3.5 h-3.5" />
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 bg-card-bg border border-white/10 rounded-lg text-xs font-medium shadow-sm hover:bg-white/5 transition-colors">
                <span>Source</span>
                <ChevronDown className="text-content-text-muted w-3.5 h-3.5 ml-1" />
              </button>
              
              <div className="ml-auto flex items-center gap-2 bg-teal/10 px-3 py-1.5 rounded-full border border-teal/20">
                <div className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse"></div>
                <span className="text-teal text-[9px] font-bold uppercase tracking-widest">
                  Online
                </span>
              </div>
            </div>

            {/* Top Stats Grid - 4 Columns fits in 750px */}
            <div className="grid grid-cols-4 gap-3">
              <StatCard
                title="Ingest"
                value="$12.8k"
                trend={10.4}
                colorClass="bg-card-bg border border-white/5 border-l-4 border-l-purple-500"
                isDarkText={true}
              />
              <StatCard
                title="Enrich"
                value="284k"
                trend={-6.5}
                colorClass="bg-vibrant-blue"
              />
              <StatCard
                title="Score"
                value="11k"
                trend={1.2}
                colorClass="bg-teal"
              />
              <StatCard
                title="Route"
                value="3.9%"
                trend={8.2}
                colorClass="bg-salmon-pink"
              />
            </div>

            {/* Middle Section: Marquee */}
            <PipelineMarquee />

            {/* Chart Section */}
            <PerformanceChart />

            {/* Bottom Stats */}
            <StatsRow />

            {/* Footer */}
            <Footer />
            
          </main>
        </div>
      </div>
    </div>
  );
}