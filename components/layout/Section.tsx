import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  containerClassName?: string
  background?: 'white' | 'slate' | 'gradient' | 'dark'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

const backgroundStyles = {
  white: 'bg-white',
  slate: 'bg-slate-50/80',
  gradient: 'bg-gradient-to-b from-slate-50 via-white to-white bg-mesh',
  dark: 'bg-slate-900 text-white',
}

const paddingStyles = {
  none: '',
  sm: 'py-10 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-20 lg:py-24',
  xl: 'py-18 md:py-24 lg:py-28',
}

export function Section({
  children,
  className,
  containerClassName,
  background = 'white',
  padding = 'lg',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgroundStyles[background],
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

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'template-intro',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {label && (
        <span className="section-eyebrow">
          {label}
        </span>
      )}
      <h2 className="font-display text-[2rem] md:text-[2.6rem] lg:text-[3rem] font-bold text-slate-900 tracking-tight leading-[1.02] text-balance">
        {title}
      </h2>
      {description && (
        <p className="max-w-[42rem] text-[15px] md:text-[1.05rem] text-slate-600 leading-[1.8]">
          {description}
        </p>
      )}
    </div>
  )
}

