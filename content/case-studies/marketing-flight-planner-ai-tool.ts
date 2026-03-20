import type { CaseStudyItem } from '@/lib/types'

const caseStudy: CaseStudyItem = {
    slug: 'marketing-flight-planner-ai-tool',
    title: 'Marketing Flight Planner — AI GTM Maturity → Roadmap Engine',
    client: 'Portfolio Artifact',
    description:
      'AI-powered assessment tool connecting GTM maturity diagnostics to prioritized stack and execution roadmaps.',
    challenge:
      'Traditional maturity audits provide scores without actionable, personalized roadmaps.',
    solution:
      'Built AI tool using an aviation metaphor to translate maturity score into a tailored GTM stack and journey map.',
    results: [
      'MVP scoring engine complete',
      'Supports REAO maturity diagnosis in real time',
      'Includes scenario simulation capability',
    ],
    tags: ['AI', 'GTM Strategy', 'Assessment', 'Systems Thinking'],
    industry: 'ai-ml',
    expertise: [
      'ai-in-marketing',
      'marketing-operations',
      'martech-optimization',
    ],
    metrics: [
      { label: 'MVP', value: 'Complete', change: 'Phase 1' },
    ],
    featured: true,
    year: '2025',
  }

export default caseStudy
