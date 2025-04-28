import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Bug, Gauge, Smartphone, CheckSquare, Braces } from "lucide-react"

export default function TestingPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Frontend Testing Hub</h1>
          <p className="text-muted-foreground mt-1">Comprehensive tools to verify your frontend implementation</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Testing Tools</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestingCard
              icon={<CheckSquare className="h-8 w-8 text-primary" />}
              title="Manual Testing"
              description="Systematic verification of all features and user flows"
              link="/testing/manual-checklist"
              linkText="Open Checklist"
            />
            <TestingCard
              icon={<Code className="h-8 w-8 text-primary" />}
              title="Automated Tests"
              description="Run automated test suites to verify functionality"
              link="/testing/automated"
              linkText="Run Tests"
            />
            <TestingCard
              icon={<Gauge className="h-8 w-8 text-primary" />}
              title="Performance"
              description="Analyze loading times and runtime performance"
              link="/testing/performance"
              linkText="Check Performance"
            />
            <TestingCard
              icon={<Smartphone className="h-8 w-8 text-primary" />}
              title="Responsive Design"
              description="Test across different screen sizes and devices"
              link="/testing/responsive"
              linkText="Test Responsiveness"
            />
            <TestingCard
              icon={<Bug className="h-8 w-8 text-primary" />}
              title="Issue Tracking"
              description="Log and manage discovered issues and bugs"
              link="/testing/issues"
              linkText="View Issues"
            />
            <TestingCard
              icon={<Braces className="h-8 w-8 text-primary" />}
              title="API Testing"
              description="Verify API endpoints and data flow"
              link="/testing/api"
              linkText="Test APIs"
            />
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Browser Developer Tools</CardTitle>
              <CardDescription>Built-in browser tools for debugging and testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Elements Inspector</h3>
                <p className="text-sm text-muted-foreground">
                  Inspect and modify DOM elements, CSS styles, and check accessibility properties.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Network Monitor</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze network requests, response times, and payload sizes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Console</h3>
                <p className="text-sm text-muted-foreground">
                  View logged messages, errors, and warnings. Execute JavaScript in the context of the page.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Performance Panel</h3>
                <p className="text-sm text-muted-foreground">
                  Record and analyze runtime performance, identify bottlenecks.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Application Tab</h3>
                <p className="text-sm text-muted-foreground">
                  Inspect local storage, session storage, cookies, and cache.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Testing Tools</CardTitle>
              <CardDescription>Third-party tools to enhance your testing workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Lighthouse</h3>
                <p className="text-sm text-muted-foreground">
                  Automated tool for improving the quality of web pages. Audits for performance, accessibility, SEO, and
                  more.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">React Developer Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Browser extension for inspecting React component hierarchies, props, state, and hooks.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Cypress</h3>
                <p className="text-sm text-muted-foreground">
                  End-to-end testing framework for web applications with time travel debugging and real-time reloads.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Jest</h3>
                <p className="text-sm text-muted-foreground">
                  JavaScript testing framework with a focus on simplicity. Great for unit and integration tests.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Axe DevTools</h3>
                <p className="text-sm text-muted-foreground">
                  Accessibility testing tools to find and fix accessibility issues.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentation & Guides</CardTitle>
              <CardDescription>Helpful resources for effective frontend testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Testing Best Practices</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guide to frontend testing methodologies and best practices.
                </p>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Read guide
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Accessibility Checklist</h3>
                <p className="text-sm text-muted-foreground">
                  WCAG compliance checklist to ensure your application is accessible to all users.
                </p>
                <Link href="#" className="text-sm text-primary hover:underline">
                  View checklist
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Performance Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Techniques for identifying and fixing performance bottlenecks in your frontend.
                </p>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Learn more
                </Link>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Cross-Browser Testing Guide</h3>
                <p className="text-sm text-muted-foreground">
                  How to effectively test your application across different browsers and devices.
                </p>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Read guide
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TestingCard({ icon, title, description, link, linkText }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={link}>
          <Button variant="secondary" className="w-full">
            {linkText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
