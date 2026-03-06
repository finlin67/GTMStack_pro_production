import 'server-only'

export function assertLocalOnly() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Local-only route disabled in production.')
  }
  if (process.env.LOCAL_ADMIN !== '1') {
    throw new Error('Local-only route disabled (set LOCAL_ADMIN=1).')
  }
}

export function isValidAnimationId(id: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)
}
