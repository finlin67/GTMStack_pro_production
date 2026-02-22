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

export const ANIMATION_META_OVERRIDES: Record<string, AnimationMetaOverride> = {
  "abm-network-dashboard": {
    title: "Abm Network Dashboard",
    description: "Description A real-time account-based marketing network topology and engagement dashboard featuring interactive data visualization. This application visualizes complex marketing data in a high-fidelity, compact interface.",
    keywords: [
  "abm",
  "analytics",
  "roi",
  "dashboard"
],
    repoUrl: "https://github.com/finlin67/ABM-Network-Dashboard",
  },
}
