/**
 * Blog Data Adapter
 *
 * Transforms WordPress REST API responses (WPPost, WPTerm arrays) into
 * template props. Fetches must use `_embed=1` so `_embedded` includes:
 * - `wp:featuredmedia` — featured image `source_url`, `alt_text`
 * - `wp:term` — `[categories[], tags[]]` (categories first, then post_tag)
 * - `author` — post author `name`, `description`, `avatar_urls` (WordPress embed)
 *
 * @see docs/BLOG_WORDPRESS.md
 */

import type { WPPost, WPTerm } from '@/lib/wp-client'
import type {
  AdaptedArticleBase,
  AdaptedCaseStudyPost,
  AdaptedComparisonPost,
  AdaptedFrameworkPost,
  AdaptedGuidePost,
  AdaptedHowToPost,
  AdaptedInsightPost,
  AdaptedModularArticleSection,
  AdaptedModularFaqItem,
  AdaptedResearchPost,
  WPAcfCaseStudyFields,
  WPAcfComparisonFields,
  WPAcfFrameworkFields,
  WPAcfGuideFields,
  WPAcfHowToFields,
  WPAcfInsightFields,
  WPAcfModularArticleFields,
  WPAcfModularSection,
  WPAcfRepeaterItem,
  WPAcfResearchFields,
} from '@/src/types/blog'
import {
  getEmbeddedAuthor,
  getAuthorAvatarUrl,
  estimateReadTimeMinutesFromHtml,
  getPostCategories,
  getPostTags,
} from '@/lib/wp-client'
import { getFeaturedImageUrl, BLOG_FALLBACK_IMAGE } from '@/lib/wp-media'

// ----- Index/Feed Template Adapter -----

export interface BlogFeedAdapterProps {
  posts: WPPost[]
  categories: WPTerm[]
  tags?: WPTerm[]
  selectedCategory?: string
  searchQuery?: string
}

export interface AdaptedBlogFeedContent {
  nav: {
    logo: { text: string; accent: string }
    links: Array<{ label: string; href: string; isActive?: boolean }>
    cta: string
  }
  hero: {
    title: string
    titleAccent: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
  }
  filters: {
    categories: string[]
    searchPlaceholder: string
  }
  blog: {
    posts: Array<{
      id: string
      slug: string
      category: string
      categoryColor: string
      readTime: string
      date: string
      title: string
      excerpt: string
      author: { name: string; role: string; avatar?: string }
      graphicLabel: string
      borderColor: string
    }>
    loadMoreCta: string
  }
  philosophy: {
    quote: string
    accent: string
  }
  categories: Array<{
    title: string
    description: string
    icon: 'BarChart3' | 'Users' | 'Heart' | 'Zap' | 'Lightbulb'
    color: string
  }>
  teasers: Array<{ label: string; title: string; href: string }>
  ctaBand: { title: string; subtitle: string; buttonText: string }
  footer: {
    description: string
    sections: Array<{ title: string; links: Array<{ label: string; href: string }> }>
    copyright: string
    legalLinks: Array<{ label: string; href: string }>
  }
}

const CATEGORY_COLORS = [
  'bg-teal-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-yellow-500',
  'bg-blue-600',
  'bg-orange-500',
  'bg-purple-500',
  'bg-green-500',
]

const BORDER_COLORS = [
  'hover:border-blue-500/50',
  'hover:border-pink-500/50',
  'hover:border-indigo-500/50',
  'hover:border-yellow-500/50',
  'hover:border-blue-600/50',
  'hover:border-orange-500/50',
  'hover:border-purple-500/50',
  'hover:border-green-500/50',
]

const GRAPHIC_LABELS = [
  'FRAMEWORK_01_REVOPS',
  'MAP_CX_LIFECYCLE',
  'AI_LLM_IMPLEMENTATION',
  'REVOPS_EFFICIENCY_04',
  'ABM_TIERED_ENGAGEMENT',
  'DEMAND_GEN_2023',
  'INSIGHTS_ARCH_01',
  'STRATEGY_MAP_02',
]

function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, '').trim())
}

function stripDisplayPrefix(value: string): string {
  return value
    .replace(/^(?:ACF|FIELD|META|WP)[A-Z0-9_\-\s]{0,40}:\s*/i, '')
    .replace(/^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+:\s*/, '')
    .trim()
}

function cleanDisplayText(value?: string): string {
  return stripDisplayPrefix(decodeHtmlEntities((value || '').trim()))
}

function decodeHtmlEntities(value: string): string {
  if (!value) return ''

  const namedEntities: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    rsquo: "'",
    lsquo: "'",
    rdquo: '"',
    ldquo: '"',
    hellip: '...',
    ndash: '-',
    mdash: '-',
  }

  return value.replace(/&(#x?[0-9a-f]+|\w+);/gi, (match, entity: string) => {
    const normalized = entity.toLowerCase()

    if (normalized[0] === '#') {
      const isHex = normalized[1] === 'x'
      const raw = isHex ? normalized.slice(2) : normalized.slice(1)
      const codePoint = Number.parseInt(raw, isHex ? 16 : 10)

      if (Number.isFinite(codePoint)) {
        try {
          return String.fromCodePoint(codePoint)
        } catch {
          return match
        }
      }

      return match
    }

    return namedEntities[normalized] ?? match
  })
}

function getArticleCategoryNames(post: WPPost): string[] {
  return getPostCategories(post)
    .map((term) => cleanDisplayText(term.name))
    .filter(Boolean) as string[]
}

function getArticleAuthorName(post: WPPost): string | undefined {
  return cleanDisplayText(getEmbeddedAuthor(post)?.name) || undefined
}

function buildArticleRelatedArticles(post: WPPost, relatedPosts: WPPost[]): Array<{ title: string; url: string }> {
  return relatedPosts
    .filter((candidate) => candidate.id !== post.id)
    .slice(0, 3)
    .map((candidate) => ({
      title: stripHtml(candidate.title?.rendered || candidate.slug),
      url: `/blog/post?slug=${encodeURIComponent(candidate.slug)}`,
    }))
}

function buildArticleSemanticTerms(post: WPPost): string[] {
  const categoryNames = getPostCategories(post).map((term) => cleanDisplayText(term.name))
  const tagNames = getPostTags(post).map((term) => cleanDisplayText(term.name))

  return Array.from(
    new Set(
      [...categoryNames, ...tagNames]
        .map((term) => term.trim())
        .filter(Boolean)
    )
  ).slice(0, 6)
}

function mapRepeaterItems(rows?: WPAcfRepeaterItem[]): string[] {
  return (rows || [])
    .map((row) => cleanDisplayText(row?.item))
    .filter(Boolean) as string[]
}

function mapTextItems(rows?: Array<{ text?: string }>): string[] {
  return (rows || [])
    .map((row) => cleanDisplayText(row?.text))
    .filter(Boolean) as string[]
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalizeRichText(value?: string): string {
  const trimmed = stripDisplayPrefix(decodeHtmlEntities((value || '').trim()))
  if (!trimmed) return ''

  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed
  }

  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`)
    .join('')
}

function mapFaqItems(rows?: Array<{ question?: string; answer?: string }>): AdaptedModularFaqItem[] {
  return (rows || [])
    .map((row) => ({
      question: cleanDisplayText(row?.question),
      answer: normalizeRichText(row?.answer),
    }))
    .filter((row) => row.question && row.answer)
}

function normalizeModularSectionType(rawType?: string): AdaptedModularArticleSection['type'] {
  const normalized = (rawType || '').trim().toLowerCase().replace(/[\s_-]+/g, '_')
  if (normalized === 'callout' || normalized === 'colored_callout') return 'callout'
  if (normalized === 'checklist' || normalized === 'list' || normalized === 'bullet_list') return 'checklist'
  if (normalized === 'image' || normalized === 'image_block') return 'image'
  return 'text'
}

function mapModularSections(rows?: WPAcfModularSection[]): AdaptedModularArticleSection[] {
  return (rows || [])
    .map((section) => {
      const type = normalizeModularSectionType(section?.type)
      return {
        type,
        heading: cleanDisplayText(section?.heading),
        body: normalizeRichText(section?.body),
        style: cleanDisplayText(section?.style).toLowerCase(),
        items: type === 'checklist' ? mapTextItems(section?.items) : [],
        imageUrl: section?.image_url?.trim() || '',
        imageAlt: cleanDisplayText(section?.image_alt),
        imageCaption: cleanDisplayText(section?.image_caption),
        imagePrompt: cleanDisplayText(section?.image_prompt),
      }
    })
    .filter((section) => {
      if (section.type === 'checklist') return Boolean(section.heading || section.body || section.items.length)
      if (section.type === 'image') {
        return Boolean(
          section.heading ||
          section.body ||
          section.imageUrl ||
          section.imageCaption ||
          section.imagePrompt
        )
      }
      return Boolean(section.heading || section.body)
    })
}

function adaptArticleBase(post: WPPost, relatedPosts: WPPost[] = []): AdaptedArticleBase {
  const acf = post.acf || {}
  const embeddedAuthor = getEmbeddedAuthor(post)

  return {
    slug: post.slug,
    title: stripHtml(post.title?.rendered || ''),
    excerpt: stripHtml(post.excerpt?.rendered || ''),
    contentHtml: post.content?.rendered || '',
    publishedAt: post.date,
    featuredImage: getFeaturedImageUrl(post) || undefined,
    categories: getArticleCategoryNames(post),
    authorName: getArticleAuthorName(post),
    authorAvatarUrl: getAuthorAvatarUrl(embeddedAuthor),
    relatedArticles: buildArticleRelatedArticles(post, relatedPosts),
    semanticTerms: buildArticleSemanticTerms(post),
    sidebarPromo: {
      title: 'Marketing Assessment Tool',
      body: 'Quantify your GTM stack and identify your next growth bottleneck.',
      buttonLabel: 'Launch Terminal',
      buttonUrl: '/contact',
    },
    heroKicker: cleanDisplayText(acf.hero_kicker),
    dek: cleanDisplayText(acf.dek),
    featuredQuote: cleanDisplayText(acf.featured_quote),
    quoteSource: cleanDisplayText(acf.quote_source),
    ctaHeadline: cleanDisplayText(acf.cta_headline),
    ctaBody: acf.cta_body || '',
    ctaButtonLabel: cleanDisplayText(acf.cta_button_label),
    ctaButtonUrl: acf.cta_button_url || '',
    authorNote: acf.author_note || '',
  }
}

export function adaptHowToPostData(post: WPPost, relatedPosts: WPPost[] = []): AdaptedHowToPost {
  const acf = (post.acf || {}) as WPAcfHowToFields

  return {
    ...adaptArticleBase(post, relatedPosts),
    showTakeaways: Boolean(acf.show_takeaways),
    takeaways: mapRepeaterItems(acf.takeaways),
    checklistTitle: acf.checklist_title || '',
    checklistItems: mapRepeaterItems(acf.checklist_items),
  }
}

export function adaptInsightPostData(post: WPPost, relatedPosts: WPPost[] = []): AdaptedInsightPost {
  const acf = (post.acf || {}) as WPAcfInsightFields

  return {
    ...adaptArticleBase(post, relatedPosts),
    keyIdeas: mapRepeaterItems(acf.key_ideas),
    closingThesis: acf.closing_thesis || '',
  }
}

export function adaptComparisonPostData(post: WPPost, relatedPosts: WPPost[] = []): AdaptedComparisonPost {
  const acf = (post.acf || {}) as WPAcfComparisonFields

  return {
    ...adaptArticleBase(post, relatedPosts),
    comparisonSummary: acf.comparison_summary || '',
    comparedEntities: mapRepeaterItems(acf.compared_entities),
    decisionFactors: mapRepeaterItems(acf.decision_factors),
    recommendedChoice: acf.recommended_choice || '',
  }
}

export function adaptFrameworkPostData(post: WPPost, relatedPosts: WPPost[] = []): AdaptedFrameworkPost {
  const acf = (post.acf || {}) as WPAcfFrameworkFields

  return {
    ...adaptArticleBase(post, relatedPosts),
    frameworkName: acf.framework_name || '',
    corePrinciples: mapRepeaterItems(acf.core_principles),
    implementationSteps: mapRepeaterItems(acf.implementation_steps),
    maturityModel: acf.maturity_model || '',
  }
}

export function adaptCaseStudyPostData(post: WPPost, relatedPosts: WPPost[] = []): AdaptedCaseStudyPost {
  const acf = (post.acf || {}) as WPAcfCaseStudyFields

  return {
    ...adaptArticleBase(post, relatedPosts),
    clientName: acf.client_name || '',
    industry: acf.industry || '',
    challenge: acf.challenge || '',
    solution: acf.solution || '',
    outcomes: mapRepeaterItems(acf.outcomes),
    metrics: (acf.metrics || [])
      .map((metric) => ({
        label: metric.label?.trim() || '',
        value: metric.value?.trim() || '',
      }))
      .filter((metric) => metric.label || metric.value),
  }
}

export function adaptResearchPostData(post: WPPost, relatedPosts: WPPost[] = []): AdaptedResearchPost {
  const acf = (post.acf || {}) as WPAcfResearchFields

  return {
    ...adaptArticleBase(post, relatedPosts),
    executiveSummary: acf.executive_summary || '',
    methodology: acf.methodology || '',
    keyFindings: mapRepeaterItems(acf.key_findings),
    dataSources: mapRepeaterItems(acf.data_sources),
    researchDate: acf.research_date || '',
  }
}

export function adaptGuidePostData(post: WPPost, relatedPosts: WPPost[] = []): AdaptedGuidePost {
  const acf = (post.acf || {}) as WPAcfGuideFields

  return {
    ...adaptArticleBase(post, relatedPosts),
    guideSummary: acf.guide_summary || '',
    prerequisites: mapRepeaterItems(acf.prerequisites),
    stepSections: mapRepeaterItems(acf.step_sections),
    faqItems: mapRepeaterItems(acf.faq_items),
  }
}

function getPrimaryCategory(post: WPPost): string {
  const cats = getPostCategories(post)
  return cleanDisplayText(cats[0]?.name) || 'General'
}

function getPrimaryCategorySlug(post: WPPost): string | undefined {
  const cats = getPostCategories(post)
  const s = cats[0]?.slug
  return typeof s === 'string' && s.length > 0 ? s : undefined
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export function adaptBlogFeedData(props: BlogFeedAdapterProps): AdaptedBlogFeedContent {
  const { posts, categories } = props

  const adaptedPosts = posts.map((post, idx) => ({
    id: String(post.id),
    slug: post.slug,
    category: getPrimaryCategory(post),
    categoryColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
    readTime: '5 min read',
    date: formatDate(post.date),
    title: stripHtml(post.title?.rendered || post.slug),
    excerpt: stripHtml(post.excerpt?.rendered || '').substring(0, 120) + '...',
    author: {
      name: 'GTMStack Team',
      role: 'GTM Expert',
      avatar: undefined,
    },
    graphicLabel: GRAPHIC_LABELS[idx % GRAPHIC_LABELS.length],
    borderColor: BORDER_COLORS[idx % BORDER_COLORS.length],
  }))

  const categoryNames = categories.map((c) => cleanDisplayText(c.name))

  return {
    nav: {
      logo: { text: 'GTM', accent: 'Stack' },
      links: [
        { label: 'Expertise', href: '/expertise', isActive: false },
        { label: 'Industries', href: '/industries', isActive: false },
        { label: 'Insights', href: '/blog', isActive: true },
        { label: 'About', href: '/about', isActive: false },
      ],
      cta: 'Get Started',
    },
    hero: {
      title: 'GTM',
      titleAccent: 'Insights',
      subtitle:
        'Strategic articles, frameworks, and case breakdowns engineered to help B2B leaders build predictable revenue systems.',
      primaryCta: 'Browse All Posts',
      secondaryCta: 'Subscribe for Updates',
    },
    filters: {
      categories: ['All Posts', ...categoryNames],
      searchPlaceholder: 'Search insights...',
    },
    blog: {
      posts: adaptedPosts,
      loadMoreCta: 'Load More Insights',
    },
    philosophy: {
      quote: "Insights aren't opinions — they're",
      accent: 'engineered foresight',
    },
    categories: [
      {
        title: 'Strategy',
        description: 'Long-term frameworks for market dominance.',
        icon: 'BarChart3',
        color: 'text-blue-500',
      },
      {
        title: 'Operations',
        description: 'Operational efficiency and tech-stack harmony.',
        icon: 'Zap',
        color: 'text-yellow-500',
      },
      {
        title: 'Growth',
        description: 'Scaling revenue with data-backed strategies.',
        icon: 'Lightbulb',
        color: 'text-indigo-500',
      },
      {
        title: 'Customer Experience',
        description: 'Retention and expansion engineered by design.',
        icon: 'Heart',
        color: 'text-pink-500',
      },
      {
        title: 'Account Strategy',
        description: 'Targeting high-value accounts with precision.',
        icon: 'Users',
        color: 'text-teal-500',
      },
    ],
    teasers: [
      { label: 'Solutions', title: 'Our Projects', href: '/projects' },
      { label: 'Capabilities', title: 'Deep Expertise', href: '/expertise' },
      { label: 'Industries', title: 'Industry Focus', href: '/industries' },
      { label: 'Company', title: 'About Us', href: '/about' },
    ],
    ctaBand: {
      title: 'Ready to Apply These Insights?',
      subtitle: 'Transform your GTM motion with data-backed engineering strategies.',
      buttonText: 'Schedule Consultation',
    },
    footer: {
      description: 'Enterprise GTM consulting focused on engineering high-performance revenue systems for B2B leaders.',
      sections: [
        {
          title: 'Platform',
          links: [
            { label: 'Methodology', href: '/about' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Expertise', href: '/expertise' },
          ],
        },
        {
          title: 'Resources',
          links: [
            { label: 'Blog', href: '/blog' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          title: 'Connect',
          links: [
            { label: 'LinkedIn', href: 'https://linkedin.com' },
            { label: 'Twitter', href: 'https://twitter.com' },
            { label: 'Email', href: 'mailto:hello@gtmstack.pro' },
          ],
        },
      ],
      copyright: '© 2026 GTMStack. All rights reserved.',
      legalLinks: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  }
}

// ----- Stitch blog index (sandbox/stitch-html/blog.html) -----

export interface StitchPostCard {
  id: string
  slug: string
  title: string
  excerpt: string
  /** Longer blurb for featured large cards (sandbox/stitch-html/blog.html). */
  excerptLong: string
  date: string
  readTimeLabel: string
  categoryName: string
  categorySlug?: string
  tagNames: string[]
  authorName: string
  /** From `_embedded.wp:featuredmedia[0]` when `_embed=1` */
  imageUrl: string | null
  imageAlt: string
  href: string
  categoryBadgeClass: string
  /** Bottom accent on grid cards — matches stitch.html nebula cards */
  borderBottomClass: string
}

/** Two-up “Featured Analysis” row — stitch.html section after the main grid */
export interface StitchFeaturedLargeCard extends StitchPostCard {
  ribbonLabel: string
  ribbonClass: string
  bottomBorderClass: string
  editionMeta: string
  secondaryMeta: string
  authorSubtitle: string
}

export interface StitchBlogFeedContent {
  hero: {
    titleGradient: string
    subtitle: string
  }
  /** First four posts — 2×2 grid (stitch.html main column). */
  grid: StitchPostCard[]
  /** Posts 5–6 — large dual cards below the grid. */
  featuredLarge: StitchFeaturedLargeCard[]
  categoryPills: Array<{ label: string; slug: string }>
  tagPills: Array<{ label: string; slug: string }>
  sidebar: {
    authorName: string
    authorRole: string
    authorBio: string
    authorImage?: string
    linkedInHref: string
    trendingTags: Array<{ label: string; slug: string }>
  }
}

/** Rounded category pills — align with sandbox/stitch-html/blog.html */
const STITCH_BADGE = [
  'bg-[#6FAFE0] text-white',
  'bg-[#112B46] text-white',
  'bg-[#6FAFE0] text-white',
  'bg-[#F9C74F] text-[#0D2137]',
]

const GRID_BORDER_BOTTOM = [
  'border-b-[3px] border-[#F9C74F]',
  'border-b-[3px] border-[#6FAFE0]',
  'border-b-[3px] border-[#6FAFE0]/50',
  'border-b-[3px] border-[#F9C74F]',
]

function formatMonthYearEdition(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return `${d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Edition`
  } catch {
    return 'Edition'
  }
}

function buildTrendingTags(posts: WPPost[], categories: WPTerm[]): Array<{ label: string; slug: string }> {
  const seen = new Set<string>()
  const out: Array<{ label: string; slug: string }> = []
  for (const p of posts) {
    for (const t of getPostTags(p)) {
      const name = t.name?.trim()
      const slug = t.slug?.trim()
      if (!name || !slug) continue
      const key = slug.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ label: name.startsWith('#') ? name : `#${name}`, slug })
      if (out.length >= 6) return out
    }
  }
  for (const c of categories) {
    if (out.length >= 6) break
    const key = c.slug?.toLowerCase() ?? ''
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push({ label: `#${c.name}`, slug: c.slug })
  }
  const fallbacks = [
    { label: '#RevOps', slug: 'revops' },
    { label: '#AI', slug: 'ai' },
    { label: '#HubSpot', slug: 'hubspot' },
  ]
  while (out.length < 3) {
    const fb = fallbacks[out.length]
    if (fb) out.push(fb)
    else break
  }
  return out.slice(0, 6)
}

function stitchCardFromPost(post: WPPost, idx: number): StitchPostCard {
  const cats = getPostCategories(post)
  const tags = getPostTags(post)
  const primaryCat = cats[0]
  const img = getFeaturedImageUrl(post)
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const embeddedAuthor = getEmbeddedAuthor(post)
  const readM = estimateReadTimeMinutesFromHtml(
    `${post.content?.rendered || ''} ${post.excerpt?.rendered || ''}`
  )
  const excerptRaw = stripHtml(post.excerpt?.rendered || '')
  const excerpt =
    excerptRaw.length > 180 ? `${excerptRaw.slice(0, 177).trim()}…` : excerptRaw
  const excerptLong =
    excerptRaw.length > 320 ? `${excerptRaw.slice(0, 317).trim()}…` : excerptRaw || excerpt

  return {
    id: String(post.id),
    slug: post.slug,
    title: stripHtml(post.title?.rendered || post.slug),
    excerpt: excerpt || '…',
    excerptLong: excerptLong || excerpt,
    date: formatDate(post.date),
    readTimeLabel: `${readM} min read`,
    categoryName: primaryCat?.name || 'Insights',
    categorySlug: primaryCat?.slug,
    tagNames: tags.map((t) => t.name).filter(Boolean),
    authorName: embeddedAuthor?.name?.trim() || 'Editorial',
    imageUrl: img,
    imageAlt: media?.alt_text || stripHtml(post.title?.rendered || 'Post'),
    href: `/blog/post?slug=${encodeURIComponent(post.slug)}`,
    categoryBadgeClass: STITCH_BADGE[idx % STITCH_BADGE.length],
    borderBottomClass: GRID_BORDER_BOTTOM[idx % GRID_BORDER_BOTTOM.length],
  }
}

function stitchFeaturedLargeFromPost(post: WPPost, idx: number): StitchFeaturedLargeCard {
  const base = stitchCardFromPost(post, idx + 4)
  const even = idx % 2 === 0
  return {
    ...base,
    ribbonLabel: even ? 'Featured Analysis' : 'Executive Brief',
    ribbonClass: even ? 'bg-[#6FAFE0] text-white' : 'bg-[#F9C74F] text-[#0D2137]',
    bottomBorderClass: even ? 'border-b-[4px] border-[#6FAFE0]' : 'border-b-[4px] border-[#F9C74F]',
    editionMeta: formatMonthYearEdition(post.date),
    secondaryMeta: even ? 'Long Read' : 'Key Insights',
    authorSubtitle: even ? 'Lead Architect' : 'Strategy Director',
  }
}

export function adaptStitchBlogFeedData(props: BlogFeedAdapterProps): StitchBlogFeedContent {
  const { posts, categories, tags = [] } = props
  const grid = posts.slice(0, 4).map((p, i) => stitchCardFromPost(p, i))
  const featuredLarge = posts.slice(4, 6).map((p, i) => stitchFeaturedLargeFromPost(p, i))

  const firstAuthor = posts[0] ? getEmbeddedAuthor(posts[0]) : null
  const avatar = getAuthorAvatarUrl(firstAuthor)
  const authorBio = firstAuthor?.description
    ? stripHtml(firstAuthor.description).slice(0, 220)
    : 'Architecting complex Go-To-Market ecosystems for over a decade. Dedicated to removing friction from the revenue engine.'

  return {
    hero: {
      titleGradient: 'GTM Insights',
      subtitle:
        'Deconstructing complex GTM architectures and operational workflows for high-growth revenue teams.',
    },
    grid,
    featuredLarge,
    categoryPills: [{ label: 'All', slug: '' }, ...categories.map((c) => ({ label: c.name, slug: c.slug }))],
    tagPills: tags.length > 0
      ? [{ label: 'All Tags', slug: '' }, ...tags.slice(0, 20).map((t) => ({ label: t.name, slug: t.slug }))]
      : [],
    sidebar: {
      authorName: firstAuthor?.name?.trim() || 'Mark Fischer',
      authorRole: 'Founder, GTMStack.pro',
      authorBio,
      authorImage: avatar,
      linkedInHref: 'https://linkedin.com',
      trendingTags: buildTrendingTags(posts, categories),
    },
  }
}

// ----- Single Post Template Adapter -----

export interface BlogSinglePostAdapterProps {
  post: WPPost
  relatedPosts: WPPost[]
}

export interface AdaptedBlogSinglePostContent {
  navigation: {
    logoText: string
    links: Array<{ label: string; href: string }>
    searchPlaceholder: string
  }
  hero: {
    breadcrumbs: Array<{ label: string; href: string }>
    title: string
    author: {
      name: string
      role: string
      image: string
      bio: string
      profileLink: string
    }
    publishedDate: string
    readingTime: string
  }
  article: {
    layoutType?: string
    featuredImage: { src: string; alt: string }
    showFeaturedImage?: boolean
    intro: string
    sections: Array<{
      title?: string
      content: string
      type: 'paragraph' | 'heading' | 'callout' | 'list'
      items?: Array<{ title: string; description: string }>
    }>
    tags: string[]
    modularSections?: AdaptedModularArticleSection[]
    faqItems?: AdaptedModularFaqItem[]
    cta?: {
      headline: string
      body: string
      buttonLabel: string
      buttonUrl: string
    } | null
    featuredQuote?: string
    quoteSource?: string
    heroKicker?: string
    dek?: string
    authorNote?: string
  }
  sidebar: {
    relatedInsights: Array<{
      title: string
      date: string
      image: string
      href: string
      alt: string
    }>
    newsletter: {
      title: string
      description: string
      buttonText: string
      subscriberCount: string
    }
  }
  footer: {
    links: Array<{ label: string; href: string }>
    copyright: string
  }
}

export function adaptBlogSinglePostData(props: BlogSinglePostAdapterProps): AdaptedBlogSinglePostContent {
  const { post, relatedPosts } = props
  const acf = (post.acf || {}) as WPAcfModularArticleFields

  const primaryCategory = getPrimaryCategory(post)
  const catSlug = getPrimaryCategorySlug(post)
  const tagTerms = getPostTags(post)
  const tags = tagTerms.map((t) => cleanDisplayText(t.name)).filter(Boolean)

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const featuredFromHelper = getFeaturedImageUrl(post)
  const featuredImageUrl =
    featuredFromHelper || featuredMedia?.source_url || BLOG_FALLBACK_IMAGE
  const featuredImageAlt = featuredMedia?.alt_text || stripHtml(post.title?.rendered || 'Featured image')

  const embedded = getEmbeddedAuthor(post)
  const avatarUrl = getAuthorAvatarUrl(embedded)
  const authorName = cleanDisplayText(embedded?.name) || 'Editorial'
  const authorBio = embedded?.description
    ? stripHtml(embedded.description).slice(0, 280)
    : 'GTM and revenue operations insights from the GTMStack team.'

  const readM = estimateReadTimeMinutesFromHtml(post.content?.rendered || post.excerpt?.rendered || '')
  const readLabel = `${readM} min read`
  const layoutType = acf.layout_type
  const modularSections = layoutType === 'modular_article' ? mapModularSections(acf.sections) : []
  const faqItems = mapFaqItems(acf.faq_items)
  const cta =
    acf.cta_headline?.trim() || acf.cta_body?.trim() || acf.cta_button_label?.trim() || acf.cta_button_url?.trim()
      ? {
          headline: cleanDisplayText(acf.cta_headline),
          body: normalizeRichText(acf.cta_body),
          buttonLabel: cleanDisplayText(acf.cta_button_label) || 'Learn More',
          buttonUrl: acf.cta_button_url?.trim() || '/contact',
        }
      : null

  const contentSections: AdaptedBlogSinglePostContent['article']['sections'] = []
  if (layoutType !== 'modular_article' && post.content?.rendered?.trim()) {
    contentSections.push({
      type: 'paragraph',
      content: post.content.rendered,
    })
  } else if (layoutType !== 'modular_article' && post.excerpt?.rendered?.trim()) {
    contentSections.push({
      type: 'paragraph',
      content: `<p>${stripHtml(post.excerpt.rendered)}</p>`,
    })
  }

  const categoryCrumbHref = catSlug ? `/blog?category=${encodeURIComponent(catSlug)}` : '/blog'

  const relatedInsights = relatedPosts.slice(0, 3).map((p) => {
    const relatedMedia = p._embedded?.['wp:featuredmedia']?.[0]
    const relImg = getFeaturedImageUrl(p) || relatedMedia?.source_url
    return {
      title: stripHtml(p.title?.rendered || p.slug),
      date: formatDate(p.date),
      image: relImg || BLOG_FALLBACK_IMAGE,
      href: `/blog/post?slug=${encodeURIComponent(p.slug)}`,
      alt: relatedMedia?.alt_text || 'Related post image',
    }
  })

  return {
    navigation: {
      logoText: 'GTMStack',
      links: [
        { label: 'Insights', href: '/blog' },
        { label: 'Expertise', href: '/expertise' },
        { label: 'Industries', href: '/industries' },
        { label: 'About', href: '/about' },
      ],
      searchPlaceholder: 'Search insights...',
    },
    hero: {
      breadcrumbs: [
        { label: 'Insights', href: '/blog' },
        { label: primaryCategory, href: categoryCrumbHref },
      ],
      title: stripHtml(post.title?.rendered || post.slug),
      author: {
        name: authorName,
        role: 'Author',
        image: avatarUrl || 'https://via.placeholder.com/64x64',
        bio: authorBio,
        profileLink: '/about',
      },
      publishedDate: formatDate(post.date),
      readingTime: readLabel,
    },
    article: {
      layoutType,
      featuredImage: {
        src: featuredImageUrl,
        alt: featuredImageAlt,
      },
      showFeaturedImage: layoutType !== 'modular_article' || Boolean(featuredFromHelper || featuredMedia?.source_url),
      /** Lead paragraph; omitted when body HTML is present (avoids duplicate excerpt + content). */
      intro: layoutType === 'modular_article'
        ? ''
        : post.content?.rendered?.trim()
        ? ''
        : stripHtml(post.excerpt?.rendered || ''),
      sections: contentSections,
      tags: tags,
      modularSections,
      faqItems,
      cta,
      featuredQuote: cleanDisplayText(acf.featured_quote),
      quoteSource: cleanDisplayText(acf.quote_source),
      heroKicker: cleanDisplayText(acf.hero_kicker),
      dek: cleanDisplayText(acf.dek),
      authorNote: normalizeRichText(acf.author_note),
    },
    sidebar: {
      relatedInsights,
      newsletter: {
        title: 'GTM Intelligence Weekly',
        description: 'Get the metrics, frameworks, and strategies powering the world\'s fastest-growing companies.',
        buttonText: 'Subscribe Now',
        subscriberCount: 'Join 5,000+ revenue leaders',
      },
    },
    footer: {
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Careers', href: '/careers' },
      ],
      copyright: '© 2026 GTMStack. All rights reserved.',
    },
  }
}
