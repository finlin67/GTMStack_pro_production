// src/lib/content-schemas/ExpertisePageContent.ts
// Validates full expertise page content (hydrate script / template shape: brand, hero, metricsSection, etc.)

import { z } from "zod";

const CtaButtonSchema = z.object({
  text: z.string().min(1),
  link: z.string().min(1),
});

const ImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

const HeroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  description: z.string().min(1),
  primaryCTA: CtaButtonSchema,
  secondaryCTA: CtaButtonSchema.optional(),
  image: ImageSchema.optional(),
});

const StatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const MetricsSectionSchema = z.object({
  headline: z.string().min(1),
  stats: z.array(StatSchema).min(1),
});

const CapabilityItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const CapabilitiesSectionSchema = z.object({
  headline: z.string().min(1),
  items: z.array(CapabilityItemSchema).min(1),
});

const PrincipleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const PhilosophySectionSchema = z.object({
  headline: z.string().min(1),
  principles: z.array(PrincipleSchema).min(1),
});

const GrowthSectionSchema = z.object({
  headline: z.string().min(1),
  narrative: z.string().min(1),
  metrics: z.array(StatSchema).min(1),
});

const CtaSectionSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  button: CtaButtonSchema,
});

const FooterSectionSchema = z.object({
  title: z.string().min(1),
  links: z.array(z.string().min(1)).min(1),
});

const FooterSchema = z.object({
  description: z.string().min(1),
  sections: z.array(FooterSectionSchema).min(1),
  copyright: z.string().min(1),
});

export const ExpertisePageContentSchema = z
  .object({
    brand: z.object({
      tagline: z.string().min(1),
      description: z.string().min(1),
    }),
    hero: HeroSchema,
    metricsSection: MetricsSectionSchema,
    capabilitiesSection: CapabilitiesSectionSchema,
    philosophySection: PhilosophySectionSchema,
    growthSection: GrowthSectionSchema,
    ctaSection: CtaSectionSchema,
    footer: FooterSchema,
  })
  .strict();

export type ExpertisePageContentInput = z.infer<typeof ExpertisePageContentSchema>;

/** Optional content-quality warnings (non-blocking). */
export function getExpertisePageContentWarnings(
  _data: ExpertisePageContentInput
): string[] {
  const warnings: string[] = [];
  // e.g. suggest 3–5 stats, 3–6 capabilities, etc.
  return warnings;
}
