import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface CreatorSpotlightProps {
  creator: {
    id: string
    name: string
    handle: string
    avatar: string
    earnings: string
    styles: number
  }
}

export function CreatorSpotlight({ creator }: CreatorSpotlightProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{creator.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{creator.handle}</p>
          <div className="flex gap-4 text-sm text-muted-foreground mb-4">
            <div>
              <span className="font-medium text-foreground">{creator.styles}</span> styles
            </div>
            <div>
              <span className="font-medium text-foreground">{creator.earnings}</span> earned
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/creator/${creator.id}`}>View Profile</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
