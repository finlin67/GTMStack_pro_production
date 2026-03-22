'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Filter, ArrowRight, Sparkles } from 'lucide-react'
import { SectionHeader } from '@/components/layout/Section'
import { SectionDark } from '@/components/layout/SectionDark'
import { SectionLight } from '@/components/layout/SectionLight'
import { HeroDark } from '@/components/ui/HeroDark'
import { CardGrid, CardGridItem } from '@/components/ui/CardGrid'
import { FilterChips } from '@/components/ui/FilterChips'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { Reveal } from '@/components/ui/Reveal'
import {
  ANIMATION_REGISTRY,
  getAllMarketingFunctions,
  getAllTags,
  type AnimationEntry,
  type MarketingFunction,
} from '@/src/data/animations'
import { SignalField, PathwayOverlay } from '@/components/motifs'
import Link from 'next/link'
import Image from 'next/image'

export default function AIVisualizationsGalleryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedFunction, setSelectedFunction] = useState<MarketingFunction | 'all'>('all')
  const [sortBy, setSortBy] = useState<'featured' | 'title' | 'function'>('featured')

  const allTags = getAllTags()
  const allFunctions = getAllMarketingFunctions()

  const filteredAnimations = useMemo(() => {
    let filtered: AnimationEntry[] = [...ANIMATION_REGISTRY]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (anim) =>
          anim.title.toLowerCase().includes(query) ||
          anim.description.toLowerCase().includes(query) ||
          anim.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((anim) =>
        selectedTags.some((tag) => anim.tags.includes(tag))
      )
    }

    // Filter by marketing function
    if (selectedFunction !== 'all') {
      filtered = filtered.filter((anim) => anim.marketingFunction === selectedFunction)
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return (a.order || 999) - (b.order || 999)
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      if (sortBy === 'function') {
        return a.marketingFunction.localeCompare(b.marketingFunction)
      }
      return 0
    })

    return filtered
  }, [searchQuery, selectedTags, selectedFunction, sortBy])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleClearAll = () => {
    setSelectedTags([])
    setSelectedFunction('all')
    setSearchQuery('')
  }

  const featuredAnimations = ANIMATION_REGISTRY.filter((anim) => anim.featured).slice(0, 6)

  return (
    <>
      {/* Hero (Dark) */}
      <Reveal>
        <HeroDark
          align="left"
          motif="signal"
          title="AI-Generated Visualizations"
          titleHighlight="GTM animations"
          description="Interactive data visualizations and animations showcasing GTM concepts, metrics, and systems. Created with Google AI Studio and custom React components."
          primaryCta={{ label: 'Browse gallery', href: '#gallery' }}
          secondaryCta={{ label: 'View case studies', href: '/case-studies' }}
        />
      </Reveal>

      {/* Featured Animations (Light) */}
      <Reveal delay={0.05}>
        <SectionLight variant="white" className="overflow-hidden" id="featured">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <SectionHeader
              label="Featured"
              title="Standout visualizations"
              description="Hand-picked animations showcasing key GTM concepts and metrics."
            />
            <Link
              href="#gallery"
              className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-500 transition-colors"
            >
              Browse all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <CardGrid columns={3}>
            {featuredAnimations.map((anim) => (
              <CardGridItem key={anim.id}>
                <Link href={`/case-studies/ai-visualizations/${anim.id}`}>
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-brand-100 to-cool-100 mb-4 flex items-center justify-center overflow-hidden">
                      {anim.previewImage ? (
                        <Image
                          src={anim.previewImage}
                          alt={anim.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-slate-400 text-sm font-medium">
                          {anim.title}
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {anim.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                      {anim.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {anim.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">
                        {anim.marketingFunction.replace(/-/g, ' ')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </CardGridItem>
            ))}
          </CardGrid>
        </SectionLight>
      </Reveal>

      {/* All Animations Gallery with Filters (Light) */}
      <Reveal delay={0.05}>
        <SectionLight variant="slate" className="overflow-hidden" id="gallery">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <SectionHeader
              label="Gallery"
              title="Browse all visualizations"
              description="Search, filter, and explore all AI-generated GTM visualizations."
            />
          </div>

          {/* Search and Sort Controls */}
          <FadeIn>
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search visualizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              {/* Function Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedFunction('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFunction === 'all'
                      ? 'bg-brand-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  All Functions
                </button>
                {allFunctions.map((func) => (
                  <button
                    key={func}
                    onClick={() => setSelectedFunction(func)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFunction === func
                        ? 'bg-brand-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {func.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="title">Title A-Z</option>
                  <option value="function">Function</option>
                </select>
              </div>

              {/* Tags Filter */}
              <FilterChips
                tags={allTags.slice(0, 15)}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                onClearAll={handleClearAll}
                className="mb-4"
              />
            </div>
          </FadeIn>

          {/* Animation Grid */}
          <CardGrid columns={3}>
            {filteredAnimations.map((anim) => (
              <CardGridItem key={anim.id}>
                <Link href={`/case-studies/ai-visualizations/${anim.id}`}>
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-brand-100 to-cool-100 mb-4 flex items-center justify-center overflow-hidden relative">
                      {anim.previewImage ? (
                        <Image
                          src={anim.previewImage}
                          alt={anim.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-slate-400 text-sm font-medium">
                          {anim.title}
                        </div>
                      )}
                      {anim.featured && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-brand-600 text-white text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {anim.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow line-clamp-2">
                      {anim.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {anim.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">
                        {anim.marketingFunction.replace(/-/g, ' ')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </CardGridItem>
            ))}
          </CardGrid>

          {filteredAnimations.length === 0 && (
            <FadeIn>
              <div className="text-center py-12">
                <p className="text-slate-500 mb-4">No visualizations found matching your filters.</p>
                <button
                  onClick={handleClearAll}
                  className="text-brand-600 hover:text-brand-700 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            </FadeIn>
          )}
        </SectionLight>
      </Reveal>

      {/* CTA (Dark) */}
      <Reveal delay={0.1}>
        <SectionDark variant="cta" motif="signal" padding="lg" accentOrb className="overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <SignalField intensity="subtle" pattern="mesh" density="sparse" />
          </div>
          <div className="max-w-3xl text-center mx-auto space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-balance">
              Want custom visualizations for your GTM?
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed">
              We create interactive data visualizations and animations to showcase your GTM systems, metrics, and outcomes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="btn bg-white text-brand-900 hover:bg-white/90 px-6 py-3 text-base rounded-xl shadow-glow transition-all duration-300 hover:shadow-glow-violet"
              >
                Get in Touch
              </a>
              <a
                href="/case-studies"
                className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-6 py-3 text-base rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                View case studies
              </a>
            </div>
          </div>
        </SectionDark>
      </Reveal>
    </>
  )
}
