import type { AdaptedInsightPost } from '@/src/types/blog'

type Props = {
  post: AdaptedInsightPost
}

type ArticleSectionLink = {
  id: string
  label: string
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

function slugifyHeading(input: string) {
  return stripHtml(input)
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function buildArticleNavigation(contentHtml: string): {
  htmlWithAnchors: string
  sections: ArticleSectionLink[]
} {
  const usedIds = new Set<string>()
  const sections: ArticleSectionLink[] = []

  const htmlWithAnchors = contentHtml.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (match, attrs: string, innerHtml: string) => {
      if (/\sid=/.test(attrs)) {
        const existingIdMatch = attrs.match(/\sid=["']([^"']+)["']/i)
        const label = stripHtml(innerHtml)
        if (existingIdMatch?.[1] && label) {
          sections.push({ id: existingIdMatch[1], label })
        }
        return match
      }

      const label = stripHtml(innerHtml)
      if (!label) return match

      const baseId = slugifyHeading(label) || 'section'
      let nextId = baseId
      let counter = 2
      while (usedIds.has(nextId)) {
        nextId = `${baseId}-${counter}`
        counter += 1
      }
      usedIds.add(nextId)
      sections.push({ id: nextId, label })

      return `<h2${attrs} id="${nextId}">${innerHtml}</h2>`
    }
  )

  return { htmlWithAnchors, sections }
}

export default function InsightPostTemplate({ post }: Props) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const authorInitials = (post.authorName || 'GTMStack Analyst')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')

  const { htmlWithAnchors, sections } = buildArticleNavigation(post.contentHtml)

  return (
    <article className="bg-[linear-gradient(180deg,#f1f5f9_0%,#f8fafc_22%,#ffffff_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-12">
        <header className="relative overflow-hidden rounded-[2.15rem] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-7 py-10 text-white shadow-[0_34px_90px_rgba(15,23,42,0.16)] md:px-11 md:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.2),transparent_24%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.12),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_38%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="relative mx-auto max-w-[44rem]">
            {post.heroKicker ? (
              <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-100 shadow-sm backdrop-blur-sm">
                {post.heroKicker}
              </div>
            ) : null}

            <h1 className="max-w-[12ch] text-4xl font-semibold tracking-[-0.045em] text-white md:text-[4.25rem] md:leading-[0.98]">
              {post.title}
            </h1>

            {(post.dek || post.excerpt) ? (
              <p className="mt-6 max-w-[40rem] text-lg leading-8 text-slate-200/95 md:text-[1.32rem] md:leading-9">
                {post.dek || post.excerpt}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
              {post.authorName ? (
                <span className="font-medium text-slate-100">By {post.authorName}</span>
              ) : null}
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
              <span>{formattedDate}</span>
              {post.categories.length ? (
                <>
                  <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
                  <span className="rounded-full border border-white/10 bg-white/[0.07] px-2.5 py-1 text-xs font-medium text-blue-100">
                    {post.categories[0]}
                  </span>
                </>
              ) : null}
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-8">
            {post.keyIdeas.length > 0 ? (
              <section className="rounded-[1.6rem] border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-6 shadow-[0_14px_34px_rgba(245,158,11,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-900">Key ideas</h2>
                  <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-700">
                    Insight brief
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {post.keyIdeas.map((item, index) => (
                    <li key={index} className="flex gap-3 text-slate-700">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="rounded-[1.9rem] border border-slate-200/90 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-7">
              {post.featuredImage ? (
                <div className="mb-10 overflow-hidden rounded-[1.5rem] border border-slate-200/90 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-2.5 shadow-[0_18px_38px_rgba(15,23,42,0.08)]">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="aspect-[16/9] w-full rounded-[1.1rem] object-cover"
                  />
                </div>
              ) : null}

              <div className="mx-auto max-w-[44rem]">
                <div
                  className="article-body prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-h2:mt-16 prose-h2:border-t prose-h2:border-slate-200 prose-h2:pt-8 prose-h2:text-[2rem] prose-h2:tracking-[-0.035em] prose-h2:text-slate-950 prose-h2:leading-tight prose-h3:mt-10 prose-h3:text-[1.2rem] prose-h3:tracking-[-0.02em] prose-h3:text-slate-900 prose-p:my-6 prose-p:text-[1.035rem] prose-p:leading-8 prose-p:text-slate-700 prose-strong:font-semibold prose-strong:text-slate-950 prose-a:font-medium prose-a:text-blue-700 prose-a:underline prose-a:decoration-blue-200 prose-a:underline-offset-4 hover:prose-a:text-blue-600 hover:prose-a:decoration-blue-400 prose-ul:my-7 prose-ul:space-y-3 prose-ul:pl-5 prose-ol:my-7 prose-ol:space-y-3 prose-ol:pl-5 prose-li:pl-1 prose-li:leading-8 prose-li:marker:text-slate-400 prose-blockquote:my-10 prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50/60 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:italic prose-hr:my-14 prose-hr:border-slate-200 [&_h2+*]:mt-6 [&_h3+*]:mt-4 [&_ul+h2]:mt-16 [&_ol+h2]:mt-16 [&_p+ul]:mt-4 [&_p+ol]:mt-4 [&>p:first-of-type]:text-[1.22rem] [&>p:first-of-type]:leading-9 [&>p:first-of-type]:text-slate-900 [&>p:first-of-type]:font-medium"
                  dangerouslySetInnerHTML={{ __html: htmlWithAnchors }}
                />
              </div>
            </div>

            {post.featuredQuote ? (
              <blockquote className="rounded-[1.7rem] border border-slate-200/90 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <p className="text-[1.75rem] font-medium leading-9 tracking-[-0.03em] text-slate-900 md:text-[2rem]">
                  &ldquo;{post.featuredQuote}&rdquo;
                </p>
                {post.quoteSource ? (
                  <footer className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                    - {post.quoteSource}
                  </footer>
                ) : null}
              </blockquote>
            ) : null}

            {post.closingThesis ? (
              <section className="relative overflow-hidden rounded-[1.8rem] border border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-7 shadow-[0_18px_44px_rgba(79,70,229,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_30%)]" />
                <div className="relative">
                  <div className="inline-flex rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                    Closing thesis
                  </div>
                  <p className="mt-5 max-w-[42rem] text-[1.2rem] font-medium leading-9 tracking-[-0.025em] text-slate-900 md:text-[1.4rem]">
                    {post.closingThesis}
                  </p>
                </div>
              </section>
            ) : null}

            {(post.ctaHeadline || post.ctaBody) ? (
              <section className="relative overflow-hidden rounded-[2rem] border border-slate-800/90 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-8 py-10 text-white shadow-[0_28px_80px_rgba(15,23,42,0.2)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.24),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.12),transparent_30%)]" />
                <div className="relative max-w-2xl">
                  <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                    Next step
                  </div>
                  {post.ctaHeadline ? (
                    <h2 className="max-w-[14ch] text-3xl font-semibold tracking-[-0.035em] md:text-[2.3rem] md:leading-tight">
                      {post.ctaHeadline}
                    </h2>
                  ) : null}

                  {post.ctaBody ? (
                    <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
                      {post.ctaBody}
                    </p>
                  ) : null}

                  {post.ctaButtonLabel && post.ctaButtonUrl ? (
                    <a
                      href={post.ctaButtonUrl}
                      className="mt-7 inline-flex items-center rounded-xl border border-blue-400/30 bg-blue-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-950/25 transition hover:bg-blue-400"
                    >
                      {post.ctaButtonLabel}
                    </a>
                  ) : null}
                </div>
              </section>
            ) : null}

            {post.authorNote ? (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-sm">
                <strong className="text-slate-900">Author note:</strong>{' '}
                {post.authorNote}
              </section>
            ) : null}
          </div>

          <aside>
            <div className="sticky top-24 space-y-5">
              <section className="rounded-[1.6rem] border border-slate-200/90 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[0.95rem] font-semibold tracking-[-0.02em] text-slate-900">
                    In this insight
                  </h2>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                    {sections.length || post.keyIdeas.length || 0} items
                  </span>
                </div>
                <ul className="mt-5 space-y-3.5 text-sm leading-6 text-slate-600">
                  {sections.length ? (
                    sections.map((section) => (
                      <li key={section.id} className="flex gap-3">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <a
                          href={`#${section.id}`}
                          className="font-medium text-slate-700 transition hover:text-blue-700"
                        >
                          {section.label}
                        </a>
                      </li>
                    ))
                  ) : post.keyIdeas.length ? (
                    post.keyIdeas.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500">No key ideas added yet.</li>
                  )}
                </ul>
              </section>

              {post.keyIdeas.length > 0 ? (
                <section className="rounded-[1.6rem] border border-amber-200/70 bg-gradient-to-br from-amber-50 to-white p-6 shadow-[0_12px_36px_rgba(245,158,11,0.08)]">
                  <h2 className="text-[0.95rem] font-semibold tracking-[-0.02em] text-slate-900">
                    Key ideas
                  </h2>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                    {post.keyIdeas.map((idea, index) => (
                      <li key={`${idea}-${index}`} className="flex gap-3">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span>{idea}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {post.relatedArticles.length > 0 ? (
                <section className="rounded-[1.6rem] border border-slate-200/90 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
                  <h2 className="text-[0.95rem] font-semibold tracking-[-0.02em] text-slate-900">
                    Related articles
                  </h2>
                  <ul className="mt-5 divide-y divide-slate-100">
                    {post.relatedArticles.map((article, index) => (
                      <li key={`${article.url}-${index}`} className="py-3 first:pt-0 last:pb-0">
                        <a href={article.url} className="group block">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Related read
                          </span>
                          <div className="mt-1 text-sm font-medium leading-6 text-slate-700 transition group-hover:text-blue-700">
                            {article.title}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {post.semanticTerms.length > 0 ? (
                <section className="rounded-[1.6rem] border border-slate-200/90 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
                  <h2 className="text-[0.95rem] font-semibold tracking-[-0.02em] text-slate-900">
                    Semantic index
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {post.semanticTerms.map((term, index) => (
                      <span
                        key={`${term}-${index}`}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {post.sidebarPromo ? (
                <section className="relative overflow-hidden rounded-[1.8rem] border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.1),transparent_30%)]" />
                  <div className="relative">
                    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                      Recommended
                    </div>
                    <h2 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">
                      {post.sidebarPromo.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {post.sidebarPromo.body}
                    </p>
                    <a
                      href={post.sidebarPromo.buttonUrl}
                      className="mt-5 inline-flex items-center rounded-xl border border-blue-400/30 bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/25 transition hover:bg-blue-400"
                    >
                      {post.sidebarPromo.buttonLabel}
                    </a>
                  </div>
                </section>
              ) : null}

              <section className="rounded-[1.6rem] border border-slate-200/90 bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
                <h2 className="text-[0.95rem] font-semibold tracking-[-0.02em] text-slate-900">
                  Expert author
                </h2>
                <div className="mt-5 flex items-start gap-4">
                  {post.authorAvatarUrl ? (
                    <img
                      src={post.authorAvatarUrl}
                      alt={post.authorName || 'Author avatar'}
                      className="h-14 w-14 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white ring-1 ring-slate-200">
                      {authorInitials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {post.authorName || 'GTMStack Analyst'}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Thought leadership on GTM systems, market signal interpretation, and strategic operating models.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
