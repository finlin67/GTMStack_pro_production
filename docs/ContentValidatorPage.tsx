// app/admin/content-validator/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { IndustryItemSchema, getIndustryItemWarnings } from "@/src/lib/content-schemas/IndustryItem";

function safeJsonParse(input: string): { ok: true; value: unknown } | { ok: false; error: string } {
  try {
    const value = JSON.parse(input);
    return { ok: true, value };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Invalid JSON" };
  }
}

export default function ContentValidatorPage() {
  const [raw, setRaw] = useState<string>("");

  const result = useMemo(() => {
    if (!raw.trim()) return { status: "EMPTY" as const };

    const parsed = safeJsonParse(raw);
    if (!parsed.ok) return { status: "JSON_ERROR" as const, error: parsed.error };

    const validated = IndustryItemSchema.safeParse(parsed.value);
    if (!validated.success) {
      return {
        status: "SCHEMA_ERROR" as const,
        issues: validated.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      };
    }

    const warnings = getIndustryItemWarnings(validated.data);
    return {
      status: "OK" as const,
      data: validated.data,
      warnings,
    };
  }, [raw]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Content Validator (IndustryItem)</h1>
        <p className="text-slate-300 text-sm">
          Paste LLM output here. This tool will reject extra keys, missing keys, and wrong types.
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
                {result.issues.map((i, idx) => (
                  <li key={idx}>
                    <span className="font-mono text-slate-200">{i.path || "(root)"}</span>:{" "}
                    <span>{i.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.status === "OK" && (
            <div className="space-y-3">
              <div className="text-green-300 font-semibold">Valid IndustryItem ✅</div>

              {result.warnings.length > 0 && (
                <div className="text-amber-200">
                  <div className="font-semibold">Warnings</div>
                  <ul className="mt-1 list-disc pl-5 text-sm space-y-1">
                    {result.warnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-sm font-semibold"
                  onClick={() => copy(JSON.stringify(result.data, null, 2))}
                >
                  Copy JSON (pretty)
                </button>
                <button
                  className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 text-sm font-semibold"
                  onClick={() => copy(JSON.stringify(result.data))}
                >
                  Copy JSON (minified)
                </button>
              </div>

              <pre className="text-xs bg-slate-950 border border-slate-800 rounded p-3 overflow-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="text-xs text-slate-400">
          Next step: paste the validated JSON into <span className="font-mono">content/industries.ts</span> as a new
          object in <span className="font-mono">industryItems</span>.
        </div>
      </div>
    </div>
  );
}
