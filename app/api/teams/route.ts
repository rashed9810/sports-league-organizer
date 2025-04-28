import { NextResponse } from "next/server"

// This would connect to your Django backend in a real application
export async function GET() {
  try {
    // In a real app, this would fetch data from your Django backend
    const teams = [
      { id: 1, name: "Thunder Eagles", sport: "Basketball", members: 12 },
      { id: 2, name: "Lightning Sharks", sport: "Soccer", members: 18 },
      { id: 3, name: "Mountain Lions", sport: "Baseball", members: 15 },
      { id: 4, name: "River Rapids", sport: "Hockey", members: 20 },
      { id: 5, name: "Desert Scorpions", sport: "Volleyball", members: 10 },
      { id: 6, name: "Forest Wolves", sport: "Basketball", members: 12 },
    ]

    return NextResponse.json({ teams })
  } catch (error) {
    console.error("Error fetching teams:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, sport } = body

    // Validate input
    if (!name || !sport) {
      return NextResponse.json({ error: "Name and sport are required" }, { status: 400 })
    }

    // In a real app, this would create a team in your Django backend
    const newTeam = {
      id: Math.floor(Math.random() * 1000),
      name,
      sport,
      members: 0,
    }

    return NextResponse.json(
      {
        success: true,
        message: "Team created successfully",
        team: newTeam,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating team:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
