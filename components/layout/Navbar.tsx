"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef, useMemo } from "react"
import { ChevronDown, Menu, X, Cloud, Landmark, Heart, Terminal, ShoppingBag, Shield, Leaf, Cpu } from "lucide-react"
import MegaMenu from "./MegaMenu"
import { MobileMegaMenu } from "@/components/ui/MobileMegaMenu"
import { industryItems } from "@/content/industries"
import { CaseStudiesNavPanel } from "./CaseStudiesNavPanel"
import { BlogNavPanel } from "./BlogNavPanel"
import { caseStudyItems, getFeaturedCaseStudies } from "@/src/data/caseStudies"

type IndustryIcon = typeof Cloud

/** Desktop mega triggers — Inter, cyan underline, calm focus ring */
const navTriggerClasses =
  "inline-flex items-center gap-1 text-sm font-medium tracking-tight text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md px-2.5 py-1.5 relative after:absolute after:left-2.5 after:-bottom-px after:h-px after:w-0 after:bg-cyan-400/65 after:transition-[width] after:duration-200 after:ease-out hover:after:w-[calc(100%-1.25rem)]"

const navAboutClasses =
  "relative text-sm font-medium tracking-tight text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md px-2.5 py-1.5 after:absolute after:left-2.5 after:-bottom-px after:h-px after:w-0 after:bg-cyan-400/50 after:transition-[width] after:duration-200 after:ease-out hover:after:w-[calc(100%-1.25rem)]"

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

export default function Navbar() {
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

  const updateAllFlyoutPositions = () => {
    updateFlyoutLeft(industriesButtonRef, setIndustriesLeft)
    updateFlyoutLeft(caseStudiesButtonRef, setCaseStudiesLeft)
    updateFlyoutLeft(blogButtonRef, setBlogLeft)
  }

  useEffect(() => {
    updateAllFlyoutPositions()
    window.addEventListener("resize", updateAllFlyoutPositions)
    return () => window.removeEventListener("resize", updateAllFlyoutPositions)
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
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-slate-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/80">
      <nav className="container-width relative font-sans text-slate-200" ref={navRef}>
        <div className="flex items-center justify-between min-h-[76px] h-[76px] md:min-h-[88px] md:h-[88px] lg:min-h-[96px] lg:h-[96px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 md:gap-4 group shrink-0 min-w-0">
            <Image
              src="/gtmstack-logo.png"
              alt="GTMStack.pro"
              width={480}
              height={96}
              priority
              sizes="(max-width: 768px) 70vw, 440px"
              className="h-12 w-auto sm:h-14 md:h-16 lg:h-[4.5rem] max-w-[min(100%,calc(100vw-6.5rem))] sm:max-w-[min(480px,calc(100vw-8rem))] object-contain object-left"
            />
            <div className="hidden sm:flex flex-col justify-center leading-tight border-l border-white/10 pl-2.5 md:pl-4 min-h-[2.5rem] md:min-h-[3rem]">
              <span className="font-display text-[10px] md:text-[11px] font-medium text-slate-400/95 tracking-[0.07em] uppercase">
                Operator-built GTM portfolio
              </span>
            </div>
          </Link>

          {/* Desktop: Expertise → Industries → Case Studies → Blog → About → Contact */}
          <div className="hidden md:flex flex-wrap items-center justify-end gap-x-4 gap-y-2 lg:gap-x-5">
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
                className={`${navTriggerClasses} ${safeOpen ? "text-white" : ""}`}
                aria-expanded={safeOpen}
                aria-haspopup="true"
                aria-controls={safeOpen ? NAV_IDS.expertise.panel : undefined}
                aria-label="Expertise: how the GTM model is organized by pillar and topic"
              >
                Expertise <ChevronDown className={`h-4 w-4 transition-transform ${safeOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
            <div className="relative">
              <button
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
                className={`${navTriggerClasses} ${safeIndustriesOpen ? "text-white" : ""}`}
                aria-expanded={safeIndustriesOpen}
                aria-haspopup="true"
                aria-label="Industries: where the model meets real markets"
              >
                Industries <ChevronDown className={`h-4 w-4 transition-transform ${safeIndustriesOpen ? "rotate-180" : ""}`} />
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
                className={`${navTriggerClasses} ${safeCaseStudiesOpen ? "text-white" : ""}`}
                aria-expanded={safeCaseStudiesOpen}
                aria-haspopup="true"
                aria-controls={safeCaseStudiesOpen ? NAV_IDS.caseStudies.panel : undefined}
                aria-label="Case Studies: proof and results"
              >
                Case Studies <ChevronDown className={`h-4 w-4 transition-transform ${safeCaseStudiesOpen ? "rotate-180" : ""}`} aria-hidden="true" />
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
                className={`${navTriggerClasses} ${safeBlogOpen ? "text-white" : ""}`}
                aria-expanded={safeBlogOpen}
                aria-haspopup="true"
                aria-controls={safeBlogOpen ? NAV_IDS.blog.panel : undefined}
                aria-label="Blog: articles and field notes"
              >
                Blog <ChevronDown className={`h-4 w-4 transition-transform ${safeBlogOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
            </div>
            <Link href="/about" className={navAboutClasses} aria-label="About: who built this site">
              About
            </Link>
            <Link href="/gallery" className={navAboutClasses} aria-label="Gallery: animation and visual work">
              Gallery
            </Link>
            <Link href="/contact" className="nav-cta" aria-label="Contact: start a conversation">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef}
            id="nav-mobile-menu-button"
            type="button"
            onClick={() => hydrated && setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
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
          className="absolute left-0 right-0 top-full pt-2 hidden md:block"
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
          className="absolute top-full pt-2 hidden md:block"
          onMouseEnter={handleIndustriesMouseEnter}
          onMouseLeave={handleIndustriesMouseLeave}
          style={{ left: industriesLeft }}
        >
          <div className="container-width">
            <div className="max-w-md">
              <div
                id={NAV_IDS.industries.panel}
                role="region"
                aria-labelledby={NAV_IDS.industries.button}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_rgba(15,23,42,0.8)] backdrop-blur-2xl"
              >
                <div className="p-3">
                  <div className="mb-1 text-[11px] uppercase tracking-[0.24em] text-slate-400">Featured industries</div>
                  <p className="mb-3 pr-1 text-[12px] leading-snug text-slate-400">
                    How the GTM model shows up in real markets—not a service list.
                  </p>
                  <div className="divide-y divide-white/5">
                    {featuredIndustries.map((industry) => {
                      const Icon = industry.icon ? industryIconMap[industry.icon] ?? Cloud : Cloud
                      return (
                        <Link
                          key={industry.slug}
                          href={`/industries/${industry.slug}`}
                          className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300/90">
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
                <div className="border-t border-white/10 bg-slate-900/80 px-3 py-2.5">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">Also explore</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12px]">
                    <Link href="/expertise" className="text-slate-400 transition-colors hover:text-cyan-200/90">
                      Expertise
                    </Link>
                    <Link href="/case-studies" className="text-slate-400 transition-colors hover:text-cyan-200/90">
                      Case Studies
                    </Link>
                    <Link href="/blog" className="text-slate-400 transition-colors hover:text-cyan-200/90">
                      Blog
                    </Link>
                  </div>
                </div>
                <div className="border-t border-white/10 bg-slate-900/80">
                  <Link
                    href="/industries"
                    className="flex items-center justify-between gap-2 px-3 py-3 text-sm font-medium text-cyan-200/90 transition-colors hover:text-white"
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

      {/* Desktop Case Studies */}
      {safeCaseStudiesOpen && (
        <div
          ref={caseStudiesMenuRef}
          className="absolute top-full pt-2 hidden md:block"
          onMouseEnter={handleCaseStudiesMouseEnter}
          onMouseLeave={handleCaseStudiesMouseLeave}
          style={{ left: caseStudiesLeft }}
        >
          <div className="container-width">
            <CaseStudiesNavPanel
              items={featuredCaseStudyNav}
              id={NAV_IDS.caseStudies.panel}
              labelledBy={NAV_IDS.caseStudies.button}
            />
          </div>
        </div>
      )}

      {/* Desktop Blog */}
      {safeBlogOpen && (
        <div
          ref={blogMenuRef}
          className="absolute top-full pt-2 hidden md:block"
          onMouseEnter={handleBlogMouseEnter}
          onMouseLeave={handleBlogMouseLeave}
          style={{ left: blogLeft }}
        >
          <div className="container-width">
            <BlogNavPanel id={NAV_IDS.blog.panel} labelledBy={NAV_IDS.blog.button} />
          </div>
        </div>
      )}
    </header>
  )
}
