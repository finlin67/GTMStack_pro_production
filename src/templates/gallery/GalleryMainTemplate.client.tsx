'use client'

import { useMemo, useState } from 'react'
import { getAnimationById } from '@/src/data/animations'
import { GalleryModal } from '@/components/gallery/GalleryModal'
import type { GalleryItem } from '@/src/lib/galleryManifest'
import { StitchGalleryShell } from '@/components/gallery/StitchGalleryShell.client'
import { resolveRegistryIdForManifestItem } from '@/src/lib/galleryAnimationMap'
import {
  applyCanonicalVisibility,
  normalizeSummary,
  resolvePreviewDecision,
} from '@/src/lib/galleryPreviewPolicy'

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
  | 'entryHtml'
  | 'placeholderPreview'
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

  const items = useMemo(
    () =>
      (initialItems ?? []).map((item) => ({
        ...item,
        summary: normalizeSummary(item.summary),
      })),
    [initialItems]
  )

  const { visibleItems } = useMemo(
    () =>
      applyCanonicalVisibility(items, {
        includeSecondary: false,
        includeDeprecated: false,
      }),
    [items]
  )

  const displayItems = useMemo(
    () =>
      visibleItems.map((item) => {
        const registryId = resolveRegistryIdForManifestItem(item)
        const hasMappedComponent = !!(registryId && getAnimationById(registryId))
        const decision = resolvePreviewDecision({
          hasMappedComponent,
          entryHtml: item.entryHtml,
          thumbnailUrl: item.thumbnailUrl,
        })

        return {
          ...item,
          previewMode: decision.mode,
        }
      }),
    [visibleItems]
  )

  // Modal state management
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedRegistryId = useMemo(() => {
    if (!selectedId) return null
    const item = displayItems.find((i) => i.id === selectedId)
    if (!item) return null
    return resolveRegistryIdForManifestItem(item)
  }, [displayItems, selectedId])

  const selectedAnimation = useMemo(
    () => (selectedRegistryId ? getAnimationById(selectedRegistryId) ?? null : null),
    [selectedRegistryId]
  )

  const selectedItem = useMemo(
    () => displayItems.find((item) => item.id === selectedId) ?? null,
    [displayItems, selectedId]
  )

  const selectedPreviewDecision = useMemo(() => {
    if (!selectedItem) return null
    return resolvePreviewDecision({
      hasMappedComponent: !!selectedAnimation,
      entryHtml: selectedItem.entryHtml,
      thumbnailUrl: selectedItem.thumbnailUrl,
    })
  }, [selectedAnimation, selectedItem])

  const handleSelect = (id: string) => setSelectedId(id)

  return (
    <>
      {displayItems.length > 0 ? (
        <StitchGalleryShell
          items={displayItems.map((i) => ({
            id: i.id,
            title: i.title,
            summary: i.summary ?? null,
            category: i.category,
            tags: i.tags,
            thumbnailUrl: i.thumbnailUrl,
            previewMode: i.previewMode,
            placeholderPreview: i.placeholderPreview ?? false,
          }))}
          onSelect={handleSelect}
          showThumbnails={true}
        />
      ) : (
        <div className="container-width py-14 md:py-20">
          <div className="template-empty-state">
            <p className="text-lg font-semibold text-slate-700">No animations available yet.</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Gallery items will appear here once previewable animations are available in the manifest.
            </p>
          </div>
        </div>
      )}

      <GalleryModal
        animation={selectedAnimation}
        onClose={() => setSelectedId(null)}
        previewDecision={selectedPreviewDecision}
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
