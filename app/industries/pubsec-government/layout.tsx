import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Public Sector & Government Industry Solutions | GTMstack.pro',
  description:
    'Modernizing citizen services with 2-Speed Architecture. 190% faster reporting, 24x team growth, 100% digital service availability. Trust, transparency, and agile cloud engagement for government.',
}

export default function PubsecGovernmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
