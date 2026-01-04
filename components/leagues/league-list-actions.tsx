"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function LeagueListActions() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <Link href="/leagues/create">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Create League
      </Button>
    </Link>
  )
}

export function LeagueEmptyStateActions() {
    const { isAuthenticated } = useAuth()
  
    if (!isAuthenticated) return null
  
    return (
      <Link href="/leagues/create">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create League
        </Button>
      </Link>
    )
  }
