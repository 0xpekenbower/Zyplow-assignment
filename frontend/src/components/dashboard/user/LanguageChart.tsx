"use client"

import { LanguageStat } from "@/types"

interface LanguageChartProps {
  languages: LanguageStat[]
  totalSize: number
}

export function LanguageChart({ languages, totalSize }: LanguageChartProps) {
  if (!languages.length) return null

  const displayLanguages = languages.slice(0, 8)
  
  // Generate a deterministic color based on language name
  const getLanguageColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
      'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500',
      'bg-teal-500', 'bg-cyan-500', 'bg-lime-500', 'bg-emerald-500'
    ]
    
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Languages</h3>
      
      <div className="space-y-6">
        <div className="h-8 w-full rounded-full overflow-hidden flex">
          {displayLanguages.map((lang) => {
            const percentage = (lang.size / totalSize) * 100
            return (
              <div 
                key={lang.name} 
                className={`${getLanguageColor(lang.name)}`}
                style={{ width: `${percentage}%` }}
                title={`${lang.name}: ${percentage.toFixed(1)}%`}
              />
            )
          })}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayLanguages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(lang.name)}`} />
              <div className="flex flex-col">
                <span className="font-medium text-card-foreground text-sm">
                  {lang.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {((lang.size / totalSize) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 