import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Services Industry Solutions | GTMstack.pro',
  description:
    'Regulatory-first marketing and revenue architecture for fintech and banking leaders. Wall Street rigor, Silicon Valley velocity. 87% YoY pipeline, 180% MQL-to-SQL lift.',
}

export default function FinancialServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
