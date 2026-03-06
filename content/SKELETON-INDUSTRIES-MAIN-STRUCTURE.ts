/**
 * INDUSTRIES MAIN PAGE CONTENT STRUCTURE
 * File: content/industries/main.ts
 * 
 * Used by: IndustriesMainTemplate at /industries
 * Type: Hub page showcasing industry-specific GTM architectures
 */

export const INDUSTRIES_MAIN_CONTENT = {
  // BRAND SECTION
  brand: {
    name: '[Brand name - e.g., "REVENUEARCHITECT"]',
    logoIcon: '[Icon name - e.g., "architecture"]',
  },

  // HERO SECTION
  hero: {
    badge: '[Badge - e.g., "Enterprise Intelligence"]',
    title: '[Main headline - e.g., "Revenue Architecture by Industry"]',
    description: '[2-3 sentence description of the approach and value prop]',
    metrics: [
      { value: '[Stat]', label: '[What it measures]' },
      { value: '[Stat]', label: '[What it measures]' },
      { value: '[Stat]', label: '[What it measures]' },
    ],
    backgroundImage: '[Background image URL]',
    dashboardImage: '[Optional: Dashboard/example image URL]',
  },

  // INDUSTRY CHALLENGES SECTION
  challenges: {
    sectionTitle: '[Section title - e.g., "Industry-Specific Revenue Friction"]',
    sectionDescription: '[Intro explaining why generic GTM fails in regulated markets]',
    items: [
      {
        icon: '[Icon name - e.g., "gavel"]',
        title: '[Challenge type - e.g., "Regulatory Friction"]',
        description: '[Detailed explanation of how this challenge manifests in the industry and how we solve it]',
        statValue: '[Quantified improvement or metric]', // e.g., "-20%"
        statLabel: '[What the stat measures]', // e.g., "Sales Cycle Time"
        colorClass: '[Tailwind background + text color - e.g., "bg-orange-50 text-orange-600"]',
      },
      {
        icon: '[Icon name]',
        title: '[Challenge type]',
        description: '[Description]',
        statValue: '[Stat]',
        statLabel: '[Label]',
        colorClass: '[Color class]',
      },
      {
        icon: '[Icon name]',
        title: '[Challenge type]',
        description: '[Description]',
        statValue: '[Stat]',
        statLabel: '[Label]',
        colorClass: '[Color class]',
      },
    ],
  },

  // INDUSTRIES GRID
  industries: {
    sectionTitle: '[Section title - e.g., "Architected for Your Vertical"]',
    items: [
      {
        icon: '[Icon name - e.g., "account_balance"]',
        name: '[Industry name]',
        description: '[1-2 sentence description of our approach for this industry]',
        outcome: '[Key outcome or result - e.g., "$22M ARR Growth"]',
      },
      {
        icon: '[Icon name]',
        name: '[Industry name]',
        description: '[Description]',
        outcome: '[Outcome]',
      },
      {
        icon: '[Icon name]',
        name: '[Industry name]',
        description: '[Description]',
        outcome: '[Outcome]',
      },
      // ... typically 6-8 industries per page
    ],
  },

  // ADDITIONAL SECTIONS (if any)
  // - case studies by industry
  // - expertise within industry context
  // - methodology
  // - call-to-action
}

/**
 * REAL EXAMPLE from codebase:
 * 
 * hero: {
 *   badge: 'Enterprise Intelligence',
 *   title: 'Revenue Architecture by Industry',
 *   description: 'Precision-engineered revenue engines for high-velocity growth in regulated markets...',
 *   metrics: [
 *     { value: '4.8x', label: 'Pipeline Velocity' },
 *     { value: '32%', label: 'Win Rate Increase' },
 *     { value: '2.5x', label: 'Deal Size Growth' },
 *   ],
 *   backgroundImage: 'https://images.unsplash.com/...',
 * }
 * 
 * challenges: {
 *   sectionTitle: 'Industry-Specific Revenue Friction',
 *   sectionDescription: 'Generalist strategies fail in complex markets...',
 *   items: [
 *     {
 *       icon: 'gavel',
 *       title: 'Regulatory Friction',
 *       description: 'Compliance checks often slow deal velocity by 40%...',
 *       statValue: '-20%',
 *       statLabel: 'Sales Cycle Time',
 *       colorClass: 'bg-orange-50 text-orange-600',
 *     },
 *     // ... more challenges
 *   ]
 * }
 */
