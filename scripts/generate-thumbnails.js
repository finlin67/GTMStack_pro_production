/* eslint-disable no-console */
const fs = require('node:fs/promises')
const path = require('node:path')
const puppeteer = require('puppeteer')

const PROJECT_ROOT = path.resolve(__dirname, '..')
const FACTORY_PATH = '/thumbnail-factory'
const FACTORY_URL = process.env.THUMBNAIL_FACTORY_URL || `http://localhost:3000${FACTORY_PATH}`
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'gallery-thumbnails')
const WIDTH = 600
const HEIGHT = 400
const SETTLE_DELAY_MS = Number(process.env.THUMBNAIL_SETTLE_MS || 1800)
const FORMAT = (process.env.THUMBNAIL_FORMAT || 'png').toLowerCase() === 'webp' ? 'webp' : 'png'

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function sanitizeFilename(input) {
  return input
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

async function tryOpenFactory(page, url) {
  const response = await page.goto(url, { waitUntil: 'domcontentloaded' })
  const status = response?.status?.() ?? 'unknown'

  try {
    await page.waitForSelector('[data-thumbnail-item="true"]', { timeout: 15000 })
    return { ok: true, status }
  } catch {
    const title = await page.title()
    const snippet = await page.evaluate(() => {
      const bodyText = document.body?.innerText ?? ''
      return bodyText.slice(0, 400)
    })

    return {
      ok: false,
      status,
      title,
      snippet,
    }
  }
}

async function run() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: WIDTH + 120,
      height: HEIGHT + 220,
      deviceScaleFactor: 2,
    },
  })

  try {
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(120000)
    page.setDefaultTimeout(120000)

    page.on('pageerror', (error) => {
      console.warn(`[pageerror] ${error.message}`)
    })

    page.on('console', (msg) => {
      const text = msg.text()
      if (msg.type() === 'error' || text.includes('Error')) {
        console.warn(`[browser:${msg.type()}] ${text}`)
      }
    })

    const candidateUrls = process.env.THUMBNAIL_FACTORY_URL
      ? [process.env.THUMBNAIL_FACTORY_URL]
      : [
          FACTORY_URL,
          `http://localhost:5000${FACTORY_PATH}`,
        ]

    let activeUrl = ''
    let opened = false

    for (const candidate of candidateUrls) {
      console.log(`Opening: ${candidate}`)
      const result = await tryOpenFactory(page, candidate)
      if (result.ok) {
        opened = true
        activeUrl = candidate
        console.log(`Factory page ready at ${candidate} (status ${result.status})`)
        break
      }

      console.warn(
        `No thumbnail containers at ${candidate} (status ${result.status}, title "${result.title}"). Snippet: ${result.snippet}`
      )
    }

    if (!opened) {
      throw new Error(
        'Could not find [data-thumbnail-item="true"] on any factory URL. Ensure `npm run dev` is running and `/thumbnail-factory` is available.'
      )
    }

    await page.evaluate(async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready
      }
    })

    console.log(`Waiting ${SETTLE_DELAY_MS}ms for animation settle...`)
    await sleep(SETTLE_DELAY_MS)

    await page.waitForFunction(
      () => {
        const tiles = Array.from(document.querySelectorAll('[data-thumbnail-item="true"]'))
        if (tiles.length === 0) return false
        return tiles.some((tile) => {
          const hasComponent = tile.getAttribute('data-has-component') === 'true'
          const inner = tile.firstElementChild
          return hasComponent && !!inner && inner.childElementCount > 0
        })
      },
      { timeout: 120000 }
    )

    const elements = await page.$$('[data-thumbnail-item="true"]')
    const usedNames = new Set()

    console.log(`Found ${elements.length} staged animation containers on ${activeUrl}`)

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const hasComponent = await element.evaluate((el) => el.getAttribute('data-has-component') === 'true')

      if (!hasComponent) {
        const skippedName = await element.evaluate((el) => el.getAttribute('data-testid') || el.getAttribute('id') || 'unknown')
        console.warn(`Skipping (no renderable component export): ${skippedName}`)
        continue
      }

      const rawName = await element.evaluate((el) => {
        return el.getAttribute('data-testid') || el.getAttribute('id') || `thumbnail-${Date.now()}`
      })

      const baseName = sanitizeFilename(rawName)
      const uniqueName = usedNames.has(baseName) ? `${baseName}-${i + 1}` : baseName
      usedNames.add(uniqueName)

      const outPath = path.join(OUTPUT_DIR, `${uniqueName}.${FORMAT}`)

      await element.evaluate((el) => {
        el.scrollIntoView({ block: 'center', inline: 'center' })
      })
      await sleep(450)

      const tileHasChildren = await element.evaluate((el) => {
        const inner = el.firstElementChild
        return !!inner && inner.childElementCount > 0
      })

      if (!tileHasChildren) {
        console.warn(`Skipping (empty render tree): ${rawName}`)
        continue
      }

      await element.screenshot({
        path: outPath,
        type: FORMAT,
      })

      console.log(`Saved (${i + 1}/${elements.length}): ${outPath}`)
    }

    console.log('Thumbnail generation complete.')
  } finally {
    await browser.close()
  }
}

run().catch((error) => {
  console.error('Thumbnail generation failed:', error)
  process.exit(1)
})
