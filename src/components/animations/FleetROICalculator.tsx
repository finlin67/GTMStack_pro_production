'use client'

import React from 'react'

export default function FleetROICalculator() {
  return (
    <div className="w-full h-full min-h-[360px] rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm p-6 text-white">
      <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Preview</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">Fleet ROI Calculator</div>
      <p className="mt-3 max-w-xl text-sm text-slate-300 leading-relaxed">
        Component placeholder. This file exists to satisfy the animation registry import and to keep builds green until the
        full calculator visual is implemented.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fuel</div>
          <div className="mt-1 text-lg font-semibold">—</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Maintenance</div>
          <div className="mt-1 text-lg font-semibold">—</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Utilization</div>
          <div className="mt-1 text-lg font-semibold">—</div>
        </div>
      </div>
    </div>
  )
}

