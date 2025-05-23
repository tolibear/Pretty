"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  username: string
  displayName: string
  bio?: string
  avatarUrl?: string
  socialAccounts: {
    twitter?: string
    google?: string
  }
  freeGenerationsRemaining: number
  totalGenerations: number
  isCreator: boolean
  isVerified: boolean
  provider: 'twitter' | 'google' | 'email'
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithProvider: (provider: 'twitter' | 'google') => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  // Testing utilities
  setTestUser: (user: User | null) => void
  setTestMode: (mode: 'logged-out' | 'logged-in' | 'new-user' | 'creator') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for testing different scenarios
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
    provider: 'twitter' as const,
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
    provider: 'email' as const,
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
    provider: 'google' as const,
    createdAt: '2023-06-15T00:00:00Z'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with localStorage or default state
  useEffect(() => {
    const savedAuthState = localStorage.getItem('pretty-af-auth-state')
    const savedUser = localStorage.getItem('pretty-af-user')
    
    if (savedAuthState && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse saved user:', error)
        localStorage.removeItem('pretty-af-auth-state')
        localStorage.removeItem('pretty-af-user')
      }
    }
    
    setIsLoading(false)
  }, [])

  // Save to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('pretty-af-auth-state', 'authenticated')
      localStorage.setItem('pretty-af-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('pretty-af-auth-state')
      localStorage.removeItem('pretty-af-user')
    }
  }, [user])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful login
    const mockUser = {
      ...mockUsers['logged-in'],
      email,
      displayName: email.split('@')[0]
    }
    
    setUser(mockUser)
    setIsLoading(false)
  }

  const loginWithProvider = async (provider: 'twitter' | 'google') => {
    setIsLoading(true)
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockUser = {
      ...mockUsers['logged-in'],
      provider,
      socialAccounts: provider === 'twitter' 
        ? { twitter: '@artlover' } 
        : { google: 'user@gmail.com' }
    }
    
    setUser(mockUser)
    setIsLoading(false)
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser = {
      ...mockUsers['new-user'],
      email,
      displayName: name,
      username: name.toLowerCase().replace(/\s+/g, '')
    }
    
    setUser(mockUser)
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  // Testing utilities
  const setTestUser = (testUser: User | null) => {
    setUser(testUser)
  }

  const setTestMode = (mode: 'logged-out' | 'logged-in' | 'new-user' | 'creator') => {
    if (mode === 'logged-out') {
      setUser(null)
    } else {
      setUser(mockUsers[mode])
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithProvider,
    register,
    logout,
    updateUser,
    setTestUser,
    setTestMode
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Development helper component for testing different auth states
export function AuthTestingPanel() {
  const { setTestMode, user, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bg-primary text-primary-foreground rounded-full w-10 h-10 shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        style={{
          bottom: '16px',
          right: '16px',
          zIndex: 9999
        }}
        title="Toggle Auth Testing Panel"
      >
        🧪
      </button>

      {/* Panel */}
      {isOpen && (
        <div 
          className="fixed bg-background/95 backdrop-blur border rounded-lg p-3 shadow-lg w-48 text-xs"
          style={{
            bottom: '72px',
            right: '16px',
            zIndex: 9999
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-xs">Auth Testing</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              ✕
            </button>
          </div>
          <div className="text-[10px] text-muted-foreground mb-2 truncate">
            {isAuthenticated ? user?.displayName : 'Logged out'}
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setTestMode('logged-out')}
              className="w-full text-left px-2 py-1 text-[10px] bg-muted rounded hover:bg-accent transition-colors"
            >
              🚪 Logged Out
            </button>
            <button
              onClick={() => setTestMode('logged-in')}
              className="w-full text-left px-2 py-1 text-[10px] bg-muted rounded hover:bg-accent transition-colors"
            >
              👤 Regular User
            </button>
            <button
              onClick={() => setTestMode('new-user')}
              className="w-full text-left px-2 py-1 text-[10px] bg-muted rounded hover:bg-accent transition-colors"
            >
              ✨ New User
            </button>
            <button
              onClick={() => setTestMode('creator')}
              className="w-full text-left px-2 py-1 text-[10px] bg-muted rounded hover:bg-accent transition-colors"
            >
              🎨 Creator
            </button>
          </div>
        </div>
      )}
    </>
  )
} 