import React from 'react'

type Props = {
  pageTitle?: string
  theme?: 'dark' | 'light'
  heroVisualId?: string
  content?: any
}

export default function ExpertiseMainTemplate({
  pageTitle = 'Expertise',
  content,
}: Props) {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
      <p className="mb-4 opacity-70">
        (Temporary template) If you can see this, expertise.main is wired correctly.
      </p>
      <pre className="bg-gray-100 rounded p-4 overflow-auto text-sm">
        {JSON.stringify(content ?? null, null, 2)}
      </pre>
    </main>
  )
}
