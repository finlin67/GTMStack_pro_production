module.exports = {
  '*.{ts,tsx}': (files) => {
    const filtered = files.filter((file) => {
      const normalized = file.replace(/\\/g, '/')
      return !normalized.includes('/handoff/') && !normalized.includes('/sandbox/')
    })

    if (filtered.length === 0) {
      return []
    }

    const quoted = filtered.map((file) => `"${file}"`).join(' ')
    return [`eslint --max-warnings=0 ${quoted}`]
  },
}
