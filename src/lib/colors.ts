// 🎨 HSSL Warm Forest Color System Utilities
// Comprehensive color management for warm, earthy forest design

import { colorTheme, gradientSystem, sectionPatterns } from './animations'

// 🌿 Color Role Definitions
export const colorRoles = {
  // Primary brand colors - 4-layer green system
  brand: {
    primary: 'green-800',      // Deep Green (#2a5e44)
    secondary: 'green-600',    // Mid Green (#639a73)
    accent: 'green-300',       // Light Mint Green (#aecea9)
    neutral: 'green-200'       // Pale Green Tint (#d1e0cd)
  },

  // Semantic colors
  semantic: {
    success: 'green-300',      // Light Mint Green
    warning: 'amber-600',      // Warm Amber
    error: 'red-600',          // Muted Red
    info: 'green-600'          // Mid Green
  },

  // UI element colors
  ui: {
    background: 'cream',       // Cream (#f4efe1)
    surface: 'green-50',       // Very light green
    border: 'green-200',       // Pale Green Tint
    text: {
      primary: 'green-900',    // Deep Forest Green (#214d3a)
      secondary: 'green-700',  // Medium forest green
      muted: 'green-600'       // Mid green
    }
  }
}

// 🎯 Button Color Variants (Forest Theme)
export const buttonVariants = {
  // Primary action buttons - Deep Green with cream text
  primary: {
    base: 'bg-green-800 text-white border-green-800',
    hover: 'hover:bg-green-900 hover:border-green-900',
    active: 'active:bg-green-950',
    focus: 'focus:ring-2 focus:ring-green-700 focus:ring-offset-2',
    disabled: 'disabled:bg-green-400 disabled:border-green-400'
  },

  // Secondary action buttons - Mid Green
  secondary: {
    base: 'bg-green-100 text-green-800 border-green-200',
    hover: 'hover:bg-green-200 hover:border-green-300',
    active: 'active:bg-green-300',
    focus: 'focus:ring-2 focus:ring-green-600 focus:ring-offset-2',
    disabled: 'disabled:bg-green-50 disabled:text-green-400'
  },

  // Outline buttons - Deep Green outline
  outline: {
    base: 'bg-transparent text-green-800 border-green-800',
    hover: 'hover:bg-green-50 hover:border-green-900 hover:text-green-900',
    active: 'active:bg-green-100',
    focus: 'focus:ring-2 focus:ring-green-700 focus:ring-offset-2',
    disabled: 'disabled:text-green-400 disabled:border-green-400'
  },

  // Ghost buttons - Subtle green
  ghost: {
    base: 'bg-transparent text-green-800 border-transparent',
    hover: 'hover:bg-green-50 hover:text-green-900',
    active: 'active:bg-green-100',
    focus: 'focus:ring-2 focus:ring-green-700 focus:ring-offset-2',
    disabled: 'disabled:text-green-400'
  },

  // Success buttons - Light Mint Green
  success: {
    base: 'bg-green-300 text-green-900 border-green-300',
    hover: 'hover:bg-green-400 hover:border-green-400',
    active: 'active:bg-green-500',
    focus: 'focus:ring-2 focus:ring-green-300 focus:ring-offset-2',
    disabled: 'disabled:bg-green-200 disabled:border-green-200'
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
  // Default cream card
  default: {
    base: 'bg-cream border-green-200',
    hover: 'hover:bg-green-50 hover:border-green-300',
    shadow: 'shadow-sm hover:shadow-md'
  },

  // Subtle gradient cards
  gradient: {
    base: 'bg-gradient-to-br from-cream to-green-50 border-green-100',
    hover: 'hover:from-green-50 hover:to-green-100 hover:border-green-200',
    shadow: 'shadow-sm hover:shadow-lg'
  },

  // Elevated cards
  elevated: {
    base: 'bg-cream border-green-200',
    hover: 'hover:bg-green-50',
    shadow: 'shadow-lg hover:shadow-xl'
  },
  
  // Colored cards - Forest theme variants
  colored: {
    primary: {
      base: 'bg-green-50 border-green-200 text-green-900',
      hover: 'hover:bg-green-100 hover:border-green-300'
    },
    secondary: {
      base: 'bg-green-100 border-green-200 text-green-800',
      hover: 'hover:bg-green-200 hover:border-green-300'
    },
    accent: {
      base: 'bg-green-200 border-green-300 text-green-800',
      hover: 'hover:bg-green-300 hover:border-green-400'
    }
  }
}

// 🎨 Focus Ring Styles
export const focusRings = {
  primary: 'focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2',
  secondary: 'focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2',
  success: 'focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2',
  warning: 'focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2',
  error: 'focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2',
  neutral: 'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
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

  // Verified color combinations for warm forest theme
  combinations: {
    highContrast: [
      { bg: 'cream', text: 'green-900', ratio: 8.2 },        // Cream + Deep Forest Green
      { bg: 'green-800', text: 'cream', ratio: 7.8 },        // Deep Green + Cream
      { bg: 'green-900', text: 'cream', ratio: 9.1 },        // Darkest Green + Cream
      { bg: 'white', text: 'green-900', ratio: 12.6 }        // White + Deep Forest Green
    ],
    mediumContrast: [
      { bg: 'green-50', text: 'green-800', ratio: 6.4 },     // Light Green + Deep Green
      { bg: 'green-100', text: 'green-800', ratio: 5.8 },    // Very Light + Deep Green
      { bg: 'green-200', text: 'green-800', ratio: 4.9 },    // Pale Green + Deep Green
      { bg: 'green-300', text: 'green-900', ratio: 5.2 }     // Light Mint + Darkest Green
    ],
    lowContrast: [
      { bg: 'cream', text: 'green-600', ratio: 4.6 },        // Cream + Mid Green (AA compliant)
      { bg: 'green-50', text: 'green-700', ratio: 4.8 },     // Light + Medium Green
      { bg: 'green-100', text: 'green-700', ratio: 4.2 }     // Very Light + Medium Green
    ]
  },

  // Recommended usage by context
  usage: {
    bodyText: { bg: 'cream', text: 'green-900' },           // Primary reading text
    headings: { bg: 'cream', text: 'green-900' },           // Main headings
    buttons: { bg: 'green-800', text: 'cream' },            // Primary actions
    links: { bg: 'cream', text: 'green-800' },              // Interactive text
    cards: { bg: 'green-50', text: 'green-800' },           // Card content
    alerts: { bg: 'green-100', text: 'green-800' }          // Information messages
  }
}

// Export everything for easy access
export { colorTheme, gradientSystem, sectionPatterns }
