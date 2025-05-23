"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Heart, MoreHorizontal, RefreshCw, Share2, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"

interface GenerationHistoryProps {
  history: any[]
}

export function GenerationHistory({ history }: GenerationHistoryProps) {
  const [activeTab, setActiveTab] = useState("all")

  const handleRegenerate = (item: any) => {
    toast({
      title: "Remaking image",
      description: "Creating a new image with the same settings.",
    })
  }

  const handleDownload = (item: any) => {
    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    })
  }

  const handleShare = (item: any) => {
    toast({
      title: "Share options",
      description: "Sharing options will appear here.",
    })
  }

  const handleDelete = (item: any) => {
    toast({
      title: "Image deleted",
      description: "The image has been removed from your history.",
    })
  }

  const handleLike = (item: any) => {
    toast({
      title: "Image liked",
      description: "This image has been added to your favorites.",
    })
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No creations yet. Start creating!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {history.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={`Creation ${item.id}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <Heart className="h-4 w-4" onClick={() => handleLike(item)} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRegenerate(item)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Remake
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(item)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare(item)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {item.style.title}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.prompt}</p>
              <div className="flex items-center justify-between text-xs">
                <span>{item.aspectRatio}</span>
                <span>Seed: {item.settings.seed}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
