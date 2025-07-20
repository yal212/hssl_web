import { Variants } from 'framer-motion'

// Simplified color theme - primarily green with minimal variations
export const colorTheme = {
  primary: {
    gradient: 'from-green-500 to-green-600',
    bg: 'bg-green-600',
    text: 'text-green-600',
    light: 'bg-green-50',
    border: 'border-green-200'
  },
  secondary: {
    gradient: 'from-green-400 to-green-500',
    bg: 'bg-green-500',
    text: 'text-green-500',
    light: 'bg-green-25',
    border: 'border-green-100'
  },
  accent: {
    gradient: 'from-green-600 to-green-700',
    bg: 'bg-green-700',
    text: 'text-green-700',
    light: 'bg-green-100',
    border: 'border-green-300'
  }
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
