'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  ArrowUp, 
  MoreHorizontal, 
  PieChart, 
  Activity, 
  Calendar, 
  ChevronDown, 
  Check, 
  UserPlus 
} from 'lucide-react';

type TimeRange = 'month' | 'quarter' | 'year';

interface FunnelStage {
  val: string;
  width: string;
}

interface DashboardData {
  label: string;
  growth: string;
  netGrowth: string;
  totalStudents: string;
  funnel: {
    applied: FunnelStage;
    admitted: FunnelStage;
    enrolled: FunnelStage;
  };
  metrics: {
    ltv: string;
    cac: string;
    reach: string;
  };
  chart: {
    stroke: string;
    fill: string;
    points: { cx: string; cy: string }[];
  };
}

interface RecentEnrollment {
  name: string;
  date: string;
  initial: string;
}

export default function EDUMarketingTile() {
  const [timeRange, setTimeRange] = useState<TimeRange>('quarter');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Data definitions for different time ranges
  const data: Record<TimeRange, DashboardData> = {
    month: {
      label: 'Last 30 Days',
      growth: '12%',
      netGrowth: '88%',
      totalStudents: '2.1k',
      funnel: {
        applied: { val: '85%', width: '85%' },
        admitted: { val: '42%', width: '55%' },
        enrolled: { val: '30%', width: '40%' }
      },
      metrics: { ltv: '$41.2k', cac: '3.8x', reach: 'Top 8%' },
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
      label: 'This Quarter',
      growth: '18%',
      netGrowth: '92%',
      totalStudents: '24.5k',
      funnel: {
        applied: { val: '82%', width: '82%' },
        admitted: { val: '45%', width: '55%' },
        enrolled: { val: '28%', width: '40%' }
      },
      metrics: { ltv: '$42.8k', cac: '4.2x', reach: 'Top 5%' },
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
      label: 'Year to Date',
      growth: '24%',
      netGrowth: '95%',
      totalStudents: '86.2k',
      funnel: {
        applied: { val: '78%', width: '78%' },
        admitted: { val: '40%', width: '52%' },
        enrolled: { val: '25%', width: '38%' }
      },
      metrics: { ltv: '$44.5k', cac: '4.5x', reach: 'Top 3%' },
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

  const recentEnrollments: RecentEnrollment[] = [
    { name: "Sarah Connor", date: "Oct 24", initial: "S" },
    { name: "Mike Ross", date: "Oct 23", initial: "M" },
    { name: "Jessica P.", date: "Oct 22", initial: "J" },
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
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.3 + (i * 0.1), duration: 0.5, ease: "easeOut" }
    })
  };

  const listVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.4 + (i * 0.1), duration: 0.5, ease: "easeOut" }
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full max-w-[600px] aspect-square bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 font-sans flex flex-col z-0"
    >
      {/* 1. Header Section (Top 12%) */}
      <div className="h-[72px] shrink-0 px-6 sm:px-8 flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 z-20 relative">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Strategic Overview</span>
          <h1 className="text-lg font-extrabold text-[#1e3a8a] dark:text-slate-100 leading-tight">Student Lifecycle</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          
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

          <motion.div 
            key={current.growth} // Animate on change
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold text-xs whitespace-nowrap hidden sm:flex"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            {current.growth}
          </motion.div>
          
          <button className="text-slate-400 hover:text-[#1e3a8a] dark:hover:text-blue-400 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col p-6 min-h-0 z-10 relative" 
        onClick={closeDropdown}
      >
        
        {/* 2. Hero Section: Chart (Top Half) */}
        <div className="flex-1 min-h-0 flex flex-col relative mb-4">
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-2 shrink-0">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                PROJECTED GROWTH
              </p>
            </div>
            <motion.p 
              key={current.netGrowth}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-[#065f46] dark:text-emerald-400"
            >
              {current.netGrowth} <span className="text-sm font-medium text-slate-400 dark:text-slate-500">Net</span>
            </motion.p>
          </motion.div>

          <div className="flex-1 w-full relative">
             <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
              <defs>
                <linearGradient id="growthGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              {/* Fill Area */}
              <motion.path 
                key={`fill-${timeRange}`}
                d={current.chart.fill} 
                fill="url(#growthGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
              {/* Stroke Line */}
              <motion.path 
                key={`stroke-${timeRange}`}
                d={current.chart.stroke}
                fill="none" 
                stroke="#2563eb" 
                strokeLinecap="round" 
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Data Points */}
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
                  r="6" 
                  stroke="#2563eb" 
                  strokeWidth="3" 
                />
              ))}
            </svg>
            
            {/* X-Axis Labels */}
            <div className="absolute bottom-0 w-full flex justify-between text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-1">
              <span>Y1</span>
              <span>Y2</span>
              <span>Y3</span>
              <span>Y4</span>
              <span>Y5</span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Section: Split Columns (Funnel + List) */}
        <div className="grid grid-cols-2 gap-6 shrink-0 h-[160px]">
           
           {/* Left Col: Funnel */}
           <div className="flex flex-col gap-3">
              <motion.div variants={itemVariants} className="flex justify-between items-center">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5" />
                  FUNNEL
                </p>
                <motion.p 
                  key={current.totalStudents}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-bold text-slate-700 dark:text-slate-300"
                >
                  {current.totalStudents}
                </motion.p>
              </motion.div>

              <div className="flex flex-col gap-2">
                {/* Stage 1: Applied */}
                <motion.div custom={0} variants={funnelVariants} className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-between px-3 relative overflow-hidden group">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-slate-200 dark:bg-slate-700 rounded-r-lg group-hover:brightness-95 transition-all duration-500"
                    animate={{ width: current.funnel.applied.width }}
                  ></motion.div>
                  <span className="relative z-10 text-[10px] font-bold text-slate-600 dark:text-slate-300">Applied</span>
                  <motion.span className="relative z-10 text-[10px] font-black text-slate-700 dark:text-slate-200">{current.funnel.applied.val}</motion.span>
                </motion.div>

                {/* Stage 2: Admitted */}
                <motion.div custom={1} variants={funnelVariants} className="h-10 w-[94%] self-end bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between px-3 relative overflow-hidden group">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-[#2563eb] rounded-r-lg group-hover:brightness-110 transition-all duration-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                    animate={{ width: current.funnel.admitted.width }}
                  ></motion.div>
                  <span className="relative z-10 text-[10px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors">Admitted</span>
                  <motion.span className="relative z-10 text-[10px] font-black text-slate-700 dark:text-slate-200 group-hover:text-white transition-colors">{current.funnel.admitted.val}</motion.span>
                </motion.div>

                {/* Stage 3: Enrolled */}
                <motion.div custom={2} variants={funnelVariants} className="h-10 w-[88%] self-end bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between px-3 relative overflow-hidden group">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-[#065f46] rounded-r-lg group-hover:brightness-110 transition-all duration-500 shadow-[0_0_15px_rgba(6,95,70,0.3)]"
                    animate={{ width: current.funnel.enrolled.width }}
                  ></motion.div>
                  <span className="relative z-10 text-[10px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors">Enrolled</span>
                  <motion.span className="relative z-10 text-[10px] font-black text-slate-700 dark:text-slate-200 group-hover:text-white transition-colors">{current.funnel.enrolled.val}</motion.span>
                </motion.div>
              </div>
           </div>

           {/* Right Col: Recent Enrollments */}
           <div className="flex flex-col gap-3">
              <motion.div variants={itemVariants} className="flex justify-between items-center">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5" />
                  RECENT
                </p>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live
                </span>
              </motion.div>

              <div className="flex flex-col gap-2">
                 {recentEnrollments.map((student, i) => (
                    <motion.div 
                        key={i}
                        custom={i}
                        variants={listVariants}
                        className="h-10 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[10px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                {student.initial}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[70px]">{student.name}</span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-400">{student.date}</span>
                    </motion.div>
                 ))}
             </div>
           </div>

        </div>

      </div>

      {/* 4. Footer Section (Bottom 13%) */}
      <div className="h-[80px] shrink-0 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 px-6 grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700 items-center z-10 relative">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">LTV / Student</span>
          <motion.span 
            key={`ltv-${timeRange}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-base font-bold text-slate-800 dark:text-slate-200"
          >
            {current.metrics.ltv}
          </motion.span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">CAC Eff.</span>
          <motion.span 
            key={`cac-${timeRange}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-base font-bold text-slate-800 dark:text-slate-200"
          >
            {current.metrics.cac}
          </motion.span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Reach</span>
          <motion.span 
             key={`reach-${timeRange}`}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-base font-bold text-slate-800 dark:text-slate-200"
          >
            {current.metrics.reach}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}