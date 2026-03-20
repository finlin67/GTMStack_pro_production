import type { ReactNode } from 'react'
import type { PillarId } from './pillars/pillarMap'
import PillarTemplate from './PillarTemplate'

export interface ExpertiseCategoryTemplateProps {
  /** Optional override from page registry */
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  contentKey?: string
  /** Pillar ID for per-pillar template dispatch */
  pillarId: PillarId
  /** Existing pillar page content (same components/markup as current routes) */
  children: ReactNode
}

/**
 * Dispatches to per-pillar category template by pillarId.
 * Placeholder pillar templates render children; will be replaced with custom designs.
 */
export default function ExpertiseCategoryTemplate({
  pillarId,
  children,
  pageTitle,
  theme,
  heroVisualId,
  contentKey,
}: ExpertiseCategoryTemplateProps) {
  return (
    <PillarTemplate
      pillarId={pillarId}
      pageTitle={pageTitle}
      theme={theme}
      heroVisualId={heroVisualId}
      contentKey={contentKey}
    >
      {children}
    </PillarTemplate>
  )
}

