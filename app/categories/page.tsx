import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ImageUrls } from "@/lib/image-service"

export const metadata: Metadata = {
  title: "Browse Categories - Pretty.af",
  description: "Explore AI image styles by category",
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Browse by Category</h1>
            <p className="text-muted-foreground mt-2">Discover AI styles organized by artistic themes and genres</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image || ImageUrls.placeholder(400, 300, category.name)}
                      alt={category.name}
                      className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-white/80">{category.count} styles</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

const categories = [
  {
    id: "1",
    name: "Abstract",
    slug: "abstract",
    count: 156,
    image: ImageUrls.categoryBanner("Abstract"),
  },
  {
    id: "2",
    name: "Anime",
    slug: "anime",
    count: 89,
    image: ImageUrls.categoryBanner("Anime"),
  },
  {
    id: "3",
    name: "Cyberpunk",
    slug: "cyberpunk",
    count: 124,
    image: ImageUrls.categoryBanner("Cyberpunk"),
  },
  {
    id: "4",
    name: "Fantasy",
    slug: "fantasy",
    count: 203,
    image: ImageUrls.categoryBanner("Fantasy"),
  },
  {
    id: "5",
    name: "Minimalist",
    slug: "minimalist",
    count: 67,
    image: ImageUrls.categoryBanner("Minimalist"),
  },
  {
    id: "6",
    name: "Pixel Art",
    slug: "pixel-art",
    count: 78,
    image: ImageUrls.categoryBanner("Pixel Art"),
  },
  {
    id: "7",
    name: "Vintage",
    slug: "vintage",
    count: 145,
    image: ImageUrls.categoryBanner("Vintage"),
  },
  {
    id: "8",
    name: "Sci-Fi",
    slug: "sci-fi",
    count: 112,
    image: ImageUrls.categoryBanner("Sci-Fi"),
  },
  {
    id: "9",
    name: "Watercolor",
    slug: "watercolor",
    count: 93,
    image: ImageUrls.categoryBanner("Watercolor"),
  },
]
