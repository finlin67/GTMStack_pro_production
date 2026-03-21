import fs from 'fs'
import path from 'path'

import { getGalleryItems } from '../src/lib/galleryManifest'
import { applyCanonicalVisibility } from '../src/lib/galleryPreviewPolicy'

function toPosix(value: string): string {
  return value.replace(/\\/g, '/')
}

function main() {
  const allItems = getGalleryItems()
  const { visibleItems } = applyCanonicalVisibility(allItems, {
    includeSecondary: false,
    includeDeprecated: false,
  })

  const allPlaceholder = allItems
    .filter((item) => item.placeholderPreview)
    .sort((a, b) => a.id.localeCompare(b.id))

  const visiblePlaceholder = visibleItems
    .filter((item) => item.placeholderPreview)
    .sort((a, b) => a.id.localeCompare(b.id))

  const byCategory = new Map<string, number>()
  for (const item of visiblePlaceholder) {
    const key = item.displayCategory || item.category || 'Uncategorized'
    byCategory.set(key, (byCategory.get(key) ?? 0) + 1)
  }

  const categoryLines = Array.from(byCategory.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([category, count]) => `- ${category}: ${count}`)

  const markdown = [
    '# Gallery Placeholder-Only Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    `- Total gallery items: ${allItems.length}`,
    `- Active visible items: ${visibleItems.length}`,
    `- Placeholder-only items (all): ${allPlaceholder.length}`,
    `- Placeholder-only items (active visible): ${visiblePlaceholder.length}`,
    '',
    '## Placeholder Items by Category (Active Visible)',
    ...(categoryLines.length ? categoryLines : ['- none']),
    '',
    '## Active Placeholder-Only Inventory',
    '| ID | Title | Category | Project Path | Preferred HTML | GitHub |',
    '|---|---|---|---|---|---|',
    ...visiblePlaceholder.map((item) => {
      const preferredHtml = item.preferredEntryHtml || item.entryHtml || ''
      return `| ${item.id} | ${item.title.replace(/\|/g, '\\|')} | ${item.displayCategory || item.category} | ${toPosix(item.projectPath)} | ${preferredHtml} | ${item.githubUrl} |`
    }),
    '',
    '## Remediation Checklist',
    '- Replace placeholder preview HTML with real interactive HTML in source animation folders.',
    '- Re-run sync commands to refresh manifest and public assets.',
    '- Re-run this report and confirm placeholder count decreases.',
    '',
    '### Recommended Commands',
    '- npm run sync:gallery',
    '- npm run sync:gallery:entry-html',
    '- npm run report:gallery:placeholders',
    '',
  ].join('\n')

  const outDir = path.join(process.cwd(), 'reports')
  const outMd = path.join(outDir, 'GALLERY_PLACEHOLDER_ITEMS.md')
  const outJson = path.join(outDir, 'GALLERY_PLACEHOLDER_ITEMS.json')

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outMd, markdown, 'utf8')
  fs.writeFileSync(
    outJson,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totals: {
          allItems: allItems.length,
          visibleItems: visibleItems.length,
          allPlaceholder: allPlaceholder.length,
          visiblePlaceholder: visiblePlaceholder.length,
        },
        visiblePlaceholderItems: visiblePlaceholder.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.displayCategory || item.category,
          projectPath: toPosix(item.projectPath),
          preferredEntryHtml: item.preferredEntryHtml || item.entryHtml || null,
          githubUrl: item.githubUrl,
        })),
      },
      null,
      2
    ),
    'utf8'
  )

  console.log(
    JSON.stringify(
      {
        ok: true,
        markdown: outMd,
        json: outJson,
        totals: {
          allItems: allItems.length,
          visibleItems: visibleItems.length,
          allPlaceholder: allPlaceholder.length,
          visiblePlaceholder: visiblePlaceholder.length,
        },
      },
      null,
      2
    )
  )
}

main()
