'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FreeGenerationsTracker } from '@/components/free-generations-tracker'
import { Separator } from '@/components/ui/separator'
import { RefreshCw, TestTube } from 'lucide-react'

export default function TestFreeGenerationsPage() {
  const [scenario, setScenario] = useState<'full' | 'low' | 'exhausted'>('full')
  
  const getRemaining = () => {
    switch (scenario) {
      case 'full': return 5
      case 'low': return 2
      case 'exhausted': return 0
      default: return 5
    }
  }

  const handleUpgrade = () => {
    console.log('Upgrade clicked for scenario:', scenario)
  }

  const handleConnectWallet = () => {
    console.log('Connect wallet clicked for scenario:', scenario)
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <TestTube className="h-6 w-6 text-purple-600" />
            <h1 className="text-3xl font-bold">Free Generation System Test</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test the free generation system UI in different states. Click the scenario buttons below to see how the tracker behaves when users have different amounts of free generations remaining.
          </p>
        </div>

        {/* Scenario Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5" />
              <span>Test Scenarios</span>
            </CardTitle>
            <CardDescription>
              Switch between different user states to test the free generation system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={scenario === 'full' ? 'default' : 'outline'}
                onClick={() => setScenario('full')}
                className="flex items-center space-x-2"
              >
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">
                  5/5
                </Badge>
                <span>Full Generations</span>
              </Button>
              
              <Button
                variant={scenario === 'low' ? 'default' : 'outline'}
                onClick={() => setScenario('low')}
                className="flex items-center space-x-2"
              >
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                  2/5
                </Badge>
                <span>Low Generations</span>
              </Button>
              
              <Button
                variant={scenario === 'exhausted' ? 'default' : 'outline'}
                onClick={() => setScenario('exhausted')}
                className="flex items-center space-x-2"
              >
                <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-300">
                  0/5
                </Badge>
                <span>Exhausted</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Scenario Display */}
        <Card>
          <CardHeader>
            <CardTitle>Current Scenario: {scenario.charAt(0).toUpperCase() + scenario.slice(1)}</CardTitle>
            <CardDescription>
              {scenario === 'full' && "User has all 5 free generations available. No upgrade prompts should appear."}
              {scenario === 'low' && "User has 2 generations left. Should show 'Low' badge and upgrade button."}
              {scenario === 'exhausted' && "User has 0 generations left. Should show 'Exhausted' badge and prominent upgrade button."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Tracker in Header Context */}
              <div>
                <h4 className="text-sm font-medium mb-3">In Header Navigation Context</h4>
                <div className="bg-background border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">Pretty</span>
                    <nav className="hidden md:flex items-center space-x-6">
                      <span className="text-sm text-muted-foreground">Explore</span>
                      <span className="text-sm text-muted-foreground">Trending</span>
                    </nav>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FreeGenerationsTracker
                      remaining={getRemaining()}
                      total={5}
                      onUpgrade={handleUpgrade}
                      onConnectWallet={handleConnectWallet}
                    />
                    <Button variant="ghost" size="sm">Profile</Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tracker in Dashboard Context */}
              <div>
                <h4 className="text-sm font-medium mb-3">In Dashboard Context</h4>
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Your Account</h3>
                      <p className="text-sm text-muted-foreground">Manage your generations and upgrade options</p>
                    </div>
                    <FreeGenerationsTracker
                      remaining={getRemaining()}
                      total={5}
                      onUpgrade={handleUpgrade}
                      onConnectWallet={handleConnectWallet}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{getRemaining()}</div>
                        <div className="text-xs text-muted-foreground">Free generations left</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs text-muted-foreground">Total generated</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-xs text-muted-foreground">Collections</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tracker in Generation Modal Context */}
              <div>
                <h4 className="text-sm font-medium mb-3">In Generation Modal Context</h4>
                <Card>
                  <CardHeader>
                    <CardTitle>Generate with Cyberpunk Neon</CardTitle>
                    <CardDescription>Create stunning cyberpunk-style images</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Generation Cost</span>
                        <FreeGenerationsTracker
                          remaining={getRemaining()}
                          total={5}
                          showUpgradePrompt={false}
                          className="text-xs"
                        />
                      </div>
                      <div className="text-center">
                        <Button 
                          className="w-full" 
                          disabled={getRemaining() === 0}
                        >
                          {getRemaining() === 0 ? 'No Free Generations Left' : 'Generate Image (Free)'}
                        </Button>
                        {getRemaining() === 0 && (
                          <div className="mt-2">
                            <FreeGenerationsTracker
                              remaining={getRemaining()}
                              total={5}
                              onUpgrade={handleUpgrade}
                              onConnectWallet={handleConnectWallet}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Full Generations (5/5)</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Green lightning icon and progress bar</li>
                  <li>No upgrade button or badges visible</li>
                  <li>Clean, minimal display</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Low Generations (2/5)</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Yellow lightning icon and progress bar</li>
                  <li>"Low" badge appears next to counter</li>
                  <li>Small "Upgrade" button appears</li>
                  <li>Click upgrade button to see upgrade modal</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Exhausted Generations (0/5)</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Red lightning icon with pulsing indicator</li>
                  <li>"Exhausted" badge in red</li>
                  <li>Prominent "Upgrade Now" button with gradient</li>
                  <li>Click upgrade to see full upgrade modal with pricing</li>
                  <li>Test wallet connection flow</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Modal Testing</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Premium plan: $9.99/month with unlimited generations</li>
                  <li>Pay-per-generation: $0.10 per image with wallet connection</li>
                  <li>Test wallet connection modal with MetaMask, WalletConnect, Coinbase</li>
                  <li>Free alternative: "I'll wait" option</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 