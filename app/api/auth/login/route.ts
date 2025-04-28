import { NextResponse } from "next/server"

// This would connect to your Django backend in a real application
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // In a real app, this would make a request to your Django backend
    // For now, we'll simulate a successful login

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: 1,
          name: "John Doe",
          email,
        },
        token: "sample-jwt-token",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
