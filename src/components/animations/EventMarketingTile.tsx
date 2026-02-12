'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowUp, 
  MoreHorizontal, 
  Megaphone, 
  Ticket, 
  Target, 
  Calendar, 
  ChevronDown, 
  Check, 
  Activity,
  TrendingUp
} from 'lucide-react';

type TimeRange = 'month' | 'quarter' | 'year';

interface FunnelStage {
  val: string;
  width: string;
  label: string;
}

interface DashboardData {
  label: string;
  eventName: string;
  growth: string;
  netRevenue: string;
  totalRegistrations: string;
  funnel: {
    top: FunnelStage;
    middle: FunnelStage;
    bottom: FunnelStage;
  };
  metrics: {
    roas: string;
    cpa: string;
    capacity: string;
  };
  chart: {
    stroke: string;
    fill: string;
    points: { cx: string; cy: string }[];
  };
}

interface RecentRegistration {
  name: string;
  ticketType: 'VIP' | 'General' | 'Early Bird';
  initial: string;
}

export default function EventMarketingTile() {
  const [timeRange, setTimeRange] = useState<TimeRange>('quarter');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Data definitions for Event Marketing context
  const data: Record<TimeRange, DashboardData> = {
    month: {
      label: 'Last 30 Days',
      eventName: 'SaaS Summit NYC',
      growth: '15%',
      netRevenue: '$142k',
      totalRegistrations: '850',
      funnel: {
        top: { val: '45k', width: '90%', label: 'Impressions' },
        middle: { val: '1.2k', width: '60%', label: 'Page Visits' },
        bottom: { val: '850', width: '45%', label: 'Registrations' }
      },
      metrics: { roas: '4.2x', cpa: '$45', capacity: '85%' },
      chart: {
        stroke: "M0,180 Q80,170 120,150 T240,140 T360,120 T500,100",
        fill: "M0,180 Q80,170 120,150 T240,140 T360,120 T500,100 L500,200 L0,200 Z",
        points: [
          { cx: "120", cy: "150" },
          { cx: "240", cy: "140" },
          { cx: "360", cy: "120" },
          { cx: "500", cy: "100" }
        ]
      }
    },
    quarter: {
      label: 'Q4 Events',
      eventName: 'Global Roadshow',
      growth: '28%',
      netRevenue: '$840k',
      totalRegistrations: '12.4k',
      funnel: {
        top: { val: '210k', width: '92%', label: 'Impressions' },
        middle: { val: '18k', width: '65%', label: 'Page Visits' },
        bottom: { val: '12.4k', width: '48%', label: 'Registrations' }
      },
      metrics: { roas: '5.8x', cpa: '$32', capacity: '94%' },
      chart: {
        stroke: "M0,180 Q80,160 120,130 T240,120 T360,90 T500,70",
        fill: "M0,180 Q80,160 120,130 T240,120 T360,90 T500,70 L500,200 L0,200 Z",
        points: [
          { cx: "120", cy: "130" },
          { cx: "240", cy: "120" },
          { cx: "360", cy: "90" },
          { cx: "500", cy: "70" }
        ]
      }
    },
    year: {
      label: '2024 Season',
      eventName: 'All Events',
      growth: '35%',
      netRevenue: '$2.4M',
      totalRegistrations: '45.2k',
      funnel: {
        top: { val: '1.2M', width: '85%', label: 'Impressions' },
        middle: { val: '85k', width: '58%', label: 'Page Visits' },
        bottom: { val: '45.2k', width: '42%', label: 'Registrations' }
      },
      metrics: { roas: '6.5x', cpa: '$28', capacity: '98%' },
      chart: {
        stroke: "M0,180 Q80,150 120,110 T240,90 T360,60 T500,40",
        fill: "M0,180 Q80,150 120,110 T240,90 T360,60 T500,40 L500,200 L0,200 Z",
        points: [
          { cx: "120", cy: "110" },
          { cx: "240", cy: "90" },
          { cx: "360", cy: "60" },
          { cx: "500", cy: "40" }
        ]
      }
    }
  };

  const current = data[timeRange];

  const recentRegistrations: RecentRegistration[] = [
    { name: "Elena R.", ticketType: "VIP", initial: "E" },
    { name: "Marcus T.", ticketType: "General", initial: "M" },
    { name: "Sarah K.", ticketType: "Early Bird", initial: "S" },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const funnelVariants: Variants = {
    hidden: { opacity: 0, width: "0%" },
    visible: (i: number) => ({
      opacity: 1,
      width: "100%",
      transition: { delay: 0.3 + (i * 0.1), duration: 0.6, ease: "circOut" }
    })
  };

  const listVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.5 + (i * 0.1), duration: 0.4, ease: "easeOut" }
    })
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectTimeRange = (key: TimeRange) => {
    setTimeRange(key);
    setIsDropdownOpen(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const getTicketColor = (type: string) => {
    switch(type) {
        case 'VIP': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800';
        case 'General': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
        default: return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      // Fixed 600x600 size as requested
      className="relative w-[600px] h-[600px] bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 font-sans flex flex-col z-0"
    >
      {/* 1. Header Section (Compact: 64px) */}
      <div className="h-[64px] shrink-0 px-6 sm:px-8 flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 z-20 relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5 mb-0.5">
            <Megaphone className="w-3 h-3" /> Event Analytics
          </span>
          <h1 className="text-lg font-extrabold text-[#1e3a8a] dark:text-slate-100 leading-tight">{current.eventName}</h1>
        </div>
        <div className="flex items-center gap-2">
          
          {/* Date Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{current.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                >
                  <div className="py-1">
                    {(Object.keys(data) as TimeRange[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleSelectTimeRange(key)}
                        className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between group"
                      >
                        {data[key].label}
                        {timeRange === key && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="p-2 text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-400 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area - Vertical Stacking with tighter spacing (gap-4) */}
      <div 
        className="flex-1 flex flex-col p-6 gap-4 min-h-0 z-10 relative overflow-hidden" 
        onClick={closeDropdown}
      >
        
        {/* 2. Hero Section: Chart & Revenue Pace (Reduced to h-[130px]) */}
        <div className="relative h-[130px] w-full shrink-0 flex flex-col">
           {/* Metrics Overlay */}
           <div className="flex justify-between items-start z-10 w-full">
              <motion.div variants={itemVariants}>
                <p className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  REVENUE PACE
                </p>
                <motion.div 
                  key={current.netRevenue}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-3xl font-extrabold text-[#065f46] dark:text-emerald-400 tracking-tight">{current.netRevenue}</span>
                  <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">Gross</span>
                </motion.div>
              </motion.div>

              <motion.div 
                key={current.growth} 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-end"
              >
                 <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full flex items-center gap-1 font-bold text-xs">
                    <TrendingUp className="w-3 h-3" />
                    {current.growth}
                 </div>
                 <span className="text-[10px] font-medium text-slate-400 mt-1">vs target</span>
              </motion.div>
           </div>

           {/* Hero Chart */}
           <div className="absolute inset-0 pt-6 pointer-events-none">
             <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 200">
              <defs>
                <linearGradient id="growthGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15"></stop>
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <motion.path 
                key={`fill-${timeRange}`}
                d={current.chart.fill} 
                fill="url(#growthGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              <motion.path 
                key={`stroke-${timeRange}`}
                d={current.chart.stroke}
                fill="none" 
                stroke="#2563eb" 
                strokeLinecap="round" 
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {current.chart.points.map((p, i) => (
                <motion.circle 
                  key={`dot-${timeRange}-${i}`}
                  custom={i} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + (i * 0.1), type: "spring", stiffness: 300 }}
                  cx={p.cx} 
                  cy={p.cy} 
                  fill="white" 
                  r="5" 
                  stroke="#2563eb" 
                  strokeWidth="2.5" 
                />
              ))}
            </svg>
            <div className="absolute bottom-0 w-full h-[1px] bg-slate-100 dark:bg-slate-800"></div>
           </div>
        </div>

        {/* 3. Secondary Card: Conversion Funnel (Vertical Stack Item 1) */}
        <div className="flex flex-col gap-2 shrink-0">
            <div className="flex justify-between items-center">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                CONVERSION FUNNEL
              </p>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                 {current.totalRegistrations} Total Regs
              </span>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
               {/* Impression Bar */}
               <motion.div custom={0} variants={funnelVariants} className="h-7 w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center relative overflow-hidden group">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-slate-200 dark:bg-slate-700/80"
                    animate={{ width: current.funnel.top.width }}
                  ></motion.div>
                  <div className="relative z-10 w-full flex justify-between px-3">
                     <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{current.funnel.top.label}</span>
                     <span className="text-[10px] font-black text-slate-700 dark:text-slate-200">{current.funnel.top.val}</span>
                  </div>
               </motion.div>

               {/* Visits Bar */}
               <motion.div custom={1} variants={funnelVariants} className="h-7 w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center relative overflow-hidden group">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-blue-500/80"
                    animate={{ width: current.funnel.middle.width }}
                  ></motion.div>
                  <div className="relative z-10 w-full flex justify-between px-3">
                     <span className="text-[10px] font-bold text-slate-600 dark:text-slate-100 group-hover:text-white transition-colors">{current.funnel.middle.label}</span>
                     <span className="text-[10px] font-black text-slate-700 dark:text-slate-100 group-hover:text-white transition-colors">{current.funnel.middle.val}</span>
                  </div>
               </motion.div>

               {/* Regs Bar */}
               <motion.div custom={2} variants={funnelVariants} className="h-7 w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center relative overflow-hidden group">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-[#065f46]"
                    animate={{ width: current.funnel.bottom.width }}
                  ></motion.div>
                  <div className="relative z-10 w-full flex justify-between px-3">
                     <span className="text-[10px] font-bold text-slate-600 dark:text-slate-100 group-hover:text-white transition-colors">{current.funnel.bottom.label}</span>
                     <span className="text-[10px] font-black text-slate-700 dark:text-slate-100 group-hover:text-white transition-colors">{current.funnel.bottom.val}</span>
                  </div>
               </motion.div>
            </div>
        </div>

        {/* 4. Secondary Card: Live Feed (Vertical Stack Item 2) */}
        <div className="flex-1 flex flex-col gap-2 min-h-0">
            <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5" />
                  LIVE REGISTRATIONS
                </p>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-100 dark:border-emerald-900/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Active</span>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                 {recentRegistrations.map((attendee, i) => (
                    <motion.div 
                        key={i}
                        custom={i}
                        variants={listVariants}
                        className="h-8 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 border border-slate-100 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[9px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                {attendee.initial}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{attendee.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] text-slate-400 font-medium">just now</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getTicketColor(attendee.ticketType)}`}>
                                {attendee.ticketType}
                            </span>
                        </div>
                    </motion.div>
                 ))}
             </div>
        </div>

      </div>

      {/* 5. Footer Section (Compact: 64px) */}
      <div className="h-[64px] shrink-0 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 px-6 grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700 items-center z-10 relative">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">ROAS</span>
          <motion.span 
            key={`roas-${timeRange}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-lg font-bold text-slate-800 dark:text-slate-200"
          >
            {current.metrics.roas}
          </motion.span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">CPA</span>
          <motion.span 
            key={`cpa-${timeRange}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-lg font-bold text-slate-800 dark:text-slate-200"
          >
            {current.metrics.cpa}
          </motion.span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">Sold %</span>
          <motion.span 
             key={`cap-${timeRange}`}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-lg font-bold text-slate-800 dark:text-slate-200"
          >
            {current.metrics.capacity}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}