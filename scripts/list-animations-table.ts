// scripts/list-animations-table.ts
// Usage: npx tsx scripts/list-animations-table.ts

import { ANIMATION_CATALOG } from "../src/data/animationCatalog.generated";

console.log("| heroVisualId | Animation Title |");
console.log("|--------------|-----------------|");

ANIMATION_CATALOG.forEach((a) => {
  const id = a.id || "";
  const title = a.title || "";
  console.log(`| ${id} | ${title} |`);
});
