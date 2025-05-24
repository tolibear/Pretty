"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Heart,
  Share2,
  Clock,
  ImageIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Star,
  TrendingUp,
  Download,
  Copy,
  ExternalLink,
  Shuffle,
  Users,
  Zap,
  Shield,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { GenerateImageModal } from "@/components/generate-image-modal"
import { toast } from "sonner"
import { ImageUrls } from "@/lib/image-service"

interface StyleDetailProps {
  style: any
}

export function StyleDetail({ style }: StyleDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(style.stats.likes)
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev: number) => isLiked ? prev - 1 : prev + 1)
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === style.exampleImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? style.exampleImages.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/explore" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Back to Explore
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                variant={isLiked ? "default" : "outline"} 
                size="sm" 
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={style.exampleImages[currentImageIndex] || ImageUrls.placeholder(800, 600, `${style.title} Example ${currentImageIndex + 1}`)}
                    alt={`${style.title} example ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Navigation */}
                  {style.exampleImages.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 border-0"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4 text-white" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80 border-0"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4 text-white" />
                      </Button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                      {currentImageIndex + 1} / {style.exampleImages.length}
                    </div>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {style.exampleImages.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {style.exampleImages.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                            index === currentImageIndex ? 'border-primary' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image || ImageUrls.placeholder(64, 64, `Thumb ${index + 1}`)}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Style Information */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="creator">Creator</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-2xl">{style.title}</CardTitle>
                          {style.isVerified && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{style.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Creator Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={style.creator.avatar || ImageUrls.creatorAvatar(style.creator.handle)} alt={style.creator.displayName} />
                        <AvatarFallback>{style.creator.displayName.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{style.creator.displayName}</p>
                          {style.creator.isVerified && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{style.creator.handle}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {style.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Example Prompts */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Example Prompts</h4>
                      <div className="space-y-2">
                        {style.examplePrompts.map((prompt: string, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <p className="text-sm flex-1">{prompt}</p>
                            <Button variant="ghost" size="sm" onClick={() => {
                              navigator.clipboard.writeText(prompt)
                              toast.success("Prompt copied to clipboard")
                            }}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples">
                <Card>
                  <CardHeader>
                    <CardTitle>Example Generations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {style.exampleImages.map((image: string, index: number) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                          <img
                            src={image || ImageUrls.placeholder(300, 300, `Example ${index + 1}`)}
                            alt={`Example ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold">{likesCount.toLocaleString()}</div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Total likes from the community</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Sample reviews */}
                        <div className="border-b pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">JD</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">John Doe</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Amazing style! The results are consistently high quality and the prompts work perfectly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="creator">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Creator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={style.creator.avatar || ImageUrls.creatorAvatar(style.creator.handle)} alt={style.creator.displayName} />
                        <AvatarFallback className="text-lg">{style.creator.displayName.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold">{style.creator.displayName}</h3>
                          {style.creator.isVerified && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-muted-foreground">{style.creator.handle}</p>
                        <p className="text-sm text-muted-foreground mt-2">{style.creator.bio}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{style.creator.stats.totalStyles}</div>
                        <div className="text-sm text-muted-foreground">Styles</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{style.creator.stats.totalGenerations.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Generations</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{style.creator.stats.followers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Follow Creator
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground/60 mb-1">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="font-semibold">{likesCount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground/60 mb-1">
                      <Shuffle className="h-4 w-4" />
                      <span className="font-semibold">{style.stats.generations.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Remixes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground/60 mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">+15%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pricing</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>42% to creator</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {style.pricing.acceptedCoins.map((coin: string) => (
                    <div key={coin} className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium text-sm">{coin}</div>
                      <div className="text-xs text-muted-foreground">{style.pricing.estimatedPrice[coin]}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm">
                    <Zap className="h-4 w-4" />
                    <span className="font-medium">5 free generations remaining</span>
                  </div>
                  <Progress value={50} className="mt-2 h-2" />
                  <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                    Use your free generations before connecting a wallet
                  </p>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={() => setIsGenerateModalOpen(true)}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Remix Style
                </Button>
              </CardContent>
            </Card>

            {/* Creator's Other Styles */}
            <Card>
              <CardHeader>
                <CardTitle>More from {style.creator.displayName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {style.creator.otherStyles.map((otherStyle: any) => (
                  <Link key={otherStyle.id} href={`/style/${otherStyle.id}`} className="block">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={otherStyle.coverImage || ImageUrls.placeholder(48, 48, otherStyle.title)}
                          alt={otherStyle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{otherStyle.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{otherStyle.generations} remixes</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <GenerateImageModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        style={style}
      />
    </div>
  )
}
