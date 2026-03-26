import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B SaaS & Enterprise Software Industry Solutions | GTMstack.pro',
  description:
    'Operator-built GTM systems for B2B SaaS and enterprise software. Unified ABM, RevOps, and measurable pipeline outcomes across complex growth motions.',
}

export default function B2BSaaSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
