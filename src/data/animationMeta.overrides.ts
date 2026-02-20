/**
 * Optional metadata overrides for animations.
 * Use to customize title, description, keywords, repoUrl, thumbnailSrc
 * without renaming animation files. Merged into generated catalog by gen-animation-catalog.ts.
 */
export interface AnimationMetaOverride {
  title?: string
  description?: string
  keywords?: string[]
  repoUrl?: string
  thumbnailSrc?: string
}

export const ANIMATION_META_OVERRIDES: Record<string, AnimationMetaOverride> = {}
