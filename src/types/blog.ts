export type WPLayoutType =
  | 'how-to'
  | 'insight'
  | 'comparison'
  | 'framework'
  | 'case-study'
  | 'research'
  | 'guide'
  | 'modular_article'

export type WPAcfRepeaterItem = {
  item?: string
}

export type WPAcfFaqItem = {
  question?: string
  answer?: string
}

export type WPAcfSectionItem = {
  text?: string
}

export type WPAcfModularSection = {
  type?: string
  heading?: string
  body?: string
  style?: string
  items?: WPAcfSectionItem[]
  image_url?: string
  image_alt?: string
  image_caption?: string
  image_prompt?: string
}

export type WPAcfMetricItem = {
  label?: string
  value?: string
}

export type WPAcfSharedFields = {
  layout_type?: WPLayoutType
  hero_kicker?: string
  dek?: string
  featured_quote?: string
  quote_source?: string
  cta_headline?: string
  cta_body?: string
  cta_button_label?: string
  cta_button_url?: string
  author_note?: string
  faq_items?: WPAcfFaqItem[]
  sections?: WPAcfModularSection[]
}

export type WPAcfHowToFields = WPAcfSharedFields & {
  layout_type?: 'how-to'
  show_takeaways?: boolean
  takeaways?: WPAcfRepeaterItem[]
  checklist_title?: string
  checklist_items?: WPAcfRepeaterItem[]
}

export type WPAcfInsightFields = WPAcfSharedFields & {
  layout_type?: 'insight'
  key_ideas?: WPAcfRepeaterItem[]
  closing_thesis?: string
}

export type WPAcfComparisonFields = WPAcfSharedFields & {
  layout_type?: 'comparison'
  comparison_summary?: string
  compared_entities?: WPAcfRepeaterItem[]
  decision_factors?: WPAcfRepeaterItem[]
  recommended_choice?: string
}

export type WPAcfFrameworkFields = WPAcfSharedFields & {
  layout_type?: 'framework'
  framework_name?: string
  core_principles?: WPAcfRepeaterItem[]
  implementation_steps?: WPAcfRepeaterItem[]
  maturity_model?: string
}

export type WPAcfCaseStudyFields = WPAcfSharedFields & {
  layout_type?: 'case-study'
  client_name?: string
  industry?: string
  challenge?: string
  solution?: string
  outcomes?: WPAcfRepeaterItem[]
  metrics?: WPAcfMetricItem[]
}

export type WPAcfResearchFields = WPAcfSharedFields & {
  layout_type?: 'research'
  executive_summary?: string
  methodology?: string
  key_findings?: WPAcfRepeaterItem[]
  data_sources?: WPAcfRepeaterItem[]
  research_date?: string
}

export type WPAcfGuideFields = WPAcfSharedFields & {
  layout_type?: 'guide'
  guide_summary?: string
  prerequisites?: WPAcfRepeaterItem[]
  step_sections?: WPAcfRepeaterItem[]
  faq_items?: WPAcfRepeaterItem[]
}

export type WPAcfModularArticleFields = WPAcfSharedFields & {
  layout_type?: 'modular_article'
  faq_items?: WPAcfFaqItem[]
  sections?: WPAcfModularSection[]
}

export type WPAcfArticleFields =
  | WPAcfHowToFields
  | WPAcfInsightFields
  | WPAcfComparisonFields
  | WPAcfFrameworkFields
  | WPAcfCaseStudyFields
  | WPAcfResearchFields
  | WPAcfGuideFields
  | WPAcfModularArticleFields

export type AdaptedArticleBase = {
  slug: string
  title: string
  excerpt: string
  contentHtml: string
  publishedAt: string
  featuredImage?: string
  categories: string[]
  authorName?: string
  authorAvatarUrl?: string
  relatedArticles: Array<{ title: string; url: string }>
  semanticTerms: string[]
  sidebarPromo?: {
    title: string
    body: string
    buttonLabel: string
    buttonUrl: string
  }
  heroKicker?: string
  dek?: string
  featuredQuote?: string
  quoteSource?: string
  ctaHeadline?: string
  ctaBody?: string
  ctaButtonLabel?: string
  ctaButtonUrl?: string
  authorNote?: string
}

export type AdaptedHowToPost = AdaptedArticleBase & {
  showTakeaways: boolean
  takeaways: string[]
  checklistTitle?: string
  checklistItems: string[]
}

export type AdaptedInsightPost = AdaptedArticleBase & {
  keyIdeas: string[]
  closingThesis?: string
}

export type AdaptedComparisonPost = AdaptedArticleBase & {
  comparisonSummary?: string
  comparedEntities: string[]
  decisionFactors: string[]
  recommendedChoice?: string
}

export type AdaptedFrameworkPost = AdaptedArticleBase & {
  frameworkName?: string
  corePrinciples: string[]
  implementationSteps: string[]
  maturityModel?: string
}

export type AdaptedCaseStudyPost = AdaptedArticleBase & {
  clientName?: string
  industry?: string
  challenge?: string
  solution?: string
  outcomes: string[]
  metrics: Array<{ label: string; value: string }>
}

export type AdaptedResearchPost = AdaptedArticleBase & {
  executiveSummary?: string
  methodology?: string
  keyFindings: string[]
  dataSources: string[]
  researchDate?: string
}

export type AdaptedGuidePost = AdaptedArticleBase & {
  guideSummary?: string
  prerequisites: string[]
  stepSections: string[]
  faqItems: string[]
}

export type AdaptedModularArticleSection = {
  type: 'text' | 'callout' | 'checklist' | 'image'
  heading?: string
  body?: string
  style?: string
  items: string[]
  imageUrl?: string
  imageAlt?: string
  imageCaption?: string
  imagePrompt?: string
}

export type AdaptedModularFaqItem = {
  question: string
  answer: string
}
