import type { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

export function getLucideIcon(name?: string): LucideIcon | null {
  if (!name) return null
  const icon = Icons[name as keyof typeof Icons]
  return typeof icon === "function" ? (icon as LucideIcon) : null
}
