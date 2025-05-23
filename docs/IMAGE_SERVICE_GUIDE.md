# Image Service Guide for Pretty.af

## Overview

The Pretty.af image service provides automatic placeholder image generation using free APIs to replace all static placeholder images with realistic, contextually appropriate images. This system ensures consistent, high-quality visuals throughout the application during development.

## Features

- **Automatic Image Generation**: Uses free APIs to generate contextually appropriate images
- **Deterministic Results**: Same input always generates the same image for consistency
- **Category-Aware**: Generates images based on style categories (cyberpunk, vintage, etc.)
- **User Avatar Generation**: Creates unique avatars based on usernames and user types
- **Responsive Images**: Supports different sizes and aspect ratios
- **Fallback Support**: Graceful degradation when APIs are unavailable

## APIs Used

### 1. Lorem Picsum (Primary for Development)
- **URL**: `https://picsum.photos`
- **Usage**: General placeholder images with deterministic seeds
- **Benefits**: No API key required, fast, reliable
- **Example**: `https://picsum.photos/800/600?random=12345`

### 2. DiceBear (User Avatars)
- **URL**: `https://api.dicebear.com/7.x`
- **Usage**: Generated user avatars based on usernames
- **Benefits**: Consistent, unique avatars for each user
- **Example**: `https://api.dicebear.com/7.x/avataaars/svg?seed=username`

### 3. Unsplash (Production Ready)
- **URL**: `https://api.unsplash.com`
- **Usage**: High-quality, category-specific images
- **Benefits**: Professional quality, searchable by keywords
- **Note**: Requires API key for production use

### 4. Placeholder.com (Fallback)
- **URL**: `https://via.placeholder.com`
- **Usage**: Simple colored placeholders with text
- **Benefits**: Always available, customizable colors

## Implementation

### Core Service (`lib/image-service.ts`)

```typescript
import { ImageUrls } from '@/lib/image-service'

// Generate style cover image
const styleImage = ImageUrls.styleImage('Cyberpunk Neon', 'cyberpunk')

// Generate user avatar
const userAvatar = ImageUrls.userAvatar('username', 'creator')

// Generate collection cover
const collectionCover = ImageUrls.collectionCover('My Collection')
```

### Mock Data Integration (`lib/mock-data.ts`)

The mock data automatically uses the image service:

```typescript
export const mockStyles = {
  trending: [
    {
      title: 'Cyberpunk Neon Dreams',
      category: 'Cyberpunk',
      coverImageUrl: ImageUrls.styleImage('Cyberpunk Neon Dreams', 'cyberpunk'),
      exampleImages: ImageUrls.styleExamples('Cyberpunk Neon Dreams', 'cyberpunk', 6),
      creator: {
        avatarUrl: ImageUrls.creatorAvatar('neonartist')
      }
    }
  ]
}
```

### Data Adapters (`lib/data-adapters.ts`)

Transforms comprehensive mock data into component-compatible formats:

```typescript
import { DataAdapters } from '@/lib/data-adapters'

// Get styles formatted for StyleCard components
const trendingStyles = DataAdapters.trendingStylesForCards()

// Get creators formatted for CreatorSpotlight components
const topCreators = DataAdapters.topCreatorsForSpotlight()
```

## Image Categories

### Style Categories
- **Cyberpunk**: Neon-lit cityscapes, futuristic themes
- **Vintage**: Retro photography, film aesthetics
- **Abstract**: Fluid art, geometric patterns
- **Pixel**: 8-bit gaming, retro digital art
- **Watercolor**: Soft paintings, artistic expressions
- **Nature**: Landscapes, natural scenery
- **Portrait**: Character art, face photography
- **Architecture**: Buildings, modern design
- **Fantasy**: Magical themes, ethereal art
- **Anime**: Japanese art style, manga-inspired

### Avatar Types
- **Creator**: Detailed avatars for content creators
- **User**: Simple avatars for regular users
- **Verified**: Special styling for verified users
- **Admin**: Professional styling for administrators

## Usage Examples

### 1. Style Images

```typescript
// Generate a style cover image
const coverImage = ImageUrls.styleImage('Neon Dreams', 'cyberpunk')
// Result: https://picsum.photos/800/600?random=123456

// Generate multiple example images
const examples = ImageUrls.styleExamples('Neon Dreams', 'cyberpunk', 4)
// Result: Array of 4 different image URLs
```

### 2. User Avatars

```typescript
// Creator avatar
const creatorAvatar = ImageUrls.creatorAvatar('neonartist')
// Result: https://api.dicebear.com/7.x/avataaars/svg?seed=neonartist

// Regular user avatar
const userAvatar = ImageUrls.userAvatar('artlover', 'user')
// Result: https://api.dicebear.com/7.x/initials/svg?seed=artlover
```

### 3. Collection and Generation Images

```typescript
// Collection cover
const collectionCover = ImageUrls.collectionCover('Cyberpunk Vibes')

// Generation result
const generationImage = ImageUrls.generationResult(
  'A cyberpunk cityscape at night',
  'cyberpunk',
  '16:9',
  'premium'
)
```

### 4. Responsive Images

```typescript
// Get multiple sizes for responsive design
const responsiveUrls = ImageUtils.getResponsiveUrls(baseUrl, [400, 800, 1200])

// Optimize for specific dimensions
const optimizedUrl = ImageUtils.optimize(url, { width: 600, height: 400 })
```

## Component Integration

### Updating Existing Components

Replace hardcoded image paths with image service calls:

```typescript
// Before
const style = {
  coverImage: "/images/cyberpunk-neon.png",
  creatorAvatar: "/images/avatar-1.png"
}

// After
const style = {
  coverImage: ImageUrls.styleImage(title, category),
  creatorAvatar: ImageUrls.creatorAvatar(username)
}
```

### Using Data Adapters

For existing components that expect specific prop structures:

```typescript
// Homepage component
import { DataAdapters } from '@/lib/data-adapters'

export default function HomePage() {
  return (
    <div>
      {DataAdapters.trendingStylesForCards().map(style => (
        <StyleCard key={style.id} style={style} />
      ))}
    </div>
  )
}
```

## Performance Considerations

### Image Preloading

```typescript
import { preloadImages } from '@/lib/image-service'

// Preload critical images
const criticalImages = [
  ImageUrls.styleImage('Featured Style', 'cyberpunk'),
  ImageUrls.userAvatar('currentUser')
]

preloadImages(criticalImages)
```

### Caching Strategy

- **Browser Cache**: Images are cached by URL
- **Deterministic URLs**: Same input = same URL = cached result
- **CDN Ready**: URLs work with CDN caching strategies

## Development vs Production

### Development Mode
- Uses Lorem Picsum for fast, reliable placeholders
- No API keys required
- Deterministic seeds ensure consistency

### Production Mode
- Can be configured to use Unsplash API for higher quality
- Requires API key setup
- Fallback to Lorem Picsum if API fails

## Configuration

### Environment Variables

```env
# Optional: Unsplash API key for production
UNSPLASH_ACCESS_KEY=your_api_key_here

# Image service mode (development/production)
IMAGE_SERVICE_MODE=development
```

### Customization

```typescript
// Customize category mappings
const STYLE_CATEGORIES = {
  cyberpunk: ['cyberpunk', 'neon', 'futuristic city'],
  vintage: ['vintage', 'retro', 'film photography'],
  // Add more categories as needed
}

// Customize avatar styles
const AVATAR_STYLES = {
  creator: 'avataaars',
  user: 'initials',
  verified: 'bottts'
}
```

## Migration Guide

### Step 1: Replace Static Images

Find and replace hardcoded image paths:

```bash
# Find all placeholder image references
grep -r "placeholder\|mock-images\|/images/" components/
```

### Step 2: Update Mock Data

Replace static URLs with image service calls:

```typescript
// Old
coverImageUrl: "/mock-images/cyberpunk.jpg"

// New
coverImageUrl: ImageUrls.styleImage(title, category)
```

### Step 3: Use Data Adapters

Update components to use data adapters for compatibility:

```typescript
// Old
import { mockStyles } from './mock-data'

// New
import { DataAdapters } from './data-adapters'
const styles = DataAdapters.trendingStylesForCards()
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Check network connectivity and API availability
2. **Inconsistent images**: Ensure deterministic seeds are used
3. **Wrong image categories**: Verify category mappings in STYLE_CATEGORIES
4. **Avatar not generating**: Check username encoding and avatar style

### Debugging

```typescript
// Enable debug logging
console.log('Generated URL:', ImageUrls.styleImage(title, category))

// Test image loading
const img = new Image()
img.onload = () => console.log('Image loaded successfully')
img.onerror = () => console.error('Image failed to load')
img.src = imageUrl
```

## Future Enhancements

1. **AI-Generated Images**: Integration with AI image generation APIs
2. **Image Optimization**: WebP conversion and compression
3. **Lazy Loading**: Intersection Observer for performance
4. **Custom Themes**: User-selectable image styles
5. **Offline Support**: Service Worker caching for offline use

## Best Practices

1. **Consistent Naming**: Use descriptive, consistent names for deterministic results
2. **Appropriate Sizing**: Request images at the size you'll display them
3. **Fallback Handling**: Always provide fallback images
4. **Performance**: Preload critical images, lazy load others
5. **Accessibility**: Include proper alt text for all images

## API Limits and Considerations

### Lorem Picsum
- **Limits**: None for reasonable use
- **Rate Limiting**: Minimal
- **Reliability**: Very high

### DiceBear
- **Limits**: No API key required
- **Rate Limiting**: Generous for normal use
- **Reliability**: High

### Unsplash (Production)
- **Limits**: 50 requests/hour (demo), 5000/hour (production)
- **Rate Limiting**: Enforced
- **Reliability**: High, but requires API key

This image service provides a robust foundation for placeholder images that will make the Pretty.af application look professional and polished during development and beyond. 