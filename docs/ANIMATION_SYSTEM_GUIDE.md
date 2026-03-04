# Animation System Guide: Registration, Routing & Rendering

**Last Updated:** March 1, 2026

This guide explains how `.tsx` animation files are created, registered, routed to pages, and displayed in both the **animation gallery** and the **hero sections** of pages.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [The Two Registration Systems](#the-two-registration-systems)
3. [Source of Truth: The CSV](#source-of-truth-the-csv)
4. [Complete Animation Flow](#complete-animation-flow)
5. [Routing to Hero Sections](#routing-to-hero-sections)
6. [Routing to Gallery](#routing-to-gallery)
7. [Step-by-Step: Adding a New Animation](#step-by-step-adding-a-new-animation)
8. [Technical Architecture](#technical-architecture)
9. [Troubleshooting](#troubleshooting)

---

## System Overview

The animation system serves two primary purposes:

1. **Hero Visuals** - Display animations in page headers (expertise pages, industry pages, home)
2. **Gallery** - Showcase all animations in an interactive gallery at `/gallery`

### Key Components

- **Animation Files**: `.tsx` files in `src/components/animations/`
- **CSV Registry**: `src/components/animations/gtmstack-pro-library.csv` (source of truth)
- **Two Registries**:
  - `src/data/animations.ts` → `ANIMATION_REGISTRY` (rotating/multiple per route)
  - `lib/heroVisualRegistry.ts` → `HERO_VISUAL_REGISTRY` (single per route)

---

## The Two Registration Systems

The project uses **two separate registries** for different use cases:

### 1. ANIMATION_REGISTRY (`src/data/animations.ts`)

**Purpose**: Routes with **multiple animation variants** that rotate or allow user selection.

**Use Cases**:
- ✅ Expertise detail pages (e.g., `/expertise/demand-generation` has 3 variants)
- ✅ Industry pages with multiple animations (e.g., `/industries/developer-tools/` has 2 variants)
- ✅ Gallery display (all animations)
- ✅ Pages where users can shuffle between variants

**Structure**:
```typescript
export interface AnimationEntry {
  id: string                        // Unique ID (e.g., 'abm-pipeline-strategy')
  title: string                     // Display title
  description: string               // Description for gallery
  marketingFunction: MarketingFunction  // Category (e.g., 'account-based-marketing-abm')
  tags: string[]                    // Searchable tags
  sourceType: 'component' | 'url'   // How animation is rendered
  componentPath: string             // Import path (e.g., '@/src/components/animations/ABM-Pipeline-Strategy')
  component: ComponentType          // Lazy-loaded React component
  route: string                     // Route where it appears (e.g., '/expertise/account-based-marketing-abm')
  order?: number                    // Display order (lower = first)
  featured?: boolean                // Show in featured animations
  previewImage?: string             // Thumbnail for gallery
}
```

**Example Entry**:
```typescript
{
  id: 'abm-pipeline-strategy',
  title: 'ABM Pipeline Strategy',
  description: 'Strategic account-based pipeline tracking with real-time engagement signals',
  marketingFunction: 'account-based-marketing-abm',
  tags: ['ABM', 'Pipeline', 'B2B', 'Enterprise'],
  sourceType: 'component',
  componentPath: '@/src/components/animations/ABM-Pipeline-Strategy',
  component: ABMPipelineStrategy,  // dynamic() import
  route: '/expertise/account-based-marketing-abm',
  order: 2,
  featured: true,
}
```

**How It's Used**:
- `getAnimationsByFunction('account-based-marketing-abm')` → Returns all ABM animations
- `getAnimationsByRoute('/expertise/account-based-marketing-abm')` → Returns animations for that route
- `getRotatedAnimation('account-based-marketing-abm')` → Picks a random animation (shuffle feature)
- Gallery uses full `ANIMATION_REGISTRY` for display

---

### 2. HERO_VISUAL_REGISTRY (`lib/heroVisualRegistry.ts`)

**Purpose**: Routes with **exactly one** animation (no rotation).

**Use Cases**:
- ✅ Pillar pages (e.g., `/expertise/content-engagement`, `/expertise/demand-and-growth`)
- ✅ Home page (`/`)
- ✅ Main landing pages (e.g., `/expertise`, `/industries`)
- ✅ Single-animation industry pages (e.g., `/industries/healthcare`)

**Structure**:
```typescript
export interface HeroVisualEntry {
  route: string                     // Exact route (normalized, no trailing slash)
  title: string                     // Page title
  mediaType: 'animation' | 'image'  // Type of visual
  component?: ComponentType         // React component (required for animations)
  imagePath?: string                // Path for images (not used for animations)
}
```

**Example Entry**:
```typescript
{
  route: '/expertise/content-engagement',
  title: 'Content & Engagement',
  mediaType: 'animation',
  component: ContentEngagementTile,  // Direct import (NOT dynamic)
}
```

**How It's Used**:
- `getHeroVisualForPath('/expertise/content-engagement')` → Returns single entry
- Used by hero components that need one fixed animation

---

### When to Use Which Registry?

| Scenario | Registry to Use | Reason |
|----------|----------------|--------|
| Multiple animation variants for same route | `ANIMATION_REGISTRY` | Enables rotation/shuffle |
| Expertise detail pages with variants | `ANIMATION_REGISTRY` | User can shuffle through options |
| Pillar/landing pages (1 animation) | `HERO_VISUAL_REGISTRY` | Single fixed visual |
| Home page | `HERO_VISUAL_REGISTRY` | One hero animation |
| Gallery display | `ANIMATION_REGISTRY` | Shows all available animations |
| Industry pages with 1 animation | Either (typically `HERO_VISUAL_REGISTRY`) | Single visual is sufficient |
| Industry pages with multiple animations | `ANIMATION_REGISTRY` | Rotation on page load |

---

## Source of Truth: The CSV

**File**: `src/components/animations/gtmstack-pro-library.csv`

Every animation in the project is cataloged in this CSV file, which acts as the **single source of truth**.

### CSV Columns

| Column | Description | Example |
|--------|-------------|---------|
| **Route** | URL where animation appears | `/expertise/demand-generation` |
| **Title** | Display name | `Demand Generation` |
| **Local File Name** | Filename in `src/components/animations/` | `DemandGenerationHero.tsx` |
| **Update-Library** | Which registry to add it to | `src/data/animations.ts` or `lib/heroVisualRegistry.ts` |
| **Media Type** | Type of asset | `animation` (or `image` for future use) |
| **Notes** | Optional notes | `hero-tiles` |

### Example CSV Rows

```csv
Route,Title,Local File Name,Update-Library,Media Type,Notes
/expertise/account-based-marketing-abm,ABM,abm-network-dashboard.tsx,src/data/animations.ts,animation,hero-tiles
/expertise/account-based-marketing-abm,ABM,ABM-Pipeline-Strategy.tsx,src/data/animations.ts,animation,hero-tiles
/expertise/account-based-marketing-abm,ABM,ABM-Radar-Analysis.tsx,src/data/animations.ts,animation,hero-tiles
/expertise/content-engagement,Content & Engagement,ContentEngagementTile.tsx,lib/heroVisualRegistry.ts,animation,hero-tiles
```

**Key Observation**: 
- Routes with **multiple rows** → Use `ANIMATION_REGISTRY` (rotating variants)
- Routes with **single row** → Use `HERO_VISUAL_REGISTRY` (fixed visual)

---

## Complete Animation Flow

Here's how an animation goes from creation to display:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. CREATE ANIMATION COMPONENT                               │
│    src/components/animations/DemandGenFlow.tsx              │
│    - Build React component with Framer Motion               │
│    - Export as default                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. ADD ROW TO CSV                                           │
│    src/components/animations/gtmstack-pro-library.csv       │
│    Route: /expertise/demand-generation                      │
│    Title: Demand Generation                                 │
│    File: DemandGenFlow.tsx                                  │
│    Update-Library: src/data/animations.ts                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. REGISTER IN APPROPRIATE FILE                             │
│                                                             │
│    IF Update-Library = src/data/animations.ts:              │
│    ├─ Add dynamic() import                                  │
│    ├─ Add entry to LEGACY_ANIMATION_REGISTRY               │
│    └─ Include marketingFunction, route, order, etc.        │
│                                                             │
│    IF Update-Library = lib/heroVisualRegistry.ts:           │
│    ├─ Add direct import (NOT dynamic)                       │
│    └─ Add entry to HERO_VISUAL_REGISTRY                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. ROUTING & DISPLAY                                        │
│                                                             │
│    HERO SECTIONS:                                           │
│    ├─ ExpertiseHeroVisual.client.tsx                       │
│    │  └─ Checks ANIMATION_REGISTRY for variants            │
│    │     └─ Uses getAnimationsByFunction()                 │
│    │        └─ Supports ?anim=<id> query param             │
│    │                                                        │
│    ├─ IndustryPageContent.tsx                              │
│    │  └─ Checks getAnimationsByRoute()                     │
│    │     └─ Falls back to HERO_VISUAL_REGISTRY             │
│    │                                                        │
│    └─ Other hero components                                │
│       └─ Use getHeroVisualForPath()                        │
│          └─ Returns single HERO_VISUAL_REGISTRY entry      │
│                                                             │
│    GALLERY:                                                 │
│    └─ GalleryMainTemplate.client.tsx                       │
│       └─ Uses full ANIMATION_REGISTRY                      │
│          ├─ Filters by category/tags                       │
│          ├─ Search functionality                           │
│          └─ Opens modal with live animation                │
└─────────────────────────────────────────────────────────────┘
```

---

## Routing to Hero Sections

### Expertise Pages

**File**: `components/expertise/ExpertiseHeroVisual.client.tsx`

**How It Works**:

1. **Marketing Function Mapping**:
   - Maps pathname to a `marketingFunction` (e.g., `/expertise/demand-generation` → `'demand-generation'`)
   - Uses `getMarketingFunctionFromPath()` function

2. **Animation Selection Priority**:
   ```
   1. ?anim=<id> query parameter (user selected specific variant)
      ↓ If not present
   2. Route-specific animation from ANIMATION_REGISTRY
      ↓ If not found
   3. Random animation for that marketingFunction
      ↓ If none available
   4. Fallback to HERO_VISUAL_REGISTRY
      ↓ If not found
   5. Fallback to HeroTileAnimation (geometric pattern)
   ```

3. **Shuffle Feature**:
   - If multiple animations exist for a `marketingFunction`, a "Shuffle" button appears
   - Clicking shuffle:
     - Calls `getRotatedAnimation(marketingFunction, currentId)`
     - Updates URL with `?anim=<new-id>`
     - Prevents showing same animation twice in a row
     - Stores last shown animation in `sessionStorage`

**Code Flow**:
```typescript
// 1. Get marketing function from path
const marketingFunction = getMarketingFunctionFromPath(pathname)
// → 'demand-generation'

// 2. Get all animations for that function
const animations = getAnimationsByFunction(marketingFunction)
// → [DemandGenFlow, DemandGenerationHero, DemandGenTile]

// 3. Check for ?anim= param
const animParam = searchParams?.get('anim')
if (animParam) {
  const anim = getAnimationById(animParam)  // Get specific animation
}

// 4. Or pick random (with rotation)
const rotated = getRotatedAnimation(marketingFunction, lastAnimId)

// 5. Render the component
const Component = animationEntry.component
return <Component />
```

**Marketing Function Mapping**:
```typescript
const routeToFunction: Record<string, MarketingFunction> = {
  '/expertise/video-marketing': 'video-marketing',
  '/expertise/search-engine-optimization': 'search-engine-optimization',
  '/expertise/marketing-operations': 'marketing-operations',
  '/expertise/marketing-automation': 'marketing-automation',
  '/expertise/account-based-marketing-abm': 'account-based-marketing-abm',
  '/expertise/content-marketing': 'content-marketing',
  '/expertise/demand-generation': 'demand-generation',
  // ... etc
}
```

---

### Industry Pages

**File**: `components/industries/IndustryPageContent.tsx`

**How It Works**:

1. **Route-Based Lookup**:
   - Uses `getAnimationsByRoute(route)` to find animations for that specific route
   - Example: `/industries/manufacturing` → Finds all animations with `route: '/industries/manufacturing'`

2. **Rotation on Load**:
   - If multiple animations exist, picks one randomly on page load
   - Stores selection in `sessionStorage` to avoid repeat on refresh
   - Uses `getRotatedAnimationByRoute(route, lastId)`

3. **Fallback Chain**:
   ```
   1. Check ANIMATION_REGISTRY for route
      ↓ If found multiple variants
   2. Rotate and pick one
      ↓ If not found
   3. Check HERO_VISUAL_REGISTRY for single entry
      ↓ If not found
   4. Use fallback hero visual (image)
   ```

**Code Flow**:
```typescript
// 1. Get route
const route = `/industries/${industry.slug}`
// → '/industries/manufacturing'

// 2. Check for animations in ANIMATION_REGISTRY
const routeAnimations = getAnimationsByRoute(route)
// → [IndustrialDashboard, Manufacturing-LifecycleDashboard]

// 3. Rotate if multiple options
const picked = getRotatedAnimationByRoute(route, lastId)
// → Picks one, stores in sessionStorage

// 4. Or check HERO_VISUAL_REGISTRY
const registryEntry = getHeroVisualForPath(route)

// 5. Render
if (picked) {
  return <picked.component />
} else if (registryEntry) {
  return <registryEntry.component />
}
```

---

### Pillar & Landing Pages

**Files**: Various pillar templates, home page

**How It Works**:

1. **Single Hero Visual**:
   - Uses `getHeroVisualForPath(pathname)` to get ONE entry from `HERO_VISUAL_REGISTRY`
   - No rotation, no variants
   - Fixed animation for that route

2. **Direct Lookup**:
   ```typescript
   const registryEntry = getHeroVisualForPath('/expertise/content-engagement')
   // → { route: '/expertise/content-engagement', component: ContentEngagementTile, ... }
   
   const Component = registryEntry.component
   return <Component />
   ```

**Routes Using This System**:
- `/` (home)
- `/expertise` (main expertise page)
- `/industries` (main industries page)
- `/expertise/content-engagement` (pillar)
- `/expertise/demand-and-growth` (pillar)
- `/expertise/strategy-insights` (pillar)
- `/expertise/systems-operations` (pillar)
- Most industry detail pages (single animation)

---

## Routing to Gallery

**File**: `src/templates/gallery/GalleryMainTemplate.client.tsx`

The gallery displays **ALL** animations from `ANIMATION_REGISTRY` with filtering and search.

### Gallery Features

1. **Display All Animations**:
   ```typescript
   // Uses complete ANIMATION_REGISTRY
   ANIMATION_REGISTRY.forEach(animation => {
     // Display as card with thumbnail
   })
   ```

2. **Filtering**:
   - **By Category**: Filter by `marketingFunction`
     - Example: Show only `account-based-marketing-abm` animations
   - **By Tags**: Filter by tags array
     - Example: Show only animations with 'Pipeline' tag
   - **By Search**: Full-text search across title, description, tags

3. **Sorting**:
   - **Featured**: Show featured animations first (`featured: true`)
   - **Title**: Alphabetical by title
   - **Category**: Group by `marketingFunction`

4. **Modal Display**:
   - Clicking a card opens `GalleryModal`
   - Modal renders the actual animation component (no screenshot)
   - Shows title, description, tags
   - Links to GitHub repo (if available)
   - Displays as live, interactive animation

### Code Flow

```typescript
// 1. Get all animations
const animations = ANIMATION_REGISTRY
// → Array of all AnimationEntry objects

// 2. Apply filters
let filtered = animations

if (searchQuery) {
  filtered = filtered.filter(a => 
    a.title.includes(searchQuery) ||
    a.description.includes(searchQuery) ||
    a.tags.some(t => t.includes(searchQuery))
  )
}

if (selectedCategory !== 'all') {
  filtered = filtered.filter(a => 
    a.marketingFunction === selectedCategory
  )
}

if (selectedTags.length > 0) {
  filtered = filtered.filter(a => 
    selectedTags.some(t => a.tags.includes(t))
  )
}

// 3. Sort
filtered.sort((a, b) => {
  if (sortBy === 'featured') {
    return a.featured ? -1 : 1
  }
  // ... other sorting
})

// 4. Display cards
filtered.map(animation => (
  <AnimationCard
    key={animation.id}
    animation={animation}
    onClick={() => setSelectedId(animation.id)}
  />
))

// 5. Modal with live animation
<GalleryModal animation={selectedAnimation}>
  <selectedAnimation.component />
</GalleryModal>
```

### Gallery Functions

```typescript
// Get all categories for filter dropdown
getAllMarketingFunctions()  
// → ['account-based-marketing-abm', 'content-marketing', 'demand-generation', ...]

// Get all tags for filter panel
getAllTags()  
// → ['ABM', 'Pipeline', 'Analytics', 'Real-time', ...]

// Get featured animations only
getFeaturedAnimations()  
// → AnimationEntry[] with featured: true
```

---

## Step-by-Step: Adding a New Animation

### Complete Workflow

#### 1. Create the Animation Component

**Location**: `src/components/animations/YourAnimation.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'

export default function YourAnimation() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="w-32 h-32 bg-brand-500 rounded-full"
      />
    </div>
  )
}
```

**Requirements**:
- Must use `'use client'` directive (uses Framer Motion/React hooks)
- Must export as `default`
- Should fill full container (w-full h-full or absolute positioning)
- Should be self-contained (no required props)

---

#### 2. Add Row to CSV

**File**: `src/components/animations/gtmstack-pro-library.csv`

Choose your registration strategy:

**Option A: Single Hero (Pillar/Landing Pages)**
```csv
/expertise/your-expertise,Your Expertise,YourAnimation.tsx,lib/heroVisualRegistry.ts,animation,hero-tiles
```

**Option B: Multiple Variants (Rotating)**
```csv
/expertise/content-marketing,Content Marketing,YourAnimation.tsx,src/data/animations.ts,animation,hero-tiles
/expertise/content-marketing,Content Marketing,YourAnimation2.tsx,src/data/animations.ts,animation,hero-tiles
```

---

#### 3A. Register in ANIMATION_REGISTRY (Multiple Variants)

**File**: `src/data/animations.ts`

**Step 1**: Add dynamic import at top of file:
```typescript
const YourAnimation = dynamic(
  () => import('@/src/components/animations/YourAnimation'),
  { ssr: false }
)
```

**Step 2**: Add entry to `LEGACY_ANIMATION_REGISTRY`:
```typescript
{
  id: 'your-animation',  // Unique ID (kebab-case)
  title: 'Your Animation',
  description: 'Brief description for gallery display',
  marketingFunction: 'content-marketing',  // Must match MarketingFunction type
  tags: ['Content', 'Marketing', 'Analytics'],
  sourceType: 'component',
  componentPath: '@/src/components/animations/YourAnimation',
  component: YourAnimation,  // Reference dynamic import
  route: '/expertise/content-marketing',
  order: 3,  // Display order
  featured: true,  // Show in featured section
}
```

**Step 3**: If new `marketingFunction`, update type:
```typescript
export type MarketingFunction =
  | 'content-marketing'
  | 'demand-generation'
  | 'your-new-function'  // Add here
  // ...
```

**Step 4**: Update route mapping in `ExpertiseHeroVisual.client.tsx`:
```typescript
const routeToFunction: Record<string, MarketingFunction> = {
  '/expertise/your-expertise': 'your-new-function',
  // ...
}
```

---

#### 3B. Register in HERO_VISUAL_REGISTRY (Single Hero)

**File**: `lib/heroVisualRegistry.ts`

**Step 1**: Add direct import at top:
```typescript
import YourAnimation from '@/src/components/animations/YourAnimation'
```

**Step 2**: Add entry to `HERO_VISUAL_REGISTRY`:
```typescript
{
  route: '/expertise/your-expertise',
  title: 'Your Expertise',
  mediaType: 'animation',
  component: YourAnimation,  // Direct reference (NOT dynamic)
}
```

**Note**: No `dynamic()` wrapper needed for HERO_VISUAL_REGISTRY.

---

#### 4. Test the Animation

**Test on Hero**:
```bash
npm run dev
# Visit the route (e.g., /expertise/content-marketing)
# Animation should appear in hero section
```

**Test Variants** (if ANIMATION_REGISTRY):
```bash
# Visit with query param
# http://localhost:3000/expertise/content-marketing?anim=your-animation
# Should show your specific animation

# Click "Shuffle" button
# Should rotate through variants
```

**Test in Gallery**:
```bash
# Visit /gallery
# Search for your animation title
# Click card → Modal should open with live animation
```

---

#### 5. Verify Registration

**Check ANIMATION_REGISTRY** (if using `src/data/animations.ts`):
```typescript
import { getAnimationById, getAnimationsByFunction } from '@/src/data/animations'

// In browser console or Next.js page:
const anim = getAnimationById('your-animation')
console.log(anim)  // Should show your entry

const allContentMarketing = getAnimationsByFunction('content-marketing')
console.log(allContentMarketing)  // Should include your animation
```

**Check HERO_VISUAL_REGISTRY** (if using `lib/heroVisualRegistry.ts`):
```typescript
import { getHeroVisualForPath } from '@/lib/heroVisualRegistry'

const entry = getHeroVisualForPath('/expertise/your-expertise')
console.log(entry)  // Should show your entry
```

---

## Technical Architecture

### Dynamic vs Direct Imports

**ANIMATION_REGISTRY** (Multiple variants):
```typescript
// Uses dynamic() for code splitting
const YourAnimation = dynamic(
  () => import('@/src/components/animations/YourAnimation'),
  { ssr: false }  // Client-side only
)
```

**Why?**
- Code splitting: Only loads animation when needed
- Performance: Gallery with 50+ animations would be huge without lazy loading
- SSR disabled: Animations use browser APIs (canvas, WebGL, etc.)

**HERO_VISUAL_REGISTRY** (Single hero):
```typescript
// Direct import (NOT dynamic)
import YourAnimation from '@/src/components/animations/YourAnimation'
```

**Why?**
- Simplicity: Hero loads once per page
- No rotation: Component is always rendered
- Bundle size: One component per page is acceptable

---

### Animation Resolution Priority

**For Expertise Detail Pages**:
```
1. ?anim=<id> query param
   ↓
2. ANIMATION_REGISTRY by route match
   ↓
3. ANIMATION_REGISTRY by marketingFunction (random)
   ↓
4. HERO_VISUAL_REGISTRY by route
   ↓
5. Fallback tile animation
```

**For Industry Pages**:
```
1. ANIMATION_REGISTRY by route (rotated)
   ↓
2. HERO_VISUAL_REGISTRY by route
   ↓
3. Fallback hero visual (image)
```

**For Pillar/Landing Pages**:
```
1. HERO_VISUAL_REGISTRY by route
   ↓
2. Fallback (no animation)
```

---

### Data Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│ User visits /expertise/demand-generation                 │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ ExpertiseHeroVisual.client.tsx                           │
│ - getMarketingFunctionFromPath(pathname)                 │
│   → 'demand-generation'                                  │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ Check for ?anim= query param                             │
│ ✗ Not present                                            │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ getAnimationsByFunction('demand-generation')             │
│ → src/data/animations.ts → ANIMATION_REGISTRY           │
│ → Returns: [DemandGenerationHero, DemandGenFlow, ...]   │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ Check sessionStorage for lastAnim_demand-generation      │
│ → Value: 'demand-gen-flow'                               │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ getRotatedAnimation('demand-generation', 'demand-gen-flow') │
│ → Excludes last shown animation                          │
│ → Picks random from remaining                            │
│ → Returns: DemandGenerationHero                          │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│ Render animation component                               │
│ <DemandGenerationHero />                                 │
│ - Displays in hero section                               │
│ - Shows "Shuffle" button (3 variants available)          │
└──────────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Animation Not Appearing in Hero

**Check**:
1. ✅ Component file exists in `src/components/animations/`
2. ✅ Component has `default export`
3. ✅ Component has `'use client'` directive
4. ✅ CSV row exists with correct route
5. ✅ Registered in correct file (`animations.ts` or `heroVisualRegistry.ts`)
6. ✅ Import statement is correct (path matches)
7. ✅ For `animations.ts`: Used `dynamic()` import
8. ✅ For `heroVisualRegistry.ts`: Used direct import
9. ✅ `marketingFunction` mapping exists in `ExpertiseHeroVisual.client.tsx`

**Debug**:
```typescript
// In browser console:
import { getAnimationById } from '@/src/data/animations'
const anim = getAnimationById('your-animation-id')
console.log(anim)  // Should not be undefined

// Or for hero visual:
import { getHeroVisualForPath } from '@/lib/heroVisualRegistry'
const entry = getHeroVisualForPath('/your/route')
console.log(entry)  // Should not be null
```

---

### Animation Not Appearing in Gallery

**Requirements for Gallery**:
- ✅ Must be in `ANIMATION_REGISTRY` (not `HERO_VISUAL_REGISTRY`)
- ✅ Must have valid `marketingFunction`
- ✅ Component must be lazy-loaded with `dynamic()`
- ✅ `sourceType: 'component'`

**Check**:
```typescript
import { ANIMATION_REGISTRY } from '@/src/data/animations'
console.log(ANIMATION_REGISTRY.map(a => a.id))
// Your animation ID should be in this list
```

---

### Shuffle Button Not Appearing

**Why**:
- Only shows when `getAnimationsByFunction(marketingFunction).length > 1`
- Need at least 2 animations with same `marketingFunction`

**Fix**:
1. Add another animation with same `marketingFunction`
2. Or use `HERO_VISUAL_REGISTRY` if only one animation is needed

---

### Animation Shows Wrong on Route

**Possible Causes**:
1. **Wrong `route` value**: Check registry entry has correct route
2. **Wrong `marketingFunction`**: Check mapping in `ExpertiseHeroVisual.client.tsx`
3. **Route normalization**: Ensure no trailing slash (except root `/`)

**Fix**:
```typescript
// In animations.ts entry:
route: '/expertise/demand-generation',  // ✅ Correct
route: '/expertise/demand-generation/', // ❌ Wrong (trailing slash)
```

---

### Component Import Error

**Error**: "Cannot find module '@/src/components/animations/YourAnimation'"

**Causes**:
1. Filename doesn't match import path
2. File doesn't exist
3. Typo in path

**Fix**:
```typescript
// Check file exists at:
// src/components/animations/YourAnimation.tsx

// Import should be:
import('@/src/components/animations/YourAnimation')
// NOT YourAnimation.tsx (no extension in import)
```

---

### Animation Not Loading (Dynamic Import)

**Error**: "Cannot read properties of undefined (reading 'component')"

**Cause**: `component` field in registry entry is not set or import failed

**Fix**:
```typescript
// Ensure dynamic import is at TOP of file:
const YourAnimation = dynamic(
  () => import('@/src/components/animations/YourAnimation'),
  { ssr: false }
)

// Then reference in registry:
{
  // ...
  component: YourAnimation,  // Reference variable, not string
}
```

---

## Quick Reference

### Adding New Animation Checklist

- [ ] Create `.tsx` file in `src/components/animations/`
- [ ] Add `'use client'` directive
- [ ] Export as `default`
- [ ] Add row to CSV (`gtmstack-pro-library.csv`)
- [ ] Register in correct file:
  - [ ] `src/data/animations.ts` (multiple variants) OR
  - [ ] `lib/heroVisualRegistry.ts` (single hero)
- [ ] Add import (dynamic or direct)
- [ ] Add registry entry with all required fields
- [ ] Update `marketingFunction` mapping if needed
- [ ] Test on route
- [ ] Test in gallery (if using `animations.ts`)
- [ ] Verify shuffle works (if multiple variants)

---

### Key Functions Reference

**ANIMATION_REGISTRY** (`src/data/animations.ts`):
```typescript
getAnimationsByFunction(marketingFunction)  // Get all for category
getAnimationsByRoute(route)                // Get all for route
getAnimationById(id)                       // Get specific animation
getRotatedAnimation(fn, excludeId)         // Get random (avoid repeat)
getFeaturedAnimations()                    // Get featured only
getAllMarketingFunctions()                 // Get all categories
getAllTags()                               // Get all tags
```

**HERO_VISUAL_REGISTRY** (`lib/heroVisualRegistry.ts`):
```typescript
getHeroVisualForPath(pathname)  // Get single entry for route
```

---

### File Locations Quick Map

| Purpose | File |
|---------|------|
| Animation components | `src/components/animations/*.tsx` |
| CSV source of truth | `src/components/animations/gtmstack-pro-library.csv` |
| Multiple variants registry | `src/data/animations.ts` |
| Single hero registry | `lib/heroVisualRegistry.ts` |
| Expertise hero logic | `components/expertise/ExpertiseHeroVisual.client.tsx` |
| Industry hero logic | `components/industries/IndustryPageContent.tsx` |
| Gallery display | `src/templates/gallery/GalleryMainTemplate.client.tsx` |
| Gallery modal | `components/gallery/GalleryModal.tsx` |

---

## Related Documentation

- [Animation Library and Routing](./ANIMATION_LIBRARY_AND_ROUTING.md) - Detailed routing architecture
- [CSV Update Checklist](./CSV_UPDATE_CHECKLIST.md) - Process for updating the CSV
- [Gallery Management Guide](./GALLERY_MANAGEMENT_GUIDE.md) - Managing the gallery page

---

**Document Version:** 1.0  
**Last Updated:** March 1, 2026  
**Maintainer:** Development Team
