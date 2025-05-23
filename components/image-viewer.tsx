"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Share2, Heart, Copy, Twitter, MessageCircle, RotateCw, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface ImageViewerProps {
  isOpen: boolean
  onClose: () => void
  image: string
  style: any
}

export function ImageViewer({ isOpen, onClose, image, style }: ImageViewerProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleDownload = () => {
    // In a real app, this would download the image
    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    })
  }

  const handleCopyLink = () => {
    // In a real app, this would copy a link to the clipboard
    toast({
      title: "Link copied",
      description: "Image link copied to clipboard.",
    })
  }

  const handleShare = (platform: string) => {
    // In a real app, this would share to the selected platform
    toast({
      title: `Sharing to ${platform}`,
      description: "Opening share dialog...",
    })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      toast({
        title: "Image upvoted",
        description: "You've upvoted this image.",
      })
    }
  }

  const handleRegenerate = () => {
    toast({
      title: "Making new image",
      description: "Creating a new image with the same prompt.",
    })
  }

  const handleVariation = () => {
    toast({
      title: "Creating variation",
      description: "Creating a variation of this image.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Made with {style.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 py-4">
          <div className="lg:col-span-3">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
              <img src={image || "/placeholder.svg"} alt="Made image" className="object-cover w-full h-full" />
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleLike} className={isLiked ? "text-red-500" : ""}>
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Upvoted" : "Upvote"}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleCopyLink()}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("Twitter")}>
                      <Twitter className="h-4 w-4 mr-2" />
                      Share to X
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("Farcaster")}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Share to Farcaster
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Style</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={style.creator.avatar || "/placeholder.svg"} alt={style.creator.name} />
                  <AvatarFallback>{style.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <span className="font-medium">{style.title}</span> by {style.creator.handle}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Prompt</h3>
              <p className="text-sm text-muted-foreground">A futuristic cityscape with neon lights and flying cars</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {style.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Settings</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Aspect Ratio</div>
                <div>1:1</div>
                <div className="text-muted-foreground">Model</div>
                <div>GPT-4o</div>
                <div className="text-muted-foreground">Seed</div>
                <div>1234567890</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-medium">Try Again</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleRegenerate}>
                  <RotateCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" onClick={handleVariation}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Variation
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-medium">Similar Styles</h3>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((i) => (
                  <Card key={i} className="overflow-hidden cursor-pointer hover:bg-secondary/50 transition-colors">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`/images/similar-style-${i}.png`}
                        alt={`Similar style ${i}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-2">
                      <div className="text-xs font-medium truncate">Similar Style {i}</div>
                      <div className="text-xs text-muted-foreground truncate">@creator{i}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          <Button onClick={() => (window.location.href = "/explore")}>Explore More Styles</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
