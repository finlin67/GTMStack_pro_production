import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter, Montserrat, Outfit, Rubik } from 'next/font/google'
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

/** Site UI/body + navigation */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/** Headings and display lines (e.g. nav tagline, section labels) */
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  icons: {
    icon: '/gtmstack-logo.png',
  },
  title: {
    default: 'GTMStack.pro | Operator-built GTM portfolio',
    template: '%s | GTMStack.pro',
  },
  description:
    'An operator-built GTM portfolio: case studies, systems, messaging, and field-tested artifacts from complex B2B work.',
  keywords: [
    'B2B marketing operations',
    'go-to-market systems',
    'demand generation',
    'revenue operations',
    'marketing stack',
    'GTM design',
  ],
  authors: [{ name: 'GTMStack.pro' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gtmstack.pro',
    siteName: 'GTMStack.pro',
    title: 'GTMStack.pro | Operator-built GTM portfolio',
    description:
      'A live GTM portfolio with case studies, systems thinking, and measurable work across complex B2B teams.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTMStack.pro | Operator-built GTM portfolio',
    description:
      'A live GTM portfolio with case studies, systems thinking, and measurable work across complex B2B teams.',
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${outfit.variable} ${stitchMontserrat.variable} ${stitchRubik.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-grow outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-background)]"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

