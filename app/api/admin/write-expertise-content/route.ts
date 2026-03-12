// app/api/admin/write-expertise-content/route.ts
// Writes validated expertise page content to content/expertise/<slug>.ts (local only).

import { NextRequest, NextResponse } from "next/server";
import { assertLocalOnly } from "@/src/lib/localOnly";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function POST(req: NextRequest) {
  try {
    assertLocalOnly();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Local-only route disabled";
    return NextResponse.json({ error: message }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  const content = typeof body.content === "string" ? body.content : "";

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  if (!SLUG_REGEX.test(slug)) {
    return NextResponse.json(
      { error: "Slug must be lowercase letters, numbers, and hyphens only" },
      { status: 400 }
    );
  }
  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  const relativePath = `content/expertise/${slug}.ts`;
  const fullPath = path.join(process.cwd(), relativePath);

  try {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content, "utf-8");
    return NextResponse.json({ ok: true, path: relativePath, slug });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Write failed", detail: message },
      { status: 500 }
    );
  }
}
