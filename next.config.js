const path = require('path')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const baseConfig = {
  distDir: '.next',
  /** When a parent directory has another lockfile, Next can infer the wrong root; pin this app folder. */
  outputFileTracingRoot: path.join(__dirname),
  /**
   * Next.js 16 defaults to Turbopack in dev; @next/mdx still injects a `webpack` hook.
   * Declaring `turbopack` avoids the "webpack config and no turbopack config" hard error.
   */
  turbopack: {},
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true,
  },
  allowedDevOrigins: [
    '*.replit.dev',
    '*.repl.co',
    '*.kirk.replit.dev',
    'localhost:5000',
    '127.0.0.1:5000',
  ],
  async redirects() {
    return [
      { source: '/favicon.ico', destination: '/gtmstack-logo.png', permanent: false },
      {
        source: '/expertise/analytics',
        destination: '/expertise/marketing-analytics-reporting',
        permanent: true,
      },
      {
        source: '/expertise/competitive-intel',
        destination: '/expertise/product-marketing',
        permanent: true,
      },
      {
        source: '/expertise/lead-gen-scoring',
        destination: '/expertise/demand-generation',
        permanent: true,
      },
      {
        source: '/expertise/roi-analysis',
        destination: '/expertise/revenue-operations',
        permanent: true,
      },
      {
        source: '/expertise/web-design-ui-ux',
        destination: '/expertise/digital-marketing',
        permanent: true,
      },
      {
        source: '/expertise/strategy',
        destination: '/expertise/strategy-insights',
        permanent: true,
      },
      {
        source: '/industries/ecommerce',
        destination: '/industries/retail',
        permanent: true,
      },
      {
        source: '/industries/retail-ecommerce',
        destination: '/industries/retail',
        permanent: true,
      },
      {
        source: '/industries/fintech',
        destination: '/industries/financial-services',
        permanent: true,
      },
      {
        source: '/industries/b2b-saas',
        destination: '/industries/technology-saas',
        permanent: true,
      },
      {
        source: '/industries/healthtech',
        destination: '/industries/healthcare',
        permanent: true,
      },
      {
        source: '/industries/public-sector-education',
        destination: '/industries/non-profit-education',
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(baseConfig)



