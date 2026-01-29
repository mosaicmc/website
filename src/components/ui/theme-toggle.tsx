"use client";

import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "../../hooks/useTheme"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={cn(
        "relative flex w-16 h-10 min-h-[44px] shrink-0 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 shadow-inner"
          : "bg-gradient-to-r from-white to-slate-50 border border-slate-200 shadow-sm",
        className
      )}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <Sun
        className={cn(
          "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
          isDark ? "text-slate-500" : "text-amber-500"
        )}
        strokeWidth={1.5}
      />
      <Moon
        className={cn(
          "absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
          isDark ? "text-sky-200" : "text-slate-400"
        )}
        strokeWidth={1.5}
      />
      <span
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform duration-300",
          isDark
            ? "translate-x-7 bg-slate-900 text-slate-100"
            : "translate-x-0 bg-white text-amber-600"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" strokeWidth={1.5} /> : <Sun className="h-4 w-4" strokeWidth={1.5} />}
      </span>
    </button>
  )
}
