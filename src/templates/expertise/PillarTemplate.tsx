import type { ReactNode } from 'react'

import { PILLAR_TITLES } from '@/src/templates/expertise/pillars/pillarMap'
import { PILLAR_PALETTES, type PillarId } from '@/src/data/pillars'

export interface PillarTemplateProps {
  pillarId: PillarId
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  contentKey?: string
  children: ReactNode
}

/**
 * Shared layout shell for pillar \"category\" pages.
 *
 * It applies a consistent background + color palette per pillar and
 * renders the existing page content (`children`) inside. This keeps
 * routing and legacy markup intact while centralizing theming logic.
 */
export default function PillarTemplate({
  pillarId,
  pageTitle,
  children,
}: PillarTemplateProps) {
  const palette = PILLAR_PALETTES[pillarId]
  const title = PILLAR_TITLES[pillarId]

  const effectiveTitle = pageTitle || `${title} | GTMStack.pro`

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{
        backgroundColor: palette.background,
        backgroundImage: `radial-gradient(circle at top, ${palette.secondary}0d, transparent 60%), radial-gradient(circle at bottom, ${palette.primary}12, transparent 55%)`,
      }}
    >
      {/* Simple header band so pillar pages feel cohesive.
          The inner content (children) can still render its own nav/hero. */}
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Expertise Pillar
            </span>
            <span className="text-sm font-semibold text-slate-100">{title}</span>
          </div>
          <span
            className="h-8 w-8 rounded-full border border-white/20 shadow-[0_0_18px_rgba(148,163,184,0.35)]"
            style={{
              background: `conic-gradient(from 160deg, ${palette.primary}, ${palette.secondary})`,
            }}
            aria-hidden="true"
          />
        </div>
      </header>

      <main aria-label={effectiveTitle}>{children}</main>
    </div>
  )
}

