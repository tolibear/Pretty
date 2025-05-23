"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Sparkles, Wallet } from "lucide-react"
import { ConnectWallet } from "@/components/wallet/connect-wallet"

interface FreeGenerationsTrackerProps {
  totalFree: number
  used: number
  onConnectWallet?: () => void
}

export function FreeGenerationsTracker({ totalFree = 20, used = 0, onConnectWallet }: FreeGenerationsTrackerProps) {
  const [showConnectWallet, setShowConnectWallet] = React.useState(false)

  const remaining = totalFree - used
  const percentUsed = (used / totalFree) * 100

  const handleConnectWalletClick = () => {
    setShowConnectWallet(true)
  }

  const handleWalletConnected = () => {
    if (onConnectWallet) onConnectWallet()
  }

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h4 className="font-medium">Free Generations</h4>
        </div>
        <span className="text-sm font-medium">{remaining} remaining</span>
      </div>

      <Progress value={percentUsed} className="h-2 mb-3" />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {used}/{totalFree} used
        </p>

        <Button variant="outline" size="sm" onClick={handleConnectWalletClick} className="gap-1.5">
          <Wallet className="h-3.5 w-3.5" />
          <span>Connect Wallet</span>
        </Button>
      </div>

      <ConnectWallet
        isOpen={showConnectWallet}
        onClose={() => setShowConnectWallet(false)}
        onSuccess={handleWalletConnected}
      />
    </div>
  )
}
