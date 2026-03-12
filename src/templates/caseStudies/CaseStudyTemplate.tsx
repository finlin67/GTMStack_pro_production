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
 * Wraps children to provide consistent layout theming.
 */
export default function CaseStudyTemplate({
  children = null,
}: CaseStudyTemplateProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {children}
    </div>
  )
}
