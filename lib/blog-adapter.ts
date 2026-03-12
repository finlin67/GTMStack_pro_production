/**
 * Blog Data Adapter
 * 
 * Transforms WordPress REST API responses (WPPost, WPTerm arrays) into
 * the data contracts expected by the new Uploaded_BlogFeed_v1 and Uploaded_BlogSinglePost_v1 templates.
 * 
 * Keeps all WordPress fetch logic unchanged; only adapts the render layer.
 */

import type { WPPost, WPTerm } from '@/lib/wp-client'

// ----- Index/Feed Template Adapter -----

export interface BlogFeedAdapterProps {
  posts: WPPost[]
  categories: WPTerm[]
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
  const cats = post._embedded?.['wp:term']?.[0]
  if (Array.isArray(cats) && cats.length > 0) {
    return cats[0]?.name || 'General'
  }
  return 'General'
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
  const tags = post._embedded?.['wp:term']?.[1]?.map((t) => t.name) || []

  // Get featured image
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]
  const featuredImageUrl = featuredMedia?.source_url || 'https://via.placeholder.com/800x450'
  const featuredImageAlt = featuredMedia?.alt_text || post.title?.rendered || 'Featured image'

  // Parse content into sections (very basic parsing)
  const contentSections: AdaptedBlogSinglePostContent['article']['sections'] = [
    {
      type: 'paragraph',
      content: stripHtml(post.excerpt?.rendered || ''),
    },
  ]

  // If full HTML content exists, add it as a single section with HTML
  if (post.content?.rendered) {
    contentSections.push({
      type: 'paragraph',
      content: post.content.rendered, // Will be sanitized in template via sanitizeHtml()
    })
  }

  const relatedInsights = relatedPosts.slice(0, 3).map((p) => {
    const relatedMedia = p._embedded?.['wp:featuredmedia']?.[0]
    return {
      title: stripHtml(p.title?.rendered || p.slug),
      date: formatDate(p.date),
      image: relatedMedia?.source_url || 'https://via.placeholder.com/150x150',
      href: `/blog/post?slug=${p.slug}`,
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
        { label: primaryCategory, href: '/blog' },
      ],
      title: stripHtml(post.title?.rendered || post.slug),
      author: {
        name: 'GTMStack Team',
        role: 'GTM Consultant',
        image: 'https://via.placeholder.com/64x64',
        bio: 'Our team of GTM experts brings years of experience in revenue engineering and go-to-market strategy.',
        profileLink: '/about',
      },
      publishedDate: formatDate(post.date),
      readingTime: '8 min read',
    },
    article: {
      featuredImage: {
        src: featuredImageUrl,
        alt: featuredImageAlt,
      },
      intro: stripHtml(post.excerpt?.rendered || ''),
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
