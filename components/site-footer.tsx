import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Logo width={90} height={24} />
            <p className="text-sm text-muted-foreground">Generate on-brand AI images with styles from top creators.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/trending" className="text-muted-foreground hover:text-foreground">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-muted-foreground hover:text-foreground">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/creator-guide" className="text-muted-foreground hover:text-foreground">
                  Creator Guide
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-muted-foreground hover:text-foreground">
                  Copyright
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Pretty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
