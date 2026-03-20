const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

;(async () => {
  const root = 'c:/GitProd/GTMStack_prod/GTMStack_pro_production'
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, 'src/data/gallery-manifest.json'), 'utf8')
  )

  const ids = [
    'systems-operations-hero-component-v2',
    'revops-neural-dashboard-v2',
    'revenue-systems-data-flow-v2',
    'pipeline-command-center-v2',
    'martech-ai-dashboard-engine-v2',
    'marketingai-neural-dashboard-v2',
    'marketingai-intelligence-dashboard-v2',
    'marketing-revenue-analytics-v2',
    'marketing-operations-workflow-tile-v2',
    'marketing-analytics-carousel-v3',
    'live-email-automation-ecosystem-v3',
    'edu-marketers-dashboard-v2',
  ]

  const items = ids.map((id) => {
    const it = manifest.find((x) => x.id === id)
    if (!it) throw new Error(`Missing manifest item: ${id}`)
    return { id, title: it.title, thumbPath: it.thumbnailPath }
  })

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  page.setDefaultTimeout(15000)

  await page.goto('http://localhost:3000/gallery', { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.sg-card')

  const results = []

  for (const item of items) {
    const cardInfo = await page.evaluate(({ title }) => {
      const cards = [...document.querySelectorAll('.sg-card')]
      const card = cards.find(
        (c) => c.querySelector('.sg-title')?.textContent?.trim() === title
      )
      if (!card) return { found: false, gridHasImg: false }
      const img = card.querySelector('img')
      const gridHasImg = !!img
      const gridObjectFit = img ? getComputedStyle(img).objectFit || null : null
      const gridClassName = img ? img.className || null : null
      return { found: true, gridHasImg, gridObjectFit, gridClassName }
    }, { title: item.title })

    const gridHasImg = cardInfo.gridHasImg
    const gridObjectFit = cardInfo.gridObjectFit ?? null

    if (!cardInfo.found) {
      results.push({
        ...item,
        gridHasImg: false,
        gridObjectFit: null,
        modalHasThumb: false,
        modalPreviewTextPresent: false,
        modalObjectFitOrClass: null,
        error: 'Card not found by title',
      })
      continue
    }

    await page.evaluate(({ title }) => {
      const cards = [...document.querySelectorAll('.sg-card')]
      const card = cards.find(
        (c) => c.querySelector('.sg-title')?.textContent?.trim() === title
      )
      card?.click()
    }, { title: item.title })

    // Modal rendering is client-side; poll briefly instead of hard-failing on a strict selector wait.
    let closeCount = 0
    const start = Date.now()
    while (Date.now() - start < 10000) {
      closeCount = await page.evaluate(() =>
        document.querySelectorAll('button[aria-label="Close modal"]').length
      )
      if (closeCount > 0) break
      await new Promise((resolve) => setTimeout(resolve, 250))
    }

    if (closeCount === 0) {
      const missingModalInfo = await page.evaluate(() => {
        const modalOverlay =
          document.querySelector('div.fixed.inset-0.z-50') ||
          document.querySelector('[role="dialog"]')

        const previewTextPresent = [...document.querySelectorAll('*')].some(
          (el) => el.textContent && el.textContent.includes('Preview coming soon')
        )

        const img = modalOverlay?.querySelector('img[src*="/images/"]') || null
        const modalHasThumb = !!img
        return {
          modalOverlayFound: !!modalOverlay,
          modalHasThumb,
          modalPreviewTextPresent: previewTextPresent,
        }
      })
      results.push({
        id: item.id,
        title: item.title,
        thumbPath: item.thumbPath,
        gridHasImg,
        gridObjectFit,
        modalOverlayFound: missingModalInfo.modalOverlayFound,
        modalHasThumb: missingModalInfo.modalHasThumb,
        modalPreviewTextPresent: missingModalInfo.modalPreviewTextPresent,
        modalObjectFitOrClass: null,
        error: 'Modal did not appear (close button not found)',
      })
      continue
    }

    const modalInfo = await page.evaluate(() => {
      const previewTextPresent = [...document.querySelectorAll('*')].some(
        (el) => el.textContent && el.textContent.includes('Preview coming soon')
      )

      // Modal overlay is the top-level fixed element in GalleryModal.
      const modalOverlay =
        document.querySelector('div.fixed.inset-0.z-50') ||
        document.querySelector('[role="dialog"]')

      const img = modalOverlay?.querySelector('img[src*="/images/"]') || null
      const modalHasThumb = !!img

      let objectFit = null
      let className = null
      if (img) {
        const cs = getComputedStyle(img)
        objectFit = cs.objectFit || null
        className = img.className || null
      }

      return {
        modalHasThumb,
        modalPreviewTextPresent: previewTextPresent,
        modalObjectFitOrClass: { objectFit, className },
      }
    })

    await page.click('button[aria-label="Close modal"]')
    await new Promise((resolve) => setTimeout(resolve, 250))

    results.push({
      id: item.id,
      title: item.title,
      thumbPath: item.thumbPath,
      gridHasImg,
      gridObjectFit,
      modalHasThumb: modalInfo.modalHasThumb,
      modalPreviewTextPresent: modalInfo.modalPreviewTextPresent,
      modalObjectFitOrClass: modalInfo.modalObjectFitOrClass,
    })
  }

  await browser.close()
  console.log(JSON.stringify({ ok: true, results }, null, 2))
})().catch((err) => {
  console.error('FAIL', err)
  process.exit(1)
})

