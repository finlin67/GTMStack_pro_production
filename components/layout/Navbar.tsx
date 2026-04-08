"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, useMemo } from "react"
import { ChevronDown, Menu, X, Cloud, Landmark, Heart, Terminal, ShoppingBag, Shield, Leaf, Cpu } from "lucide-react"
import MegaMenu from "./MegaMenu"
import { MobileMegaMenu } from "@/components/ui/MobileMegaMenu"
import { industryItems } from "@/content/industries"
import { CaseStudiesNavPanel } from "./CaseStudiesNavPanel"
import { BlogNavPanel } from "./BlogNavPanel"
import { caseStudyItems, getFeaturedCaseStudies } from "@/src/data/caseStudies"

type IndustryIcon = typeof Cloud

/** Desktop mega triggers */
const navTriggerClasses =
  "group relative inline-flex items-center gap-1.5 overflow-hidden rounded-[0.95rem] border border-white/[0.04] px-4 py-2.5 text-[13px] font-semibold tracking-[0.015em] text-white/82 transition-all duration-200 hover:-translate-y-px hover:border-cyan-400/18 hover:bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(255,255,255,0.03))] hover:text-cyan-50 data-[open=true]:border-cyan-300/22 data-[open=true]:bg-[linear-gradient(180deg,rgba(34,211,238,0.15),rgba(255,255,255,0.04))] data-[open=true]:text-white data-[open=true]:shadow-[0_12px_30px_rgba(8,145,178,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"

const navAboutClasses =
  "group relative inline-flex items-center overflow-hidden rounded-[0.95rem] border border-white/[0.04] px-4 py-2.5 text-[13px] font-semibold tracking-[0.015em] text-white/82 transition-all duration-200 hover:-translate-y-px hover:border-cyan-400/18 hover:bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(255,255,255,0.03))] hover:text-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"

const navActiveClasses =
  "border-cyan-300/22 bg-[linear-gradient(180deg,rgba(34,211,238,0.16),rgba(255,255,255,0.04))] text-white shadow-[0_12px_30px_rgba(8,145,178,0.16),inset_0_1px_0_rgba(255,255,255,0.08)]"

const NAV_IDS = {
  expertise: { panel: "nav-panel-expertise", button: "nav-button-expertise" },
  industries: { panel: "nav-panel-industries", button: "nav-button-industries" },
  caseStudies: { panel: "nav-panel-case-studies", button: "nav-button-case-studies" },
  blog: { panel: "nav-panel-blog", button: "nav-button-blog" },
} as const

function focusFirstLink(panelRef: React.RefObject<HTMLDivElement | null>) {
  requestAnimationFrame(() => {
    const el = panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')
    el?.focus()
  })
}

function NavItemAccent({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-3 bottom-[0.38rem] h-px rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-200/95 to-brand-300/0 transition-opacity duration-200 ${
        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    />
  )
}

export default function Navbar() {
  const pathname = usePathname()
  // Guard against React 18 event replay / pre-hydration interactions causing SSR/CSR markup divergence.
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [industriesLeft, setIndustriesLeft] = useState<number>(0)
  const [caseStudiesLeft, setCaseStudiesLeft] = useState<number>(0)
  const [blogLeft, setBlogLeft] = useState<number>(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const industriesMenuRef = useRef<HTMLDivElement>(null)
  const caseStudiesMenuRef = useRef<HTMLDivElement>(null)
  const blogMenuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const industriesButtonRef = useRef<HTMLButtonElement>(null)
  const caseStudiesButtonRef = useRef<HTMLButtonElement>(null)
  const blogButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const industriesHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const caseStudiesHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const blogHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const featuredIndustries = industryItems.filter((i) => i.featured).sort((a, b) => a.title.localeCompare(b.title))

  const featuredCaseStudyNav = useMemo(() => {
    const featured = getFeaturedCaseStudies()
    return (featured.length ? featured : caseStudyItems).slice(0, 3)
  }, [])

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

  // Close on outside click for any flyout
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const t = event.target as Node
      const inside =
        (menuRef.current?.contains(t) ?? false) ||
        (buttonRef.current?.contains(t) ?? false) ||
        (industriesMenuRef.current?.contains(t) ?? false) ||
        (industriesButtonRef.current?.contains(t) ?? false) ||
        (caseStudiesMenuRef.current?.contains(t) ?? false) ||
        (caseStudiesButtonRef.current?.contains(t) ?? false) ||
        (blogMenuRef.current?.contains(t) ?? false) ||
        (blogButtonRef.current?.contains(t) ?? false)
      if (!inside) {
        setOpen(false)
        setIndustriesOpen(false)
        setCaseStudiesOpen(false)
        setBlogOpen(false)
      }
    }

    if (open || industriesOpen || caseStudiesOpen || blogOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, industriesOpen, caseStudiesOpen, blogOpen])

  // Close on ESC key; return focus to the trigger for keyboard users
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      if (hydrated && mobileOpen) {
        setMobileOpen(false)
        mobileMenuButtonRef.current?.focus()
        return
      }
      if (open) {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (industriesOpen) {
        setIndustriesOpen(false)
        industriesButtonRef.current?.focus()
        return
      }
      if (caseStudiesOpen) {
        setCaseStudiesOpen(false)
        caseStudiesButtonRef.current?.focus()
        return
      }
      if (blogOpen) {
        setBlogOpen(false)
        blogButtonRef.current?.focus()
      }
    }

    if (open || industriesOpen || caseStudiesOpen || blogOpen || (hydrated && mobileOpen)) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [hydrated, mobileOpen, open, industriesOpen, caseStudiesOpen, blogOpen])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      if (industriesHoverTimeoutRef.current) clearTimeout(industriesHoverTimeoutRef.current)
      if (caseStudiesHoverTimeoutRef.current) clearTimeout(caseStudiesHoverTimeoutRef.current)
      if (blogHoverTimeoutRef.current) clearTimeout(blogHoverTimeoutRef.current)
    }
  }, [])

  const updateFlyoutLeft = (buttonRef: React.RefObject<HTMLButtonElement | null>, setLeft: (n: number) => void) => {
    if (!buttonRef.current || !navRef.current) return
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const navRect = navRef.current.getBoundingClientRect()
    setLeft(buttonRect.left - navRect.left)
  }

  useEffect(() => {
    const handleResize = () => {
      updateFlyoutLeft(industriesButtonRef, setIndustriesLeft)
      updateFlyoutLeft(caseStudiesButtonRef, setCaseStudiesLeft)
      updateFlyoutLeft(blogButtonRef, setBlogLeft)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle hover with delay to prevent closing when moving to menu (Expertise)
  const handleMouseEnter = () => {
    if (!hydrated) return
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIndustriesOpen(false)
    setCaseStudiesOpen(false)
    setBlogOpen(false)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (!hydrated) return
    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }

  // Industries
  const handleIndustriesMouseEnter = () => {
    if (!hydrated) return
    if (industriesHoverTimeoutRef.current) {
      clearTimeout(industriesHoverTimeoutRef.current)
      industriesHoverTimeoutRef.current = null
    }
    setOpen(false)
    setCaseStudiesOpen(false)
    setBlogOpen(false)
    setIndustriesOpen(true)
    updateFlyoutLeft(industriesButtonRef, setIndustriesLeft)
  }

  const handleIndustriesMouseLeave = () => {
    if (!hydrated) return
    industriesHoverTimeoutRef.current = setTimeout(() => {
      setIndustriesOpen(false)
    }, 150)
  }

  // Case Studies
  const handleCaseStudiesMouseEnter = () => {
    if (!hydrated) return
    if (caseStudiesHoverTimeoutRef.current) {
      clearTimeout(caseStudiesHoverTimeoutRef.current)
      caseStudiesHoverTimeoutRef.current = null
    }
    setOpen(false)
    setIndustriesOpen(false)
    setBlogOpen(false)
    setCaseStudiesOpen(true)
    updateFlyoutLeft(caseStudiesButtonRef, setCaseStudiesLeft)
  }

  const handleCaseStudiesMouseLeave = () => {
    if (!hydrated) return
    caseStudiesHoverTimeoutRef.current = setTimeout(() => {
      setCaseStudiesOpen(false)
    }, 150)
  }

  // Blog
  const handleBlogMouseEnter = () => {
    if (!hydrated) return
    if (blogHoverTimeoutRef.current) {
      clearTimeout(blogHoverTimeoutRef.current)
      blogHoverTimeoutRef.current = null
    }
    setOpen(false)
    setIndustriesOpen(false)
    setCaseStudiesOpen(false)
    setBlogOpen(true)
    updateFlyoutLeft(blogButtonRef, setBlogLeft)
  }

  const handleBlogMouseLeave = () => {
    if (!hydrated) return
    blogHoverTimeoutRef.current = setTimeout(() => {
      setBlogOpen(false)
    }, 150)
  }

  const safeOpen = hydrated ? open : false
  const safeIndustriesOpen = hydrated ? industriesOpen : false
  const safeCaseStudiesOpen = hydrated ? caseStudiesOpen : false
  const safeBlogOpen = hydrated ? blogOpen : false
  const safeMobileOpen = hydrated ? mobileOpen : false
  const isExpertiseActive = pathname === "/expertise" || pathname?.startsWith("/expertise/")
  const isIndustriesActive = pathname === "/industries" || pathname?.startsWith("/industries/")
  const isCaseStudiesActive = pathname === "/case-studies" || pathname?.startsWith("/case-studies/")
  const isBlogActive = pathname === "/blog" || pathname?.startsWith("/blog/")
  const isAboutActive = pathname === "/about"
  const isGalleryActive = pathname === "/gallery" || pathname?.startsWith("/gallery/")

  // When a flyout opens while its trigger still has focus (keyboard), move focus into the panel
  useEffect(() => {
    if (!safeOpen || !hydrated) return
    if (document.activeElement !== buttonRef.current) return
    focusFirstLink(menuRef)
  }, [safeOpen, hydrated])

  useEffect(() => {
    if (!safeIndustriesOpen || !hydrated) return
    if (document.activeElement !== industriesButtonRef.current) return
    focusFirstLink(industriesMenuRef)
  }, [safeIndustriesOpen, hydrated])

  useEffect(() => {
    if (!safeCaseStudiesOpen || !hydrated) return
    if (document.activeElement !== caseStudiesButtonRef.current) return
    focusFirstLink(caseStudiesMenuRef)
  }, [safeCaseStudiesOpen, hydrated])

  useEffect(() => {
    if (!safeBlogOpen || !hydrated) return
    if (document.activeElement !== blogButtonRef.current) return
    focusFirstLink(blogMenuRef)
  }, [safeBlogOpen, hydrated])

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-slate-950/90 shadow-[0_18px_48px_rgba(2,6,23,0.28)] backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/82">
      <nav className="container-width relative font-sans text-slate-200" ref={navRef}>
        <div className="flex h-[74px] min-h-[74px] items-center justify-between md:h-[84px] md:min-h-[84px] lg:h-[90px] lg:min-h-[90px]">
          {/* Logo */}
          <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3 md:gap-4">
            <Image
              src="/gtmstack-logo.png"
              alt="GTMStack.pro"
              width={480}
              height={96}
              priority
              sizes="(max-width: 768px) 70vw, 440px"
              className="h-12 w-auto sm:h-14 md:h-16 lg:h-[4.5rem] max-w-[min(100%,calc(100vw-6.5rem))] sm:max-w-[min(480px,calc(100vw-8rem))] object-contain object-left"
            />
            <div className="hidden min-h-[2.5rem] flex-col justify-center border-l border-white/10 pl-2.5 leading-tight sm:flex md:min-h-[3rem] md:pl-4">
              <span className="font-display text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400/95 md:text-xs">
                Operator-built GTM portfolio
              </span>
            </div>
          </Link>

          {/* Desktop: Expertise → Industries → Case Studies → Blog → About → Contact */}
          <div className="hidden items-center justify-end md:flex">
            <div className="relative flex flex-wrap items-center gap-x-1 gap-y-2 overflow-hidden rounded-[1.45rem] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] px-2 py-2 shadow-[0_22px_48px_rgba(2,6,23,0.32),inset_0_1px_0_rgba(255,255,255,0.05)] lg:px-2.5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
            />
            <div className="relative">
              <button
                id={NAV_IDS.expertise.button}
                ref={buttonRef}
                type="button"
                onClick={() => {
                  if (!hydrated) return
                  setIndustriesOpen(false)
                  setCaseStudiesOpen(false)
                  setBlogOpen(false)
                  setOpen((v) => !v)
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    if (!hydrated) return
                    setIndustriesOpen(false)
                    setCaseStudiesOpen(false)
                    setBlogOpen(false)
                    setOpen(true)
                  }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`${navTriggerClasses} ${isExpertiseActive ? navActiveClasses : ""}`}
                data-open={safeOpen || isExpertiseActive}
                aria-expanded={safeOpen}
                aria-haspopup="true"
                aria-controls={safeOpen ? NAV_IDS.expertise.panel : undefined}
                aria-label="Expertise: how the GTM model is organized by pillar and topic"
              >
                <span className="relative z-10">Expertise</span>
                <ChevronDown
                  className={`relative z-10 h-4 w-4 text-slate-500 transition-all group-hover:text-cyan-200 ${
                    safeOpen || isExpertiseActive ? "rotate-180 text-cyan-200" : ""
                  }`}
                  aria-hidden="true"
                />
                <NavItemAccent active={safeOpen || isExpertiseActive} />
              </button>
            </div>
            <div className="relative">
              <button
                id={NAV_IDS.industries.button}
                ref={industriesButtonRef}
                onClick={() => {
                  if (!hydrated) return
                  setOpen(false)
                  setCaseStudiesOpen(false)
                  setBlogOpen(false)
                  setIndustriesOpen((v) => !v)
                }}
                onMouseEnter={handleIndustriesMouseEnter}
                onMouseLeave={handleIndustriesMouseLeave}
                className={`${navTriggerClasses} ${isIndustriesActive ? navActiveClasses : ""}`}
                data-open={safeIndustriesOpen || isIndustriesActive}
                aria-expanded={safeIndustriesOpen}
                aria-haspopup="true"
                aria-label="Industries: where the model meets real markets"
              >
                <span className="relative z-10">Industries</span>
                <ChevronDown
                  className={`relative z-10 h-4 w-4 text-slate-500 transition-all group-hover:text-cyan-200 ${
                    safeIndustriesOpen || isIndustriesActive ? "rotate-180 text-cyan-200" : ""
                  }`}
                />
                <NavItemAccent active={safeIndustriesOpen || isIndustriesActive} />
              </button>
            </div>
            <div className="relative">
              <button
                id={NAV_IDS.caseStudies.button}
                ref={caseStudiesButtonRef}
                type="button"
                onClick={() => {
                  if (!hydrated) return
                  setOpen(false)
                  setIndustriesOpen(false)
                  setBlogOpen(false)
                  setCaseStudiesOpen((v) => !v)
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    if (!hydrated) return
                    setOpen(false)
                    setIndustriesOpen(false)
                    setBlogOpen(false)
                    setCaseStudiesOpen(true)
                  }
                }}
                onMouseEnter={handleCaseStudiesMouseEnter}
                onMouseLeave={handleCaseStudiesMouseLeave}
                className={`${navTriggerClasses} ${isCaseStudiesActive ? navActiveClasses : ""}`}
                data-open={safeCaseStudiesOpen || isCaseStudiesActive}
                aria-expanded={safeCaseStudiesOpen}
                aria-haspopup="true"
                aria-controls={safeCaseStudiesOpen ? NAV_IDS.caseStudies.panel : undefined}
                aria-label="Case Studies: proof and results"
              >
                <span className="relative z-10">Case Studies</span>
                <ChevronDown
                  className={`relative z-10 h-4 w-4 text-slate-500 transition-all group-hover:text-cyan-200 ${
                    safeCaseStudiesOpen || isCaseStudiesActive ? "rotate-180 text-cyan-200" : ""
                  }`}
                  aria-hidden="true"
                />
                <NavItemAccent active={safeCaseStudiesOpen || isCaseStudiesActive} />
              </button>
            </div>
            <div className="relative">
              <button
                id={NAV_IDS.blog.button}
                ref={blogButtonRef}
                type="button"
                onClick={() => {
                  if (!hydrated) return
                  setOpen(false)
                  setIndustriesOpen(false)
                  setCaseStudiesOpen(false)
                  setBlogOpen((v) => !v)
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault()
                    if (!hydrated) return
                    setOpen(false)
                    setIndustriesOpen(false)
                    setCaseStudiesOpen(false)
                    setBlogOpen(true)
                  }
                }}
                onMouseEnter={handleBlogMouseEnter}
                onMouseLeave={handleBlogMouseLeave}
                className={`${navTriggerClasses} ${isBlogActive ? navActiveClasses : ""}`}
                data-open={safeBlogOpen || isBlogActive}
                aria-expanded={safeBlogOpen}
                aria-haspopup="true"
                aria-controls={safeBlogOpen ? NAV_IDS.blog.panel : undefined}
                aria-label="Blog: articles and field notes"
              >
                <span className="relative z-10">Blog</span>
                <ChevronDown
                  className={`relative z-10 h-4 w-4 text-slate-500 transition-all group-hover:text-cyan-200 ${
                    safeBlogOpen || isBlogActive ? "rotate-180 text-cyan-200" : ""
                  }`}
                  aria-hidden="true"
                />
                <NavItemAccent active={safeBlogOpen || isBlogActive} />
              </button>
            </div>
            <Link
              href="/about"
              className={`${navAboutClasses} ${isAboutActive ? navActiveClasses : ""}`}
              aria-label="About: who built this site"
              aria-current={isAboutActive ? "page" : undefined}
            >
              <span className="relative z-10">About</span>
              <NavItemAccent active={isAboutActive} />
            </Link>
            <Link
              href="/gallery"
              className={`${navAboutClasses} ${isGalleryActive ? navActiveClasses : ""}`}
              aria-label="Gallery: animation and visual work"
              aria-current={isGalleryActive ? "page" : undefined}
            >
              <span className="relative z-10">Gallery</span>
              <NavItemAccent active={isGalleryActive} />
            </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef}
            id="nav-mobile-menu-button"
            type="button"
            onClick={() => hydrated && setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2.5 text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white focus-visible:ring-offset-slate-950"
            aria-label={safeMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={safeMobileOpen}
            aria-controls="mobile-primary-nav"
          >
            {safeMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMegaMenu isOpen={safeMobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Desktop Expertise mega */}
      {safeOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 right-0 top-full hidden pt-3 md:block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container-width">
            <MegaMenu id={NAV_IDS.expertise.panel} labelledBy={NAV_IDS.expertise.button} />
          </div>
        </div>
      )}

      {/* Desktop Industries */}
      {safeIndustriesOpen && (
        <div
          ref={industriesMenuRef}
          className="absolute top-full hidden pt-3 md:block"
          onMouseEnter={handleIndustriesMouseEnter}
          onMouseLeave={handleIndustriesMouseLeave}
          style={{ left: industriesLeft }}
        >
          <div
            id={NAV_IDS.industries.panel}
            role="region"
            aria-labelledby={NAV_IDS.industries.button}
            className="relative w-[18rem] overflow-hidden rounded-[1.5rem] border border-white/[0.12] bg-[linear-gradient(180deg,rgba(15,23,42,0.985),rgba(2,6,23,0.98))] shadow-[0_30px_90px_rgba(2,6,23,0.68)] backdrop-blur-xl"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"
            />
            <div className="border-b border-white/[0.07] px-5 pb-3 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/70">Industries</p>
              <p className="mt-2 max-w-[14rem] text-[12px] leading-relaxed text-slate-300">
                Market-specific GTM pages shaped around context, proof, and operating constraints.
              </p>
            </div>
            <div className="space-y-1 p-3">
              {featuredIndustries.map((industry) => {
                const Icon = industry.icon ? industryIconMap[industry.icon] ?? Cloud : Cloud
                return (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-transparent px-3.5 py-3 transition-all duration-200 hover:border-cyan-400/15 hover:bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.03))]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-3 left-0 top-3 w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/90 to-brand-300/0 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-300/90 transition-colors group-hover:border-cyan-300/25 group-hover:bg-white/10 group-hover:text-cyan-100">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <p className="text-[13px] font-medium leading-snug text-slate-100/92 transition-colors group-hover:text-white">{industry.title}</p>
                  </Link>
                )
              })}
            </div>
            <div className="border-t border-white/[0.07] px-5 py-3.5">
              <Link
                href="/industries"
                className="group flex items-center justify-between text-[13px] font-medium text-slate-200 transition-colors hover:text-cyan-50"
              >
                All industries
                <ChevronDown className="h-4 w-4 -rotate-90 text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-cyan-200" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Case Studies */}
      {safeCaseStudiesOpen && (
        <div
          ref={caseStudiesMenuRef}
          className="absolute top-full hidden pt-3 md:block"
          onMouseEnter={handleCaseStudiesMouseEnter}
          onMouseLeave={handleCaseStudiesMouseLeave}
          style={{ left: caseStudiesLeft }}
        >
          <CaseStudiesNavPanel
            items={featuredCaseStudyNav}
            id={NAV_IDS.caseStudies.panel}
            labelledBy={NAV_IDS.caseStudies.button}
          />
        </div>
      )}

      {/* Desktop Blog */}
      {safeBlogOpen && (
        <div
          ref={blogMenuRef}
          className="absolute top-full hidden pt-3 md:block"
          onMouseEnter={handleBlogMouseEnter}
          onMouseLeave={handleBlogMouseLeave}
          style={{ left: blogLeft }}
        >
          <BlogNavPanel id={NAV_IDS.blog.panel} labelledBy={NAV_IDS.blog.button} />
        </div>
      )}
    </header>
  )
}
