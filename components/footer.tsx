"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-8 sm:py-10 md:py-12 lg:py-16 bg-background relative overflow-hidden">
      {/* Decorative elements - adjusted for mobile */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30"></div>
      <div className="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-64 sm:w-80 h-64 sm:h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 sm:-bottom-40 sm:-left-40 w-64 sm:w-80 h-64 sm:h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10">
        <div className="flex flex-col items-center md:items-start gap-3 sm:gap-4 md:max-w-xs w-full">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center rounded-full bg-background p-1.5">
                <Trophy className="h-5 sm:h-6 w-5 sm:w-6 text-primary group-hover:text-accent transition-colors" />
              </div>
            </div>
            <span className="font-bold text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent group-hover:from-accent group-hover:to-primary transition-all duration-300">
              Sports League
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            The ultimate platform for managing local sports leagues with ease.
            Create teams, schedule matches, and track scores in real-time.
          </p>

          {/* Social media links */}
          <div className="flex items-center gap-4 mt-1 sm:mt-2">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 text-xs sm:text-sm w-full">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h3 className="font-semibold text-foreground mb-1">Platform</h3>
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/leagues"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Leagues
            </Link>
            <Link
              href="/teams"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Teams
            </Link>
            <Link
              href="/schedule"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Schedule
            </Link>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3">
            <h3 className="font-semibold text-foreground mb-1">Resources</h3>
            <Link
              href="/community"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Community
            </Link>
            <Link
              href="/mobile-app"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Mobile App
            </Link>
            <Link
              href="/analytics"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3 col-span-2 sm:col-span-1 mt-4 sm:mt-0">
            <h3 className="font-semibold text-foreground mb-1">Legal</h3>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 border-t border-border/50">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Sports League Organizer. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="#"
              className="text-[10px] sm:text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              href="#"
              className="text-[10px] sm:text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Accessibility
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link
              href="#"
              className="text-[10px] sm:text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
