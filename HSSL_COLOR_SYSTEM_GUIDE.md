# 🌱 HSSL Color System Guide

## Overview
This comprehensive color system establishes a unified, organic, eco-friendly visual identity for the HSSL website. All colors are designed to work harmoniously while maintaining excellent accessibility standards.

## 🎨 Color Roles & Usage

### Primary Actions (Emerald)
**Use for:** Main CTAs, primary buttons, key interactive elements
```css
/* Tailwind Classes */
bg-emerald-600 text-white
hover:bg-emerald-700
focus:ring-emerald-500
border-emerald-600

/* CSS Variables */
var(--primary-600)
var(--primary-700)
```

### Secondary Actions (Teal)
**Use for:** Supporting buttons, secondary CTAs, info components
```css
/* Tailwind Classes */
bg-teal-500 text-white
hover:bg-teal-600
focus:ring-teal-500
border-teal-500

/* CSS Variables */
var(--secondary-500)
var(--secondary-600)
```

### Success States (Cool Emerald)
**Use for:** Success messages, positive feedback, completed states
```css
/* Tailwind Classes */
bg-emerald-500 text-white
bg-emerald-50 text-emerald-700
border-emerald-200

/* CSS Variables */
var(--success-500)
var(--success-50)
```

### Warning States (Earthy Amber)
**Use for:** Warnings, caution messages, pending states
```css
/* Tailwind Classes */
bg-amber-500 text-white
bg-amber-50 text-amber-700
border-amber-200

/* CSS Variables */
var(--warning-500)
var(--warning-50)
```

### Error States (Muted Rust)
**Use for:** Error messages, destructive actions, failed states
```css
/* Tailwind Classes */
bg-red-500 text-white
bg-red-50 text-red-700
border-red-200

/* CSS Variables */
var(--error-500)
var(--error-50)
```

### Neutral/Tertiary (Sage & Warm Grays)
**Use for:** Backgrounds, borders, muted text, disabled states
```css
/* Tailwind Classes */
bg-slate-100 text-slate-600
bg-stone-50 text-stone-700
border-slate-200

/* CSS Variables */
var(--neutral-100)
var(--neutral-600)
```

## 🌈 Recommended Gradients

### Hero Sections
```css
/* Primary Hero */
bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600

/* Secondary Hero */
bg-gradient-to-br from-teal-400 via-emerald-400 to-lime-500

/* Accent Hero */
bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700
```

### Card Backgrounds
```css
/* Subtle Card */
bg-gradient-to-br from-emerald-50 via-white to-teal-50

/* Medium Card */
bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50

/* Accent Card */
bg-gradient-to-br from-white via-emerald-50 to-white
```

### Interactive Elements
```css
/* Primary Button */
bg-gradient-to-r from-emerald-500 to-teal-600
hover:from-emerald-600 hover:to-teal-700

/* Secondary Button */
bg-gradient-to-r from-teal-400 to-emerald-500
hover:from-teal-500 hover:to-emerald-600
```

## 🧩 Component Guidelines

### Buttons
```tsx
// Primary Action
<Button className="btn-primary">Primary Action</Button>

// Secondary Action
<Button className="btn-secondary">Secondary Action</Button>

// Outline Style
<Button className="btn-outline">Outline Button</Button>

// Ghost Style
<Button className="btn-ghost">Ghost Button</Button>
```

### Cards
```tsx
// Default Card
<Card className="card-default">Content</Card>

// Gradient Card
<Card className="card-gradient">Content</Card>

// Colored Card
<Card className="card-emerald">Emerald Content</Card>
<Card className="card-teal">Teal Content</Card>
```

### Focus States
```tsx
// Primary Focus
<input className="focus-ring" />

// Secondary Focus
<input className="focus-ring-secondary" />

// Success Focus
<input className="focus-ring-success" />
```

## 📋 Section Background Patterns

### Standard Alternating
```css
/* Section 1 */ bg-white
/* Section 2 */ bg-gradient-to-br from-emerald-50 via-white to-teal-50
/* Section 3 */ bg-emerald-50
/* Section 4 */ bg-gradient-to-br from-teal-50 via-emerald-50 to-green-50
```

### Subtle Gradient
```css
/* Section 1 */ bg-gradient-to-br from-white via-emerald-50 to-white
/* Section 2 */ bg-gradient-to-br from-emerald-50 via-white to-teal-50
/* Section 3 */ bg-gradient-to-br from-teal-50 via-emerald-50 to-white
/* Section 4 */ bg-gradient-to-br from-white via-teal-50 to-emerald-50
```

## ♿ Accessibility Guidelines

### Contrast Ratios (WCAG 2.1)
- **Normal Text:** 4.5:1 minimum (AA)
- **Large Text:** 3:1 minimum (AA)
- **Enhanced:** 7:1 (AAA)

### High Contrast Combinations
```css
/* White background with dark text */
bg-white text-slate-900

/* Emerald background with white text */
bg-emerald-600 text-white

/* Dark background with white text */
bg-slate-900 text-white
```

### Medium Contrast Combinations
```css
/* Light emerald with dark emerald text */
bg-emerald-50 text-emerald-900

/* Light teal with dark teal text */
bg-teal-50 text-teal-900

/* Light slate with dark slate text */
bg-slate-100 text-slate-800
```

## 🚀 Implementation Examples

### Using the Color Utils
```tsx
import { colorUtils } from '@/lib/colors'

// Get complete button classes
const buttonClasses = colorUtils.getButtonClasses('primary')

// Get complete card classes
const cardClasses = colorUtils.getCardClasses('gradient')

// Get section background by index
const sectionBg = colorUtils.getSectionBackground(2, 'subtle')

// Get gradient by use case
const heroGradient = colorUtils.getGradient('hero', 'primary')
```

### Using Color Theme
```tsx
import { colorTheme } from '@/lib/animations'

// Primary gradient
className={`bg-gradient-to-r ${colorTheme.primary.gradient}`}

// Hover states
className={`${colorTheme.primary.bg} ${colorTheme.primary.bgHover}`}

// Focus rings
className={`${colorTheme.primary.ring}`}
```

## 📝 Best Practices

1. **Consistency:** Always use the defined color roles for their intended purposes
2. **Accessibility:** Test color combinations for sufficient contrast
3. **Hierarchy:** Use color to establish clear visual hierarchy
4. **Restraint:** Don't use too many colors in a single component
5. **Context:** Consider the emotional context of color choices
6. **Testing:** Test colors across different devices and lighting conditions

## 🔧 Maintenance

- All colors are centralized in `/src/lib/colors.ts` and `/src/lib/animations.ts`
- CSS variables are defined in `/src/app/globals.css`
- Update colors in one place to affect the entire system
- Use the utility functions for consistent application
