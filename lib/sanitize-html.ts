/**
 * Sanitize WordPress HTML for safe rendering (XSS prevention).
 * Uses isomorphic-dompurify so it works in both server and client.
 * WP content may include iframes (YouTube, Vimeo), so we allow them with safe attributes.
 */
import DOMPurify from 'isomorphic-dompurify'

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
  'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'hr',
  'iframe', // for embedded video (YouTube, Vimeo, Wistia)
  'embed',  // for PDF and media embeds
  'object', // for PDF and fallback embeds
  'param',  // for object parameters
]
const ALLOWED_ATTR = [
  'href', 'target', 'rel', 'class', 'id', 'src', 'alt', 'title', 'width', 'height',
  'frameborder', 'allow', 'allowfullscreen', 'loading', 'style',
  'type', 'data', 'name', 'value', // for embed/object/param
]

export function sanitizeHtml(html: string): string {
  if (!html) return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ADD_ATTR: ['allowfullscreen'],
  })
}
