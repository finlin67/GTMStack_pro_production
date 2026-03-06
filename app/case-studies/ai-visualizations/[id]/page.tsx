import { Suspense } from 'react'
import { getAllAnimationIds } from '@/src/data/animationIds'
import { AnimationDetailClient } from './AnimationDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllAnimationIds().map((id) => ({ id }))
}

export default async function AnimationDetailPage({ params }: Props) {
  const { id } = await params
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b1224]" />}>
      <AnimationDetailClient params={{ id }} />
    </Suspense>
  )
}
