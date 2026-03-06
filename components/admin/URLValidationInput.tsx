'use client'

import React from 'react'
import { Loader2, CheckCircle, AlertCircle, XCircle, AlertTriangle } from 'lucide-react'
import { type ValidationState } from '@/lib/route-validation'

interface URLValidationInputProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  label?: string
  validationState: ValidationState
  isValid: boolean
  error?: string
  suggestion?: string
  disabled?: boolean
}

export default function URLValidationInput({
  value,
  onChange,
  onBlur,
  placeholder = '/expertise/video-marketing',
  label = 'Page URL / Route',
  validationState,
  isValid,
  error,
  suggestion,
  disabled = false,
}: URLValidationInputProps) {
  const getBorderClass = () => {
    switch (validationState) {
      case 'invalid':
        return 'border-red-500/50 focus:ring-red-500/50'
      case 'found':
        return 'border-green-500/50 focus:ring-green-500/50'
      case 'not-found':
        return 'border-amber-500/50 focus:ring-amber-500/50'
      case 'checking':
        return 'border-blue-500/50 focus:ring-blue-500/50'
      default:
        return 'border-slate-700'
    }
  }

  const getPillContent = () => {
    switch (validationState) {
      case 'checking':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 text-blue-300 text-sm font-medium">
            <Loader2 size={16} className="animate-spin" />
            <span>Checking registry…</span>
          </div>
        )
      case 'invalid':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-900/30 text-red-300 text-sm font-medium">
            <XCircle size={16} />
            <span>{error || 'Invalid format'}</span>
          </div>
        )
      case 'found':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/30 text-green-300 text-sm font-medium">
            <CheckCircle size={16} />
            <span>Page found in registry</span>
          </div>
        )
      case 'not-found':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-900/30 text-yellow-300 text-sm font-medium">
            <AlertTriangle size={16} />
            <span>Not in registry yet</span>
          </div>
        )
      default:
        return null
    }
  }

  const getSuggestionContent = () => {
    if (!suggestion) return null

    switch (validationState) {
      case 'invalid':
        return (
          <div className="flex items-start gap-2 text-red-300 text-sm">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
              <p className="text-red-200/70 text-xs mt-1">{suggestion}</p>
            </div>
          </div>
        )
      case 'found':
        return (
          <div className="flex items-start gap-2 text-green-300 text-sm">
            <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{suggestion}</p>
            </div>
          </div>
        )
      case 'not-found':
        return (
          <div className="flex items-start gap-2 text-yellow-300 text-sm">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{suggestion}</p>
              <p className="text-yellow-200/70 text-xs mt-1">You can add this page by registering it with a template.</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl bg-[#1E2A5E] border ${getBorderClass()} text-white placeholder-slate-500 focus:ring-2 focus:outline-none text-base transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      />

      {/* Status pill */}
      {getPillContent() && <div className="flex justify-start">{getPillContent()}</div>}

      {/* Helper text / suggestion */}
      {getSuggestionContent() && <div className="pt-1">{getSuggestionContent()}</div>}

      {/* Empty state hint */}
      {validationState === 'empty' && value === '' && (
        <p className="text-xs text-slate-500">
          Enter a page path like <code className="bg-slate-900/60 px-1.5 py-0.5 rounded text-[#36C0CF]">/expertise/video-marketing</code> or a full URL.
        </p>
      )}
    </div>
  )
}
