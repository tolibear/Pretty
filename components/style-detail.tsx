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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { GenerateImageModal } from "@/components/generate-image-modal"

interface StyleDetailProps {
  style: any
}

export function StyleDetail({ style }: StyleDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % style.examples.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + style.examples.length) % style.examples.length)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left column - Image carousel */}
        <div className="lg:w-7/12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900">
            <img
              src={style.examples[currentImageIndex] || "/placeholder.svg"}
              alt={`${style.title} example ${currentImageIndex + 1}`}
              className="object-cover w-full h-full"
            />

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>

            {/* Image counter */}
            <div className="absolute bottom-3 right-3 bg-background/60 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
              {currentImageIndex + 1} / {style.examples.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {style.examples.map((example: string, index: number) => (
              <button
                key={index}
                className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                  currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={example || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right column - Style info */}
        <div className="lg:w-5/12 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{style.title}</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={toggleLike} className={isLiked ? "text-red-500" : ""}>
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={style.creator.avatar || "/placeholder.svg"} alt={style.creator.name} />
                <AvatarFallback>{style.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Link
                href={`/creator/${style.creator.handle.substring(1)}`}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {style.creator.handle}
                {style.creator.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
              </Link>
            </div>
          </div>

          <p className="text-muted-foreground">{style.description}</p>

          <div className="flex flex-wrap gap-2">
            {style.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{style.stats.likes.toLocaleString()} likes</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              <span>{style.stats.generations.toLocaleString()} creations</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Published {style.stats.published}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Input Requirements</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>
                  {style.inputRequirements.textPromptRequired ? "Text prompt required" : "Text prompt optional"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span>{style.inputRequirements.imageInputAllowed ? "Image input allowed" : "No image input"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Supported ratios:</span>
              {style.inputRequirements.supportedRatios.map((ratio: string) => (
                <Badge key={ratio} variant="outline" className="text-xs">
                  {ratio}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Pricing</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                <span>42% to creator</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {style.pricing.acceptedCoins.map((coin: string) => (
                <Card key={coin} className="overflow-hidden">
                  <CardContent className="p-3 text-center">
                    <div className="font-medium">{coin}</div>
                    <div className="text-sm text-muted-foreground">{style.pricing.estimatedPrice[coin]}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button className="w-full" size="lg" onClick={() => setIsGenerateModalOpen(true)}>
              Make Image
            </Button>

            <p className="text-xs text-muted-foreground text-center">You have 5 free creations remaining</p>
          </div>
        </div>
      </div>

      {/* Similar styles section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Styles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* This would be populated with similar styles in a real app */}
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={`/images/similar-style-${i}.png`}
                  alt={`Similar style ${i}`}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">Similar Style {i}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-muted-foreground">@creator{i}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Heart className="h-3.5 w-3.5 mr-1" />
                    <span>{(100 * i).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <GenerateImageModal isOpen={isGenerateModalOpen} onClose={() => setIsGenerateModalOpen(false)} style={style} />
    </div>
  )
}
