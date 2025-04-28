import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, Share2, Calendar, Users, Trophy } from "lucide-react"

// This would come from your API in a real application
const posts = [
  {
    id: 1,
    author: {
      name: "John Smith",
      username: "jsmith",
      avatar: "/placeholder.svg?height=40&width=40",
      team: "Thunder Eagles",
    },
    content:
      "Great game yesterday! Our team showed amazing teamwork in the second half. Special shoutout to @mwilliams for those clutch three-pointers! #ThunderEagles #Basketball",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    images: ["/placeholder.svg?height=300&width=500"],
  },
  {
    id: 2,
    author: {
      name: "Sarah Thompson",
      username: "sthompson",
      avatar: "/placeholder.svg?height=40&width=40",
      team: "Lightning Sharks",
    },
    content:
      "Registration for the summer youth camp is now open! We're looking forward to meeting the next generation of soccer stars. Sign up through the link below. #YouthSoccer #SummerCamp",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 12,
    shares: 15,
    images: [],
  },
  {
    id: 3,
    author: {
      name: "Downtown Basketball League",
      username: "dbl",
      avatar: "/placeholder.svg?height=40&width=40",
      isOrganization: true,
    },
    content:
      "🏆 Championship Finals Update 🏆\n\nThe championship game between Thunder Eagles and Forest Wolves will be held this Saturday at 7 PM at Central Park Court. Don't miss this exciting matchup! Tickets available online or at the door. #BasketballFinals #Championship",
    timestamp: "1 day ago",
    likes: 87,
    comments: 32,
    shares: 45,
    images: ["/placeholder.svg?height=300&width=500"],
  },
]

const events = [
  {
    id: 1,
    title: "Championship Finals",
    description: "Thunder Eagles vs Forest Wolves",
    date: "July 22, 2023",
    time: "7:00 PM",
    location: "Central Park Court",
    attendees: 124,
  },
  {
    id: 2,
    title: "Youth Summer Camp",
    description: "Basketball skills camp for ages 8-14",
    date: "August 5-12, 2023",
    time: "9:00 AM - 3:00 PM",
    location: "Community Sports Center",
    attendees: 45,
  },
  {
    id: 3,
    title: "Coaches Workshop",
    description: "Training session for new and experienced coaches",
    date: "July 29, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Downtown Recreation Center",
    attendees: 28,
  },
]

export default function CommunityPage() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground mt-1">Connect with players, teams, and fans</p>
        </div>
        <Link href="/community/post">
          <Button>Create Post</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          {post.author.team && (
                            <Badge variant="outline" className="text-xs">
                              {post.author.team}
                            </Badge>
                          )}
                        </div>
                        <CardDescription>
                          @{post.author.username} · {post.timestamp}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{post.content}</p>
                    {post.images.length > 0 && (
                      <div className="mt-4">
                        {post.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt="Post attachment"
                            className="rounded-lg w-full object-cover mt-2"
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares}</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="teams" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thunder Eagles</CardTitle>
                    <CardDescription>Basketball · 12 members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Local basketball team competing in the Downtown Basketball League. Founded in 2018.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Team Page
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Lightning Sharks</CardTitle>
                    <CardDescription>Soccer · 18 members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Community soccer team participating in the City Soccer Championship. Founded in 2015.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Team Page
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{event.attendees} attending</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      RSVP
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 2).map((event) => (
                <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">{event.date}</div>
                  <Link href={`/events/${event.id}`} className="text-sm text-primary hover:underline block mt-1">
                    View details
                  </Link>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/events">
                <Button variant="ghost" className="w-full">
                  View All Events
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>League Standings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="font-medium">Thunder Eagles</span>
                  </div>
                  <span>12-4</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">2.</span>
                    <span className="font-medium">Lightning Sharks</span>
                  </div>
                  <span>10-6</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">3.</span>
                    <span className="font-medium">Mountain Lions</span>
                  </div>
                  <span>8-8</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/leagues">
                <Button variant="ghost" className="w-full">
                  View Full Standings
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
