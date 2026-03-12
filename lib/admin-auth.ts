import crypto from 'node:crypto'

export const ADMIN_COOKIE_NAME = 'admin_session'
const TTL_MS = 24 * 60 * 60 * 1000

function getTokenSecret(): string {
  // Prefer a dedicated secret; fall back to ADMIN_PASSWORD for backwards compatibility
  return process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || ''
}

export function signAdminToken(): string {
  const secret = getTokenSecret()
  if (!secret) return ''

  const t = Date.now().toString(36)
  const nonce = crypto.randomBytes(8).toString('hex')
  const h = crypto.createHmac('sha256', secret).update(`${t}.${nonce}`).digest('hex').slice(0, 32)

  return `${t}.${nonce}.${h}`
}

export function isAdminAuthorized(token: string | undefined): boolean {
  if (process.env.LOCAL_ADMIN === '1') return true
  return Boolean(token && verifyAdminToken(token))
}

export function verifyAdminToken(token: string): boolean {
  const secret = getTokenSecret()
  if (!secret || !token) return false

  const [t, nonce, h] = token.split('.')
  if (!t || !nonce || !h) return false

  const tMs = parseInt(t, 36)
  if (Number.isNaN(tMs) || Date.now() - tMs > TTL_MS) return false

  const expectedH = crypto.createHmac('sha256', secret).update(`${t}.${nonce}`).digest('hex').slice(0, 32)

  try {
    return crypto.timingSafeEqual(Buffer.from(h), Buffer.from(expectedH))
  } catch {
    return false
  }
}