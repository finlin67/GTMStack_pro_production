import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fleet Management & Logistics Industry Solutions | GTMstack.pro',
  description:
    'Connected fleet intelligence and operational velocity. $1.2M pipeline in 90 days, 35% MQL increase, 87% marketing-sourced pipeline growth. Route optimization, telematics, sustainability.',
}

export default function FleetManagementLogisticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
