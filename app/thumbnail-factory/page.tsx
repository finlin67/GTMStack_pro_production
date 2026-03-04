'use client'

import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'

type AnimationModule = {
  default?: ComponentType
}

type AnimationItem = {
  componentName: string
  safeId: string
  Component: ComponentType
  hasRenderableComponent: boolean
}

function loadAnimations(): AnimationItem[] {
  const context = (require as unknown as { context: Function }).context(
    '../../src/components/animations',
    false,
    /\.tsx$/
  ) as {
    keys: () => string[]
    (key: string): AnimationModule
  }

  return context
    .keys()
    .filter((key) => !key.includes('/index.'))
    .sort((a, b) => a.localeCompare(b))
    .map((key) => {
      const fileName = key.replace('./', '')
      const componentName = fileName.replace(/\.tsx$/, '')
      const safeId = componentName
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '')

      const mod = context(key)
      const candidate = (mod.default ?? (mod as unknown)) as unknown
      const hasRenderableComponent = typeof candidate === 'function'

      return {
        componentName,
        safeId,
        Component: hasRenderableComponent ? (candidate as ComponentType) : (() => null),
        hasRenderableComponent,
      }
    })
}

const animations = loadAnimations()

export default function ThumbnailFactoryPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <main
      className="min-h-screen p-8"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <section className="mx-auto w-full max-w-[1280px] space-y-4">
        <h1 className="text-xl font-semibold text-slate-100">Thumbnail Factory Stage</h1>
        <p className="text-sm text-slate-400">
          {animations.length} animations staged at 600×400 for automated screenshots.
        </p>

        <div className="grid grid-cols-1 gap-8">
          {animations.map(({ componentName, safeId, Component, hasRenderableComponent }) => (
            <article key={componentName} className="space-y-2">
              <p className="text-xs tracking-wide text-slate-500">{componentName}</p>
              <div
                id={`thumb-${safeId}`}
                data-testid={componentName}
                data-thumbnail-item="true"
                data-has-component={hasRenderableComponent ? 'true' : 'false'}
                className="relative overflow-hidden rounded-xl border border-slate-800"
                style={{
                  width: '600px',
                  height: '400px',
                  minWidth: '600px',
                  minHeight: '400px',
                  backgroundColor: 'var(--color-background)',
                }}
              >
                <div className="h-full w-full">
                  {isMounted && hasRenderableComponent ? <Component /> : null}
                  {isMounted && !hasRenderableComponent ? (
                    <div className="flex h-full w-full items-center justify-center text-sm text-rose-300">
                      Missing default export
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
