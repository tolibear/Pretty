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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Grid3X3, List, Heart, Play, Star, TrendingUp, Clock, Sparkles } from "lucide-react"

// Mock data for styles
const mockStyles = [
  {
    id: "1",
    title: "Cyberpunk Neon",
    description: "Futuristic cityscapes with vibrant neon lighting",
    category: "Cyberpunk",
    tags: ["neon", "futuristic", "city", "cyberpunk"],
    coverImageUrl: "/placeholder-image.jpg",
    creator: {
      id: "creator1",
      username: "neonartist",
      displayName: "Neon Artist",
      avatarUrl: undefined,
      isVerified: true,
    },
    pricePerGeneration: 0.01,
    currency: "ETH",
    isFree: false,
    totalGenerations: 1243,
    totalLikes: 456,
    rating: 4.8,
    createdAt: "2024-01-15",
    isTrending: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Watercolor Dreams",
    description: "Soft, flowing watercolor painting style",
    category: "Artistic",
    tags: ["watercolor", "painting", "soft", "artistic"],
    coverImageUrl: "/placeholder-image.jpg",
    creator: {
      id: "creator2",
      username: "watercolormaster",
      displayName: "Watercolor Master",
      avatarUrl: undefined,
      isVerified: false,
    },
    pricePerGeneration: 0,
    currency: "ETH",
    isFree: true,
    totalGenerations: 892,
    totalLikes: 234,
    rating: 4.6,
    createdAt: "2024-01-12",
    isTrending: false,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Minimalist Architecture",
    description: "Clean, modern architectural photography",
    category: "Architecture",
    tags: ["minimalist", "architecture", "modern", "clean"],
    coverImageUrl: "/placeholder-image.jpg",
    creator: {
      id: "creator3",
      username: "archphoto",
      displayName: "Arch Photo",
      avatarUrl: undefined,
      isVerified: true,
    },
    pricePerGeneration: 0.005,
    currency: "ETH",
    isFree: false,
    totalGenerations: 567,
    totalLikes: 189,
    rating: 4.9,
    createdAt: "2024-01-10",
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "4",
    title: "Fantasy Portrait",
    description: "Magical character portraits with ethereal lighting",
    category: "Fantasy",
    tags: ["fantasy", "portrait", "character", "magical"],
    coverImageUrl: "/placeholder-image.jpg",
    creator: {
      id: "creator4",
      username: "fantasyart",
      displayName: "Fantasy Art",
      avatarUrl: undefined,
      isVerified: false,
    },
    pricePerGeneration: 0.02,
    currency: "ETH",
    isFree: false,
    totalGenerations: 2156,
    totalLikes: 678,
    rating: 4.7,
    createdAt: "2024-01-08",
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
  "Nature",
  "Portrait",
  "Abstract",
  "Photography",
]

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
  { value: "free", label: "Free First" },
]

export function StyleExplorer() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All Categories")
  const [sortBy, setSortBy] = React.useState("trending")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [priceFilter, setPriceFilter] = React.useState<string[]>([])
  const [showFeatured, setShowFeatured] = React.useState(false)

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

    // Price filter
    if (priceFilter.length > 0) {
      filtered = filtered.filter(style => {
        if (priceFilter.includes("free") && style.isFree) return true
        if (priceFilter.includes("paid") && !style.isFree) return true
        return false
      })
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
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "free":
        filtered.sort((a, b) => (b.isFree ? 1 : 0) - (a.isFree ? 1 : 0))
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceFilter, showFeatured])

  const StyleCard = ({ style }: { style: typeof mockStyles[0] }) => (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
          <Image
            src={style.coverImageUrl}
            alt={style.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
            <div className="absolute top-2 left-2 flex gap-1">
              {style.isTrending && (
                <Badge className="bg-orange-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
              {style.isFeatured && (
                <Badge className="bg-purple-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {style.isFree && (
                <Badge className="bg-green-500 text-white">
                  Free
                </Badge>
              )}
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" className="bg-primary text-primary-foreground">
                <Play className="h-4 w-4 mr-1" />
                Generate
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <CardTitle className="text-lg line-clamp-1">{style.title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {style.description}
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={style.creator.avatarUrl} alt={style.creator.displayName} />
              <AvatarFallback className="text-xs">
                {style.creator.displayName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{style.creator.displayName}</span>
            {style.creator.isVerified && (
              <Badge variant="secondary" className="text-xs">Verified</Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{style.totalLikes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="h-4 w-4" />
                <span>{style.totalGenerations}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{style.rating}</span>
              </div>
            </div>
            <div className="text-sm font-medium">
              {style.isFree ? "Free" : `${style.pricePerGeneration} ${style.currency}`}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {style.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {style.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{style.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
                <DropdownMenuLabel>Price</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={priceFilter.includes("free")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPriceFilter([...priceFilter, "free"])
                    } else {
                      setPriceFilter(priceFilter.filter(f => f !== "free"))
                    }
                  }}
                >
                  Free Styles
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={priceFilter.includes("paid")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPriceFilter([...priceFilter, "paid"])
                    } else {
                      setPriceFilter(priceFilter.filter(f => f !== "paid"))
                    }
                  }}
                >
                  Paid Styles
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
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
            Showing {filteredStyles.length} of {mockStyles.length} styles
          </p>
          {(searchQuery || selectedCategory !== "All Categories" || priceFilter.length > 0 || showFeatured) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All Categories")
                setPriceFilter([])
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
                setPriceFilter([])
                setShowFeatured(false)
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredStyles.map((style) => (
              <StyleCard key={style.id} style={style} />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredStyles.length > 0 && (
          <div className="text-center">
            <Button variant="outline" size="lg">
              Load More Styles
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 