import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StylePreviewProps {
  title: string
  description: string
  coverImage: string
  examples: string[]
  tags: string[]
}

export function StylePreview({ title, description, coverImage, examples, tags }: StylePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        {coverImage ? (
          <img src={coverImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground">No cover image</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-lg">{title || "Untitled Style"}</h3>
        <p className="text-sm text-muted-foreground">@neonartist</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
        {tags.length === 0 && <span className="text-sm text-muted-foreground">No tags added</span>}
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3">{description || "No description provided."}</p>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Example Images</h4>
        <div className="grid grid-cols-3 gap-2">
          {examples.slice(0, 3).map((example, index) => (
            <div key={index} className="aspect-square rounded-md overflow-hidden bg-muted">
              <img
                src={example || "/placeholder.svg"}
                alt={`Example ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {Array.from({ length: Math.max(0, 3 - examples.length) }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="aspect-square rounded-md bg-muted flex items-center justify-center"
            >
              <span className="text-xs text-muted-foreground">No image</span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-3">
          <div className="flex justify-between items-center text-sm">
            <span>Base Multiplier</span>
            <span className="font-medium">2.0x</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
