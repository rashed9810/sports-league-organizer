import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowLeft,
  Edit,
} from "lucide-react";
import { use } from "react";

// This would come from your API in a real application
const leagueData = {
  id: 1,
  name: "Downtown Basketball League",
  sport: "Basketball",
  teams: 8,
  status: "Active",
  season: "Summer 2023",
  startDate: "Jun 15, 2023",
  endDate: "Aug 30, 2023",
  description:
    "A competitive basketball league for local teams in the downtown area.",
  organizer: "John Smith",
  location: "Downtown Sports Complex",
};

const teams = [
  {
    id: 1,
    name: "Thunder Eagles",
    wins: 6,
    losses: 2,
    points: 18,
    pointDiff: 45,
  },
  {
    id: 2,
    name: "Lightning Sharks",
    wins: 5,
    losses: 3,
    points: 15,
    pointDiff: 28,
  },
  {
    id: 3,
    name: "Mountain Lions",
    wins: 5,
    losses: 3,
    points: 15,
    pointDiff: 12,
  },
  {
    id: 4,
    name: "River Rapids",
    wins: 4,
    losses: 4,
    points: 12,
    pointDiff: -5,
  },
  {
    id: 5,
    name: "Desert Scorpions",
    wins: 3,
    losses: 5,
    points: 9,
    pointDiff: -15,
  },
  {
    id: 6,
    name: "Forest Wolves",
    wins: 3,
    losses: 5,
    points: 9,
    pointDiff: -20,
  },
  {
    id: 7,
    name: "Ocean Sharks",
    wins: 2,
    losses: 6,
    points: 6,
    pointDiff: -45,
  },
];

const games = [
  {
    id: 1,
    date: "Jul 15, 2023",
    time: "6:00 PM",
    homeTeam: "Thunder Eagles",
    awayTeam: "Lightning Sharks",
    location: "Court A",
    status: "Completed",
    score: "78-72",
  },
  {
    id: 2,
    date: "Jul 22, 2023",
    time: "7:30 PM",
    homeTeam: "Mountain Lions",
    awayTeam: "River Rapids",
    location: "Court B",
    status: "Completed",
    score: "65-60",
  },
  {
    id: 3,
    date: "Jul 29, 2023",
    time: "6:00 PM",
    homeTeam: "Desert Scorpions",
    awayTeam: "Forest Wolves",
    location: "Court A",
    status: "Completed",
    score: "82-79",
  },
  {
    id: 4,
    date: "Aug 5, 2023",
    time: "7:30 PM",
    homeTeam: "Thunder Eagles",
    awayTeam: "Mountain Lions",
    location: "Court B",
    status: "Upcoming",
    score: "-",
  },
];

export default function LeagueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/leagues">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-lg font-medium">Back to Leagues</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {leagueData.name}
            </h1>
            <Badge variant="outline" className="ml-2">
              {leagueData.sport}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{leagueData.description}</p>
        </div>
        <Link href={`/leagues/${resolvedParams.id}/manage`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Manage League
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">League Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Teams</span>
                </div>
                <span className="text-sm font-medium">{leagueData.teams}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Season</span>
                </div>
                <span className="text-sm font-medium">{leagueData.season}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Dates</span>
                </div>
                <span className="text-sm font-medium">
                  {leagueData.startDate} - {leagueData.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Organizer</span>
                </div>
                <span className="text-sm font-medium">
                  {leagueData.organizer}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Location</span>
                </div>
                <span className="text-sm font-medium">
                  {leagueData.location}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">League Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Season Progress</span>
                  <span className="text-sm text-muted-foreground">
                    65% Complete
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    Total Games
                  </div>
                  <div className="text-2xl font-bold">24</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Completed</div>
                  <div className="text-2xl font-bold">16</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Upcoming</div>
                  <div className="text-2xl font-bold">8</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    Avg. Score
                  </div>
                  <div className="text-2xl font-bold">74.5</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="standings" className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="standings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>League Standings</CardTitle>
              <CardDescription>
                Current team rankings and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">W</TableHead>
                    <TableHead className="text-center">L</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                    <TableHead className="text-center">+/-</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team, index) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{team.name}</TableCell>
                      <TableCell className="text-center">{team.wins}</TableCell>
                      <TableCell className="text-center">
                        {team.losses}
                      </TableCell>
                      <TableCell className="text-center">
                        {team.points}
                      </TableCell>
                      <TableCell className="text-center">
                        {team.pointDiff > 0
                          ? `+${team.pointDiff}`
                          : team.pointDiff}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/teams/${team.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>League Schedule</CardTitle>
              <CardDescription>Upcoming and completed games</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Home Team</TableHead>
                    <TableHead>Away Team</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {games.map((game) => (
                    <TableRow key={game.id}>
                      <TableCell>{game.date}</TableCell>
                      <TableCell>{game.time}</TableCell>
                      <TableCell>{game.homeTeam}</TableCell>
                      <TableCell>{game.awayTeam}</TableCell>
                      <TableCell>{game.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            game.status === "Completed"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {game.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{game.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>League Statistics</CardTitle>
              <CardDescription>
                Performance metrics and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Top Scorers</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <div className="font-medium">Michael Johnson</div>
                          <div className="text-sm text-muted-foreground">
                            Thunder Eagles
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-bold">24.5</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <div className="font-medium">David Williams</div>
                          <div className="text-sm text-muted-foreground">
                            Lightning Sharks
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-bold">22.8</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <div className="font-medium">Robert Davis</div>
                          <div className="text-sm text-muted-foreground">
                            Mountain Lions
                          </div>
                        </div>
                      </div>
                      <div className="text-xl font-bold">21.2</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Team Offense</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                        <div className="font-medium">Thunder Eagles</div>
                      </div>
                      <div className="text-xl font-bold">82.4</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-secondary text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div className="font-medium">Desert Scorpions</div>
                      </div>
                      <div className="text-xl font-bold">78.6</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted text-muted-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div className="font-medium">Lightning Sharks</div>
                      </div>
                      <div className="text-xl font-bold">76.2</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
