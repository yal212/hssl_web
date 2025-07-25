import { Variants } from 'framer-motion'

// 🌱 HSSL Organic Eco-Friendly Color System
// Unified emerald-teal theme with clearly defined roles and accessibility focus
export const colorTheme = {
  // 🎯 Primary Actions - Bold, accessible emerald for main CTAs
  primary: {
    gradient: 'from-emerald-500 to-teal-600',
    gradientHover: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-600',
    bgHover: 'bg-emerald-700',
    bgActive: 'bg-emerald-800',
    text: 'text-emerald-600',
    textHover: 'text-emerald-700',
    light: 'bg-emerald-50',
    lightHover: 'bg-emerald-100',
    border: 'border-emerald-200',
    borderHover: 'border-emerald-300',
    ring: 'ring-emerald-500',
    shadow: 'shadow-emerald-500/25'
  },

  // 🌊 Secondary Actions - Soft teal for supporting elements
  secondary: {
    gradient: 'from-teal-400 to-emerald-500',
    gradientHover: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-500',
    bgHover: 'bg-teal-600',
    bgActive: 'bg-teal-700',
    text: 'text-teal-600',
    textHover: 'text-teal-700',
    light: 'bg-teal-50',
    lightHover: 'bg-teal-100',
    border: 'border-teal-200',
    borderHover: 'border-teal-300',
    ring: 'ring-teal-500',
    shadow: 'shadow-teal-500/25'
  },

  // ✨ Success States - Cool emerald variants for positive feedback
  success: {
    gradient: 'from-emerald-400 to-green-500',
    gradientHover: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-500',
    bgHover: 'bg-emerald-600',
    text: 'text-emerald-700',
    light: 'bg-emerald-50',
    border: 'border-emerald-200',
    ring: 'ring-emerald-500',
    shadow: 'shadow-emerald-500/20'
  },

  // ⚠️ Warning States - Earthy amber for alerts (organic, not neon)
  warning: {
    gradient: 'from-amber-400 to-orange-500',
    gradientHover: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500',
    bgHover: 'bg-amber-600',
    text: 'text-amber-700',
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

  // 🌱 Accent/Contrast - Deep forest green for emphasis
  accent: {
    gradient: 'from-green-600 to-emerald-700',
    gradientHover: 'from-green-700 to-emerald-800',
    bg: 'bg-green-700',
    bgHover: 'bg-green-800',
    text: 'text-green-700',
    textHover: 'text-green-800',
    light: 'bg-green-50',
    lightHover: 'bg-green-100',
    border: 'border-green-300',
    borderHover: 'border-green-400',
    ring: 'ring-green-600',
    shadow: 'shadow-green-600/25'
  }
}

// 🌈 Recommended Gradient System for Different Use Cases
export const gradientSystem = {
  // Hero sections - Bold, eye-catching gradients
  hero: {
    primary: 'from-emerald-500 via-teal-500 to-green-600',
    secondary: 'from-teal-400 via-emerald-400 to-lime-500',
    accent: 'from-green-600 via-emerald-600 to-teal-700'
  },

  // Card backgrounds and overlays - Subtle, elegant
  cards: {
    primary: 'from-emerald-50 via-white to-teal-50',
    secondary: 'from-teal-50 via-emerald-50 to-green-50',
    accent: 'from-white via-emerald-50 to-white'
  },

  // Buttons and interactive elements - Vibrant, engaging
  interactive: {
    primary: 'from-emerald-500 to-teal-600',
    secondary: 'from-teal-400 to-emerald-500',
    accent: 'from-green-600 to-emerald-700',
    hover: {
      primary: 'from-emerald-600 to-teal-700',
      secondary: 'from-teal-500 to-emerald-600',
      accent: 'from-green-700 to-emerald-800'
    }
  },

  // Section backgrounds - Organic, flowing transitions
  sections: {
    light: 'from-emerald-50 via-white to-teal-50',
    medium: 'from-emerald-100 via-teal-50 to-green-100',
    dark: 'from-emerald-800 via-teal-800 to-green-900'
  }
}

// 🎨 Section Background Alternation Patterns
export const sectionPatterns = {
  // Standard alternating pattern
  standard: [
    'bg-white',
    'bg-gradient-to-br from-emerald-50 via-white to-teal-50',
    'bg-emerald-50',
    'bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50'
  ],

  // Subtle gradient pattern
  subtle: [
    'bg-gradient-to-br from-white via-emerald-50 to-white',
    'bg-gradient-to-br from-emerald-50 via-white to-teal-50',
    'bg-gradient-to-br from-teal-50 via-emerald-50 to-white',
    'bg-gradient-to-br from-white via-teal-50 to-emerald-50'
  ],

  // Bold contrast pattern
  bold: [
    'bg-white',
    'bg-gradient-to-br from-emerald-500 to-teal-600',
    'bg-emerald-50',
    'bg-gradient-to-br from-teal-600 to-green-700'
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
