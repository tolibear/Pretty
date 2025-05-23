"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void
  currentImage?: string
  aspectRatio?: string
  className?: string
}

export function ImageUploader({
  onImageUploaded,
  currentImage,
  aspectRatio = "1:1",
  className = "",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setIsUploading(true)

    // In a real app, this would upload the file to a storage service
    // For this demo, we'll simulate an upload and return a placeholder URL
    setTimeout(() => {
      // Generate a random image URL for demo purposes
      const demoImages = [
        "/images/cyberpunk-neon.png",
        "/images/vintage-film.png",
        "/images/abstract-waves.png",
        "/images/pixel-art.png",
        "/images/watercolor.png",
        "/images/scifi-world.png",
        "/images/anime-portrait.png",
        "/images/minimal-lines.png",
        "/images/surreal-dream.png",
      ]
      const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)]

      onImageUploaded(randomImage)
      setIsUploading(false)
    }, 1500)
  }

  const handleRemove = () => {
    onImageUploaded("")
  }

  // Calculate aspect ratio for the container
  let aspectRatioClass = "aspect-square" // Default 1:1
  if (aspectRatio === "4:3") aspectRatioClass = "aspect-[4/3]"
  if (aspectRatio === "16:9") aspectRatioClass = "aspect-[16/9]"
  if (aspectRatio === "4:5") aspectRatioClass = "aspect-[4/5]"

  return (
    <div className={`${className}`}>
      {!currentImage ? (
        <Card
          className={`border-2 border-dashed ${
            isDragging ? "border-primary" : "border-border"
          } rounded-lg p-6 text-center ${aspectRatioClass} flex flex-col items-center justify-center cursor-pointer transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleFileInput} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            {isUploading ? (
              <p className="text-sm text-muted-foreground">Uploading...</p>
            ) : (
              <>
                <p className="text-sm font-medium">Drag and drop an image, or click to browse</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, or GIF up to 5MB</p>
              </>
            )}
          </div>
        </Card>
      ) : (
        <div className={`relative group ${aspectRatioClass}`}>
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Uploaded image"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  document.getElementById("image-upload")?.click()
                }}
              >
                Replace
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <input type="file" id="image-upload" accept="image/*" className="hidden" onChange={handleFileInput} />
        </div>
      )}
    </div>
  )
}
