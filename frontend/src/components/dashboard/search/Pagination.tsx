"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPrevPage: () => void
}

export function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }: PaginationProps) {
  return (
    <div className="flex items-center justify-between my-6">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium 
          bg-card border-border border
          text-card-foreground 
          hover:bg-secondary
          disabled:opacity-50 disabled:pointer-events-none
          transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>
      
      <div className="px-3 py-1 rounded-lg bg-muted text-sm font-medium text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      
      <button
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium 
          bg-card border-border border
          text-card-foreground 
          hover:bg-secondary
          disabled:opacity-50 disabled:pointer-events-none
          transition-colors"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
} 