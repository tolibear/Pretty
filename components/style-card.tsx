"use client"

import Link from "next/link"
import { Heart, Shuffle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ImageUrls } from "@/lib/image-service"
import { useImageBrightness } from "@/hooks/use-image-brightness"

interface StyleCardProps {
  style: {
    id: string
    title: string
    description?: string
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
    description,
    creator,
    likes,
    coverImage,
    isTrending = false,
    generations = 1243,
    creatorAvatar,
  } = style

  const imageUrl = coverImage || ImageUrls.placeholder(800, 600, title)
  const { badgeClasses } = useImageBrightness(imageUrl)

  // Only show trending badge now
  const showTrendingBadge = isTrending

  return (
    <Link href={`/style/${id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md cursor-pointer hover:ring-2 hover:ring-pink-200 hover:ring-opacity-50">
        {/* Image Container */}
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={`${title} AI style by ${creator}`}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </div>

          {/* Trending badge with dynamic blend mode */}
          {showTrendingBadge && (
            <div className="absolute top-3 left-3">
              <Badge className={badgeClasses}>
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          {/* Title and Description */}
          <div>
            <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Creator PFP and Stats */}
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={`/creator/${creator.slice(1)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0"
                  >
                    <Avatar className="h-6 w-6 hover:ring-2 hover:ring-primary hover:ring-offset-1 transition-all">
                      <AvatarImage src={creatorAvatar || ImageUrls.userAvatar(creator.slice(1), 'creator')} alt={creator} />
                      <AvatarFallback className="text-xs">{creator.charAt(1)}</AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{creator}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 fill-current text-muted-foreground/60" />
                <span className="text-sm">{likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Shuffle className="h-3.5 w-3.5 text-muted-foreground/60" />
                <span className="text-sm">{generations.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
