import type { Metadata } from "next"
import { ExploreLayout } from "@/components/explore-layout"
import { ImageUrls } from "@/lib/image-service"

export const metadata: Metadata = {
  title: "Trending Styles - Pretty.af",
  description: "Discover the most popular AI image styles right now",
}

export default function TrendingPage() {
  return (
    <ExploreLayout
      title="Trending Styles"
      description="Discover the most popular AI image styles trending right now"
      activeTab="trending"
      styles={trendingStyles}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="col-span-full md:col-span-2 aspect-[2/1] md:aspect-auto md:h-full relative overflow-hidden rounded-xl">
          <img src={ImageUrls.styleImage("Neon Dreams", "cyberpunk")} alt="Top trending style" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <div className="text-white">
              <div className="text-sm font-medium mb-1">Top Trending</div>
              <h2 className="text-2xl font-bold mb-1">Neon Dreams</h2>
              <p className="text-sm text-white/80">by @neonartist • 5,621 generations</p>
            </div>
          </div>
        </div>
        <div className="hidden md:grid grid-rows-2 gap-4">
          <div className="relative overflow-hidden rounded-xl">
            <img src={ImageUrls.styleImage("Pixel Art", "pixel")} alt="Second trending style" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <div className="text-white">
                <h3 className="text-lg font-bold">Pixel Art</h3>
                <p className="text-xs text-white/80">by @pixelmaster</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <img src={ImageUrls.styleImage("Vintage Film", "vintage")} alt="Third trending style" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <div className="text-white">
                <h3 className="text-lg font-bold">Vintage Film</h3>
                <p className="text-xs text-white/80">by @retrovisuals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExploreLayout>
  )
}

// Sample data
const trendingStyles = [
  {
    id: "1",
    title: "Neon Dreams",
    creator: "@neonartist",
    likes: 1243,
    coverImage: ImageUrls.styleImage("Neon Dreams", "cyberpunk"),
  },
  {
    id: "4",
    title: "Pixel Art",
    creator: "@pixelmaster",
    likes: 1089,
    coverImage: ImageUrls.styleImage("Pixel Art", "pixel"),
  },
  {
    id: "2",
    title: "Vintage Film",
    creator: "@retrovisuals",
    likes: 982,
    coverImage: ImageUrls.styleImage("Vintage Film", "vintage"),
  },
  {
    id: "5",
    title: "Watercolor Dreams",
    creator: "@watercolorist",
    likes: 876,
    coverImage: ImageUrls.styleImage("Watercolor Dreams", "watercolor"),
  },
  {
    id: "6",
    title: "Sci-Fi Worlds",
    creator: "@futurevisions",
    likes: 654,
    coverImage: ImageUrls.styleImage("Sci-Fi Worlds", "scifi"),
  },
  {
    id: "3",
    title: "Abstract Waves",
    creator: "@wavecreator",
    likes: 756,
    coverImage: ImageUrls.styleImage("Abstract Waves", "abstract"),
  },
  {
    id: "7",
    title: "Anime Portraits",
    creator: "@animefan",
    likes: 432,
    coverImage: ImageUrls.styleImage("Anime Portraits", "anime"),
  },
  {
    id: "8",
    title: "Minimal Lines",
    creator: "@minimalist",
    likes: 321,
    coverImage: ImageUrls.styleImage("Minimal Lines", "minimal"),
  },
  {
    id: "9",
    title: "Surreal Dreams",
    creator: "@surrealartist",
    likes: 543,
    coverImage: ImageUrls.styleImage("Surreal Dreams", "fantasy"),
  },
]
