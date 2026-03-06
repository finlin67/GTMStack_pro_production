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

function safeJsonParse(input: string): { ok: true; value: unknown } | { ok: false; error: string } {
  try {
    const value = JSON.parse(input);
    return { ok: true, value };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    return { ok: false, error: message };
  }
}

type SchemaIssue = { path: string; message: string };

type ContentMode = "IndustryItem" | "ExpertiseItem" | "CaseStudyItem";

export default function ContentValidatorPage() {
  const [mode, setMode] = useState<ContentMode>("IndustryItem");
  const [raw, setRaw] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ type: 'success' | 'error', message: string, action?: string } | null>(null);
  const [upsertEnabled, setUpsertEnabled] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const result = useMemo(() => {
    if (!raw.trim()) return { status: "EMPTY" as const };

    const parsed = safeJsonParse(raw);
    if (!parsed.ok) return { status: "JSON_ERROR" as const, error: parsed.error };

    if (mode === "IndustryItem") {
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
    } else if (mode === "ExpertiseItem") {
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
    } else {
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
    }
  }, [raw, mode]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const publish = async () => {
    if (result.status !== "OK") return;
    
    setIsPublishing(true);
    setPublishStatus(null);
    
    let endpoint = "";
    if (mode === "IndustryItem") endpoint = "/api/admin/publish-industry";
    else if (mode === "ExpertiseItem") endpoint = "/api/admin/publish-expertise";
    else if (mode === "CaseStudyItem") endpoint = "/api/admin/publish-case-study";

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
    if (mode === "IndustryItem") return `/industries/${slug}`;
    if (mode === "ExpertiseItem") return `/expertise/${slug}`;
    if (mode === "CaseStudyItem") return `/case-studies/${slug}`;
    return "";
  };

  const getContentKey = (slug: string) => {
    if (mode === "IndustryItem") return `industries:${slug}`;
    if (mode === "ExpertiseItem") return `expertise:${slug}`;
    if (mode === "CaseStudyItem") return `case-studies:${slug}`;
    return "";
  };

  const getCopySnippet = () => {
    if (result.status !== "OK") return "";
    const data = result.data as any;
    const slug = data.slug;
    const title = data.title || "";

    let route = "";
    let templateId = "";
    let contentKey = "";
    let fileRef = "";

    if (mode === "IndustryItem") {
      route = `/industries/${slug}`;
      templateId = "industry.base"; // TODO: confirm if industry.base is the standard for new industries
      contentKey = `industries:${slug}`;
      fileRef = "content/industries.ts";
    } else if (mode === "ExpertiseItem") {
      route = `/expertise/${slug}`;
      templateId = "expertise.topic"; // TODO: confirm if expertise.topic or expertise.category is preferred
      contentKey = `expertise:${slug}`;
      fileRef = "content/expertise.ts";
    } else if (mode === "CaseStudyItem") {
      route = `/case-studies/${slug}`;
      templateId = "caseStudy.base"; // TODO: confirm if caseStudy.base is the standard for new case studies
      contentKey = `case-studies:${slug}`;
      fileRef = "content/case-studies.ts";
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

  return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Content Validator</h1>
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
              <button 
                onClick={() => setMode("IndustryItem")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${mode === "IndustryItem" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Industry
              </button>
              <button 
                onClick={() => setMode("ExpertiseItem")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${mode === "ExpertiseItem" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Expertise
              </button>
              <button 
                onClick={() => setMode("CaseStudyItem")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${mode === "CaseStudyItem" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                Case Study
              </button>
            </div>
          </div>

          <p className="text-slate-300 text-sm">
            Validating <span className="font-bold text-blue-400">{mode}</span>. Paste LLM output here. This tool will reject extra keys, missing keys, and wrong types.
          </p>

          <textarea
              className="w-full h-[320px] rounded-lg bg-slate-900 border border-slate-700 p-3 font-mono text-sm"
              placeholder='Paste JSON here (must be valid JSON, not TS). Example: { "slug": "...", ... }'
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
          />

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            {result.status === "EMPTY" && <div className="text-slate-400">Paste JSON to validate.</div>}

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
                  <div className="text-green-300 font-semibold">Valid {mode} ✅</div>

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
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">slug</div>
                        <div className="font-mono text-blue-300">{(result.data as any).slug}</div>
                      </div>
                      <button
                        onClick={() => copy((result.data as any).slug)}
                        className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title="Copy Slug"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">suggested route</div>
                        <div className="font-mono text-emerald-300">{getRoute((result.data as any).slug)}</div>
                      </div>
                      <button
                        onClick={() => copy(getRoute((result.data as any).slug))}
                        className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[10px] font-bold uppercase transition-colors"
                      >
                        Copy Route
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">content key (for CMS)</div>
                        <div className="font-mono text-amber-300">{getContentKey((result.data as any).slug)}</div>
                      </div>
                      <button
                        onClick={() => copy(getContentKey((result.data as any).slug))}
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
                      Copy suggested Page Index CMS values
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center bg-slate-800/30 p-4 rounded-lg border border-slate-700">
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

                    <div className="flex gap-2 ml-auto">
                      <button
                          className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 text-sm font-semibold transition-colors"
                          onClick={() => copy(JSON.stringify(result.data, null, 2))}
                      >
                        Copy JSON
                      </button>
                      
                      <button
                        className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
                          isPublishing || (upsertEnabled && !isConfirmed)
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                        }`}
                        onClick={publish}
                        disabled={isPublishing || (upsertEnabled && !isConfirmed)}
                      >
                        {isPublishing ? "Publishing..." : `Publish to ${mode.replace('Item', '')}`}
                      </button>
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