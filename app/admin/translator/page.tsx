'use client'

import React, { useMemo, useState } from 'react'
import { PAGE_REGISTRY } from '@/src/data/pageRegistry.generated'

type Analysis = {
    hasDefaultExport: boolean
    defaultExportName: string | null
    namedExportNames: string[]
    usesNextImage: boolean
    usesNextLink: boolean
    hasRelativeImports: boolean
    importLines: string[]
    referencesWindowOrDocument: boolean
    hasUseClientDirective: boolean
    errors: string[]
    warnings: string[]
}

/** Normalize route for comparison: leading slash, no trailing slash (except "/"). Also accepts full URLs. */
function normalizeRoute(input: string): string {
    const raw = (input || '').trim()
    if (!raw) return '/'

    if (/^https?:\/\//i.test(raw)) {
        try {
            const u = new URL(raw)
            const p = (u.pathname || '').trim()
            if (!p) return '/'
            if (p === '/') return '/'
            return p.replace(/\/+$/, '')
        } catch {
            // ignore
        }
    }

    const withLeading = raw.startsWith('/') ? raw : `/${raw}`
    if (withLeading === '/') return '/'
    return withLeading.replace(/\/+$/, '')
}

function slugify(input: string): string {
    return input
        .trim()
        .toLowerCase()
        .replace(/['"]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

function titleCase(input: string): string {
    const s = input.trim()
    if (!s) return s
    return s
        .split(/[\s-_]+/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join('')
}

function analyzeTsx(code: string): Analysis {
    const importLines = code
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.startsWith('import '))

    const hasUseClientDirective = /^\s*['"]use client['"]\s*;?\s*$/m.test(code)
    const defaultExportFn = code.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/) ?? null
    const hasDefaultExport = /export\s+default\s+/.test(code)
    const defaultExportName = defaultExportFn?.[1] ?? null

    const namedExportNames = Array.from(code.matchAll(/export\s+(?:const|function|class)\s+([A-Za-z0-9_]+)/g)).map(
        (m) => m[1]
    )

    const usesNextImage = /from\s+['"]next\/image['"]/.test(code) || /<Image\b/.test(code)
    const usesNextLink = /from\s+['"]next\/link['"]/.test(code) || /<Link\b/.test(code)
    const hasRelativeImports = importLines.some((l) => /from\s+['"]\.\.?\//.test(l))
    const referencesWindowOrDocument = /\bwindow\b|\bdocument\b/.test(code)

    const errors: string[] = []
    const warnings: string[] = []

    if (!code.trim()) errors.push('No code pasted.')
    if (code.trim() && !hasDefaultExport) errors.push('Missing `export default ...` (required for your uploaded template registry).')

    if (hasRelativeImports) warnings.push('Uses relative imports (e.g. ../something). Uploaded templates often break because the file moves; prefer self-contained files.')
    if (usesNextImage) warnings.push('Uses next/image or <Image>. Plain <img> is safer for uploaded templates.')
    if (usesNextLink) warnings.push('Uses next/link or <Link>. Plain <a> is safer for uploaded templates.')
    if (referencesWindowOrDocument) warnings.push('References window/document. Can break server rendering unless guarded or client-only.')
    if (hasUseClientDirective) warnings.push('Has "use client". That’s okay, but it forces client rendering and can increase JS.')

    return {
        hasDefaultExport,
        defaultExportName,
        namedExportNames,
        usesNextImage,
        usesNextLink,
        hasRelativeImports,
        importLines,
        referencesWindowOrDocument,
        hasUseClientDirective,
        errors,
        warnings,
    }
}

function suggestedTemplateId(route: string, version: number) {
    const clean = normalizeRoute(route)
    const parts = clean.split('/').filter(Boolean)

    if (parts.length === 0) return `home.uploaded.v${version}`

    const [section, slug] = parts
    const sec = section.toLowerCase()

    if (sec === 'industries' && slug) return `industry.${slugify(slug)}.uploaded.v${version}`
    if (sec === 'expertise' && slug) return `expertise.${slugify(slug)}.uploaded.v${version}`
    if (sec === 'case-studies' && slug) return `case-study.${slugify(slug)}.uploaded.v${version}`
    if (sec === 'projects' && slug) return `project.${slugify(slug)}.uploaded.v${version}`

    return `${slugify(section)}.${slugify(slug ?? 'page')}.uploaded.v${version}`
}

function suggestedFilename(route: string, version: number) {
    const clean = normalizeRoute(route)
    const parts = clean.split('/').filter(Boolean)

    if (parts.length === 0) return `Uploaded_Home_v${version}.tsx`

    const [section, slug] = parts
    const sec = titleCase(section)
    const sl = slug ? titleCase(slug) : 'Page'
    return `Uploaded_${sec}_${sl}_v${version}.tsx`
}

function escapeCsvCell(v: string) {
    const s = String(v ?? '')
    return /"|,|\n/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function CopyButton({ value, label }: { value: string; label: string }) {
    const [copied, setCopied] = useState(false)

    async function onCopy() {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1200)
        } catch {
            try {
                const ta = document.createElement('textarea')
                ta.value = value
                document.body.appendChild(ta)
                ta.select()
                document.execCommand('copy')
                document.body.removeChild(ta)
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1200)
            } catch {
                setCopied(false)
            }
        }
    }

    return (
        <button
            type="button"
            onClick={onCopy}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 12,
                border: '1px solid #111827',
                background: copied ? '#16a34a' : '#111827',
                color: 'white',
                fontWeight: 800,
                cursor: 'pointer',
                minWidth: 170,
                justifyContent: 'center',
            }}
            aria-label={`Copy ${label}`}
            title={`Copy ${label}`}
        >
            {copied ? 'Copied' : 'Copy'} <span style={{ opacity: 0.9 }}>{label}</span>
        </button>
    )
}

export default function TemplateTranslatorPage() {
    const routes = useMemo(() => {
        return Array.from(new Set(PAGE_REGISTRY.map((r) => r.route))).sort((a, b) => a.localeCompare(b))
    }, [])

    const [fullUrlOrPath, setFullUrlOrPath] = useState('')
    const [useUrlField, setUseUrlField] = useState(false)
    const [selectedRoute, setSelectedRoute] = useState('/industries/retail')
    const [version, setVersion] = useState(1)
    const [code, setCode] = useState('')

    const derivedRouteFromUrl = useMemo(() => normalizeRoute(fullUrlOrPath), [fullUrlOrPath])

    const route = useMemo(() => {
        if (useUrlField && fullUrlOrPath.trim()) return derivedRouteFromUrl
        return selectedRoute
    }, [useUrlField, fullUrlOrPath, derivedRouteFromUrl, selectedRoute])

    const currentRow = useMemo(() => PAGE_REGISTRY.find((r) => r.route === route) ?? null, [route])

    const analysis = useMemo(() => analyzeTsx(code), [code])
    const fileName = useMemo(() => suggestedFilename(route, version), [route, version])
    const newTemplateId = useMemo(() => suggestedTemplateId(route, version), [route, version])

    const todayFolder = 'src/templates/'
    const recommendedFolder = 'src/templates/uploaded/'

    const canFindRoute = Boolean(currentRow)
    const currentTemplateId = currentRow?.templateId ?? null
    const currentContentKey = currentRow?.contentKey ?? ''
    const currentTitle = currentRow?.pageTitle ?? ''

    const csvHeader = 'route,fileRef,pageTitle,templateId,contentKey,theme,heroVisualId'

    const csvRow = useMemo(() => {
        const routeCell = escapeCsvCell(route)
        const fileRefCell = escapeCsvCell(currentRow?.fileRef ?? '')
        const pageTitleCell = escapeCsvCell(currentTitle || '')
        const templateIdCell = escapeCsvCell(newTemplateId)
        const contentKeyCell = escapeCsvCell(currentContentKey || '')
        const themeCell = escapeCsvCell(currentRow?.theme ?? '')
        const heroCell = escapeCsvCell(currentRow?.heroVisualId ?? '')
        return [routeCell, fileRefCell, pageTitleCell, templateIdCell, contentKeyCell, themeCell, heroCell].join(',')
    }, [route, currentRow, currentTitle, newTemplateId, currentContentKey])

    const pageStyle: React.CSSProperties = {
        padding: 24,
        maxWidth: 1100,
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        background: '#ffffff',
        color: '#111827',
    }

    const panelStyle: React.CSSProperties = {
        marginTop: 12,
        padding: 12,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        background: '#ffffff',
        color: '#111827',
    }

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        border: '1px solid #d1d5db',
        marginTop: 6,
        background: '#ffffff',
        color: '#111827',
    }

    const monoBoxStyle: React.CSSProperties = {
        marginTop: 10,
        padding: 12,
        borderRadius: 10,
        border: '1px solid #d1d5db',
        background: '#f9fafb',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: 12,
        color: '#111827',
    }

    return (
        <div style={pageStyle}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#111827' }}>Template Translator (Paste → Checklist)</h1>
            <p style={{ marginTop: 8, opacity: 0.85, color: '#374151' }}>
                Pick a page, paste TSX, then copy the templateId/filename/CSV row so you don’t mistype.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <div>
                    <label style={{ fontWeight: 800, color: '#111827' }}>Full URL or path</label>
                    <input
                        value={fullUrlOrPath}
                        onChange={(e) => setFullUrlOrPath(e.target.value)}
                        placeholder="https://gtmstack.pro/industries/retail or /industries/retail"
                        style={inputStyle}
                    />
                    <div style={{ marginTop: 8, fontSize: 12, color: '#374151' }}>
                        <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                            <input type="checkbox" checked={useUrlField} onChange={(e) => setUseUrlField(e.target.checked)} />
                            Use URL field (otherwise dropdown controls the route)
                        </label>
                        <div style={{ marginTop: 6, opacity: 0.85 }}>
                            Normalized route: <code>{normalizeRoute(fullUrlOrPath || '/')}</code>
                        </div>
                    </div>
                </div>

                <div>
                    <label style={{ fontWeight: 800, color: '#111827' }}>Pick a page</label>
                    <select value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)} style={inputStyle}>
                        {routes.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                    <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85, color: '#374151' }}>
                        Current effective route: <code>{route}</code>
                    </div>
                </div>
            </div>

            <div style={panelStyle}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <b>Current mapping for:</b> <code>{route}</code>
                    <CopyButton value={route} label="route" />
                </div>

                {!canFindRoute ? (
                    <div style={{ marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #fecaca', background: '#fef2f2' }}>
                        <b>Not found in PAGE_REGISTRY.</b>
                        <div style={{ marginTop: 6 }}>
                            Action: add a row to <code>src/data/page-registry.csv</code> for this route (or pick an existing route).
                        </div>
                    </div>
                ) : (
                    <ul style={{ marginTop: 10, lineHeight: 1.6 }}>
                        <li>
                            <b>pageTitle:</b> {currentTitle}
                        </li>
                        <li style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                            <b>templateId:</b> <code>{String(currentTemplateId)}</code>
                            <CopyButton value={String(currentTemplateId)} label="current templateId" />
                        </li>
                        <li>
                            <b>contentKey:</b> <code>{currentContentKey}</code>
                        </li>
                    </ul>
                )}
            </div>

            <div style={{ marginTop: 16 }}>
                <label style={{ fontWeight: 800, color: '#111827' }}>Version</label>
                <input
                    type="number"
                    value={version}
                    min={1}
                    onChange={(e) => setVersion(Number(e.target.value || 1))}
                    style={{ ...inputStyle, width: 220 }}
                />
            </div>

            <div style={{ marginTop: 16 }}>
                <label style={{ fontWeight: 800, color: '#111827' }}>Paste TSX here</label>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your .tsx template code here…"
                    style={{
                        ...inputStyle,
                        minHeight: 320,
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: 12,
                    }}
                />
            </div>

            <div style={{ marginTop: 16, padding: 14, borderRadius: 12, border: '1px solid #e5e7eb', background: '#ffffff' }}>
                <h2 style={{ margin: 0, fontSize: 18, color: '#111827' }}>Do this next (output)</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginTop: 12 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <b>Suggested filename:</b> <code>{fileName}</code>
                        <CopyButton value={fileName} label="filename" />
                    </div>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <b>Suggested new templateId:</b> <code>{newTemplateId}</code>
                        <CopyButton value={newTemplateId} label="templateId" />
                    </div>

                    <div>
                        <b>Where to place the file:</b>
                        <div style={{ marginTop: 6 }}>
                            <div>
                                <b>Today:</b> <code>{todayFolder}</code>
                            </div>
                            <div style={{ marginTop: 4, opacity: 0.85, color: '#374151' }}>
                                <b>Recommended target:</b> <code>{recommendedFolder}</code> (requires updating upload route + generator)
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #e5e7eb' }}>
                    <h3 style={{ margin: 0, fontSize: 16, color: '#111827' }}>CSV ready-to-paste</h3>
                    <p style={{ marginTop: 6, opacity: 0.85, color: '#374151' }}>
                        Header: <code>{csvHeader}</code>
                    </p>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
                        <CopyButton value={csvRow} label="CSV row" />
                    </div>

                    <pre style={monoBoxStyle}>{csvRow}</pre>
                </div>

                <div style={{ marginTop: 14 }}>
                    <h3 style={{ margin: 0, fontSize: 16, color: '#111827' }}>Validation of pasted code</h3>

                    {analysis.errors.length > 0 && (
                        <div style={{ marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid #fecaca', background: '#fef2f2' }}>
                            <b>Errors (must fix):</b>
                            <ul style={{ marginTop: 8 }}>
                                {analysis.errors.map((e) => (
                                    <li key={e}>{e}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {analysis.warnings.length > 0 && (
                        <div style={{ marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #fde68a', background: '#fffbeb' }}>
                            <b>Warnings (may break uploads):</b>
                            <ul style={{ marginTop: 8 }}>
                                {analysis.warnings.map((w) => (
                                    <li key={w}>{w}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {analysis.errors.length === 0 && code.trim() && (
                        <div style={{ marginTop: 10, padding: 10, borderRadius: 10, border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
                            <b>Looks upload-compatible</b> (by simple rules).
                        </div>
                    )}

                    <details style={{ marginTop: 12 }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 800 }}>Show detected info</summary>
                        <div style={{ marginTop: 10, fontFamily: 'ui-monospace, monospace', fontSize: 12 }}>
                            <div>hasDefaultExport: {String(analysis.hasDefaultExport)}</div>
                            <div>defaultExportName: {analysis.defaultExportName ?? '(unknown)'}</div>
                            <div>namedExports: {analysis.namedExportNames.length ? analysis.namedExportNames.join(', ') : '(none)'}</div>
                            <div>relativeImports: {String(analysis.hasRelativeImports)}</div>
                            <div>usesNextImage: {String(analysis.usesNextImage)}</div>
                            <div>usesNextLink: {String(analysis.usesNextLink)}</div>
                            <div>referencesWindowOrDocument: {String(analysis.referencesWindowOrDocument)}</div>
                            <div>hasUseClientDirective: {String(analysis.hasUseClientDirective)}</div>
                            <div style={{ marginTop: 8, opacity: 0.75 }}>
                                imports:
                                <pre style={{ whiteSpace: 'pre-wrap' }}>{analysis.importLines.join('\n') || '(none)'}</pre>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
        </div>
    )
}