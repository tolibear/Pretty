/**
 * Image Service for Pretty.af
 * 
 * Provides automatic placeholder image generation using free APIs:
 * - Unsplash API for high-quality style images
 * - Lorem Picsum for general placeholder images
 * - DiceBear API for user avatars
 * - Placeholder.com for fallback images
 */

// Image categories and their corresponding Unsplash search terms
const STYLE_CATEGORIES = {
  cyberpunk: ['cyberpunk', 'neon', 'futuristic city', 'sci-fi'],
  vintage: ['vintage', 'retro', 'film photography', 'analog'],
  abstract: ['abstract art', 'fluid art', 'geometric', 'modern art'],
  pixel: ['pixel art', '8bit', 'retro gaming', 'digital art'],
  watercolor: ['watercolor painting', 'artistic', 'soft colors', 'painting'],
  nature: ['landscape', 'nature', 'mountains', 'forest'],
  portrait: ['portrait', 'face', 'character', 'person'],
  architecture: ['architecture', 'building', 'modern design', 'minimal'],
  fantasy: ['fantasy art', 'magical', 'ethereal', 'mystical'],
  anime: ['anime art', 'manga', 'japanese art', 'illustration'],
  minimal: ['minimalist', 'clean design', 'simple', 'geometric'],
  street: ['street art', 'graffiti', 'urban art', 'city'],
  scifi: ['science fiction', 'space', 'futuristic', 'technology'],
  geometric: ['geometric patterns', 'shapes', 'mathematical', 'design']
}

// Avatar styles for different user types
const AVATAR_STYLES = {
  creator: 'avataaars', // More detailed avatars for creators
  user: 'initials', // Simple initials for regular users
  verified: 'bottts', // Robot-style for verified users (fun touch)
  admin: 'personas' // Professional style for admins
}

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY' // Replace with actual key
const UNSPLASH_BASE_URL = 'https://api.unsplash.com'

// DiceBear API for avatars
const DICEBEAR_BASE_URL = 'https://api.dicebear.com/7.x'

// Lorem Picsum for general placeholders
const PICSUM_BASE_URL = 'https://picsum.photos'

/**
 * Generate a style cover image based on category and title
 */
export function generateStyleImage(
  styleTitle: string,
  category: string,
  width: number = 800,
  height: number = 600
): string {
  // Create a deterministic seed based on style title for consistency
  const seed = hashString(styleTitle)
  
  // Use Lorem Picsum with deterministic seeds for reliable images
  return `${PICSUM_BASE_URL}/${width}/${height}?random=${seed}`
}

/**
 * Generate example images for a style
 */
export function generateStyleExamples(
  styleTitle: string,
  category: string,
  count: number = 4,
  width: number = 600,
  height: number = 600
): string[] {
  const examples: string[] = []
  const seed = hashString(styleTitle)
  
  for (let i = 0; i < count; i++) {
    const exampleSeed = seed + i + 100 // Offset to get different images
    examples.push(`${PICSUM_BASE_URL}/${width}/${height}?random=${exampleSeed}`)
  }
  
  return examples
}

/**
 * Generate user avatar based on username and user type
 */
export function generateUserAvatar(
  username: string,
  userType: 'creator' | 'user' | 'verified' | 'admin' = 'user',
  size: number = 200
): string {
  const style = AVATAR_STYLES[userType]
  const seed = encodeURIComponent(username)
  
  return `${DICEBEAR_BASE_URL}/${style}/svg?seed=${seed}&size=${size}&backgroundColor=6366f1,8b5cf6,06b6d4,10b981,f59e0b`
}

/**
 * Generate collection cover image
 */
export function generateCollectionImage(
  collectionName: string,
  width: number = 400,
  height: number = 300
): string {
  const seed = hashString(collectionName)
  return `${PICSUM_BASE_URL}/${width}/${height}?random=${seed + 1000}&grayscale`
}

/**
 * Generate generation result image (for completed generations)
 */
export function generateGenerationImage(
  prompt: string,
  styleCategory: string,
  aspectRatio: string = '1:1',
  quality: 'standard' | 'premium' = 'standard'
): string {
  const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number)
  const baseSize = quality === 'premium' ? 800 : 600
  const width = Math.round(baseSize * (widthRatio / Math.max(widthRatio, heightRatio)))
  const height = Math.round(baseSize * (heightRatio / Math.max(widthRatio, heightRatio)))
  
  const seed = hashString(prompt + styleCategory)
  return `${PICSUM_BASE_URL}/${width}/${height}?random=${seed + 2000}`
}

/**
 * Generate category banner image
 */
export function generateCategoryImage(
  categoryName: string,
  width: number = 1200,
  height: number = 400
): string {
  const seed = hashString(categoryName)
  return `${PICSUM_BASE_URL}/${width}/${height}?random=${seed + 3000}`
}

/**
 * Get a fallback placeholder image
 */
export function getFallbackImage(
  width: number = 400,
  height: number = 300,
  text?: string
): string {
  const bgColor = '6366f1' // Pretty.af primary color
  const textColor = 'ffffff'
  const displayText = text || `${width}×${height}`
  
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(displayText)}`
}

/**
 * Generate a deterministic hash from a string (simple implementation)
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Image URL helpers for different content types
 */
export const ImageUrls = {
  // Style-related images
  styleImage: (title: string, category: string) => generateStyleImage(title, category),
  styleExamples: (title: string, category: string, count?: number) => generateStyleExamples(title, category, count),
  
  // User-related images
  userAvatar: (username: string, type?: 'creator' | 'user' | 'verified' | 'admin') => generateUserAvatar(username, type),
  creatorAvatar: (username: string) => generateUserAvatar(username, 'creator'),
  
  // Collection and generation images
  collectionCover: (name: string) => generateCollectionImage(name),
  generationResult: (prompt: string, category: string, ratio?: string, quality?: 'standard' | 'premium') => 
    generateGenerationImage(prompt, category, ratio, quality),
  
  // Category and general images
  categoryBanner: (name: string) => generateCategoryImage(name),
  placeholder: (width?: number, height?: number, text?: string) => getFallbackImage(width, height, text)
}

/**
 * Preload critical images for better performance
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map(url => 
      new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
        img.src = url
      })
    )
  )
}

/**
 * Image optimization utilities
 */
export const ImageUtils = {
  // Get responsive image URLs for different screen sizes
  getResponsiveUrls: (baseUrl: string, sizes: number[] = [400, 800, 1200]) => {
    return sizes.map(size => ({
      size,
      url: baseUrl.includes('picsum.photos') 
        ? baseUrl.replace(/\/\d+\/\d+/, `/${size}/${Math.round(size * 0.75)}`)
        : baseUrl
    }))
  },
  
  // Get optimized URL for specific use case
  optimize: (url: string, options: { width?: number, height?: number, quality?: number } = {}) => {
    if (url.includes('picsum.photos')) {
      const { width = 800, height = 600 } = options
      return url.replace(/\/\d+\/\d+/, `/${width}/${height}`)
    }
    return url
  }
}

// Export default image service
export default {
  ImageUrls,
  ImageUtils,
  generateStyleImage,
  generateUserAvatar,
  generateCollectionImage,
  generateGenerationImage,
  preloadImages
} 