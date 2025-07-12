import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, asChild, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      default: 'bg-green-600 text-white hover:bg-green-700',
      primary: 'bg-green-600 text-white hover:bg-green-700',
      secondary: 'bg-green-100 text-green-800 hover:bg-green-200',
      outline: 'border border-green-600 text-green-600 hover:bg-green-50',
      ghost: 'text-green-600 hover:bg-green-50'
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg'
    }

    const classes = cn(baseClasses, variants[variant], sizes[size], className)

    if (asChild) {
      // If asChild is true, we expect children to be a single React element
      // and we'll clone it with our classes
      const child = children as ReactNode
      if (React.isValidElement(child)) {
        const childProps = child.props as any
        return (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {React.cloneElement(child, {
              className: cn(classes, childProps.className),
              ref,
              ...props
            })}
          </motion.div>
        )
      }
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
