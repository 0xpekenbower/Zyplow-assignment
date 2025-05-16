"use client"

import { UserProfile } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Users, Building, MapPin, Mail, Globe, Twitter } from "lucide-react"

interface ProfileHeaderProps {
  profile: UserProfile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0">
        <div className="relative">
          <Image
            src={profile.avatarUrl}
            alt={profile.login}
            width={160}
            height={160}
            className="rounded-full ring-2 ring-border shadow-md"
          />
          {profile.pronouns && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {profile.pronouns}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">
              {profile.name || profile.login}
            </h1>
            <h2 className="text-xl text-muted-foreground">@{profile.login}</h2>
          </div>
          
          <div className="flex gap-3">
            <a 
              href={profile.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/90 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <Link 
              href="/Search" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-card-foreground rounded-lg hover:bg-muted/90 transition-colors"
            >
              Back
            </Link>
          </div>
        </div>
        
        {profile.bio && (
          <p className="text-card-foreground mb-6">{profile.bio}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="font-medium">{profile.followers}</span> followers · <span className="font-medium">{profile.following}</span> following
          </div>
          
          {profile.company && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-5 w-5" />
              <span>{profile.company}</span>
            </div>
          )}
          
          {profile.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{profile.location}</span>
            </div>
          )}
          
          {profile.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
            </div>
          )}
          
          {profile.websiteUrl && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-5 w-5" />
              <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {profile.websiteUrl.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
          
          {profile.twitterUsername && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Twitter className="h-5 w-5" />
              <a 
                href={`https://twitter.com/${profile.twitterUsername}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @{profile.twitterUsername}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 