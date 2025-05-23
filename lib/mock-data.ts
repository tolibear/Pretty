/**
 * Mock Data for Pretty.af
 * 
 * Provides realistic mock data with automatically generated images
 * using the image service for consistent, high-quality placeholders
 */

import { ImageUrls } from './image-service'

// User mock data with generated avatars
export const mockUsers = {
  creators: [
    {
      id: 'creator1',
      username: 'neonartist',
      displayName: 'Alex Rivera',
      handle: '@neonartist',
      bio: 'Creating cyberpunk art styles that transport you to neon-lit futures',
      avatarUrl: ImageUrls.creatorAvatar('neonartist'),
      isVerified: true,
      isCreator: true,
      followers: 5420,
      totalEarnings: 12450,
      totalStyles: 8,
      totalGenerations: 5621,
      rating: 4.9,
      specialties: ['Cyberpunk', 'Neon Art'],
      joinedAt: '2023-06-15T00:00:00Z'
    },
    {
      id: 'creator2',
      username: 'retrovisuals',
      displayName: 'Jamie Chen',
      handle: '@retrovisuals',
      bio: 'Vintage aesthetics and film photography styles',
      avatarUrl: ImageUrls.creatorAvatar('retrovisuals'),
      isVerified: true,
      isCreator: true,
      followers: 3890,
      totalEarnings: 9320,
      totalStyles: 6,
      totalGenerations: 4210,
      rating: 4.8,
      specialties: ['Vintage', 'Film Photography'],
      joinedAt: '2023-05-20T00:00:00Z'
    },
    {
      id: 'creator3',
      username: 'pixelmaster',
      displayName: 'Taylor Kim',
      handle: '@pixelmaster',
      bio: 'Retro pixel art and 8-bit gaming aesthetics',
      avatarUrl: ImageUrls.creatorAvatar('pixelmaster'),
      isVerified: true,
      isCreator: true,
      followers: 4560,
      totalEarnings: 7890,
      totalStyles: 7,
      totalGenerations: 4890,
      rating: 4.9,
      specialties: ['Pixel Art', 'Retro Gaming'],
      joinedAt: '2023-04-10T00:00:00Z'
    },
    {
      id: 'creator4',
      username: 'watercolorist',
      displayName: 'Sam Wilson',
      handle: '@watercolorist',
      bio: 'Soft watercolor paintings and artistic expressions',
      avatarUrl: ImageUrls.creatorAvatar('watercolorist'),
      isVerified: true,
      isCreator: true,
      followers: 2890,
      totalEarnings: 6540,
      totalStyles: 5,
      totalGenerations: 3850,
      rating: 4.8,
      specialties: ['Watercolor', 'Artistic'],
      joinedAt: '2023-07-01T00:00:00Z'
    }
  ],
  
  regularUsers: [
    {
      id: 'user1',
      username: 'artlover',
      displayName: 'Art Lover',
      handle: '@artlover',
      bio: 'Digital art enthusiast exploring AI creativity',
      avatarUrl: ImageUrls.userAvatar('artlover'),
      isVerified: false,
      isCreator: false,
      freeGenerationsRemaining: 3,
      totalGenerations: 12,
      joinedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'user2',
      username: 'creativemind',
      displayName: 'Creative Mind',
      handle: '@creativemind',
      bio: 'Always looking for new ways to express creativity',
      avatarUrl: ImageUrls.userAvatar('creativemind'),
      isVerified: false,
      isCreator: false,
      freeGenerationsRemaining: 5,
      totalGenerations: 0,
      joinedAt: '2024-01-15T00:00:00Z'
    }
  ]
}

// Style mock data with generated images
export const mockStyles = {
  trending: [
    {
      id: 'style1',
      title: 'Cyberpunk Neon Dreams',
      description: 'Futuristic cityscapes with vibrant neon lighting and cyberpunk aesthetics',
      category: 'Cyberpunk',
      tags: ['cyberpunk', 'neon', 'futuristic', 'city'],
      coverImageUrl: ImageUrls.styleImage('Cyberpunk Neon Dreams', 'cyberpunk'),
      exampleImages: ImageUrls.styleExamples('Cyberpunk Neon Dreams', 'cyberpunk', 6),
      creator: mockUsers.creators[0],
      pricePerGeneration: 0.015,
      currency: 'ETH',
      isFree: false,
      isPublished: true,
      isTrending: true,
      isFeatured: true,
      totalGenerations: 2156,
      totalLikes: 1243,
      rating: 4.9,
      createdAt: '2023-12-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 'style2',
      title: 'Vintage Film Photography',
      description: 'Classic film photography aesthetics with warm tones and grain',
      category: 'Vintage',
      tags: ['vintage', 'film', 'photography', 'retro'],
      coverImageUrl: ImageUrls.styleImage('Vintage Film Photography', 'vintage'),
      exampleImages: ImageUrls.styleExamples('Vintage Film Photography', 'vintage', 5),
      creator: mockUsers.creators[1],
      pricePerGeneration: 0.012,
      currency: 'ETH',
      isFree: false,
      isPublished: true,
      isTrending: true,
      isFeatured: false,
      totalGenerations: 1834,
      totalLikes: 982,
      rating: 4.8,
      createdAt: '2023-11-15T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z'
    },
    {
      id: 'style3',
      title: 'Retro Pixel Art',
      description: 'Classic 8-bit and 16-bit pixel art style reminiscent of retro gaming',
      category: 'Pixel',
      tags: ['pixel', 'retro', '8bit', 'gaming'],
      coverImageUrl: ImageUrls.styleImage('Retro Pixel Art', 'pixel'),
      exampleImages: ImageUrls.styleExamples('Retro Pixel Art', 'pixel', 4),
      creator: mockUsers.creators[2],
      pricePerGeneration: 0.020,
      currency: 'ETH',
      isFree: false,
      isPublished: true,
      isTrending: true,
      isFeatured: true,
      totalGenerations: 2341,
      totalLikes: 1089,
      rating: 4.9,
      createdAt: '2023-10-20T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z'
    },
    {
      id: 'style4',
      title: 'Watercolor Dreams',
      description: 'Soft, flowing watercolor painting style with artistic flair',
      category: 'Watercolor',
      tags: ['watercolor', 'painting', 'artistic', 'soft'],
      coverImageUrl: ImageUrls.styleImage('Watercolor Dreams', 'watercolor'),
      exampleImages: ImageUrls.styleExamples('Watercolor Dreams', 'watercolor', 5),
      creator: mockUsers.creators[3],
      pricePerGeneration: 0.018,
      currency: 'ETH',
      isFree: false,
      isPublished: true,
      isTrending: false,
      isFeatured: true,
      totalGenerations: 1567,
      totalLikes: 876,
      rating: 4.8,
      createdAt: '2023-12-10T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z'
    }
  ],
  
  featured: [
    {
      id: 'style5',
      title: 'Abstract Fluid Waves',
      description: 'Dynamic fluid art with colorful gradients and wave patterns',
      category: 'Abstract',
      tags: ['abstract', 'fluid', 'waves', 'colorful'],
      coverImageUrl: ImageUrls.styleImage('Abstract Fluid Waves', 'abstract'),
      exampleImages: ImageUrls.styleExamples('Abstract Fluid Waves', 'abstract', 4),
      creator: mockUsers.creators[0],
      pricePerGeneration: 0.008,
      currency: 'ETH',
      isFree: false,
      isPublished: true,
      isTrending: true,
      isFeatured: true,
      totalGenerations: 1456,
      totalLikes: 756,
      rating: 4.7,
      createdAt: '2023-11-25T00:00:00Z',
      updatedAt: '2024-01-08T00:00:00Z'
    },
    {
      id: 'style6',
      title: 'Minimalist Architecture',
      description: 'Clean, modern architectural photography with minimal aesthetics',
      category: 'Architecture',
      tags: ['minimalist', 'architecture', 'modern', 'clean'],
      coverImageUrl: ImageUrls.styleImage('Minimalist Architecture', 'architecture'),
      exampleImages: ImageUrls.styleExamples('Minimalist Architecture', 'architecture', 4),
      creator: mockUsers.creators[1],
      pricePerGeneration: 0.010,
      currency: 'ETH',
      isFree: false,
      isPublished: true,
      isTrending: true,
      isFeatured: true,
      totalGenerations: 987,
      totalLikes: 654,
      rating: 4.8,
      createdAt: '2023-12-05T00:00:00Z',
      updatedAt: '2024-01-14T00:00:00Z'
    }
  ],
  
  free: [
    {
      id: 'style7',
      title: 'Basic Portraits',
      description: 'Simple portrait generation for everyday use',
      category: 'Portrait',
      tags: ['portrait', 'basic', 'simple', 'everyday'],
      coverImageUrl: ImageUrls.styleImage('Basic Portraits', 'portrait'),
      exampleImages: ImageUrls.styleExamples('Basic Portraits', 'portrait', 3),
      creator: mockUsers.creators[2],
      pricePerGeneration: 0,
      currency: 'ETH',
      isFree: true,
      isPublished: true,
      isTrending: false,
      isFeatured: false,
      totalGenerations: 3456,
      totalLikes: 789,
      rating: 4.3,
      createdAt: '2023-09-15T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'style8',
      title: 'Nature Photography',
      description: 'Beautiful natural landscapes and scenery',
      category: 'Nature',
      tags: ['nature', 'landscape', 'photography', 'scenery'],
      coverImageUrl: ImageUrls.styleImage('Nature Photography', 'nature'),
      exampleImages: ImageUrls.styleExamples('Nature Photography', 'nature', 4),
      creator: mockUsers.creators[3],
      pricePerGeneration: 0,
      currency: 'ETH',
      isFree: true,
      isPublished: true,
      isTrending: false,
      isFeatured: false,
      totalGenerations: 1456,
      totalLikes: 334,
      rating: 4.0,
      createdAt: '2023-08-20T00:00:00Z',
      updatedAt: '2023-12-28T00:00:00Z'
    }
  ]
}

// Collection mock data with generated cover images
export const mockCollections = [
  {
    id: 'collection1',
    name: 'Cyberpunk Vibes',
    description: 'Futuristic and neon-inspired styles for sci-fi projects',
    coverImageUrl: ImageUrls.collectionCover('Cyberpunk Vibes'),
    itemCount: 12,
    isPublic: true,
    userId: 'user1',
    createdAt: '2024-01-15T00:00:00Z',
    lastUpdated: '2024-01-20T00:00:00Z'
  },
  {
    id: 'collection2',
    name: 'Nature & Landscapes',
    description: 'Beautiful natural scenery and landscape styles',
    coverImageUrl: ImageUrls.collectionCover('Nature & Landscapes'),
    itemCount: 8,
    isPublic: false,
    userId: 'user1',
    createdAt: '2024-01-10T00:00:00Z',
    lastUpdated: '2024-01-18T00:00:00Z'
  },
  {
    id: 'collection3',
    name: 'Portrait Styles',
    description: 'Character and portrait generation styles',
    coverImageUrl: ImageUrls.collectionCover('Portrait Styles'),
    itemCount: 15,
    isPublic: true,
    userId: 'user1',
    createdAt: '2024-01-05T00:00:00Z',
    lastUpdated: '2024-01-19T00:00:00Z'
  }
]

// Generation mock data with generated result images
export const mockGenerations = [
  {
    id: 'gen1',
    prompt: 'A cyberpunk cityscape at night with neon lights reflecting on wet streets',
    imageUrl: ImageUrls.generationResult(
      'A cyberpunk cityscape at night with neon lights reflecting on wet streets',
      'cyberpunk',
      '16:9',
      'premium'
    ),
    styleId: 'style1',
    styleName: 'Cyberpunk Neon Dreams',
    creatorName: 'Alex Rivera',
    userId: 'user1',
    aspectRatio: '16:9',
    quality: 'premium',
    status: 'completed',
    isPublic: true,
    likes: 24,
    downloads: 8,
    createdAt: '2024-01-20T10:30:00Z',
    completedAt: '2024-01-20T10:31:30Z'
  },
  {
    id: 'gen2',
    prompt: 'A serene mountain landscape with morning mist and golden sunlight',
    imageUrl: ImageUrls.generationResult(
      'A serene mountain landscape with morning mist and golden sunlight',
      'nature',
      '4:5',
      'standard'
    ),
    styleId: 'style8',
    styleName: 'Nature Photography',
    creatorName: 'Sam Wilson',
    userId: 'user1',
    aspectRatio: '4:5',
    quality: 'standard',
    status: 'completed',
    isPublic: false,
    likes: 12,
    downloads: 3,
    createdAt: '2024-01-19T15:45:00Z',
    completedAt: '2024-01-19T15:46:15Z'
  },
  {
    id: 'gen3',
    prompt: 'Portrait of a wise old wizard with a long flowing beard and mystical eyes',
    imageUrl: ImageUrls.generationResult(
      'Portrait of a wise old wizard with a long flowing beard and mystical eyes',
      'portrait',
      '1:1',
      'premium'
    ),
    styleId: 'style7',
    styleName: 'Basic Portraits',
    creatorName: 'Taylor Kim',
    userId: 'user1',
    aspectRatio: '1:1',
    quality: 'premium',
    status: 'completed',
    isPublic: true,
    likes: 36,
    downloads: 15,
    createdAt: '2024-01-18T09:15:00Z',
    completedAt: '2024-01-18T09:16:45Z'
  }
]

// Category mock data with generated banner images
export const mockCategories = [
  {
    id: 'cat1',
    name: 'Cyberpunk',
    description: 'Futuristic neon-lit cityscapes and sci-fi aesthetics',
    slug: 'cyberpunk',
    imageUrl: ImageUrls.categoryBanner('Cyberpunk'),
    styleCount: 24,
    totalGenerations: 15420
  },
  {
    id: 'cat2',
    name: 'Vintage',
    description: 'Classic retro and vintage photography styles',
    slug: 'vintage',
    imageUrl: ImageUrls.categoryBanner('Vintage'),
    styleCount: 18,
    totalGenerations: 12340
  },
  {
    id: 'cat3',
    name: 'Abstract',
    description: 'Modern abstract art and fluid designs',
    slug: 'abstract',
    imageUrl: ImageUrls.categoryBanner('Abstract'),
    styleCount: 32,
    totalGenerations: 9870
  },
  {
    id: 'cat4',
    name: 'Portrait',
    description: 'Character and portrait generation styles',
    slug: 'portrait',
    imageUrl: ImageUrls.categoryBanner('Portrait'),
    styleCount: 45,
    totalGenerations: 23450
  }
]

// Review mock data with user avatars
export const mockReviews = [
  {
    id: 'review1',
    styleId: 'style1',
    userId: 'user1',
    userName: 'Sarah Chen',
    userAvatar: ImageUrls.userAvatar('sarahchen'),
    rating: 5,
    comment: 'Amazing style! The neon effects are exactly what I was looking for. Generated 10+ images and they all turned out fantastic.',
    createdAt: '2024-01-18T00:00:00Z',
    isVerified: false
  },
  {
    id: 'review2',
    styleId: 'style1',
    userId: 'user2',
    userName: 'Mike Rodriguez',
    userAvatar: ImageUrls.userAvatar('mikerodriguez'),
    rating: 5,
    comment: 'Perfect for my cyberpunk project. The quality is consistently high and the style captures that retro-futuristic vibe perfectly.',
    createdAt: '2024-01-11T00:00:00Z',
    isVerified: true
  },
  {
    id: 'review3',
    styleId: 'style1',
    userId: 'user3',
    userName: 'Emma Thompson',
    userAvatar: ImageUrls.userAvatar('emmathompson'),
    rating: 4,
    comment: 'Great style overall. Sometimes the neon effects can be a bit overwhelming, but adjusting the prompt helps. Definitely recommend!',
    createdAt: '2024-01-04T00:00:00Z',
    isVerified: false
  }
]

// Activity mock data
export const mockActivity = [
  {
    id: 'activity1',
    type: 'generation',
    userId: 'user1',
    description: 'Generated an image with Cyberpunk Neon Dreams',
    relatedId: 'gen1',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: 'activity2',
    type: 'like',
    userId: 'user1',
    description: 'Liked Vintage Film Photography style',
    relatedId: 'style2',
    createdAt: '2024-01-19T16:20:00Z'
  },
  {
    id: 'activity3',
    type: 'collection',
    userId: 'user1',
    description: 'Created collection "Cyberpunk Vibes"',
    relatedId: 'collection1',
    createdAt: '2024-01-15T14:15:00Z'
  }
]

// Export all mock data
export const MockData = {
  users: mockUsers,
  styles: mockStyles,
  collections: mockCollections,
  generations: mockGenerations,
  categories: mockCategories,
  reviews: mockReviews,
  activity: mockActivity
}

export default MockData 