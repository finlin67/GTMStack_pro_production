import type { Metadata } from "next";
import { Suspense } from "react";
import BlogPostClient from "./BlogPostClient";

export const metadata: Metadata = {
  title: 'Blog Post',
  description:
    'Practitioner-level GTM writing from GTMStack.pro — demand generation, revenue operations, ABM, and B2B marketing systems.',
  robots: { index: false, follow: true },
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-3xl px-6 py-12">Loading…</main>}>
      <BlogPostClient />
    </Suspense>
  );
}
