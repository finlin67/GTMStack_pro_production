import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** Contact page content for HomeTemplate (PageContent shape). */
export const CONTACT_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'START THE CONVERSATION',
    titleStart: 'Map the Next Version of ',
    titleGradient: 'Your GTM System',
    subtitle:
      'Use the notes field to share the motion, metric, or stack constraint you need to solve. You will get a direct response with practical next steps.',
    ctaPrimary: 'Discuss your operating model',
    ctaSecondary: 'Send email',
  },
  stats: [
    { value: '24h', label: 'Response Time' },
    { value: '100%', label: 'Founder-Led' },
    { value: 'Global', label: 'Availability' },
    { value: 'Direct', label: 'Communication' },
  ],
  methodology: {
    title: 'How We Engage',
    description: 'A clear, staged process that moves from diagnostic clarity to implementation.',
    steps: [
      {
        number: '01',
        icon: 'Search',
        title: 'Inquiry',
        description: 'Initial outreach and high-level alignment on goals.',
        progress: '25%',
      },
      {
        number: '02',
        icon: 'DraftingCompass',
        title: 'Diagnostic',
        description: 'Brief audit of current state and quick wins.',
        progress: '50%',
      },
      {
        number: '03',
        icon: 'Rocket',
        title: 'Proposal',
        description: 'Tailored architectural blueprint for your build.',
        progress: '75%',
      },
      {
        number: '04',
        icon: 'Settings',
        title: 'Kickoff',
        description: 'Engagement start and first milestone delivery.',
        progress: '100%',
      },
    ],
  },
  expertise: {
    title: 'Where to go deeper',
    items: [
      {
        icon: 'TrendingUp',
        title: 'Quick Audit',
        description: '7-day deep dive into a specific funnel or motion.',
        tags: ['Fast', 'Forensic', 'High-Impact'],
      },
      {
        icon: 'Map',
        title: 'Full Build',
        description: 'End-to-end GTM infrastructure and strategy design.',
        tags: ['Complete', 'Scalable', 'Blueprint'],
      },
      {
        icon: 'Network',
        title: 'Advisor-in-Residence',
        description: 'Ongoing strategic oversight and optimization.',
        tags: ['Retainer', 'Strategic', 'Oversight'],
      },
      {
        icon: 'Settings',
        title: 'Tech Integration',
        description: 'Cleanup and alignment of your RevOps stack.',
        tags: ['RevOps', 'Technical', 'Stack'],
      },
    ],
  },
  quote: {
    text: 'Great revenue architecture starts with a single ',
    highlight: 'honest conversation',
  },
  caseStudies: {
    title: 'Next Steps',
    subtitle: 'Choose the path that fits your current growth stage.',
    items: [
      {
        title: 'The Audit Path',
        description: 'Ideal for teams with existing motions that are underperforming or leaking.',
        outcomeLabel: 'Leakage Found',
        outcomeValue: '48h',
      },
      {
        title: 'The Build Path',
        description: 'For companies launching new products or entering new markets.',
        outcomeLabel: 'Ready to Scale',
        outcomeValue: '30d',
      },
      {
        title: 'The Scale Path',
        description: 'For organizations ready to automate and institutionalize their growth.',
        outcomeLabel: 'ROI target',
        outcomeValue: '3-6m',
      },
    ],
    industries: [
      { title: 'Series A/B', description: '', quote: 'Establishing the foundation.' },
      { title: 'Enterprise', description: '', quote: 'Optimizing at scale.' },
      { title: 'PE Portfolio', description: '', quote: 'Accelerating value creation.' },
    ],
  },
  founder: {
    name: 'Michael',
    role: 'Global GTM Strategist & Revenue Architect',
    image: '/images/heroes/homepage-hero.jpg',
    bio: 'Every inquiry is reviewed directly. Expect a practical response within 24 hours.',
    yearsExperience: '20+',
    timeline: [
      { icon: 'mail', title: 'Direct Reach', description: 'michael@gtmstack.pro' },
      { icon: 'calendar_month', title: 'Scheduling', description: 'Available for strategic consultations.' },
      { icon: 'location_on', title: 'Global', description: 'Remote-first, based in major tech hubs.' },
    ],
  },
  ctaBottom: {
    title: 'Ready to scope the right starting point?',
    subtitle: 'Share your current motion, systems, and target outcomes. We will recommend the highest-leverage path first.',
    buttonText: 'Start the conversation',
  },
}
