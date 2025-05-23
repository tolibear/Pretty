"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Upload, Sparkles, AlertCircle, Loader2 } from "lucide-react"
import { GeneratorModal } from "@/components/generator-modal"
import { ConnectWallet } from "@/components/wallet/connect-wallet"

interface GenerateImageModalProps {
  isOpen: boolean
  onClose: () => void
  style: any
}

export function GenerateImageModal({ isOpen, onClose, style }: GenerateImageModalProps) {
  const [prompt, setPrompt] = useState("")
  const [selectedRatio, setSelectedRatio] = useState(style.inputRequirements.supportedRatios[0])
  const [selectedCoin, setSelectedCoin] = useState(style.pricing.acceptedCoins[0])
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showConnectWallet, setShowConnectWallet] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [freeGenerationsRemaining, setFreeGenerationsRemaining] = useState(15) // Example: 15 remaining out of 20

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = () => {
    if (freeGenerationsRemaining <= 0 && !walletConnected) {
      setShowConnectWallet(true)
      return
    }

    setIsGenerating(true)
    // In a real app, this would call an API to generate the image
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      // If user has free generations, decrement the count
      if (freeGenerationsRemaining > 0) {
        setFreeGenerationsRemaining((prev) => prev - 1)
      }

      onClose()
      setIsGenerating(false)
    }, 1000)
  }

  const isPromptValid = style.inputRequirements.textPromptRequired ? prompt.trim().length > 0 : true

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Make with {style.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">
                Text Prompt {style.inputRequirements.textPromptRequired && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id="prompt"
                placeholder="Describe what you want to make..."
                value={prompt}
                onChange={handlePromptChange}
                className="min-h-[100px]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{prompt.length} / 200 characters</span>
                {style.inputRequirements.textPromptRequired && prompt.trim().length === 0 && (
                  <span className="text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Text prompt is required
                  </span>
                )}
              </div>
            </div>

            {style.inputRequirements.imageInputAllowed && (
              <div className="space-y-2">
                <Label>Reference Image (Optional)</Label>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageUpload}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        Browse
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded reference"
                      className="w-full h-40 object-contain rounded-lg border border-border"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setUploadedImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <RadioGroup defaultValue={selectedRatio} onValueChange={setSelectedRatio} className="flex gap-4">
                {style.inputRequirements.supportedRatios.map((ratio: string) => (
                  <div key={ratio} className="flex items-center space-x-2">
                    <RadioGroupItem value={ratio} id={`ratio-${ratio}`} />
                    <Label htmlFor={`ratio-${ratio}`} className="cursor-pointer">
                      {ratio}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Payment</Label>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>42% to creator</span>
                </div>
              </div>

              <Select defaultValue={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coin" />
                </SelectTrigger>
                <SelectContent>
                  {style.pricing.acceptedCoins.map((coin: string) => (
                    <SelectItem key={coin} value={coin}>
                      <div className="flex justify-between items-center w-full">
                        <span>{coin}</span>
                        <span className="text-muted-foreground">{style.pricing.estimatedPrice[coin]}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span>Base price</span>
                  <span>
                    {style.pricing.estimatedPrice[selectedCoin]} {selectedCoin}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Creator royalty (42%)</span>
                  <span>
                    {(Number.parseFloat(style.pricing.estimatedPrice[selectedCoin]) * 0.42).toFixed(
                      selectedCoin === "PENGU" ? 0 : 4,
                    )}{" "}
                    {selectedCoin}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>
                    {style.pricing.estimatedPrice[selectedCoin]} {selectedCoin}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Free generations remaining: {freeGenerationsRemaining}</span>
                </div>
                {freeGenerationsRemaining <= 5 && !walletConnected && (
                  <div className="text-xs text-amber-500 mt-1">
                    Connect your wallet to continue after free generations are used.
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleGenerate} disabled={!isPromptValid || isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Making...
                </>
              ) : (
                "Make Image"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConnectWallet
        isOpen={showConnectWallet}
        onClose={() => setShowConnectWallet(false)}
        onSuccess={() => {
          setWalletConnected(true)
          handleGenerate()
        }}
        reason="payment"
      />
      <GeneratorModal isOpen={isGenerating} onClose={() => setIsGenerating(false)} style={style} />
    </>
  )
}
