import type { Metadata } from "next"
import { ExploreLayout } from "@/components/explore-layout"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Featured Styles - Pretty.af",
  description: "Discover featured AI image styles from top creators",
}

export default function FeaturedPage() {
  return (
    <ExploreLayout
      title="Featured Styles"
      description="Curated selection of exceptional AI image styles by our team"
      activeTab="featured"
      styles={featuredStyles}
    >
      <div className="bg-muted rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Badge className="mb-2">Staff Pick</Badge>
            <h2 className="text-2xl font-bold mb-2">Featured Creator: @watercolorist</h2>
            <p className="text-muted-foreground mb-4">
              Jordan Lee creates stunning watercolor styles that transform your images into beautiful artistic
              masterpieces. Their attention to detail and color harmony makes these styles perfect for portraits,
              landscapes, and abstract compositions.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <img
                src="/images/watercolor.png"
                alt="Watercolor example 1"
                className="rounded-md aspect-square object-cover"
              />
              <img
                src="/images/watercolor-example-1.png"
                alt="Watercolor example 2"
                className="rounded-md aspect-square object-cover"
              />
              <img
                src="/images/watercolor-example-2.png"
                alt="Watercolor example 3"
                className="rounded-md aspect-square object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[300px]">
              <img
                src="/images/watercolor.png"
                alt="Featured style"
                className="rounded-xl object-cover w-full h-full shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-background rounded-full p-2 shadow-lg">
                <img
                  src="/images/avatar-5.png"
                  alt="Creator avatar"
                  className="w-16 h-16 rounded-full border-4 border-background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExploreLayout>
  )
}

// Sample data
const featuredStyles = [
  {
    id: "5",
    title: "Watercolor Dreams",
    creator: "@watercolorist",
    likes: 876,
    coverImage: "/images/watercolor.png",
  },
  {
    id: "4",
    title: "Pixel Art",
    creator: "@pixelmaster",
    likes: 1089,
    coverImage: "/images/pixel-art.png",
  },
  {
    id: "6",
    title: "Sci-Fi Worlds",
    creator: "@futurevisions",
    likes: 654,
    coverImage: "/images/scifi-world.png",
  },
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
    id: "9",
    title: "Surreal Dreams",
    creator: "@surrealartist",
    likes: 543,
    coverImage: "/images/surreal-dream.png",
  },
  {
    id: "3",
    title: "Abstract Waves",
    creator: "@wavecreator",
    likes: 756,
    coverImage: "/images/abstract-waves.png",
  },
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
]
