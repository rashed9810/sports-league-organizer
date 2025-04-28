"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart, PieChart } from "lucide-react"

// This would be fetched from your API in a real application
const performanceData = {
  teams: [
    { name: "Thunder Eagles", wins: 12, losses: 4, points: 36, pointsAgainst: 24 },
    { name: "Lightning Sharks", wins: 10, losses: 6, points: 30, pointsAgainst: 28 },
    { name: "Mountain Lions", wins: 8, losses: 8, points: 24, pointsAgainst: 26 },
    { name: "River Rapids", wins: 6, losses: 10, points: 18, pointsAgainst: 30 },
  ],
  players: [
    { name: "John Smith", team: "Thunder Eagles", points: 120, assists: 45, rebounds: 30 },
    { name: "Maria Garcia", team: "Lightning Sharks", points: 115, assists: 50, rebounds: 25 },
    { name: "David Johnson", team: "Mountain Lions", points: 105, assists: 40, rebounds: 35 },
    { name: "Sarah Williams", team: "River Rapids", points: 95, assists: 55, rebounds: 20 },
  ],
}

export default function AnalyticsPage() {
  const [selectedLeague, setSelectedLeague] = useState("basketball")
  const [selectedSeason, setSelectedSeason] = useState("summer-2023")

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Comprehensive statistics and performance insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select League" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basketball">Basketball League</SelectItem>
              <SelectItem value="soccer">Soccer League</SelectItem>
              <SelectItem value="volleyball">Volleyball League</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summer-2023">Summer 2023</SelectItem>
              <SelectItem value="spring-2023">Spring 2023</SelectItem>
              <SelectItem value="winter-2022">Winter 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="League Performance"
              description="Key metrics for the current season"
              icon={<BarChart className="h-5 w-5 text-primary" />}
              stats={[
                { label: "Total Games", value: "36" },
                { label: "Avg. Score", value: "78.5" },
                { label: "Highest Score", value: "112" },
              ]}
            />
            <StatsCard
              title="Attendance"
              description="Fan engagement statistics"
              icon={<PieChart className="h-5 w-5 text-primary" />}
              stats={[
                { label: "Total Fans", value: "4,250" },
                { label: "Avg. Attendance", value: "118" },
                { label: "Capacity %", value: "86%" },
              ]}
            />
            <StatsCard
              title="Growth"
              description="League expansion metrics"
              icon={<LineChart className="h-5 w-5 text-primary" />}
              stats={[
                { label: "New Teams", value: "+3" },
                { label: "New Players", value: "+42" },
                { label: "YoY Growth", value: "18%" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Win/loss ratio for top teams</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  [Interactive Chart Visualization Would Appear Here]
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Scoring Trends</CardTitle>
                <CardDescription>Points per game over the season</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  [Interactive Chart Visualization Would Appear Here]
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Rankings</CardTitle>
              <CardDescription>Performance metrics for all teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Team</th>
                      <th className="text-center py-3 px-4">W</th>
                      <th className="text-center py-3 px-4">L</th>
                      <th className="text-center py-3 px-4">Points For</th>
                      <th className="text-center py-3 px-4">Points Against</th>
                      <th className="text-center py-3 px-4">Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.teams.map((team, index) => (
                      <tr key={team.name} className="border-b">
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4 font-medium">{team.name}</td>
                        <td className="text-center py-3 px-4">{team.wins}</td>
                        <td className="text-center py-3 px-4">{team.losses}</td>
                        <td className="text-center py-3 px-4">{team.points}</td>
                        <td className="text-center py-3 px-4">{team.pointsAgainst}</td>
                        <td className="text-center py-3 px-4">{team.points - team.pointsAgainst}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="players" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Player Statistics</CardTitle>
              <CardDescription>Individual performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Player</th>
                      <th className="text-left py-3 px-4">Team</th>
                      <th className="text-center py-3 px-4">Points</th>
                      <th className="text-center py-3 px-4">Assists</th>
                      <th className="text-center py-3 px-4">Rebounds</th>
                      <th className="text-center py-3 px-4">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.players.map((player) => (
                      <tr key={player.name} className="border-b">
                        <td className="py-3 px-4 font-medium">{player.name}</td>
                        <td className="py-3 px-4">{player.team}</td>
                        <td className="text-center py-3 px-4">{player.points}</td>
                        <td className="text-center py-3 px-4">{player.assists}</td>
                        <td className="text-center py-3 px-4">{player.rebounds}</td>
                        <td className="text-center py-3 px-4">
                          {((player.points + player.assists * 1.5 + player.rebounds) / 100).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <div className="text-center py-12 text-muted-foreground">Match analytics content would appear here</div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="text-center py-12 text-muted-foreground">Trend analysis content would appear here</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({ title, description, icon, stats }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center">
              <div className="text-sm font-medium text-muted-foreground w-28">{stat.label}</div>
              <div className="font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
