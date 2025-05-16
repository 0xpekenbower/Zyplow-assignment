'use client'


/**
 * im Keeping this layout empty idea in mind for easy move between modes (Redis Cache & Without Redis Cache)
 * and apply it to all dashboard pages (Leaderboard, analytics, etc)
 * without affecting the Home Page (Landing Page) To Easy Back To Previous Mode (just idea)
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      {children}
    </div>
  )
}