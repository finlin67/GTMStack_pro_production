'use client'

import { ReactNode } from 'react'
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { cn } from '@/lib/utils'

interface CardGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function CardGrid({ children, columns = 3, className }: CardGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
  }

  const gridGap = {
    2: 'gap-4 md:gap-6',
    3: 'gap-4 md:gap-6',
    4: 'gap-3 sm:gap-4 md:gap-6',
  }

  return (
    <StaggerContainer
      className={cn('grid items-stretch', gridGap[columns], gridCols[columns], className)}
    >
      {children}
    </StaggerContainer>
  )
}

export function CardGridItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <StaggerItem className={cn('h-full', className)}>{children}</StaggerItem>
}

