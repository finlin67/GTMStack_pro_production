# Cursor Prompt: Add Animation Gallery to Existing Website 🎨

Copy and paste this into Cursor Composer to add a gallery showcase to gtmstack.pro:

---

## CONTEXT

I have an existing website (gtmstack.pro) that already contains ~50 dashboard animation components built with React, Framer Motion, and Tailwind. These animations are currently used on various pages throughout the site.

I want to create a NEW PAGE at `/gallery` (or `/showcase` or `/animations`) that displays all these existing animations in a beautiful, browsable gallery format - similar to PageFlows, SaaSframe, or Tailwind UI Blocks.

## GOAL

Create a gallery page that:
1. **Imports and reuses** my existing animation components (no code duplication)
2. **Displays them in a clean grid** with thumbnails, titles, and GitHub links
3. **Allows filtering** by category (Analytics, Campaign Management, etc.)
4. **Opens a modal** when clicked to show the full animation running live
5. **Matches my existing site design** (colors, fonts, styling from gtmstack.pro)

## INSTRUCTIONS

### Step 1: Analyze Existing Site

First, please:
1. Examine my current site structure and identify where all animation components live
2. List all animation components you find (likely in `/components`, `/animations`, or similar)
3. Note the current design system (colors, fonts, spacing) used on gtmstack.pro
4. Identify the routing setup (Next.js, React Router, etc.)

### Step 2: Create Gallery Data Structure

Create a new file `/src/data/galleryAnimations.ts` (or similar) with metadata for each animation:

```typescript
interface GalleryAnimation {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string;
  componentPath: string; // Path to the existing component
  thumbnailPath?: string; // Optional - can generate later
  // Any other metadata from existing components
}

export const galleryAnimations: GalleryAnimation[] = [
  {
    id: 'lifecycle-engine',
    title: 'Lifecycle Engine Dashboard',
    description: 'Real-time user lifecycle tracking...',
    category: 'Analytics',
    tags: ['Lifecycle', 'Retention', 'Heatmap'],
    githubUrl: 'https://github.com/username/lifecycle-engine',
    componentPath: '@/components/LifecycleEngine', // Adjust to actual path
  },
  // ... populate with ALL existing animations
];

export const categories = [
  'All',
  'Analytics', 
  'Campaign Management',
  'Email Marketing',
  'Social Media',
  // ... other categories
];
```

**IMPORTANT**: For each existing animation component, extract:
- The component's display name
- What it visualizes (for description)
- Appropriate category
- Relevant tags
- GitHub repo URL (if available in code comments or docs)

### Step 3: Create Gallery Page Component

Create `/src/pages/gallery/index.tsx` (or `/src/app/gallery/page.tsx` for Next.js App Router) with:

#### Layout:
- Header matching gtmstack.pro design
- Title: "Animation Gallery" or "Dashboard Showcase"
- Subtitle: "Explore our open-source marketing dashboard components"
- Filter pills for categories
- Search bar (optional)
- Grid of animation cards (3 columns desktop, 2 tablet, 1 mobile)

#### Card Design (match gtmstack.pro aesthetic):
- Thumbnail/preview area
- Animation title
- Category badge
- GitHub link icon
- Hover effect (subtle shadow + lift)
- Click opens modal

#### Modal Design:
- Shows the **ACTUAL ANIMATION COMPONENT RUNNING LIVE**
- Not just a static image - import and render the component
- Title, description, tags
- GitHub button
- Close button
- Backdrop click to close

### Step 4: Dynamic Component Loading

This is the KEY part - actually show the animations running:

```typescript
// In the modal component
import dynamic from 'next/dynamic'; // If Next.js
// or use React.lazy() for React

function AnimationModal({ animation, onClose }) {
  // Dynamically import the component
  const AnimationComponent = dynamic(
    () => import(animation.componentPath),
    { ssr: false }
  );

  return (
    <Modal>
      <div className="preview-container">
        {/* Render the ACTUAL animation component */}
        <AnimationComponent />
      </div>
      {/* ... rest of modal content */}
    </Modal>
  );
}
```

### Step 5: Integration with Existing Site

1. Add the gallery route to your router
2. Add a navigation link in the main menu (if appropriate)
3. Use existing components/utilities from gtmstack.pro:
   - Same Button components
   - Same Modal components (if you have them)
   - Same color scheme and design tokens
   - Same font configuration

### Step 6: Thumbnail Generation

For the grid view, we need thumbnails. Two options:

**Option A - Screenshots** (manual):
- I'll take screenshots of each animation
- Save to `/public/gallery-thumbnails/`
- Reference in galleryAnimations.ts

**Option B - Auto-generate** (preferred):
- Create a script that renders each component
- Uses Puppeteer to screenshot
- Saves to thumbnails folder
- Can be run during build process

For now, we can use placeholder images and I'll add real ones later.

### Step 7: Features to Include

- ✅ Filter by category
- ✅ Search by title/tags (optional)
- ✅ Modal shows live animation
- ✅ GitHub link on card and in modal
- ✅ Responsive design
- ✅ Smooth page transitions
- ✅ Empty state for no results
- ✅ Loading states
- ✅ Share links (URL params for filters)

### Step 8: SEO & Metadata

Add proper meta tags:
```typescript
export const metadata = {
  title: 'Animation Gallery | GTM Stack',
  description: '50+ open-source marketing dashboard animations built with React and Framer Motion',
  // ... other OG tags
};
```

## SPECIFIC REQUIREMENTS

### Design System
- **Colors**: Use existing color palette from gtmstack.pro
- **Fonts**: Use existing font configuration
- **Spacing**: Match existing spacing scale
- **Components**: Reuse existing Button, Modal, Card components if available
- **Icons**: Use whatever icon library is already in use

### Routing
- If Next.js Pages Router: Create `/pages/gallery.tsx`
- If Next.js App Router: Create `/app/gallery/page.tsx`
- If React Router: Add route to existing router config
- If other: Adjust accordingly

### Animation Component Imports
- Use dynamic imports to avoid loading all 50 animations at once
- Only load the animation when modal opens
- Provide loading state while component loads

### Error Handling
- Handle case where component fails to load
- Provide fallback UI
- Show error message gracefully

## WHAT TO DELIVER

Please create:

1. **Gallery data file** (`galleryAnimations.ts`)
   - List of ALL existing animation components
   - Metadata for each (title, description, category, etc.)
   - Import paths for each component

2. **Gallery page component**
   - Complete page with header, filters, grid
   - Matching gtmstack.pro design system
   - Responsive layout

3. **Modal component** 
   - Dynamically loads and renders actual animation
   - Shows full metadata
   - GitHub button
   - Close functionality

4. **Route configuration**
   - Add `/gallery` route to existing router
   - Proper navigation integration

5. **Documentation**
   - How to add new animations to gallery
   - How to generate thumbnails
   - How to update metadata

## CONSTRAINTS

- ❌ DO NOT duplicate animation component code
- ❌ DO NOT create new versions of existing animations
- ✅ DO import and reuse existing components
- ✅ DO match existing site design system
- ✅ DO use existing utilities/components where possible

## EXAMPLE WORKFLOW

1. User visits `/gallery`
2. Sees grid of all animations with thumbnails
3. Clicks on "Lifecycle Engine Dashboard" card
4. Modal opens
5. The ACTUAL LifecycleEngine component loads and runs
6. User can interact with it (if interactive)
7. User clicks "View on GitHub" button
8. Opens GitHub repo in new tab
9. User closes modal or clicks another card

## NEXT STEPS AFTER CREATION

Once you've built the gallery structure, I'll:
1. Review the component list you generated
2. Provide GitHub URLs for each
3. Generate/provide thumbnails
4. Add better descriptions where needed
5. Test all animations load correctly

## QUESTIONS TO ANSWER FIRST

Before building, please tell me:
1. What routing system is gtmstack.pro using?
2. Where are the animation components located?
3. What's the current design system (colors, fonts)?
4. Are there existing Modal/Button components I should use?
5. What's the file structure convention?

---

## TL;DR - Build This:

A new `/gallery` page that:
- Lists all my existing animation components in a grid
- Shows thumbnails with titles and GitHub links
- Opens a modal on click that renders the ACTUAL animation component
- Allows filtering by category
- Matches my existing site design
- Reuses all existing code (no duplication)

Let me know what you find in the codebase and let's build this! 🚀
