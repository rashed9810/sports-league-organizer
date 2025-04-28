"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, CheckCircle2 } from "lucide-react"

export default function ManualTestingChecklist() {
  const [completedTests, setCompletedTests] = useState<Record<string, Record<string, boolean>>>({
    functionality: {},
    visual: {},
    responsive: {},
    performance: {},
    accessibility: {},
  })

  const handleCheckboxChange = (category: string, id: string) => {
    setCompletedTests((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [id]: !prev[category]?.[id],
      },
    }))
  }

  const calculateProgress = (category: string) => {
    const tests = testCategories.find((c) => c.id === category)?.tests || []
    const completed = Object.values(completedTests[category] || {}).filter(Boolean).length
    return {
      completed,
      total: tests.length,
      percentage: tests.length ? Math.round((completed / tests.length) * 100) : 0,
    }
  }

  const testCategories = [
    {
      id: "functionality",
      name: "Core Functionality",
      description: "Test all interactive features and user flows",
      tests: [
        { id: "navigation", label: "Navigation works between all pages" },
        { id: "forms", label: "All forms submit correctly with validation" },
        { id: "auth", label: "Authentication flows (login, register, logout) work" },
        { id: "crud", label: "CRUD operations for teams, leagues, and schedules" },
        { id: "filters", label: "Filtering and sorting functionality works" },
        { id: "search", label: "Search functionality returns correct results" },
        { id: "analytics", label: "Analytics dashboard displays correct data" },
        { id: "community", label: "Community features (posts, comments) work" },
      ],
    },
    {
      id: "visual",
      name: "Visual Consistency",
      description: "Ensure UI elements appear correctly",
      tests: [
        { id: "theme", label: "Theme switching works (Light, Dark, Dim, Lights Out)" },
        { id: "components", label: "UI components render consistently" },
        { id: "typography", label: "Typography hierarchy is consistent" },
        { id: "spacing", label: "Spacing and alignment is consistent" },
        { id: "colors", label: "Color scheme is applied correctly" },
        { id: "icons", label: "Icons render properly and are consistent" },
      ],
    },
    {
      id: "responsive",
      name: "Responsive Design",
      description: "Test across different screen sizes",
      tests: [
        { id: "mobile", label: "Mobile layout (320px - 480px)" },
        { id: "tablet", label: "Tablet layout (481px - 768px)" },
        { id: "laptop", label: "Laptop layout (769px - 1024px)" },
        { id: "desktop", label: "Desktop layout (1025px+)" },
        { id: "orientation", label: "Device orientation changes" },
      ],
    },
    {
      id: "performance",
      name: "Performance",
      description: "Check loading times and responsiveness",
      tests: [
        { id: "load-time", label: "Initial page load time < 3 seconds" },
        { id: "interaction", label: "UI interactions are smooth and responsive" },
        { id: "images", label: "Images are optimized and load efficiently" },
        { id: "pagination", label: "Pagination/infinite scroll performs well" },
        { id: "animations", label: "Animations run at 60fps without jank" },
      ],
    },
    {
      id: "accessibility",
      name: "Accessibility",
      description: "Ensure the app is usable by everyone",
      tests: [
        { id: "keyboard", label: "Fully navigable by keyboard" },
        { id: "screen-reader", label: "Screen reader compatibility" },
        { id: "contrast", label: "Color contrast meets WCAG standards" },
        { id: "alt-text", label: "All images have appropriate alt text" },
        { id: "aria", label: "ARIA attributes are used correctly" },
        { id: "focus", label: "Focus states are visible and logical" },
      ],
    },
  ]

  const resetChecklist = () => {
    setCompletedTests({
      functionality: {},
      visual: {},
      responsive: {},
      performance: {},
      accessibility: {},
    })
  }

  const exportResults = () => {
    const results = {
      date: new Date().toISOString(),
      results: testCategories.map((category) => {
        const progress = calculateProgress(category.id)
        return {
          category: category.name,
          completedTests: progress.completed,
          totalTests: progress.total,
          percentage: progress.percentage,
          tests: category.tests.map((test) => ({
            test: test.label,
            passed: !!completedTests[category.id]?.[test.id],
          })),
        }
      }),
    }

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `frontend-test-results-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Frontend Testing Checklist</h1>
          <p className="text-muted-foreground mt-1">Systematically verify your frontend implementation</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={resetChecklist}>
            Reset Checklist
          </Button>
          <Button onClick={exportResults}>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {testCategories.map((category) => {
          const progress = calculateProgress(category.id)
          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                  <Badge variant={progress.percentage === 100 ? "default" : "outline"}>
                    {progress.completed}/{progress.total}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-secondary rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                </div>
                {progress.percentage === 100 && (
                  <div className="flex items-center justify-center text-primary mb-4">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    <span>All tests passed!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="functionality" className="space-y-8">
        <TabsList className="flex flex-wrap">
          {testCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {testCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            {category.tests.map((test) => (
              <div key={test.id} className="flex items-start space-x-2">
                <Checkbox
                  id={`${category.id}-${test.id}`}
                  checked={!!completedTests[category.id]?.[test.id]}
                  onCheckedChange={() => handleCheckboxChange(category.id, test.id)}
                />
                <label
                  htmlFor={`${category.id}-${test.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {test.label}
                </label>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
