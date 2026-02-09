import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retail Industry Solutions | GTMstack.pro',
  description:
    'Omnichannel orchestration and unified commerce for retail. 164% YoY traffic growth, 40-60% conversion lift, 2,800% ROI. Bridging physical-to-digital, cart recovery, and retail media.',
}

export default function RetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
