'use client'

import { getAnimationById } from '@/src/data/animations'

export function PreviewClient({ animationId }: { animationId: string }) {
  const entry = getAnimationById(animationId)

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: '#0a0f1e',
    overflow: 'hidden',
  }

  if (!entry) {
    return (
      <div
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          fontSize: '14px',
        }}
      >
        Animation not found: {animationId}
      </div>
    )
  }

  const Component = entry.component

  return (
    <div data-preview-root style={containerStyle}>
      <Component />
    </div>
  )
}
