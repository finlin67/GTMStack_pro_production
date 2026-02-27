'use client'

import React, { useState, useEffect } from 'react'

type AdminGateProps = {
  children: React.ReactNode
}

export default function AdminGate({ children }: AdminGateProps) {
  const [status, setStatus] = useState<'loading' | 'unauthenticated' | 'authenticated'>('loading')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => (r.ok ? setStatus('authenticated') : setStatus('unauthenticated')))
      .catch(() => setStatus('unauthenticated'))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then((r) => {
        if (r.ok) setStatus('authenticated')
        else return r.json().then((d) => { setError(d.error || 'Invalid password'); setStatus('unauthenticated') })
      })
      .catch(() => { setError('Request failed'); setSubmitting(false) })
      .finally(() => setSubmitting(false))
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0F2D] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#36C0CF]/40 border-t-[#36C0CF] rounded-full animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#0A0F2D] flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-xl border border-slate-700 bg-[#1E2A5E]/80 p-8 shadow-xl"
        >
          <h1 className="text-xl font-bold text-white mb-2">Admin</h1>
          <p className="text-slate-400 text-sm mb-6">Enter password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-[#0A0F2D] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] focus:border-transparent outline-none"
            autoFocus
          />
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full py-3 rounded-lg bg-[#2463EB] hover:bg-[#1E5CB8] text-white font-semibold disabled:opacity-50 transition-colors"
          >
            {submitting ? 'Checking…' : 'Continue'}
          </button>
        </form>
      </div>
    )
  }

  return <>{children}</>
}
