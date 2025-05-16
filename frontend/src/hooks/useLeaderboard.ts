"use client"

import { useEffect, useState, useCallback } from "react"
import { Leaderboard, LeaderboardRequest } from "@/types"
import { getLeaderboard } from "@/lib/endpoints/leaderboard"
import { validateUserInput } from "@/lib/utils"

interface UseLeaderboardOptions {
	location: string
	sort: string
    per_page: number
    page: number
}

/**
 * Hook to fetch the leaderboard data
 * @param options - Object containing location, sort, per_page, and page
 * @returns The leaderboard data, loading state, error state, and refetch function
 */
export function useLeaderboard({ location, sort, per_page, page }: UseLeaderboardOptions) {
    const [Leaderboard, setLeaderboard] = useState<Leaderboard | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        
        try {
            validateUserInput(per_page, page, location, sort);
            
            // Create a request object to pass to getLeaderboard
            const request: LeaderboardRequest = {
                location,
                sort,
                per_page,
                page
            };
            
            const leaderboard = await getLeaderboard(request)
            setLeaderboard(leaderboard)
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error occurred"))
        } finally {
            setIsLoading(false)
        }
    }, [location, sort, per_page, page])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { Leaderboard, isLoading, error, refetch: fetchData }
}