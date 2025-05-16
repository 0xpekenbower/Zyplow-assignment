"use client"

import { RepoSummary } from "@/types"
import { Star, GitFork, FileCode, ExternalLink } from "lucide-react"

interface RepoCardProps {
  repo: RepoSummary
}

/**
 * RepoCard component
 * @param repo - The repository summary to display
 * @returns A card component displaying repository information
 * TODO: Add a Sub Section For List Of Contributors 
 */
export function RepoCard({ repo }: RepoCardProps) {
  const getLanguageColor = (name: string) => {
    const colors = [
      'bg-blue-500 text-white', 
      'bg-green-500 text-white', 
      'bg-yellow-500 text-white', 
      'bg-red-500 text-white', 
      'bg-indigo-500 text-white', 
      'bg-purple-500 text-white',
      'bg-pink-500 text-white', 
      'bg-teal-500 text-white',
      'bg-gray-500 text-white'
    ]
    
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-card-foreground">{repo.name}</h3>
        <a 
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-muted-foreground hover:text-card-foreground transition-colors rounded-full"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      
      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{repo.stargazerCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-4 w-4 " />
          <span>{repo.forkCount}</span>
        </div>
        {repo.licenseName && (
          <div className="flex items-center gap-1">
            <FileCode className="h-4 w-4 " />
            <span>{repo.licenseName.split(' ')[0]}</span>
          </div>
        )}
      </div>
      
      {repo.languages && repo.languages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {repo.languages.slice(0, 3).map((lang) => (
            <span 
              key={lang.name} 
              className={`text-xs px-2.5 py-1 rounded-full ${getLanguageColor(lang.name)}`}
            >
              {lang.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
} 