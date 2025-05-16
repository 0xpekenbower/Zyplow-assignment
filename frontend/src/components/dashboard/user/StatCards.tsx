"use client"

import { UserProfile } from "@/types"
import { Star, GitFork, Code } from "lucide-react"

interface StatCardsProps {
  profile: UserProfile
  repoCount: number
}

export function StatCards({ profile, repoCount }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-yellow-100  text-yellow-600 rounded-lg">
            <Star className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-card-foreground">Total Stars</h3>
        </div>
        <p className="text-3xl font-semibold text-card-foreground">{profile.overview.totalStars}</p>
      </div>
      
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100  text-blue-600 rounded-lg">
            <GitFork className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-card-foreground">Total Forks</h3>
        </div>
        <p className="text-3xl font-semibold text-card-foreground">{profile.overview.totalForks}</p>
      </div>
      
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-100  text-purple-600 rounded-lg">
            <Code className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-card-foreground">Repositories</h3>
        </div>
        <p className="text-3xl font-semibold text-card-foreground">{repoCount}</p>
      </div>
    </div>
  )
} 