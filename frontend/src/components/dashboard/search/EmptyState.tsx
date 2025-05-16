"use client"

import { Search } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 mb-6 rounded-full bg-muted flex items-center justify-center">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        Search for GitHub users
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Find GitHub users by username, full name, or keywords. You can view detailed profiles and repositories. 
        Check This User dspinellis it's Give Display  
      </p>
    </div>
  )
} 