'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Building2,
  FileText,
  Home,
  Image,
  FileEdit,
  LayoutDashboard,
  Layers,
} from 'lucide-react'

const SECTIONS = [
  { id: 'expertise', label: 'Expertise', icon: BookOpen },
  { id: 'industries', label: 'Industries', icon: Building2 },
  { id: 'case-studies', label: 'Case Studies', icon: FileText },
  { id: 'home', label: 'Home', icon: Home },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'templates', label: 'Templates', icon: Layers },
  { id: 'blog', label: 'Blog', icon: FileEdit },
] as const

export type AdminSectionId = (typeof SECTIONS)[number]['id']

type AdminLayoutProps = {
  children: React.ReactNode
  section: AdminSectionId
  onSectionChange: (id: AdminSectionId) => void
}

export default function AdminLayout({ children, section, onSectionChange }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0A0F2D] text-slate-200">
      <aside className="w-56 shrink-0 border-r border-slate-800 bg-[#0A0F2D]/95 flex flex-col">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <LayoutDashboard className="text-[#36C0CF]" size={20} />
          <span className="font-bold text-white">Admin</span>
        </div>
        <nav className="p-2 flex-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onSectionChange(id)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                section === id
                  ? 'bg-[#36C0CF]/20 text-[#36C0CF]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-sm"
          >
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}
