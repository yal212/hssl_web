'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'gray' | 'gradient-green' | 'gradient-blue' | 'gradient-mixed'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'
}

export function Section({
  children,
  className = '',
  background = 'white',
  padding = 'lg',
  maxWidth = '7xl'
}: SectionProps) {
  const backgrounds = {
    white: 'bg-cream',
    gray: 'bg-green-50',
    'gradient-green': 'bg-gradient-to-br from-green-50 to-green-100',
    'gradient-blue': 'bg-gradient-to-br from-green-100 to-green-200',
    'gradient-mixed': 'bg-gradient-to-br from-green-50 via-cream to-green-100'
  }

  const paddings = {
    sm: 'py-12 lg:py-16',
    md: 'py-16 lg:py-20',
    lg: 'py-20 lg:py-24',
    xl: 'py-24 lg:py-32'
  }

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <section className={cn(backgrounds[background], paddings[padding], className)}>
      <div className={cn(maxWidths[maxWidth], 'mx-auto px-4 sm:px-6 lg:px-8')}>
        {children}
      </div>
    </section>
  )
}

// Grid component for consistent layouts
interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  responsive?: boolean
}

export function Grid({
  children,
  cols = 3,
  gap = 'lg',
  className = '',
  responsive = true
}: GridProps) {
  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }

  const gridCols = responsive ? {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  } : {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }

  return (
    <div className={cn('grid', gridCols[cols], gaps[gap], className)}>
      {children}
    </div>
  )
}

// Container component for consistent content width
interface ContainerProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'
  className?: string
  center?: boolean
}

export function Container({
  children,
  size = '7xl',
  className = '',
  center = true
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      sizes[size],
      center && 'mx-auto',
      'px-4 sm:px-6 lg:px-8',
      className
    )}>
      {children}
    </div>
  )
}

// Spacer component for consistent vertical spacing
interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
}

export function Spacer({
  size = 'md',
  className = ''
}: SpacerProps) {
  const sizes = {
    xs: 'h-4',
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
    '2xl': 'h-24'
  }

  return <div className={cn(sizes[size], className)} />
}
