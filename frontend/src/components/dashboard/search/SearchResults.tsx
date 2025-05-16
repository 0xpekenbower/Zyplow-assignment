"use client"

import { SearchResult } from "@/lib/endpoints/search"
import { UserCard } from "./UserCard"
import { Pagination } from "./Pagination"

interface SearchResultsProps {
  results: SearchResult
  query: string
  page: number
  onUserClick: (username: string) => void
  onNextPage: () => void
  onPrevPage: () => void
}

export function SearchResults({ 
  results, 
  query, 
  page, 
  onUserClick, 
  onNextPage, 
  onPrevPage 
}: SearchResultsProps) {
  if (results.total_count === 0) {
    return (
      <div className="bg-card rounded-xl p-8 text-center shadow-sm border border-border">
        <h3 className="text-lg font-medium text-card-foreground mb-2">No results found</h3>
        <p className="text-muted-foreground">
          No users matching &quot;{query}&quot; were found. Try with a different search term.
        </p>
      </div>
    )
  }

  const totalPages = Math.ceil(Math.min(results.total_count, 1000) / 10)

  return (
    <div>
      <div className="mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground">
          Found <span className="font-medium mx-1">{results.total_count}</span> users matching &quot;{query}&quot;
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.items.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={onUserClick}
          />
        ))}
      </div>
      
      {results.total_count > 10 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      )}
    </div>
  )
} 