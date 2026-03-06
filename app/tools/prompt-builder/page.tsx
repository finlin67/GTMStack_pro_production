'use client'

import { useState, useMemo } from 'react'
import { PAGE_CATALOG } from '@/src/data/pageCatalog.generated'

type CatalogItem = (typeof PAGE_CATALOG)[number]

const KIND_ORDER: Record<string, number> = {
  top: 0,
  pillar: 1,
  topic: 2,
  industry: 3,
  'case-study': 4,
  blog: 5,
}

const KIND_LABEL: Record<string, string> = {
  top: 'Top-Level',
  pillar: 'Pillar',
  topic: 'Expertise / Service',
  industry: 'Industry',
  'case-study': 'Case Study',
  blog: 'Blog',
}

const CONSTITUTION = `## GLOBAL DESIGN CONSTITUTION

### Brand Identity
- **Brand name:** GTMStack.pro
- **Tagline:** Systems that scale. Results that compound.
- **Voice:** Direct, confident, systems-thinker. No fluff. No filler. Every sentence earns its place.

### Color Palette (locked — never deviate)
| Token | Hex | Usage |
|---|---|---|
| Navy | #0B132B | Primary background (dark sections) |
| Navy Mid | #111C3A | Secondary dark surface |
| White | #FFFFFF | Primary text on dark; light section bg |
| Body | #A0AEC0 | Body copy on dark |
| Nav Text | #E2E8F0 | Navigation + secondary labels |
| CTA Blue | #2563EB | Primary CTA buttons |
| Outline | #4B5563 | Borders, dividers |
| Soft | #F8FAFC | Light section background |
| Cyan | #06B6D4 | Systems / B2B Tech accent |
| Gold | #F59E0B | Demand / Performance accent |
| Purple | #7C3AED | Content / Narrative accent |
| Green | #22C55E | Operations / Efficiency accent |
| Soft Teal | #14B8A6 | Healthcare / Energy accent |
| Indigo | #6366F1 | Education / Public Sector accent |
| Red | #EF4444 | Error / warning only |

### Typography
- **Display / H1:** Geist Sans, 600–700 weight, tight tracking
- **Body:** Geist Sans, 400 weight, 1.6 line-height
- **Mono / code:** Geist Mono
- **Scale:** 4xl hero → 3xl H2 → 2xl H3 → xl H4 → base body

### Layout Rules
- Max content width: 1280px, centered
- Section padding: py-20 md:py-28
- Grid: 12-col base; 4-col cards; 2-col split
- Alternating dark/light sections (dark = navy bg, light = #F8FAFC)
- No full-bleed images as primary content — use structured data + metrics

### Component Patterns
- **Metric cards:** Large number (3xl–4xl, accent color) + label (body, muted)
- **Section headers:** Eyebrow label (uppercase, xs, accent color) + H2 + optional subtext
- **CTA blocks:** Headline + 1–2 sentences + primary button (CTA Blue) + optional ghost button
- **Cards:** Rounded-xl, subtle border (#4B5563 at 30% opacity), hover lift shadow
- **Badges / tags:** Rounded-full, accent bg at 15% opacity, accent text

### Animation
- Entrance: fade-up (opacity 0→1, translateY 16px→0), 400ms ease-out
- Stagger children: 80ms delay increments
- No decorative looping animations on content sections
- Framer Motion preferred

### Writing Rules
- No em dashes (—) in UI copy
- No "leverage", "synergy", "unlock", "supercharge"
- Metrics always formatted: value first, then label (e.g., "87% YoY pipeline growth")
- Proof points: company + outcome + metric (never vague)
- Section intros: 1–2 sentences max`

function buildPrompt(item: CatalogItem): string {
  const sectionsFormatted = item.sections
    .map((s, i) => `  ${i + 1}. ${s}`)
    .join('\n')

  return `${CONSTITUTION}

---

## PAGE BRIEF: ${item.name}

| Field | Value |
|---|---|
| Route | \`${item.route}\` |
| Kind | ${KIND_LABEL[item.kind] ?? item.kind} |
| Theme Key | \`${item.themeKey}\` |
| Accent Color | ${item.accentHex} — ${item.accentName} |
| Tone | ${item.tone} |

### Section Order
${sectionsFormatted}

### Accent Usage
- Use **${item.accentHex}** (${item.accentName}) for:
  - Eyebrow labels
  - Metric values
  - Icon fills
  - Active/hover states
  - Decorative rule lines under section headers
- All other UI follows the locked palette above.

### Tone Directive
${item.tone}

Write all copy, section headers, and component labels for this page following the Global Design Constitution above and the tone directive for this specific page. Do not introduce colors, fonts, or layout patterns not listed in the Constitution.`
}

export default function PromptBuilderPage() {
  const sorted = useMemo(
    () =>
      [...PAGE_CATALOG].sort((a, b) => {
        const ko = (KIND_ORDER[a.kind] ?? 99) - (KIND_ORDER[b.kind] ?? 99)
        if (ko !== 0) return ko
        return a.name.localeCompare(b.name)
      }),
    [],
  )

  const [selectedId, setSelectedId] = useState<string>(sorted[0]?.id ?? '')
  const [copied, setCopied] = useState(false)

  const selected = useMemo(
    () => sorted.find((p) => p.id === selectedId) ?? sorted[0],
    [selectedId, sorted],
  )

  const prompt = useMemo(() => (selected ? buildPrompt(selected) : ''), [selected])

  function handleCopy() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const groupedOptions = useMemo(() => {
    const groups: Record<string, CatalogItem[]> = {}
    for (const item of sorted) {
      const label = KIND_LABEL[item.kind] ?? item.kind
      if (!groups[label]) groups[label] = []
      groups[label].push(item)
    }
    return groups
  }, [sorted])

  return (
    <div className="min-h-screen bg-[#0B132B] text-[#E2E8F0] font-sans">
      {/* Header */}
      <div className="border-b border-[#4B5563]/40 bg-[#111C3A]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#06B6D4]">GTMStack</span>
          <span className="text-[#4B5563]">/</span>
          <h1 className="text-sm font-semibold text-white">Stitch Prompt Builder</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 space-y-1.5">
            <label htmlFor="page-select" className="block text-xs uppercase tracking-widest text-[#A0AEC0]">
              Select Page
            </label>
            <select
              id="page-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-[#111C3A] border border-[#4B5563] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4]"
            >
              {Object.entries(groupedOptions).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <button
            onClick={handleCopy}
            className="shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
          >
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
        </div>

        {/* Page meta card */}
        {selected && (
          <div className="rounded-xl border border-[#4B5563]/40 bg-[#111C3A] p-5 space-y-4">
            <div className="flex items-center gap-3">
              {/* Accent swatch */}
              <div
                className="w-8 h-8 rounded-md shrink-0 ring-1 ring-white/10"
                style={{ backgroundColor: selected.accentHex }}
                title={selected.accentHex}
              />
              <div>
                <p className="text-white font-semibold text-sm">{selected.name}</p>
                <p className="text-[#A0AEC0] text-xs font-mono">{selected.route}</p>
              </div>
              <span className="ml-auto text-xs rounded-full px-2.5 py-0.5 font-medium bg-[#4B5563]/30 text-[#E2E8F0]">
                {KIND_LABEL[selected.kind] ?? selected.kind}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <p className="uppercase tracking-widest text-[#A0AEC0]">Accent</p>
                <p className="text-white font-mono">{selected.accentHex} — {selected.accentName}</p>
              </div>
              <div className="space-y-0.5">
                <p className="uppercase tracking-widest text-[#A0AEC0]">Theme Key</p>
                <p className="text-white font-mono">{selected.themeKey}</p>
              </div>
              <div className="col-span-full space-y-0.5">
                <p className="uppercase tracking-widest text-[#A0AEC0]">Tone</p>
                <p className="text-[#E2E8F0]">{selected.tone}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-widest text-[#A0AEC0]">Sections</p>
              <ol className="space-y-1">
                {selected.sections.map((s, i) => (
                  <li key={i} className="flex gap-2 text-xs text-[#E2E8F0]">
                    <span className="shrink-0 text-[#A0AEC0] w-4 text-right">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Prompt preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-[#A0AEC0]">Generated Prompt</p>
            <span className="text-xs text-[#4B5563]">{prompt.length.toLocaleString()} chars</span>
          </div>
          <pre className="w-full rounded-xl border border-[#4B5563]/40 bg-[#111C3A] p-5 text-xs text-[#A0AEC0] font-mono leading-relaxed overflow-auto max-h-[520px] whitespace-pre-wrap break-words">
            {prompt}
          </pre>
        </div>

      </div>
    </div>
  )
}
