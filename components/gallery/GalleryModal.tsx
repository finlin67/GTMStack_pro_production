'use client'

import type { ComponentType } from 'react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, Github, BookOpenText, Clipboard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PreviewDecision } from '@/src/lib/galleryPreviewPolicy'
import { resolvePreviewDecision } from '@/src/lib/galleryPreviewPolicy'

const NATIVE_WIDTH = 960
const NATIVE_HEIGHT = 640

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
  const [zoomMode, setZoomMode] = useState<'fit' | '1:1'>('fit')
  const [zoomValue, setZoomValue] = useState(100)
  const [wrapperOverflow, setWrapperOverflow] = useState<'hidden' | 'auto'>('hidden')

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const previewWrapperRef = useRef<HTMLDivElement>(null)

  // ── Escape key ──────────────────────────────────────────────────────────────
  const handleEscape = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleEscape])

  // ── Body scroll lock ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (animation || manifest) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [animation, manifest])

  // ── Derived display values ───────────────────────────────────────────────────
  const Component = animation?.component
  const repoUrl = manifest?.githubUrl || 'https://github.com'
  const readmeUrl = manifest?.githubReadmeUrl
  const displayTitle = manifest?.title || animation?.title || 'Animation preview'
  const displaySummary =
    manifest?.summary || animation?.description || 'Preview and metadata for this animation.'
  const categoryLabel =
    manifest?.category || animation?.marketingFunction?.replace(/-/g, ' ') || 'Uncategorized'
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
    manifest?.tags?.length ? manifest.tags : animation?.tags || []
  ).slice(0, 6)

  const isIframeMode =
    resolvedPreviewDecision.mode === 'iframe-entry-html' && !!entryHtmlSrc

  // ── CSS zoom DOM manipulation ────────────────────────────────────────────────
  const applyZoom = useCallback((value: number) => {
    const iframe = iframeRef.current
    if (!iframe) return
    const nativeWidth = Number(iframe.dataset.nativeWidth) || NATIVE_WIDTH

    // Apply CSS zoom directly on the element
    ;(iframe.style as CSSStyleDeclaration & { zoom: string }).zoom = String(value / 100)

    if (value < 100) {
      // Expand iframe width so that after zoom it fills the native width.
      // Center it via left: 50% + negative marginLeft.
      const expandedWidth = nativeWidth / (value / 100)
      iframe.style.width = expandedWidth + 'px'
      iframe.style.left = '50%'
      iframe.style.marginLeft = -(expandedWidth / 2) + 'px'
      setWrapperOverflow('hidden')
    } else {
      // At 100 %+ zoom, keep iframe at native width, allow horizontal scroll
      iframe.style.width = nativeWidth + 'px'
      iframe.style.left = '50%'
      iframe.style.marginLeft = -(nativeWidth / 2) + 'px'
      setWrapperOverflow('auto')
    }
  }, [])

  // Re-apply whenever zoomValue changes
  useEffect(() => {
    applyZoom(zoomValue)
  }, [zoomValue, applyZoom])

  // Auto-fit on initial iframe mount / src change
  useLayoutEffect(() => {
    if (!isIframeMode) return
    const wrapper = previewWrapperRef.current
    if (!wrapper) return
    const fitScale = Math.min(100, Math.max(40,
      Math.floor((wrapper.clientWidth / NATIVE_WIDTH) * 100)
    ))
    setZoomMode('fit')
    setZoomValue(fitScale)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryHtmlSrc])

  // ── Zoom controls ────────────────────────────────────────────────────────────
  const handleFit = useCallback(() => {
    const wrapper = previewWrapperRef.current
    const iframe = iframeRef.current
    if (!wrapper) return
    const nativeWidth = iframe
      ? (Number(iframe.dataset.nativeWidth) || NATIVE_WIDTH)
      : NATIVE_WIDTH
    const fitScale = Math.min(100, Math.max(40,
      Math.floor((wrapper.clientWidth / nativeWidth) * 100)
    ))
    setZoomMode('fit')
    setZoomValue(fitScale)
  }, [])

  const handle1to1 = useCallback(() => {
    setZoomMode('1:1')
    setZoomValue(100)
  }, [])

  const handleSlider = useCallback((value: number) => {
    setZoomValue(value)
    // Keep whichever mode label is active; slider is mode-agnostic
  }, [])

  // ── Copy link ────────────────────────────────────────────────────────────────
  const handleCopyLink = async () => {
    if (!repoUrl || repoUrl === 'https://github.com') return
    try {
      await navigator.clipboard?.writeText(repoUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* non-critical */ }
  }

  if (!animation && !manifest) return null

  // ── Button class helpers ─────────────────────────────────────────────────────
  const actionBtnClass =
    'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F9FAFB] text-[#374151] text-sm font-semibold border border-[#D1D5DB] transition-all hover:scale-105'
  const actionBtnSmClass =
    'inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white hover:bg-[#F9FAFB] text-[#374151] text-xs font-semibold border border-[#D1D5DB] transition-all'
  const zoomBtnClass = (active: boolean) =>
    `px-2.5 py-1 rounded border text-[11px] font-semibold transition-colors ${
      active
        ? 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]'
        : 'bg-white text-[#6B7280] border-[#D1D5DB] hover:bg-[#F9FAFB]'
    }`

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
          className="relative w-full max-w-6xl max-h-[90vh] rounded-[2rem] bg-white border border-black/10 shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── Header ─────────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E7EB] bg-[#F8F9FB] shrink-0">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#0F172A] mb-1">{displayTitle}</h2>
              <p className="text-sm text-[#475569] line-clamp-2 max-w-2xl">{displaySummary}</p>
            </div>
            <div className="flex items-center gap-3 ml-6">
              {repoUrl && repoUrl !== 'https://github.com' && (
                <>
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={actionBtnClass}
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">View Files on GitHub</span>
                  </a>
                  {readmeUrl && (
                    <a
                      href={readmeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionBtnSmClass}
                    >
                      <BookOpenText className="w-4 h-4" />
                      <span className="hidden sm:inline">Open README</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={actionBtnSmClass}
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy GitHub Link'}</span>
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-gray-100 text-[#6B7280] hover:text-[#111827] transition-all hover:rotate-90"
                aria-label="Close modal"
                title="Close (ESC)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* ── Zoom control bar (only for iframe previews) ─────────────────────── */}
          {isIframeMode && (
            <div
              className="flex items-center gap-3 shrink-0 bg-[#F8F9FB]"
              style={{
                padding: '10px 20px',
                borderTop: '1px solid #E5E7EB',
                borderBottom: '1px solid #E5E7EB',
              }}
            >
              <button
                type="button"
                onClick={handleFit}
                className={zoomBtnClass(zoomMode === 'fit')}
              >
                Fit
              </button>
              <button
                type="button"
                onClick={handle1to1}
                className={zoomBtnClass(zoomMode === '1:1')}
              >
                1:1
              </button>

              {/* Divider */}
              <div style={{ width: 1, height: 16, background: '#E5E7EB', flexShrink: 0 }} />

              <input
                type="range"
                min={40}
                max={150}
                value={zoomValue}
                onChange={(e) => handleSlider(Number(e.target.value))}
                className="accent-[#0EA5E9]"
                style={{ minWidth: 120, flex: 1 }}
                aria-label="Zoom level"
              />

              <span
                style={{
                  minWidth: 44,
                  textAlign: 'right',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#374151',
                }}
              >
                {zoomValue}%
              </span>
            </div>
          )}

          {/* ── Preview zone ────────────────────────────────────────────────────── */}
          <div className="flex-1 min-h-0 shrink-0" style={{ height: 480 }}>
            <div
              ref={previewWrapperRef}
              style={{
                position: 'relative',
                overflow: isIframeMode ? wrapperOverflow : 'hidden',
                width: '100%',
                height: '100%',
                background: '#071018',
              }}
            >
              {/* 1:1 scroll hint — right-edge fade overlay */}
              {isIframeMode && zoomMode === '1:1' && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 48,
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.3))',
                    pointerEvents: 'none',
                    zIndex: 5,
                  }}
                />
              )}

              {/* Size badge — top-right corner */}
              {isIframeMode && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 12,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.45)',
                    fontFamily: 'ui-monospace, monospace',
                    letterSpacing: '0.04em',
                  }}>
                    {NATIVE_WIDTH} × {NATIVE_HEIGHT}
                  </span>
                </div>
              )}

              {/* ── Content — deterministic fallback chain ──────────────────────── */}
              {resolvedPreviewDecision.mode === 'live-component' && Component ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Component />
                </div>

              ) : resolvedPreviewDecision.mode === 'iframe-entry-html' && entryHtmlSrc ? (
                <iframe
                  ref={iframeRef}
                  src={entryHtmlSrc}
                  title={displayTitle}
                  data-native-width={NATIVE_WIDTH}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    marginLeft: -(NATIVE_WIDTH / 2),
                    width: NATIVE_WIDTH,
                    height: '100%',
                    border: 'none',
                    transformOrigin: 'top center',
                  }}
                />

              ) : resolvedPreviewDecision.mode === 'thumbnail-fallback' && manifest?.thumbnailUrl ? (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <Image
                    src={manifest.thumbnailUrl}
                    alt={manifest.title}
                    width={NATIVE_WIDTH}
                    height={NATIVE_HEIGHT}
                    className="w-full h-full object-contain"
                    priority
                  />
                  <div className="absolute bottom-6 left-6 right-6 text-center pointer-events-none z-10">
                    <div className="inline-block px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 shadow-xl">
                      <p className="text-xs text-slate-300">
                        Interactive preview not available. View source on GitHub for full implementation.
                      </p>
                    </div>
                  </div>
                </div>

              ) : (
                <div className="flex flex-col items-center justify-center text-center px-8 h-full">
                  <p className="text-sm text-slate-300 mb-2">Preview coming soon</p>
                  <p className="text-xs text-slate-500 max-w-sm">
                    The live animation preview for this entry isn&apos;t available yet. View the
                    source files and README on GitHub using the buttons above.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Footer tags & metadata ───────────────────────────────────────────── */}
          <div className="px-8 py-5 border-t border-[#E5E7EB] bg-[#F1F5F9] shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">
                  Category
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#CCFBF1] border border-[#CCFBF1] text-[#0F766E] text-xs font-bold uppercase tracking-wider">
                  {categoryLabel}
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-[#E5E7EB]" />
              <span className="px-2.5 py-1 rounded-md border border-[#E5E7EB] bg-white text-[10px] font-semibold uppercase tracking-wider text-[#334155]">
                {resolvedPreviewDecision.mode}
              </span>
              <div className="flex flex-wrap gap-2 flex-1">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#F1F5F9] border border-[#E5E7EB] text-[#334155] text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {manifest?.updatedAt && (
                <div className="text-[11px] text-[#94A3B8] ml-auto">
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
