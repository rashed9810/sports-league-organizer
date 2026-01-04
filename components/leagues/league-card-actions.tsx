"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface LeagueCardActionsProps {
  leagueId: number
}

export function LeagueCardActions({ leagueId }: LeagueCardActionsProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return null

  return (
    <Link href={`/leagues/${leagueId}/manage`}>
      <Button variant="secondary">Manage League</Button>
    </Link>
  )
}
