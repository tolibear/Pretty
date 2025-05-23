import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CreatorDashboard } from "@/components/creator-dashboard"

export const metadata: Metadata = {
  title: "Creator Dashboard - Pretty.af",
  description: "Track your earnings, styles, and analytics as a creator on Pretty.af",
}

export default function CreatorDashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CreatorDashboard />
      </main>
      <SiteFooter />
    </div>
  )
} 