'use client'

import React from 'react'
import { X } from 'lucide-react'

export type WizardStep = { id: string; title: string; description?: string }

type WizardModalProps = {
  title: string
  steps: WizardStep[]
  currentStepIndex: number
  onClose: () => void
  onBack: () => void
  onNext: () => void
  canGoNext: boolean
  nextLabel?: string
  isSubmitting?: boolean
  children: React.ReactNode
}

export default function WizardModal({
  title,
  steps,
  currentStepIndex,
  onClose,
  onBack,
  onNext,
  canGoNext,
  nextLabel = 'Next',
  isSubmitting = false,
  children,
}: WizardModalProps) {
  const isLast = currentStepIndex === steps.length - 1
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-700 bg-[#0A0F2D] shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wizard-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 id="wizard-title" className="text-lg font-bold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-3">
          <div className="flex gap-1 mb-2">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= currentStepIndex ? 'bg-[#36C0CF]' : 'bg-slate-700'
                }`}
                title={step.title}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex].title}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-slate-700 bg-slate-900/30">
          <button
            type="button"
            onClick={onBack}
            disabled={currentStepIndex === 0 || isSubmitting}
            className="px-4 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-white/5 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext || isSubmitting}
            className="px-5 py-2.5 rounded-lg bg-[#36C0CF] hover:bg-[#00A8A8] text-white font-semibold disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating…
              </>
            ) : isLast ? (
              'Confirm & run'
            ) : (
              nextLabel
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
