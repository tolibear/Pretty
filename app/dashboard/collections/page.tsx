import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserCollections } from "@/components/user/user-collections"

export const metadata: Metadata = {
  title: "My Collections - Pretty.af",
  description: "Manage your saved styles and generated images",
}

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <UserCollections />
      </main>
      <SiteFooter />
    </div>
  )
} 