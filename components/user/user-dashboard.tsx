"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, Search, MoreHorizontal, Heart, Download, Share, Folder, 
  Image as ImageIcon, Settings, TrendingUp, Calendar, Star,
  Zap, Crown, Users, Eye, Filter, Grid, List
} from "lucide-react"
import { FreeGenerationsTracker } from "./free-generations-tracker"

// Mock data for user profile
const mockUser = {
  id: "1",
  username: "artlover",
  displayName: "Art Lover",
  email: "artlover@example.com",
  avatarUrl: "/placeholder-avatar.jpg",
  bio: "Digital art enthusiast and AI image generation explorer",
  joinedAt: "2024-01-01",
  freeGenerationsRemaining: 3,
  totalGenerations: 47,
  totalCollections: 8,
  totalLikes: 156,
  isCreator: false,
  isVerified: false,
}

// Mock data for recent activity
const mockRecentActivity = [
  {
    id: "1",
    type: "generation",
    title: "Created new image",
    description: "Cyberpunk cityscape with neon lights",
    timestamp: "2024-01-20T10:30:00Z",
    imageUrl: "/placeholder-image.jpg",
  },
  {
    id: "2",
    type: "collection",
    title: "Added to collection",
    description: "Added 3 images to 'Sci-Fi Concepts'",
    timestamp: "2024-01-19T15:45:00Z",
  },
  {
    id: "3",
    type: "like",
    title: "Liked a style",
    description: "Fantasy Portrait by @neonartist",
    timestamp: "2024-01-19T12:20:00Z",
  },
]

// Mock data for collections
const mockCollections = [
  {
    id: "1",
    name: "Cyberpunk Vibes",
    description: "Futuristic and neon-inspired styles",
    itemCount: 12,
    coverImageUrl: "/placeholder-image.jpg",
    isPublic: true,
    createdAt: "2024-01-15",
    lastUpdated: "2024-01-20",
  },
  {
    id: "2",
    name: "Nature & Landscapes",
    description: "Beautiful natural scenery styles",
    itemCount: 8,
    coverImageUrl: "/placeholder-image.jpg",
    isPublic: false,
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-18",
  },
  {
    id: "3",
    name: "Portrait Styles",
    description: "Character and portrait generation styles",
    itemCount: 15,
    coverImageUrl: "/placeholder-image.jpg",
    isPublic: true,
    createdAt: "2024-01-05",
    lastUpdated: "2024-01-19",
  },
]

// Mock data for generations
const mockGenerations = [
  {
    id: "1",
    prompt: "A cyberpunk cityscape at night with neon lights reflecting on wet streets",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Cyberpunk Neon",
    styleId: "style1",
    creatorName: "NeonArtist",
    createdAt: "2024-01-20T10:30:00Z",
    isPublic: true,
    likes: 24,
    downloads: 8,
    aspectRatio: "16:9",
    quality: "Premium",
    status: "completed",
  },
  {
    id: "2",
    prompt: "A serene mountain landscape with morning mist and golden sunlight",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Nature Photography",
    styleId: "style2",
    creatorName: "LandscapeAI",
    createdAt: "2024-01-19T15:45:00Z",
    isPublic: false,
    likes: 12,
    downloads: 3,
    aspectRatio: "4:5",
    quality: "Standard",
    status: "completed",
  },
  {
    id: "3",
    prompt: "Portrait of a wise old wizard with a long flowing beard and mystical eyes",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Fantasy Portrait",
    styleId: "style3",
    creatorName: "FantasyMaster",
    createdAt: "2024-01-18T09:15:00Z",
    isPublic: true,
    likes: 36,
    downloads: 15,
    aspectRatio: "1:1",
    quality: "Premium",
    status: "completed",
  },
  {
    id: "4",
    prompt: "Modern minimalist living room with clean lines and natural lighting",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Interior Design",
    styleId: "style4",
    creatorName: "DesignPro",
    createdAt: "2024-01-17T14:20:00Z",
    isPublic: true,
    likes: 18,
    downloads: 6,
    aspectRatio: "16:9",
    quality: "Standard",
    status: "completed",
  },
]

export function UserDashboard() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = React.useState<"all" | "public" | "private">("all")

  const filteredCollections = mockCollections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
      (filterStatus === "public" && collection.isPublic) ||
      (filterStatus === "private" && !collection.isPublic)
    return matchesSearch && matchesFilter
  })

  const filteredGenerations = mockGenerations.filter(generation => {
    const matchesSearch = generation.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      generation.styleName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
      (filterStatus === "public" && generation.isPublic) ||
      (filterStatus === "private" && !generation.isPublic)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container max-w-7xl py-6 md:py-8">
      <div className="flex flex-col space-y-6 md:space-y-8">
        {/* Header with User Profile Summary */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-6">
            <Avatar className="h-16 w-16 md:h-20 md:w-20">
              <AvatarImage src={mockUser.avatarUrl} alt={mockUser.displayName} />
              <AvatarFallback className="text-lg font-semibold">
                {mockUser.displayName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{mockUser.displayName}</h1>
                {mockUser.isVerified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    <Star className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">@{mockUser.username}</p>
              {mockUser.bio && (
                <p className="text-sm text-muted-foreground max-w-md">{mockUser.bio}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(mockUser.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md:items-end">
            <Button asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <FreeGenerationsTracker 
              totalFree={5}
              used={5 - mockUser.freeGenerationsRemaining}
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockUser.totalGenerations}</p>
                  <p className="text-xs text-muted-foreground">Generations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Folder className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockUser.totalCollections}</p>
                  <p className="text-xs text-muted-foreground">Collections</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockUser.totalLikes}</p>
                  <p className="text-xs text-muted-foreground">Likes Given</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{mockUser.freeGenerationsRemaining}</p>
                  <p className="text-xs text-muted-foreground">Free Left</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search collections and generations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  {filterStatus === "all" ? "All" : filterStatus === "public" ? "Public" : "Private"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All Items
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("public")}>
                  Public Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("private")}>
                  Private Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              <span className="hidden sm:inline">Collections</span>
              <span className="sm:hidden">({filteredCollections.length})</span>
            </TabsTrigger>
            <TabsTrigger value="generations" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Generations</span>
              <span className="sm:hidden">({filteredGenerations.length})</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Collections */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Collections</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#collections">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockCollections.slice(0, 4).map((collection) => (
                      <Card key={collection.id} className="group cursor-pointer hover:shadow-md transition-shadow">
                        <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
                          <Image
                            src={collection.coverImageUrl}
                            alt={collection.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{collection.name}</h4>
                              <Badge variant={collection.isPublic ? "default" : "secondary"} className="text-xs">
                                {collection.isPublic ? "Public" : "Private"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{collection.itemCount} items</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {activity.type === "generation" && <ImageIcon className="h-4 w-4 text-primary mt-1" />}
                          {activity.type === "collection" && <Folder className="h-4 w-4 text-primary mt-1" />}
                          {activity.type === "like" && <Heart className="h-4 w-4 text-primary mt-1" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Generations Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Generations</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#generations">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {mockGenerations.slice(0, 6).map((generation) => (
                    <div key={generation.id} className="group cursor-pointer">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={generation.imageUrl}
                          alt={generation.prompt}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute top-1 right-1">
                          <Badge variant={generation.isPublic ? "default" : "secondary"} className="text-xs">
                            {generation.isPublic ? "Public" : "Private"}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-medium truncate">{generation.styleName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(generation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">My Collections</h2>
                <p className="text-sm text-muted-foreground">
                  Organize your favorite styles and generated images
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Collection
              </Button>
            </div>

            {filteredCollections.length === 0 ? (
              <div className="text-center py-12">
                <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No collections found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search terms." : "Create your first collection to get started."}
                </p>
                {!searchQuery && (
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Collection
                  </Button>
                )}
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredCollections.map((collection) => (
                  <Card key={collection.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                    {viewMode === "grid" ? (
                      <>
                        <CardHeader className="p-0">
                          <div className="aspect-video relative overflow-hidden rounded-t-lg bg-muted">
                            <Image
                              src={collection.coverImageUrl}
                              alt={collection.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="secondary" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Collection</DropdownMenuItem>
                                  <DropdownMenuItem>Share Collection</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    Delete Collection
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{collection.name}</CardTitle>
                              <Badge variant={collection.isPublic ? "default" : "secondary"}>
                                {collection.isPublic ? "Public" : "Private"}
                              </Badge>
                            </div>
                            <CardDescription className="line-clamp-2">
                              {collection.description}
                            </CardDescription>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{collection.itemCount} items</span>
                              <span>Updated {new Date(collection.lastUpdated).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 relative overflow-hidden rounded-lg bg-muted flex-shrink-0">
                            <Image
                              src={collection.coverImageUrl}
                              alt={collection.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold truncate">{collection.name}</h3>
                              <Badge variant={collection.isPublic ? "default" : "secondary"}>
                                {collection.isPublic ? "Public" : "Private"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {collection.description}
                            </p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{collection.itemCount} items</span>
                              <span>Updated {new Date(collection.lastUpdated).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Collection</DropdownMenuItem>
                              <DropdownMenuItem>Share Collection</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete Collection
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Generations Tab */}
          <TabsContent value="generations" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">My Generations</h2>
                <p className="text-sm text-muted-foreground">
                  All your AI-generated images in one place
                </p>
              </div>
              <Button asChild>
                <Link href="/explore">
                  <Plus className="mr-2 h-4 w-4" />
                  Generate New
                </Link>
              </Button>
            </div>

            {filteredGenerations.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No generations found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search terms." : "Start generating images to see them here."}
                </p>
                {!searchQuery && (
                  <Button asChild>
                    <Link href="/explore">Explore Styles</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
                : "space-y-4"
              }>
                {filteredGenerations.map((generation) => (
                  <Card key={generation.id} className="group overflow-hidden">
                    {viewMode === "grid" ? (
                      <>
                        <div className="aspect-square relative">
                          <Image
                            src={generation.imageUrl}
                            alt={generation.prompt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex space-x-1">
                                <Button variant="secondary" size="icon" className="h-8 w-8">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="secondary" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="secondary" size="icon" className="h-8 w-8">
                                  <Share className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <div className="bg-black/80 rounded p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="line-clamp-2 mb-1">{generation.prompt}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-white/80">{generation.styleName}</span>
                                  <div className="flex items-center space-x-1">
                                    <Heart className="h-3 w-3" />
                                    <span>{generation.likes}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge variant={generation.isPublic ? "default" : "secondary"} className="text-xs">
                              {generation.isPublic ? "Public" : "Private"}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium line-clamp-1">{generation.styleName}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{generation.prompt}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{generation.aspectRatio}</span>
                              <span>{new Date(generation.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 relative overflow-hidden rounded-lg bg-muted flex-shrink-0">
                            <Image
                              src={generation.imageUrl}
                              alt={generation.prompt}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold truncate">{generation.styleName}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge variant={generation.isPublic ? "default" : "secondary"} className="text-xs">
                                  {generation.isPublic ? "Public" : "Private"}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {generation.quality}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {generation.prompt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>by {generation.creatorName}</span>
                              <span>{new Date(generation.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Add to Collection</DropdownMenuItem>
                                <DropdownMenuItem>Share Generation</DropdownMenuItem>
                                <DropdownMenuItem>View Style</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Delete Generation
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">
                Your recent actions and interactions on Pretty.af
              </p>
            </div>

            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "generation" && (
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        {activity.type === "collection" && (
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Folder className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        {activity.type === "like" && (
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                            <Heart className="h-4 w-4 text-red-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{activity.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                      {activity.imageUrl && (
                        <div className="w-12 h-12 relative overflow-hidden rounded-lg bg-muted flex-shrink-0">
                          <Image
                            src={activity.imageUrl}
                            alt="Activity image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">
                That's all your recent activity. Keep creating to see more!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 