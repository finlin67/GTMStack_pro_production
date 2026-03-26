import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Services Industry Solutions | GTMstack.pro',
  description:
    'Regulatory-first GTM systems for fintech and banking teams, with enterprise pipeline, measurement, and trust-building built for complex markets.',
}

export default function FinancialServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
