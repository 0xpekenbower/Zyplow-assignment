"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Leaderboard, LeaderboardRequest } from "@/types"
import { getLeaderboard } from "@/lib/endpoints/leaderboard"
import { validateUserInput } from "@/lib/utils"
import { useRedisCache } from "@/hooks/useCache"

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
    const [leaderboardData, setLeaderboardData] = useState<Leaderboard | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [isCached, setIsCached] = useState(false)
    const redisCache = useRedisCache()
    const redisCacheRef = useRef(redisCache)

    // Update the ref when redisCache changes
    useEffect(() => {
        redisCacheRef.current = redisCache
    }, [redisCache])

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        
        try {
            validateUserInput(per_page, page, location, sort);
            
            // First try to get data from Redis cache
            const cachedData = await redisCacheRef.current.getCachedLeaderboard(location, sort, per_page, page);
            
            if (cachedData) {
                console.log('Using cached leaderboard data');
                setLeaderboardData(cachedData as Leaderboard);
                setIsCached(true);
                setIsLoading(false);
                return;
            }
            
            // If not in cache, fetch from API
            const request: LeaderboardRequest = {
                location,
                sort,
                per_page,
                page
            };
            
            const leaderboard = await getLeaderboard(request);
            setLeaderboardData(leaderboard);
            setIsCached(false);
            
            // Cache the data for future use
            await redisCacheRef.current.cacheLeaderboard(location, sort, per_page, page, leaderboard);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        } finally {
            setIsLoading(false);
        }
    }, [location, sort, per_page, page, redisCacheRef])

    useEffect(() => {
        fetchData()
    }, [location, sort, per_page, page, fetchData])

    return { 
        Leaderboard: leaderboardData, 
        isLoading, 
        error, 
        isCached,
        refetch: fetchData 
    }
}