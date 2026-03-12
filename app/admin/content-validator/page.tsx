// app/admin/content-validator/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  IndustryItemSchema,
  getIndustryItemWarnings,
  type IndustryItemInput,
} from "@/src/lib/content-schemas/IndustryItem";
import {
  ExpertiseItemSchema,
  getExpertiseItemWarnings,
  type ExpertiseItemInput,
} from "@/src/lib/content-schemas/ExpertiseItem";
import {
  CaseStudyItemSchema,
  getCaseStudyItemWarnings,
  type CaseStudyItemInput,
} from "@/src/lib/content-schemas/CaseStudyItem";
import {
  ExpertisePageContentSchema,
  getExpertisePageContentWarnings,
  type ExpertisePageContentInput,
} from "@/src/lib/content-schemas/ExpertisePageContent";
import { PAGE_REGISTRY } from "@/src/data/pageRegistry.generated";

/** Expertise topic pages from registry (route + slug + pageTitle for dropdown). */
const EXPERTISE_REGISTRY_PAGES = PAGE_REGISTRY.filter(
  (row) => row.route.startsWith("/expertise/") && row.route !== "/expertise"
).map((row) => ({
  route: row.route,
  slug: row.route.replace(/^\/expertise\//, ""),
  pageTitle: row.pageTitle,
  contentKey: row.contentKey,
}));

function safeJsonParse(input: string): { ok: true; value: unknown } | { ok: false; error: string } {
  try {
    const value = JSON.parse(input);
    return { ok: true, value };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    return { ok: false, error: message };
  }
}

/** Convert TS object literal keys (unquoted) to JSON (quoted). Runs only on likely key positions. */
function quoteUnquotedKeys(s: string): string {
  // Match { or , then optional whitespace, then an identifier (key), then optional whitespace and :
  return s.replace(/([\{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*):/g, '$1"$2"$3:');
}

/** Try JSON first; if it fails, strip TS export wrapper, quote unquoted keys, remove trailing commas, then parse. */
function parseJsonOrTsSnippet(input: string): { ok: true; value: unknown } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "Empty input" };

  const jsonResult = safeJsonParse(trimmed);
  if (jsonResult.ok) return jsonResult;

  // Strip export const VAR_NAME = ... ; so we can parse the object as JSON
  let stripped = trimmed
    .replace(/^\s*export\s+const\s+\w+\s*=\s*/i, "")
    .replace(/;\s*$/, "")
    .trim();
  // Remove trailing commas before } or ] (TS allows them, JSON does not)
  stripped = stripped.replace(/,(\s*[}\]])/g, "$1");
  // Convert unquoted keys to quoted (TS allows title:, JSON requires "title":)
  stripped = quoteUnquotedKeys(stripped);

  try {
    const value = JSON.parse(stripped);
    return { ok: true, value };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid JSON after stripping TS export";
    return { ok: false, error: message };
  }
}

type SchemaIssue = { path: string; message: string };

type ContentType = "Industry" | "CaseStudy" | "Expertise";
type Format = "JSON" | "TS";

/** Effective validation mode: which schema to use. */
type EffectiveMode = "IndustryItem" | "ExpertiseItem" | "CaseStudyItem" | "ExpertisePageContent";

function getEffectiveMode(contentType: ContentType, format: Format): EffectiveMode {
  if (contentType === "Industry") return "IndustryItem";
  if (contentType === "CaseStudy") return "CaseStudyItem";
  if (contentType === "Expertise" && format === "TS") return "ExpertisePageContent";
  return "ExpertiseItem"; // Expertise + JSON
}

export default function ContentValidatorPage() {
  const [contentType, setContentType] = useState<ContentType>("Expertise");
  const [format, setFormat] = useState<Format>("TS");
  const [raw, setRaw] = useState<string>("");
  const [expertisePageSlug, setExpertisePageSlug] = useState<string>("");
  const [registryPageKey, setRegistryPageKey] = useState<string>(""); // route as key for dropdown
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error', message: string, action?: string } | null>(null);
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [upsertEnabled, setUpsertEnabled] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const effectiveMode = getEffectiveMode(contentType, format);
  const isExpertisePageContent = effectiveMode === "ExpertisePageContent";

  const result = useMemo(() => {
    if (!raw.trim()) return { status: "EMPTY" as const };

    const parseInput = format === "TS" ? parseJsonOrTsSnippet : safeJsonParse;
    const parsed = parseInput(raw);
    if (!parsed.ok) return { status: "JSON_ERROR" as const, error: parsed.error };

    if (effectiveMode === "IndustryItem") {
      const validated = IndustryItemSchema.safeParse(parsed.value);
      if (!validated.success) {
        const issues: SchemaIssue[] = validated.error.issues.map((issue): SchemaIssue => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return { status: "SCHEMA_ERROR" as const, issues };
      }
      const data: IndustryItemInput = validated.data;
      const warnings: string[] = getIndustryItemWarnings(data);
      return { status: "OK" as const, data, warnings };
    } else if (effectiveMode === "ExpertiseItem") {
      const validated = ExpertiseItemSchema.safeParse(parsed.value);
      if (!validated.success) {
        const issues: SchemaIssue[] = validated.error.issues.map((issue): SchemaIssue => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return { status: "SCHEMA_ERROR" as const, issues };
      }
      const data: ExpertiseItemInput = validated.data;
      const warnings: string[] = getExpertiseItemWarnings(data);
      return { status: "OK" as const, data, warnings };
    } else if (effectiveMode === "CaseStudyItem") {
      const validated = CaseStudyItemSchema.safeParse(parsed.value);
      if (!validated.success) {
        const issues: SchemaIssue[] = validated.error.issues.map((issue): SchemaIssue => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return { status: "SCHEMA_ERROR" as const, issues };
      }
      const data: CaseStudyItemInput = validated.data;
      const warnings: string[] = getCaseStudyItemWarnings(data);
      return { status: "OK" as const, data, warnings };
    } else {
      const validated = ExpertisePageContentSchema.safeParse(parsed.value);
      if (!validated.success) {
        const issues: SchemaIssue[] = validated.error.issues.map((issue): SchemaIssue => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return { status: "SCHEMA_ERROR" as const, issues };
      }
      const data: ExpertisePageContentInput = validated.data;
      const warnings: string[] = getExpertisePageContentWarnings(data);
      return { status: "OK" as const, data, warnings };
    }
  }, [raw, effectiveMode, format]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const publish = async () => {
    if (result.status !== "OK" || effectiveMode === "ExpertisePageContent") return;
    
    setIsPublishing(true);
    setPublishStatus(null);
    
    let endpoint = "";
    if (effectiveMode === "IndustryItem") endpoint = "/api/admin/publish-industry";
    else if (effectiveMode === "ExpertiseItem") endpoint = "/api/admin/publish-expertise";
    else if (effectiveMode === "CaseStudyItem") endpoint = "/api/admin/publish-case-study";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          item: result.data,
          mode: upsertEnabled && isConfirmed ? "upsert" : "append"
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        const actionLabel = data.action === 'updated' ? 'Updated' : 'Published';
        setPublishStatus({ 
          type: 'success', 
          message: `${actionLabel} ${data.slug} successfully!`,
          action: data.action
        });
      } else {
        setPublishStatus({ type: 'error', message: data.error || "Failed to publish" });
      }
    } catch (err) {
      setPublishStatus({ type: 'error', message: "Network error" });
    } finally {
      setIsPublishing(false);
    }
  };

  const getRoute = (slug: string) => {
    if (effectiveMode === "IndustryItem") return `/industries/${slug}`;
    if (effectiveMode === "ExpertiseItem" || effectiveMode === "ExpertisePageContent") return `/expertise/${slug}`;
    if (effectiveMode === "CaseStudyItem") return `/case-studies/${slug}`;
    return "";
  };

  const getContentKey = (slug: string) => {
    if (effectiveMode === "IndustryItem") return `industries:${slug}`;
    if (effectiveMode === "ExpertiseItem" || effectiveMode === "ExpertisePageContent") return `expertise:${slug}`;
    if (effectiveMode === "CaseStudyItem") return `case-studies:${slug}`;
    return "";
  };

  /** Constant name from slug, e.g. account-based-marketing -> ACCOUNT_BASED_MARKETING_CONTENT */
  const slugToConstantName = (slug: string) =>
    slug
      .trim()
      .split("-")
      .map((s) => s.toUpperCase())
      .join("_") + "_CONTENT";

  const getCopySnippet = () => {
    if (result.status !== "OK") return "";
    const data = result.data as Record<string, unknown>;
    const slug = (effectiveMode === "ExpertisePageContent" ? expertisePageSlug : (data.slug as string)) || "";
    const title = (data.title as string) || "";

    let route = "";
    let templateId = "";
    let contentKey = "";
    let fileRef = "";

    if (effectiveMode === "IndustryItem") {
      route = `/industries/${slug}`;
      templateId = "industry.base";
      contentKey = `industries:${slug}`;
      fileRef = "content/industries.ts";
    } else if (effectiveMode === "ExpertiseItem") {
      route = `/expertise/${slug}`;
      templateId = "expertise.topic";
      contentKey = `expertise:${slug}`;
      fileRef = "content/expertise.ts";
    } else if (effectiveMode === "CaseStudyItem") {
      route = `/case-studies/${slug}`;
      templateId = "caseStudy.base";
      contentKey = `case-studies:${slug}`;
      fileRef = "content/case-studies.ts";
    } else if (effectiveMode === "ExpertisePageContent") {
      route = `/expertise/${slug}`;
      contentKey = `expertise:${slug}`;
      fileRef = `content/expertise/${slug}.ts`;
      return [
        `Route: ${route}`,
        `Content Key: ${contentKey}`,
        `Content File: ${fileRef}`,
        "",
        "Next steps: Copy as .ts and save to content/expertise/<slug>.ts; ensure registry and index import this export."
      ].join("\n");
    }

    return [
      `Route: ${route}`,
      `Page Title: ${title}`,
      `Template ID: ${templateId}`,
      `Content Key: ${contentKey}`,
      `Content File (Ref): ${fileRef}`,
      "",
      "Next steps: Paste these into Page Index CMS → Add to Registry"
    ].join("\n");
  };

  const getExpertisePageTsSnippet = (): string => {
    if (result.status !== "OK" || effectiveMode !== "ExpertisePageContent" || !expertisePageSlug.trim()) return "";
    const constName = slugToConstantName(expertisePageSlug.trim());
    return `export const ${constName} = ${JSON.stringify(result.data, null, 2)};\n`;
  };

  const pushToFile = async () => {
    if (result.status !== "OK" || effectiveMode !== "ExpertisePageContent" || !expertisePageSlug.trim()) return;
    const slug = expertisePageSlug.trim();
    const content = getExpertisePageTsSnippet();
    if (!content) return;
    setIsPushing(true);
    setPushStatus(null);
    try {
      const res = await fetch("/api/admin/write-expertise-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content }),
      });
      const data = await res.json();
      if (res.ok) {
        setPushStatus({ type: "success", message: `Wrote content/expertise/${slug}.ts` });
      } else {
        setPushStatus({ type: "error", message: data.error || "Push failed" });
      }
    } catch {
      setPushStatus({ type: "error", message: "Network error" });
    } finally {
      setIsPushing(false);
    }
  };

  return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap gap-6 items-center">
            <h1 className="text-2xl font-bold">Content Validator</h1>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm font-medium">Content type</span>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                {(["Industry", "Case Study", "Expertise"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type === "Case Study" ? "CaseStudy" : type)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      (type === "Case Study" ? contentType === "CaseStudy" : contentType === type) ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-sm font-medium">Format</span>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setFormat("JSON")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${format === "JSON" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  JSON
                </button>
                <button
                  onClick={() => setFormat("TS")}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${format === "TS" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  TS
                </button>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-sm">
            Validating <span className="font-bold text-blue-400">{contentType}</span> as <span className="font-bold text-blue-400">{format}</span>.{" "}
            {isExpertisePageContent
              ? "Paste full expertise page content as JSON or a .ts snippet (e.g. export const X_CONTENT = { ... };)."
              : "Paste content here. This tool will reject extra keys, missing keys, and wrong types."}
          </p>

          {format === "TS" && contentType === "Expertise" && (
            <div className="space-y-2">
              <label className="text-sm text-slate-400 font-medium block">Page in registry (optional — pick to pre-fill slug or add new)</label>
              <div className="flex flex-wrap gap-3 items-center">
                <select
                  className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-200 min-w-[220px]"
                  value={registryPageKey}
                  onChange={(e) => {
                    const route = e.target.value;
                    setRegistryPageKey(route);
                    if (route) {
                      const page = EXPERTISE_REGISTRY_PAGES.find((p) => p.route === route);
                      if (page) setExpertisePageSlug(page.slug);
                    }
                  }}
                >
                  <option value="">— Select a page or type slug below —</option>
                  {EXPERTISE_REGISTRY_PAGES.map((page) => (
                    <option key={page.route} value={page.route}>
                      {page.pageTitle} ({page.slug})
                    </option>
                  ))}
                </select>
                <span className="text-slate-500 text-sm">or</span>
                <input
                  type="text"
                  className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 font-mono text-sm placeholder:text-slate-500 min-w-[200px]"
                  placeholder="Topic slug (e.g. demand-growth)"
                  value={expertisePageSlug}
                  onChange={(e) => {
                    setExpertisePageSlug(e.target.value);
                    if (!e.target.value) setRegistryPageKey("");
                  }}
                />
              </div>
            </div>
          )}

          <textarea
              className="w-full h-[320px] rounded-lg bg-slate-900 border border-slate-700 p-3 font-mono text-sm"
              placeholder={format === "TS" ? 'Paste .ts (e.g. export const X_CONTENT = { brand: { ... }, hero: { ... }, ... };)' : 'Paste JSON. Example: { "slug": "...", "title": "...", ... }'}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
          />

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            {result.status === "EMPTY" && <div className="text-slate-400">Paste {format === "TS" ? "TS or JSON" : "JSON"} to validate.</div>}

            {result.status === "JSON_ERROR" && (
                <div className="text-red-300">
                  <div className="font-semibold">Invalid JSON</div>
                  <div className="text-sm">{result.error}</div>
                </div>
            )}

            {result.status === "SCHEMA_ERROR" && (
                <div className="text-red-300">
                  <div className="font-semibold">Schema errors</div>
                  <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
                    {result.issues.map((issue, idx: number) => (
                        <li key={idx}>
                          <span className="font-mono text-slate-200">{issue.path || "(root)"}</span>:{" "}
                          <span>{issue.message}</span>
                        </li>
                    ))}
                  </ul>
                </div>
            )}

            {result.status === "OK" && (
                <div className="space-y-3">
                  <div className="text-green-300 font-semibold">Valid {isExpertisePageContent ? "Expertise page content" : effectiveMode.replace("Item", " item")} ✅</div>

                  {result.warnings.length > 0 && (
                      <div className="text-amber-200">
                        <div className="font-semibold">Warnings</div>
                        <ul className="mt-1 list-disc pl-5 text-sm space-y-1">
                          {result.warnings.map((w: string, idx: number) => (
                              <li key={idx}>{w}</li>
                          ))}
                        </ul>
                      </div>
                  )}

                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{isExpertisePageContent ? "topic slug" : "slug"}</div>
                        <div className="font-mono text-blue-300">{isExpertisePageContent ? (expertisePageSlug || "(enter above)") : (result.data as Record<string, unknown>).slug as string}</div>
                      </div>
                      {!isExpertisePageContent && (
                        <button
                          onClick={() => copy((result.data as Record<string, unknown>).slug as string)}
                          className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Copy Slug"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">suggested route</div>
                        <div className="font-mono text-emerald-300">{getRoute(isExpertisePageContent ? expertisePageSlug : (result.data as Record<string, unknown>).slug as string)}</div>
                      </div>
                      <button
                        onClick={() => copy(getRoute(isExpertisePageContent ? expertisePageSlug : (result.data as Record<string, unknown>).slug as string))}
                        className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[10px] font-bold uppercase transition-colors"
                      >
                        Copy Route
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">content key (for CMS)</div>
                        <div className="font-mono text-amber-300">{getContentKey(isExpertisePageContent ? expertisePageSlug : (result.data as Record<string, unknown>).slug as string)}</div>
                      </div>
                      <button
                        onClick={() => copy(getContentKey(isExpertisePageContent ? expertisePageSlug : (result.data as Record<string, unknown>).slug as string))}
                        className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[10px] font-bold uppercase transition-colors"
                      >
                        Copy Key
                      </button>
                    </div>

                    <button
                      onClick={() => copy(getCopySnippet())}
                      className="w-full mt-2 py-2 px-3 rounded bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                      {isExpertisePageContent ? "Copy suggested route / content key / file path" : "Copy suggested Page Index CMS values"}
                    </button>

                    {isExpertisePageContent && expertisePageSlug.trim() && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          onClick={pushToFile}
                          disabled={isPushing}
                          className="flex-1 min-w-[140px] py-2 px-3 rounded bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-400 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                        >
                          {isPushing ? "Pushing…" : "Push to file"}
                        </button>
                        <button
                          onClick={() => copy(getExpertisePageTsSnippet())}
                          className="flex-1 min-w-[140px] py-2 px-3 rounded bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                          Copy as .ts
                        </button>
                      </div>
                    )}
                    {pushStatus && (
                      <div className={`mt-2 p-3 rounded-lg text-sm ${pushStatus.type === "success" ? "bg-green-900/30 text-green-200 border border-green-800/50" : "bg-red-900/30 text-red-200 border border-red-800/50"}`}>
                        {pushStatus.type === "success" ? "✅" : "❌"} {pushStatus.message}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 items-center bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                    {!isExpertisePageContent && (
                      <div className="space-y-2 min-w-[200px]">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={upsertEnabled}
                            onChange={(e) => {
                              setUpsertEnabled(e.target.checked);
                              if (!e.target.checked) setIsConfirmed(false);
                            }}
                            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                            Overwrite existing item if slug exists (Upsert)
                          </span>
                        </label>

                        {upsertEnabled && (
                          <label className="flex items-center gap-2 cursor-pointer group animate-in fade-in slide-in-from-left-2">
                            <input
                              type="checkbox"
                              checked={isConfirmed}
                              onChange={(e) => setIsConfirmed(e.target.checked)}
                              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="text-sm font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
                              I understand this will replace existing content.
                            </span>
                          </label>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 ml-auto">
                      <button
                          className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-sm font-semibold transition-colors"
                          onClick={() => copy(JSON.stringify(result.data, null, 2))}
                      >
                        Copy JSON
                      </button>
                      
                      {!isExpertisePageContent && (
                        <button
                          className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
                            isPublishing || (upsertEnabled && !isConfirmed)
                              ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                          }`}
                          onClick={publish}
                          disabled={isPublishing || (upsertEnabled && !isConfirmed)}
                        >
                          {isPublishing ? "Publishing..." : `Publish to ${effectiveMode.replace("Item", "")}`}
                        </button>
                      )}
                    </div>
                  </div>

                  {publishStatus && (
                    <div className={`p-4 rounded-lg text-sm flex flex-col gap-2 ${
                      publishStatus.type === 'success' 
                        ? 'bg-green-900/30 text-green-200 border border-green-800/50' 
                        : 'bg-red-900/30 text-red-200 border border-red-800/50'
                    }`}>
                      <div className="flex items-center gap-2">
                        {publishStatus.type === 'success' ? '✅' : '❌'}
                        {publishStatus.message}
                      </div>
                      {publishStatus.action === 'updated' && (
                        <div className="text-amber-300 font-medium text-xs bg-amber-900/30 p-2 rounded border border-amber-800/50">
                          ⚠️ Existing content for this slug was overwritten.
                        </div>
                      )}
                    </div>
                  )}

                  <pre className="text-xs bg-slate-950 border border-slate-800 rounded p-3 overflow-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
                </div>
            )}
          </div>

          <div className="text-xs text-slate-400 space-y-2">
            <div className="p-2 border border-slate-800 bg-slate-900 rounded">
              <span className="text-amber-400 font-semibold">Note:</span> 1-click publishing requires <span className="font-mono">LOCAL_ADMIN=1</span> in <span className="font-mono">.env.local</span> and is disabled in production.
            </div>
          </div>
        </div>
      </div>
  );
}