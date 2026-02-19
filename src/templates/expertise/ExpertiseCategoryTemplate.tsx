import type { ReactNode } from 'react'
import {
  getPillarCategoryComponent,
  type PillarId,
} from './pillars/pillarMap'

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
}: ExpertiseCategoryTemplateProps) {
  const PillarComponent = getPillarCategoryComponent(pillarId)
  return (
    <PillarComponent pillarId={pillarId}>
      {children}
    </PillarComponent>
  )
}
