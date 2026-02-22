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
          className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/95 shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-white">{animation.title}</h2>
              <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">
                {animation.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Live animation preview */}
          <div className="flex-1 min-h-0 overflow-auto p-6 flex items-center justify-center bg-slate-950/50">
            <div className="w-full max-w-[600px] aspect-square max-h-[500px] rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden shadow-xl">
              <Component />
            </div>
          </div>

          {/* Footer tags */}
          <div className="px-6 py-4 border-t border-white/10 bg-slate-900/95 shrink-0">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {animation.marketingFunction.replace(/-/g, ' ')}
              </span>
              {animation.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md bg-white/5 text-slate-300 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
