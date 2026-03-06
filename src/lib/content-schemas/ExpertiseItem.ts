// src/lib/content-schemas/ExpertiseItem.ts
import { z } from "zod";

const ProofSchema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  outcome: z.string().min(1),
  metrics: z.string().optional(),
});

export const ExpertiseItemSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional(),
    pillar: z.enum(['content-engagement', 'demand-growth', 'strategy-insights', 'systems-operations']).optional(),
    pillarLabel: z.string().optional(),
    tags: z.array(z.string().min(1)).optional(),
    icon: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
    positioning: z.string().optional(),
    challenges: z.array(z.string().min(1)).optional(),
    modern_plays: z.array(z.string().min(1)).optional(),
    proof: ProofSchema.optional(),
    relevant_expertise_slugs: z.array(z.string().min(1)).optional(),
    relevant_case_study_slugs: z.array(z.string().min(1)).optional(),
  })
  .strict();

export type ExpertiseItemInput = z.infer<typeof ExpertiseItemSchema>;

/** Optional “content safety” warnings (don’t block). */
export function getExpertiseItemWarnings(item: ExpertiseItemInput): string[] {
  const warnings: string[] = [];

  if (item.proof) {
    const p = item.proof;
    if (p.metrics && /\d/.test(p.metrics)) {
      warnings.push(
        `proof.metrics contains digits ("${p.metrics}"). Verify it’s accurate or make it qualitative.`
      );
    }
    if (!p.company) {
      warnings.push(`proof.company is empty. That’s fine, but it will render as anonymous proof.`);
    }
  }

  if (item.challenges && item.challenges.length < 3) {
    warnings.push("challenges has fewer than 3 bullets (recommended: 3–5).");
  }

  if (item.modern_plays && item.modern_plays.length < 3) {
    warnings.push("modern_plays has fewer than 3 bullets (recommended: 3–5).");
  }

  return warnings;
}
