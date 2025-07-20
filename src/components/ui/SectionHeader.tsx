'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface SectionHeaderProps {
  icon?: LucideIcon
  title: string
  subtitle?: string
  description?: string
  gradient?: string
  iconGradient?: string
  children?: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  description,
  gradient = 'from-green-600 to-blue-600',
  iconGradient = 'from-green-600 to-blue-600',
  children,
  className = '',
  size = 'lg'
}: SectionHeaderProps) {
  const sizes = {
    sm: {
      container: 'mb-12',
      icon: 'w-12 h-12 mb-6',
      iconSize: 'w-6 h-6',
      title: 'text-3xl md:text-4xl',
      subtitle: 'text-lg md:text-xl',
      description: 'text-base md:text-lg'
    },
    md: {
      container: 'mb-16',
      icon: 'w-16 h-16 mb-8',
      iconSize: 'w-8 h-8',
      title: 'text-4xl md:text-5xl',
      subtitle: 'text-xl md:text-2xl',
      description: 'text-lg md:text-xl'
    },
    lg: {
      container: 'mb-20',
      icon: 'w-20 h-20 mb-8',
      iconSize: 'w-10 h-10',
      title: 'text-5xl md:text-6xl lg:text-7xl',
      subtitle: 'text-xl md:text-2xl',
      description: 'text-lg md:text-xl'
    },
    xl: {
      container: 'mb-24',
      icon: 'w-24 h-24 mb-10',
      iconSize: 'w-12 h-12',
      title: 'text-6xl md:text-7xl lg:text-8xl',
      subtitle: 'text-2xl md:text-3xl',
      description: 'text-xl md:text-2xl'
    }
  }

  const sizeConfig = sizes[size]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center ${sizeConfig.container} ${className}`}
    >
      {Icon && (
        <div className={`inline-flex items-center justify-center bg-gradient-to-r ${iconGradient} rounded-full shadow-lg ${sizeConfig.icon}`}>
          <Icon className={`text-white ${sizeConfig.iconSize}`} />
        </div>
      )}
      
      <h1 className={`font-bold text-gray-900 mb-6 leading-tight ${sizeConfig.title}`}>
        {subtitle ? (
          <>
            {title}
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent block`}>
              {subtitle}
            </span>
          </>
        ) : (
          title
        )}
      </h1>
      
      {description && (
        <p className={`text-gray-600 max-w-4xl mx-auto leading-relaxed ${sizeConfig.description}`}>
          {description}
        </p>
      )}
      
      {children}
    </motion.div>
  )
}

// Enhanced Card component with better hover effects
interface EnhancedCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  gradientFrom?: string
  gradientTo?: string
}

export function EnhancedCard({
  children,
  className = '',
  hover = true,
  gradient = false,
  gradientFrom = 'from-white',
  gradientTo = 'to-gray-50'
}: EnhancedCardProps) {
  const baseClasses = 'rounded-2xl border-0 shadow-lg transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]' : ''
  const gradientClasses = gradient ? `bg-gradient-to-br ${gradientFrom} ${gradientTo}` : 'bg-white'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Icon container component
interface IconContainerProps {
  icon: LucideIcon
  gradient?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  animate?: boolean
}

export function IconContainer({
  icon: Icon,
  gradient = 'from-green-500 to-green-600',
  size = 'md',
  className = '',
  animate = true
}: IconContainerProps) {
  const sizes = {
    sm: { container: 'w-12 h-12', icon: 'w-6 h-6', rounded: 'rounded-xl' },
    md: { container: 'w-16 h-16', icon: 'w-8 h-8', rounded: 'rounded-2xl' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10', rounded: 'rounded-2xl' },
    xl: { container: 'w-24 h-24', icon: 'w-12 h-12', rounded: 'rounded-3xl' }
  }

  const sizeConfig = sizes[size]
  
  const containerElement = (
    <div className={`bg-gradient-to-br ${gradient} ${sizeConfig.container} ${sizeConfig.rounded} flex items-center justify-center shadow-lg ${className}`}>
      <Icon className={`text-white ${sizeConfig.icon}`} />
    </div>
  )

  if (animate) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {containerElement}
      </motion.div>
    )
  }

  return containerElement
}
