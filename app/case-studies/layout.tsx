import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Real GTM programs with measurable results — ABM systems, pipeline rebuilds, reporting overhauls, and field-tested artifacts from complex B2B work.',
  openGraph: {
    title: 'Case Studies | GTMStack.pro',
    description:
      'Real GTM programs with measurable results — ABM systems, pipeline rebuilds, reporting overhauls, and field-tested artifacts from complex B2B work.',
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
