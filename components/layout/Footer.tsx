import Link from 'next/link'
import { Linkedin, Twitter, Github, Mail, ArrowUpRight } from 'lucide-react'
import { PILLARS } from '@/lib/types'

const footerLinks = {
  expertise: PILLARS.map(p => ({ label: p.title, href: p.href })),
  company: [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Industries', href: '/industries' },
    { label: 'Resume', href: '/resume' },
  ],
  connect: [
    { label: 'Contact', href: '/contact' },
    { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@gtmstack.pro', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="container-width py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 md:h-11 md:w-11 shrink-0 rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center shadow-[0_10px_30px_rgba(15,23,42,0.6)]">
                <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.22em] text-slate-200">
                  GTM
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-semibold text-[16px] text-white tracking-[-0.01em]">
                  GTMStack<span className="text-brand-300">.pro</span>
                </span>
                <span className="text-[11px] text-slate-400 tracking-[0.08em] uppercase">
                  Strategic GTM consulting
                </span>
              </div>
            </Link>
            <p className="mt-4 text-[13px] text-slate-400 max-w-xs leading-relaxed">
              Strategic GTM consulting for B2B technology companies. From strategy to execution, we help you grow faster.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-colors shadow-[0_10px_24px_rgba(15,23,42,0.5)]"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Expertise Links */}
          <div>
            <h3 className="font-semibold text-white text-[13px] mb-4 tracking-[0.14em] uppercase">Expertise</h3>
            <ul className="space-y-3">
              {footerLinks.expertise.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white text-[13px] mb-4 tracking-[0.14em] uppercase">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-semibold text-white text-[13px] mb-4 tracking-[0.14em] uppercase">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  {'external' in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[13px] text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[13px] text-slate-400 hover:text-white transition-colors"
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
        <div className="container-width py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-500">
            © {new Date().getFullYear()} GTMstack.pro. All rights reserved.
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
