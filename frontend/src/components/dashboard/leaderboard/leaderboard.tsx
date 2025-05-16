"use client"

import { CardContent } from "@/components/ui/card"
import { useLeaderboard } from "@/hooks/useLeaderboard"
import { JSX } from "react"
import Image from "next/image"
/**
 * Map the id to the selector values Preventing User from Sending Dirty Data to the Server
 * TODO: Optimize this by using a single function to map the id to the selector values (Deprecate moving to validateUserInput)
 */
// const FromIdToSelectors = {
//     "location": {
//         "1": "Morocco",
//         "2": "France"
//     },
//     "sort": {
//         "1": "followers",
//         "2": "repositories"
//     },
//     "per_page": {
//         "1": 10,
//         "2": 50,
//         "3": 100
//     },
//     "page": {
//         "1": 1,
//         "2": 2,
//         "3": 3,
//         "4": 4,
//         "5": 5,
//         "6": 6,
//         "7": 7,
//         "8": 8,
//         "9": 9,
//         "10": 10
//     }
// }


/**
 * Get the leaderboard from the server
 * @param props - An object containing location, sort, per_page, and page
 * @returns The leaderboard component with exactly 8 users and internal scrolling
 */
export function GetLeaderboard({ location, sort }: { location: string, sort: string }): JSX.Element {
    const { Leaderboard, isLoading, error} = useLeaderboard({
        location: location,
        sort: sort,
        per_page: 100,
        page: 1
    })
    if (isLoading) {
        return <div className="flex justify-center items-center h-[calc(100vh-250px)]">Loading users...</div>
    }
    
    if (error) {
        return <div className="h-[calc(100vh-250px)] flex items-center justify-center">Error: {error instanceof Error ? error.message : "Unknown error"}</div>
    }
    
    if (!Leaderboard || !Leaderboard.items || Leaderboard.items.length === 0) {
        return <div className="h-[calc(100vh-250px)] flex items-center justify-center">No users found</div>
    }
    return (
            <CardContent className="h-[60vh] w-full relative inset-0 overflow-y-auto no-scrollbar">
                <div className="space-y-4">
                    {Leaderboard.items.map((user) => (
                        <div 
                          key={user.id}
                          className="flex items-center justify-between border-b border-muted pb-3 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center">
                                {user.rank}
                            </div>
                            <Image
                              src={user.avatar_url} 
                              alt={user.login}
                            //   className="h-16 w-16 sm:h-20 sm:w-20 rounded-full"
                              width={80}
                              height={80}
                              className="rounded-full"
                            />
                            <div>
                              <div className="font-medium">{user.login}</div>
                            </div>
                          </div>
                        </div>
                    ))}
                </div>
            </CardContent>
    )
}