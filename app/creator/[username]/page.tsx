import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StyleCard } from "@/components/style-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle2, Users, Heart, Shuffle, Calendar, MapPin, Link as LinkIcon } from "lucide-react"
import { MockData } from "@/lib/mock-data"
import { DataAdapters } from "@/lib/data-adapters"
import Link from "next/link"

interface CreatorPageProps {
  params: {
    username: string
  }
}

export default function CreatorPage({ params }: CreatorPageProps) {
  // Find creator by username
  const creator = MockData.users.creators.find(c => 
    c.username === params.username || c.handle === `@${params.username}`
  )

  if (!creator) {
    notFound()
  }

  // Get creator's styles
  const allStyles = [
    ...MockData.styles.trending,
    ...MockData.styles.featured,
    ...MockData.styles.free
  ]
  
  const creatorStyles = allStyles.filter(style => style.creator.id === creator.id)
  const stylesForCards = creatorStyles.map(style => ({
    id: style.id,
    title: style.title,
    creator: style.creator.handle,
    likes: style.totalLikes,
    coverImage: style.coverImageUrl,
    price: style.pricePerGeneration,
    isFree: style.isFree,
    isTrending: style.isTrending,
    isFeatured: style.isFeatured,
    generations: style.totalGenerations,
    creatorAvatar: style.creator.avatarUrl,
    isVerified: style.creator.isVerified
  }))

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container max-w-6xl py-8">
          {/* Creator Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={creator.avatarUrl} alt={creator.displayName} />
                <AvatarFallback className="text-2xl">
                  {creator.displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{creator.displayName}</h1>
                    {creator.isVerified && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Verified Creator
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground">{creator.handle}</p>
                  <p className="text-muted-foreground mt-2">{creator.bio}</p>
                </div>

                {/* Creator Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{creator.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{creator.totalStyles}</div>
                    <div className="text-sm text-muted-foreground">Styles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{creator.totalGenerations.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Remixes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{creator.rating}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {creator.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Creator Content */}
          <Tabs defaultValue="styles" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="styles">Styles ({creatorStyles.length})</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="styles" className="space-y-6">
              {creatorStyles.length === 0 ? (
                <div className="text-center py-12">
                  <Shuffle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No styles yet</h3>
                  <p className="text-muted-foreground">
                    This creator hasn't published any styles yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stylesForCards.map((style) => (
                    <StyleCard key={style.id} style={style} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {creator.displayName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-muted-foreground">{creator.bio}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {creator.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Joined</h4>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(creator.joinedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Achievements</h4>
                    <div className="space-y-2">
                      {creator.isVerified && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">Verified Creator</span>
                        </div>
                      )}
                      {creator.totalEarnings > 10000 && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="h-4 w-4 p-0">💎</Badge>
                          <span className="text-sm">Top Earner</span>
                        </div>
                      )}
                      {creator.rating >= 4.8 && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="h-4 w-4 p-0">⭐</Badge>
                          <span className="text-sm">Highly Rated</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shuffle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Published a new style</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Heart className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Reached 1000+ total likes</p>
                        <p className="text-xs text-muted-foreground">1 week ago</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Gained 100 new followers</p>
                        <p className="text-xs text-muted-foreground">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export async function generateMetadata({ params }: CreatorPageProps) {
  const creator = MockData.users.creators.find(c => 
    c.username === params.username || c.handle === `@${params.username}`
  )

  if (!creator) {
    return {
      title: 'Creator Not Found - Pretty.af',
    }
  }

  return {
    title: `${creator.displayName} (@${creator.username}) - Pretty.af`,
    description: creator.bio,
  }
} 