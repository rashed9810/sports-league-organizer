"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"

export default function CreateLeaguePage() {
  const router = useRouter()
  const [leagueData, setLeagueData] = useState({
    name: "",
    sport: "",
    season: "",
    location: "",
    description: "",
  })
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setLeagueData({ ...leagueData, [id]: value })
  }

  const handleSelectChange = (field: string, value: string) => {
    setLeagueData({ ...leagueData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!leagueData.name || !leagueData.sport || !startDate || !endDate) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // In a real app, this would call your backend API
    console.log("Creating league:", {
      ...leagueData,
      startDate: startDate?.toISOString().split("T")[0],
      endDate: endDate?.toISOString().split("T")[0],
    })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to leagues page
      router.push("/leagues")
    }, 1500)
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Create New League</h1>
          <p className="text-muted-foreground mt-1">Set up a new sports league</p>
        </div>
      </div>

      <Card className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>League Information</CardTitle>
            <CardDescription>Enter the details for your new league</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">League Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Downtown Basketball League"
                  value={leagueData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sport">Sport *</Label>
                <Select
                  value={leagueData.sport}
                  onValueChange={(value) => handleSelectChange("sport", value)}
                  required
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
                  placeholder="e.g., Summer 2023"
                  value={leagueData.season}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Downtown Sports Complex"
                  value={leagueData.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
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
                  placeholder="Provide a description of your league..."
                  value={leagueData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/leagues">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create League"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
