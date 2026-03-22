import type { LucideIcon } from "lucide-react"
import { FileText, Settings, Target, TrendingUp } from "lucide-react"

const MAP: Record<string, LucideIcon> = {
  FileText,
  TrendingUp,
  Target,
  Settings,
}

export function getLucideIcon(name?: string): LucideIcon | null {
  if (!name) return null
  return MAP[name] ?? null
}
