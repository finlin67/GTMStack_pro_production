import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manufacturing Industry Solutions | GTMstack.pro',
  description:
    'Operator-built GTM systems for industrial and manufacturing teams, from vertical ABM to reporting, pipeline visibility, and complex buying-group motion.',
}

export default function ManufacturingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
