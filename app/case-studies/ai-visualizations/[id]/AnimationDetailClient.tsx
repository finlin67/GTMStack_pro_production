'use client'

import { notFound, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Shuffle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SectionDark } from '@/components/layout/SectionDark'
import { SectionLight } from '@/components/layout/SectionLight'
import { SectionHeader } from '@/components/layout/Section'
import { FadeIn } from '@/components/motion/FadeIn'
import { Reveal } from '@/components/ui/Reveal'
import { SignalField } from '@/components/motifs'
import {
  getAnimationById,
  getAnimationsByFunction,
  getRotatedAnimation,
  type AnimationEntry,
} from '@/src/data/animations'
import { useReducedMotion } from 'framer-motion'

interface Props {
  params: { id: string }
}

export function AnimationDetailClient({ params }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const shouldReduceMotion = useReducedMotion()
  const [currentAnimation, setCurrentAnimation] = useState<AnimationEntry | null>(null)
  const [isShuffling, setIsShuffling] = useState(false)

  useEffect(() => {
    // Check for ?anim= query param first
    const animParam = searchParams?.get('anim')
    const animId = animParam || params.id

    const anim = getAnimationById(animId)
    if (anim) {
      setCurrentAnimation(anim)
    } else {
      notFound()
    }
  }, [params.id, searchParams])

  const handleShuffle = () => {
    if (!currentAnimation) return

    setIsShuffling(true)
    const rotated = getRotatedAnimation(
      currentAnimation.marketingFunction,
      currentAnimation.id
    )

    if (rotated) {
      // Update URL without page reload
      router.push(`/case-studies/ai-visualizations/${rotated.id}?anim=${rotated.id}`)
      setTimeout(() => {
        setCurrentAnimation(rotated)
        setIsShuffling(false)
      }, 300)
    } else {
      setIsShuffling(false)
    }
  }

  if (!currentAnimation) {
    return null
  }

  const relatedAnimations = getAnimationsByFunction(currentAnimation.marketingFunction).filter(
    (anim) => anim.id !== currentAnimation.id
  )

  // Dynamically import the animation component
  const AnimationComponent = currentAnimation.component

  return (
    <>
      {/* Hero with Animation Preview */}
      <Reveal>
        <SectionDark variant="hero" motif="signal" padding="lg" className="overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <SignalField intensity="subtle" pattern="constellation" density="sparse" />
          </div>

          <div className="container-width relative z-10">
            {/* Back Navigation */}
            <FadeIn>
              <Link
                href="/case-studies/ai-visualizations"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Gallery</span>
              </Link>
            </FadeIn>

            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
              {/* Left: Info */}
              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium mb-4">
                      {currentAnimation.sourceType === 'google-ai-studio'
                        ? 'Google AI Studio'
                        : currentAnimation.sourceType}
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                      {currentAnimation.title}
                    </h1>
                    <p className="text-lg text-slate-200 leading-relaxed">
                      {currentAnimation.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {currentAnimation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Shuffle Button */}
                  {relatedAnimations.length > 0 && (
                    <button
                      onClick={handleShuffle}
                      disabled={isShuffling}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
                    >
                      <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
                      <span>Shuffle Variant</span>
                    </button>
                  )}

                  {/* Metadata */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Function:</span>
                        <p className="text-white font-medium">
                          {currentAnimation.marketingFunction.replace(/-/g, ' ')}
                        </p>
                      </div>
                      {currentAnimation.route && (
                        <div>
                          <span className="text-slate-400">Used on:</span>
                          <Link
                            href={currentAnimation.route}
                            className="text-brand-300 hover:text-brand-200 transition-colors"
                          >
                            {currentAnimation.route}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Right: Animation Preview */}
              <FadeIn delay={0.15}>
                <div className="relative hidden lg:block">
                  <div className="absolute -left-10 -top-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-drift-slow" />
                  <div className="relative mx-auto w-full max-w-[600px] h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
                    {shouldReduceMotion ? (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <p className="text-sm">Animation disabled (reduced motion)</p>
                      </div>
                    ) : (
                      <AnimationComponent />
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </SectionDark>
      </Reveal>

      {/* Related Animations */}
      {relatedAnimations.length > 0 && (
        <Reveal delay={0.1}>
          <SectionLight variant="white" className="overflow-hidden">
            <SectionHeader
              label="Variations"
              title={`More ${currentAnimation.marketingFunction.replace(/-/g, ' ')} visualizations`}
              description={`Explore ${relatedAnimations.length} other variation${relatedAnimations.length > 1 ? 's' : ''} of this visualization.`}
              className="mb-8"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAnimations.map((anim) => (
                <Link
                  key={anim.id}
                  href={`/case-studies/ai-visualizations/${anim.id}?anim=${anim.id}`}
                >
                  <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-brand-100 to-cool-100 mb-4 flex items-center justify-center">
                      {anim.previewImage ? (
                        <Image
                          src={anim.previewImage}
                          alt={anim.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Sparkles className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {anim.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {anim.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </SectionLight>
        </Reveal>
      )}

      {/* CTA */}
      <Reveal delay={0.1}>
        <SectionDark variant="cta" motif="signal" padding="lg" accentOrb className="overflow-hidden">
          <div className="max-w-3xl text-center mx-auto space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-balance">
              Need custom visualizations?
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed">
              We create interactive data visualizations and animations to showcase your GTM systems and outcomes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="btn bg-white text-brand-900 hover:bg-white/90 px-6 py-3 text-base rounded-xl shadow-glow transition-all duration-300"
              >
                Get in Touch
              </a>
              <Link
                href="/case-studies/ai-visualizations"
                className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-6 py-3 text-base rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Browse gallery
              </Link>
            </div>
          </div>
        </SectionDark>
      </Reveal>
    </>
  )
}
