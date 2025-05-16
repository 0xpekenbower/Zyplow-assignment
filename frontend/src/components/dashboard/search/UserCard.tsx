"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { SearchUser } from "@/lib/endpoints/search"

interface UserCardProps {
  user: SearchUser
  onClick: (username: string) => void
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <div 
      className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all border border-border overflow-hidden cursor-pointer"
      onClick={() => onClick(user.login)}
    >
      <div className="p-5 flex items-center gap-4">
        <div className="flex-shrink-0 relative">
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={64}
            height={64}
            className="rounded-full ring-2 ring-border"
          />
          <div className="absolute -bottom-1 -right-1 bg-card rounded-full p-0.5">
            <Github className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg text-card-foreground">{user.login}</h3>
          <div className="mt-2 flex gap-2">
            <Link 
              href={`/User/${user.login}`}
              className="text-xs flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Profile</span>
            </Link>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 