/* eslint-disable no-console */
const fs = require('node:fs/promises')
const path = require('node:path')

const projectRoot = path.resolve(__dirname, '..')
const stageDir = path.join(projectRoot, 'app', 'thumbnail-factory')

async function run() {
  try {
    await fs.rm(stageDir, { recursive: true, force: true })
    console.log(`Removed temporary stage route: ${stageDir}`)
  } catch (error) {
    console.error('Failed to remove thumbnail factory stage route:', error)
    process.exit(1)
  }
}

run()
