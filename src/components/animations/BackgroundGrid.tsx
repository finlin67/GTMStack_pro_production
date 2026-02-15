'use client';

import React from 'react';

export default function BackgroundGrid() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
