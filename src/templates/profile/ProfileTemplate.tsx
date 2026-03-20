'use client'

import React from 'react'
import type { ProfileContent } from '@/src/data/profile'
import HomeTemplate from '@/src/templates/home/HomeTemplate'

export interface ProfileTemplateProps {
  content: ProfileContent | null
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
}

/**
 * Shared layout for Resume and About pages.
 * Uses the same content shape as HomeTemplate (hero, stats, methodology, expertise, quote, caseStudies, founder).
 */
export default function ProfileTemplate({
  content,
  pageTitle,
  theme,
  heroVisualId,
}: ProfileTemplateProps) {
  if (!content) return null
  return (
    <HomeTemplate
      content={content}
      pageTitle={pageTitle}
      theme={theme}
      heroVisualId={heroVisualId}
    />
  )
}
