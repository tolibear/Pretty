"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Wallet, ArrowRight, Loader2 } from "lucide-react"

interface ConnectWalletProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  reason?: "payment" | "publish" | "withdraw" | "general"
}

export function ConnectWallet({ isOpen, onClose, onSuccess, reason = "general" }: ConnectWalletProps) {
  const [isConnecting, setIsConnecting] = React.useState<boolean>(false)
  const [selectedWallet, setSelectedWallet] = React.useState<string | null>(null)

  const reasonText = {
    payment: "to complete your payment",
    publish: "to publish your style",
    withdraw: "to withdraw your earnings",
    general: "to continue",
  }

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "M22.4 3.6l-8.1 6.3 1.5-3.5L22.4 3.6z M12.4 14.5l-1.1-1.6 8.9-6.2-7.8 7.8z M22.7 12.2v6.8l-3.7-2.1 3.7-4.7z M10.1 14.9l2.2 3.2-3.9 1.8 1.7-5z M14.7 18.1l-2.2-3.2 1.1-1.1 1.1 4.3z M10.4 19.9l3.9-1.8 3.5 1.8-3.5 2.1-3.9-2.1z M18.3 18.1l3.7 2.1v3.5l-7.2-4.2 3.5-1.4z M22 22.5l-3.7-2.1 3.7-2.1v4.2z",
      color: "#E17726",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 20c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-15c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z",
      color: "#0052FF",
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "M6.2 10.8C10.1 7 16.3 7 20.2 10.8c.2.2.2.5 0 .7l-1.9 1.9c-.1.1-.2.1-.3 0-2.9-2.9-7.5-2.9-10.4 0-.1.1-.3.1-.3 0l-1.9-1.9c-.2-.2-.2-.5 0-.7zm3.8 3.8c1.8-1.8 4.6-1.8 6.4 0 .2.2.2.5 0 .7l-1.9 1.9c-.1.1-.2.1-.3 0-.6-.6-1.5-.6-2.1 0-.1.1-.3.1-.3 0l-1.9-1.9c-.1-.2-.1-.5.1-.7z",
      color: "#3B99FC",
    },
  ]

  const handleConnect = async (walletId: string) => {
    setSelectedWallet(walletId)
    setIsConnecting(true)

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsConnecting(false)

    toast({
      title: "Wallet connected!",
      description: `Your ${wallets.find((w) => w.id === walletId)?.name} wallet has been connected successfully.`,
    })

    onClose()
    if (onSuccess) onSuccess()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect your wallet
          </DialogTitle>
          <DialogDescription>
            Connect your wallet {reasonText[reason]}. Choose your preferred wallet provider below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="w-full justify-between h-14 px-4"
              onClick={() => handleConnect(wallet.id)}
              disabled={isConnecting}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ color: wallet.color }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d={wallet.icon} />
                  </svg>
                </div>
                <span>{wallet.name}</span>
              </div>
              {isConnecting && selectedWallet === wallet.id ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          ))}
        </div>
        <DialogFooter className="flex flex-col space-y-2">
          <div className="text-xs text-muted-foreground text-center">
            By connecting your wallet, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
