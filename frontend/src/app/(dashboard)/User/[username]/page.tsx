"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getUserProfile } from "@/lib/endpoints/UserProfile"
import { UserProfile, RepoSummary } from "@/types"
import { ProfileHeader } from "@/components/dashboard/user/ProfileHeader"
import { StatCards } from "@/components/dashboard/user/StatCards"
import { LanguageChart } from "@/components/dashboard/user/LanguageChart"
import { RepoGrid } from "@/components/dashboard/user/RepoGrid"
import Link from "next/link"
import { PageContent } from "@/components/page-title-content"


export default function UserProfilePage() {
  const { username } = useParams()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [repos, setRepos] = useState<RepoSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserProfile() {
      if (!username) return
      
      try {
        setLoading(true)
        const response = await getUserProfile(username as string)
        setProfile(response.profile)
        setRepos(response.repos)
        setError(null)
      } catch (err) {
        setError("Failed to load user profile")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [username])

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-muted h-20 w-20 mb-4"></div>
          <div className="h-4 bg-muted rounded w-48 mb-3"></div>
          <div className="h-3 bg-muted rounded w-32"></div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-card rounded-xl p-8 shadow-sm border border-border max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-card-foreground mb-4">Error</h1>
          <p className="text-card-foreground mb-6">{error || "User not found"}</p>
          <Link 
            href="/Search" 
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PageContent>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <ProfileHeader profile={profile} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-card-foreground px-1">Overview</h2>
          <StatCards profile={profile} repoCount={repos.length} />
        </div>

        {profile.overview.languageBreakdown.length > 0 && (
          <div className="space-y-2">
            <LanguageChart 
              languages={profile.overview.languageBreakdown} 
              totalSize={profile.overview.totalLangSize} 
            />
          </div>
        )}

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <RepoGrid repos={repos} username={profile.login} />
        </div>
      </div>
    </PageContent>
  )
} 