import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { cookies } from 'next/headers'
import { isAdminAuthorized, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'

const IS_STATIC_EXPORT = process.env.STATIC_EXPORT === '1'
export const dynamic = 'force-dynamic'
export async function POST(request: NextRequest) {
  if (IS_STATIC_EXPORT) {
    return NextResponse.json({ error: 'Not available in static export' }, { status: 404 })
  }
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!isAdminAuthorized(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const slug = typeof body.slug === 'string' ? body.slug.trim().replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-') : ''
  const content = typeof body.content === 'string' ? body.content : ''
  const date = typeof body.date === 'string' ? body.date.trim() : new Date().toISOString().slice(0, 10)
  const author = typeof body.author === 'string' ? body.author.trim() : ''

  if (!title || !slug) {
    return NextResponse.json({ error: 'Title and slug required' }, { status: 400 })
  }

  const root = process.cwd()
  const dir = path.join(root, 'content', 'blog', 'posts')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const filePath = path.join(dir, `${slug}.mdx`)
  const frontmatter = `---
title: ${JSON.stringify(title)}
date: ${date}
author: ${JSON.stringify(author)}
---

${content}
`
  try {
    fs.writeFileSync(filePath, frontmatter, 'utf-8')
    return NextResponse.json({ ok: true, slug, path: `content/blog/posts/${slug}.mdx` })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: 'Write failed', detail: message }, { status: 500 })
  }
}

