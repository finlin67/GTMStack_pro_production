"use client"

import type { CSSProperties } from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  RESUME_CATEGORY_OPTIONS,
  RESUME_ERA_COLORS,
  RESUME_ERA_OPTIONS,
  RESUME_ROLES,
  RESUME_STATS,
  type ResumeMetric,
  type ResumeRole,
} from "@/src/data/resume"

const SELECT_BASE: CSSProperties = {
  width: "100%",
  background: "#FFFFFF",
  border: "1px solid rgba(148,163,184,0.35)",
  color: "#112B3C",
  borderRadius: "10px",
  padding: "0.6rem 2.15rem 0.6rem 0.85rem",
  fontSize: "0.82rem",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  outline: "none",
  backgroundImage:
    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\' fill=\'none\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%2364748b\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.75rem center",
  transition: "border-color 0.15s ease",
}

function TagPill({ tag, eraColor }: { tag: string; eraColor: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full"
      style={{
        backgroundColor: `${eraColor}14`,
        color: eraColor,
        border: `1px solid ${eraColor}33`,
        fontSize: "0.65rem",
        padding: "0.12rem 0.62rem",
        fontWeight: 500,
      }}
    >
      {tag}
    </span>
  )
}

function MetricBadge({ metric }: { metric: ResumeMetric }) {
  return (
    <span
      style={{
        background: "rgba(196,68,15,0.1)",
        border: "1px solid rgba(232,160,64,0.35)",
        borderRadius: "9999px",
        padding: "0.34rem 0.8rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
      }}
    >
      <span
        style={{
          background: "linear-gradient(90deg, #C2440F, #E8A040, #FFDB58)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 800,
          fontSize: "0.82rem",
          fontFamily: "var(--font-display, inherit)",
        }}
      >
        {metric.value}
      </span>
      <span
        style={{
          color: "#94a3b8",
          fontSize: "0.62rem",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {metric.label}
      </span>
    </span>
  )
}

function MetaDivider() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-5 w-px bg-white/10 md:block"
    />
  )
}

function RoleCard({
  role,
  expandedId,
  setExpandedId,
}: {
  role: ResumeRole
  expandedId: string | null
  setExpandedId: (id: string | null) => void
}) {
  const eraColor = RESUME_ERA_COLORS[role.era]
  const isExpanded = expandedId === String(role.id)

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#17344E]"
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ height: "4px", backgroundColor: eraColor }} aria-hidden="true" />

      <div className="px-5 py-4 md:px-6 md:py-4.5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex-1">
            <h3
              className="font-display text-[1rem] font-bold leading-[1.18] text-white md:text-[1.08rem]"
              style={{ marginBottom: "0.65rem" }}
            >
              {role.title}
            </h3>

            <div className="flex flex-wrap gap-2" style={{ marginBottom: "0.75rem" }}>
              {role.tags.map((tag) => (
                <TagPill key={tag} tag={tag} eraColor={eraColor} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {role.metric ? <MetricBadge metric={role.metric} /> : null}
              {role.metric ? <MetaDivider /> : null}
              <button
                onClick={() => setExpandedId(isExpanded ? null : String(role.id))}
                className="font-semibold"
                style={{
                  color: "#FFDB58",
                  fontSize: "0.78rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-expanded={isExpanded}
              >
                {isExpanded ? "Hide Details -" : "See Details +"}
              </button>
            </div>
          </div>

          <div className="shrink-0 text-left md:min-w-[154px] md:text-right">
            <div
              className="font-display text-[1rem] leading-none text-white md:text-[1.08rem]"
              style={{ marginBottom: "0.55rem" }}
            >
              {role.company}
            </div>
            <div
              style={{
                color: "#FFDB58",
                fontSize: "0.86rem",
                fontWeight: 700,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
              }}
            >
              {role.years}
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="mt-4 border-t border-white/[0.08] pt-4"
                style={{ background: "rgba(255,255,255,0.015)" }}
              >
                <ul className="space-y-2">
                  {role.bullets.map((bullet, index) => (
                    <li
                      key={`${role.id}-${index}`}
                      className="flex gap-2 text-[0.82rem] leading-[1.55] text-slate-300"
                    >
                      <span style={{ color: eraColor }}>{">"}</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function FilterRail({
  activeCategory,
  activeEra,
  hasActiveFilters,
  visibleCount,
  resetFilters,
  setActiveCategory,
  setActiveEra,
}: {
  activeCategory: string
  activeEra: string
  hasActiveFilters: boolean
  visibleCount: number
  resetFilters: () => void
  setActiveCategory: (value: string) => void
  setActiveEra: (value: string) => void
}) {
  return (
    <aside className="lg:sticky lg:top-5">
      <div className="rounded-[20px] border border-slate-200/80 bg-slate-50 p-4 md:p-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Filters</p>
        <h3 className="mb-2 text-[1.05rem] font-bold text-[#112B3C]">Career Lens</h3>
        <p className="mb-5 text-[13px] leading-6 text-slate-600">
          Use a narrower lens to scan the operating record by function or era, then expand any role for detail.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Category
            </label>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              style={SELECT_BASE}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#2c7af6"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(148,163,184,0.35)"
              }}
            >
              {RESUME_CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option} style={{ background: "#FFFFFF" }}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Era
            </label>
            <select
              value={activeEra}
              onChange={(e) => setActiveEra(e.target.value)}
              style={SELECT_BASE}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#2c7af6"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(148,163,184,0.35)"
              }}
            >
              {RESUME_ERA_OPTIONS.map((option) => (
                <option key={option} value={option} style={{ background: "#FFFFFF" }}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">Results</p>
          <p className="mt-1 text-[13px] leading-6 text-slate-700">
            Showing <span className="font-semibold text-[#112B3C]">{visibleCount}</span> of{" "}
            <span className="font-semibold text-[#112B3C]">{RESUME_ROLES.length}</span> roles
          </p>
        </div>

        {hasActiveFilters ? (
          <button
            onClick={resetFilters}
            className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
          >
            Reset Filters
          </button>
        ) : null}
      </div>
    </aside>
  )
}

export default function InteractiveResume() {
  const [activeCategory, setActiveCategory] = useState("All Categories")
  const [activeEra, setActiveEra] = useState("All Eras")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const hasActiveFilters = activeCategory !== "All Categories" || activeEra !== "All Eras"

  function resetFilters() {
    setActiveCategory("All Categories")
    setActiveEra("All Eras")
    setExpandedId(null)
  }

  const visibleRoles = RESUME_ROLES.filter((role) => {
    const categoryMatch =
      activeCategory === "All Categories" || role.tags.includes(activeCategory as ResumeRole["tags"][number])

    const eraMatch =
      activeEra === "All Eras" ||
      (activeEra === "Recent (2021+)" && role.era === "Recent") ||
      (activeEra === "Salesforce Era" && role.era === "Salesforce Era") ||
      (activeEra === "Marketing/Tech" && role.era === "Marketing/Tech") ||
      (activeEra === "Finance Era" && role.era === "Finance Era")

    return categoryMatch && eraMatch
  })

  return (
    <section
      className="w-full overflow-hidden border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)]"
      style={{ borderRadius: "28px" }}
    >
      <div className="grid gap-0 lg:grid-cols-[248px_minmax(0,1fr)]">
        <div className="border-b border-slate-200/80 p-4 md:p-5 lg:border-b-0 lg:border-r">
          <FilterRail
            activeCategory={activeCategory}
            activeEra={activeEra}
            hasActiveFilters={hasActiveFilters}
            visibleCount={visibleRoles.length}
            resetFilters={resetFilters}
            setActiveCategory={setActiveCategory}
            setActiveEra={setActiveEra}
          />
        </div>

        <div className="bg-[#10273C] p-4 md:p-5">
          {visibleRoles.length === 0 ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[18px] border border-white/[0.08] bg-white/[0.04] p-6 text-center">
              <p className="text-[0.95rem] text-slate-200">No roles match these filters.</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
                Clear the active filters to bring the full operating record back into view.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-full border border-[#FFDB58]/35 bg-[#FFDB58]/[0.08] px-4 py-2 text-sm font-semibold text-[#FFDB58]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div layout="position" className="space-y-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleRoles.map((role) => (
                  <RoleCard key={role.id} role={role} expandedId={expandedId} setExpandedId={setExpandedId} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <div className="mt-6 border-t border-white/[0.08] pt-6">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {RESUME_STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1">
                  <span
                    className="font-display font-extrabold"
                    style={{
                      fontSize: "2rem",
                      lineHeight: "1.1",
                      background: "linear-gradient(90deg, #C2440F, #E8A040, #FFDB58)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {value}
                  </span>
                  <span className="font-sans text-[0.7rem] uppercase tracking-widest text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
