"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Grid3X3, List, Heart, TrendingUp, Shuffle, Loader2, Star } from "lucide-react"
import { ImageUrls } from "@/lib/image-service"
import { useImageBrightness } from "@/hooks/use-image-brightness"

// Enhanced mock data with 50+ styles and 9 different creators
const mockCreators = [
  {
    id: "creator1",
    username: "neonartist",
    displayName: "Neon Artist",
    avatarUrl: ImageUrls.creatorAvatar("neonartist"),
    isVerified: true,
  },
  {
    id: "creator2", 
    username: "watercolormaster",
    displayName: "Watercolor Master",
    avatarUrl: ImageUrls.creatorAvatar("watercolormaster"),
    isVerified: false,
  },
  {
    id: "creator3",
    username: "archphoto",
    displayName: "Arch Photo", 
    avatarUrl: ImageUrls.creatorAvatar("archphoto"),
    isVerified: true,
  },
  {
    id: "creator4",
    username: "fantasyart",
    displayName: "Fantasy Art",
    avatarUrl: ImageUrls.creatorAvatar("fantasyart"),
    isVerified: false,
  },
  {
    id: "creator5",
    username: "filmmaster",
    displayName: "Film Master",
    avatarUrl: ImageUrls.creatorAvatar("filmmaster"),
    isVerified: true,
  },
  {
    id: "creator6",
    username: "abstractflow",
    displayName: "Abstract Flow",
    avatarUrl: ImageUrls.creatorAvatar("abstractflow"),
    isVerified: false,
  },
  {
    id: "creator7",
    username: "pixelmaster",
    displayName: "Pixel Master",
    avatarUrl: ImageUrls.creatorAvatar("pixelmaster"),
    isVerified: true,
  },
  {
    id: "creator8",
    username: "scifiworld",
    displayName: "Sci-Fi World",
    avatarUrl: ImageUrls.creatorAvatar("scifiworld"),
    isVerified: false,
  },
  {
    id: "creator9",
    username: "animeartist",
    displayName: "Anime Artist",
    avatarUrl: ImageUrls.creatorAvatar("animeartist"),
    isVerified: true,
  },
]

const mockStyles = [
  {
    id: "1",
    title: "Cyberpunk Neon",
    description: "Futuristic cityscapes with vibrant neon lighting",
    category: "Cyberpunk",
    tags: ["neon", "futuristic", "city"],
    coverImageUrl: ImageUrls.styleImage("Cyberpunk Neon", "cyberpunk"),
    creator: mockCreators[0],
    pricePerGeneration: 0.01,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1243,
    totalLikes: 456,
    createdAt: "2024-01-15",
    isTrending: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Watercolor Dreams",
    description: "Soft, flowing watercolor painting style",
    category: "Artistic",
    tags: ["watercolor", "painting", "soft"],
    coverImageUrl: ImageUrls.styleImage("Watercolor Dreams", "watercolor"),
    creator: mockCreators[1],
    pricePerGeneration: 0,
    currency: "ETH",
    isFree: true,
    totalGenerations: 892,
    totalLikes: 234,
    createdAt: "2024-01-12",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Minimalist Architecture",
    description: "Clean, modern architectural photography",
    category: "Architecture",
    tags: ["minimalist", "architecture", "modern"],
    coverImageUrl: ImageUrls.styleImage("Minimalist Architecture", "architecture"),
    creator: mockCreators[2],
    pricePerGeneration: 0.005,
    currency: "ETH",
    isFree: false,
    totalGenerations: 567,
    totalLikes: 189,
    createdAt: "2024-01-10",
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "4",
    title: "Fantasy Portrait",
    description: "Magical character portraits with ethereal lighting",
    category: "Fantasy",
    tags: ["fantasy", "portrait", "character"],
    coverImageUrl: ImageUrls.styleImage("Fantasy Portrait", "fantasy"),
    creator: mockCreators[3],
    pricePerGeneration: 0.02,
    currency: "ETH",
    isFree: false,
    totalGenerations: 2156,
    totalLikes: 678,
    createdAt: "2024-01-08",
    isTrending: false,
    isFeatured: true,
  },
  {
    id: "5",
    title: "Vintage Film",
    description: "Classic film photography with grain and warmth",
    category: "Photography",
    tags: ["vintage", "film", "retro"],
    coverImageUrl: ImageUrls.styleImage("Vintage Film", "vintage"),
    creator: mockCreators[4],
    pricePerGeneration: 0.008,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1456,
    totalLikes: 389,
    createdAt: "2024-01-05",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Abstract Waves",
    description: "Flowing abstract patterns and organic shapes",
    category: "Abstract",
    tags: ["abstract", "waves", "organic"],
    coverImageUrl: ImageUrls.styleImage("Abstract Waves", "abstract"),
    creator: mockCreators[5],
    pricePerGeneration: 0,
    currency: "ETH",
    isFree: true,
    totalGenerations: 723,
    totalLikes: 156,
    createdAt: "2024-01-03",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "7",
    title: "Pixel Art Retro",
    description: "8-bit inspired pixel art with nostalgic gaming vibes",
    category: "Gaming",
    tags: ["pixel", "retro", "gaming"],
    coverImageUrl: ImageUrls.styleImage("Pixel Art Retro", "pixel"),
    creator: mockCreators[6],
    pricePerGeneration: 0.006,
    currency: "ETH",
    isFree: false,
    totalGenerations: 934,
    totalLikes: 267,
    createdAt: "2024-01-01",
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "8",
    title: "Sci-Fi Landscapes",
    description: "Alien worlds and futuristic environments",
    category: "Sci-Fi",
    tags: ["sci-fi", "alien", "landscape"],
    coverImageUrl: ImageUrls.styleImage("Sci-Fi Landscapes", "scifi"),
    creator: mockCreators[7],
    pricePerGeneration: 0.012,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1789,
    totalLikes: 445,
    createdAt: "2023-12-28",
    isTrending: false,
    isFeatured: true,
  },
  {
    id: "9",
    title: "Anime Character",
    description: "Japanese animation style character illustrations",
    category: "Anime",
    tags: ["anime", "character", "manga"],
    coverImageUrl: ImageUrls.styleImage("Anime Character", "anime"),
    creator: mockCreators[8],
    pricePerGeneration: 0.015,
    currency: "ETH",
    isFree: false,
    totalGenerations: 2834,
    totalLikes: 892,
    createdAt: "2023-12-25",
    isTrending: true,
    isFeatured: true,
  },
  {
    id: "10",
    title: "Street Art Graffiti",
    description: "Urban street art and graffiti styles",
    category: "Urban",
    tags: ["street", "graffiti", "urban"],
    coverImageUrl: ImageUrls.styleImage("Street Art Graffiti", "street"),
    creator: mockCreators[0],
    pricePerGeneration: 0,
    currency: "ETH",
    isFree: true,
    totalGenerations: 645,
    totalLikes: 178,
    createdAt: "2023-12-22",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "11",
    title: "Oil Painting Classic",
    description: "Traditional oil painting techniques and textures",
    category: "Classical",
    tags: ["oil", "painting", "classical"],
    coverImageUrl: ImageUrls.styleImage("Oil Painting Classic", "classical"),
    creator: mockCreators[1],
    pricePerGeneration: 0.018,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1234,
    totalLikes: 356,
    createdAt: "2023-12-20",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "12",
    title: "Neon Synthwave",
    description: "80s inspired synthwave aesthetics with neon colors",
    category: "Synthwave",
    tags: ["synthwave", "80s", "neon"],
    coverImageUrl: ImageUrls.styleImage("Neon Synthwave", "synthwave"),
    creator: mockCreators[2],
    pricePerGeneration: 0.009,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1567,
    totalLikes: 423,
    createdAt: "2023-12-18",
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "13",
    title: "Nature Photography",
    description: "Stunning natural landscapes and wildlife",
    category: "Nature",
    tags: ["nature", "landscape", "wildlife"],
    coverImageUrl: ImageUrls.styleImage("Nature Photography", "nature"),
    creator: mockCreators[3],
    pricePerGeneration: 0,
    currency: "ETH",
    isFree: true,
    totalGenerations: 856,
    totalLikes: 234,
    createdAt: "2023-12-15",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "14",
    title: "Gothic Architecture",
    description: "Dark, dramatic gothic architectural elements",
    category: "Architecture",
    tags: ["gothic", "dark", "dramatic"],
    coverImageUrl: ImageUrls.styleImage("Gothic Architecture", "gothic"),
    creator: mockCreators[4],
    pricePerGeneration: 0.011,
    currency: "ETH",
    isFree: false,
    totalGenerations: 789,
    totalLikes: 198,
    createdAt: "2023-12-12",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "15",
    title: "Cartoon Style",
    description: "Playful cartoon and comic book illustrations",
    category: "Cartoon",
    tags: ["cartoon", "comic", "playful"],
    coverImageUrl: ImageUrls.styleImage("Cartoon Style", "cartoon"),
    creator: mockCreators[5],
    pricePerGeneration: 0.007,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1123,
    totalLikes: 289,
    createdAt: "2023-12-10",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "16",
    title: "Steampunk Mechanical",
    description: "Victorian-era inspired mechanical and steam-powered aesthetics",
    category: "Steampunk",
    tags: ["steampunk", "mechanical", "victorian"],
    coverImageUrl: ImageUrls.styleImage("Steampunk Mechanical", "steampunk"),
    creator: mockCreators[6],
    pricePerGeneration: 0.013,
    currency: "ETH",
    isFree: false,
    totalGenerations: 967,
    totalLikes: 245,
    createdAt: "2023-12-08",
    isTrending: false,
    isFeatured: true,
  },
  {
    id: "17",
    title: "Pastel Kawaii",
    description: "Cute Japanese kawaii style with pastel colors",
    category: "Kawaii",
    tags: ["kawaii", "pastel", "cute"],
    coverImageUrl: ImageUrls.styleImage("Pastel Kawaii", "kawaii"),
    creator: mockCreators[7],
    pricePerGeneration: 0,
    currency: "ETH",
    isFree: true,
    totalGenerations: 1456,
    totalLikes: 567,
    createdAt: "2023-12-05",
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "18",
    title: "Horror Dark Art",
    description: "Spooky and atmospheric horror-themed artwork",
    category: "Horror",
    tags: ["horror", "dark", "spooky"],
    coverImageUrl: ImageUrls.styleImage("Horror Dark Art", "horror"),
    creator: mockCreators[8],
    pricePerGeneration: 0.014,
    currency: "ETH",
    isFree: false,
    totalGenerations: 678,
    totalLikes: 156,
    createdAt: "2023-12-03",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "19",
    title: "Geometric Patterns",
    description: "Mathematical and geometric pattern designs",
    category: "Geometric",
    tags: ["geometric", "pattern", "mathematical"],
    coverImageUrl: ImageUrls.styleImage("Geometric Patterns", "geometric"),
    creator: mockCreators[0],
    pricePerGeneration: 0.005,
    currency: "ETH",
    isFree: false,
    totalGenerations: 534,
    totalLikes: 123,
    createdAt: "2023-12-01",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "20",
    title: "Space Exploration",
    description: "Cosmic scenes and space exploration themes",
    category: "Space",
    tags: ["space", "cosmic", "exploration"],
    coverImageUrl: ImageUrls.styleImage("Space Exploration", "space"),
    creator: mockCreators[1],
    pricePerGeneration: 0.016,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1789,
    totalLikes: 445,
    createdAt: "2023-11-28",
    isTrending: false,
    isFeatured: true,
  },
  // Additional styles 21-50
  {
    id: "21",
    title: "Digital Portraits",
    description: "Modern digital portrait art with vibrant colors",
    category: "Portrait",
    tags: ["digital", "portrait", "modern"],
    coverImageUrl: ImageUrls.styleImage("Digital Portraits", "portrait"),
    creator: mockCreators[2],
    pricePerGeneration: 0.012,
    currency: "ETH",
    isFree: false,
    totalGenerations: 892,
    totalLikes: 234,
    createdAt: "2023-11-25",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "22",
    title: "Surreal Dreams",
    description: "Dreamlike surreal compositions with impossible elements",
    category: "Surreal",
    tags: ["surreal", "dreams", "impossible"],
    coverImageUrl: ImageUrls.styleImage("Surreal Dreams", "surreal"),
    creator: mockCreators[3],
    pricePerGeneration: 0.015,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1456,
    totalLikes: 567,
    createdAt: "2023-11-22",
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "23",
    title: "Ink Illustrations",
    description: "Traditional ink drawing style with fine details",
    category: "Illustration",
    tags: ["ink", "drawing", "traditional"],
    coverImageUrl: ImageUrls.styleImage("Ink Illustrations", "ink"),
    creator: mockCreators[4],
    pricePerGeneration: 0.008,
    currency: "ETH",
    isFree: false,
    totalGenerations: 723,
    totalLikes: 189,
    createdAt: "2023-11-20",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "24",
    title: "Neon Noir",
    description: "Dark noir atmosphere with neon accents",
    category: "Noir",
    tags: ["noir", "dark", "neon"],
    coverImageUrl: ImageUrls.styleImage("Neon Noir", "noir"),
    creator: mockCreators[5],
    pricePerGeneration: 0.011,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1234,
    totalLikes: 445,
    createdAt: "2023-11-18",
    isTrending: false,
    isFeatured: true,
  },
  {
    id: "25",
    title: "Botanical Art",
    description: "Detailed botanical illustrations and plant studies",
    category: "Botanical",
    tags: ["botanical", "plants", "nature"],
    coverImageUrl: ImageUrls.styleImage("Botanical Art", "botanical"),
    creator: mockCreators[6],
    pricePerGeneration: 0,
    currency: "ETH",
    isFree: true,
    totalGenerations: 645,
    totalLikes: 156,
    createdAt: "2023-11-15",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "26",
    title: "Retro Futurism",
    description: "1950s vision of the future with atomic age aesthetics",
    category: "Retro",
    tags: ["retro", "futurism", "atomic"],
    coverImageUrl: ImageUrls.styleImage("Retro Futurism", "retro"),
    creator: mockCreators[7],
    pricePerGeneration: 0.009,
    currency: "ETH",
    isFree: false,
    totalGenerations: 967,
    totalLikes: 278,
    createdAt: "2023-11-12",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "27",
    title: "Manga Style",
    description: "Black and white manga comic book style",
    category: "Manga",
    tags: ["manga", "comic", "monochrome"],
    coverImageUrl: ImageUrls.styleImage("Manga Style", "manga"),
    creator: mockCreators[8],
    pricePerGeneration: 0.007,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1567,
    totalLikes: 623,
    createdAt: "2023-11-10",
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "28",
    title: "Art Deco",
    description: "Elegant 1920s art deco design elements",
    category: "Art Deco",
    tags: ["art deco", "1920s", "elegant"],
    coverImageUrl: ImageUrls.styleImage("Art Deco", "artdeco"),
    creator: mockCreators[0],
    pricePerGeneration: 0.013,
    currency: "ETH",
    isFree: false,
    totalGenerations: 856,
    totalLikes: 234,
    createdAt: "2023-11-08",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "29",
    title: "Glitch Art",
    description: "Digital glitch effects and data corruption aesthetics",
    category: "Glitch",
    tags: ["glitch", "digital", "corruption"],
    coverImageUrl: ImageUrls.styleImage("Glitch Art", "glitch"),
    creator: mockCreators[1],
    pricePerGeneration: 0.006,
    currency: "ETH",
    isFree: false,
    totalGenerations: 789,
    totalLikes: 198,
    createdAt: "2023-11-05",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "30",
    title: "Impressionist",
    description: "Classic impressionist painting style with soft brushstrokes",
    category: "Impressionist",
    tags: ["impressionist", "painting", "soft"],
    coverImageUrl: ImageUrls.styleImage("Impressionist", "impressionist"),
    creator: mockCreators[2],
    pricePerGeneration: 0.014,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1123,
    totalLikes: 389,
    createdAt: "2023-11-03",
    isTrending: false,
    isFeatured: true,
  },
]

const categories = [
  "All Categories",
  "Cyberpunk",
  "Artistic", 
  "Architecture",
  "Fantasy",
  "Photography",
  "Abstract",
  "Gaming",
  "Sci-Fi",
  "Anime",
  "Urban",
  "Classical",
  "Synthwave",
  "Nature",
  "Cartoon",
  "Steampunk",
  "Kawaii",
  "Horror",
  "Geometric",
  "Space",
]

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
]

export function StyleExplorer() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All Categories")
  const [sortBy, setSortBy] = React.useState("trending")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [showFeatured, setShowFeatured] = React.useState(false)
  const [displayedStyles, setDisplayedStyles] = React.useState(9) // Start with 9 items
  const [isLoading, setIsLoading] = React.useState(false)

  const filteredStyles = React.useMemo(() => {
    let filtered = mockStyles

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(style =>
        style.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        style.creator.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(style => style.category === selectedCategory)
    }

    // Featured filter
    if (showFeatured) {
      filtered = filtered.filter(style => style.isFeatured)
    }

    // Sort
    switch (sortBy) {
      case "trending":
        filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0))
        break
      case "popular":
        filtered.sort((a, b) => b.totalLikes - a.totalLikes)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, showFeatured])

  // Infinite scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
        return
      }
      
      if (displayedStyles < filteredStyles.length) {
        setIsLoading(true)
        setTimeout(() => {
          setDisplayedStyles(prev => Math.min(prev + 9, filteredStyles.length)) // Load 9 more at a time
          setIsLoading(false)
        }, 1000) // Simulate loading delay
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayedStyles, filteredStyles.length, isLoading])

  // Reset displayed styles when filters change
  React.useEffect(() => {
    setDisplayedStyles(9) // Reset to 9 items
  }, [searchQuery, selectedCategory, sortBy, showFeatured])

  const StyleCard = ({ style }: { style: typeof mockStyles[0] }) => {
    const { badgeClasses } = useImageBrightness(style.coverImageUrl)
    
    // Determine which badge to show (only one at a time)
    // Priority: Trending > Featured
    const badge = style.isTrending ? 'trending' : style.isFeatured ? 'featured' : null
    
    return (
      <Link href={`/style/${style.id}`} key={style.id}>
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-pink-200 hover:ring-opacity-50">
          <CardHeader className="p-0">
            <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
              <Image
                src={style.coverImageUrl}
                alt={style.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                {/* Single badge with dynamic blend mode */}
                {badge && (
                  <div className="absolute top-2 left-2">
                    {badge === 'trending' && (
                      <Badge className={`${badgeClasses} text-xs`}>
                        <TrendingUp className="h-2.5 w-2.5 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {badge === 'featured' && (
                      <Badge className={`${badgeClasses} text-xs`}>
                        <Star className="h-2.5 w-2.5 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <CardTitle className="text-base line-clamp-1">{style.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1 text-sm">
                  {style.description}
                </CardDescription>
              </div>
              
              {/* Creator PFP and stats inline */}
              <div className="flex items-center justify-between">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link 
                        href={`/creator/${style.creator.username}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                      >
                        <Avatar className="h-6 w-6 hover:ring-2 hover:ring-primary hover:ring-offset-1 transition-all">
                          <AvatarImage src={style.creator.avatarUrl} alt={style.creator.displayName} />
                          <AvatarFallback className="text-xs">
                            {style.creator.displayName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{style.creator.displayName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3 text-muted-foreground/60" />
                    <span>{style.totalLikes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shuffle className="h-3 w-3 text-muted-foreground/60" />
                    <span>{style.totalGenerations}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  const currentStyles = filteredStyles.slice(0, displayedStyles)

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Explore Styles</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing AI styles created by talented artists from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search styles, creators, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters and Controls */}
          <div className="flex items-center space-x-2">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Advanced Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Special</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={showFeatured}
                  onCheckedChange={setShowFeatured}
                >
                  Featured Only
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {currentStyles.length} of {filteredStyles.length} styles
          </p>
          {(searchQuery || selectedCategory !== "All Categories" || showFeatured) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setShowFeatured(false)
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Styles Grid */}
        {filteredStyles.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No styles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setShowFeatured(false)
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {currentStyles.map((style) => (
                <StyleCard key={style.id} style={style} />
              ))}
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm text-muted-foreground">Loading more styles...</span>
                </div>
              </div>
            )}

            {/* End of results indicator */}
            {displayedStyles >= filteredStyles.length && filteredStyles.length > 9 && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  You've reached the end! Showing all {filteredStyles.length} styles.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 