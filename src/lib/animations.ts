import { Variants } from 'framer-motion'

// 🌿 HSSL Warm Forest Color System
// Cream background with deep forest green and layered green accents
export const colorTheme = {
  // 🎯 Primary Actions - Deep Green for main CTAs
  primary: {
    gradient: 'from-green-800 to-green-600',
    gradientHover: 'from-green-900 to-green-700',
    bg: 'bg-green-800',
    bgHover: 'bg-green-900',
    bgActive: 'bg-green-950',
    text: 'text-green-800',
    textHover: 'text-green-900',
    light: 'bg-green-50',
    lightHover: 'bg-green-100',
    border: 'border-green-200',
    borderHover: 'border-green-300',
    ring: 'ring-green-700',
    shadow: 'shadow-green-800/25'
  },

  // 🌿 Secondary Actions - Mid Green for supporting elements
  secondary: {
    gradient: 'from-green-600 to-green-400',
    gradientHover: 'from-green-700 to-green-500',
    bg: 'bg-green-600',
    bgHover: 'bg-green-700',
    bgActive: 'bg-green-800',
    text: 'text-green-600',
    textHover: 'text-green-700',
    light: 'bg-green-50',
    lightHover: 'bg-green-100',
    border: 'border-green-200',
    borderHover: 'border-green-300',
    ring: 'ring-green-600',
    shadow: 'shadow-green-600/25'
  },

  // ✨ Success States - Light Mint Green for positive feedback
  success: {
    gradient: 'from-green-300 to-green-400',
    gradientHover: 'from-green-400 to-green-500',
    bg: 'bg-green-300',
    bgHover: 'bg-green-400',
    text: 'text-green-800',
    light: 'bg-green-50',
    border: 'border-green-200',
    ring: 'ring-green-300',
    shadow: 'shadow-green-300/20'
  },

  // ⚠️ Warning States - Warm amber for alerts
  warning: {
    gradient: 'from-amber-500 to-amber-600',
    gradientHover: 'from-amber-600 to-amber-700',
    bg: 'bg-amber-600',
    bgHover: 'bg-amber-700',
    text: 'text-amber-800',
    light: 'bg-amber-50',
    border: 'border-amber-200',
    ring: 'ring-amber-500',
    shadow: 'shadow-amber-500/20'
  },

  // 🚨 Error States - Muted rust tone (organic, not harsh)
  error: {
    gradient: 'from-red-400 to-rose-500',
    gradientHover: 'from-red-500 to-rose-600',
    bg: 'bg-red-500',
    bgHover: 'bg-red-600',
    text: 'text-red-700',
    light: 'bg-red-50',
    border: 'border-red-200',
    ring: 'ring-red-500',
    shadow: 'shadow-red-500/20'
  },

  // 🌿 Neutral/Tertiary - Sage and warm grays for backgrounds
  neutral: {
    gradient: 'from-slate-50 to-stone-100',
    gradientHover: 'from-slate-100 to-stone-200',
    bg: 'bg-slate-100',
    bgHover: 'bg-slate-200',
    text: 'text-slate-600',
    textHover: 'text-slate-700',
    light: 'bg-slate-50',
    lightHover: 'bg-slate-100',
    border: 'border-slate-200',
    borderHover: 'border-slate-300',
    ring: 'ring-slate-500',
    shadow: 'shadow-slate-500/10'
  },

  // 🌱 Accent/Contrast - Pale Green Tint for emphasis
  accent: {
    gradient: 'from-green-200 to-green-300',
    gradientHover: 'from-green-300 to-green-400',
    bg: 'bg-green-200',
    bgHover: 'bg-green-300',
    text: 'text-green-800',
    textHover: 'text-green-900',
    light: 'bg-green-50',
    lightHover: 'bg-green-100',
    border: 'border-green-200',
    borderHover: 'border-green-300',
    ring: 'ring-green-300',
    shadow: 'shadow-green-200/25'
  }
}

// 🌈 Forest Theme Gradient System for Different Use Cases
export const gradientSystem = {
  // Hero sections - Bold, forest gradients
  hero: {
    primary: 'from-green-800 via-green-600 to-green-400',
    secondary: 'from-green-600 via-green-400 to-green-200',
    accent: 'from-green-700 via-green-500 to-green-300'
  },

  // Card backgrounds and overlays - Subtle, warm
  cards: {
    primary: 'from-green-50 via-cream to-green-50',
    secondary: 'from-cream via-green-50 to-cream',
    accent: 'from-green-100 via-green-50 to-cream'
  },

  // Buttons and interactive elements - Deep forest tones
  interactive: {
    primary: 'from-green-800 to-green-600',
    secondary: 'from-green-600 to-green-400',
    accent: 'from-green-700 to-green-500',
    hover: {
      primary: 'from-green-900 to-green-700',
      secondary: 'from-green-700 to-green-500',
      accent: 'from-green-800 to-green-600'
    }
  },

  // Section backgrounds - Warm, earthy transitions
  sections: {
    light: 'from-green-50 via-cream to-green-50',
    medium: 'from-green-100 via-green-50 to-cream',
    dark: 'from-green-800 via-green-700 to-green-900'
  }
}

// 🎨 Section Background Alternation Patterns - Forest Theme
export const sectionPatterns = {
  // Standard alternating pattern
  standard: [
    'bg-cream',
    'bg-gradient-to-br from-green-50 via-cream to-green-100',
    'bg-green-50',
    'bg-gradient-to-br from-green-100 via-green-50 to-cream'
  ],

  // Subtle gradient pattern
  subtle: [
    'bg-gradient-to-br from-cream via-green-50 to-cream',
    'bg-gradient-to-br from-green-50 via-cream to-green-100',
    'bg-gradient-to-br from-green-100 via-green-50 to-cream',
    'bg-gradient-to-br from-cream via-green-100 to-green-50'
  ],

  // Bold contrast pattern
  bold: [
    'bg-cream',
    'bg-gradient-to-br from-green-800 to-green-600',
    'bg-green-50',
    'bg-gradient-to-br from-green-600 to-green-700'
  ]
}

// Enhanced animation variants
export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const fadeInDown: Variants = {
  initial: { 
    opacity: 0, 
    y: -60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const fadeInLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const fadeInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -5
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const slideInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 100,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Stagger container for multiple items
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  initial: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Floating animation for hero elements
export const floating: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Pulse animation for attention-grabbing elements
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Hover animations
export const hoverScale = {
  whileHover: {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}

export const hoverRotate = {
  whileHover: {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  whileTap: {
    scale: 0.95,
    rotate: 0,
    transition: { duration: 0.1 }
  }
}

export const hoverGlow = {
  whileHover: { 
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Text reveal animation
export const textReveal: Variants = {
  initial: { 
    opacity: 0,
    y: 50,
    skewY: 10
  },
  animate: { 
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Page transition
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.98,
    y: 20
  },
  animate: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.98,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Scroll-triggered animations
export const scrollReveal: Variants = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  whileInView: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const scrollStagger: Variants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}
