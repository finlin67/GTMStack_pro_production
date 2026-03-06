import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import Link from 'next/link'

const postsDir = path.join(process.cwd(), 'content', 'blog', 'posts')

export async function generateStaticParams() {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'))
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, '') }))
}

export const dynamicParams = true

async function getPost(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { frontmatter: data, content }
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const { frontmatter, content } = post
  return (
    <div className="min-h-screen bg-[#0A0F2D] text-slate-100">
      <nav className="border-b border-slate-800 px-6 py-4">
        <Link href="/blog" className="text-[#36C0CF] hover:underline">
          ← Blog
        </Link>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          {frontmatter.title as string}
        </h1>
        <div className="text-sm text-slate-400 mb-8">
          {frontmatter.date as string}
          {frontmatter.author ? ` · ${frontmatter.author}` : ''}
        </div>
        <div className="prose prose-invert prose-slate max-w-none [&_a]:text-[#36C0CF] [&_a]:underline">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  )
}
