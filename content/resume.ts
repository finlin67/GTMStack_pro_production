import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** Resume page content for HomeTemplate (PageContent shape). */
export const RESUME_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'PROFESSIONAL PROFILE',
    titleStart: 'Expertise in ',
    titleGradient: 'GTM Execution',
    subtitle:
      'Michael is a veteran GTM strategist with over 20 years of experience building and scaling revenue organizations in the enterprise tech and financial sectors.',
    ctaPrimary: 'Download PDF',
    ctaSecondary: 'View Projects',
  },
  stats: [
    { value: '20+', label: 'Years Experience' },
    { value: 'M&A', label: 'Analyst Origins' },
    { value: 'SFDC', label: 'Lead Strategist' },
    { value: 'Founder', label: 'RevenueArchitect' },
  ],
  methodology: {
    title: 'Career Evolution',
    description: 'A timeline of strategic leadership and impact across the global tech landscape.',
    steps: [
      {
        number: '01',
        icon: 'Search',
        title: 'Analytical Roots',
        description: 'M&A and financial modeling for major tech acquisitions.',
        progress: '25%',
      },
      {
        number: '02',
        icon: 'DraftingCompass',
        title: 'Strategic Lead',
        description: 'Salesforce GTM strategy for enterprise cloud expansion.',
        progress: '50%',
      },
      {
        number: '03',
        icon: 'Rocket',
        title: 'Founder / CEO',
        description: 'Building the first dedicated revenue architecture firm.',
        progress: '75%',
      },
      {
        number: '04',
        icon: 'Settings',
        title: 'Global Advisor',
        description: 'Ongoing advisory for high-growth tech portfolios.',
        progress: '100%',
      },
    ],
  },
  expertise: {
    title: 'Core Competencies',
    items: [
      {
        icon: 'TrendingUp',
        title: 'Enterprise GTM',
        description: 'Aligning marketing, sales, and success for complex enterprise sales cycles.',
        tags: ['Alignment', 'Complexity', 'Cycles'],
      },
      {
        icon: 'Map',
        title: 'Strategy & Ops',
        description: 'Connecting top-down strategy to bottom-up operational execution.',
        tags: ['Strategy', 'Execution', 'Ops'],
      },
      {
        icon: 'Network',
        title: 'RevOps Stack',
        description: 'Designing and deploying integrated technology stacks that drive pipeline.',
        tags: ['SFDC', 'Marketo', 'Tableau'],
      },
      {
        icon: 'Settings',
        title: 'Leadership',
        description: 'Building and mentoring high-performing revenue and operations teams.',
        tags: ['Mentorship', 'Growth', 'Scale'],
      },
    ],
  },
  quote: {
    text: 'Impact is measured in outcomes, not just ',
    highlight: 'activity or intent',
  },
  caseStudies: {
    title: 'Impact Snapshot',
    subtitle: 'Proven results across varied industries and growth stages.',
    items: [
      {
        title: 'Global SaaS Build',
        description: 'Architected the GTM motion for a global cloud provider, resulting in sustained pipeline growth.',
        outcomeLabel: 'Scale Achieved',
        outcomeValue: '10x',
      },
      {
        title: 'Fintech Transformation',
        description: 'Redesigned the sales ops engine for a leading fintech, cutting cycle times in half.',
        outcomeLabel: 'Cycle Time',
        outcomeValue: '-50%',
      },
      {
        title: 'Founder Advisory',
        description: 'Guided multiple Series A founders from initial launch to predictable revenue.',
        outcomeLabel: 'Predictability',
        outcomeValue: 'High',
      },
    ],
    industries: [
      { title: 'Cloud/SaaS', description: '', quote: 'Mastering the subscription economy.' },
      { title: 'Fintech', description: '', quote: 'Velocity in a regulated world.' },
      { title: 'B2B Services', description: '', quote: 'Scaling human-centric value.' },
    ],
  },
  founder: {
    name: 'Michael',
    role: 'Global GTM Strategist & Revenue Architect',
    image: 'https://placehold.co/800x800/png',
    bio: 'Bridging the gap between product innovation and market dominance through engineering-led GTM.',
    yearsExperience: '20+',
    timeline: [
      { icon: 'account_balance', title: 'Wall Street', description: 'Financial precision and rigor.' },
      { icon: 'cloud_done', title: 'Salesforce', description: 'Enterprise-grade strategic scale.' },
      { icon: 'rocket_launch', title: 'RevenueArchitect', description: 'Founder-led tactical execution.' },
    ],
  },
  ctaBottom: {
    title: 'Work with Michael',
    subtitle: 'Bring veteran strategic oversight to your next growth phase.',
    buttonText: 'View Projects',
  },
}
