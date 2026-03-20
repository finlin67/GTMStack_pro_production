# CSV Update Checklist

When you add a row to `src/components/animations/gtmstack-pro-library.csv`, follow this checklist:

## ✅ Pre-Add Checklist

- [ ] **File exists**: Verify the animation file exists at `src/components/animations/<Local File Name>`
- [ ] **Default export**: File has `export default function ComponentName() { ... }`
- [ ] **'use client'**: If using hooks (useState, useEffect, etc.), first line should be `'use client'`

## ✅ Post-Add Checklist

### Step 1: Determine if Single or Revolving

- [ ] **Check CSV**: Count how many rows have the same **Route** value
  - **1 row** = Single animation → Update `lib/heroVisualRegistry.ts`
  - **2+ rows** = Revolving animations → Update `src/data/animations.ts`

### Step 2A: Single Animation (1 row for this route)

Update `lib/heroVisualRegistry.ts`:

- [ ] **Add import** at top:
  ```typescript
  import ComponentName from '@/src/components/animations/ComponentName'
  ```

- [ ] **Add entry** to `HERO_VISUAL_REGISTRY` array:
  ```typescript
  {
    route: '/your/route',
    title: 'Your Title',
    mediaType: 'animation',
    component: ComponentName,
  },
  ```

### Step 2B: Revolving Animations (2+ rows for same route)

Update `src/data/animations.ts`:

- [ ] **Add dynamic import** (if not already present):
  ```typescript
  const ComponentName = dynamic(
    () => import('@/src/components/animations/ComponentName'),
    { ssr: false }
  )
  ```

- [ ] **Add entry** to `ANIMATION_REGISTRY` array:
  ```typescript
  {
    id: 'unique-id',
    title: 'Your Title',
    description: 'Brief description',
    marketingFunction: 'your-function', // or 'manufacturing' for industries
    tags: ['tag1', 'tag2'],
    sourceType: 'custom', // or 'google-ai-studio'
    componentPath: 'ComponentName.tsx',
    component: ComponentName,
    featured: true, // or false
    route: '/your/route',
    order: 1, // or 2, 3, etc. for multiple variants
  },
  ```

- [ ] **If new industry**: Add `'industry-slug'` to `MarketingFunction` type union

## ✅ Final Verification

- [ ] **Build passes**: Run `npm run build` or check dev server
- [ ] **Page loads**: Visit the route in browser and verify animation appears
- [ ] **Revolving works** (if applicable): Refresh page and see different animation

## 📝 Notes

- **CSV is source of truth**: Keep all active animations listed in CSV
- **Registry vs Animations.ts**: 
  - Single animations → `heroVisualRegistry.ts`
  - Revolving animations → `src/data/animations.ts`
- **Route format**: No trailing slash (e.g., `/industries/manufacturing` not `/industries/manufacturing/`)
