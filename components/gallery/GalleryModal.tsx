'use client'

import type { ComponentType } from 'react'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Github, BookOpenText, Clipboard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PreviewDecision } from '@/src/lib/galleryPreviewPolicy'
import { resolvePreviewDecision } from '@/src/lib/galleryPreviewPolicy'

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
  previewDecision?: PreviewDecision | null
  manifest?: {
    id: string
    title: string
    summary?: string | null
    category: string
    tags: string[]
    githubUrl: string
    githubReadmeUrl?: string
    updatedAt?: string | null
    thumbnailUrl?: string
    entryHtml?: string
  }
}

export function GalleryModal({
  animation,
  onClose,
  previewDecision,
  manifest,
}: GalleryModalProps) {
  const [copied, setCopied] = useState(false)

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
    if (animation || manifest) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [animation, manifest])

  if (!animation && !manifest) return null

  const Component = animation?.component
  const repoUrl = manifest?.githubUrl || 'https://github.com'
  const readmeUrl = manifest?.githubReadmeUrl

  const displayTitle = manifest?.title || animation?.title || 'Animation preview'
  const displaySummary =
    manifest?.summary || animation?.description || 'Preview and metadata for this animation.'
  const categoryLabel =
    manifest?.category || animation?.marketingFunction.replace(/-/g, ' ') || 'Uncategorized'

  const entryHtmlSrc = manifest?.entryHtml
    ? `/${String(manifest.entryHtml).replace(/^\/+/, '')}`
    : null
  const resolvedPreviewDecision =
    previewDecision ??
    resolvePreviewDecision({
      hasMappedComponent: !!Component,
      entryHtml: entryHtmlSrc,
      thumbnailUrl: manifest?.thumbnailUrl,
    })
  const displayTags = (
    manifest?.tags && manifest.tags.length ? manifest.tags : animation?.tags || []
  ).slice(0, 6)

  const handleCopyLink = async () => {
    if (!repoUrl || repoUrl === 'https://github.com') return
    try {
      await navigator.clipboard?.writeText(repoUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Swallow errors silently; copying is a convenience.
    }
  }

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
              <h2 className="text-2xl font-bold text-white mb-1">{displayTitle}</h2>
              <p className="text-sm text-slate-400 line-clamp-2 max-w-2xl">
                {displaySummary}
              </p>
            </div>
            <div className="flex items-center gap-3 ml-6">
              {repoUrl && repoUrl !== 'https://github.com' && (
                <>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">View Files on GitHub</span>
                  </a>
                  {readmeUrl && (
                    <a
                      href={readmeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/15 hover:bg-white/10 text-white text-xs font-semibold transition-all"
                    >
                      <BookOpenText className="w-4 h-4" />
                      <span className="hidden sm:inline">Open README</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-medium transition-all"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy GitHub Link'}</span>
                  </button>
                </>
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

          {/* Live animation preview or fallback */}
          <div className="flex-1 min-h-0 overflow-auto p-8 flex items-center justify-center bg-slate-950/50">
            <div className="w-full max-w-[700px] aspect-square max-h-[600px] rounded-2xl border border-white/10 bg-slate-900/80 overflow-hidden shadow-2xl flex items-center justify-center relative">
              {/* Deterministic fallback strategy:
                  live component > iframe > thumbnail > explicit fallback message */}
              {resolvedPreviewDecision.mode === 'live-component' && Component ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Component />
                </div>
              ) : resolvedPreviewDecision.mode === 'iframe-entry-html' && entryHtmlSrc ? (
                <iframe
                  src={entryHtmlSrc}
                  title={displayTitle}
                  className="w-full h-full relative z-10"
                  style={{ border: 'none' }}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              ) : resolvedPreviewDecision.mode === 'thumbnail-fallback' && manifest?.thumbnailUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Image
                    src={manifest.thumbnailUrl}
                    alt={manifest.title}
                    width={700}
                    height={700}
                    className="w-full h-full object-contain relative z-10"
                    priority
                  />
                  <div className="absolute z-20 bottom-8 left-8 right-8 text-center pointer-events-none">
                    <div className="inline-block px-4 py-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl">
                      <p className="text-xs text-slate-300">
                        Interactive preview not available. View source on GitHub for full implementation.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center px-8">
                  <p className="text-sm text-slate-300 mb-2">Preview coming soon</p>
                  <p className="text-xs text-slate-500 max-w-sm">
                    The live animation preview for this entry isn&apos;t available yet, but you can
                    view the source files and README on GitHub using the buttons above.
                  </p>
                </div>
              )}
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
                  {categoryLabel}
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/10" />
              <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                {resolvedPreviewDecision.mode}
              </span>
              <div className="flex flex-wrap gap-2 flex-1">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {manifest?.updatedAt && (
                <div className="text-[11px] text-slate-500 ml-auto">
                  Last updated:{' '}
                  {new Date(manifest.updatedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
