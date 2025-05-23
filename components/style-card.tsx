import Link from "next/link"
import { Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StyleCardProps {
  style: {
    id: string
    title: string
    creator: string
    likes: number
    coverImage: string
  }
}

export function StyleCard({ style }: StyleCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <Link href={`/style/${style.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={style.coverImage || "/placeholder.svg"}
            alt={style.title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg truncate">{style.title}</h3>
            <p className="text-sm text-muted-foreground">{style.creator}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Like</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Heart className="h-3.5 w-3.5 mr-1 fill-current" />
          <span>{style.likes.toLocaleString()}</span>
        </div>
        <Button size="sm" variant="secondary" asChild>
          <Link href={`/style/${style.id}`}>Generate</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
