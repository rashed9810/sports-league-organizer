"use client"

import Link from "next/link"
import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Trophy className="h-6 w-6" />
          <span className="font-bold">Sports League</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-primary" : "text-foreground/60"} transition-colors hover:text-foreground/80`}
          >
            Home
          </Link>
          <Link
            href="/leagues"
            className={`text-sm font-medium ${pathname === "/leagues" ? "text-primary" : "text-foreground/60"} transition-colors hover:text-foreground/80`}
          >
            Leagues
          </Link>
          <Link
            href="/teams"
            className={`text-sm font-medium ${pathname === "/teams" ? "text-primary" : "text-foreground/60"} transition-colors hover:text-foreground/80`}
          >
            Teams
          </Link>
          <Link
            href="/schedule"
            className={`text-sm font-medium ${pathname === "/schedule" ? "text-primary" : "text-foreground/60"} transition-colors hover:text-foreground/80`}
          >
            Schedule
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <ThemeSwitcher />
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
