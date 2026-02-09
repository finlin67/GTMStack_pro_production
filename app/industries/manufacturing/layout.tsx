import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manufacturing Industry Solutions | GTMstack.pro',
  description:
    'Physical-to-digital revenue architecture for industrial leaders. Discrete & repetitive manufacturing. $1.2M pipeline in 90 days, 190% faster reporting. 2-Speed Architecture, Digital Twin Marketing.',
}

export default function ManufacturingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
