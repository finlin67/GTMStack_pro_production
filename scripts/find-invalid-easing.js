/* eslint-disable no-console */
const fs = require('node:fs')
const path = require('node:path')

const ANIMATIONS_DIR = path.join(process.cwd(), 'src', 'components', 'animations')
const TARGET_EXTENSIONS = new Set(['.ts', '.tsx'])

const rules = [
  {
    name: 'steps-easing-string',
    regex: /ease\s*:\s*['"]steps\([^'"]+\)['"]/gi,
    hint: 'Framer Motion does not accept CSS steps() strings in ease. Use a supported easing.',
  },
  {
    name: 'steps-in-transition-string',
    regex: /transition\s*:\s*\{[\s\S]*?ease\s*:\s*['"][^'"]*steps\([^'"]+\)[^'"]*['"][\s\S]*?\}/gi,
    hint: 'Transition object contains steps(...) easing string.',
  },
]

function collectFiles(dir) {
  const out = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...collectFiles(fullPath))
      continue
    }
    const ext = path.extname(entry.name)
    if (TARGET_EXTENSIONS.has(ext)) {
      out.push(fullPath)
    }
  }
  return out
}

function lineNumberFromIndex(content, index) {
  let line = 1
  for (let i = 0; i < index; i++) {
    if (content[i] === '\n') line++
  }
  return line
}

function run() {
  if (!fs.existsSync(ANIMATIONS_DIR)) {
    console.error(`Animations directory not found: ${ANIMATIONS_DIR}`)
    process.exit(1)
  }

  const files = collectFiles(ANIMATIONS_DIR)
  const findings = []

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8')
    for (const rule of rules) {
      const regex = new RegExp(rule.regex.source, rule.regex.flags)
      let match
      while ((match = regex.exec(content)) !== null) {
        const line = lineNumberFromIndex(content, match.index)
        findings.push({
          filePath,
          line,
          rule: rule.name,
          hint: rule.hint,
          snippet: match[0].replace(/\s+/g, ' ').trim().slice(0, 180),
        })
      }
    }
  }

  if (findings.length === 0) {
    console.log('No suspicious easing usage found in src/components/animations.')
    return
  }

  console.log(`Found ${findings.length} suspicious easing occurrence(s):`)
  for (const item of findings) {
    const rel = path.relative(process.cwd(), item.filePath).replace(/\\/g, '/')
    console.log(`- ${rel}:${item.line} [${item.rule}]`)
    console.log(`  ${item.snippet}`)
    console.log(`  hint: ${item.hint}`)
  }

  process.exitCode = 2
}

run()
