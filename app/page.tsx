import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Trophy,
  Users,
  Activity,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-10 sm:py-12 md:py-20 lg:py-28 xl:py-36 overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            {/* Background gradient effect - adjusted for mobile */}
            <div className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
            <div
              className="absolute -bottom-16 -right-16 sm:-bottom-24 sm:-right-24 w-64 sm:w-96 h-64 sm:h-96 bg-accent/20 rounded-full blur-3xl opacity-70 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] relative">
              <div className="flex flex-col justify-center space-y-5 sm:space-y-6 animate-fade-in order-2 lg:order-1">
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl/none font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Local Sports League Organizer
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg xl:text-xl animate-slide-up delay-100">
                    Manage your local sports leagues with ease. Create teams,
                    schedule matches, and track scores in real-time.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 animate-slide-up delay-200 w-full sm:w-auto">
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto inline-flex h-10 sm:h-12 items-center justify-center rounded-md bg-primary px-4 sm:px-8 text-sm sm:text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto inline-flex h-10 sm:h-12 items-center justify-center rounded-md border border-input bg-background/80 backdrop-blur-sm px-4 sm:px-8 text-sm sm:text-base font-medium shadow-sm transition-all hover:bg-accent/10 hover:text-accent hover:border-accent hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>

                {/* Feature badges - improved for mobile */}
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-4 animate-slide-up delay-300">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-primary">
                    Team Management
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-accent">
                    Automated Scheduling
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-primary">
                    Real-time Updates
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center animate-scale-in delay-200 order-1 lg:order-2 mb-6 lg:mb-0">
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-white/10 shadow-xl lg:h-[450px] backdrop-blur-sm">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <img
                    src="/placeholder.svg?height=500&width=600"
                    alt="Sports League Dashboard"
                    className="object-cover w-full h-full rounded-xl sm:rounded-2xl shadow-inner"
                  />

                  {/* Floating elements - adjusted for mobile */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-primary/20 rounded-lg rotate-12 animate-pulse"></div>
                  <div
                    className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-accent/20 rounded-full -rotate-12 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
          {/* Decorative elements - adjusted for mobile */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50"></div>
          <div className="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-64 sm:w-80 h-64 sm:h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 sm:-bottom-40 sm:-left-40 w-64 sm:w-80 h-64 sm:h-80 bg-accent/5 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center animate-fade-in">
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary">
                  Key Features
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Everything You Need to Manage Your Leagues
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg xl:text-xl">
                  Our platform provides all the tools you need to organize and
                  manage your local sports leagues efficiently.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl items-start gap-6 sm:gap-8 py-8 sm:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {/* Feature Card 1 - Team Management */}
              <div className="group relative overflow-hidden rounded-2xl bg-card p-5 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-border/50 animate-scale-in delay-100 h-full flex flex-col">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-primary/50"></div>

                {/* Icon */}
                <div className="mb-3 sm:mb-4 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Team Management
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground flex-grow">
                  Create and manage teams, add players, and track team
                  statistics throughout the season. Customize team profiles with
                  logos and colors.
                </p>

                {/* Link */}
                <div className="mt-4 flex items-center text-sm text-primary">
                  <Link
                    href="/teams"
                    className="flex items-center hover:underline"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature Card 2 - Smart Scheduling */}
              <div className="group relative overflow-hidden rounded-2xl bg-card p-5 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-border/50 animate-scale-in delay-200 h-full flex flex-col">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent/50"></div>

                {/* Icon */}
                <div className="mb-3 sm:mb-4 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Calendar className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  Smart Scheduling
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground flex-grow">
                  Automatically generate game schedules, manage venues, and send
                  notifications to teams. Avoid scheduling conflicts with
                  intelligent algorithms.
                </p>

                {/* Link */}
                <div className="mt-4 flex items-center text-sm text-accent">
                  <Link
                    href="/schedule"
                    className="flex items-center hover:underline"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Feature Card 3 - Real-time Updates */}
              <div className="group relative overflow-hidden rounded-2xl bg-card p-5 sm:p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 border border-border/50 animate-scale-in delay-300 h-full flex flex-col md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent"></div>

                {/* Icon */}
                <div className="mb-3 sm:mb-4 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                  <Activity className="h-5 sm:h-6 w-5 sm:w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Real-time Updates
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground flex-grow">
                  Update scores in real-time, track league standings, and keep
                  everyone informed. Generate detailed statistics and
                  performance reports.
                </p>

                {/* Link */}
                <div className="mt-4 flex items-center text-sm text-primary">
                  <Link
                    href="/leagues"
                    className="flex items-center hover:underline"
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
          {/* Background elements - adjusted for mobile */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-primary/5 rounded-full blur-3xl opacity-50 animate-pulse z-0"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-sm p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-xl border border-border/50 animate-scale-in">
              <div className="flex flex-col items-center justify-center space-y-5 sm:space-y-6 text-center">
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
                    Ready to Get Started?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg">
                    Join thousands of sports organizers who are already using
                    our platform to create amazing leagues and tournaments.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-4 w-full sm:w-auto">
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto inline-flex h-10 sm:h-12 items-center justify-center rounded-md bg-primary px-4 sm:px-8 text-sm sm:text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      Sign Up Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto inline-flex h-10 sm:h-12 items-center justify-center rounded-md border border-input bg-background/80 backdrop-blur-sm px-4 sm:px-8 text-sm sm:text-base font-medium shadow-sm transition-all hover:bg-accent/10 hover:text-accent hover:border-accent hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Log In
                    </Button>
                  </Link>
                </div>

                {/* Testimonial - improved for mobile */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50 w-full">
                  <blockquote className="italic text-muted-foreground text-sm sm:text-base">
                    "This platform has completely transformed how we manage our
                    local basketball league. The scheduling tools alone saved us
                    hours of work!"
                  </blockquote>
                  <p className="mt-2 font-medium text-sm sm:text-base">
                    — Sarah Thompson, League Organizer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
