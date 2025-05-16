"use client"

import { RepoSummary } from "@/types"
import { RepoCard } from "./RepoCard"
import { ArrowRight } from "lucide-react"

interface RepoGridProps {
  repos: RepoSummary[]
  username: string
  limit?: number
}

export function RepoGrid({ repos, username, limit = 6 }: RepoGridProps) {
  const displayRepos = repos.slice(0, limit)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-card-foreground">
        Top Repositories
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayRepos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
      
      {repos.length > limit && (
        <div className="flex justify-center mt-6">
          <a 
            href={`https://github.com/${username}?tab=repositories`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/90 transition-colors"
          >
            <span>View All Repositories</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  )
} 