/**
 * EXPERTISE MAIN PAGE CONTENT STRUCTURE
 * File: content/expertise/main.ts
 * 
 * Used by: ExpertiseMainTemplate at /expertise
 * Type: Hub page showcasing all expertise pillars and capabilities
 */

export const EXPERTISE_MAIN_CONTENT = {
  // HEADER/LOGO AREA
  logo: {
    icon: '[Icon for brand - e.g., "architecture"]',
    label: '[Main brand label - e.g., "REVENUEARCHITECT"]',
    subLabel: '[Subheading - e.g., "Architecture"]',
  },

  // NAVIGATION LINKS
  navLinks: [
    { label: '[Link text]', href: '[URL]', active: false },
    { label: '[Link text]', href: '[URL]', active: false },
    // ... typically Home, Expertise (active), Industries, Case Studies, Contact
  ],

  // HERO SECTION
  hero: {
    badge: '[Badge text - e.g., "GTM Expertise"]',
    title: '[Main headline - e.g., "Engineering Revenue Systems That Scale"]',
    subtitle: '[Description of the expertise approach or philosophy]',
    ctaPrimary: '[Primary CTA - e.g., "Start Your Audit"]',
    ctaSecondary: '[Secondary CTA - e.g., "View Methodology"]',
  },

  // PILLARS/CATEGORIES GRID (typically 4 core pillars)
  pillars: {
    title: '[Grid title - e.g., "Four Pillars of GTM Mastery"]',
    subtitle: '[Explanation of pillar philosophy]',
    items: [
      {
        title: '[Pillar name]',
        description: '[What this pillar covers]',
        icon: '[Icon name]',
        color: '[Tailwind color class - e.g., "text-[#2463eb]"]', // Hex-based for custom brand colors
        bgStart: '[Background color with opacity - e.g., "bg-[#2463eb]/10"]',
        ringColor: '[Hover ring color - e.g., "hover:ring-[#2463eb]/30"]',
        glowColor: '[Glow/background effect - e.g., "bg-[#2463eb]/20"]',
      },
      {
        title: '[Pillar name]',
        description: '[Description]',
        icon: '[Icon]',
        color: '[Color class]',
        bgStart: '[Background]',
        ringColor: '[Ring color]',
        glowColor: '[Glow color]',
      },
      {
        title: '[Pillar name]',
        description: '[Description]',
        icon: '[Icon]',
        color: '[Color class]',
        bgStart: '[Background]',
        ringColor: '[Ring color]',
        glowColor: '[Glow color]',
      },
      {
        title: '[Pillar name]',
        description: '[Description]',
        icon: '[Icon]',
        color: '[Color class]',
        bgStart: '[Background]',
        ringColor: '[Ring color]',
        glowColor: '[Glow color]',
      },
    ],
  },

  // PHILOSOPHY / CORE BELIEF SECTION
  philosophy: {
    quote: '[Compelling quote or philosophy statement - e.g., "We build systems that drive predictable revenue"]',
    highlight: '[Key phrase to highlight within quote]', // This phrase will be emphasized
  },

  // INSIGHTS / FEATURED CONTENT SECTION
  insights: {
    title: '[Section title - e.g., "Latest Insights"]',
    subtitle: '[Description - e.g., "Field notes, case studies, and operator thinking connected to the work"]',
    cta: '[Button text - e.g., "View all"]',
    items: [
      {
        type: '[Content type - e.g., "Playbook", "Case Study", "Framework"]',
        title: '[Title of insight]',
        description: '[1-2 sentence summary]',
        image: '[Image URL]',
      },
      {
        type: '[Content type]',
        title: '[Title]',
        description: '[Summary]',
        image: '[Image URL]',
      },
      {
        type: '[Content type]',
        title: '[Title]',
        description: '[Summary]',
        image: '[Image URL]',
      },
      // ... typically 3-4 items
    ],
  },

  // ADDITIONAL SECTIONS (if any)
  // - testimonials
  // - comparison vs competitors
  // - team/process
  // - call-to-action
}

/**
 * REAL EXAMPLE from codebase:
 * 
 * hero: {
 *   badge: 'GTM Expertise',
 *   title: 'Engineering Revenue Systems That Scale',
 *   subtitle: 'Four interconnected pillars of B2B mastery — Content & Engagement, Demand & Growth, Strategy & Insights, Systems & Operations.',
 *   ctaPrimary: 'Start Your Audit',
 *   ctaSecondary: 'View Methodology',
 * }
 * 
 * pillars: {
 *   title: 'Four Pillars of GTM Mastery',
 *   subtitle: 'Content & Engagement, Demand & Growth, Strategy & Insights, Systems & Operations.',
 *   items: [
 *     {
 *       title: 'Content & Engagement',
 *       description: 'Content strategies and engagement systems that drive pipeline.',
 *       icon: 'campaign',
 *       color: 'text-[#2463eb]',
 *       // ...
 *     },
 *     // ... more pillars
 *   ]
 * }
 */
