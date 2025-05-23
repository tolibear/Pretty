import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <h2 className="text-lg font-semibold mb-2">Loading Pretty.af</h2>
          <p className="text-sm text-muted-foreground text-center">
            Please wait while we load your content...
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 