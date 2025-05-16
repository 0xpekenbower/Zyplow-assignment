"use client"

import { CardContent } from "@/components/ui/card"
import { useLeaderboard } from "@/hooks/useLeaderboard"
import { JSX } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, User } from "lucide-react"
import Link from "next/link"



/**
 * Get the leaderboard from the server
 * @param props - An object containing location, sort, per_page, and page
 * @returns The leaderboard component with exactly 8 users and internal scrolling
 */
export function GetLeaderboard({ location, sort }: { location: string, sort: string }): JSX.Element {
    const { Leaderboard, isLoading, error, isCached, refetch } = useLeaderboard({
        location: location,
        sort: sort,
        per_page: 100,
        page: 1
    })
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-[calc(100vh-250px)] text-muted-foreground">Loading users...</div>
    }
    
    if (error) {
        return <div className="h-[calc(100vh-250px)] flex items-center justify-center text-destructive">Error: {error instanceof Error ? error.message : "Unknown error"}</div>
    }
    
    if (!Leaderboard || !Leaderboard.items || Leaderboard.items.length === 0) {
        return <div className="h-[calc(100vh-250px)] flex items-center justify-center text-muted-foreground">No users found</div>
    }
    
    return (
      // Here im Trying to Make it More Responsive Also Avoiding (Lote Of Request For Avatar, Small Optimization) 
      <CardContent className="h-[60vh] w-full relative inset-0 overflow-y-auto no-scrollbar rounded-md">
          {isCached && (
            <div className="mb-4 flex justify-between items-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-800 hover:bg-blue-100">Loaded from cache</Badge>
              <button 
                onClick={() => refetch()} 
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Refresh
              </button>
            </div>
          )}
          
          <div className="space-y-4">
              {Leaderboard.items.map((user) => (
                  <div 
                    key={user.id}
                    className="flex items-center justify-between border-b border-border rounded-md pb-3 last:border-0 hover:bg-muted/50 p-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center text-muted-foreground font-medium">
                          {user.rank}
                      </div>
                      <Image
                        src={user.avatar_url} 
                        alt={user.login}
                        width={80}
                        height={80}
                        className="rounded-full ring-2 ring-border"
                      />
                      <div>
                        <div className="font-medium text-card-foreground">{user.login}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/User/${user.login}`}>
                          <User className="h-4 w-4 mr-1" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>
              ))}
          </div>
      </CardContent>
    )
}