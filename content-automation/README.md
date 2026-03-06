# Content Automation System

Batch hydration tool for generating TypeScript content objects from strategic project briefs using Google's Gemini API.

## Quick Start

### 1. Install Dependencies

```bash
cd content-automation
npm install
```

### 2. Set Your Gemini API Key

Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey), then set it as an environment variable:

**Windows PowerShell:**
```powershell
$env:GEMINI_API_KEY = "your-api-key-here
```

**Windows CMD:**
```cmd
set GEMINI_API_KEY=your-api-key-here
```

**Unix/Mac:**
```bash
export GEMINI_API_KEY="your-api-key-here"
```

### 3. Create a Brief

Create a markdown file in the appropriate `briefs/` folder:
- `briefs/expertise/` — expertise service pages
- `briefs/industries/` — industry vertical pages
- `briefs/case-studies/` — case study entries

Example: `briefs/expertise/account-based-marketing.md`

### 4. Hydrate Content

```bash
npm run hydrate
```

Generated TypeScript objects will appear in `content/[category]/[topic].ts`

---

## Usage Modes

### Default (Overwrite Existing)

Regenerates all content, replacing existing files:

```bash
npm run hydrate
# or explicitly:
npm run hydrate:overwrite
```

**Use when:** You want to refresh all generated content.

### Skip Existing Files

Only generates new content files, leaves existing ones untouched:

```bash
npm run hydrate:skip
```

**Use when:** You've added new briefs and want to generate only those, preserving existing outputs.

### Dry Run (Preview)

Shows what would be written without actually writing files or calling the API:

```bash
npm run hydrate:dry-run
```

**Use when:** You want to preview the plan before running the full hydration.

### Dry Run with Overwrite

Preview overwrite mode without writing or calling the API:

```bash
npm run hydrate:dry-run:overwrite
```

**Use when:** You want to see which files would be regenerated in overwrite mode.

---

## Brief Structure

Briefs are **markdown files** that contain strategic project information. Gemini parses these and converts them into TypeScript content objects.

### Recommended Brief Sections

Create a well-structured brief with these sections (in markdown):

```markdown
# Account-Based Marketing

## Executive Summary
[2-3 sentences about the core discipline and why it matters for B2B GTM]

## Website-Ready Positioning

### Tagline
[5-8 word positioning statement]

### Description
[1-2 comprehensive sentences about the discipline]

## Core Expertise & Capabilities

- [Capability 1 - with brief description]
- [Capability 2]
- [Capability 3]
- [Capability 4]
- [Capability 5]

## Frameworks & Differentiated Thinking

[Core principles and philosophies that guide your approach - 4 key ideas]

## Representative Projects & Use Cases

[Real examples showing impact, outcomes, and methodology]

## Key Metrics & Impact

[B2B metrics, typical improvements, business outcomes]
```

### Example Brief

See `briefs/expertise/account-based-marketing.md` for a complete example used to generate content.

---

## Output Structure

Generated files are TypeScript exports with this shape:

```typescript
export const [TOPIC]_CONTENT = {
  brand: {
    tagline: string,        // 5-8 word positioning
    description: string,    // 1-2 sentences
  },
  hero: {
    headline: string,
    subheadline: string,
    description: string,
    primaryCTA: { label: string, href: string },
    secondaryCTA: { label: string, href: string },
    image: { src: string, alt: string },
  },
  metricsSection: {
    headline: string,
    stats: [
      { value: string, label: string, description: string },
      { value: string, label: string, description: string },
      { value: string, label: string, description: string },
    ],
  },
  capabilitiesSection: {
    headline: string,
    items: [
      { icon: string, title: string, description: string },
      { icon: string, title: string, description: string },
      { icon: string, title: string, description: string },
      { icon: string, title: string, description: string },
      { icon: string, title: string, description: string },
    ],
  },
  philosophySection: {
    headline: string,
    principles: [
      { title: string, description: string },
      { title: string, description: string },
      { title: string, description: string },
      { title: string, description: string },
    ],
  },
  growthSection: {
    headline: string,
    narrative: string,      // Multi-sentence narrative
    metrics: [
      { label: string, value: string, description: string },
      { label: string, value: string, description: string },
      { label: string, value: string, description: string },
    ],
  },
  ctaSection: {
    title: string,
    subtitle: string,
    button: { label: string, href: string },
  },
  footer: {
    description: string,
    sections: [
      {
        title: string,
        links: [
          { label: string, href: string },
          { label: string, href: string },
        ],
      },
      {
        title: string,
        links: [
          { label: string, href: string },
          { label: string, href: string },
        ],
      },
    ],
    copyright: string,
  },
}
```

### File Naming

- Brief filename: `account-based-marketing.md` → Output: `account-based-marketing.ts`
- Variable export name: `ACCOUNT_BASED_MARKETING_CONTENT`

---

## Workflow Example

### Step 1: Create a Brief

Create `briefs/expertise/demand-generation.md` with your strategic info.

### Step 2: Preview

```bash
npm run hydrate:dry-run
```

Output shows:
```
📁 Processing expertise/ (2 briefs)
  ⏳ account-based-marketing.md...
  🧪 Would generate: account-based-marketing.ts
  ⏳ demand-generation.md...
  🧪 Would generate: demand-generation.ts
```

### Step 3: Hydrate

```bash
npm run hydrate:skip
```

Output shows:
```
📁 Processing expertise/ (2 briefs)
  ⏳ account-based-marketing.md...
  ⏭️  Skipped existing: account-based-marketing.ts
  ⏳ demand-generation.md...
  ✅ demand-generation.ts

✨ Hydration complete!

Summary:
  Generated: 1
  Overwritten: 0
  Skipped: 1
  Failed: 0
```

### Step 4: Copy Generated Content

Find your generated file in `content/expertise/demand-generation.ts`, then copy it to your main project's `content/expertise/` folder.

---

## Troubleshooting

### Error: `GEMINI_API_KEY environment variable not set`

**Solution:** Set your API key as shown in the Quick Start section above.

### Error: Output doesn't start with 'export'

**Possible causes:**
- Brief content is too vague or incomplete
- Gemini is generating explanatory text instead of code

**Solutions:**
- Expand your brief with more concrete details
- Make sure your brief has all recommended sections
- Try again (Gemini output can vary)

### Only some files generated, others failed

Check the output summary. Files that fail validation (don't start with `export`) are skipped. Review those briefs for clarity.

### Template fields don't match expected structure

If generated output has extra/missing fields, the brief may have been too long or off-topic. Keep briefs focused on the specific discipline and use clear section headers.

---

## Best Practices

1. **One topic per brief** — Keep each markdown file focused on a single expertise, industry, or case study.

2. **Use clear section headers** — The system recognizes headers like "Executive Summary", "Core Expertise & Capabilities", etc.

3. **Be specific** — Vague briefs produce vague output. Include real metrics, tangible examples, and concrete capabilities.

4. **Review generated content** — Always read the TypeScript output before deploying. Gemini is ~95% accurate but occasional tweaks may be needed.

5. **Use dry-run first** — Run `npm run hydrate:dry-run` before committing to a full hydration, especially for large batches.

6. **Preserve your API key** — Never commit your API key to git. Keep it in environment variables only.

---

## Directory Structure

```
content-automation/
├── briefs/
│   ├── expertise/          # Expertise service page briefs
│   ├── industries/         # Industry vertical briefs
│   └── case-studies/       # Case study briefs
├── content/
│   ├── expertise/          # Generated expertise content
│   ├── industries/         # Generated industry content
│   └── case-studies/       # Generated case study content
├── hydrate.js              # Main hydration script
├── package.json            # Dependencies and npm scripts
└── README.md               # This file
```

---

## Deploying Generated Content

1. Run hydration in `content-automation/`:
   ```bash
   npm run hydrate:skip
   ```

2. Copy generated files from `content-automation/content/[category]/` to your main project's `content/[category]/`.

3. Verify TypeScript compilation and test:
   ```bash
   npm run typecheck
   npm run build
   ```

---

## Command Reference

| Command | Behavior | Use Case |
|---------|----------|----------|
| `npm run hydrate` | Regenerate all, overwrite existing | Full refresh |
| `npm run hydrate:skip` | Generate only new files | Add new briefs, preserve existing |
| `npm run hydrate:overwrite` | Explicit overwrite mode | Same as default, more explicit |
| `npm run hydrate:dry-run` | Preview + skip mode | Check what's new before running |
| `npm run hydrate:dry-run:overwrite` | Preview overwrite mode | Check what would be regenerated |
| `node hydrate.js --help` | Show CLI help | Understand all options |

---

## Questions?

For issues or clarifications, consult the generated TypeScript objects and compare them against your brief. Refine brief content for better output.
