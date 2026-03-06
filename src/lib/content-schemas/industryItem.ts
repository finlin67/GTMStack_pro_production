// src/lib/content-schemas/industryItem.ts
import { z } from "zod";

const StatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const ProofSchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  outcome: z.string().min(1),
  metrics: z.string().optional(),
});

export const IndustryItemSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    longDescription: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
    icon: z.string().min(1),
    stats: z.array(StatSchema).min(1),

    featured: z.boolean().optional(),

    positioning: z.string().optional(),
    gtmRealities: z.array(z.string().min(1)).optional(),
    proof: z.array(ProofSchema).optional(),
    playbook: z.array(z.string().min(1)).optional(),
    featuredExpertise: z.array(z.string().min(1)).optional(),
    featuredCaseStudies: z.array(z.string().min(1)).optional(),
  })
  .strict(); // <— rejects extra keys invented by LLMs

export type IndustryItemInput = z.infer<typeof IndustryItemSchema>;

/** Optional “content safety” warnings (don’t block). */
export function getIndustryItemWarnings(item: IndustryItemInput): string[] {
  const warnings: string[] = [];

  const proof = item.proof ?? [];
  for (const p of proof) {
    if (p.metrics && /\d/.test(p.metrics)) {
      warnings.push(
        `proof.metrics contains digits ("${p.metrics}"). Verify it’s accurate or make it qualitative.`
      );
    }
    if (!p.company) {
      warnings.push(`proof.company is empty. That’s fine, but it will render as anonymous proof.`);
    }
  }

  if ((item.gtmRealities?.length ?? 0) > 0 && (item.gtmRealities?.length ?? 0) < 3) {
    warnings.push("gtmRealities has fewer than 3 bullets (recommended: 3–5).");
  }

  return warnings;
}