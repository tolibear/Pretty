import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { StyleCard } from "@/components/style-card"
import { CreatorSpotlight } from "@/components/creator-spotlight"
import { AuthTestingPanel } from "@/lib/auth-context"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Discover Styles</h2>
            <Button variant="ghost" asChild>
              <Link href="/styles">View all styles</Link>
            </Button>
          </div>

          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingStyles.map((style) => (
                  <StyleCard key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStyles.map((style) => (
                  <StyleCard key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newStyles.map((style) => (
                  <StyleCard key={style.id} style={style} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="container py-12 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Top Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCreators.map((creator) => (
              <CreatorSpotlight key={creator.id} creator={creator} />
            ))}
          </div>
        </section>

        <section className="container py-12 space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to create?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join Pretty.af today and start making on-brand, AI-powered images using styles from top creators.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button size="lg" asChild>
              <Link href="/explore">Explore Styles</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/create">Become a Creator</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
      <AuthTestingPanel />
    </div>
  )
}

// Sample data
const trendingStyles = [
  {
    id: "1",
    title: "Neon Dreams",
    creator: "@neonartist",
    likes: 1243,
    coverImage: "/images/cyberpunk-neon.png",
  },
  {
    id: "2",
    title: "Vintage Film",
    creator: "@retrovisuals",
    likes: 982,
    coverImage: "/images/vintage-film.png",
  },
  {
    id: "3",
    title: "Abstract Waves",
    creator: "@wavecreator",
    likes: 756,
    coverImage: "/images/abstract-waves.png",
  },
]

const featuredStyles = [
  {
    id: "4",
    title: "Pixel Art",
    creator: "@pixelmaster",
    likes: 1089,
    coverImage: "/images/pixel-art.png",
  },
  {
    id: "5",
    title: "Watercolor Dreams",
    creator: "@watercolorist",
    likes: 876,
    coverImage: "/images/watercolor.png",
  },
  {
    id: "6",
    title: "Sci-Fi Worlds",
    creator: "@futurevisions",
    likes: 654,
    coverImage: "/images/scifi-world.png",
  },
]

const newStyles = [
  {
    id: "7",
    title: "Anime Portraits",
    creator: "@animefan",
    likes: 432,
    coverImage: "/images/anime-portrait.png",
  },
  {
    id: "8",
    title: "Minimal Lines",
    creator: "@minimalist",
    likes: 321,
    coverImage: "/images/minimal-lines.png",
  },
  {
    id: "9",
    title: "Surreal Dreams",
    creator: "@surrealartist",
    likes: 543,
    coverImage: "/images/surreal-dream.png",
  },
]

const topCreators = [
  {
    id: "1",
    name: "Alex Rivera",
    handle: "@neonartist",
    avatar: "/images/avatar-1.png",
    earnings: "12,450 USDC",
    styles: 8,
  },
  {
    id: "2",
    name: "Jamie Chen",
    handle: "@retrovisuals",
    avatar: "/images/avatar-2.png",
    earnings: "9,320 USDC",
    styles: 6,
  },
  {
    id: "3",
    name: "Sam Wilson",
    handle: "@wavecreator",
    avatar: "/images/avatar-3.png",
    earnings: "8,760 USDC",
    styles: 5,
  },
  {
    id: "4",
    name: "Taylor Kim",
    handle: "@pixelmaster",
    avatar: "/images/avatar-4.png",
    earnings: "7,890 USDC",
    styles: 7,
  },
]
