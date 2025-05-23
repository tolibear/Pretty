"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { ImageUrls } from "@/lib/image-service"

interface StyleSelectorProps {
  onStyleSelect: (style: any) => void
}

export function StyleSelector({ onStyleSelect }: StyleSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStyles = styles.filter(
    (style) =>
      style.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      style.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search styles by name, creator, or tags..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="yours">Your Styles</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredStyles.map((style) => (
              <StyleCard key={style.id} style={style} onSelect={onStyleSelect} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredStyles
              .sort((a, b) => new Date(b.stats.published).getTime() - new Date(a.stats.published).getTime())
              .map((style) => (
                <StyleCard key={style.id} style={style} onSelect={onStyleSelect} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredStyles
              .filter((style) => style.stats.likes > 1000)
              .map((style) => (
                <StyleCard key={style.id} style={style} onSelect={onStyleSelect} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="yours" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredStyles
              .filter((style) => style.creator.handle === "@neonartist")
              .map((style) => (
                <StyleCard key={style.id} style={style} onSelect={onStyleSelect} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface StyleCardProps {
  style: any
  onSelect: (style: any) => void
}

function StyleCard({ style, onSelect }: StyleCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg"
      onClick={() => onSelect(style)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={style.coverImage || ImageUrls.placeholder(400, 300, style.title)}
          alt={style.title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-sm truncate">{style.title}</h3>
            <p className="text-xs text-muted-foreground">{style.creator.handle}</p>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Heart className="h-3.5 w-3.5 mr-1 fill-current" />
            <span>{style.stats.likes.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {style.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {style.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{style.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

// Sample data
const styles = [
  {
    id: "1",
    title: "Neon Dreams",
    description:
      "Vibrant cyberpunk aesthetics with neon-lit cityscapes, perfect for futuristic scenes with a touch of nostalgia. Creates stunning night scenes with glowing elements.",
    creator: {
      name: "Alex Rivera",
      handle: "@neonartist",
      avatar: ImageUrls.creatorAvatar("neonartist"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Neon Dreams", "cyberpunk"),
    examples: ImageUrls.styleExamples("Neon Dreams", "cyberpunk", 6),
    stats: {
      likes: 1243,
      generations: 5621,
      published: "2023-05-15",
    },
    pricing: {
      baseMultiplier: 2,
      acceptedCoins: ["ETH", "USDC", "PENGU"],
      estimatedPrice: {
        ETH: "0.0012",
        USDC: "3.50",
        PENGU: "420",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: true,
      supportedRatios: ["1:1", "4:5", "16:9"],
    },
    tags: ["cyberpunk", "neon", "city", "futuristic", "night"],
  },
  {
    id: "2",
    title: "Vintage Film",
    description:
      "Classic film aesthetics with grain, light leaks, and warm tones. Perfect for creating nostalgic, timeless imagery with a touch of analog imperfection.",
    creator: {
      name: "Jamie Chen",
      handle: "@retrovisuals",
      avatar: ImageUrls.creatorAvatar("retrovisuals"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Vintage Film", "vintage"),
    examples: ImageUrls.styleExamples("Vintage Film", "vintage", 4),
    stats: {
      likes: 982,
      generations: 4210,
      published: "2023-05-02",
    },
    pricing: {
      baseMultiplier: 1.5,
      acceptedCoins: ["ETH", "USDC"],
      estimatedPrice: {
        ETH: "0.0009",
        USDC: "2.75",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: true,
      supportedRatios: ["1:1", "4:5", "3:2"],
    },
    tags: ["vintage", "film", "retro", "analog", "nostalgic"],
  },
  {
    id: "3",
    title: "Abstract Waves",
    description:
      "Fluid, colorful abstract patterns with smooth gradients and dynamic wave-like forms. Ideal for creating modern, artistic backgrounds and textures.",
    creator: {
      name: "Sam Wilson",
      handle: "@wavecreator",
      avatar: ImageUrls.creatorAvatar("wavecreator"),
      verified: false,
    },
    coverImage: ImageUrls.styleImage("Abstract Waves", "abstract"),
    examples: ImageUrls.styleExamples("Abstract Waves", "abstract", 4),
    stats: {
      likes: 756,
      generations: 3150,
      published: "2023-04-20",
    },
    pricing: {
      baseMultiplier: 1.2,
      acceptedCoins: ["USDC", "PENGU"],
      estimatedPrice: {
        USDC: "2.25",
        PENGU: "270",
      },
    },
    inputRequirements: {
      textPromptRequired: false,
      imageInputAllowed: true,
      supportedRatios: ["1:1", "16:9", "9:16"],
    },
    tags: ["abstract", "waves", "fluid", "colorful", "modern"],
  },
  {
    id: "4",
    title: "Pixel Art",
    description:
      "Retro pixel art style reminiscent of classic video games. Creates charming, nostalgic imagery with distinct pixelated edges and limited color palettes.",
    creator: {
      name: "Taylor Kim",
      handle: "@pixelmaster",
      avatar: ImageUrls.creatorAvatar("pixelmaster"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Pixel Art", "pixel"),
    examples: ImageUrls.styleExamples("Pixel Art", "pixel", 4),
    stats: {
      likes: 1089,
      generations: 4890,
      published: "2023-03-15",
    },
    pricing: {
      baseMultiplier: 1.8,
      acceptedCoins: ["ETH", "USDC", "PENGU"],
      estimatedPrice: {
        ETH: "0.0011",
        USDC: "3.25",
        PENGU: "390",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: false,
      supportedRatios: ["1:1", "4:3"],
    },
    tags: ["pixel", "retro", "game", "8bit", "nostalgic"],
  },
  {
    id: "5",
    title: "Watercolor Dreams",
    description:
      "Soft, dreamy watercolor aesthetics with gentle color bleeding and organic textures. Perfect for creating artistic, painterly imagery with a handcrafted feel.",
    creator: {
      name: "Jordan Lee",
      handle: "@watercolorist",
      avatar: ImageUrls.creatorAvatar("watercolorist"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Watercolor Dreams", "watercolor"),
    examples: ImageUrls.styleExamples("Watercolor Dreams", "watercolor", 4),
    stats: {
      likes: 876,
      generations: 3850,
      published: "2023-04-05",
    },
    pricing: {
      baseMultiplier: 1.6,
      acceptedCoins: ["ETH", "USDC"],
      estimatedPrice: {
        ETH: "0.0010",
        USDC: "3.00",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: true,
      supportedRatios: ["1:1", "4:5", "5:4"],
    },
    tags: ["watercolor", "painting", "artistic", "soft", "dreamy"],
  },
  {
    id: "6",
    title: "Sci-Fi Worlds",
    description:
      "Epic science fiction landscapes and environments with detailed futuristic elements. Ideal for creating immersive alien worlds, space scenes, and futuristic cityscapes.",
    creator: {
      name: "Morgan Chen",
      handle: "@futurevisions",
      avatar: ImageUrls.creatorAvatar("futurevisions"),
      verified: false,
    },
    coverImage: ImageUrls.styleImage("Sci-Fi Worlds", "scifi"),
    examples: ImageUrls.styleExamples("Sci-Fi Worlds", "scifi", 4),
    stats: {
      likes: 654,
      generations: 2950,
      published: "2023-04-12",
    },
    pricing: {
      baseMultiplier: 1.7,
      acceptedCoins: ["ETH", "USDC", "PENGU"],
      estimatedPrice: {
        ETH: "0.0010",
        USDC: "3.15",
        PENGU: "380",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: false,
      supportedRatios: ["16:9", "1:1", "3:2"],
    },
    tags: ["scifi", "space", "futuristic", "alien", "landscape"],
  },
]
