import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StyleEditor } from "@/components/style-editor"

export const metadata: Metadata = {
  title: "Create Style - Pretty.af",
  description: "Create a new style for the Pretty.af platform",
}

export default function CreateStylePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <StyleEditor />
      </main>
      <SiteFooter />
    </div>
  )
}
