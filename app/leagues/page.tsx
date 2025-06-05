"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Trophy, Plus, Calendar, Loader2 } from "lucide-react"
import { apiClient, League } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<League[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leaguesData = await apiClient.getLeagues()
        setLeagues(leaguesData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load leagues",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeagues()
  }, [])

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
  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leagues</h1>
          <p className="text-muted-foreground mt-1">Browse and manage sports leagues</p>
        </div>
        {isAuthenticated && (
          <Link href="/leagues/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create League
            </Button>
          </Link>
        )}
      </div>

      {leagues.length === 0 ? (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No leagues found</h3>
          <p className="text-muted-foreground mb-4">
            {isAuthenticated
              ? "Create your first league to get started"
              : "Sign in to view and manage leagues"}
          </p>
          {isAuthenticated && (
            <Link href="/leagues/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create League
              </Button>
            </Link>
          )}
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
                {isAuthenticated && (
                  <Link href={`/leagues/${league.id}/manage`}>
                    <Button variant="secondary">Manage League</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
