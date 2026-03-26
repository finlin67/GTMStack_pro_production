import type { HomeTemplateContent } from '../src/templates/home/HomeTemplate'

/** Contact page content for HomeTemplate (PageContent shape). */
export const CONTACT_CONTENT: HomeTemplateContent = {
  hero: {
    badge: 'CONTACT',
    titleStart: 'Start with the page or ',
    titleGradient: 'the problem',
    subtitle:
      'Send the page, case study, or GTM problem you want to discuss. You will get a direct reply from Michael.',
    ctaPrimary: 'Email Michael',
    ctaSecondary: 'See Case Studies',
  },
  stats: [
    { value: '24h', label: 'Response Time' },
    { value: '100%', label: 'Founder-Led' },
    { value: 'Global', label: 'Availability' },
    { value: 'Direct', label: 'Communication' },
  ],
  methodology: {
    title: 'A Useful First Exchange',
    description: 'Keep the first message simple: share the problem, the page, or the system you want to talk through.',
    steps: [
      {
        number: '01',
        icon: 'Search',
        title: 'Context',
        description: 'Share the page, motion, or constraint that prompted you to reach out.',
        progress: '25%',
      },
      {
        number: '02',
        icon: 'DraftingCompass',
        title: 'Signal',
        description: 'Call out the metric, friction point, or decision that matters most right now.',
        progress: '50%',
      },
      {
        number: '03',
        icon: 'Rocket',
        title: 'Response',
        description: 'Get a direct reply with a point of view, not a canned intake process.',
        progress: '75%',
      },
      {
        number: '04',
        icon: 'Settings',
        title: 'Next Step',
        description: 'If there is a real fit, continue the conversation from there.',
        progress: '100%',
      },
    ],
  },
  expertise: {
    title: 'Good reasons to reach out',
    items: [
      {
        icon: 'TrendingUp',
        title: 'A page sparked a question',
        description: 'You want to talk through an idea, system, or case study from the site.',
        tags: ['Specific', 'Practical', 'Easy start'],
      },
      {
        icon: 'Map',
        title: 'A GTM system feels stuck',
        description: 'You can see the friction but want a sharper outside read on where it actually sits.',
        tags: ['Diagnosis', 'Clarity', 'Momentum'],
      },
      {
        icon: 'Network',
        title: 'You need a second set of eyes',
        description: 'You want an operator perspective on messaging, measurement, routing, or execution.',
        tags: ['Operator view', 'Direct', 'Concrete'],
      },
      {
        icon: 'Settings',
        title: 'You want to compare notes',
        description: 'You are building something adjacent and want to trade ideas with someone who has shipped similar work.',
        tags: ['Peer exchange', 'Systems', 'GTM'],
      },
    ],
  },
  quote: {
    text: 'The best GTM conversations usually start with a single ',
    highlight: 'honest conversation',
  },
  caseStudies: {
    title: 'What helps most in a first message',
    subtitle: 'A little specificity makes the exchange much more useful.',
    items: [
      {
        title: 'The page',
        description: 'Send the URL or section that prompted the outreach.',
        outcomeLabel: 'Best input',
        outcomeValue: 'Specific page',
      },
      {
        title: 'The problem',
        description: 'Name the decision, metric, or GTM friction you want to discuss.',
        outcomeLabel: 'Best input',
        outcomeValue: 'One sentence',
      },
      {
        title: 'The context',
        description: 'Include enough detail to make the reply practical instead of generic.',
        outcomeLabel: 'Best input',
        outcomeValue: 'A little context',
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
    title: 'Send the page, problem, or system',
    subtitle: 'That is usually enough to begin a useful conversation without turning this into a formal intake flow.',
    buttonText: 'Email Michael',
  },
}
