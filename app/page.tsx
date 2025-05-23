import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { StyleCard } from "@/components/style-card"
import { CreatorSpotlight } from "@/components/creator-spotlight"
import { AuthTestingPanel } from "@/lib/auth-context"
import { ArrowRight, TrendingUp } from "lucide-react"
import { DataAdapters } from "@/lib/data-adapters"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        {/* Discover Styles Section */}
        <section className="container py-16 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Discover Amazing Styles</h2>
              <p className="text-muted-foreground mt-2">Browse thousands of unique AI styles from verified creators</p>
            </div>
            <Button variant="ghost" className="group" asChild>
              <Link href="/explore">
                View all styles
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="featured">⭐ Featured</TabsTrigger>
              <TabsTrigger value="new">🆕 New</TabsTrigger>
              <TabsTrigger value="free">🆓 Free</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DataAdapters.trendingStylesForCards().slice(0, 3).map((style) => (
                  <StyleCard key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DataAdapters.featuredStylesForCards().slice(0, 3).map((style) => (
                  <StyleCard key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DataAdapters.trendingStylesForCards().slice(0, 3).map((style) => (
                  <StyleCard key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="free" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DataAdapters.freeStylesForCards().slice(0, 3).map((style) => (
                  <StyleCard key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Top Creators Section */}
        <section className="bg-muted/30 py-16">
          <div className="container space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">Meet Our Top Creators</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Discover talented artists who are pushing the boundaries of AI-generated art
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DataAdapters.topCreatorsForSpotlight().map((creator) => (
                <CreatorSpotlight key={creator.id} creator={creator} />
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link href="/creators">
                  View All Creators
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 space-y-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">Ready to create something amazing?</h2>
            <p className="text-muted-foreground text-lg mt-4">
              Join Pretty.af today and start making on-brand, AI-powered images using styles from top creators. 
              Get 5 free generations to start your creative journey.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="text-base px-8 py-6 h-auto" asChild>
              <Link href="/explore">
                Start Creating Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto" asChild>
              <Link href="/creators/apply">
                Become a Creator
              </Link>
            </Button>
          </div>
          <div className="text-sm text-muted-foreground mt-6">
            <p>✨ No credit card required • 🎨 Start creating instantly • 💎 Premium styles available</p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <AuthTestingPanel />
    </div>
  )
}
