import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Smartphone, Bell, Calendar, Activity, Users, Settings, Check } from "lucide-react"

export default function MobileAppPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <Badge className="mb-2">New</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Sports League Mobile App</h1>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Take your sports league experience to the next level with our mobile app. Get real-time updates, manage your
          teams, and never miss a game.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download for iOS
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download for Android
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Real-Time Score Updates</h2>
          <p className="text-muted-foreground mb-6">
            Never miss a moment of the action. Get instant notifications for scores, game starts, and key moments from
            all your favorite teams and leagues.
          </p>
          <ul className="space-y-3">
            {[
              "Live score updates as they happen",
              "Quarter-by-quarter breakdowns",
              "Key play notifications",
              "Customizable alerts for your favorite teams",
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
            <div className="relative border-8 border-background rounded-[40px] shadow-xl overflow-hidden h-[500px] w-[250px]">
              <img
                src="/placeholder.svg?height=500&width=250"
                alt="Mobile app screenshot"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Everything You Need in Your Pocket</h2>
        <p className="text-muted-foreground max-w-[800px] mx-auto">
          Our mobile app brings the complete sports league experience to your fingertips, whether you're a player,
          coach, or fan.
        </p>
      </div>

      <Tabs defaultValue="players" className="mb-16">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="players">For Players</TabsTrigger>
          <TabsTrigger value="coaches">For Coaches</TabsTrigger>
          <TabsTrigger value="fans">For Fans</TabsTrigger>
        </TabsList>

        <TabsContent value="players" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-primary" />}
              title="Game Reminders"
              description="Never miss a game with personalized reminders and calendar integration"
            />
            <FeatureCard
              icon={<Activity className="h-8 w-8 text-primary" />}
              title="Performance Tracking"
              description="Track your stats, progress, and performance metrics throughout the season"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Team Communication"
              description="Chat with teammates, share updates, and coordinate practice sessions"
            />
          </div>
        </TabsContent>

        <TabsContent value="coaches" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-primary" />}
              title="Schedule Management"
              description="Easily manage practice schedules, games, and team events"
            />
            <FeatureCard
              icon={<Activity className="h-8 w-8 text-primary" />}
              title="Team Analytics"
              description="Access detailed performance metrics and player statistics"
            />
            <FeatureCard
              icon={<Settings className="h-8 w-8 text-primary" />}
              title="Strategy Tools"
              description="Plan formations, tactics, and review game footage with annotation tools"
            />
          </div>
        </TabsContent>

        <TabsContent value="fans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Bell className="h-8 w-8 text-primary" />}
              title="Live Updates"
              description="Get real-time score updates and notifications for your favorite teams"
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-primary" />}
              title="Game Schedule"
              description="View upcoming games, set reminders, and never miss the action"
            />
            <FeatureCard
              icon={<Smartphone className="h-8 w-8 text-primary" />}
              title="Social Features"
              description="Connect with other fans, share reactions, and discuss games in real-time"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center py-12 border-t">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Elevate Your Sports Experience?</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
          Download our mobile app today and take your sports league experience to the next level.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download for iOS
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download for Android
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-full">{icon}</div>
          <h3 className="font-medium text-xl">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
