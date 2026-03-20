'use client'

import { useMemo, useState } from 'react'
import { ANIMATION_REGISTRY } from '@/src/data/animations'
import { GalleryModal } from '@/components/gallery/GalleryModal'
import type { GalleryItem } from '@/src/lib/galleryManifest'
import { StitchGalleryShell } from '@/components/gallery/StitchGalleryShell.client'
import { resolveRegistryIdForManifestItem } from '@/src/lib/galleryAnimationMap'

export interface GalleryMainContent {
  hero: {
    title: string
    subtitle: string
    ctaLabel: string
    ctaHref: string
  }
  intro?: string
}

// Lightweight client-side copy of the server GalleryItem shape
export type GalleryItemClient = Pick<
  GalleryItem,
  | 'id'
  | 'slug'
  | 'animationId'
  | 'title'
  | 'summary'
  | 'category'
  | 'tags'
  | 'thumbnailUrl'
  | 'githubUrl'
  | 'githubReadmeUrl'
  | 'updatedAt'
>

export interface GalleryMainTemplateProps {
  content: GalleryMainContent | null
  pageTitle?: string
  theme?: string
  heroVisualId?: string
  /** Items derived from gallery-manifest.json, injected by the server wrapper. */
  initialItems?: GalleryItemClient[]
}

export default function GalleryMainTemplate({
  content,
  initialItems,
}: GalleryMainTemplateProps) {
  const hero = useMemo(
    () =>
      content?.hero ?? {
        title: 'Animation Gallery',
        subtitle:
          'Explore 50+ marketing dashboard animations. Built with React, Framer Motion, and Tailwind.',
        ctaLabel: 'Request custom animations',
        ctaHref: '/contact',
      },
    [content]
  )

  const items = useMemo(() => initialItems ?? [], [initialItems])

  // Modal state management
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedRegistryId = useMemo(() => {
    if (!selectedId) return null
    const item = items.find((i) => i.id === selectedId)
    if (!item) return null
    return resolveRegistryIdForManifestItem(item)
  }, [items, selectedId])

  const selectedAnimation = useMemo(
    () => ANIMATION_REGISTRY.find((a) => a.id === selectedRegistryId) ?? null,
    [selectedRegistryId]
  )

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  )

  const handleSelect = (id: string) => setSelectedId(id)

  return (
    <>
      {items.length > 0 ? (
        <StitchGalleryShell
          items={items.map((i) => ({
            id: i.id,
            title: i.title,
            summary: i.summary ?? null,
            category: i.category,
            tags: i.tags,
            thumbnailUrl: i.thumbnailUrl,
          }))}
          onSelect={handleSelect}
          showThumbnails={true}
        />
      ) : (
        <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
          No animations available yet.
        </div>
      )}

      <GalleryModal
        animation={selectedAnimation}
        onClose={() => setSelectedId(null)}
        manifest={
          selectedItem
            ? {
                ...selectedItem,
                thumbnailUrl: selectedItem.thumbnailUrl,
              }
            : undefined
        }
      />
    </>
  )
}

