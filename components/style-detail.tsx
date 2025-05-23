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
  Play,
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
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(style.stats.likes)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % style.examples.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + style.examples.length) % style.examples.length)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev: number) => isLiked ? prev - 1 : prev + 1)
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites")
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: style.title,
        text: style.description,
        url: window.location.href,
      })
    } catch (err) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt)
    toast.success("Prompt copied to clipboard")
  }

  return (
    <div className="container py-6 md:py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-foreground">Explore</Link>
        <span>/</span>
        <span className="text-foreground">{style.title}</span>
      </nav>

      <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
        {/* Left column - Image carousel and details */}
        <div className="xl:w-2/3">
          {/* Main image carousel */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-lg">
            <img
              src={style.examples[currentImageIndex] || ImageUrls.placeholder(800, 600, style.title)}
              alt={`${style.title} example ${currentImageIndex + 1}`}
              className="object-cover w-full h-full"
            />

            {/* Navigation arrows */}
            {style.examples.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous image</span>
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}

            {/* Image counter and quality badge */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Badge className="bg-background/90 text-foreground border-0">
                {currentImageIndex + 1} / {style.examples.length}
              </Badge>
              <Badge className="bg-primary/90 text-primary-foreground border-0">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium Quality
              </Badge>
            </div>

            {/* Quick actions overlay */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share style</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className={`bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg ${
                  isLiked ? "text-red-500" : ""
                }`}
                onClick={toggleLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="sr-only">Like style</span>
              </Button>
            </div>
          </div>

          {/* Thumbnail strip */}
          {style.examples.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {style.examples.map((example: string, index: number) => (
                <button
                  key={index}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    currentImageIndex === index 
                      ? "ring-2 ring-primary shadow-lg" 
                      : "opacity-70 hover:opacity-100 hover:scale-105"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={example || ImageUrls.placeholder(80, 80, `${style.title} thumbnail`)}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Style Information Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Input Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          style.inputRequirements.textPromptRequired 
                            ? "bg-green-100 text-green-600" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          <MessageSquare className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Text Prompt</p>
                          <p className="text-xs text-muted-foreground">
                            {style.inputRequirements.textPromptRequired ? "Required" : "Optional"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          style.inputRequirements.imageInputAllowed 
                            ? "bg-blue-100 text-blue-600" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          <ImageIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Reference Image</p>
                          <p className="text-xs text-muted-foreground">
                            {style.inputRequirements.imageInputAllowed ? "Supported" : "Not supported"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Supported Aspect Ratios</p>
                      <div className="flex flex-wrap gap-2">
                        {style.inputRequirements.supportedRatios.map((ratio: string) => (
                          <Badge key={ratio} variant="outline" className="text-xs">
                            {ratio}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Style Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
                        <p className="text-xs font-medium">Verified</p>
                        <p className="text-xs text-muted-foreground">Quality assured</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                        <p className="text-xs font-medium">Fast</p>
                        <p className="text-xs text-muted-foreground">~30 seconds</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Award className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                        <p className="text-xs font-medium">Premium</p>
                        <p className="text-xs text-muted-foreground">High resolution</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <p className="text-xs font-medium">Popular</p>
                        <p className="text-xs text-muted-foreground">5k+ uses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockExamplePrompts.map((example, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={example.image}
                          alt={example.prompt}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm mb-3 line-clamp-2">{example.prompt}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary" className="text-xs">
                            {example.ratio}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyPrompt(example.prompt)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6 mt-6">
                <div className="space-y-4">
                  {mockReviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-sm">{review.name}</p>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right column - Style info and actions */}
        <div className="xl:w-1/3 space-y-6">
          {/* Style header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{style.title}</h1>
            
            {/* Creator info */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={style.creator.avatar || ImageUrls.creatorAvatar(style.creator.handle.slice(1))} alt={style.creator.name} />
                <AvatarFallback>{style.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Link
                  href={`/creator/${style.creator.handle.substring(1)}`}
                  className="font-medium hover:text-primary transition-colors flex items-center gap-1"
                >
                  {style.creator.name}
                  {style.creator.verified && <CheckCircle2 className="h-4 w-4 text-primary" />}
                </Link>
                <p className="text-sm text-muted-foreground">{style.creator.handle}</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/creator/${style.creator.handle.substring(1)}`}>
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Profile
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground leading-relaxed">{style.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {style.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{likesCount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                    <Play className="h-4 w-4" />
                    <span className="font-semibold">{style.stats.generations.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Generations</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">4.8</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
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
                <Play className="h-4 w-4 mr-2" />
                Generate Image
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Published {style.stats.published} • Last updated 3 days ago
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Creator's other styles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">More from {style.creator.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCreatorStyles.map((otherStyle, index) => (
                <Link
                  key={index}
                  href={`/style/${otherStyle.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={otherStyle.image}
                      alt={otherStyle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{otherStyle.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{otherStyle.likes} likes</span>
                      <span>•</span>
                      <span>{otherStyle.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
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

// Mock data for enhanced features
const mockExamplePrompts = [
  {
    prompt: "A futuristic cityscape at night with neon lights reflecting on wet streets",
    image: "/images/cyberpunk-example-1.png",
    ratio: "16:9"
  },
  {
    prompt: "Cyberpunk character with glowing implants in a dark alley",
    image: "/images/cyberpunk-example-2.png",
    ratio: "4:5"
  },
  {
    prompt: "Neon-lit motorcycle speeding through a tunnel",
    image: "/images/cyberpunk-example-3.png",
    ratio: "1:1"
  },
  {
    prompt: "High-tech laboratory with holographic displays",
    image: "/images/cyberpunk-example-4.png",
    ratio: "16:9"
  }
]

const mockReviews = [
  {
    name: "Sarah Chen",
    avatar: "/images/user-1.png",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing style! The neon effects are exactly what I was looking for. Generated 10+ images and they all turned out fantastic."
  },
  {
    name: "Mike Rodriguez",
    avatar: "/images/user-2.png",
    rating: 5,
    date: "1 week ago",
    comment: "Perfect for my cyberpunk project. The quality is consistently high and the style captures that retro-futuristic vibe perfectly."
  },
  {
    name: "Emma Thompson",
    avatar: "/images/user-3.png",
    rating: 4,
    date: "2 weeks ago",
    comment: "Great style overall. Sometimes the neon effects can be a bit overwhelming, but adjusting the prompt helps. Definitely recommend!"
  }
]

const mockCreatorStyles = [
  {
    id: "2",
    title: "Retro Synthwave",
    image: "/images/synthwave.png",
    likes: "892",
    price: "0.008 ETH"
  },
  {
    id: "3",
    title: "Neon Portraits",
    image: "/images/neon-portrait.png",
    likes: "654",
    price: "0.012 ETH"
  },
  {
    id: "4",
    title: "Cyber Architecture",
    image: "/images/cyber-arch.png",
    likes: "543",
    price: "0.015 ETH"
  }
]
