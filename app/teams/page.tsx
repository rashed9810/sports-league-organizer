"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, Plus, Loader2 } from "lucide-react"
import { apiClient, Team } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await apiClient.getTeams()
        setTeams(teamsData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load teams",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeams()
  }, [])
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
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground mt-1">Manage your teams and rosters</p>
        </div>
        {isAuthenticated && (
          <Link href="/teams/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </Link>
        )}
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No teams found</h3>
          <p className="text-muted-foreground mb-4">
            {isAuthenticated
              ? "Create your first team to get started"
              : "Sign in to view and manage teams"}
          </p>
          {isAuthenticated && (
            <Link href="/teams/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.sport}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{team.members_count} members</span>
                </div>
                {team.coach && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    Coach: {team.coach.first_name} {team.coach.last_name}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/teams/${team.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                {isAuthenticated && (
                  <Link href={`/teams/${team.id}/edit`}>
                    <Button variant="secondary">Manage Team</Button>
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
