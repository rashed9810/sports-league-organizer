import { NextResponse } from "next/server"

// This would connect to your Django backend in a real application
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would make a request to your Django backend
    // For now, we'll simulate a successful registration

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: { name, email },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
