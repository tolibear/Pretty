"use client"

import Link from "next/link"
import { Heart, Play, Star, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageUrls } from "@/lib/image-service"

interface StyleCardProps {
  style: {
    id: string
    title: string
    creator: string
    likes: number
    coverImage: string
    price?: number
    isFree?: boolean
    isTrending?: boolean
    isFeatured?: boolean
    rating?: number
    generations?: number
    creatorAvatar?: string
    isVerified?: boolean
  }
}

export function StyleCard({ style }: StyleCardProps) {
  const {
    id,
    title,
    creator,
    likes,
    coverImage,
    isFree = false,
    isTrending = false,
    isFeatured = false,
    rating = 4.8,
    generations = 1243,
    creatorAvatar,
    isVerified = false
  } = style

  return (
    <Link href={`/style/${id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md cursor-pointer">
        {/* Image Container */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={coverImage || ImageUrls.placeholder(800, 600, title)}
              alt={`${title} AI style by ${creator}`}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="h-6 w-6 text-primary fill-current" />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isFree && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
                <Zap className="h-3 w-3 mr-1" />
                Free
              </Badge>
            )}
            {isTrending && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
                🔥 Trending
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0">
                ⭐ Featured
              </Badge>
            )}
          </div>

          {/* Like button */}
          <div className="absolute top-3 right-3">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                // Handle like action
              }}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Like {title}</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          {/* Title and Creator */}
          <div>
            <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            
            {/* Creator Info */}
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={creatorAvatar || ImageUrls.userAvatar(creator.slice(1), 'creator')} alt={creator} />
                <AvatarFallback className="text-xs">{creator.charAt(1)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {creator}
              </span>
              {isVerified && (
                <div className="text-primary" title="Verified Creator">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 fill-current text-red-500" />
                <span>{likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Play className="h-3.5 w-3.5" />
                <span>{generations.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
