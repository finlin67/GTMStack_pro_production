'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  FileText,
  TrendingUp,
  Target,
  Settings,
  ChevronRight,
} from 'lucide-react'

const HeroAbstract = dynamic(
  () =>
    import('@/components/visuals/HeroAbstract').then((m) => ({
      default: () => <m.HeroAbstract variant="topLevel" />,
    })),
  { ssr: false }
)

type Props = {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  content?: any
}

export default function ExpertiseMainTemplate({
  pageTitle = 'Expertise',
}: Props) {
  const shouldReduceMotion = useReducedMotion() ?? false

  return (
    <div className="min-h-screen bg-[#0A0F2D] text-white">
      <section className="relative py-24">
        <div className="container-width">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold"
          >
            GTM Expertise That Drives Real Revenue
          </motion.h1>

          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            Four interconnected pillars of B2B mastery — Content & Engagement,
            Demand & Growth, Strategy & Insights, Systems & Operations.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/projects"
              className="px-6 py-3 bg-[#00A8A8] rounded-lg font-semibold"
            >
              View Proven Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
