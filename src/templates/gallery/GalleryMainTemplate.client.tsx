'use client'

import { useState, useMemo, useCallback } from 'react'
import { Search, Sparkles, Copy } from 'lucide-react'
import Image from 'next/image'
import {
  ANIMATION_REGISTRY,
  getAllMarketingFunctions,
  getAllTags,
  type AnimationEntry,
  type MarketingFunction,
} from '@/src/data/animations'
import { getGithubUrl } from '@/lib/galleryGithubMap'
import { GalleryModal } from '@/components/gallery/GalleryModal'
import { SignalField } from '@/components/motifs'
import { Github } from 'lucide-react'

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
  content: GalleryMainContent | null
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

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<MarketingFunction | 'all'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'featured' | 'title' | 'category'>('featured')
  const [modalAnimation, setModalAnimation] = useState<AnimationEntry | null>(null)

  const categories = ['all', ...getAllMarketingFunctions()]
  const allTags = getAllTags()

  const filteredAnimations = useMemo(() => {
    let list = [...ANIMATION_REGISTRY]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (selectedCategory !== 'all') {
      list = list.filter((a) => a.marketingFunction === selectedCategory)
    }

    if (selectedTags.length > 0) {
      list = list.filter((a) => selectedTags.some((t) => a.tags.includes(t)))
    }

    list.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return (a.order || 999) - (b.order || 999)
      }
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'category') return a.marketingFunction.localeCompare(b.marketingFunction)
      return 0
    })

    return list
  }, [searchQuery, selectedCategory, selectedTags, sortBy])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleCopyId = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    void navigator.clipboard.writeText(id)
  }, [])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedTags([])
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedTags.length > 0

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[280px] flex flex-col justify-center bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <SignalField intensity="subtle" pattern="constellation" density="sparse" />
        </div>
        <div className="container-width relative z-10 py-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            {hero.subtitle.replace('50+', `${ANIMATION_REGISTRY.length}+`)}
          </p>
          <a
            href={hero.ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors shadow-lg shadow-brand-500/20"
          >
            {hero.ctaLabel}
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main layout: sidebar + grid */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-280px)]">
        {/* Left sidebar - filters */}
        <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-slate-900/50 p-4 lg:p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-white/10 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="featured">Popular / Featured</option>
                <option value="title">Title A–Z</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Filter by category
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as MarketingFunction | 'all')}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-brand-500/20 text-brand-300 font-medium'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {allTags.slice(0, 20).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-brand-500/30 text-brand-200'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-slate-500 hover:text-brand-400 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main grid */}
        <main className="flex-1 p-4 lg:p-6 bg-[#0b1224]">
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search animations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            />
          </div>

          {/* Results count */}
          <p className="text-slate-400 text-sm mb-4">
            {filteredAnimations.length} animation{filteredAnimations.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {filteredAnimations.map((anim) => (
              <button
                key={anim.id}
                onClick={() => setModalAnimation(anim)}
                className="group text-left rounded-xl border border-white/10 bg-slate-800/30 overflow-hidden hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="aspect-video relative bg-slate-900/80 overflow-hidden">
                  {anim.previewImage ? (
                    <Image
                      src={anim.previewImage}
                      alt={anim.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <span className="text-slate-500 text-sm font-medium px-4 text-center line-clamp-2">
                        {anim.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyId(anim.id, e)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          e.stopPropagation()
                          handleCopyId(anim.id, e as any)
                        }
                      }}
                      className="p-1.5 rounded bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                      title="Copy ID"
                      aria-label={`Copy ID ${anim.id}`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </div>
                    {anim.featured && (
                      <span className="px-2 py-0.5 rounded bg-brand-500/90 text-white text-[10px] font-bold uppercase">
                        Featured
                      </span>
                    )}
                    {getGithubUrl(anim.id) && (
                      <span className="p-1.5 rounded bg-white/10 text-white">
                        <Github className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-brand-300 transition-colors line-clamp-1">
                    {anim.title}
                  </h3>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">
                    {anim.marketingFunction.replace(/-/g, ' ')}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {anim.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredAnimations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 mb-4">No animations match your filters.</p>
              <button
                onClick={clearFilters}
                className="text-brand-400 hover:text-brand-300 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      <GalleryModal
        animation={modalAnimation}
        onClose={() => setModalAnimation(null)}
        githubUrl={modalAnimation ? getGithubUrl(modalAnimation.id) : undefined}
      />
    </>
  )
}
