"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Users,
  MapPin,
  ArrowLeft,
  Edit,
  BarChart,
  Sparkles,
  Loader2,
} from "lucide-react";
import { apiClient, Team } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

// This would come from your API in a real application
const teamData = {
  id: 1,
  name: "Thunder Eagles",
  sport: "Basketball",
  logo: "/placeholder.svg",
  members: 12,
  wins: 12,
  losses: 4,
  founded: "2020",
  location: "Downtown Sports Complex",
  description:
    "A competitive basketball team focused on player development and community engagement.",
  coach: {
    id: 5,
    name: "Michael Johnson",
    position: "Head Coach",
    avatar: "/placeholder.svg",
  },
};

const players = [
  {
    id: 1,
    name: "John Smith",
    position: "Forward",
    jerseyNumber: 7,
    avatar: "/placeholder.svg",
    stats: { ppg: 18.5, rpg: 7.2, apg: 3.1 },
  },
  {
    id: 2,
    name: "Sarah Thompson",
    position: "Guard",
    jerseyNumber: 12,
    avatar: "/placeholder.svg",
    stats: { ppg: 15.8, rpg: 2.5, apg: 6.3 },
  },
  {
    id: 3,
    name: "David Williams",
    position: "Center",
    jerseyNumber: 33,
    avatar: "/placeholder.svg",
    stats: { ppg: 12.2, rpg: 10.5, apg: 1.2 },
  },
  {
    id: 4,
    name: "Emily Johnson",
    position: "Guard",
    jerseyNumber: 4,
    avatar: "/placeholder.svg",
    stats: { ppg: 14.7, rpg: 3.2, apg: 5.8 },
  },
  {
    id: 5,
    name: "Michael Brown",
    position: "Forward",
    jerseyNumber: 21,
    avatar: "/placeholder.svg",
    stats: { ppg: 10.3, rpg: 6.7, apg: 2.1 },
  },
  {
    id: 6,
    name: "Jessica Davis",
    position: "Forward",
    jerseyNumber: 15,
    avatar: "/placeholder.svg",
    stats: { ppg: 8.5, rpg: 4.3, apg: 1.5 },
  },
  {
    id: 7,
    name: "Robert Wilson",
    position: "Center",
    jerseyNumber: 45,
    avatar: "/placeholder.svg",
    stats: { ppg: 7.2, rpg: 8.1, apg: 0.8 },
  },
  {
    id: 8,
    name: "Amanda Martinez",
    position: "Guard",
    jerseyNumber: 9,
    avatar: "/placeholder.svg",
    stats: { ppg: 9.6, rpg: 2.1, apg: 4.2 },
  },
];

const recentGames = [
  {
    id: 1,
    date: "Jul 15, 2023",
    opponent: "Lightning Sharks",
    result: "W",
    score: "78-72",
    location: "Home",
  },
  {
    id: 2,
    date: "Jul 8, 2023",
    opponent: "Mountain Lions",
    result: "W",
    score: "85-80",
    location: "Away",
  },
  {
    id: 3,
    date: "Jul 1, 2023",
    opponent: "Desert Scorpions",
    result: "L",
    score: "70-75",
    location: "Home",
  },
  {
    id: 4,
    date: "Jun 24, 2023",
    opponent: "Forest Wolves",
    result: "W",
    score: "92-85",
    location: "Away",
  },
  {
    id: 5,
    date: "Jun 17, 2023",
    opponent: "River Rapids",
    result: "W",
    score: "88-79",
    location: "Home",
  },
];

const upcomingGames = [
  {
    id: 1,
    date: "Jul 22, 2023",
    time: "7:30 PM",
    opponent: "Ocean Sharks",
    location: "Home",
  },
  {
    id: 2,
    date: "Jul 29, 2023",
    time: "6:00 PM",
    opponent: "Valley Hawks",
    location: "Away",
  },
  {
    id: 3,
    date: "Aug 5, 2023",
    time: "7:00 PM",
    opponent: "Metro Stars",
    location: "Home",
  },
];

export default function TeamDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/teams">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-lg font-medium">Back to Teams</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <Avatar className="h-16 w-16">
            <AvatarImage src={teamData.logo} alt={teamData.name} />
            <AvatarFallback>{teamData.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {teamData.name}
              </h1>
              <Badge variant="outline">{teamData.sport}</Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {teamData.description}
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-end mt-4 md:mt-0">
          <Link
            href={`/teams/${resolvedParams.id}/ai-insights`}
            className="w-full md:w-auto"
          >
            <Button variant="outline" className="w-full md:w-auto">
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">AI Insights</span>
              <span className="sm:hidden">AI</span>
            </Button>
          </Link>
          <Link
            href={`/teams/${resolvedParams.id}/edit`}
            className="w-full md:w-auto"
          >
            <Button className="w-full md:w-auto">
              <Edit className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Manage Team</span>
              <span className="sm:hidden">Manage</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Record</span>
                </div>
                <span className="text-sm font-medium">
                  {teamData.wins}-{teamData.losses}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Founded</span>
                </div>
                <span className="text-sm font-medium">{teamData.founded}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Members</span>
                </div>
                <span className="text-sm font-medium">{teamData.members}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Home Court</span>
                </div>
                <span className="text-sm font-medium">{teamData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Win Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(
                      (teamData.wins / (teamData.wins + teamData.losses)) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{
                      width: `${Math.round(
                        (teamData.wins / (teamData.wins + teamData.losses)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    Points Per Game
                  </div>
                  <div className="text-2xl font-bold">82.4</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Rebounds</div>
                  <div className="text-2xl font-bold">38.7</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Assists</div>
                  <div className="text-2xl font-bold">21.2</div>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Steals</div>
                  <div className="text-2xl font-bold">8.5</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="roster" className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="roster" className="text-xs sm:text-sm">
            Roster
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-xs sm:text-sm">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-xs sm:text-sm">
            Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="roster" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Team Roster</CardTitle>
                  <CardDescription>Players and coaching staff</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Coaching Staff</h3>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <Avatar>
                    <AvatarImage
                      src={teamData.coach.avatar}
                      alt={teamData.coach.name}
                    />
                    <AvatarFallback>
                      {teamData.coach.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{teamData.coach.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {teamData.coach.position}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-3">Players</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Position
                      </TableHead>
                      <TableHead className="text-center hidden sm:table-cell">
                        Jersey
                      </TableHead>
                      <TableHead className="text-right">Stats</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={player.avatar}
                                alt={player.name}
                              />
                              <AvatarFallback>
                                {player.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-xs text-muted-foreground sm:hidden">
                                {player.position} | #{player.jerseyNumber}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {player.position}
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          {player.jerseyNumber}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="text-xs sm:text-sm">
                            <span className="hidden sm:inline">
                              {player.stats.ppg} PPG | {player.stats.rpg} RPG |{" "}
                              {player.stats.apg} APG
                            </span>
                            <span className="sm:hidden">
                              {player.stats.ppg}/{player.stats.rpg}/
                              {player.stats.apg}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Schedule</CardTitle>
              <CardDescription>Upcoming and recent games</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Upcoming Games</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Time
                        </TableHead>
                        <TableHead>Opponent</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Location
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingGames.map((game) => (
                        <TableRow key={game.id}>
                          <TableCell>
                            <div>{game.date}</div>
                            <div className="text-xs text-muted-foreground sm:hidden">
                              {game.time}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {game.time}
                          </TableCell>
                          <TableCell>
                            <div>{game.opponent}</div>
                            <div className="text-xs text-muted-foreground sm:hidden">
                              {game.location}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {game.location}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Recent Games</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Opponent</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Location
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentGames.map((game) => (
                        <TableRow key={game.id}>
                          <TableCell>{game.date}</TableCell>
                          <TableCell>
                            <div>{game.opponent}</div>
                            <div className="text-xs text-muted-foreground sm:hidden">
                              {game.location}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                game.result === "W" ? "default" : "secondary"
                              }
                            >
                              {game.result}
                            </Badge>
                          </TableCell>
                          <TableCell>{game.score}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {game.location}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Statistics</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Offensive Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Points Per Game</div>
                      <div className="font-medium text-sm sm:text-base">
                        82.4
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Field Goal %</div>
                      <div className="font-medium text-sm sm:text-base">
                        46.2%
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">3-Point %</div>
                      <div className="font-medium text-sm sm:text-base">
                        37.8%
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Free Throw %</div>
                      <div className="font-medium text-sm sm:text-base">
                        78.5%
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Assists Per Game</div>
                      <div className="font-medium text-sm sm:text-base">
                        21.2
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">
                        Turnovers Per Game
                      </div>
                      <div className="font-medium text-sm sm:text-base">
                        12.7
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 md:mt-0">
                  <h3 className="text-lg font-medium mb-4">Defensive Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Opponent PPG</div>
                      <div className="font-medium text-sm sm:text-base">
                        76.8
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">
                        Rebounds Per Game
                      </div>
                      <div className="font-medium text-sm sm:text-base">
                        38.7
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Steals Per Game</div>
                      <div className="font-medium text-sm sm:text-base">
                        8.5
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Blocks Per Game</div>
                      <div className="font-medium text-sm sm:text-base">
                        5.2
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Opponent FG %</div>
                      <div className="font-medium text-sm sm:text-base">
                        42.3%
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm">Opponent 3PT %</div>
                      <div className="font-medium text-sm sm:text-base">
                        33.5%
                      </div>
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
