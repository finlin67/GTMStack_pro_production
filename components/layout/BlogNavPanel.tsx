"use client"

import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { useEffect, useState } from "react"

type NavPost = {
  slug: string
  title: string
  categoryNames: string[]
  date: string
}

type BlogNavPanelProps = {
  id?: string
  labelledBy?: string
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

export function BlogNavPanel({ id, labelledBy }: BlogNavPanelProps) {
  const [posts, setPosts] = useState<NavPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/nav-posts')
      .then((r) => r.json())
      .then((data: NavPost[]) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div
      id={id}
      className="w-80 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      role="region"
      aria-label={labelledBy ? undefined : "Blog and insights"}
      aria-labelledby={labelledBy}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Recent posts
        </p>
      </div>

      {/* Post list */}
      <div className="p-2">
        {loading && (
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-3 py-2.5 space-y-1.5">
                <div className="h-3 bg-slate-800 rounded animate-pulse w-4/5" />
                <div className="h-2.5 bg-slate-800 rounded animate-pulse w-1/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="px-3 py-4 text-[13px] text-slate-500">
            No posts available right now.
          </div>
        )}

        {!loading && posts.length > 0 && (
          <ul className="space-y-0.5">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/post?slug=${post.slug}`}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group"
                >
                  <FileText className="h-3.5 w-3.5 text-slate-600 mt-0.5 shrink-0 group-hover:text-cyan-400 transition-colors" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-[13px] text-slate-200 leading-snug group-hover:text-white transition-colors line-clamp-2">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {post.categoryNames[0] && (
                        <span className="text-[11px] text-cyan-400/80">
                          {post.categoryNames[0]}
                        </span>
                      )}
                      {post.categoryNames[0] && post.date && (
                        <span className="text-[11px] text-slate-600">·</span>
                      )}
                      {post.date && (
                        <span className="text-[11px] text-slate-500">
                          {formatDate(post.date)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <Link
          href="/blog"
          className="flex items-center justify-between text-[13px] font-medium text-slate-300 hover:text-white transition-colors group"
        >
          All posts
          <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </div>
  )
}
