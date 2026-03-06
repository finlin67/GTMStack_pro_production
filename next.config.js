const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

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
}

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const forceStatic = process.env.STATIC_EXPORT === 'true'
  
  const config = {
    ...baseConfig,
  }
  
  // Only use static export when explicitly requested via STATIC_EXPORT=true
  if (forceStatic) {
    config.output = 'export'
    config.distDir = 'out'
    config.trailingSlash = true
  } else {
    config.distDir = '.next'
  }
  
  return withMDX(config)
}

