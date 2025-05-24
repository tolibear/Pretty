"use client"

import Link from "next/link"
import { Heart, Shuffle, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ImageUrls } from "@/lib/image-service"

interface CreatorSpotlightProps {
  creator: {
    id: string
    name: string
    handle: string
    avatar?: string
    bio: string
    verified: boolean
    followers: number
    totalGenerations: number
    featuredStyle: {
      id: string
      title: string
      image: string
      likes: number
      generations: number
      rating?: number
    }
  }
}

export function CreatorSpotlight({ creator }: CreatorSpotlightProps) {
  const {
    id,
    name,
    handle,
    avatar,
    bio,
    verified,
    followers,
    totalGenerations,
    featuredStyle,
  } = creator

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href={`/creator/${handle.slice(1)}`}
                  className="flex-shrink-0"
                >
                  <Avatar className="h-12 w-12 hover:ring-2 hover:ring-primary hover:ring-offset-1 transition-all">
                    <AvatarImage src={avatar || ImageUrls.creatorAvatar(handle.slice(1))} alt={name} />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg truncate">{name}</CardTitle>
              {verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{handle}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{bio}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Featured Style */}
        <Link href={`/style/${featuredStyle.id}`} className="block">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted group">
            <img
              src={featuredStyle.image || ImageUrls.styleImage(featuredStyle.title, "featured")}
              alt={featuredStyle.title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-3 left-3 right-3">
              <h4 className="font-medium text-white text-sm mb-1 drop-shadow-lg">
                {featuredStyle.title}
              </h4>
              <div className="flex items-center gap-3 text-white/90 text-xs">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3 fill-current" />
                  <span>{featuredStyle.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shuffle className="h-3 w-3" />
                  <span>{featuredStyle.generations.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Creator Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold">{followers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div>
            <div className="text-lg font-semibold">{totalGenerations.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Remixes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
