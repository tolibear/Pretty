import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StyleCard } from "@/components/style-card"
import Link from "next/link"

interface ExploreLayoutProps {
  children: ReactNode
  title: string
  description: string
  activeTab: string
  styles: any[]
  showFilters?: boolean
}

export function ExploreLayout({
  children,
  title,
  description,
  activeTab,
  styles,
  showFilters = true,
}: ExploreLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Sort: Popular
              </Button>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {showFilters && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Search</h3>
                  <Input placeholder="Search styles..." />
                </div>

                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/categories/${category.slug}`}
                        className="flex items-center justify-between text-sm hover:underline"
                      >
                        <span>{category.name}</span>
                        <span className="text-muted-foreground">{category.count}</span>
                      </Link>
                    ))}
                    <Link href="/categories" className="text-sm text-primary hover:underline">
                      View all categories
                    </Link>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Price</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="free" className="mr-2" />
                      <label htmlFor="free" className="text-sm">
                        Free
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="paid" className="mr-2" />
                      <label htmlFor="paid" className="text-sm">
                        Paid
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="image-input" className="mr-2" />
                      <label htmlFor="image-input" className="text-sm">
                        Supports Image Input
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="no-prompt" className="mr-2" />
                      <label htmlFor="no-prompt" className="text-sm">
                        No Prompt Required
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              <Tabs defaultValue={activeTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="trending" asChild>
                    <Link href="/trending">Trending</Link>
                  </TabsTrigger>
                  <TabsTrigger value="featured" asChild>
                    <Link href="/featured">Featured</Link>
                  </TabsTrigger>
                  <TabsTrigger value="new" asChild>
                    <Link href="/new">New Arrivals</Link>
                  </TabsTrigger>
                  <TabsTrigger value="categories" asChild>
                    <Link href="/categories">Categories</Link>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-8">
                  {children}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {styles.map((style) => (
                      <StyleCard key={style.id} style={style} />
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline">Load More</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

const categories = [
  { name: "Abstract", slug: "abstract", count: 42 },
  { name: "Anime", slug: "anime", count: 38 },
  { name: "Cyberpunk", slug: "cyberpunk", count: 24 },
  { name: "Fantasy", slug: "fantasy", count: 56 },
  { name: "Minimalist", slug: "minimalist", count: 19 },
  { name: "Pixel Art", slug: "pixel-art", count: 31 },
]
