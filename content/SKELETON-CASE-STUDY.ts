/**
 * CASE STUDY SKELETON ENTRY
 * 
 * Copy this structure and add to the caseStudyItems array in content/case-studies.ts
 * 
 * Required fields:
 * - slug: URL-safe identifier (lowercase, hyphens)
 * - title: Case study title
 * - client: Client name
 * - description: Short summary (1 sentence)
 * - challenge: Problem statement
 * - solution: What we built/implemented
 * - results: Array of 3-4 key outcomes
 * - industry: slug of industry (must match /industries/[slug])
 * - expertise: Array of expertise slugs relevant to this project
 * - year: '2024' or '2025'
 * 
 * Optional:
 * - featured: true/false (shows on home page)
 * - tags: Array of labels
 * - metrics: Array of {label, value, change} for rich display
 */

export const CASE_STUDY_SKELETON = {
  slug: '[case-study-url-slug]',
  title: '[Client Name] - [Project Outcome]',
  client: '[Client Company Name]',
  
  description:
    '[1-2 sentence summary of the engagement and result. What was the business objective and what did we achieve?]',
  
  challenge:
    '[Detailed problem statement. What were the specific GTM/revenue challenges? What blockers were preventing growth?]',
  
  solution:
    '[Comprehensive description of approach. What methodology did we use? What systems did we build? What changes did we make?]',
  
  results: [
    '[Quantified outcome 1 - pipeline, cycle time, revenue impact, etc.]',
    '[Quantified outcome 2]',
    '[Quantified outcome 3]',
    '[Optional: Qualitative outcome - team alignment, capabilities, strategic positioning]',
  ],
  
  tags: ['[Tag1]', '[Tag2]', '[Tag3]'],
  industry: '[industry-slug]', // e.g., 'financial-services', 'manufacturing', 'healthcare'
  
  expertise: [
    '[expertise-slug-1]', // e.g., 'account-based-marketing'
    '[expertise-slug-2]', // e.g., 'demand-generation'
    '[expertise-slug-3]',
  ],
  
  metrics: [
    { label: '[KPI Label]', value: '[Quantified Result]', change: '[Unit or Period]' },
    { label: '[KPI Label]', value: '[Quantified Result]', change: '[Unit or Period]' },
    { label: '[KPI Label]', value: '[Quantified Result]', change: '[Unit or Period]' },
  ],
  
  featured: true, // true = shows on home page case studies section
  year: '2024',
}

/**
 * EXAMPLE (Real Case Study from Codebase):
 * 
 * {
 *   slug: 'abm-system-launch-prgx',
 *   title: 'ABM System Launch - PRGX Global',
 *   client: 'PRGX Global',
 *   description: "Built PRGX's first fully unified ABM system—integrating targeting, personalization, measurement, and sales alignment.",
 *   challenge: 'PRGX had no formal ABM program, playbooks, or aligned ICP model for enterprise targeting.',
 *   solution: 'Designed unified ABM strategy including ICP, tiering, and account selection. Built playbooks for multi-threaded sales alignment.',
 *   results: [
 *     'Launched scalable ABM engine for 300+ enterprise accounts',
 *     '87% YoY pipeline growth',
 *     '180% lift in MQL→SQL conversion',
 *     '200% increase in strategic account engagement',
 *   ],
 *   tags: ['ABM', 'Enterprise GTM'],
 *   industry: 'financial-services',
 *   expertise: ['account-based-marketing', 'marketing-operations', 'demand-generation'],
 *   metrics: [
 *     { label: 'Pipeline Growth', value: '87%', change: 'YoY' },
 *     { label: 'MQL→SQL Lift', value: '180%', change: 'Lift' },
 *   ],
 *   featured: true,
 *   year: '2024',
 * }
 */
