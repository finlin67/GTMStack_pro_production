'use client'

import { useState, useMemo } from 'react'
import { ANIMATION_REGISTRY } from '@/src/data/animations'
import { getGithubUrl } from '@/lib/galleryGithubMap'
import { GalleryModal } from '@/components/gallery/GalleryModal'
import Uploaded_AnimationGallery_v1 from '@/src/templates/Uploaded_AnimationGallery_v1'
import { adaptGalleryData } from '@/lib/gallery-adapter'

export interface GalleryMainContent {
  hero: {
    title: string
    subtitle: string
    ctaLabel: string
    ctaHref: string
  }
  intro?: string
}

export interface GalleryMainTemplateProps {
  content : GalleryMainContent | null
  pageTitle?: string
  theme?: string
  heroVisualId?: string
}

export default function GalleryMainTemplate({
  content,
}: GalleryMainTemplateProps) {
  const hero = content?.hero ?? {
    title: 'Animation Gallery',
    subtitle:
      'Explore 50+ marketing dashboard animations. Built with React, Framer Motion, and Tailwind.',
    ctaLabel: 'Request custom animations',
    ctaHref: '/contact',
  }

  // Modal state management
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedAnimation = useMemo(
    () => ANIMATION_REGISTRY.find((a) => a.id === selectedId) ?? null,
    [selectedId]
  )

  // Adapt data for uploaded template
  const galleryContent = adaptGalleryData(ANIMATION_REGISTRY, hero)

  // Handle card click to open modal
  const handleCardClick = (cardId: string | number) => {
    setSelectedId(String(cardId))
  }

  return (
    <>
      {/* Render uploaded template */}
      <Uploaded_AnimationGallery_v1 
        content={galleryContent} 
        pageTitle="Animation Gallery"
        onCardClick={handleCardClick}
      />

      {/* Modal (managed separately) */}
      <GalleryModal
        animation={selectedAnimation}
        onClose={() => setSelectedId(null)}
        githubUrl={selectedId ? getGithubUrl(selectedId) : undefined}
      />
    </>
  )
}
