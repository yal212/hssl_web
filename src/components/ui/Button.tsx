import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  asChild?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, asChild, fullWidth, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
      default: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 shadow-sm hover:shadow-md active:scale-[0.98]',
      primary: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 shadow-sm hover:shadow-md active:scale-[0.98]',
      secondary: 'bg-green-100 text-green-800 hover:bg-green-200 focus-visible:ring-green-500 border border-green-200 hover:border-green-300',
      outline: 'border border-green-600 text-green-600 hover:bg-green-50 focus-visible:ring-green-500 hover:border-green-700 hover:text-green-700',
      ghost: 'text-green-600 hover:bg-green-50 focus-visible:ring-green-500 hover:text-green-700',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm hover:shadow-md active:scale-[0.98]',
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 shadow-sm hover:shadow-md active:scale-[0.98]'
    }

    const sizes = {
      xs: 'h-7 px-2.5 text-xs rounded-md',
      sm: 'h-8 px-3 text-sm rounded-md',
      md: 'h-10 px-4 py-2 text-sm rounded-lg',
      lg: 'h-12 px-6 text-base rounded-lg',
      xl: 'h-14 px-8 text-lg rounded-xl'
    }

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    )

    if (asChild) {
      // If asChild is true, we expect children to be a single React element
      // and we'll clone it with our classes
      const child = children as ReactNode
      if (React.isValidElement(child)) {
        // const childProps = child.props as any // eslint-disable-line @typescript-eslint/no-explicit-any
        return (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {React.cloneElement(child as React.ReactElement<any>, { // eslint-disable-line @typescript-eslint/no-explicit-any
              className: cn(classes, (child.props as any)?.className), // eslint-disable-line @typescript-eslint/no-explicit-any
              ref,
              ...props
            })}
          </motion.div>
        )
      }
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
        className="inline-block"
      >
        <button
          ref={ref}
          className={classes}
          disabled={isLoading || props.disabled}
          {...props}
        >
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {children}
        </button>
      </motion.div>
    )
  }
)

Button.displayName = 'Button'

export { Button }
