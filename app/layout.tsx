import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Montserrat, Rubik } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

/** Industry stitch template (IndustrySingleStitchLayout) — loaded once, self-hosted via next/font */
const stitchMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-stitch-montserrat',
  display: 'swap',
})
const stitchRubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-stitch-rubik',
  display: 'swap',
})

export const metadata: Metadata = {
  icons: {
    icon: '/gtmstack-logo.png',
  },
  title: {
    default: 'GTMstack.pro | Strategic GTM Consulting',
    template: '%s | GTMstack.pro',
  },
  description:
    'Strategic go-to-market consulting for B2B technology companies. From GTM strategy to revenue analytics, marketing automation, and growth optimization.',
  keywords: [
    'GTM consulting',
    'go-to-market strategy',
    'B2B marketing',
    'revenue operations',
    'marketing automation',
    'growth strategy',
  ],
  authors: [{ name: 'GTMstack.pro' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gtmstack.pro',
    siteName: 'GTMstack.pro',
    title: 'GTMstack.pro | Strategic GTM Consulting',
    description:
      'Strategic go-to-market consulting for B2B technology companies.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTMstack.pro | Strategic GTM Consulting',
    description:
      'Strategic go-to-market consulting for B2B technology companies.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${stitchMontserrat.variable} ${stitchRubik.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

