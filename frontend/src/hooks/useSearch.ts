"use client"

import { useState, useCallback, useEffect } from "react"
import { SearchResult, SearchRequest, searchUsers } from "@/lib/endpoints/search"

interface UseSearchOptions {
  query: string
  per_page?: number
  page?: number
  autoSearch?: boolean
}

/**
 * Hook to search for GitHub users
 * @param options - Object containing query, per_page, and page
 * @returns The search results, loading state, error state, and search function
 */
export function useSearch({ query, per_page = 10, page = 1, autoSearch = true }: UseSearchOptions) {
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const search = useCallback(async () => {
    if (!query.trim()) {
      setResults(null)
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const request: SearchRequest = {
        query,
        per_page,
        page
      }
      
      const searchResult = await searchUsers(request)
      setResults(searchResult)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }, [query, per_page, page])

  useEffect(() => {
    if (autoSearch) {
      search()
    }
  }, [search, autoSearch])

  return { results, isLoading, error, search }
}
