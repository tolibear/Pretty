"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle } from "lucide-react"

export function GenerationProcess() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<"initializing" | "processing" | "finalizing">("initializing")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }

        const newProgress = prev + 2

        // Update stage based on progress
        if (newProgress < 20) {
          setStage("initializing")
        } else if (newProgress < 80) {
          setStage("processing")
        } else {
          setStage("finalizing")
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {progress < 100 ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
          Making Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded-md ${stage === "initializing" ? "bg-primary/10" : "bg-muted"}`}>
            <div className="text-xs font-medium mb-1">Initializing</div>
            <div className="text-xs text-muted-foreground">Setting up model</div>
          </div>
          <div className={`p-2 rounded-md ${stage === "processing" ? "bg-primary/10" : "bg-muted"}`}>
            <div className="text-xs font-medium mb-1">Processing</div>
            <div className="text-xs text-muted-foreground">Making image</div>
          </div>
          <div className={`p-2 rounded-md ${stage === "finalizing" ? "bg-primary/10" : "bg-muted"}`}>
            <div className="text-xs font-medium mb-1">Finalizing</div>
            <div className="text-xs text-muted-foreground">Applying style</div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {stage === "initializing" && "Preparing your request..."}
          {stage === "processing" && "Creating your image with AI..."}
          {stage === "finalizing" && "Applying final touches..."}
        </div>
      </CardContent>
    </Card>
  )
}
