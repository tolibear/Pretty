"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageViewer } from "@/components/image-viewer"
import { ImageUrls } from "@/lib/image-service"

type GenerationStatus = "initializing" | "queued" | "making" | "completed" | "error"

interface GeneratorModalProps {
  isOpen: boolean
  onClose: () => void
  style: any
}

export function GeneratorModal({ isOpen, onClose, style }: GeneratorModalProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<GenerationStatus>("initializing")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [showImageViewer, setShowImageViewer] = useState(false)

  // Simulate the creation process
  useEffect(() => {
    if (!isOpen) return

    let interval: NodeJS.Timeout

    const simulateGeneration = () => {
      setStatus("initializing")
      setProgress(0)

      // Simulate wallet connection and transaction
      setTimeout(() => {
        setStatus("queued")
        setProgress(10)

        // Simulate queue processing
        setTimeout(() => {
          setStatus("making")

          // Simulate creation progress
          interval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 95) {
                clearInterval(interval)
                return 95
              }
              return prev + 5
            })
          }, 300)

          // Simulate completion
          setTimeout(() => {
            clearInterval(interval)
            setProgress(100)
            setStatus("completed")
            setGeneratedImage(ImageUrls.generationResult("cyberpunk cityscape", "cyberpunk", "1:1", "premium"))
          }, 5000)
        }, 1500)
      }, 1000)
    }

    simulateGeneration()

    return () => {
      clearInterval(interval)
    }
  }, [isOpen])

  const handleViewImage = () => {
    onClose()
    setShowImageViewer(true)
  }

  const getStatusMessage = () => {
    switch (status) {
      case "initializing":
        return "Connecting to wallet..."
      case "queued":
        return "Waiting in queue..."
      case "making":
        return "Making your image..."
      case "completed":
        return "Creation complete!"
      case "error":
        return "Error making image"
      default:
        return "Processing..."
    }
  }

  const getEstimatedTime = () => {
    switch (status) {
      case "queued":
        return "Estimated wait: ~30 seconds"
      case "making":
        return "Estimated time: ~15 seconds"
      default:
        return ""
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Making with {style.title}</DialogTitle>
          </DialogHeader>

          <div className="py-6 space-y-6">
            {status === "error" ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  There was an error making your image. Your payment has been refunded.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )}
                      <span className="font-medium">{getStatusMessage()}</span>
                    </div>
                    {(status === "initializing" || status === "queued" || status === "making") && (
                      <span className="text-sm text-muted-foreground">{getEstimatedTime()}</span>
                    )}
                  </div>

                  <Progress value={progress} className="h-2" />
                </div>

                {status === "completed" && generatedImage && (
                  <div className="mt-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
                      <img
                        src={generatedImage || ImageUrls.placeholder(400, 400, "Generated Image")}
                        alt="Made image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            {status === "queued" && (
              <Button variant="outline" onClick={onClose}>
                Cancel Creation
              </Button>
            )}

            {status === "error" && <Button onClick={onClose}>Try Again</Button>}

            {status === "completed" && <Button onClick={handleViewImage}>View Image</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {generatedImage && (
        <ImageViewer
          isOpen={showImageViewer}
          onClose={() => setShowImageViewer(false)}
          image={generatedImage}
          style={style}
        />
      )}
    </>
  )
}
