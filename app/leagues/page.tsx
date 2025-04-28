import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trophy, Plus, Calendar } from "lucide-react"

// This would come from your API in a real application
const leagues = [
  {
    id: 1,
    name: "Downtown Basketball League",
    sport: "Basketball",
    teams: 8,
    status: "Active",
    season: "Summer 2023",
    startDate: "Jun 15, 2023",
    endDate: "Aug 30, 2023",
  },
  {
    id: 2,
    name: "City Soccer Championship",
    sport: "Soccer",
    teams: 12,
    status: "Registration",
    season: "Fall 2023",
    startDate: "Sep 10, 2023",
    endDate: "Nov 25, 2023",
  },
  {
    id: 3,
    name: "Community Baseball Tournament",
    sport: "Baseball",
    teams: 6,
    status: "Completed",
    season: "Spring 2023",
    startDate: "Mar 5, 2023",
    endDate: "May 20, 2023",
  },
]

export default function LeaguesPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leagues</h1>
          <p className="text-muted-foreground mt-1">Browse and manage sports leagues</p>
        </div>
        <Link href="/leagues/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create League
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {leagues.map((league) => (
          <Card key={league.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{league.name}</CardTitle>
                  <CardDescription>
                    {league.sport} - {league.season}
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    league.status === "Active" ? "default" : league.status === "Registration" ? "secondary" : "outline"
                  }
                >
                  {league.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{league.teams} teams</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {league.startDate} - {league.endDate}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/leagues/${league.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Link href={`/leagues/${league.id}/manage`}>
                <Button variant="secondary">Manage League</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
