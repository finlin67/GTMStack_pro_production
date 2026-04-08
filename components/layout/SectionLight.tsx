'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionLightProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  id?: string
  variant?: 'white' | 'slate'
}

const paddingStyles = {
  none: '',
  sm: 'py-10 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-14 md:py-20 lg:py-24',
  xl: 'py-16 md:py-20 lg:py-28',
}

export function SectionLight({
  children,
  className,
  containerClassName,
  padding = 'lg',
  id,
  variant = 'white',
}: SectionLightProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        variant === 'white' ? 'bg-white' : 'bg-slate-50',
        'text-slate-900',
        paddingStyles[padding],
        className
      )}
    >
      <div className={cn('container-width', containerClassName)}>
        {children}
      </div>
    </section>
  )
}

