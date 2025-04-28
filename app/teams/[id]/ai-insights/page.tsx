"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, TrendingDown, BarChart3, Users, Zap } from "lucide-react"

export default function TeamAIInsightsPage({ params }: { params: { id: string } }) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateInsights = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Thunder Eagles</h1>
            <Badge variant="outline" className="ml-2">
              Basketball
            </Badge>
          </div>
          <div className="flex items-center mt-2">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <p className="text-muted-foreground">AI-Powered Team Insights</p>
          </div>
        </div>
        <Button onClick={handleGenerateInsights} disabled={isGenerating}>
          <Zap className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Refresh Insights"}
        </Button>
      </div>

      <Tabs defaultValue="performance" className="space-y-8">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 max-w-md">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  Strengths
                </CardTitle>
                <CardDescription>AI-identified team strengths</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">3-Point Shooting</h3>
                  <p className="text-sm text-muted-foreground">
                    The team excels at 3-point shooting with a 42% success rate, which is 8% above the league average.
                    Players #7 and #12 are particularly effective from beyond the arc.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Fast Break Efficiency</h3>
                  <p className="text-sm text-muted-foreground">
                    Fast break points account for 18% of total scoring, with a 65% conversion rate. This is a
                    significant advantage against slower defensive teams.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Team Chemistry</h3>
                  <p className="text-sm text-muted-foreground">
                    Assist-to-turnover ratio of 2.4:1 indicates excellent team chemistry and ball movement, particularly
                    in the second half of games.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>Opportunities identified by AI analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Defensive Rebounding</h3>
                  <p className="text-sm text-muted-foreground">
                    Defensive rebounding percentage of 68% is below league average of 72%. Opponents are scoring 12.4
                    second-chance points per game.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Free Throw Percentage</h3>
                  <p className="text-sm text-muted-foreground">
                    Team free throw percentage of 71% is 5% below league average. Players #4 and #9 are particularly
                    struggling at the line.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Fourth Quarter Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    The team's scoring efficiency drops by 8% in the fourth quarter, suggesting conditioning or rotation
                    issues that need addressing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 text-primary mr-2" />
                Performance Patterns
              </CardTitle>
              <CardDescription>AI-detected patterns in team performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Home Court Advantage</h3>
                <p className="text-sm text-muted-foreground">
                  The team performs 14% better at home games compared to away games, with particularly strong first
                  quarters at home (average +6.2 point differential).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Player Combinations</h3>
                <p className="text-sm text-muted-foreground">
                  The lineup of Smith, Johnson, Williams, Garcia, and Thompson has the highest efficiency rating (+12.4)
                  when playing together for stretches of 5+ minutes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Opponent Matchups</h3>
                <p className="text-sm text-muted-foreground">
                  The team struggles against zone defenses (efficiency drops by 18%) but excels against teams that
                  primarily use man-to-man defense.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 text-primary mr-2" />
                Recommended Strategies
              </CardTitle>
              <CardDescription>AI-generated strategic recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Offensive Adjustments</h3>
                <p className="text-sm text-muted-foreground">
                  Increase pick-and-roll plays with Johnson and Thompson, which have a 62% efficiency rating. Reduce
                  isolation plays which are only yielding 0.82 points per possession.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Defensive Adjustments</h3>
                <p className="text-sm text-muted-foreground">
                  Implement more aggressive help defense on opposing centers, who are shooting 58% against your team.
                  Consider more switching on perimeter screens to reduce 3-point opportunities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Rotation Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Data suggests staggering the minutes of Smith and Johnson to ensure at least one primary ball-handler
                  is on the court at all times. Consider giving Thompson more minutes with the second unit.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Practice Focus Areas</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicate additional practice time to defensive rebounding drills and free throw shooting, particularly
                  for players #4 and #9 who are shooting below 65% from the line.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                Player Utilization
              </CardTitle>
              <CardDescription>Optimizing individual player contributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Michael Johnson (#7)</h3>
                <p className="text-sm text-muted-foreground">
                  Johnson's efficiency increases by 24% when he receives at least 5 corner three attempts per game.
                  Consider running more plays to create these high-percentage opportunities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Sarah Thompson (#12)</h3>
                <p className="text-sm text-muted-foreground">
                  Thompson is most effective as a secondary playmaker rather than primary ball-handler. When she has 5+
                  assists, the team's winning percentage is 78%.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">David Williams (#4)</h3>
                <p className="text-sm text-muted-foreground">
                  Williams performs 32% better when playing 4-6 minute stretches rather than 8+ minute stretches.
                  Consider more frequent but shorter rotations to maximize his effectiveness.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Season Projections</CardTitle>
              <CardDescription>AI-powered predictions based on current performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Projected Final Record</h3>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold">24-8</div>
                    <Badge className="ml-3" variant="outline">
                      75% Win Rate
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on current performance trends and remaining schedule difficulty
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Playoff Probability</h3>
                  <div className="w-full bg-secondary rounded-full h-4">
                    <div className="bg-primary h-4 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">92% chance of making playoffs</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Championship Odds</h3>
                  <div className="w-full bg-secondary rounded-full h-4">
                    <div className="bg-primary h-4 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">18% chance of winning championship</p>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium mb-3">Key Upcoming Matchups</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">vs. Lightning Sharks</div>
                        <div className="text-sm text-muted-foreground">July 28, 2023</div>
                      </div>
                      <Badge>76% Win Probability</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">at Mountain Lions</div>
                        <div className="text-sm text-muted-foreground">August 5, 2023</div>
                      </div>
                      <Badge variant="outline">52% Win Probability</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">vs. Forest Wolves</div>
                        <div className="text-sm text-muted-foreground">August 12, 2023</div>
                      </div>
                      <Badge>84% Win Probability</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
