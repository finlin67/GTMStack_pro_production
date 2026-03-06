'use client'

import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

type BlogFormProps = {
  onSuccess: (slug: string) => void
}

export default function BlogForm({ onSuccess }: BlogFormProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [author, setAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setTitle(v)
    if (!slug || slug === slugify(title)) setSlug(slugify(v))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!window.confirm('Create this blog post as an MDX file?')) return
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug: slug || slugify(title), content, date, author }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || data.detail || 'Request failed')
        return
      }
      onSuccess(data.slug)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-bold text-white">New blog post (MDX)</h2>
      <p className="text-slate-400 text-sm">
        Creates <code className="text-slate-300">content/blog/posts/[slug].mdx</code>. View at /blog/[slug].
      </p>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
          placeholder="Post title"
          className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Auto-generated from title"
          className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white font-mono placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Content (Markdown)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          placeholder="Write in Markdown..."
          className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none font-mono text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Optional"
            className="w-full px-3 py-2 rounded-lg bg-[#1E2A5E] border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-[#36C0CF] outline-none"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 rounded-lg bg-[#36C0CF] hover:bg-[#00A8A8] text-white font-semibold disabled:opacity-50 flex items-center gap-2 transition-colors"
      >
        {submitting && <Loader2 size={18} className="animate-spin" />}
        {submitting ? 'Creating…' : 'Create post'}
      </button>
    </form>
  )
}
