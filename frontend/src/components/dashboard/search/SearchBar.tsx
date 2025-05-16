"use client"

import { Search } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex w-full">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search GitHub users by username, full name, or keyword..."
            className="block w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="ml-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 disabled:bg-primary/70 transition-colors"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  )
} 