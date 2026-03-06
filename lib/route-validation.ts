/**
 * Route and URL validation utilities for admin dashboard
 */

export type ValidationState = 'empty' | 'invalid' | 'checking' | 'not-found' | 'found'

export interface ValidationResult {
  state: ValidationState
  path: string
  isValid: boolean
  error?: string
  suggestion?: string
}

/**
 * Normalize a route to canonical form: /path/to/route (no trailing slash except for /)
 */
export function normalizeRoute(input: string): string {
  if (!input) return ''
  const trimmed = input.trim()
  if (!trimmed) return ''

  // If it's a full URL, extract the path
  let path = trimmed
  if (trimmed.includes('://')) {
    try {
      const url = new URL(trimmed)
      path = url.pathname
    } catch {
      path = trimmed
    }
  }

  // Ensure leading slash
  if (!path.startsWith('/')) {
    path = '/' + path
  }

  // Normalize multiple slashes
  path = path.replace(/\/+/g, '/')

  // Remove trailing slash (except for root)
  if (path !== '/' && path.endsWith('/')) {
    path = path.replace(/\/+$/, '')
  }

  return path
}

/**
 * Extract path from a full URL, returning just the pathname
 */
export function extractPathFromUrl(input: string): string {
  try {
    // If it looks like a URL, parse it
    if (input.includes('://')) {
      const url = new URL(input)
      return normalizeRoute(url.pathname)
    }
  } catch {
    // Fall through to treat as path
  }
  return normalizeRoute(input)
}

/**
 * Validate that a path follows the expected format
 * Expected format: /section/slug or /slug or just /
 * Valid chars: lowercase letters, numbers, hyphens, slashes
 */
export function validateRoute(path: string): { isValid: boolean; error?: string } {
  if (!path || path === '') {
    return { isValid: false, error: 'Please enter a path' }
  }

  if (!path.startsWith('/')) {
    return { isValid: false, error: 'Path must start with /' }
  }

  // Enforce lowercase only
  if (path !== path.toLowerCase()) {
    return { isValid: false, error: 'Path must be lowercase' }
  }

  // Check for invalid characters (allow: a-z, 0-9, /, -)
  const invalidCharsMatch = path.match(/[^a-z0-9\/-]/)
  if (invalidCharsMatch) {
    return { isValid: false, error: `Invalid character: "${invalidCharsMatch[0]}"` }
  }

  // Check for consecutive slashes
  if (path.includes('//')) {
    return { isValid: false, error: 'Double slashes not allowed' }
  }

  return { isValid: true }
}

/**
 * Generate a canonical suggestion for a route
 * e.g., /Expertise/Video-Marketing -> /expertise/video-marketing
 */
export function suggestCanonicalRoute(input: string): string {
  const normalized = normalizeRoute(input)
  if (!normalized || normalized === '/') return normalized

  return normalized
    .split('/')
    .map(part => part.toLowerCase())
    .join('/')
}

/**
 * Determine if an input looks like it might be a full URL
 */
export function looksLikeUrl(input: string): boolean {
  return /^https?:\/\//.test(input.trim())
}

/**
 * Get comprehensive validation result for a route input
 */
export function getValidationResult(
  input: string,
  isChecking: boolean = false,
  pageFound: boolean = false,
  pageTitle?: string,
  templateId?: string
): ValidationResult {
  const trimmed = input.trim()

  // Empty
  if (!trimmed) {
    return {
      state: 'empty',
      path: '',
      isValid: false,
    }
  }

  // Currently checking
  if (isChecking) {
    const normalized = normalizeRoute(trimmed)
    return {
      state: 'checking',
      path: normalized,
      isValid: false,
    }
  }

  // Validate format
  const normalized = normalizeRoute(trimmed)
  const validation = validateRoute(normalized)

  if (!validation.isValid) {
    return {
      state: 'invalid',
      path: normalized,
      isValid: false,
      error: validation.error || 'Invalid path format',
      suggestion: suggestCanonicalRoute(trimmed),
    }
  }

  // Found in registry
  if (pageFound) {
    return {
      state: 'found',
      path: normalized,
      isValid: true,
      suggestion: pageTitle && templateId ? `Page found: ${pageTitle} – Template: ${templateId}` : 'Page found in registry',
    }
  }

  // Not found but valid
  return {
    state: 'not-found',
    path: normalized,
    isValid: true,
    suggestion: 'This page is not yet in the registry. You can add it by registering a new template.',
  }
}
