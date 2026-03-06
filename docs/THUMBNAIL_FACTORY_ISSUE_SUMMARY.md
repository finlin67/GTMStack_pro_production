# Thumbnail Factory Issue Summary (for developer handoff)

## What is happening

When running thumbnail generation, many animation components render inside `/thumbnail-factory`, but a subset throw runtime errors in-browser.

These crashes trigger Next.js/React error boundaries repeatedly, so the render tree is torn down/recreated and screenshots end up blank or partially blank.

## Key evidence from logs

- Repeated React boundary resets for components under:
  - `src/components/animations/Video-Marketing-Analytics.tsx`
  - `src/components/animations/WasteMan.tsx`
  - `src/components/animations/WealthManageTile.tsx`
  - `src/components/animations/VideoCreativeHero.tsx`
- Repeated stack traces through `MotionComponent` (`framer-motion`) followed by ReactDevOverlay recovery.
- Most actionable low-level error captured:
  - `Invalid easing type 'steps(2)'`
  - origin: `motion-utils` / `framer-motion` easing mapping.

## Most likely root cause

At least one (likely multiple) motion transitions are passing CSS easing strings like `steps(2)` into Framer Motion transition `ease` fields.

Framer Motion expects supported easing values (named eases, cubic-bezier arrays/functions, etc.), and this invalid easing causes runtime exceptions.

Because all components are mounted together in `/thumbnail-factory`, each failing component repeatedly crashes its subtree and destabilizes screenshot timing.

## Why thumbnails go blank

Puppeteer captures after a delay, but if a tile crashes/remounts during capture window, the element can be empty, mid-recovery, or fallback-rendered, resulting in blank images.

## Suggested fix plan

1. Search all animation components for invalid Framer easing usage:
   - patterns to inspect: `ease: 'steps(`, `ease: "steps(`, or dynamic strings resolving to `steps(...)`.
2. Replace invalid `ease` values with Framer-supported equivalents:
   - example safe values: `'linear'`, `'easeInOut'`, or cubic-bezier arrays like `[0.25, 0.1, 0.25, 1]`.
3. Add per-tile defensive rendering in factory mode (optional but recommended):
   - catch runtime errors at tile level so one broken animation does not affect others.
4. Re-run `/thumbnail-factory` in browser and confirm no runtime `pageerror` entries.
5. Re-run thumbnail script and verify non-blank output.

## Repro steps

1. Start dev server.
2. Open `/thumbnail-factory`.
3. Watch browser console for repeated React boundary resets and Framer easing error.
4. Run thumbnail generation and observe blank outputs for crashing tiles.

## Acceptance criteria

- No `Invalid easing type 'steps(2)'` errors in console.
- No repeated React boundary reset loops while `/thumbnail-factory` is open.
- Thumbnail generation completes with visual content (not blank) for all non-excluded tiles.
