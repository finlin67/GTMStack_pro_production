export type WPPost = {
    id: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    date: string;
    _embedded?: {
      "wp:featuredmedia"?: Array<{
        source_url?: string;
        alt_text?: string;
      }>;
    };
  };
  
  const BASE =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\r/g, "").trim().replace(/\/+$/, "") ||
    "https://m.gtmstack.pro/wp-json/wp/v2";
  
  export async function fetchPosts(): Promise<WPPost[]> {
    const url = `${BASE}/posts?per_page=10&_embed=1`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    return (await res.json()) as WPPost[];
  }

  export async function fetchLatestPosts(perPage = 6): Promise<WPPost[]> {
    const url = `${BASE}/posts?per_page=${perPage}&_embed=1`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    return (await res.json()) as WPPost[];
  }
  
  export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
    const url = `${BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=1&context=view`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
    const posts = (await res.json()) as WPPost[];
    return posts[0] ?? null;
  }
  