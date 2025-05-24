import type { Metadata } from "next"
import { ExploreLayout } from "@/components/explore-layout"
import { notFound } from "next/navigation"
import { ImageUrls } from "@/lib/image-service"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = allCategories.find((c) => c.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found - Pretty.af",
      description: "The requested category could not be found",
    }
  }

  return {
    title: `${category.name} Styles - Pretty.af`,
    description: `Browse ${category.name.toLowerCase()} AI image styles on Pretty.af`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = allCategories.find((c) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  // Filter styles that match this category
  const categoryStyles = allStyles.filter((style) =>
    style.tags.some((tag) => tag.toLowerCase() === category.slug.toLowerCase()),
  )

  return (
    <ExploreLayout
      title={`${category.name} Styles`}
      description={`Browse ${categoryStyles.length} ${category.name.toLowerCase()} AI image styles`}
      activeTab="categories"
      styles={categoryStyles}
    >
      <div className="relative aspect-[3/1] overflow-hidden rounded-xl mb-8">
        <img src={category.image || ImageUrls.categoryBanner(category.name)} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
            <p>{category.description}</p>
          </div>
        </div>
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
    image: ImageUrls.categoryBanner("Abstract"),
    description:
      "Non-representational styles focusing on shapes, colors, and textures rather than recognizable objects.",
  },
  {
    name: "Anime",
    slug: "anime",
    count: 38,
    image: ImageUrls.categoryBanner("Anime"),
    description: "Japanese-inspired animation styles with distinctive aesthetics and character designs.",
  },
  {
    name: "Cyberpunk",
    slug: "cyberpunk",
    count: 24,
    image: ImageUrls.categoryBanner("Cyberpunk"),
    description: "Futuristic styles featuring high-tech, neon aesthetics in dystopian urban environments.",
  },
  {
    name: "Fantasy",
    slug: "fantasy",
    count: 56,
    image: ImageUrls.categoryBanner("Fantasy"),
    description:
      "Magical and otherworldly styles featuring mythical creatures, enchanted landscapes, and supernatural elements.",
  },
  {
    name: "Minimalist",
    slug: "minimalist",
    count: 19,
    image: ImageUrls.categoryBanner("Minimalist"),
    description: "Clean, simple styles with reduced elements, focusing on essential forms and limited color palettes.",
  },
  {
    name: "Pixel Art",
    slug: "pixel-art",
    count: 31,
    image: ImageUrls.categoryBanner("Pixel Art"),
    description: "Retro digital art styles created with pixel-by-pixel precision, reminiscent of classic video games.",
  },
  {
    name: "Retro",
    slug: "retro",
    count: 27,
    image: ImageUrls.categoryBanner("Retro"),
    description: "Nostalgic styles inspired by past decades, featuring vintage aesthetics and classic design elements.",
  },
  {
    name: "Sci-Fi",
    slug: "sci-fi",
    count: 35,
    image: ImageUrls.categoryBanner("Sci-Fi"),
    description: "Futuristic styles exploring advanced technology, space exploration, and alien worlds.",
  },
  {
    name: "Watercolor",
    slug: "watercolor",
    count: 22,
    image: ImageUrls.categoryBanner("Watercolor"),
    description:
      "Artistic styles mimicking traditional watercolor painting techniques with soft edges and transparent colors.",
  },
]

const allStyles = [
  {
    id: "1",
    title: "Neon Dreams",
    creator: "@neonartist",
    likes: 1243,
    coverImage: ImageUrls.styleImage("Neon Dreams", "cyberpunk"),
    tags: ["cyberpunk", "neon", "city", "futuristic", "night"],
  },
  {
    id: "2",
    title: "Vintage Film",
    creator: "@retrovisuals",
    likes: 982,
    coverImage: ImageUrls.styleImage("Vintage Film", "vintage"),
    tags: ["vintage", "film", "retro", "analog", "nostalgic"],
  },
  {
    id: "3",
    title: "Abstract Waves",
    creator: "@wavecreator",
    likes: 756,
    coverImage: ImageUrls.styleImage("Abstract Waves", "abstract"),
    tags: ["abstract", "waves", "fluid", "colorful", "modern"],
  },
  {
    id: "4",
    title: "Pixel Art",
    creator: "@pixelmaster",
    likes: 1089,
    coverImage: ImageUrls.styleImage("Pixel Art", "pixel"),
    tags: ["pixel", "retro", "game", "8bit", "pixel-art"],
  },
  {
    id: "5",
    title: "Watercolor Dreams",
    creator: "@watercolorist",
    likes: 876,
    coverImage: ImageUrls.styleImage("Watercolor Dreams", "watercolor"),
    tags: ["watercolor", "painting", "artistic", "soft", "dreamy"],
  },
  {
    id: "6",
    title: "Sci-Fi Worlds",
    creator: "@futurevisions",
    likes: 654,
    coverImage: ImageUrls.styleImage("Sci-Fi Worlds", "scifi"),
    tags: ["sci-fi", "space", "futuristic", "alien", "landscape"],
  },
  {
    id: "7",
    title: "Anime Portraits",
    creator: "@animefan",
    likes: 432,
    coverImage: ImageUrls.styleImage("Anime Portraits", "anime"),
    tags: ["anime", "portrait", "character", "japanese", "cartoon"],
  },
  {
    id: "8",
    title: "Minimal Lines",
    creator: "@minimalist",
    likes: 321,
    coverImage: ImageUrls.styleImage("Minimal Lines", "minimal"),
    tags: ["minimalist", "lines", "simple", "clean", "modern"],
  },
  {
    id: "9",
    title: "Surreal Dreams",
    creator: "@surrealartist",
    likes: 543,
    coverImage: ImageUrls.styleImage("Surreal Dreams", "fantasy"),
    tags: ["surreal", "fantasy", "dream", "imaginative", "abstract"],
  },
]
