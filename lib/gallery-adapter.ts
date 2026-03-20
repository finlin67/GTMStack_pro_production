/**
 * Gallery Adapter
 * Transforms ANIMATION_REGISTRY data into the format expected by Uploaded_AnimationGallery_v1 template.
 * This is the only module that defines the content shape for the gallery presentational shell.
 */

import type { AnimationEntry, MarketingFunction } from '@/src/data/animations'

/** Card shape consumed by Uploaded_AnimationGallery_v1. Only this adapter produces this shape. */
export interface AdaptedGalleryCard {
  id: string | number
  isFeatured?: boolean
  image: string
  imageAlt: string
  title: string
  description: string
  tags: string[]
}

/** Alias for gallery card content; adapter is the single source for this shape. */
export type GalleryCardContent = AdaptedGalleryCard

export interface AdaptedGalleryContent {
  header: {
    logo: {
      primary: string
      secondary: string
    }
    navLinks: Array<{ label: string; href: string }>
  }
  hero: {
    title: string
    subtitle: string
    primaryAction: { label: string; href: string }
    secondaryAction: { label: string; href: string }
  }
  sidebar: {
    searchLabel: string
    searchPlaceholder: string
    functionsLabel: string
    functions: string[]
    taxonomyLabel: string
    tags: string[]
    displayLogicLabel: string
    sortOptions: string[]
  }
  gallery: {
    displayedItems: number
    totalItems: number
    cards: AdaptedGalleryCard[]
  }
  footer: {
    description: string
    taxonomy: Array<{ label: string; href: string }>
    documentation: Array<{ label: string; href: string }>
    socials: Array<{ platform: string; href: string; iconName: 'terminal' | 'mail' | 'link' }>
    copyright: string
    legalLinks: Array<{ label: string; href: string }>
  }
}

// Types for modal adapter
export interface AdaptedModalContent {
  title: string
  tags: Array<{ label: string; colorClass: string }>
  description: string
  githubUrl: string
  loadingText: string
  status: {
    label: string
    type: 'success' | 'alert'
    latency: string
    packets: string
  }
  relatedProjects: Array<{
    title: string
    category: string
    iconType: 'cpu' | 'network' | 'shield'
    categoryColorClass: string
  }>
}

/**
 * Transform AnimationEntry array into gallery cards
 */
export function adaptAnimationsToCards(animations: AnimationEntry[]): AdaptedGalleryCard[] {
  return animations.map((anim) => ({
    id: anim.id,
    isFeatured: anim.featured || false,
    image: anim.previewImage || `https://picsum.photos/seed/${anim.id}/800/450`,
    imageAlt: anim.title,
    title: anim.title,
    description: anim.description,
    tags: anim.tags.slice(0, 3), // Limit to 3 tags for card display
  }))
}

/**
 * Format marketing function for display (e.g., 'lead-generation' → 'Lead Generation')
 */
function formatMarketingFunction(func: string): string {
  return func
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get unique marketing functions from animations
 */
function getUniqueFunctions(animations: AnimationEntry[]): string[] {
  const functions = new Set(animations.map((a) => a.marketingFunction))
  return ['All Functions', ...Array.from(functions).map(formatMarketingFunction)]
}

/**
 * Get unique tags from animations
 */
function getUniqueTags(animations: AnimationEntry[]): string[] {
  const tagSet = new Set<string>()
  animations.forEach((anim) => anim.tags.forEach((tag) => tagSet.add(tag)))
  return ['All Assets', ...Array.from(tagSet).slice(0, 15)] // Limit to prevent UI overflow
}

/**
 * Main adapter: Transform full animation registry into gallery content
 */
export function adaptGalleryData(
  animations: AnimationEntry[],
  heroContent?: {
    title?: string
    subtitle?: string
    ctaLabel?: string
    ctaHref?: string
  }
): AdaptedGalleryContent {
  const cards = adaptAnimationsToCards(animations)

  return {
    header: {
      logo: {
        primary: 'GTM',
        secondary: 'STACK',
      },
      navLinks: [
        { label: 'Gallery', href: '/gallery' },
        { label: 'Expertise', href: '/expertise' },
        { label: 'Industries', href: '/industries' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    hero: {
      title: heroContent?.title || 'Animation Gallery',
      subtitle:
        heroContent?.subtitle ||
        `Explore ${animations.length}+ marketing dashboard animations. Built with React, Framer Motion, and Tailwind.`,
      primaryAction: {
        label: heroContent?.ctaLabel || 'Explore Library',
        href: heroContent?.ctaHref || '#gallery-grid',
      },
      secondaryAction: {
        label: 'View Documentation',
        href: '/docs',
      },
    },
    sidebar: {
      searchLabel: 'Search Animations',
      searchPlaceholder: 'e.g. Hover effects...',
      functionsLabel: 'Marketing Function',
      functions: getUniqueFunctions(animations),
      taxonomyLabel: 'Categories',
      tags: getUniqueTags(animations),
      displayLogicLabel: 'Featured Filters',
      sortOptions: ['Enterprise Ready', 'Glassmorphism', 'Motion Blur'],
    },
    gallery: {
      displayedItems: cards.length,
      totalItems: animations.length,
      cards,
    },
    footer: {
      description:
        'GTMStack.pro provides premium animation templates and interaction design systems for high-growth digital products.',
      taxonomy: [
        { label: 'UI Components', href: '/gallery' },
        { label: 'Interaction Design', href: '/expertise' },
        { label: 'Motion Systems', href: '/gallery/animations' },
        { label: 'Visual Effects', href: '/gallery' },
      ],
      documentation: [
        { label: 'Getting Started', href: '/docs' },
        { label: 'API Reference', href: '/docs' },
        { label: 'Best Practices', href: '/docs' },
        { label: 'Changelog', href: '/docs' },
      ],
      socials: [
        { platform: 'Twitter', href: '#', iconName: 'link' },
        { platform: 'GitHub', href: 'https://github.com', iconName: 'terminal' },
        { platform: 'Email', href: '/contact', iconName: 'mail' },
      ],
      copyright: '© 2026 GTMStack.pro. All rights reserved.',
      legalLinks: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  }
}

/**
 * Get tag color class based on tag content
 */
function getTagColorClass(tag: string): string {
  const colorMap: Record<string, string> = {
    dashboard: 'text-purple-600 bg-purple-50 border-purple-100',
    analytics: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    automation: 'text-lime-600 bg-lime-50 border-lime-100',
    engagement: 'text-amber-600 bg-amber-50 border-amber-100',
    conversion: 'text-rose-600 bg-rose-50 border-rose-100',
    video: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  }

  // Try to find matching keyword
  const lowerTag = tag.toLowerCase()
  for (const [key, color] of Object.entries(colorMap)) {
    if (lowerTag.includes(key)) return color
  }

  // Default color
  return 'text-slate-600 bg-slate-50 border-slate-100'
}

/**
 * Adapt single animation for modal display
 */
export function adaptModalData(
  animation: AnimationEntry,
  githubUrl?: string,
  relatedAnimations?: AnimationEntry[]
): AdaptedModalContent {
  return {
    title: animation.title,
    tags: animation.tags.slice(0, 3).map((tag) => ({
      label: tag,
      colorClass: getTagColorClass(tag),
    })),
    description: animation.description,
    githubUrl: githubUrl || 'https://github.com',
    loadingText: 'Loading animation...',
    status: {
      label: 'ANIMATION ACTIVE',
      type: 'success',
      latency: '14ms',
      packets: '60fps',
    },
    relatedProjects: (relatedAnimations || []).slice(0, 3).map((related, idx) => ({
      title: related.title,
      category: formatMarketingFunction(related.marketingFunction),
      iconType: (['cpu', 'network', 'shield'] as const)[idx % 3],
      categoryColorClass: getTagColorClass(related.tags[0] || 'default'),
    })),
  }
}
