import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { ImageUrls } from "@/lib/image-service"

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={ImageUrls.creatorAvatar("alexrivera")} alt="Alex Rivera" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Alex Rivera</h1>
            <Badge variant="outline" className="ml-2 text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1 text-primary" />
              Verified Creator
            </Badge>
          </div>
          <p className="text-muted-foreground">@neonartist</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">View Public Profile</Button>
        <Button variant="outline">Settings</Button>
      </div>
    </div>
  )
}
