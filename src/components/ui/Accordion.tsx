'use client'

import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItemProps {
  title: string
  children: ReactNode
  icon?: ReactNode
  defaultOpen?: boolean
  variant?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

interface AccordionProps {
  children: ReactNode
  allowMultiple?: boolean
  className?: string
}

const variantStyles = {
  default: {
    header: 'bg-green-50 hover:bg-green-100 border-green-200',
    headerText: 'text-green-900',
    content: 'bg-cream border-green-200',
    icon: 'text-green-600'
  },
  success: {
    header: 'bg-green-100 hover:bg-green-200 border-green-300',
    headerText: 'text-green-900',
    content: 'bg-green-50 border-green-300',
    icon: 'text-green-700'
  },
  warning: {
    header: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
    headerText: 'text-amber-900',
    content: 'bg-amber-25 border-amber-200',
    icon: 'text-amber-600'
  },
  danger: {
    header: 'bg-red-50 hover:bg-red-100 border-red-200',
    headerText: 'text-red-900',
    content: 'bg-red-25 border-red-200',
    icon: 'text-red-600'
  }
}

export function AccordionItem({ 
  title, 
  children, 
  icon, 
  defaultOpen = false, 
  variant = 'default',
  className 
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const styles = variantStyles[variant]

  return (
    <div className={cn('border rounded-lg overflow-hidden', styles.content.split(' ')[1], className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-6 py-4 text-left flex items-center justify-between transition-all duration-200',
          styles.header,
          styles.headerText
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <div className={cn('flex-shrink-0', styles.icon)}>
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn('flex-shrink-0', styles.icon)}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={cn('px-6 py-6 border-t', styles.content)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  )
}

// Compound component pattern
Accordion.Item = AccordionItem

export default Accordion
