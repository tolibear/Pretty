"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Users, Zap, Heart, Shuffle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ImageUrls } from "@/lib/image-service"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  // Reduced to 3 featured styles for "photos on table" effect
  const featuredStyles = [
    {
      id: 1,
      title: "Cyberpunk Neon",
      creator: "@neonartist",
      image: ImageUrls.styleImage('Cyberpunk Neon', 'cyberpunk'),
      alt: "Cyberpunk neon cityscape generated with Pretty",
      likes: 1243,
      remixes: 856
    },
    {
      id: 2,
      title: "Vintage Film",
      creator: "@retromaster", 
      image: ImageUrls.styleImage('Vintage Film', 'vintage'),
      alt: "Vintage film photography style generated with Pretty",
      likes: 2156,
      remixes: 1432
    },
    {
      id: 3,
      title: "Abstract Waves",
      creator: "@waveform",
      image: ImageUrls.styleImage('Abstract Waves', 'abstract'),
      alt: "Abstract wave art generated with Pretty",
      likes: 987,
      remixes: 623
    }
  ]

  // Create realistic "photos thrown on table" positioning
  const getCardTransform = (index: number, isHovered: boolean) => {
    // Predefined positions for realistic photo scatter
    const photoPositions = [
      // Bottom left photo - z-index 1 (lowest)
      { x: -100, y: 50, rotation: -8, scale: 1, zIndex: 1 },
      // Bottom right photo - z-index 2 (middle)
      { x: 80, y: 70, rotation: 12, scale: 1, zIndex: 2 },
      // Top overlapping photo - z-index 3 (highest)
      { x: -15, y: -40, rotation: -3, scale: 1, zIndex: 3 }
    ]
    
    const baseTransform = photoPositions[index]
    
    if (isHovered) {
      return {
        x: baseTransform.x,
        y: baseTransform.y - 10, // Slight lift
        rotation: baseTransform.rotation * 0.5, // Reduce rotation
        scale: 1.08, // Slight enlargement
        zIndex: baseTransform.zIndex // Keep the same z-index, no changes
      }
    }
    
    // Default state - always return to natural position with fixed z-index
    return baseTransform
  }

  const handleMouseEnter = (index: number) => {
    setHoveredCard(index)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-8 sm:py-12">
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Hero Text */}
          <div className="text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Image Generation
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              Generate{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                on-brand
              </span>{" "}
              AI images
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-lg xl:text-xl max-w-xl lg:max-w-none">
              Pretty makes it effortless to generate on-brand, professional AI images. Browse unique styles from verified creators and start creating in seconds.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-start justify-center">
              <Button size="lg" className="px-8" asChild>
                <Link href="/explore">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/creators">Become a Creator</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ Creators</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>1M+ Images Generated</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Photos on Table Effect */}
          <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center overflow-visible">
            <div className="relative w-full max-w-lg h-full">
              {featuredStyles.map((style, index) => {
                const isHovered = hoveredCard === index
                const transform = getCardTransform(index, isHovered)
                
                return (
                  <div
                    key={style.id}
                    className="absolute w-96 h-64 group cursor-pointer transition-all duration-500 ease-out hover:duration-300"
                    style={{
                      transform: `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotation}deg) scale(${transform.scale})`,
                      zIndex: transform.zIndex,
                      left: '50%',
                      top: '50%',
                      marginLeft: '-192px', // Half of w-96 (384px / 2)
                      marginTop: '-128px',  // Half of h-64 (256px / 2)
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl bg-white dark:bg-gray-900 border-2 border-white dark:border-gray-800 group-hover:shadow-2xl transition-shadow duration-300">
                      <Image
                        src={style.image}
                        alt={style.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                      
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300" />
                      
                      {/* Stats in top right corner - fade in on hover */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-white/90 text-xs bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                            <Heart className="h-3 w-3 fill-current" />
                            <span className="font-medium">{style.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-white/90 text-xs bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1">
                            <Shuffle className="h-3 w-3" />
                            <span className="font-medium">{style.remixes.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Text content that fades in on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                        <h3 className="text-lg font-semibold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 delay-75">
                          {style.title}
                        </h3>
                        <p className="text-sm text-white/90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 delay-100">
                          {style.creator}
                        </p>
                      </div>
                      
                      {/* Subtle hover glow */}
                      <div className="absolute inset-0 rounded-lg ring-0 group-hover:ring-2 group-hover:ring-primary/30 group-hover:ring-offset-2 group-hover:ring-offset-background transition-all duration-300" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Join Pretty today and start making on-brand, AI-powered images using styles from top creators.
          </p>
        </div>
      </div>
    </section>
  )
}
