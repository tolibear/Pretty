"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const handleToggle = () => {
    // Simple toggle: if dark, go to light; if light, go to dark
    // If system, toggle based on current system theme
    if (theme === "dark") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      // If system theme, toggle to the opposite of current system theme
      setTheme(systemTheme === "dark" ? "light" : "dark")
    }
  }

  // Determine which icon to show based on current effective theme
  const effectiveTheme = theme === "system" ? systemTheme : theme
  const isDark = effectiveTheme === "dark"

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle}>
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
