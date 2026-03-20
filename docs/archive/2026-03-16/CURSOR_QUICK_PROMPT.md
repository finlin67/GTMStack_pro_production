# Quick Cursor Prompt: Add Gallery to Existing Site 🚀

**Copy this into Cursor Composer:**

---

I have an existing website (gtmstack.pro) with ~50 dashboard animation components already built and working.

I want to add a new `/gallery` page that showcases all these existing animations in a browsable format.

## What I Need:

### 1. Analyze My Existing Code
First, please:
- Find all animation/dashboard components in my codebase
- List them with their file paths
- Note what each one does
- Identify my current design system (colors, fonts, components)
- Tell me what routing system I'm using

### 2. Create Gallery Data File
Create `src/data/galleryAnimations.ts` with:
```typescript
interface GalleryAnimation {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string;
  componentPath: string; // import path to existing component
}

export const animations: GalleryAnimation[] = [
  // Populate with ALL existing animations you found
];
```

### 3. Build Gallery Page at `/gallery`
Create a page with:
- **Grid layout**: Cards showing each animation (3 cols desktop, responsive)
- **Card content**: Thumbnail placeholder, title, category badge, GitHub link
- **Filters**: Category pills at top (All, Analytics, Campaign Management, etc.)
- **Modal**: Click card → opens modal that renders the ACTUAL animation component live
- **Design**: Match my existing gtmstack.pro aesthetic exactly

### 4. Modal with Live Animation
The modal should:
- Dynamically import the actual component (using `dynamic()` or `lazy()`)
- Render it live (not just a screenshot)
- Show title, description, tags
- Have "View on GitHub" button
- Close on backdrop click or ESC

### 5. Key Requirements
- ✅ REUSE existing animation components (no duplication)
- ✅ Match existing site design system
- ✅ Use existing Button/Modal components if available
- ✅ Add proper routing
- ✅ Responsive design
- ❌ Don't duplicate any component code
- ❌ Don't create new animation implementations

## Example:
```tsx
// In modal - dynamically load existing component
const AnimationComponent = dynamic(() => import(animation.componentPath));

<Modal>
  <div className="preview">
    <AnimationComponent /> {/* Runs the actual animation */}
  </div>
  <Button onClick={openGithub}>View on GitHub</Button>
</Modal>
```

## Deliverables:
1. List of all existing animations you found
2. `galleryAnimations.ts` data file
3. Gallery page component
4. Modal component for previewing
5. Route configuration
6. Instructions for adding thumbnails later

**Start by analyzing my codebase and telling me what you find!**

---

**Paste this into Cursor and it will:**
1. Scan your codebase
2. Find all animations
3. Build the gallery page
4. Integrate with existing site
