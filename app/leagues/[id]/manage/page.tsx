"use client";
import { useState } from "react";
import { use } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Calendar as CalendarIcon,
  Trophy,
  Calendar,
  Users,
  MapPin,
  Clock,
  ArrowLeft,
  Edit,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  UserPlus,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// This would come from your API in a real application
const leagueData = {
  id: 1,
  name: "Downtown Basketball League",
  sport: "Basketball",
  teams: 8,
  status: "Active",
  season: "Summer 2023",
  startDate: "2023-06-15",
  endDate: "2023-08-30",
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

const availableTeams = [
  { id: 8, name: "City Falcons", sport: "Basketball" },
  { id: 9, name: "Valley Hawks", sport: "Basketball" },
  { id: 10, name: "Metro Stars", sport: "Basketball" },
];

const games = [
  {
    id: 1,
    date: "2023-07-15",
    time: "18:00",
    homeTeam: "Thunder Eagles",
    homeTeamId: 1,
    awayTeam: "Lightning Sharks",
    awayTeamId: 2,
    location: "Court A",
    status: "Completed",
    homeScore: 78,
    awayScore: 72,
  },
  {
    id: 2,
    date: "2023-07-22",
    time: "19:30",
    homeTeam: "Mountain Lions",
    homeTeamId: 3,
    awayTeam: "River Rapids",
    awayTeamId: 4,
    location: "Court B",
    status: "Completed",
    homeScore: 65,
    awayScore: 60,
  },
  {
    id: 3,
    date: "2023-07-29",
    time: "18:00",
    homeTeam: "Desert Scorpions",
    homeTeamId: 5,
    awayTeam: "Forest Wolves",
    awayTeamId: 6,
    location: "Court A",
    status: "Completed",
    homeScore: 82,
    awayScore: 79,
  },
  {
    id: 4,
    date: "2023-08-05",
    time: "19:30",
    homeTeam: "Thunder Eagles",
    homeTeamId: 1,
    awayTeam: "Mountain Lions",
    awayTeamId: 3,
    location: "Court B",
    status: "Upcoming",
    homeScore: null,
    awayScore: null,
  },
];

export default function LeagueManagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [league, setLeague] = useState({ ...leagueData });
  const [teamsList, setTeamsList] = useState([...teams]);
  const [gamesList, setGamesList] = useState([...games]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(league.startDate)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(league.endDate)
  );
  const [editingGame, setEditingGame] = useState<any>(null);

  const handleSaveLeague = () => {
    // In a real app, this would save to your backend
    console.log("Saving league:", league);
    // Show success message
    alert("League details saved successfully!");
  };

  const handleAddTeam = () => {
    if (!selectedTeam) return;

    const teamToAdd = availableTeams.find(
      (team) => team.id.toString() === selectedTeam
    );
    if (!teamToAdd) return;

    // In a real app, this would call your backend API
    setTeamsList([
      ...teamsList,
      {
        ...teamToAdd,
        wins: 0,
        losses: 0,
        points: 0,
        pointDiff: 0,
      },
    ]);

    setSelectedTeam("");
  };

  const handleRemoveTeam = (teamId: number) => {
    // In a real app, this would call your backend API
    setTeamsList(teamsList.filter((team) => team.id !== teamId));
  };

  const handleGenerateSchedule = () => {
    setIsGeneratingSchedule(true);

    // Simulate API call to generate schedule
    setTimeout(() => {
      // In a real app, this would call your backend API
      alert("Schedule generated successfully!");
      setIsGeneratingSchedule(false);
    }, 1500);
  };

  const handleUpdateGame = (game: any) => {
    // In a real app, this would call your backend API
    setGamesList(gamesList.map((g) => (g.id === game.id ? game : g)));
    setEditingGame(null);
  };

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link href={`/leagues/${resolvedParams.id}`}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-lg font-medium">Back to League Details</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Manage League
            </h1>
            <Badge variant="outline">{league.sport}</Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {league.name}
          </p>
        </div>
        <Button onClick={handleSaveLeague} className="w-full md:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="details" className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="details" className="text-xs sm:text-sm">
            Details
          </TabsTrigger>
          <TabsTrigger value="teams" className="text-xs sm:text-sm">
            Teams
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-xs sm:text-sm">
            Schedule
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* League Details Tab */}
        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>League Information</CardTitle>
              <CardDescription>Update basic league details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">League Name</Label>
                  <Input
                    id="name"
                    value={league.name}
                    onChange={(e) =>
                      setLeague({ ...league, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sport">Sport</Label>
                  <Select
                    value={league.sport}
                    onValueChange={(value) =>
                      setLeague({ ...league, sport: value })
                    }
                  >
                    <SelectTrigger id="sport">
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basketball">Basketball</SelectItem>
                      <SelectItem value="Soccer">Soccer</SelectItem>
                      <SelectItem value="Volleyball">Volleyball</SelectItem>
                      <SelectItem value="Baseball">Baseball</SelectItem>
                      <SelectItem value="Hockey">Hockey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="season">Season</Label>
                  <Input
                    id="season"
                    value={league.season}
                    onChange={(e) =>
                      setLeague({ ...league, season: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={league.location}
                    onChange={(e) =>
                      setLeague({ ...league, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={league.description}
                    onChange={(e) =>
                      setLeague({ ...league, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveLeague}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Teams in League</CardTitle>
                  <CardDescription>
                    Manage teams participating in this league
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team to League</DialogTitle>
                      <DialogDescription>
                        Select a team to add to this league.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="team">Select Team</Label>
                      <Select
                        value={selectedTeam}
                        onValueChange={setSelectedTeam}
                      >
                        <SelectTrigger id="team">
                          <SelectValue placeholder="Select a team" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTeams.map((team) => (
                            <SelectItem
                              key={team.id}
                              value={team.id.toString()}
                            >
                              {team.name} ({team.sport})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddTeam}>Add Team</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">
                        W
                      </TableHead>
                      <TableHead className="text-center hidden sm:table-cell">
                        L
                      </TableHead>
                      <TableHead className="text-center hidden sm:table-cell">
                        Points
                      </TableHead>
                      <TableHead className="text-center hidden sm:table-cell">
                        +/-
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamsList.map((team) => (
                      <TableRow key={team.id}>
                        <TableCell>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-xs text-muted-foreground sm:hidden">
                            W: {team.wins} | L: {team.losses} | Pts:{" "}
                            {team.points} | +/-:{" "}
                            {team.pointDiff > 0
                              ? `+${team.pointDiff}`
                              : team.pointDiff}
                          </div>
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          {team.wins}
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          {team.losses}
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          {team.points}
                        </TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          {team.pointDiff > 0
                            ? `+${team.pointDiff}`
                            : team.pointDiff}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Team</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {team.name}{" "}
                                  from this league? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveTeam(team.id)}
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>League Schedule</CardTitle>
                  <CardDescription>Manage games and schedule</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Game
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Game</DialogTitle>
                        <DialogDescription>
                          Create a new game in the schedule.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Home Team</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team" />
                              </SelectTrigger>
                              <SelectContent>
                                {teamsList.map((team) => (
                                  <SelectItem
                                    key={team.id}
                                    value={team.id.toString()}
                                  >
                                    {team.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Away Team</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team" />
                              </SelectTrigger>
                              <SelectContent>
                                {teamsList.map((team) => (
                                  <SelectItem
                                    key={team.id}
                                    value={team.id.toString()}
                                  >
                                    {team.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  <span>Pick a date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent mode="single" initialFocus />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <Input id="time" type="time" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" placeholder="e.g., Court A" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button>Add Game</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={handleGenerateSchedule}
                    disabled={isGeneratingSchedule}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {isGeneratingSchedule
                      ? "Generating..."
                      : "Generate Schedule"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Time
                      </TableHead>
                      <TableHead>Teams</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Location
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Score
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gamesList.map((game) => (
                      <TableRow key={game.id}>
                        <TableCell>
                          <div>
                            {format(new Date(game.date), "MMM d, yyyy")}
                          </div>
                          <div className="text-xs text-muted-foreground sm:hidden">
                            {game.time}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {game.time}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {game.homeTeam} vs {game.awayTeam}
                          </div>
                          <div className="text-xs text-muted-foreground sm:hidden">
                            {game.location} | {game.status} |
                            {game.status === "Completed"
                              ? ` ${game.homeScore}-${game.awayScore}`
                              : " -"}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {game.location}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
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
                        <TableCell className="hidden sm:table-cell">
                          {game.status === "Completed"
                            ? `${game.homeScore}-${game.awayScore}`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Game</DialogTitle>
                                  <DialogDescription>
                                    Update game details or record scores.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>Home Team</Label>
                                      <div className="font-medium">
                                        {game.homeTeam}
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Away Team</Label>
                                      <div className="font-medium">
                                        {game.awayTeam}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="homeScore">
                                        Home Score
                                      </Label>
                                      <Input
                                        id="homeScore"
                                        type="number"
                                        defaultValue={game.homeScore || ""}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="awayScore">
                                        Away Score
                                      </Label>
                                      <Input
                                        id="awayScore"
                                        type="number"
                                        defaultValue={game.awayScore || ""}
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select defaultValue={game.status}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Upcoming">
                                          Upcoming
                                        </SelectItem>
                                        <SelectItem value="In Progress">
                                          In Progress
                                        </SelectItem>
                                        <SelectItem value="Completed">
                                          Completed
                                        </SelectItem>
                                        <SelectItem value="Postponed">
                                          Postponed
                                        </SelectItem>
                                        <SelectItem value="Cancelled">
                                          Cancelled
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    onClick={() => handleUpdateGame(game)}
                                  >
                                    Save Changes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Game
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this game?
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>League Settings</CardTitle>
              <CardDescription>
                Configure league settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">League Status</Label>
                <Select
                  value={league.status}
                  onValueChange={(value) =>
                    setLeague({ ...league, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Registration">Registration</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scoring">Scoring System</Label>
                <Select defaultValue="standard">
                  <SelectTrigger id="scoring">
                    <SelectValue placeholder="Select scoring system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">
                      Standard (Win: 3, Draw: 1, Loss: 0)
                    </SelectItem>
                    <SelectItem value="alternative">
                      Alternative (Win: 2, Draw: 1, Loss: 0)
                    </SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiebreaker">Tiebreaker Rules</Label>
                <Select defaultValue="points">
                  <SelectTrigger id="tiebreaker">
                    <SelectValue placeholder="Select tiebreaker rules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points Differential</SelectItem>
                    <SelectItem value="headtohead">Head-to-Head</SelectItem>
                    <SelectItem value="pointsfor">Points For</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibility">League Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="invitation">Invitation Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete League</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete League</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this league? This action
                      cannot be undone and will remove all associated data
                      including teams, games, and statistics.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={handleSaveLeague}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
