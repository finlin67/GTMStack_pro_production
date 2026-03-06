'use client'

import type { ComponentType } from 'react'
import { useEffect, useCallback } from 'react'
import { X, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/** Minimal shape the modal needs – parent passes selected animation from registry */
interface GalleryModalAnimation {
  title: string
  description: string
  marketingFunction: string
  tags: string[]
  component: ComponentType
}

interface GalleryModalProps {
  animation: GalleryModalAnimation | null
  onClose: () => void
  githubUrl?: string
}

export function GalleryModal({ animation, onClose, githubUrl }: GalleryModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleEscape])

  useEffect(() => {
    if (animation) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [animation])

  if (!animation) return null

  const Component = animation.component
  const repoUrl = githubUrl || 'https://github.com' // Placeholder – add URLs in lib/galleryGithubMap.ts

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl max-h-[90vh] rounded-[2rem] bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-slate-900/95 shrink-0">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">{animation.title}</h2>
              <p className="text-sm text-slate-400 line-clamp-2 max-w-2xl">
                {animation.description}
              </p>
            </div>
            <div className="flex items-center gap-3 ml-6">
              {repoUrl && repoUrl !== 'https://github.com' && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">View Source</span>
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all hover:rotate-90"
                aria-label="Close modal"
                title="Close (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Live animation preview */}
          <div className="flex-1 min-h-0 overflow-auto p-8 flex items-center justify-center bg-slate-950/50">
            <div className="w-full max-w-[700px] aspect-square max-h-[600px] rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden shadow-2xl">
              <Component />
            </div>
          </div>

          {/* Footer tags & metadata */}
          <div className="px-8 py-6 border-t border-white/10 bg-slate-900/95 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Category
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#24cae0]/10 border border-[#24cae0]/20 text-[#24cae0] text-xs font-bold uppercase tracking-wider">
                  {animation.marketingFunction.replace(/-/g, ' ')}
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/10" />
              <div className="flex flex-wrap gap-2 flex-1">
                {animation.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
