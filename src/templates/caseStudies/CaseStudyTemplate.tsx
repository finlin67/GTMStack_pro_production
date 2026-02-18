import type { ReactNode } from 'react'

export interface CaseStudyTemplateProps {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  /** Existing case study page content (same components/markup as app/case-studies/[slug]) */
  children?: ReactNode
}

/**
 * Minimal v1 template for caseStudy.base pages.
 * Thin wrapper: no layout/design changes; renders the same content passed as children.
 */
export default function CaseStudyTemplate({
  children = null,
}: CaseStudyTemplateProps) {
  return <>{children}</>
}
