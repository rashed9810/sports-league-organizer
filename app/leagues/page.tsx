import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trophy, Calendar } from "lucide-react"
import { apiClient } from "@/lib/api"
import { LeagueListActions, LeagueEmptyStateActions } from "@/components/leagues/league-list-actions"
import { LeagueCardActions } from "@/components/leagues/league-card-actions"

// Revalidate data every 60 seconds
export const revalidate = 60

export default async function LeaguesPage() {
  const leagues = await apiClient.getLeagues()

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default'
      case 'registration':
        return 'secondary'
      case 'completed':
        return 'outline'
      default:
        return 'outline'
    }
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leagues</h1>
          <p className="text-muted-foreground mt-1">Browse and manage sports leagues</p>
        </div>
        <LeagueListActions />
      </div>

      {leagues.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No leagues found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first league to get started
          </p>
          <LeagueEmptyStateActions />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {leagues.map((league) => (
            <Card key={league.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{league.name}</CardTitle>
                    <CardDescription>
                      {league.sport} - {league.season}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(league.status)}>
                    {league.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{league.teams_count} teams</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(league.start_date).toLocaleDateString()} - {new Date(league.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Organizer: {league.organizer.first_name} {league.organizer.last_name}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/leagues/${league.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <LeagueCardActions leagueId={league.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
