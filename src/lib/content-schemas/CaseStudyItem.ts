// src/lib/content-schemas/CaseStudyItem.ts
import { z } from "zod";

const MetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  change: z.string().optional(),
});

const KeyDecisionSchema = z.object({
  decision: z.string().min(1),
  rationale: z.string().min(1),
  impact: z.string().optional(),
});

export const CaseStudyItemSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    client: z.string().min(1),
    description: z.string().min(1),
    challenge: z.string().min(1),
    solution: z.string().min(1),
    keyDecisions: z.array(KeyDecisionSchema).min(1).optional(),
    results: z.array(z.string().min(1)).min(1),
    tags: z.array(z.string().min(1)).min(1),
    industry: z.string().min(1),
    expertise: z.array(z.string().min(1)).min(1),
    metrics: z.array(MetricSchema).min(1),
    featured: z.boolean().optional(),
    year: z.string().min(1),
  })
  .strict();

export type CaseStudyItemInput = z.infer<typeof CaseStudyItemSchema>;

/** Optional “content safety” warnings (don’t block). */
export function getCaseStudyItemWarnings(item: CaseStudyItemInput): string[] {
  const warnings: string[] = [];

  if (item.results.length < 3) {
    warnings.push("results has fewer than 3 bullets (recommended: 3–5).");
  }

  if (item.metrics.length < 2) {
    warnings.push("metrics has fewer than 2 items (recommended: 3+).");
  }

  return warnings;
}
