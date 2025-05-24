'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Zap, Crown, Wallet, CreditCard, Check, Star, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FreeGenerationsTrackerProps {
  remaining: number
  total?: number
  className?: string
  showUpgradePrompt?: boolean
  onUpgrade?: () => void
  onConnectWallet?: () => void
}

export function FreeGenerationsTracker({ 
  remaining, 
  total = 5, 
  className,
  showUpgradePrompt = true,
  onUpgrade,
  onConnectWallet
}: FreeGenerationsTrackerProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  
  const percentage = (remaining / total) * 100
  const isLow = remaining <= 2
  const isExhausted = remaining === 0

  const handleUpgrade = () => {
    setShowUpgradeModal(true)
    onUpgrade?.()
  }

  const handleConnectWallet = () => {
    setShowWalletModal(true)
    onConnectWallet?.()
  }

  // Get progress bar color based on status
  const getProgressColor = () => {
    if (isExhausted) return 'bg-red-500'
    if (isLow) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <>
      <div className={cn("flex items-center space-x-3", className)}>
        {/* Generation Counter */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Zap className={cn(
              "h-4 w-4",
              isExhausted ? "text-red-500" : isLow ? "text-yellow-500" : "text-green-500"
            )} />
            {isExhausted && (
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className={cn(
                "text-sm font-medium",
                isExhausted ? "text-red-600 dark:text-red-400" : "text-foreground"
              )}>
                {remaining} free
              </span>
              {isLow && !isExhausted && (
                <Badge variant="outline" className="text-xs px-1 py-0 h-4 text-yellow-600 border-yellow-300">
                  Low
                </Badge>
              )}
              {isExhausted && (
                <Badge variant="destructive" className="text-xs px-1 py-0 h-4">
                  Exhausted
                </Badge>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-16 h-1 mt-1 bg-secondary rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-300", getProgressColor())}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Upgrade Button */}
        {showUpgradePrompt && (isLow || isExhausted) && (
          <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant={isExhausted ? "default" : "outline"}
                className={cn(
                  "text-xs",
                  isExhausted && "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                )}
                onClick={handleUpgrade}
              >
                <Crown className="h-3 w-3 mr-1" />
                {isExhausted ? "Upgrade Now" : "Upgrade"}
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span>Continue Generating</span>
                </DialogTitle>
                <DialogDescription>
                  {isExhausted 
                    ? "You've used all your free generations. Choose how to continue creating amazing images."
                    : "You're running low on free generations. Upgrade to keep creating without limits."
                  }
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Current Status */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Free Generations</p>
                        <p className="text-xs text-muted-foreground">
                          {remaining} of {total} remaining
                        </p>
                      </div>
                      <Progress value={percentage} className="w-20 h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade Options */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Choose Your Plan</h4>
                  
                  {/* Premium Plan */}
                  <Card className="border-purple-200 dark:border-purple-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-bl">
                      Popular
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Premium</CardTitle>
                          <CardDescription>Unlimited generations</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$9.99</div>
                          <div className="text-xs text-muted-foreground">/month</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Unlimited generations</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Premium quality images</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Priority queue</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Commercial license</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Subscribe with Card
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Pay-per-Generation */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Pay-per-Generation</CardTitle>
                          <CardDescription>Connect wallet to pay as you go</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$0.10</div>
                          <div className="text-xs text-muted-foreground">per image</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Pay only for what you use</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Standard quality images</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Personal license</span>
                        </li>
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={handleConnectWallet}
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        Connect Wallet
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Free Alternative */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Or wait 24 hours for 1 free generation to refresh
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => setShowUpgradeModal(false)}>
                    I'll wait
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Wallet Connection Modal */}
      <Dialog open={showWalletModal} onOpenChange={setShowWalletModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              <span>Connect Your Wallet</span>
            </DialogTitle>
            <DialogDescription>
              Choose a wallet to connect and start generating images with crypto payments.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* MetaMask */}
            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
              onClick={() => {
                // Mock wallet connection
                setShowWalletModal(false)
                // In real app, this would trigger MetaMask connection
              }}
            >
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="text-left">
                <div className="font-medium">MetaMask</div>
                <div className="text-xs text-muted-foreground">Most popular wallet</div>
              </div>
            </Button>

            {/* WalletConnect */}
            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
              onClick={() => {
                // Mock wallet connection
                setShowWalletModal(false)
                // In real app, this would trigger WalletConnect
              }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div className="text-left">
                <div className="font-medium">WalletConnect</div>
                <div className="text-xs text-muted-foreground">Connect any wallet</div>
              </div>
            </Button>

            {/* Coinbase Wallet */}
            <Button 
              variant="outline" 
              className="w-full justify-start h-12"
              onClick={() => {
                // Mock wallet connection
                setShowWalletModal(false)
                // In real app, this would trigger Coinbase Wallet connection
              }}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="text-left">
                <div className="font-medium">Coinbase Wallet</div>
                <div className="text-xs text-muted-foreground">Easy to use</div>
              </div>
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              Your wallet will be used to pay for generations. No subscription required.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 