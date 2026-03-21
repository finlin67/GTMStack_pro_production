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
  return html.replace(/<[^>]*>/g, '').trim()
}

function getPrimaryCategory(post: WPPost): string {
  const cats = getPostCategories(post)
  return cats[0]?.name?.trim() || 'General'
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

  const categoryNames = categories.map((c) => c.name)

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
    featuredImage: { src: string; alt: string }
    intro: string
    sections: Array<{
      title?: string
      content: string
      type: 'paragraph' | 'heading' | 'callout' | 'list'
      items?: Array<{ title: string; description: string }>
    }>
    tags: string[]
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

  const primaryCategory = getPrimaryCategory(post)
  const catSlug = getPrimaryCategorySlug(post)
  const tagTerms = getPostTags(post)
  const tags = tagTerms.map((t) => t.name).filter(Boolean)

  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const featuredFromHelper = getFeaturedImageUrl(post)
  const featuredImageUrl =
    featuredFromHelper || featuredMedia?.source_url || BLOG_FALLBACK_IMAGE
  const featuredImageAlt = featuredMedia?.alt_text || stripHtml(post.title?.rendered || 'Featured image')

  const embedded = getEmbeddedAuthor(post)
  const avatarUrl = getAuthorAvatarUrl(embedded)
  const authorName = embedded?.name?.trim() || 'Editorial'
  const authorBio = embedded?.description
    ? stripHtml(embedded.description).slice(0, 280)
    : 'GTM and revenue operations insights from the GTMStack team.'

  const readM = estimateReadTimeMinutesFromHtml(post.content?.rendered || post.excerpt?.rendered || '')
  const readLabel = `${readM} min read`

  const contentSections: AdaptedBlogSinglePostContent['article']['sections'] = []
  if (post.content?.rendered?.trim()) {
    contentSections.push({
      type: 'paragraph',
      content: post.content.rendered,
    })
  } else if (post.excerpt?.rendered?.trim()) {
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
      featuredImage: {
        src: featuredImageUrl,
        alt: featuredImageAlt,
      },
      /** Lead paragraph; omitted when body HTML is present (avoids duplicate excerpt + content). */
      intro: post.content?.rendered?.trim()
        ? ''
        : stripHtml(post.excerpt?.rendered || ''),
      sections: contentSections,
      tags: tags,
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
