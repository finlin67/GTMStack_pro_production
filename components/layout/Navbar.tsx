"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X, Cloud, Landmark, Heart, Terminal, ShoppingBag, Shield, Leaf, Cpu } from "lucide-react"
import MegaMenu from "./MegaMenu"
import { MobileMegaMenu } from "@/components/ui/MobileMegaMenu"
import { industryItems } from "@/content/industries"

type IndustryIcon = typeof Cloud

export default function Navbar() {
  // Guard against React 18 event replay / pre-hydration interactions causing SSR/CSR markup divergence.
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [industriesLeft, setIndustriesLeft] = useState<number>(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const industriesMenuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const industriesButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const industriesHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const featuredIndustries = industryItems.filter((i) => i.featured).sort((a, b) => a.title.localeCompare(b.title))

  const industryIconMap: Record<string, IndustryIcon> = {
    Cloud,
    Landmark,
    Heart,
    Terminal,
    ShoppingBag,
    Shield,
    Leaf,
    Cpu,
  }

  useEffect(() => {
    setHydrated(true)
  }, [])

  // Close on outside click for Expertise menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  // Close on outside click for Industries menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        industriesOpen &&
        industriesMenuRef.current &&
        industriesButtonRef.current &&
        !industriesMenuRef.current.contains(event.target as Node) &&
        !industriesButtonRef.current.contains(event.target as Node)
      ) {
        setIndustriesOpen(false)
      }
    }

    if (industriesOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [industriesOpen])

  // Close on ESC key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (open) setOpen(false)
        if (industriesOpen) setIndustriesOpen(false)
      }
    }

    if (open || industriesOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open, industriesOpen])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (industriesHoverTimeoutRef.current) {
        clearTimeout(industriesHoverTimeoutRef.current)
      }
    }
  }, [])

  // Handle hover with delay to prevent closing when moving to menu (Expertise)
  const handleMouseEnter = () => {
    if (!hydrated) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (!hydrated) return
    // Small delay before closing to allow mouse to move to menu
    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  // Handle hover with delay to prevent closing when moving to menu (Industries)
  const handleIndustriesMouseEnter = () => {
    if (!hydrated) return
    if (industriesHoverTimeoutRef.current) {
      clearTimeout(industriesHoverTimeoutRef.current)
      industriesHoverTimeoutRef.current = null
    }
    setIndustriesOpen(true)
    updateIndustriesPosition()
  }

  const handleIndustriesMouseLeave = () => {
    if (!hydrated) return
    // Small delay before closing to allow mouse to move to menu
    industriesHoverTimeoutRef.current = setTimeout(() => {
      setIndustriesOpen(false)
    }, 150)
  }

  const updateIndustriesPosition = () => {
    if (!industriesButtonRef.current || !navRef.current) return
    const buttonRect = industriesButtonRef.current.getBoundingClientRect()
    const navRect = navRef.current.getBoundingClientRect()
    const left = buttonRect.left - navRect.left
    setIndustriesLeft(left)
  }

  useEffect(() => {
    updateIndustriesPosition()
    const handleResize = () => updateIndustriesPosition()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const safeOpen = hydrated ? open : false
  const safeIndustriesOpen = hydrated ? industriesOpen : false
  const safeMobileOpen = hydrated ? mobileOpen : false

  return (
    <header className="sticky top-0 z-50 bg-slate-950/92 backdrop-blur-xl border-b border-slate-800/80">
      <nav className="container-width relative" ref={navRef}>
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 md:h-11 md:w-11 shrink-0 rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center shadow-[0_10px_30px_rgba(15,23,42,0.6)]">
              <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.22em] text-slate-200">
                GTM
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-semibold text-[15px] md:text-[16px] text-white tracking-[-0.01em]">
                GTMStack<span className="text-brand-300">.pro</span>
              </span>
              <span className="hidden sm:inline text-[11px] text-slate-400 tracking-[0.08em] uppercase">
                Strategic GTM consulting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => hydrated && setOpen(!open)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-flex items-center gap-1 text-[13px] font-semibold tracking-[0.02em] text-slate-200/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full px-3 py-1.5 relative after:absolute after:left-3 after:-bottom-1 after:h-px after:w-0 after:bg-brand-400 after:transition-all hover:after:w-[calc(100%-1.5rem)]"
                aria-expanded={safeOpen}
                aria-haspopup="true"
              >
                Expertise <ChevronDown className={`h-4 w-4 transition-transform ${safeOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <Link
              href="/case-studies"
              className="relative text-[13px] font-semibold tracking-[0.02em] text-slate-200/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full px-3 py-1.5 after:absolute after:left-3 after:-bottom-1 after:h-px after:w-0 after:bg-brand-400 after:transition-all hover:after:w-[calc(100%-1.5rem)]"
            >
              Case Studies
            </Link>
            <Link
              href="/gallery"
              className="relative text-[13px] font-semibold tracking-[0.02em] text-slate-200/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full px-3 py-1.5 after:absolute after:left-3 after:-bottom-1 after:h-px after:w-0 after:bg-brand-400 after:transition-all hover:after:w-[calc(100%-1.5rem)]"
            >
              Gallery
            </Link>
            <div className="relative">
              <button
                ref={industriesButtonRef}
                onClick={() => hydrated && setIndustriesOpen(!industriesOpen)}
                onMouseEnter={handleIndustriesMouseEnter}
                onMouseLeave={handleIndustriesMouseLeave}
                className="inline-flex items-center gap-1 text-[13px] font-semibold tracking-[0.02em] text-slate-200/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full px-3 py-1.5 relative after:absolute after:left-3 after:-bottom-1 after:h-px after:w-0 after:bg-brand-400 after:transition-all hover:after:w-[calc(100%-1.5rem)]"
                aria-expanded={safeIndustriesOpen}
                aria-haspopup="true"
              >
                Industries <ChevronDown className={`h-4 w-4 transition-transform ${safeIndustriesOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <Link
              href="/about"
              className="relative text-[13px] font-semibold tracking-[0.02em] text-slate-200/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full px-3 py-1.5 after:absolute after:left-3 after:-bottom-1 after:h-px after:w-0 after:bg-brand-400 after:transition-all hover:after:w-[calc(100%-1.5rem)]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="btn bg-gradient-to-r from-brand-500 to-brand-400 text-white hover:from-brand-400 hover:to-brand-300 px-5 py-2.5 text-[13px] font-semibold rounded-full shadow-[0_12px_40px_rgba(59,130,246,0.45)] hover:shadow-[0_14px_50px_rgba(129,140,248,0.6)] focus-visible:ring-brand-500"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => hydrated && setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-200 hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle menu"
          >
            {safeMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMegaMenu isOpen={safeMobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Desktop MegaMenu - positioned relative to nav container */}
      {safeOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 right-0 top-full pt-2 hidden md:block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container-width">
            <MegaMenu />
          </div>
        </div>
      )}

      {/* Desktop Industries Dropdown - positioned relative to nav container */}
      {safeIndustriesOpen && (
        <div
          ref={industriesMenuRef}
          className="absolute top-full pt-2 hidden md:block"
          onMouseEnter={handleIndustriesMouseEnter}
          onMouseLeave={handleIndustriesMouseLeave}
          style={{ left: industriesLeft }}
        >
          <div className="container-width">
            <div className="max-w-sm">
              <div className="rounded-2xl border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_rgba(15,23,42,0.8)] overflow-hidden backdrop-blur-2xl">
                <div className="p-3">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400 mb-2">
                    Featured industries
                  </div>
                  <div className="divide-y divide-white/5">
                    {featuredIndustries.map((industry) => {
                      const Icon = industry.icon ? industryIconMap[industry.icon] ?? Cloud : Cloud
                      return (
                        <Link
                          key={industry.slug}
                          href={`/industries/${industry.slug}`}
                          className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-200">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] font-semibold text-white">{industry.title}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{industry.description}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
                <div className="border-t border-white/10 bg-slate-900/80">
                  <Link
                    href="/industries"
                    className="flex items-center justify-between gap-2 px-3 py-3 text-sm font-medium text-brand-200 hover:text-white transition-colors"
                  >
                    View all industries
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
