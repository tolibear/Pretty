import { useState, useEffect } from "react"

// Function to detect if an image is light or dark
const getImageBrightness = (imageSrc: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Set a timeout to prevent hanging
    const timeout = setTimeout(() => {
      resolve(false) // Default to dark after 2 seconds
    }, 2000)

    const img = new Image()
    // Don't set crossOrigin for external images to avoid CORS issues
    if (imageSrc.startsWith('/') || imageSrc.includes(window.location.hostname)) {
      img.crossOrigin = "anonymous"
    }
    
    img.onload = () => {
      clearTimeout(timeout)
      
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        resolve(false) // Default to dark if can't analyze
        return
      }
      
      // Use smaller canvas for performance
      const maxSize = 100
      const scale = Math.min(maxSize / img.width, maxSize / img.height)
      canvas.width = img.width * scale
      canvas.height = img.height * scale
      
      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        let brightness = 0
        let pixelCount = 0
        
        // Sample pixels more efficiently
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const alpha = data[i + 3]
          
          // Skip transparent pixels
          if (alpha > 0) {
            brightness += (r * 0.299 + g * 0.587 + b * 0.114)
            pixelCount++
          }
        }
        
        if (pixelCount === 0) {
          resolve(false) // Default to dark if no opaque pixels
          return
        }
        
        const avgBrightness = brightness / pixelCount
        resolve(avgBrightness > 128) // True if light, false if dark
      } catch (error) {
        console.warn('Image brightness detection failed:', error)
        resolve(false) // Default to dark if error
      }
    }
    
    img.onerror = () => {
      clearTimeout(timeout)
      resolve(false) // Default to dark if image fails to load
    }
    
    img.src = imageSrc
  })
}

/**
 * Hook to detect if an image is light or dark for dynamic blend mode selection
 * @param imageSrc - The image source URL
 * @returns Object with isLightImage state and dynamic blend mode classes
 */
export function useImageBrightness(imageSrc: string) {
  const [isLightImage, setIsLightImage] = useState<boolean | null>(null)

  useEffect(() => {
    if (!imageSrc) return
    
    // Start with null, then update when detection completes
    setIsLightImage(null)
    
    getImageBrightness(imageSrc)
      .then(setIsLightImage)
      .catch(() => setIsLightImage(false)) // Fallback to dark on any error
  }, [imageSrc])

  // Dynamic blend mode based on image brightness
  // Use screen mode as default while detecting, then switch based on result
  const blendMode = isLightImage === null 
    ? 'mix-blend-screen' // Default while loading
    : isLightImage 
      ? 'mix-blend-multiply' 
      : 'mix-blend-screen'

  const badgeClasses = `bg-black/50 backdrop-blur-lg text-white pointer-events-none`
  const buttonClasses = `bg-white/20 backdrop-blur-md hover:bg-white/30 border-white/30 shadow-sm ${blendMode}`

  return {
    isLightImage,
    blendMode,
    badgeClasses,
    buttonClasses
  }
} 