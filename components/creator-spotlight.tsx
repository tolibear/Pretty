import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Users, Palette } from "lucide-react"
import { ImageUrls } from "@/lib/image-service"

interface CreatorSpotlightProps {
  creator: {
    id: string
    name: string
    handle: string
    avatar: string
    earnings: string
    styles: number
    isVerified?: boolean
    followers?: number
    rating?: number
    specialties?: string[]
    isTopCreator?: boolean
    monthlyGrowth?: number
  }
}

export function CreatorSpotlight({ creator }: CreatorSpotlightProps) {
  const {
    id,
    name,
    handle,
    avatar,
    earnings,
    styles,
    isVerified = false,
    followers = 1250,
    rating = 4.9,
    specialties = ["Digital Art", "Photography"],
    isTopCreator = false,
    monthlyGrowth = 15
  } = creator

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar and Verification */}
          <div className="relative">
            <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
              <AvatarImage src={avatar || ImageUrls.creatorAvatar(handle.slice(1))} alt={name} />
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary to-purple-600 text-white">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {/* Verification Badge */}
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5 shadow-lg">
                <svg className="h-3 w-3 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* Creator Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              {isTopCreator && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                  ⭐ Top Creator
                </Badge>
              )}
            </div>
            
            <Link 
              href={`/creator/${handle.slice(1)}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {handle}
            </Link>

            {/* Specialties */}
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {specialties.slice(0, 2).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full text-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Palette className="h-3.5 w-3.5" />
                <span>Styles</span>
              </div>
              <div className="font-semibold text-foreground">{styles}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span>Followers</span>
              </div>
              <div className="font-semibold text-foreground">{followers.toLocaleString()}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
                <span>Rating</span>
              </div>
              <div className="font-semibold text-foreground">{rating}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                <span>Growth</span>
              </div>
              <div className="font-semibold text-foreground">+{monthlyGrowth}%</div>
            </div>
          </div>

          {/* Earnings */}
          <div className="text-center p-3 bg-muted/50 rounded-lg w-full">
            <div className="text-xs text-muted-foreground mb-1">Total Earned</div>
            <div className="font-bold text-lg text-primary">{earnings}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/creator/${handle.slice(1)}`}>
                View Profile
              </Link>
            </Button>
            <Button size="sm" className="flex-1" asChild>
              <Link href={`/creator/${handle.slice(1)}/styles`}>
                Browse Styles
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
