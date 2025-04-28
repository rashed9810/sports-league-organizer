import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, Plus } from "lucide-react"

// This would come from your API in a real application
const teams = [
  { id: 1, name: "Thunder Eagles", sport: "Basketball", members: 12 },
  { id: 2, name: "Lightning Sharks", sport: "Soccer", members: 18 },
  { id: 3, name: "Mountain Lions", sport: "Baseball", members: 15 },
  { id: 4, name: "River Rapids", sport: "Hockey", members: 20 },
  { id: 5, name: "Desert Scorpions", sport: "Volleyball", members: 10 },
  { id: 6, name: "Forest Wolves", sport: "Basketball", members: 12 },
]

export default function TeamsPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground mt-1">Manage your teams and rosters</p>
        </div>
        <Link href="/teams/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>{team.sport}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{team.members} members</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/teams/${team.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Link href={`/teams/${team.id}/edit`}>
                <Button variant="secondary">Manage Team</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
