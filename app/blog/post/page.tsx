import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const metadata: Metadata = {
  title: 'Blog Post',
  description:
    'Practitioner-level GTM writing from GTMStack.pro — demand generation, revenue operations, ABM, and B2B marketing systems.',
  robots: { index: false, follow: true },
}

export default async function BlogPostPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>
}) {
  const { slug } = await searchParams
  if (slug?.trim()) {
    redirect(`/blog/${encodeURIComponent(slug.trim())}`)
  }

  return (
    <Suspense fallback={<main className="mx-auto max-w-3xl px-6 py-12">Loading…</main>}>
      <BlogPostClient />
    </Suspense>
  );
}
