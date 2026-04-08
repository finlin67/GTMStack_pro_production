'use client'

import type { LucideIcon } from 'lucide-react'
import { Sparkles } from 'lucide-react'
import { getLucideIcon } from '@/lib/lucideIconMap'
import { cn } from '@/lib/utils'

type IconBadgeTone = 'brand' | 'neutral' | 'dark' | 'soft'
type IconBadgeSize = 'sm' | 'md' | 'lg'

interface IconBadgeProps {
  icon?: string | LucideIcon | null
  tone?: IconBadgeTone
  size?: IconBadgeSize
  className?: string
  iconClassName?: string
  fallbackIcon?: LucideIcon | null
}

const sizeClasses: Record<IconBadgeSize, { badge: string; icon: string }> = {
  sm: {
    badge: 'icon-badge-sm',
    icon: 'h-4 w-4',
  },
  md: {
    badge: 'icon-badge-md',
    icon: 'h-[18px] w-[18px]',
  },
  lg: {
    badge: 'icon-badge-lg',
    icon: 'h-5 w-5',
  },
}

const toneClasses: Record<IconBadgeTone, string> = {
  brand: 'icon-badge-brand',
  neutral: 'icon-badge-neutral',
  dark: 'icon-badge-dark',
  soft: 'icon-badge-soft',
}

function resolveIcon(icon?: string | LucideIcon | null, fallbackIcon?: LucideIcon | null): LucideIcon | null {
  if (typeof icon === 'string') return getLucideIcon(icon) ?? fallbackIcon ?? Sparkles
  if (typeof icon === 'function') return icon
  return fallbackIcon ?? Sparkles
}

export function IconBadge({
  icon,
  tone = 'neutral',
  size = 'md',
  className,
  iconClassName,
  fallbackIcon,
}: IconBadgeProps) {
  const Icon = resolveIcon(icon, fallbackIcon)

  if (!Icon) return null

  return (
    <span className={cn('icon-badge', sizeClasses[size].badge, toneClasses[tone], className)} aria-hidden="true">
      <Icon className={cn(sizeClasses[size].icon, iconClassName)} strokeWidth={1.9} />
    </span>
  )
}
