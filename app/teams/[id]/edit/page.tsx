"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Save, UserPlus, Trash2, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Mock data
const teamData = {
  id: 1,
  name: "Thunder Eagles",
  sport: "Basketball",
  logo: "/placeholder.svg",
  founded: "2020",
  location: "Downtown Sports Complex",
  description:
    "A competitive basketball team focused on player development and community engagement.",
};

const players = [
  {
    id: 1,
    name: "John Smith",
    position: "Forward",
    jerseyNumber: 7,
    avatar: "/placeholder.svg",
    email: "john.smith@example.com",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    position: "Guard",
    jerseyNumber: 12,
    avatar: "/placeholder.svg",
    email: "sarah.thompson@example.com",
  },
];

const availableUsers = [
  {
    id: 9,
    name: "Kevin Johnson",
    email: "kevin.johnson@example.com",
    avatar: "/placeholder.svg",
  },
  {
    id: 10,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@example.com",
    avatar: "/placeholder.svg",
  },
];

export default function TeamEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [team, setTeam] = useState({ ...teamData });
  const [teamPlayers, setTeamPlayers] = useState([...players]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newPlayerData, setNewPlayerData] = useState({
    position: "",
    jerseyNumber: "",
  });

  const handleSaveTeam = () => {
    console.log("Saving team:", team);
    alert("Team details saved successfully!");
  };

  const handleAddPlayer = () => {
    if (!selectedUser) return;

    const userToAdd = availableUsers.find(
      (user) => user.id.toString() === selectedUser
    );
    if (!userToAdd) return;

    setTeamPlayers([
      ...teamPlayers,
      {
        id: userToAdd.id,
        name: userToAdd.name,
        position: newPlayerData.position,
        jerseyNumber: parseInt(newPlayerData.jerseyNumber),
        avatar: userToAdd.avatar,
        email: userToAdd.email,
      },
    ]);

    setSelectedUser("");
    setNewPlayerData({
      position: "",
      jerseyNumber: "",
    });
  };

  const handleRemovePlayer = (playerId: number) => {
    setTeamPlayers(teamPlayers.filter((player) => player.id !== playerId));
  };

  return (
    <div className="container py-10">
      <div className="flex items-center gap-2 mb-6">
        <Link href={`/teams/${resolvedParams.id}`}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-lg font-medium">Back to Team Details</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manage Team
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            {team.name}
          </p>
        </div>
        <Button onClick={handleSaveTeam} className="w-full md:w-auto">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Team Information</CardTitle>
            <CardDescription>Update basic team details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                value={team.name}
                onChange={(e) => setTeam({ ...team, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select
                value={team.sport}
                onValueChange={(value) => setTeam({ ...team, sport: value })}
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
              <Label htmlFor="founded">Founded</Label>
              <Input
                id="founded"
                value={team.founded}
                onChange={(e) => setTeam({ ...team, founded: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Home Court/Field</Label>
              <Input
                id="location"
                value={team.location}
                onChange={(e) => setTeam({ ...team, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={team.description}
                onChange={(e) =>
                  setTeam({ ...team, description: e.target.value })
                }
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveTeam}>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Logo</CardTitle>
            <CardDescription>Upload or update your team logo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={team.logo} alt={team.name} />
                <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended size: 512x512px. Max file size: 2MB.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Team Roster</CardTitle>
              <CardDescription>Manage players on your team</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Player
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Player to Team</DialogTitle>
                  <DialogDescription>
                    Add a new player to your team roster.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Select User</Label>
                    <Select
                      value={selectedUser}
                      onValueChange={setSelectedUser}
                    >
                      <SelectTrigger id="user">
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id.toString()}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      placeholder="e.g., Forward, Guard, Center"
                      value={newPlayerData.position}
                      onChange={(e) =>
                        setNewPlayerData({
                          ...newPlayerData,
                          position: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jerseyNumber">Jersey Number</Label>
                    <Input
                      id="jerseyNumber"
                      type="number"
                      placeholder="e.g., 23"
                      value={newPlayerData.jerseyNumber}
                      onChange={(e) =>
                        setNewPlayerData({
                          ...newPlayerData,
                          jerseyNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddPlayer}>Add Player</Button>
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
                  <TableHead>Player</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Position
                  </TableHead>
                  <TableHead className="text-center hidden sm:table-cell">
                    Jersey #
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback>
                            {player.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-xs text-muted-foreground sm:hidden">
                            {player.position} | #{player.jerseyNumber} |{" "}
                            {player.email}
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
                    <TableCell className="hidden sm:table-cell">
                      {player.email}
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
                            <AlertDialogTitle>Remove Player</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {player.name} from
                              this team? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemovePlayer(player.id)}
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

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for your team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Team</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Team</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this team? This action cannot
                  be undone and will remove all associated data including
                  players, games, and statistics.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
