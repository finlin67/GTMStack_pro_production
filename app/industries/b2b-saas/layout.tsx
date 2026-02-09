import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'B2B SaaS & Enterprise Software Industry Solutions | GTMstack.pro',
  description:
    'Revenue architecture for B2B SaaS and enterprise software. Unified revenue operating model—87% YoY pipeline, 180% MQL-to-SQL lift, 25% NRR increase. The Revenue Architect.',
}

export default function B2BSaaSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
