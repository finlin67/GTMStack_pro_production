/* scripts/generate-page-catalog.ts
   Run with: npx tsx scripts/generate-page-catalog.ts
*/
import fs from "node:fs";
import path from "node:path";

import { expertiseItems } from "../content/expertise";
import { industryItems } from "../content/industries";
import { caseStudyItems } from "../content/case-studies";

// ---- Locked palette (matches your Constitution) ----
const COLORS = {
  navy: "#0B132B",
  navyMid: "#111C3A",
  white: "#FFFFFF",
  body: "#A0AEC0",
  navText: "#E2E8F0",
  ctaBlue: "#2563EB",
  outline: "#4B5563",
  soft: "#F8FAFC",
  cyan: "#06B6D4",
  gold: "#F59E0B",
  purple: "#7C3AED",
  green: "#22C55E",
  red: "#EF4444",
  softTeal: "#14B8A6",
  indigo: "#6366F1",
} as const;

type ThemeKey =
  | "home"
  | "about"
  | "expertise"
  | "case-studies"
  | "industries"
  | "pillar-demand"
  | "pillar-content"
  | "pillar-systems"
  | "pillar-operations"
  | "topic-demand"
  | "topic-content"
  | "topic-systems"
  | "topic-operations"
  | "industry-b2b-tech"
  | "industry-healthcare"
  | "industry-edu-nonprofit"
  | "industry-manufacturing"
  | "industry-financial"
  | "industry-retail"
  | "industry-public"
  | "industry-energy"
  | "project"
  | "blog-index"
  | "blog-post";

type PageCatalogItem = {
  id: string;
  name: string;
  route: string;
  kind: "top" | "pillar" | "topic" | "industry" | "case-study" | "blog";
  themeKey: ThemeKey;
  accentHex: string;
  accentName: string;
  tone: string;
  sections: readonly string[];
};

// ---- Pillar normalization ----
function normalizePillar(pillarRaw?: string): "demand" | "content" | "systems" | "operations" | null {
  if (!pillarRaw) return null;
  const p = pillarRaw.toLowerCase();
  if (p.includes("demand")) return "demand";
  if (p.includes("content")) return "content";
  if (p.includes("system") || p.includes("martech") || p.includes("data") || p.includes("bi")) return "systems";
  if (p.includes("operation") || p.includes("revops") || p.includes("revenue operations")) return "operations";
  return null;
}

const PILLAR_THEME = {
  demand:   { themeKey: "pillar-demand" as const, accentHex: COLORS.gold,   accentName: "Demand / Gold",   tone: "Performance + acceleration; pipeline and revenue outcomes." },
  content:  { themeKey: "pillar-content" as const, accentHex: COLORS.purple, accentName: "Content / Purple", tone: "Narrative intelligence; scalable storytelling systems." },
  systems:  { themeKey: "pillar-systems" as const, accentHex: COLORS.cyan,  accentName: "Systems / Cyan",  tone: "Technical precision; architecture, data, and integration clarity." },
  operations:{themeKey: "pillar-operations" as const, accentHex: COLORS.green, accentName: "Operations / Green", tone: "Efficiency & scale; execution operating model and process clarity." },
} as const;

function topicThemeFromExpertiseItem(item: any) {
  const pillar = normalizePillar(item.pillar) ?? null;
  if (!pillar) return null;
  const p = PILLAR_THEME[pillar];
  return {
    themeKey: (`topic-${pillar}` as ThemeKey),
    accentHex: p.accentHex,
    accentName: `Inherits ${p.accentName}`,
    tone: p.tone,
  };
}

// ---- Industry segmentation ----
function industryTheme(slug: string) {
  const s = slug.toLowerCase();

  const B2B_TECH = new Set(["b2b-saas","developer-tools","technology-saas","ai-ml","cybersecurity","climate-tech","healthtech"]);
  const FIN = new Set(["fintech","financial-services"]);
  const RETAIL = new Set(["ecommerce","retail-ecommerce"]);
  const MFG = new Set(["manufacturing","supply-chain-logistics","fleet-management-logistics"]);
  const EDU = new Set(["public-sector-education"]);
  const PUBLIC = new Set(["pubsec-government"]);
  const ENERGY = new Set(["energy-utilities"]);

  if (B2B_TECH.has(s)) return { themeKey: "industry-b2b-tech" as const, accentHex: COLORS.cyan, accentName: "B2B Tech / Cyan", tone: "Technical, precise, modern SaaS clarity." };
  if (s === "healthcare") return { themeKey: "industry-healthcare" as const, accentHex: COLORS.softTeal, accentName: "Healthcare / Soft Teal", tone: "Trustworthy, calm, clean, human-centered." };
  if (EDU.has(s)) return { themeKey: "industry-edu-nonprofit" as const, accentHex: COLORS.indigo, accentName: "Education/Nonprofit / Indigo", tone: "Balanced, mission-aware, optimistic professionalism." };
  if (MFG.has(s)) return { themeKey: "industry-manufacturing" as const, accentHex: COLORS.gold, accentName: "Manufacturing / Industrial Amber", tone: "Operational precision, structural efficiency, industrial strength." };
  if (FIN.has(s)) return { themeKey: "industry-financial" as const, accentHex: COLORS.gold, accentName: "Financial / Restrained Gold", tone: "Trust-first, risk-aware, executive-ready." };
  if (RETAIL.has(s)) return { themeKey: "industry-retail" as const, accentHex: COLORS.gold, accentName: "Retail/Ecom / Performance Gold", tone: "High-velocity, conversion-focused, still structured." };
  if (PUBLIC.has(s)) return { themeKey: "industry-public" as const, accentHex: COLORS.ctaBlue, accentName: "Public Sector / Blue", tone: "Credible, clear, compliant, confident." };
  if (ENERGY.has(s)) return { themeKey: "industry-energy" as const, accentHex: COLORS.softTeal, accentName: "Energy/Utilities / Teal", tone: "Reliable, infrastructural, steady performance." };

  // default
  return { themeKey: "industries" as const, accentHex: COLORS.ctaBlue, accentName: "Industry / Neutral Blue", tone: "Contextual, adaptable, informed; still structured." };
}

// ---- Default section presets ----
const SECTIONS = {
  home: [
    "Growth Impact (light surface, 4 bold metrics)",
    "The Growth Operating System (dark)",
    "Featured Case Studies (light)",
    "How We Work (dark)",
    "Strong CTA (light-to-blue gradient)",
  ],
  pillarOrTopic: [
    "The Problem Pattern (light)",
    "The System Blueprint (dark)",
    "Implementation Model (light)",
    "Proof / Metrics (dark)",
    "CTA (light)",
  ],
  industry: [
    "Industry Realities & Constraints (light)",
    "System Blueprint for this vertical (dark)",
    "Example Project / Proof (light)",
    "Playbook / Roadmap (dark)",
    "CTA (light)",
  ],
  caseStudy: [
    "Problem (light)",
    "System Designed (dark)",
    "Implementation (light)",
    "Results (dark)",
    "CTA (light)",
  ],
} as const;

function slugToId(prefix: string, slug: string) {
  return `${prefix}-${slug}`.replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

function main() {
  const pages: PageCatalogItem[] = [];

  // --- Top-level pages (edit as needed) ---
  pages.push(
    { id:"home", name:"Home", route:"/", kind:"top", themeKey:"home", accentHex:COLORS.gold, accentName:"Gold (growth + impact)", tone:"Visionary, confident, forward-moving; balanced hybrid.", sections:SECTIONS.home },
    { id:"about", name:"About", route:"/about", kind:"top", themeKey:"about", accentHex:COLORS.ctaBlue, accentName:"Blue (credibility)", tone:"Credible, trusted, calm confidence; executive-ready.", sections:[
      "Story & Credibility (light)","Operating Philosophy (dark)","Experience Timeline / Proof-of-Work (light)","How We Work (dark)","CTA to Connect (light)"
    ]},
    { id:"expertise", name:"Expertise (Landing)", route:"/expertise", kind:"top", themeKey:"expertise", accentHex:COLORS.cyan, accentName:"Cyan (system overview)", tone:"Systematic, structured, modern SaaS clarity.", sections:[
      "Four Pillar Grid (light)","How the system fits together (dark)","Featured proof (light)","CTA (dark)"
    ]},
    { id:"case-studies", name:"Case Studies (Landing)", route:"/case-studies", kind:"top", themeKey:"case-studies", accentHex:COLORS.gold, accentName:"Gold (performance)", tone:"Results-led, measurable, outcome-driven.", sections:[
      "Impact Overview metrics (light)","Case study grid (dark)","Method summary (light)","CTA (dark)"
    ]},
    { id:"industries", name:"Industries (Landing)", route:"/industries", kind:"top", themeKey:"industries", accentHex:COLORS.ctaBlue, accentName:"Neutral Blue (contextual)", tone:"Contextual, adaptable, informed; still structured.", sections:[
      "Industry grid (light)","Common GTM friction patterns (dark)","Cross-industry proof (light)","CTA (dark)"
    ]},
  );

  // --- Expertise topics (and “services = expertise”) ---
  for (const item of expertiseItems as any[]) {
    if (!item?.slug || !item?.title) continue;

    const theme = topicThemeFromExpertiseItem(item);
    // If pillar missing, default to Systems cyan (or create overrides)
    const resolved = theme ?? {
      themeKey: "topic-systems" as ThemeKey,
      accentHex: COLORS.cyan,
      accentName: "Default (needs pillar override) / Cyan",
      tone: "Systematic, structured, modern SaaS clarity.",
    };

    pages.push({
      id: slugToId("expertise", item.slug),
      name: item.title,
      route: `/expertise/${item.slug}`,
      kind: "topic",
      themeKey: resolved.themeKey,
      accentHex: resolved.accentHex,
      accentName: resolved.accentName,
      tone: resolved.tone,
      sections: [...SECTIONS.pillarOrTopic],
    });
  }

  // --- Industries ---
  for (const ind of industryItems as any[]) {
    if (!ind?.slug || !ind?.title) continue;
    const t = industryTheme(ind.slug);
    pages.push({
      id: slugToId("industry", ind.slug),
      name: `Industry: ${ind.title}`,
      route: `/industries/${ind.slug}`,
      kind: "industry",
      themeKey: t.themeKey,
      accentHex: t.accentHex,
      accentName: t.accentName,
      tone: t.tone,
      sections: [...SECTIONS.industry],
    });
  }

  // --- Case studies ---
  for (const cs of caseStudyItems as any[]) {
    if (!cs?.slug || !cs?.title) continue;
    pages.push({
      id: slugToId("case", cs.slug),
      name: `Case Study: ${cs.title}`,
      route: `/case-studies/${cs.slug}`,
      kind: "case-study",
      themeKey: "project",
      accentHex: COLORS.gold,
      accentName: "Gold (performance)",
      tone: "Results-led, measurable, outcome-driven.",
      sections: [...SECTIONS.caseStudy],
    });
  }

  const outPath = path.join(process.cwd(), "src", "data", "pageCatalog.generated.ts");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const file = `/* AUTO-GENERATED. DO NOT EDIT BY HAND.
   Generated by scripts/generate-page-catalog.ts
*/
export const PAGE_CATALOG = ${JSON.stringify(pages, null, 2)} as const;
export type PageCatalogItem = (typeof PAGE_CATALOG)[number];
`;
  fs.writeFileSync(outPath, file, "utf8");
  console.log(`Wrote ${pages.length} pages → ${outPath}`);
}

main();