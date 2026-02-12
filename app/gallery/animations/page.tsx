"use client";

import { useMemo, useState } from "react";
import { getGalleryAnimations } from "@/src/data/animationGallery";

export default function AnimationsGalleryPage() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => getGalleryAnimations(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((it) => {
      const haystack = [
        it.title,
        it.route ?? "",
        ...(it.tags ?? []),
        it.marketingFunction ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [items, query]);

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Animation Gallery</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Browse animations (metadata + thumbnails only). Click-to-preview comes next.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <input
            className="w-full max-w-md rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900/20"
            placeholder="Search title, tags, route..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="text-sm text-neutral-500">{filtered.length} results</div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((it) => (
            <div
              key={it.id}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
            >
              <div className="aspect-square bg-neutral-50">
                <img
                  src={it.thumbnailSrc ?? "/animation-thumbs/placeholder.png"}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/animation-thumbs/placeholder.png";
                  }}
                  alt={it.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-3">
                <div className="text-sm font-medium">{it.title}</div>
                {it.route ? (
                  <div className="mt-1 text-xs text-neutral-500">{it.route}</div>
                ) : null}

                {it.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {it.tags.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                    {it.tags.length > 6 ? (
                      <span className="text-[11px] text-neutral-500">
                        +{it.tags.length - 6}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-2 text-xs text-neutral-400">No tags yet</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
