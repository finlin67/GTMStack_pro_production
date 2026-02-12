// src/data/animationGallery.ts
import type { ComponentType } from "react";
import { ANIMATION_REGISTRY } from "./animations";

export type GalleryAnimationItem = {
  id: string;
  title: string;
  route?: string;
  tags: string[];
  marketingFunction?: string;
  thumbnailSrc?: string;

  // Optional for Step 3 (modal live preview). Keep undefined for now if not available.
  load?: () => Promise<{ default: ComponentType<any> }>;
};

function toId(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getGalleryAnimations(): GalleryAnimationItem[] {
  // NOTE: we only map metadata here. No component imports.
  return ANIMATION_REGISTRY.map((a: any) => {
    const id = a.id ?? toId(a.title ?? a.route ?? "animation");
    return {
      id,
      title: a.title ?? id,
      route: a.route,
      tags: Array.isArray(a.tags) ? a.tags : [],
      marketingFunction: a.marketingFunction,
      thumbnailSrc: a.thumbnailSrc ?? `/animation-thumbs/${id}.png`,
      // load intentionally omitted for now unless your registry already provides a loader function
    };
  });
}
