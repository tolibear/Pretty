import type { Metadata } from "next"
import { ExploreLayout } from "@/components/explore-layout"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Categories - Pretty.af",
  description: "Browse AI image styles by category",
}

export default function CategoriesPage() {
  return (
    <ExploreLayout
      title="Categories"
      description="Browse AI image styles by category"
      activeTab="categories"
      styles={[]}
      showFilters={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {allCategories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} styles</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </ExploreLayout>
  )
}

// Sample data
const allCategories = [
  {
    name: "Abstract",
    slug: "abstract",
    count: 42,
    image: "/images/abstract-waves.png",
  },
  {
    name: "Anime",
    slug: "anime",
    count: 38,
    image: "/images/anime-portrait.png",
  },
  {
    name: "Cyberpunk",
    slug: "cyberpunk",
    count: 24,
    image: "/images/cyberpunk-neon.png",
  },
  {
    name: "Fantasy",
    slug: "fantasy",
    count: 56,
    image: "/images/surreal-dream.png",
  },
  {
    name: "Minimalist",
    slug: "minimalist",
    count: 19,
    image: "/images/minimal-lines.png",
  },
  {
    name: "Pixel Art",
    slug: "pixel-art",
    count: 31,
    image: "/images/pixel-art.png",
  },
  {
    name: "Retro",
    slug: "retro",
    count: 27,
    image: "/images/vintage-film.png",
  },
  {
    name: "Sci-Fi",
    slug: "sci-fi",
    count: 35,
    image: "/images/scifi-world.png",
  },
  {
    name: "Watercolor",
    slug: "watercolor",
    count: 22,
    image: "/images/watercolor.png",
  },
]
