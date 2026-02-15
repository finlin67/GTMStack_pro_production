import type { ReactNode } from 'react'

export interface ExpertiseCategoryTemplateProps {
  /** Optional override from page registry */
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  /** Existing pillar page content (same components/markup as current routes) */
  children: ReactNode
}

/**
 * Minimal v1 template for expertise.category (pillar) pages.
 * Thin wrapper: no layout/design changes; renders the same content passed as children.
 */
export default function ExpertiseCategoryTemplate({
  children,
}: ExpertiseCategoryTemplateProps) {
  return <>{children}</>
}
