# Responsive Testing Guide

## Quick Start Testing

### 1. Start Development Server
```bash
npm run dev
```
Then open http://localhost:3000

### 2. Open Browser DevTools
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Safari**: Enable Developer menu in Preferences, then press `Cmd+Option+I`

### 3. Enable Device Toolbar
- **Chrome/Edge**: Click device icon or press `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac)
- **Firefox**: Click device icon or press `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac)
- **Safari**: Develop → Enter Responsive Design Mode

## Test at These Breakpoints

### 📱 **320px - iPhone SE (Smallest)**
**What to check:**
- ✅ No horizontal scrolling
- ✅ All text is readable (minimum 12px)
- ✅ Buttons are at least 44x44px
- ✅ Images fit within screen
- ✅ Cards stack vertically
- ✅ Navigation menu works

**Expected behavior:**
- Hero title: ~24px (text-2xl)
- Buttons: Full width, stacked vertically
- Top 3 cards: Very compact, ~90px wide
- All content centered and padded

### 📱 **375px - iPhone 12/13/14 (Standard)**
**What to check:**
- ✅ Slightly more breathing room than 320px
- ✅ Text sizes increase slightly
- ✅ Better padding around elements
- ✅ Images slightly larger

**Expected behavior:**
- Hero title: ~30px (xs:text-3xl)
- Buttons: Still full width
- Top 3 cards: ~96px wide (xs:w-24)
- Improved spacing

### 📱 **640px - Large Phones / Small Tablets**
**What to check:**
- ✅ Buttons switch to horizontal layout
- ✅ Text noticeably larger
- ✅ More padding and spacing
- ✅ Two-column layouts begin

**Expected behavior:**
- Hero title: ~36px (sm:text-4xl)
- Buttons: Side by side, auto width
- Top 3 cards: ~128px wide (sm:w-32)
- Desktop-like spacing

### 📱 **768px - iPad Portrait**
**What to check:**
- ✅ Grid layouts show 2 columns
- ✅ Larger images and text
- ✅ More whitespace
- ✅ Desktop navigation appears

**Expected behavior:**
- Hero title: ~48px (md:text-5xl)
- Cards in 2-column grid
- Top 3 cards: ~160px wide (md:w-40)
- Tablet-optimized layout

### 💻 **1024px - iPad Landscape / Small Laptop**
**What to check:**
- ✅ 3-column grid layouts
- ✅ Decorative images start appearing
- ✅ Full desktop navigation
- ✅ Optimal reading width

**Expected behavior:**
- Hero title: ~60px (lg:text-6xl)
- Cards in 3-column grid
- Top 3 cards: ~192px wide (lg:w-48)
- Decorative side images visible (xl:block)

### 💻 **1440px - Desktop (Full)**
**What to check:**
- ✅ All decorative elements visible
- ✅ Content centered with max-width
- ✅ Proper use of whitespace
- ✅ No stretched images

**Expected behavior:**
- Hero title: ~72px (lg:text-7xl)
- Full desktop layout
- All animations and decorations
- Maximum visual appeal

## Page-by-Page Testing

### Homepage (`/`)
1. **Hero Section**
   - [ ] Title scales properly
   - [ ] Description is readable
   - [ ] Buttons are tappable
   - [ ] Logo image scales
   - [ ] $500 LEADERBOARD text visible

2. **Top Three Cards**
   - [ ] Cards don't overlap
   - [ ] All text is readable
   - [ ] Rank badges visible
   - [ ] Reward amounts clear
   - [ ] Hover effects work (desktop)

3. **Decorative Images**
   - [ ] Hidden on mobile (< 1280px)
   - [ ] Visible on desktop (≥ 1280px)
   - [ ] Don't cause horizontal scroll
   - [ ] Animations smooth

### Leaderboard Page (`/leaderboard`)
1. **Header**
   - [ ] Title scales properly
   - [ ] Description readable

2. **Live Stats Cards**
   - [ ] Stack vertically on mobile
   - [ ] 3 columns on tablet/desktop
   - [ ] Numbers are readable
   - [ ] Loading states work

3. **Leaderboard Table**
   - [ ] Horizontal scroll on mobile (if needed)
   - [ ] All columns visible on desktop
   - [ ] Sort buttons work
   - [ ] Refresh button accessible
   - [ ] Row hover effects (desktop)

### How It Works Page (`/how-it-works`)
1. **Header**
   - [ ] Title scales properly
   - [ ] Description readable

2. **Step Cards**
   - [ ] Stack vertically on mobile
   - [ ] 2 columns on tablet
   - [ ] 3 columns on desktop
   - [ ] Icons scale properly
   - [ ] Text is readable

3. **Referral Code Section**
   - [ ] Image scales properly
   - [ ] Click to open modal works
   - [ ] Modal is responsive
   - [ ] Close button accessible

4. **Modal**
   - [ ] Centers on screen
   - [ ] Image fits within viewport
   - [ ] Close button visible
   - [ ] Click outside to close works

## Common Issues to Check

### ❌ Horizontal Scrolling
**How to check:**
1. Scroll horizontally on each page
2. Should NOT be able to scroll left/right
3. If you can scroll, check for:
   - Images without max-width
   - Fixed-width elements
   - Negative margins

**Fix:** Already implemented with `overflow-x: hidden`

### ❌ Text Too Small
**How to check:**
1. Zoom to 100% in browser
2. Text should be at least 12px
3. Body text should be 14-16px

**Fix:** Already implemented with progressive text scaling

### ❌ Buttons Too Small to Tap
**How to check:**
1. On mobile device or emulator
2. Try tapping all buttons
3. Should be easy to tap without zooming

**Fix:** Already implemented with min-height/width 44px

### ❌ Images Overflowing
**How to check:**
1. Check each image on mobile
2. Should fit within screen width
3. Should maintain aspect ratio

**Fix:** Already implemented with `w-full h-auto object-contain`

### ❌ Elements Overlapping
**How to check:**
1. Check all breakpoints
2. Elements should have proper spacing
3. No text overlapping images

**Fix:** Already implemented with responsive spacing

## Browser-Specific Testing

### Chrome/Edge
- ✅ Best DevTools support
- ✅ Most accurate mobile emulation
- ✅ Test here first

### Firefox
- ✅ Good responsive design mode
- ✅ Different rendering engine
- ✅ Test for compatibility

### Safari (Desktop)
- ✅ WebKit rendering engine
- ✅ Different from Chrome
- ✅ Important for Mac users

### Safari (iOS)
- ✅ Most important for iPhone users
- ✅ Test on real device if possible
- ✅ Check touch interactions

### Samsung Internet
- ✅ Popular on Android
- ✅ Different from Chrome mobile
- ✅ Test if targeting Android users

## Performance Testing

### Lighthouse Audit
1. Open DevTools
2. Go to Lighthouse tab
3. Select "Mobile" device
4. Run audit
5. Check scores:
   - Performance: Should be 90+
   - Accessibility: Should be 90+
   - Best Practices: Should be 90+
   - SEO: Should be 90+

### Network Throttling
1. Open DevTools → Network tab
2. Select "Slow 3G" or "Fast 3G"
3. Reload page
4. Check:
   - Images load progressively
   - Layout doesn't shift
   - Content is readable while loading

## Accessibility Testing

### Keyboard Navigation
1. Tab through all interactive elements
2. Should see focus indicators
3. Should be able to activate with Enter/Space

### Screen Reader Testing
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through page
3. All content should be announced
4. Images should have alt text

### Color Contrast
1. Check text against backgrounds
2. Should meet WCAG AA standards (4.5:1 for normal text)
3. Use browser extensions to check

## Real Device Testing

### iOS Devices
- iPhone SE (320px width)
- iPhone 12/13/14 (390px width)
- iPhone 14 Pro Max (430px width)
- iPad (768px width)
- iPad Pro (1024px width)

### Android Devices
- Samsung Galaxy S20 (360px width)
- Google Pixel 5 (393px width)
- Samsung Galaxy Tab (768px width)

### Desktop
- 1366x768 (common laptop)
- 1920x1080 (Full HD)
- 2560x1440 (2K)
- 3840x2160 (4K)

## Automated Testing (Optional)

### Playwright Tests
```javascript
// Example test for responsive design
test('homepage is responsive', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Test mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page).toHaveScreenshot('mobile.png');
  
  // Test tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page).toHaveScreenshot('tablet.png');
  
  // Test desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page).toHaveScreenshot('desktop.png');
});
```

## Quick Checklist

Before considering responsive design complete:

- [ ] Tested at 320px, 375px, 768px, 1024px, 1440px
- [ ] No horizontal scrolling on any page
- [ ] All text is readable without zooming
- [ ] All buttons are tappable (44x44px minimum)
- [ ] Images scale properly
- [ ] Layouts adapt appropriately
- [ ] Navigation works on mobile
- [ ] Forms are usable on mobile
- [ ] Tables scroll horizontally if needed
- [ ] Modals work on all sizes
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Tested on real mobile device
- [ ] Lighthouse score 90+ on mobile
- [ ] No console errors
- [ ] Animations perform smoothly

## Troubleshooting

### Issue: Horizontal scroll appears
**Solution:** Check for elements with fixed widths, use `max-w-full` on images

### Issue: Text too small on mobile
**Solution:** Increase base font size, use responsive text classes

### Issue: Buttons hard to tap
**Solution:** Increase padding, ensure min-height/width 44px

### Issue: Layout breaks at specific width
**Solution:** Add breakpoint for that width, adjust spacing

### Issue: Images don't scale
**Solution:** Add `w-full h-auto object-contain` classes

---

**Status**: ✅ Ready for Testing
**Last Updated**: November 6, 2025
