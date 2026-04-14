const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

function parseArgs(argv) {
  const args = {
    baseUrl: 'http://localhost:3000/gallery',
    manifestPath: path.join(process.cwd(), 'src', 'data', 'gallery-manifest.json'),
    outJson: path.join(process.cwd(), 'reports', 'GALLERY_RUNTIME_AUDIT.json'),
    outMd: path.join(process.cwd(), 'reports', 'GALLERY_RUNTIME_AUDIT.md'),
    timeoutMs: 15000,
    settleMs: 1800,
    limit: 0,
    offset: 0,
    headless: true,
  }

  for (const raw of argv) {
    if (raw.startsWith('--base-url=')) args.baseUrl = raw.split('=', 2)[1]
    else if (raw.startsWith('--manifest=')) args.manifestPath = path.resolve(process.cwd(), raw.split('=', 2)[1])
    else if (raw.startsWith('--out-json=')) args.outJson = path.resolve(process.cwd(), raw.split('=', 2)[1])
    else if (raw.startsWith('--out-md=')) args.outMd = path.resolve(process.cwd(), raw.split('=', 2)[1])
    else if (raw.startsWith('--timeout-ms=')) args.timeoutMs = Number(raw.split('=', 2)[1]) || args.timeoutMs
    else if (raw.startsWith('--settle-ms=')) args.settleMs = Number(raw.split('=', 2)[1]) || args.settleMs
    else if (raw.startsWith('--limit=')) args.limit = Number(raw.split('=', 2)[1]) || 0
    else if (raw.startsWith('--offset=')) args.offset = Math.max(0, Number(raw.split('=', 2)[1]) || 0)
    else if (raw === '--headed') args.headless = false
  }

  return args
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function toMarkdown(report) {
  const lines = []
  lines.push('# Gallery Runtime Audit')
  lines.push('')
  lines.push(`- Generated: ${new Date().toISOString()}`)
  lines.push(`- Base URL: \`${report.baseUrl}\``)
  lines.push(`- Total audited: ${report.total}`)
  lines.push(`- Offset: ${report.offset}`)
  lines.push(`- Limit: ${report.limit || 'all'}`)
  lines.push(`- Passed: ${report.passed}`)
  lines.push(`- Failed: ${report.failed}`)
  lines.push(`- With warnings: ${report.withWarnings}`)
  lines.push('')
  lines.push('## Failure Types')
  lines.push('')
  lines.push(`- Card not found: ${report.counts.cardNotFound}`)
  lines.push(`- Modal did not open: ${report.counts.modalDidNotOpen}`)
  lines.push(`- Iframe not ready: ${report.counts.iframeNotReady}`)
  lines.push(`- Explicit fallback shown: ${report.counts.explicitFallback}`)
  lines.push(`- Runtime console errors: ${report.counts.consoleErrors}`)
  lines.push(`- Network request failures: ${report.counts.requestFailed}`)
  lines.push('')
  lines.push('## Failed Items')
  lines.push('')
  if (!report.items.some((x) => x.status === 'fail')) {
    lines.push('_(none)_')
  } else {
    for (const item of report.items.filter((x) => x.status === 'fail')) {
      lines.push(`- \`${item.id}\` — ${item.reason}`)
    }
  }
  lines.push('')
  lines.push('## Warning Items')
  lines.push('')
  if (!report.items.some((x) => x.status === 'warn')) {
    lines.push('_(none)_')
  } else {
    for (const item of report.items.filter((x) => x.status === 'warn')) {
      lines.push(`- \`${item.id}\` — ${item.reason}`)
    }
  }
  lines.push('')
  return lines.join('\n')
}

;(async () => {
  const args = parseArgs(process.argv.slice(2))
  if (!fs.existsSync(args.manifestPath)) {
    throw new Error(`Manifest not found: ${args.manifestPath}`)
  }

  const manifest = JSON.parse(fs.readFileSync(args.manifestPath, 'utf8'))
  const allItems = Array.isArray(manifest) ? manifest : []
  const start = Math.min(args.offset, allItems.length)
  const end = args.limit > 0 ? start + args.limit : undefined
  const items = allItems.slice(start, end)

  const browser = await puppeteer.launch({
    headless: args.headless ? 'new' : false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  page.setDefaultTimeout(args.timeoutMs)

  let activeItemId = null
  const events = []

  page.on('requestfailed', (request) => {
    events.push({
      type: 'requestfailed',
      itemId: activeItemId,
      url: request.url(),
      method: request.method(),
      errorText: request.failure()?.errorText || 'unknown',
      ts: Date.now(),
    })
  })

  page.on('pageerror', (err) => {
    events.push({
      type: 'pageerror',
      itemId: activeItemId,
      message: err.message || String(err),
      ts: Date.now(),
    })
  })

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      events.push({
        type: 'console-error',
        itemId: activeItemId,
        message: msg.text(),
        ts: Date.now(),
      })
    }
  })

  await page.goto(args.baseUrl, { waitUntil: 'domcontentloaded' })
  try {
    await page.waitForSelector('.sgs-card, .sg-card, .gallery-card, [data-gallery-card]', { timeout: args.timeoutMs })
  } catch {
    const diagnostics = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || null,
      bodySnippet: (document.body?.innerText || '').slice(0, 240),
      url: window.location.href,
    }))
    throw new Error(
      `Gallery cards not found at ${args.baseUrl}. ` +
      `Page diagnostics: ${JSON.stringify(diagnostics)}`
    )
  }

  const results = []
  const summaryCounts = {
    cardNotFound: 0,
    modalDidNotOpen: 0,
    iframeNotReady: 0,
    explicitFallback: 0,
    consoleErrors: 0,
    requestFailed: 0,
  }

  for (const item of items) {
    activeItemId = item.id
    const startedAt = Date.now()

    await page.evaluate((query) => {
      const input = document.querySelector('.sgs-search-input')
      if (!input) return
      input.value = query
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    }, item.title)
    await sleep(180)

    const cardFound = await page.evaluate((title) => {
      const normalize = (s) =>
        (s || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, ' ')
          .trim()
      const cards = Array.from(document.querySelectorAll('.sgs-card, .sg-card, .gallery-card, [data-gallery-card]'))
      const target = normalize(title)
      const card =
        cards.find((c) => normalize(c.querySelector('.sgs-card-title')?.textContent || c.querySelector('.sg-title')?.textContent || '') === target) ||
        cards[0]
      if (!card) return false
      card.scrollIntoView({ block: 'center', behavior: 'instant' })
      ;(card).click()
      return true
    }, item.title)

    if (!cardFound) {
      summaryCounts.cardNotFound += 1
      results.push({
        id: item.id,
        title: item.title,
        status: 'fail',
        reason: 'Card not found by title in gallery grid',
      })
      continue
    }

    let modalOpened = false
    for (let i = 0; i < 30; i++) {
      const closeExists = await page.$('button[aria-label="Close modal"]')
      if (closeExists) {
        modalOpened = true
        break
      }
      await sleep(150)
    }

    if (!modalOpened) {
      await page.evaluate((title) => {
        const normalize = (s) =>
          (s || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
        const cards = Array.from(document.querySelectorAll('.sgs-card, .sg-card, .gallery-card, [data-gallery-card]'))
        const target = normalize(title)
        const card =
          cards.find((c) => normalize(c.querySelector('.sgs-card-title')?.textContent || c.querySelector('.sg-title')?.textContent || '') === target) ||
          cards[0]
        if (!card) return
        ;(card).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
      }, item.title)
      await sleep(350)
      modalOpened = !!(await page.$('button[aria-label="Close modal"]'))
    }

    if (!modalOpened) {
      summaryCounts.modalDidNotOpen += 1
      results.push({
        id: item.id,
        title: item.title,
        status: 'fail',
        reason: 'Modal did not open after clicking card',
      })
      continue
    }

    await sleep(args.settleMs)

    const modalState = await page.evaluate(() => {
      const overlay =
        document.querySelector('div.fixed.inset-0.z-50') ||
        document.querySelector('[role="dialog"]')

      if (!overlay) {
        return { hasOverlay: false }
      }

      const iframe = overlay.querySelector('iframe')
      const fallback = overlay.textContent?.includes('Preview coming soon') || false
      const thumbFallback = overlay.textContent?.includes('Interactive preview not available') || false

      return {
        hasOverlay: true,
        hasIframe: !!iframe,
        iframeSrc: iframe ? iframe.getAttribute('src') : null,
        explicitFallback: fallback,
        thumbnailFallback: thumbFallback,
      }
    })

    const itemEvents = events.filter((e) => e.itemId === item.id && e.ts >= startedAt)
    const itemRequestFails = itemEvents.filter((e) => e.type === 'requestfailed')
    const itemConsoleErrors = itemEvents.filter((e) => e.type === 'console-error' || e.type === 'pageerror')

    summaryCounts.requestFailed += itemRequestFails.length
    summaryCounts.consoleErrors += itemConsoleErrors.length

    let status = 'pass'
    let reason = 'Modal preview loaded'

    if (!modalState.hasOverlay) {
      status = 'fail'
      reason = 'Modal overlay missing after open'
    } else if (modalState.explicitFallback) {
      status = 'fail'
      reason = 'Modal showed explicit fallback message'
      summaryCounts.explicitFallback += 1
    } else if (modalState.hasIframe) {
      const iframeHandle = await page.$('div.fixed.inset-0.z-50 iframe, [role="dialog"] iframe')
      let iframeReady = false
      if (iframeHandle) {
        const frame = await iframeHandle.contentFrame()
        if (frame) {
          try {
            iframeReady = await frame.evaluate(() => {
              const ready = document.readyState === 'interactive' || document.readyState === 'complete'
              const hasContent = !!document.body && (document.body.children.length > 0 || document.body.textContent.length > 20)
              return ready && hasContent
            })
          } catch {
            iframeReady = false
          }
        }
      }
      if (!iframeReady) {
        status = 'fail'
        reason = 'Iframe preview not ready/empty'
        summaryCounts.iframeNotReady += 1
      } else if (itemConsoleErrors.length || itemRequestFails.length) {
        status = 'warn'
        reason = 'Preview loaded with runtime warnings'
      }
    } else if (modalState.thumbnailFallback) {
      status = 'warn'
      reason = 'Thumbnail fallback used (no iframe/component)'
    }

    if (status === 'pass' && (itemConsoleErrors.length > 0 || itemRequestFails.length > 0)) {
      status = 'warn'
      reason = 'Modal opened, but runtime errors were observed'
    }

    results.push({
      id: item.id,
      title: item.title,
      status,
      reason,
      entryType: item.entryType || null,
      entryHtml: item.entryHtml || null,
      eventCounts: {
        requestFailed: itemRequestFails.length,
        consoleErrors: itemConsoleErrors.length,
      },
    })

    const closeBtn = await page.$('button[aria-label="Close modal"]')
    if (closeBtn) {
      await closeBtn.click()
      await sleep(150)
    }

    await page.evaluate(() => {
      const input = document.querySelector('.sgs-search-input')
      if (!input) return
      input.value = ''
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })
    await sleep(80)
  }

  await browser.close()

  const report = {
    ok: true,
    baseUrl: args.baseUrl,
    offset: args.offset,
    limit: args.limit,
    total: results.length,
    passed: results.filter((r) => r.status === 'pass').length,
    failed: results.filter((r) => r.status === 'fail').length,
    withWarnings: results.filter((r) => r.status === 'warn').length,
    counts: summaryCounts,
    items: results,
  }

  ensureDirForFile(args.outJson)
  ensureDirForFile(args.outMd)
  fs.writeFileSync(args.outJson, JSON.stringify(report, null, 2), 'utf8')
  fs.writeFileSync(args.outMd, toMarkdown(report), 'utf8')

  console.log(JSON.stringify({
    ok: true,
    audited: report.total,
    passed: report.passed,
    failed: report.failed,
    warnings: report.withWarnings,
    outJson: args.outJson,
    outMd: args.outMd,
  }, null, 2))
})().catch((err) => {
  console.error('Runtime gallery audit failed:', err)
  process.exit(1)
})

