// 🎨 HSSL Icon System
// Centralized icon management with consistent styling and behavior

import {
  // Navigation & UI
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  
  // Actions
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Share2,
  Copy,
  Check,
  AlertCircle,
  Info,
  
  // User & Auth
  User,
  Users,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
  
  // Content
  Image,
  FileText,
  Calendar,
  Clock,
  Tag,
  Search,
  Filter,
  
  // Nature & Environment (HSSL Theme)
  Leaf,
  TreePine,
  Droplets,
  Recycle,
  Globe,
  Sun,
  Moon,
  
  // Business & Impact
  Heart,
  HandHeart,
  Gift,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Target,
  Award,
  
  // Education & Learning
  GraduationCap,
  BookOpen,
  Lightbulb,
  Microscope,
  FlaskConical,
  
  // Communication
  Mail,
  Phone,
  MessageCircle,
  Send,
  
  // Status & Feedback
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  
  // Social & Community
  Building,
  Handshake,
  Shield,
  
  type LucideIcon
} from 'lucide-react'

// 🎯 Icon Categories for Easy Discovery
export const iconCategories = {
  navigation: {
    menu: Menu,
    close: X,
    chevronDown: ChevronDown,
    chevronUp: ChevronUp,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    arrowDown: ArrowDown,
    external: ExternalLink
  },
  
  actions: {
    add: Plus,
    remove: Minus,
    edit: Edit,
    delete: Trash2,
    save: Save,
    download: Download,
    upload: Upload,
    share: Share2,
    copy: Copy,
    confirm: Check,
    alert: AlertCircle,
    info: Info
  },
  
  user: {
    profile: User,
    team: Users,
    login: LogIn,
    logout: LogOut,
    register: UserPlus,
    settings: Settings
  },
  
  content: {
    image: Image,
    document: FileText,
    calendar: Calendar,
    time: Clock,
    tag: Tag,
    search: Search,
    filter: Filter
  },
  
  nature: {
    leaf: Leaf,
    tree: TreePine,
    water: Droplets,
    recycle: Recycle,
    earth: Globe,
    sun: Sun,
    moon: Moon
  },
  
  impact: {
    love: Heart,
    care: HandHeart,
    gift: Gift,
    shop: ShoppingBag,
    money: DollarSign,
    growth: TrendingUp,
    goal: Target,
    achievement: Award
  },
  
  education: {
    graduate: GraduationCap,
    learn: BookOpen,
    idea: Lightbulb,
    research: Microscope,
    experiment: FlaskConical
  },
  
  communication: {
    email: Mail,
    phone: Phone,
    message: MessageCircle,
    send: Send
  },
  
  status: {
    loading: Loader2,
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    magic: Sparkles
  },
  
  community: {
    organization: Building,
    partnership: Handshake,
    protection: Shield
  }
} as const

// 🎨 Icon Styling Variants
export const iconStyles = {
  sizes: {
    xs: 'w-3 h-3',      // 12px
    sm: 'w-4 h-4',      // 16px
    md: 'w-5 h-5',      // 20px
    lg: 'w-6 h-6',      // 24px
    xl: 'w-8 h-8',      // 32px
    '2xl': 'w-10 h-10', // 40px
    '3xl': 'w-12 h-12'  // 48px
  },
  
  colors: {
    primary: 'text-green-800',
    secondary: 'text-green-600',
    muted: 'text-green-500',
    inverse: 'text-cream',
    success: 'text-green-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
    current: 'text-current'
  },
  
  states: {
    default: '',
    hover: 'hover:scale-110 transition-transform duration-200',
    active: 'active:scale-95',
    disabled: 'opacity-50 cursor-not-allowed',
    interactive: 'hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer'
  }
} as const

// 🔧 Icon Utility Functions
export const getIconClasses = (
  size: keyof typeof iconStyles.sizes = 'md',
  color: keyof typeof iconStyles.colors = 'current',
  state: keyof typeof iconStyles.states = 'default'
) => {
  return `${iconStyles.sizes[size]} ${iconStyles.colors[color]} ${iconStyles.states[state]}`
}

// 🎯 Semantic Icon Mappings (for common use cases)
export const semanticIcons = {
  // HSSL Mission Icons
  mission: {
    environment: iconCategories.nature.leaf,
    community: iconCategories.impact.care,
    education: iconCategories.education.graduate,
    sustainability: iconCategories.nature.recycle,
    growth: iconCategories.impact.growth,
    innovation: iconCategories.education.idea
  },
  
  // Action Icons
  cta: {
    shop: iconCategories.impact.shop,
    donate: iconCategories.impact.gift,
    learn: iconCategories.education.learn,
    contact: iconCategories.communication.email,
    share: iconCategories.actions.share
  },
  
  // Status Icons
  feedback: {
    success: iconCategories.status.success,
    error: iconCategories.status.error,
    warning: iconCategories.status.warning,
    loading: iconCategories.status.loading,
    info: iconCategories.actions.info
  },
  
  // Navigation Icons
  nav: {
    home: iconCategories.nature.leaf, // Using leaf as home icon for HSSL
    about: iconCategories.user.team,
    news: iconCategories.content.document,
    education: iconCategories.education.graduate,
    support: iconCategories.impact.love,
    forms: iconCategories.content.document
  }
} as const

// 🌿 HSSL-Specific Icon Combinations
export const hsslIconSets = {
  // Mission pillars
  pillars: [
    { icon: iconCategories.nature.leaf, label: '環境保護', color: 'text-green-600' },
    { icon: iconCategories.impact.care, label: '社會關懷', color: 'text-green-700' },
    { icon: iconCategories.education.graduate, label: '教育價值', color: 'text-green-800' }
  ],
  
  // Impact areas
  impact: [
    { icon: iconCategories.nature.recycle, label: '永續發展', color: 'text-green-600' },
    { icon: iconCategories.impact.growth, label: '社區成長', color: 'text-green-700' },
    { icon: iconCategories.education.idea, label: '創新思維', color: 'text-green-800' }
  ],
  
  // Support methods
  support: [
    { icon: iconCategories.impact.shop, label: '購買產品', color: 'text-green-600' },
    { icon: iconCategories.impact.gift, label: '慈善捐款', color: 'text-green-700' },
    { icon: iconCategories.community.partnership, label: '志工參與', color: 'text-green-800' }
  ]
} as const

// Export commonly used icons for direct import
export {
  // Most common icons
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
  Leaf,
  Sparkles,
  ShoppingBag,
  GraduationCap,
  Mail,
  Share2,
  ExternalLink,
  
  // Type for icon components
  type LucideIcon
}

export default iconCategories
