# Responsive Design Quick Reference

## 🎯 Tailwind Breakpoints

| Breakpoint | Min Width | Device Type |
|------------|-----------|-------------|
| `sm:`      | 640px     | Large phones, small tablets |
| `md:`      | 768px     | Tablets |
| `lg:`      | 1024px    | Small laptops |
| `xl:`      | 1280px    | Desktops |
| `2xl:`     | 1536px    | Large desktops |

## 📱 Common Responsive Patterns

### Responsive Text Sizes
```tsx
// Scales from mobile to desktop
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"

// Using custom utilities
className="text-responsive-3xl"  // 3xl → 4xl → 5xl
```

### Responsive Spacing
```tsx
// Padding
className="p-4 sm:p-6 md:p-8"

// Margin
className="mt-4 sm:mt-6 md:mt-8"

// Gap
className="gap-3 sm:gap-4 md:gap-6"
```

### Responsive Layout
```tsx
// Stack on mobile, row on desktop
className="flex flex-col sm:flex-row"

// Grid columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

// Hide/Show elements
className="hidden md:block"  // Hidden on mobile
className="md:hidden"        // Hidden on desktop
```

### Touch-Friendly Buttons
```tsx
// Minimum 44×44px tap target
<button className="btn-primary min-h-[44px] min-w-[44px]">
  Click Me
</button>

// Or use the utility class
<button className="touch-target">
  Click Me
</button>
```

### Responsive Images
```tsx
import Image from 'next/image';

// Above-the-fold (priority)
<Image
  src={logo}
  alt="Logo"
  width={400}
  height={80}
  className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] h-auto"
  priority
/>

// Below-the-fold (lazy)
<Image
  src={decorative}
  alt=""
  width={300}
  height={400}
  className="object-contain"
  loading="lazy"
/>
```

### Responsive Container
```tsx
// Full width on mobile, constrained on desktop
<div className="container-inner">
  {/* Content */}
</div>

// Custom max-width
<div className="max-w-3xl mx-auto px-4 sm:px-6">
  {/* Content */}
</div>
```

## 🎨 Component Patterns

### Mobile Menu
```tsx
// Desktop nav
<nav className="hidden md:flex">
  {/* Desktop links */}
</nav>

// Mobile hamburger
<button className="md:hidden">
  <HamburgerIcon />
</button>
```

### Responsive Cards
```tsx
<div className="card p-4 sm:p-6">
  <h3 className="text-base sm:text-lg">Title</h3>
  <p className="text-xs sm:text-sm">Description</p>
</div>
```

### Horizontal Scroll Table
```tsx
<div className="overflow-x-auto -mx-4 sm:mx-0">
  <table className="min-w-full">
    {/* Table content */}
  </table>
</div>
```

## ♿ Accessibility

### ARIA Labels
```tsx
<button aria-label="Close menu">×</button>
<nav aria-label="Main navigation">...</nav>
```

### Keyboard Navigation
```tsx
<th
  onClick={() => sort('name')}
  onKeyDown={(e) => e.key === 'Enter' && sort('name')}
  role="button"
  tabIndex={0}
>
  Name
</th>
```

### Focus States
```tsx
className="focus:outline-none focus:ring-2 focus:ring-brand/60"
```

## 🚀 Performance Tips

1. **Lazy load images below the fold**
   ```tsx
   <Image loading="lazy" ... />
   ```

2. **Hide decorative images on mobile**
   ```tsx
   className="hidden lg:block"
   ```

3. **Use responsive gradients**
   ```tsx
   // Smaller on mobile
   background: radial-gradient(400px 150px ...)
   
   // Larger on desktop
   @media (min-width: 768px) {
     background: radial-gradient(600px 200px ...)
   }
   ```

4. **Prevent horizontal overflow**
   ```tsx
   <body className="overflow-x-hidden">
   ```

## 📏 Sizing Guidelines

### Touch Targets
- **Minimum**: 44×44px (Apple HIG, WCAG 2.1)
- **Recommended**: 48×48px (Material Design)

### Font Sizes
- **Body text**: 14px (mobile), 16px (desktop)
- **Small text**: 12px (mobile), 14px (desktop)
- **Headings**: Scale appropriately per breakpoint

### Spacing
- **Mobile**: 16px (1rem) base spacing
- **Desktop**: 24px (1.5rem) base spacing

## 🎯 Testing Viewports

```
Mobile:
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 390px (iPhone 14 Pro)
- 414px (iPhone 14 Pro Max)

Tablet:
- 768px (iPad)
- 810px (iPad Air)
- 1024px (iPad Pro)

Desktop:
- 1280px (Laptop)
- 1440px (Desktop)
- 1920px (Full HD)
```

## 🛠️ Utility Classes

### Custom Utilities
```css
.touch-target          /* 44×44px minimum */
.text-responsive-xs    /* xs → sm */
.text-responsive-sm    /* sm → base */
.text-responsive-base  /* base → lg */
.text-responsive-lg    /* lg → xl */
.text-responsive-xl    /* xl → 2xl */
.text-responsive-2xl   /* 2xl → 3xl */
.text-responsive-3xl   /* 3xl → 4xl → 5xl */
.no-scrollbar          /* Hide scrollbars */
```

### Button Classes
```css
.btn-primary  /* Primary button with touch target */
.btn-ghost    /* Ghost button with touch target */
```

## 🔍 Debugging

### Check Responsive Layout
```tsx
// Add temporary border
className="border-2 border-red-500"

// Show breakpoint indicator
<div className="fixed top-0 left-0 bg-black text-white p-2 z-50">
  <span className="sm:hidden">XS</span>
  <span className="hidden sm:inline md:hidden">SM</span>
  <span className="hidden md:inline lg:hidden">MD</span>
  <span className="hidden lg:inline xl:hidden">LG</span>
  <span className="hidden xl:inline">XL</span>
</div>
```

## 📱 Mobile-First Approach

Always start with mobile styles, then enhance for larger screens:

```tsx
// ✅ Good (mobile-first)
className="text-sm sm:text-base md:text-lg"

// ❌ Bad (desktop-first)
className="text-lg md:text-base sm:text-sm"
```

## 🎉 Quick Wins

1. Use `container-inner` for consistent max-width
2. Add `overflow-x-hidden` to prevent horizontal scroll
3. Use `touch-target` class for all interactive elements
4. Hide decorative content on mobile with `hidden lg:block`
5. Stack layouts on mobile with `flex-col sm:flex-row`
6. Use responsive text utilities: `text-responsive-*`
7. Add proper `alt` text (empty for decorative images)
8. Test on real devices, not just browser DevTools
