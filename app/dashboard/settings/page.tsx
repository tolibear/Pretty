import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserSettings } from "@/components/user/user-settings"

export const metadata: Metadata = {
  title: "Settings - Pretty.af",
  description: "Manage your account settings and preferences on Pretty.af",
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <UserSettings />
      </main>
      <SiteFooter />
    </div>
  )
} 