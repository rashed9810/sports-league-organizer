"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/leagues", label: "Leagues" },
    { href: "/teams", label: "Teams" },
    { href: "/schedule", label: "Schedule" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/70 via-accent/70 to-primary/70"></div>

      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center rounded-full bg-background p-1.5">
              <Trophy className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
            </div>
          </div>
          <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent group-hover:from-accent group-hover:to-primary transition-all duration-300">
            Sports League
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium group ${
                pathname === link.href ? "text-primary" : "text-foreground/70"
              } transition-colors hover:text-primary`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeSwitcher />
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-4 font-medium hover:bg-primary/10 hover:text-primary transition-all"
            >
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="h-9 px-4 font-medium bg-primary hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 transition-all"
            >
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10"
              >
                <Menu className="h-5 w-5 text-foreground/80 hover:text-primary transition-colors" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] border-l border-border/50 bg-background/95 backdrop-blur-md"
            >
              <SheetTitle>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative flex items-center justify-center rounded-full bg-background p-1.5">
                        <Trophy className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                    <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      Sports League
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 hover:bg-primary/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile navigation links with animation */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative text-base font-medium py-3 px-2 rounded-md ${
                        pathname === link.href
                          ? "text-primary bg-primary/5"
                          : "text-foreground/70"
                      } transition-all hover:text-primary hover:bg-primary/5`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"></span>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Divider with gradient */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>

                {/* Auth buttons */}
                <div className="mt-auto flex flex-col gap-3 pt-4">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full h-10 border-primary/20 hover:border-primary hover:bg-primary/5"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full h-10 bg-primary hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 transition-all">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
