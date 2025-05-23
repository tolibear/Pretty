import type { Metadata } from "next"
import { ExploreLayout } from "@/components/explore-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { ImageUrls } from "@/lib/image-service"

export const metadata: Metadata = {
  title: "New Arrivals - Pretty.af",
  description: "Discover the latest AI image styles from creators",
}

export default function NewArrivalsPage() {
  return (
    <ExploreLayout
      title="New Arrivals"
      description="The latest AI image styles added to the platform"
      activeTab="new"
      styles={newStyles}
    >
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Just Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newStyles.slice(0, 2).map((style) => (
            <Card key={style.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 aspect-square md:aspect-auto">
                  <img
                    src={style.coverImage || ImageUrls.placeholder(400, 400, style.title)}
                    alt={style.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{style.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      New
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{style.creator}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Added {style.addedTime}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ExploreLayout>
  )
}

// Sample data
const newStyles = [
  {
    id: "10",
    title: "Dreamy Pastels",
    creator: "@pastelartist",
    likes: 124,
    coverImage: ImageUrls.styleImage("Dreamy Pastels", "watercolor"),
    addedTime: "2 hours ago",
  },
  {
    id: "11",
    title: "Geometric Patterns",
    creator: "@geometrymaster",
    likes: 98,
    coverImage: ImageUrls.styleImage("Geometric Patterns", "geometric"),
    addedTime: "5 hours ago",
  },
  {
    id: "7",
    title: "Anime Portraits",
    creator: "@animefan",
    likes: 432,
    coverImage: ImageUrls.styleImage("Anime Portraits", "anime"),
    addedTime: "1 day ago",
  },
  {
    id: "12",
    title: "Charcoal Sketches",
    creator: "@sketchartist",
    likes: 76,
    coverImage: ImageUrls.styleImage("Charcoal Sketches", "portrait"),
    addedTime: "1 day ago",
  },
  {
    id: "13",
    title: "Glitch Art",
    creator: "@glitchmaster",
    likes: 210,
    coverImage: ImageUrls.styleImage("Glitch Art", "cyberpunk"),
    addedTime: "2 days ago",
  },
  {
    id: "8",
    title: "Minimal Lines",
    creator: "@minimalist",
    likes: 321,
    coverImage: ImageUrls.styleImage("Minimal Lines", "minimal"),
    addedTime: "2 days ago",
  },
  {
    id: "14",
    title: "Retro Gaming",
    creator: "@retrogamer",
    likes: 187,
    coverImage: ImageUrls.styleImage("Retro Gaming", "pixel"),
    addedTime: "3 days ago",
  },
  {
    id: "15",
    title: "Cinematic Frames",
    creator: "@filmmaker",
    likes: 243,
    coverImage: ImageUrls.styleImage("Cinematic Frames", "vintage"),
    addedTime: "3 days ago",
  },
  {
    id: "9",
    title: "Surreal Dreams",
    creator: "@surrealartist",
    likes: 543,
    coverImage: ImageUrls.styleImage("Surreal Dreams", "fantasy"),
    addedTime: "4 days ago",
  },
]
