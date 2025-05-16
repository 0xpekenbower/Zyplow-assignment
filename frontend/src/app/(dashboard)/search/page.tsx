"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSearch } from "@/hooks/useSearch"
import { SearchBar } from "@/components/dashboard/search/SearchBar"
import { SearchResults } from "@/components/dashboard/search/SearchResults"
import { EmptyState } from "@/components/dashboard/search/EmptyState"
import { PageContent, PageTitle } from "@/components/page-title-content"

export default function SearchPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [submittedQuery, setSubmittedQuery] = useState("")
  
  const { results, isLoading, error, search } = useSearch({
    query: submittedQuery,
    per_page: 10,
    page,
    autoSearch: false
  })

  const handleSearch = (query: string) => {
    setSubmittedQuery(query)
    setPage(1)
    search()
  }

  const handleNextPage = () => {
    if (results && page < Math.ceil(results.total_count / 10)) {
      setPage(prev => prev + 1)
      search()
    }
  }

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
      search()
    }
  }

  const navigateToUser = (username: string) => {
    router.push(`/User/${username}`)
  }

  return (
    <PageContent>
      <PageTitle 
        title="Search GitHub Users" 
        description="Find GitHub users and explore their profiles"
      />
      
      <div className="m-auto w-full max-w-6xl">
        <div className="space-y-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl border border-destructive/20">
              Error: {error.message}
            </div>
          )}
          
          {results ? (
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <SearchResults
                results={results}
                query={submittedQuery}
                page={page}
                onUserClick={navigateToUser}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
            </div>
          ) : !isLoading && !error && (
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </PageContent>
  )
}