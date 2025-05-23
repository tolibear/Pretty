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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Heart, Download, Share, Folder, Image as ImageIcon } from "lucide-react"

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
  },
  {
    id: "2",
    name: "Nature & Landscapes",
    description: "Beautiful natural scenery styles",
    itemCount: 8,
    coverImageUrl: "/placeholder-image.jpg",
    isPublic: false,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Portrait Styles",
    description: "Character and portrait generation styles",
    itemCount: 15,
    coverImageUrl: "/placeholder-image.jpg",
    isPublic: true,
    createdAt: "2024-01-05",
  },
]

const mockGenerations = [
  {
    id: "1",
    prompt: "A cyberpunk cityscape at night with neon lights",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Cyberpunk Neon",
    createdAt: "2024-01-20",
    isPublic: true,
    likes: 24,
  },
  {
    id: "2",
    prompt: "A serene mountain landscape with morning mist",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Nature Photography",
    createdAt: "2024-01-19",
    isPublic: false,
    likes: 12,
  },
  {
    id: "3",
    prompt: "Portrait of a wise old wizard with a long beard",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Fantasy Portrait",
    createdAt: "2024-01-18",
    isPublic: true,
    likes: 36,
  },
  {
    id: "4",
    prompt: "Modern minimalist living room interior",
    imageUrl: "/placeholder-image.jpg",
    styleName: "Interior Design",
    createdAt: "2024-01-17",
    isPublic: true,
    likes: 18,
  },
]

export function UserCollections() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredCollections = mockCollections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredGenerations = mockGenerations.filter(generation =>
    generation.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    generation.styleName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Collections</h1>
            <p className="text-muted-foreground">
              Organize your favorite styles and generated images
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Collection
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search collections and generations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="collections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="collections" className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Collections ({filteredCollections.length})
            </TabsTrigger>
            <TabsTrigger value="generations" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Generations ({filteredGenerations.length})
            </TabsTrigger>
          </TabsList>

          {/* Collections Tab */}
          <TabsContent value="collections" className="space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((collection) => (
                  <Card key={collection.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
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
                          <span>Created {new Date(collection.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Generations Tab */}
          <TabsContent value="generations" className="space-y-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGenerations.map((generation) => (
                  <Card key={generation.id} className="group overflow-hidden">
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
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 