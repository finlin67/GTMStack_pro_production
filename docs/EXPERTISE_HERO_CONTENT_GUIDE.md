# Expertise topic hero copy — structure guide

Mapped expertise pages (`content/expertise/*.ts` narrative shape) feed four templates. The **mapper** now normalizes long headlines so the live site stays investor-friendly.

## Fields (`hero` block)

| Field | Role | Best practice |
|--------|------|----------------|
| **`headline`** | Primary H1 | Prefer **one short line** (≤ ~9 words / ~70 chars). Optional: use **`:`** to split a **short title** and a **medium accent** (second segment ≤ ~8 words) — e.g. `CRM Management & Integration: Transform Data into Actionable Revenue.` |
| **`subheadline`** | Deck / supporting line | **One sentence** that expands the promise; it appears as a **lead line** (smaller than H1), not as duplicate giant headline text. |
| **`description`** | Body | **1–2 short paragraphs** for the hero; this is the main “read more” area. |

## What the mapper does (automatic)

- If `headline` has no `:` / ` - ` / ` | ` and is long, it **truncates** the H1 to ~9 words and moves the rest into the lead line with `subheadline`.
- If `headline` uses `:` and both sides are reasonably short, **line 1 = H1**, **line 2 = accent** (gradient / secondary line), and **`subheadline`** stays the lead when needed.

### Systems & Operations template (`Uploaded_SystemOperations_v1`)

When the headline splits into **H1 + accent** (colon pattern), **`subheadline` is rendered as a separate “deck” line** (smaller than the gradient accent), and **`hero.description` is the only multi-sentence body** in that stack. That avoids two long paragraphs stacked under an already-large two-line title (e.g. Martech Optimization).

You do **not** have to rewrite every file for the site to improve; tightening `headline` + `subheadline` in YAML/TS will refine what visitors see.

## Fonts (target)

- **Headings (H1 / accent line):** Outfit  
- **Lead + body:** Inter  

Templates apply this hierarchy; very long strings were the main issue, not the font files.
