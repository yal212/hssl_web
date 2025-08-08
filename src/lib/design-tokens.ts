// 🎨 HSSL Design System Tokens
// Comprehensive design tokens for consistent styling across the application

export const designTokens = {
  // 📏 Typography Scale (Modular Scale: Base 16px, Ratio 1.25)
  typography: {
    fontFamily: {
      sans: 'var(--font-inter), system-ui, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px - Base
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
      '8xl': '6rem'     // 96px
    },
    lineHeight: {
      none: '1',
      tight: '1.2',     // For headings
      snug: '1.375',
      normal: '1.5',    // For paragraphs
      relaxed: '1.625',
      loose: '2'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em'
    }
  },

  // 📐 Spacing Scale (Base unit: 1rem = 16px)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
    '6xl': '12rem'   // 192px
  },

  // 🎨 Color Palette (HSSL Warm Forest System)
  colors: {
    cream: '#f4efe1',
    forest: '#214d3a',
    green: {
      50: '#f0f7f3',
      100: '#dbeee3',
      200: '#b8dcc8',
      300: '#8bc4a4',
      400: '#5ea67d',
      500: '#3f8b60',
      600: '#2a5e44',
      700: '#214d3a',
      800: '#1c3f30',
      900: '#173327'
    },
    gray: {
      50: '#faf9f7',
      100: '#f5f4f1',
      200: '#ebe8e3',
      300: '#ddd8d1',
      400: '#b8b0a7',
      500: '#8b8078',
      600: '#78716c',
      700: '#5d564f',
      800: '#4a433d',
      900: '#3d362f'
    }
  },

  // 🔘 Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px'
  },

  // 🌫️ Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
  },

  // 🎭 Animation & Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // 📱 Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // 🎯 Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
} as const

// 🎨 Semantic Color Mappings
export const semanticColors = {
  background: {
    primary: designTokens.colors.cream,
    secondary: designTokens.colors.green[50],
    tertiary: designTokens.colors.green[100]
  },
  text: {
    primary: designTokens.colors.forest,
    secondary: designTokens.colors.green[700],
    muted: designTokens.colors.green[600],
    inverse: designTokens.colors.cream
  },
  border: {
    primary: designTokens.colors.green[200],
    secondary: designTokens.colors.green[300],
    focus: designTokens.colors.green[600]
  },
  action: {
    primary: designTokens.colors.green[800],
    primaryHover: designTokens.colors.green[900],
    secondary: designTokens.colors.green[600],
    secondaryHover: designTokens.colors.green[700]
  }
} as const

// 🎯 Component Variants
export const componentVariants = {
  button: {
    primary: {
      bg: semanticColors.action.primary,
      bgHover: semanticColors.action.primaryHover,
      text: semanticColors.text.inverse,
      border: semanticColors.action.primary
    },
    secondary: {
      bg: semanticColors.background.secondary,
      bgHover: semanticColors.background.tertiary,
      text: semanticColors.action.primary,
      border: semanticColors.border.primary
    },
    outline: {
      bg: 'transparent',
      bgHover: semanticColors.background.secondary,
      text: semanticColors.action.primary,
      border: semanticColors.border.primary
    }
  },
  card: {
    default: {
      bg: semanticColors.background.primary,
      border: semanticColors.border.primary,
      shadow: designTokens.boxShadow.sm
    },
    elevated: {
      bg: semanticColors.background.primary,
      border: semanticColors.border.primary,
      shadow: designTokens.boxShadow.lg
    }
  }
} as const

// 🔧 Utility Functions
export const getResponsiveValue = (base: string, sm?: string, md?: string, lg?: string, xl?: string) => {
  const values = [base, sm, md, lg, xl].filter(Boolean)
  return values.join(' ')
}

export const getSpacing = (size: keyof typeof designTokens.spacing) => designTokens.spacing[size]
export const getFontSize = (size: keyof typeof designTokens.typography.fontSize) => designTokens.typography.fontSize[size]
export const getColor = (color: string) => {
  const [colorName, shade] = color.split('-')
  if (shade && colorName in designTokens.colors) {
    const colorObj = designTokens.colors[colorName as keyof typeof designTokens.colors]
    if (typeof colorObj === 'object' && shade in colorObj) {
      return (colorObj as Record<string, string>)[shade]
    }
  }
  return designTokens.colors[color as keyof typeof designTokens.colors] || color
}

export default designTokens
