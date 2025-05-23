/**
 * Data Adapters for Pretty.af
 * 
 * Transforms comprehensive mock data into formats expected by existing components
 * This allows us to maintain rich data structures while keeping component compatibility
 */

import { MockData } from './mock-data'

// Style data adapter for StyleCard component
export function adaptStyleForCard(style: typeof MockData.styles.trending[0]) {
  return {
    id: style.id,
    title: style.title,
    creator: style.creator.handle,
    likes: style.totalLikes,
    coverImage: style.coverImageUrl,
    price: style.pricePerGeneration,
    isFree: style.isFree,
    isTrending: style.isTrending,
    isFeatured: style.isFeatured,
    rating: style.rating,
    generations: style.totalGenerations,
    creatorAvatar: style.creator.avatarUrl,
    isVerified: style.creator.isVerified
  }
}

// Creator data adapter for CreatorSpotlight component
export function adaptCreatorForSpotlight(creator: typeof MockData.users.creators[0]) {
  return {
    id: creator.id,
    name: creator.displayName,
    handle: creator.handle,
    avatar: creator.avatarUrl,
    earnings: `${creator.totalEarnings.toLocaleString()} USDC`,
    styles: creator.totalStyles,
    isVerified: creator.isVerified,
    followers: creator.followers,
    rating: creator.rating,
    specialties: creator.specialties,
    isTopCreator: creator.totalEarnings > 10000, // Top creator if earnings > 10k
    monthlyGrowth: Math.floor(Math.random() * 30) + 10 // Random growth 10-40%
  }
}

// Collection data adapter
export function adaptCollectionForCard(collection: typeof MockData.collections[0]) {
  return {
    id: collection.id,
    name: collection.name,
    description: collection.description,
    coverImage: collection.coverImageUrl,
    itemCount: collection.itemCount,
    isPublic: collection.isPublic,
    createdAt: collection.createdAt,
    lastUpdated: collection.lastUpdated
  }
}

// Generation data adapter
export function adaptGenerationForCard(generation: typeof MockData.generations[0]) {
  return {
    id: generation.id,
    prompt: generation.prompt,
    image: generation.imageUrl,
    styleName: generation.styleName,
    creatorName: generation.creatorName,
    createdAt: generation.createdAt,
    isPublic: generation.isPublic,
    likes: generation.likes,
    downloads: generation.downloads,
    aspectRatio: generation.aspectRatio,
    quality: generation.quality
  }
}

// Category data adapter
export function adaptCategoryForCard(category: typeof MockData.categories[0]) {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    slug: category.slug,
    image: category.imageUrl,
    styleCount: category.styleCount,
    totalGenerations: category.totalGenerations
  }
}

// Batch adapters for arrays
export const DataAdapters = {
  // Style adapters
  stylesForCards: (styles: typeof MockData.styles.trending) => 
    styles.map(adaptStyleForCard),
  
  trendingStylesForCards: () => 
    DataAdapters.stylesForCards(MockData.styles.trending),
  
  featuredStylesForCards: () => 
    DataAdapters.stylesForCards(MockData.styles.featured),
  
  freeStylesForCards: () => 
    DataAdapters.stylesForCards(MockData.styles.free),

  // Creator adapters
  creatorsForSpotlight: (creators: typeof MockData.users.creators) => 
    creators.map(adaptCreatorForSpotlight),
  
  topCreatorsForSpotlight: () => 
    DataAdapters.creatorsForSpotlight(MockData.users.creators),

  // Collection adapters
  collectionsForCards: (collections: typeof MockData.collections) => 
    collections.map(adaptCollectionForCard),
  
  userCollectionsForCards: () => 
    DataAdapters.collectionsForCards(MockData.collections),

  // Generation adapters
  generationsForCards: (generations: typeof MockData.generations) => 
    generations.map(adaptGenerationForCard),
  
  userGenerationsForCards: () => 
    DataAdapters.generationsForCards(MockData.generations),

  // Category adapters
  categoriesForCards: (categories: typeof MockData.categories) => 
    categories.map(adaptCategoryForCard),
  
  allCategoriesForCards: () => 
    DataAdapters.categoriesForCards(MockData.categories)
}

// Helper functions for specific use cases
export const StyleHelpers = {
  // Get styles by category
  getStylesByCategory: (category: string) => {
    const allStyles = [
      ...MockData.styles.trending,
      ...MockData.styles.featured,
      ...MockData.styles.free
    ]
    return DataAdapters.stylesForCards(
      allStyles.filter(style => 
        style.category.toLowerCase() === category.toLowerCase()
      )
    )
  },

  // Get styles by creator
  getStylesByCreator: (creatorId: string) => {
    const allStyles = [
      ...MockData.styles.trending,
      ...MockData.styles.featured,
      ...MockData.styles.free
    ]
    return DataAdapters.stylesForCards(
      allStyles.filter(style => style.creator.id === creatorId)
    )
  },

  // Search styles
  searchStyles: (query: string) => {
    const allStyles = [
      ...MockData.styles.trending,
      ...MockData.styles.featured,
      ...MockData.styles.free
    ]
    const searchTerm = query.toLowerCase()
    return DataAdapters.stylesForCards(
      allStyles.filter(style => 
        style.title.toLowerCase().includes(searchTerm) ||
        style.description.toLowerCase().includes(searchTerm) ||
        style.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        style.creator.displayName.toLowerCase().includes(searchTerm)
      )
    )
  }
}

export const CreatorHelpers = {
  // Get creator by username
  getCreatorByUsername: (username: string) => {
    const creator = MockData.users.creators.find(c => 
      c.username === username || c.handle === `@${username}`
    )
    return creator ? adaptCreatorForSpotlight(creator) : null
  },

  // Get top creators by earnings
  getTopCreatorsByEarnings: (limit: number = 4) => {
    const sortedCreators = [...MockData.users.creators]
      .sort((a, b) => b.totalEarnings - a.totalEarnings)
      .slice(0, limit)
    return DataAdapters.creatorsForSpotlight(sortedCreators)
  },

  // Get verified creators
  getVerifiedCreators: () => {
    const verifiedCreators = MockData.users.creators.filter(c => c.isVerified)
    return DataAdapters.creatorsForSpotlight(verifiedCreators)
  }
} 