import Link from 'next/link'
import { Linkedin, Twitter, Github, Mail, ArrowUpRight } from 'lucide-react'
import { PILLARS } from '@/lib/types'

function normalizeExternalProfile(url?: string): string | null {
  if (!url) return null

  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    const host = parsed.hostname.toLowerCase()
    const placeholderHosts = new Set([
      'linkedin.com',
      'www.linkedin.com',
      'twitter.com',
      'www.twitter.com',
      'x.com',
      'www.x.com',
      'github.com',
      'www.github.com',
    ])
    if (placeholderHosts.has(host)) return null
    return parsed.toString()
  } catch {
    return null
  }
}

const linkedinUrl = normalizeExternalProfile(process.env.NEXT_PUBLIC_LINKEDIN_URL)
const twitterUrl = normalizeExternalProfile(process.env.NEXT_PUBLIC_TWITTER_URL)
const githubUrl = normalizeExternalProfile(process.env.NEXT_PUBLIC_GITHUB_URL)

const footerLinks = {
  expertise: PILLARS.map(p => ({ label: p.title, href: p.href })),
  company: [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Industries', href: '/industries' },
    { label: 'Background', href: '/resume' },
  ],
  connect: [
    { label: 'Contact', href: '/contact' },
    ...(linkedinUrl ? [{ label: 'LinkedIn', href: linkedinUrl, external: true as const }] : []),
    ...(twitterUrl ? [{ label: 'Twitter', href: twitterUrl, external: true as const }] : []),
  ],
}

const socialLinks = [
  ...(linkedinUrl ? [{ icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' }] : []),
  ...(twitterUrl ? [{ icon: Twitter, href: twitterUrl, label: 'Twitter' }] : []),
  ...(githubUrl ? [{ icon: Github, href: githubUrl, label: 'GitHub' }] : []),
  { icon: Mail, href: 'mailto:hello@gtmstack.pro', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="container-width py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.6)] md:h-11 md:w-11">
                <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.22em] text-slate-200">
                  GTM
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-[16px] text-white tracking-[-0.01em]">
                  GTMStack<span className="text-brand-300">.pro</span>
                </span>
                <span className="text-[11px] text-slate-400 tracking-[0.08em] uppercase">
                  Operator-built GTM portfolio
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-slate-400">
              One operator&apos;s public GTM reference: clear layers, honest measurement, and work you can trace, not a capabilities brochure.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-400 shadow-[0_10px_24px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Expertise Links */}
          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white">Expertise</h3>
            <ul className="space-y-3">
              {footerLinks.expertise.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex py-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex py-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  {'external' in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 py-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex py-1.5 text-[13px] text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-width flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-center text-[13px] text-slate-500 sm:text-left">
            © {new Date().getFullYear()} GTMStack.pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[13px] text-slate-500 hover:text-slate-300 hover:underline focus-visible:underline transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-[13px] text-slate-500 hover:text-slate-300 hover:underline focus-visible:underline transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

