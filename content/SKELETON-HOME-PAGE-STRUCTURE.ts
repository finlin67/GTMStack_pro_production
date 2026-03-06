/**
 * HOME PAGE CONTENT STRUCTURE
 * File: content/home.ts
 * 
 * Used by: HomeTemplate at /
 * Type: Full page composition with hero, methodology, capabilities, stats, insights, CTA
 */

export const HOME_CONTENT = {
  // HERO SECTION
  hero: {
    badge: '[Positioning badge - e.g., "Founder-Led GTM Consulting"]',
    titleStart: '[First part of headline - e.g., "The Revenue Architect for "]',
    titleGradient: '[Gradient text - e.g., "B2B Tech"]', // Highlighted in gradient
    subtitle: '[2-3 sentence subheadline explaining core value proposition]',
    ctaPrimary: '[Primary CTA text - e.g., "Start Your Build"]',
    ctaSecondary: '[Secondary CTA text - e.g., "View Methodology"]',
  },

  // STATS/METRICS ROW
  stats: [
    { value: '[Stat]', label: '[What does it measure]' },
    { value: '[Stat]', label: '[What does it measure]' },
    { value: '[Stat]', label: '[What does it measure]' },
    { value: '[Stat]', label: '[What does it measure]' },
  ],

  // METHODOLOGY SECTION (4-step process)
  methodology: {
    title: '[Section title - e.g., "The Architectural Method"]',
    description: '[Explanation of the methodology and why it works]',
    steps: [
      {
        number: '01',
        icon: '[Icon name - e.g., "Search"]',
        title: '[Step title]',
        description: '[What happens in this step]',
        progress: '25%',
      },
      {
        number: '02',
        icon: '[Icon name]',
        title: '[Step title]',
        description: '[What happens in this step]',
        progress: '50%',
      },
      {
        number: '03',
        icon: '[Icon name]',
        title: '[Step title]',
        description: '[What happens in this step]',
        progress: '75%',
      },
      {
        number: '04',
        icon: '[Icon name]',
        title: '[Step title]',
        description: '[What happens in this step]',
        progress: '100%',
      },
    ],
  },

  // CORE CAPABILITIES GRID
  expertise: {
    title: '[Grid title - e.g., "Core Capabilities"]',
    items: [
      {
        icon: '[Icon name - e.g., "TrendingUp"]',
        title: '[Capability name]',
        description: '[1-2 sentence explanation of what this capability does]',
        tags: ['[Tag1]', '[Tag2]', '[Tag3]'], // Related expertise areas
      },
      {
        icon: '[Icon name]',
        title: '[Capability name]',
        description: '[Description]',
        tags: ['[Tag1]', '[Tag2]', '[Tag3]'],
      },
      {
        icon: '[Icon name]',
        title: '[Capability name]',
        description: '[Description]',
        tags: ['[Tag1]', '[Tag2]', '[Tag3]'],
      },
      // ... typically 3-5 items
    ],
  },

  // FEATURED CASE STUDIES / INSIGHTS (if applicable)
  insights: {
    title: '[Section title - e.g., "Latest Insights"]',
    subtitle: '[Explanation of what these are]',
    cta: '[Button text - e.g., "View all"]',
    items: [
      {
        type: '[Category - e.g., "Playbook", "Case Study", "Article"]',
        title: '[Title of insight]',
        description: '[1-2 sentence summary]',
        image: '[Image URL or path]',
        // ... and any other relevant fields
      },
      // ... typically 3-4 items
    ],
  },

  // CALL-TO-ACTION SECTION (if applicable)
  // Add any additional sections like testimonials, comparison, pricing, features, etc.
}

/**
 * REAL EXAMPLE from codebase:
 * 
 * hero: {
 *   badge: 'Founder-Led GTM Consulting',
 *   titleStart: 'The Revenue Architect for ',
 *   titleGradient: 'B2B Tech',
 *   subtitle: 'Engineering predictable revenue growth for enterprise tech through strategic precision...',
 *   ctaPrimary: 'Start Your Build',
 *   ctaSecondary: 'View Methodology',
 * }
 */
