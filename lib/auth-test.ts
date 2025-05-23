// Simple test utility to verify auth context functionality
// This can be run in the browser console for debugging

export function testAuthContext() {
  console.log('🧪 Testing Auth Context...')
  
  // Check if localStorage is working
  try {
    localStorage.setItem('test', 'value')
    localStorage.removeItem('test')
    console.log('✅ localStorage is working')
  } catch (error) {
    console.error('❌ localStorage error:', error)
    return false
  }
  
  // Check if auth state exists
  const authState = localStorage.getItem('pretty-af-auth-state')
  const userData = localStorage.getItem('pretty-af-user')
  
  console.log('📊 Current auth state:', authState)
  console.log('👤 Current user data:', userData ? JSON.parse(userData) : null)
  
  return true
}

export function clearAuthState() {
  localStorage.removeItem('pretty-af-auth-state')
  localStorage.removeItem('pretty-af-user')
  console.log('🧹 Auth state cleared')
}

export function setTestUser(type: 'logged-out' | 'logged-in' | 'new-user' | 'creator') {
  if (type === 'logged-out') {
    clearAuthState()
    return
  }
  
  const mockUsers = {
    'logged-in': {
      id: '1',
      email: 'user@example.com',
      username: 'artlover',
      displayName: 'Art Lover',
      bio: 'Digital art enthusiast',
      avatarUrl: undefined,
      socialAccounts: { twitter: '@artlover' },
      freeGenerationsRemaining: 3,
      totalGenerations: 12,
      isCreator: false,
      isVerified: false,
      provider: 'twitter',
      createdAt: '2024-01-01T00:00:00Z'
    },
    'new-user': {
      id: '2',
      email: 'newuser@example.com',
      username: 'newuser',
      displayName: 'New User',
      socialAccounts: {},
      freeGenerationsRemaining: 5,
      totalGenerations: 0,
      isCreator: false,
      isVerified: false,
      provider: 'email',
      createdAt: new Date().toISOString()
    },
    'creator': {
      id: '3',
      email: 'creator@example.com',
      username: 'neonartist',
      displayName: 'Neon Artist',
      bio: 'Creating cyberpunk art styles',
      avatarUrl: '/mock-images/creator-avatar.jpg',
      socialAccounts: { twitter: '@neonartist' },
      freeGenerationsRemaining: 0,
      totalGenerations: 156,
      isCreator: true,
      isVerified: true,
      provider: 'google',
      createdAt: '2023-06-15T00:00:00Z'
    }
  }
  
  const user = mockUsers[type]
  localStorage.setItem('pretty-af-auth-state', 'authenticated')
  localStorage.setItem('pretty-af-user', JSON.stringify(user))
  console.log(`🎭 Set test user: ${type}`, user)
}

// Make functions available globally for browser console testing
if (typeof window !== 'undefined') {
  (window as any).testAuth = {
    test: testAuthContext,
    clear: clearAuthState,
    setUser: setTestUser
  }
} 