// src/data/animationGallery.ts
import type { ComponentType } from "react";
import { ANIMATION_CATALOG } from "./animationCatalog.generated";

export type GalleryAnimationItem = {
  id: string;
  title: string;
  route?: string;
  tags: string[];
  marketingFunction?: string;
  thumbnailSrc?: string;
  repoUrl?: string;
  usedOnPages?: boolean;

  // Optional for Step 3 (modal live preview). Keep undefined for now if not available.
  load?: () => Promise<{ default: ComponentType<any> }>;
};

export function getGalleryAnimations(): GalleryAnimationItem[] {
  // Use auto-discovered catalog from src/components/animations
  // This includes ALL animations, not just those in ANIMATION_REGISTRY
  return ANIMATION_CATALOG.map((item) => ({
    id: item.id,
    title: item.title,
    route: undefined, // Not available in catalog
    tags: [], // Not available in catalog
    marketingFunction: undefined, // Not available in catalog
    thumbnailSrc: item.thumbnailSrc,
    repoUrl: item.repoUrl,
    usedOnPages: item.usedOnPages,
    // load intentionally omitted for now unless your registry already provides a loader function
  }));
}
