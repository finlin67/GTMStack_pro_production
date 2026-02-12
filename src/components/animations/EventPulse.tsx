
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Rocket, 
    UserCheck, 
    Users, 
    Share2, 
    BadgeDollarSign 
} from 'lucide-react';

export default function EventPulse() {
  return (
    <div className="relative w-full aspect-square max-w-[600px] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl mx-auto xl:mx-0 flex flex-col justify-between p-8">
      {/* --- Background Effects --- */}
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-600/10 pointer-events-none"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* --- Visual Connections (SVG Lines) --- */}
      <div className="absolute inset-0 pointer-events-none">
         <svg className="w-full h-full p-20 z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* The Curve */}
            <motion.path 
                d="M10,80 Q50,90 90,80 T90,20 Q50,10 10,20" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.5"
                strokeDasharray="2 2"
            />
            {/* Animated dashed line flowing */}
            <motion.path 
                d="M10,80 Q50,90 90,80 T90,20 Q50,10 10,20" 
                fill="none" 
                stroke="rgba(34, 211, 238, 0.4)" 
                strokeWidth="0.5"
                strokeDasharray="5 5"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Static Nodes on Curve */}
            <circle cx="20" cy="50" fill="rgba(37,106,244,0.4)" r="1.5" />
            <circle cx="50" cy="20" fill="rgba(37,106,244,0.4)" r="1.5" />
            <circle cx="80" cy="50" fill="rgba(37,106,244,0.4)" r="1.5" />
         </svg>
      </div>

      {/* Vertical/Horizontal Connecting Beams */}
      <motion.div 
        className="absolute top-1/4 left-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent pointer-events-none"
        animate={{ height: ['0%', '40%', '0%'], opacity: [0, 1, 0], top: ['20%', '25%', '30%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none"
        animate={{ width: ['0%', '40%', '0%'], opacity: [0, 1, 0], right: ['20%', '25%', '30%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* --- Center Piece: Rocket Node --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
         {/* Outer Orbit Ring */}
        <motion.div 
            className="size-48 rounded-full border border-cyan-500/10 absolute"
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
        />
        
        {/* Glowing Container */}
        <motion.div 
            className="size-32 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center relative"
            style={{ boxShadow: '0 0 40px 10px rgba(34, 211, 238, 0.1)' }}
            animate={{ boxShadow: ['0 0 40px 10px rgba(34, 211, 238, 0.1)', '0 0 60px 15px rgba(34, 211, 238, 0.2)', '0 0 40px 10px rgba(34, 211, 238, 0.1)'] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <motion.div 
                className="size-20 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.6)] z-10"
                whileHover={{ scale: 1.1 }}
            >
                <Rocket className="text-slate-950 w-10 h-10 fill-current" />
            </motion.div>
            
            {/* Inner Ping Effect */}
            <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/30"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>

        {/* Label */}
        <motion.div 
            className="mt-6 px-4 py-1.5 bg-slate-900/80 backdrop-blur-md border border-cyan-400/30 rounded-full z-20"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Pipeline Impact</p>
        </motion.div>
      </div>

      {/* --- Floating Avatars --- */}
      <FloatingAvatar 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuATU9aMl4k-JgwZgiGyiYS_ByniYBj9kwcFgFkK84G8e_aI6oviR6sIaBa9T27OdZX53BUL1ZjD1NsNs26nvcOUba52mccW45xo2Jmawj36qcnAMtIQoAxRjmYbo15f5cy4YMKVD97PcXquP2tRSj3hfgKPN6xg8K4CNblIEsgnS7VAjXQwx1ljwVQbs6vg01dGTnat3R-QyNbcN2FCbSahPWgdEdXoe22d7v_i1s3wryi2QDJlQ1KqlnGAq2Rs5RUzcjw3FKJ4XAr7" 
        className="top-[30%] left-[25%] border-primary shadow-primary/20 size-8"
        delay={0}
      />
      <FloatingAvatar 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8zgEg8uRMltMAVAKnB1RXBum2jEfGdnIMc4PNm1JmoJGcbLHq4L7gY2DISFPXZofeWyeguIVE3IhuCEl0hHtYlQiBpjSlpMXnffYyLS8RV8oiWCP4uylbHQPqD53D-tYvYdgXHpZ9Ne-HDSrplGNe86bO5q8MnpaU-DbeEFVVk3TmofJ2lAqPy21tC3NRnqfTW6W0YCajrptIUEK78otNyQlC1AdKkNQz8641SFiOIsOzef-3bpNjMf7NY1dBpP5MvQAyRqnzEACi" 
        className="top-[70%] left-[65%] border-purple-500 shadow-purple-500/20 size-10"
        delay={1.5}
      />
      <FloatingAvatar 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyXbteQBYUXVrhBmBNbx0tKzKDqanBXkCjnboJSP0lP2_mV6fC0OEUKRIcu69Uf9a29F8c9uxGrwK-0GTvEcMmu4dRimX8o5EQiQLdBIi0266MklFZVY0gvIjn95A10h2yx4aQfiVRe5jI9pstjn0cOZc6No3jsLOdy5XNkDn_nQMEVLxuJf3B3mNx8fenv20kgAH7XURlKL7WQdT4rkusOCeTTQEXW_t5lkiQgF_zgsVPfYVw8Km95au9bhTxaoJJH4aRbMWtspM2" 
        className="top-[45%] right-[15%] border-cyan-400 shadow-cyan-400/20 size-7"
        delay={0.8}
      />


      {/* --- Four Corner Panels --- */}
      <div className="flex justify-between items-start z-20">
        {/* Top Left: Registration */}
        <InfoPanel 
            icon={<UserCheck size={14} className="text-blue-400" />}
            label="Registration"
            value="4.2k"
            subtext="+18% vs prev."
            subtextClass="text-[#0bda5e]"
            delay={0.2}
        />
        
        {/* Top Right: Attendance */}
        <InfoPanel 
            icon={<Users size={14} className="text-purple-400" />}
            label="Attendance"
            value="82%"
            delay={0.4}
        >
             <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                <motion.div 
                    className="bg-purple-400 h-full" 
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                />
            </div>
        </InfoPanel>
      </div>

      <div className="flex justify-between items-end z-20">
        {/* Bottom Left: Networking */}
        <InfoPanel 
            icon={<Share2 size={14} className="text-cyan-400" />}
            label="Networking"
            value="12k+"
            subtext="Connections formed"
            subtextClass="text-[#9ca6ba]"
            delay={0.6}
        />

        {/* Bottom Right: Pipeline */}
        <InfoPanel 
            icon={<BadgeDollarSign size={14} className="text-green-400" />}
            label="Pipeline"
            value="$1.2M"
            subtext="+38% Lift"
            subtextClass="text-cyan-400 font-bold"
            delay={0.8}
        />
      </div>

    </div>
  );
}

// --- Subcomponents for cleaner code ---

interface FloatingAvatarProps {
  src: string;
  className: string;
  delay: number;
}

function FloatingAvatar({ src, className, delay }: FloatingAvatarProps) {
    return (
        <motion.div 
            className={`absolute rounded-full border-2 overflow-hidden shadow-lg z-10 ${className}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -15, 0],
            }}
            transition={{ 
                scale: { duration: 0.5, delay },
                opacity: { duration: 0.5, delay },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay } // Floating effect
            }}
        >
            <img className="w-full h-full object-cover" src={src} alt="Avatar" />
        </motion.div>
    );
}

interface InfoPanelProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  subtextClass?: string;
  children?: React.ReactNode;
  delay: number;
}

function InfoPanel({ 
    icon, 
    label, 
    value, 
    subtext, 
    subtextClass, 
    children,
    delay 
}: InfoPanelProps) {
    return (
        <motion.div 
            className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 max-w-[140px] w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.3)" }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="flex items-center gap-2 mb-1">
                {icon}
                <p className="text-white text-[10px] font-bold uppercase tracking-tighter">{label}</p>
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
            {subtext && <p className={`text-[10px] font-medium ${subtextClass}`}>{subtext}</p>}
            {children}
        </motion.div>
    );
}
