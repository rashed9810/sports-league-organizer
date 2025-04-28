import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Calendar, Clock, MapPin } from "lucide-react"

// This would come from your API in a real application
const matches = [
  {
    id: 1,
    homeTeam: "Thunder Eagles",
    awayTeam: "Forest Wolves",
    league: "Downtown Basketball League",
    date: "Jul 15, 2023",
    time: "6:00 PM",
    location: "Central Park Court",
    status: "Upcoming",
  },
  {
    id: 2,
    homeTeam: "Lightning Sharks",
    awayTeam: "River Rapids",
    league: "City Soccer Championship",
    date: "Jul 16, 2023",
    time: "4:30 PM",
    location: "Riverside Field",
    status: "Upcoming",
  },
  {
    id: 3,
    homeTeam: "Mountain Lions",
    awayTeam: "Desert Scorpions",
    league: "Community Baseball Tournament",
    date: "Jul 10, 2023",
    time: "3:00 PM",
    location: "Diamond Stadium",
    status: "Completed",
    score: {
      home: 5,
      away: 3,
    },
  },
]

export default function SchedulePage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground mt-1">View upcoming and past matches</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {matches
            .filter((match) => match.status === "Upcoming")
            .map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {matches
            .filter((match) => match.status === "Completed")
            .map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MatchCard({ match }: { match: any }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{match.league}</CardTitle>
          <Badge variant={match.status === "Upcoming" ? "outline" : "secondary"}>{match.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-center gap-4 text-center">
              <div className="font-semibold">{match.homeTeam}</div>
              <div className="flex items-center">
                {match.status === "Completed" ? (
                  <div className="text-xl font-bold px-6">
                    {match.score.home} - {match.score.away}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground px-6">vs</div>
                )}
              </div>
              <div className="font-semibold">{match.awayTeam}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{match.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{match.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{match.location}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Link href={`/matches/${match.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
