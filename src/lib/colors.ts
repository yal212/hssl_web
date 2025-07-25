// 🎨 HSSL Color System Utilities
// Comprehensive color management for organic, eco-friendly design

import { colorTheme, gradientSystem, sectionPatterns } from './animations'

// 🌱 Color Role Definitions
export const colorRoles = {
  // Primary brand colors
  brand: {
    primary: 'emerald-600',
    secondary: 'teal-500',
    accent: 'green-700'
  },
  
  // Semantic colors
  semantic: {
    success: 'emerald-500',
    warning: 'amber-500',
    error: 'red-500',
    info: 'teal-500'
  },
  
  // UI element colors
  ui: {
    background: 'white',
    surface: 'slate-50',
    border: 'slate-200',
    text: {
      primary: 'slate-900',
      secondary: 'slate-600',
      muted: 'slate-500'
    }
  }
}

// 🎯 Button Color Variants (Tailwind-compatible)
export const buttonVariants = {
  // Primary action buttons
  primary: {
    base: 'bg-emerald-600 text-white border-emerald-600',
    hover: 'hover:bg-emerald-700 hover:border-emerald-700',
    active: 'active:bg-emerald-800',
    focus: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
    disabled: 'disabled:bg-emerald-300 disabled:border-emerald-300'
  },
  
  // Secondary action buttons
  secondary: {
    base: 'bg-teal-100 text-teal-800 border-teal-200',
    hover: 'hover:bg-teal-200 hover:border-teal-300',
    active: 'active:bg-teal-300',
    focus: 'focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
    disabled: 'disabled:bg-teal-50 disabled:text-teal-400'
  },
  
  // Outline buttons
  outline: {
    base: 'bg-transparent text-emerald-600 border-emerald-600',
    hover: 'hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-700',
    active: 'active:bg-emerald-100',
    focus: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
    disabled: 'disabled:text-emerald-300 disabled:border-emerald-300'
  },
  
  // Ghost buttons
  ghost: {
    base: 'bg-transparent text-emerald-600 border-transparent',
    hover: 'hover:bg-emerald-50 hover:text-emerald-700',
    active: 'active:bg-emerald-100',
    focus: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
    disabled: 'disabled:text-emerald-300'
  },
  
  // Success buttons
  success: {
    base: 'bg-emerald-500 text-white border-emerald-500',
    hover: 'hover:bg-emerald-600 hover:border-emerald-600',
    active: 'active:bg-emerald-700',
    focus: 'focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
    disabled: 'disabled:bg-emerald-300 disabled:border-emerald-300'
  },
  
  // Warning buttons
  warning: {
    base: 'bg-amber-500 text-white border-amber-500',
    hover: 'hover:bg-amber-600 hover:border-amber-600',
    active: 'active:bg-amber-700',
    focus: 'focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
    disabled: 'disabled:bg-amber-300 disabled:border-amber-300'
  },
  
  // Error/destructive buttons
  destructive: {
    base: 'bg-red-500 text-white border-red-500',
    hover: 'hover:bg-red-600 hover:border-red-600',
    active: 'active:bg-red-700',
    focus: 'focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    disabled: 'disabled:bg-red-300 disabled:border-red-300'
  }
}

// 🃏 Card Background Variants
export const cardVariants = {
  // Default white card
  default: {
    base: 'bg-white border-slate-200',
    hover: 'hover:bg-slate-50 hover:border-slate-300',
    shadow: 'shadow-sm hover:shadow-md'
  },
  
  // Subtle gradient cards
  gradient: {
    base: 'bg-gradient-to-br from-white to-emerald-50 border-emerald-100',
    hover: 'hover:from-emerald-50 hover:to-emerald-100 hover:border-emerald-200',
    shadow: 'shadow-sm hover:shadow-lg'
  },
  
  // Elevated cards
  elevated: {
    base: 'bg-white border-slate-200',
    hover: 'hover:bg-slate-50',
    shadow: 'shadow-lg hover:shadow-xl'
  },
  
  // Colored cards
  colored: {
    emerald: {
      base: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      hover: 'hover:bg-emerald-100 hover:border-emerald-300'
    },
    teal: {
      base: 'bg-teal-50 border-teal-200 text-teal-900',
      hover: 'hover:bg-teal-100 hover:border-teal-300'
    },
    green: {
      base: 'bg-green-50 border-green-200 text-green-900',
      hover: 'hover:bg-green-100 hover:border-green-300'
    }
  }
}

// 🎨 Focus Ring Styles
export const focusRings = {
  primary: 'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
  secondary: 'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2',
  success: 'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
  warning: 'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
  error: 'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  neutral: 'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
}

// 🌈 Utility Functions
export const colorUtils = {
  // Get complete button classes
  getButtonClasses: (variant: keyof typeof buttonVariants) => {
    const v = buttonVariants[variant]
    return `${v.base} ${v.hover} ${v.active} ${v.focus} ${v.disabled} transition-all duration-200`
  },
  
  // Get complete card classes
  getCardClasses: (variant: keyof typeof cardVariants, colored?: keyof typeof cardVariants.colored) => {
    if (variant === 'colored' && colored) {
      const c = cardVariants.colored[colored]
      return `${c.base} ${c.hover} border rounded-lg transition-all duration-200`
    }
    const v = cardVariants[variant as keyof Omit<typeof cardVariants, 'colored'>]
    return `${v.base} ${v.hover} ${v.shadow} border rounded-lg transition-all duration-200`
  },
  
  // Get section background by index
  getSectionBackground: (index: number, pattern: keyof typeof sectionPatterns = 'standard') => {
    const patterns = sectionPatterns[pattern]
    return patterns[index % patterns.length]
  },
  
  // Get gradient by use case
  getGradient: (useCase: keyof typeof gradientSystem, variant: string = 'primary') => {
    const gradients = gradientSystem[useCase]
    if (typeof gradients === 'object' && gradients !== null) {
      const gradientsObj = gradients as Record<string, string | Record<string, string>>
      const result = gradientsObj[variant] || gradientsObj.primary || Object.values(gradients)[0]
      return typeof result === 'string' ? result : Object.values(result)[0] || ''
    }
    return typeof gradients === 'string' ? gradients : ''
  }
}

// 📋 Color Accessibility Guidelines
export const accessibilityGuidelines = {
  // Minimum contrast ratios (WCAG 2.1)
  contrast: {
    normal: 4.5, // AA standard
    large: 3,    // AA standard for large text
    enhanced: 7  // AAA standard
  },
  
  // Recommended color combinations
  combinations: {
    highContrast: [
      { bg: 'white', text: 'slate-900' },
      { bg: 'emerald-600', text: 'white' },
      { bg: 'slate-900', text: 'white' }
    ],
    mediumContrast: [
      { bg: 'emerald-50', text: 'emerald-900' },
      { bg: 'teal-50', text: 'teal-900' },
      { bg: 'slate-100', text: 'slate-800' }
    ]
  }
}

// Export everything for easy access
export { colorTheme, gradientSystem, sectionPatterns }
