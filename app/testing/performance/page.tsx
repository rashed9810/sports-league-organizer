"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Gauge,
  HardDrive,
  ImageIcon,
  FileJson,
  BarChart,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"

export default function PerformanceTestingPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any>(null)

  const runPerformanceTest = () => {
    setIsRunning(true)
    setProgress(0)
    setResults(null)

    // Simulate a performance test
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          // Generate mock results
          setResults({
            score: 87,
            metrics: {
              fcp: { value: 1.2, unit: "s", status: "good" },
              lcp: { value: 2.4, unit: "s", status: "good" },
              cls: { value: 0.05, unit: "", status: "good" },
              fid: { value: 28, unit: "ms", status: "good" },
              ttfb: { value: 320, unit: "ms", status: "needs-improvement" },
              tbt: { value: 180, unit: "ms", status: "good" },
            },
            resources: {
              total: { value: 1.8, unit: "MB" },
              html: { value: 45, unit: "KB" },
              css: { value: 120, unit: "KB" },
              javascript: { value: 850, unit: "KB" },
              images: { value: 780, unit: "KB" },
              fonts: { value: 95, unit: "KB" },
            },
            opportunities: [
              {
                title: "Properly size images",
                description: "Serve images that are appropriately-sized to save cellular data and improve load time.",
                savings: "250 KB",
                status: "warning",
              },
              {
                title: "Eliminate render-blocking resources",
                description:
                  "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.",
                savings: "1.2s",
                status: "warning",
              },
              {
                title: "Preconnect to required origins",
                description:
                  "Add `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins.",
                savings: "0.3s",
                status: "warning",
              },
            ],
          })
          return 100
        }
        return newProgress
      })
    }, 100)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "needs-improvement":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "poor":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Testing</h1>
          <p className="text-muted-foreground mt-1">Analyze and optimize your frontend performance</p>
        </div>
        <Button onClick={runPerformanceTest} disabled={isRunning}>
          {isRunning ? "Running Test..." : "Run Performance Test"}
        </Button>
      </div>

      {isRunning && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Analyzing performance...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                <CardDescription>Overall performance rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center pt-2">
                  <div className="relative">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className={`${
                          results.score >= 90
                            ? "text-green-500"
                            : results.score >= 70
                              ? "text-yellow-500"
                              : "text-red-500"
                        } stroke-current`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                        strokeDasharray={`${(results.score / 100) * 351.8} 351.8`}
                        strokeDashoffset="88"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                      {results.score}
                    </div>
                  </div>
                  <Badge
                    className="mt-2"
                    variant={results.score >= 90 ? "default" : results.score >= 70 ? "secondary" : "destructive"}
                  >
                    {results.score >= 90 ? "Good" : results.score >= 70 ? "Needs Improvement" : "Poor"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Core Web Vitals</CardTitle>
                <CardDescription>Key metrics that affect user experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">{getStatusIcon(results.metrics.fcp.status)}</div>
                    <div>
                      <div className="text-sm font-medium">FCP</div>
                      <div className="text-2xl font-bold">
                        {results.metrics.fcp.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {results.metrics.fcp.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">{getStatusIcon(results.metrics.lcp.status)}</div>
                    <div>
                      <div className="text-sm font-medium">LCP</div>
                      <div className="text-2xl font-bold">
                        {results.metrics.lcp.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {results.metrics.lcp.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">{getStatusIcon(results.metrics.cls.status)}</div>
                    <div>
                      <div className="text-sm font-medium">CLS</div>
                      <div className="text-2xl font-bold">{results.metrics.cls.value}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">{getStatusIcon(results.metrics.fid.status)}</div>
                    <div>
                      <div className="text-sm font-medium">FID</div>
                      <div className="text-2xl font-bold">
                        {results.metrics.fid.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {results.metrics.fid.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">{getStatusIcon(results.metrics.ttfb.status)}</div>
                    <div>
                      <div className="text-sm font-medium">TTFB</div>
                      <div className="text-2xl font-bold">
                        {results.metrics.ttfb.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {results.metrics.ttfb.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">{getStatusIcon(results.metrics.tbt.status)}</div>
                    <div>
                      <div className="text-sm font-medium">TBT</div>
                      <div className="text-2xl font-bold">
                        {results.metrics.tbt.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {results.metrics.tbt.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="resources" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Breakdown</CardTitle>
                  <CardDescription>Analysis of loaded resources by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Total Size</span>
                        </div>
                        <span className="font-bold">
                          {results.resources.total.value} {results.resources.total.unit}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <FileJson className="h-4 w-4 text-blue-500" />
                            <span>JavaScript</span>
                          </div>
                          <span>
                            {results.resources.javascript.value} {results.resources.javascript.unit}
                          </span>
                        </div>
                        <Progress
                          value={(results.resources.javascript.value / (results.resources.total.value * 1024)) * 100}
                          className="h-1"
                          indicatorClassName="bg-blue-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-green-500" />
                            <span>Images</span>
                          </div>
                          <span>
                            {results.resources.images.value} {results.resources.images.unit}
                          </span>
                        </div>
                        <Progress
                          value={(results.resources.images.value / (results.resources.total.value * 1024)) * 100}
                          className="h-1"
                          indicatorClassName="bg-green-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-purple-500" />
                            <span>CSS</span>
                          </div>
                          <span>
                            {results.resources.css.value} {results.resources.css.unit}
                          </span>
                        </div>
                        <Progress
                          value={(results.resources.css.value / (results.resources.total.value * 1024)) * 100}
                          className="h-1"
                          indicatorClassName="bg-purple-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <FileJson className="h-4 w-4 text-yellow-500" />
                            <span>HTML</span>
                          </div>
                          <span>
                            {results.resources.html.value} {results.resources.html.unit}
                          </span>
                        </div>
                        <Progress
                          value={(results.resources.html.value / (results.resources.total.value * 1024)) * 100}
                          className="h-1"
                          indicatorClassName="bg-yellow-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <FileJson className="h-4 w-4 text-red-500" />
                            <span>Fonts</span>
                          </div>
                          <span>
                            {results.resources.fonts.value} {results.resources.fonts.unit}
                          </span>
                        </div>
                        <Progress
                          value={(results.resources.fonts.value / (results.resources.total.value * 1024)) * 100}
                          className="h-1"
                          indicatorClassName="bg-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Opportunities</CardTitle>
                  <CardDescription>Suggestions to enhance performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results.opportunities.map((opportunity, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getStatusIcon(opportunity.status)}</div>
                          <div>
                            <h3 className="font-medium">{opportunity.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{opportunity.description}</p>
                            <div className="mt-2">
                              <Badge variant="outline">Potential savings: {opportunity.savings}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Metrics</CardTitle>
                  <CardDescription>Complete performance data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    Detailed metrics would be displayed here in a real implementation
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-8">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Performance Report
            </Button>
          </div>
        </>
      )}

      {!isRunning && !results && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Gauge className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Run a Performance Test</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Analyze your frontend performance to identify bottlenecks and opportunities for improvement.
            </p>
            <Button onClick={runPerformanceTest}>Start Performance Test</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
