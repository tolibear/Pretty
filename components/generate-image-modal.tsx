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
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Sparkles, AlertCircle, Loader2, X, Image as ImageIcon, Zap, Settings, Wand2 } from "lucide-react"
import { GeneratorModal } from "@/components/generator-modal"
import { ConnectWallet } from "@/components/wallet/connect-wallet"
import { toast } from "sonner"
import { ImageUrls } from "@/lib/image-service"

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
  const [freeGenerationsRemaining, setFreeGenerationsRemaining] = useState(5)
  
  // Advanced parameters
  const [quality, setQuality] = useState<"standard" | "premium">("standard")
  const [creativity, setCreativity] = useState([7])
  const [styleStrength, setStyleStrength] = useState([8])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be smaller than 10MB")
        return
      }
      
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        toast.success("Reference image uploaded")
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
        setFreeGenerationsRemaining((prev: number) => prev - 1)
      }

      onClose()
      setIsGenerating(false)
      toast.success("Image generation started! Check your dashboard for progress.")
    }, 1000)
  }

  const isPromptValid = style.inputRequirements.textPromptRequired ? prompt.trim().length > 0 : true
  const canGenerate = isPromptValid && !isGenerating

  const estimatedTime = quality === "premium" ? "45-60 seconds" : "20-30 seconds"
  const queuePosition = Math.floor(Math.random() * 5) + 1

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Generate with {style.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Prompt Section */}
            <div className="space-y-3">
              <Label htmlFor="prompt" className="text-base font-medium">
                Describe your image {style.inputRequirements.textPromptRequired && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id="prompt"
                placeholder="A cyberpunk cityscape at night with neon lights reflecting on wet streets..."
                value={prompt}
                onChange={handlePromptChange}
                className="min-h-[120px] text-base resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>{prompt.length} / 500 characters</span>
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI-enhanced prompts
                  </Badge>
                </div>
                {style.inputRequirements.textPromptRequired && prompt.trim().length === 0 && (
                  <span className="text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Required
                  </span>
                )}
              </div>
            </div>

            {/* Reference Image Section */}
            {style.inputRequirements.imageInputAllowed && (
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Reference Image (Optional)
                </Label>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-muted rounded-full">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Upload a reference image</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageUpload}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedImage || ImageUrls.placeholder(400, 192, "Reference Image")}
                      alt="Uploaded reference"
                      className="w-full h-48 object-contain rounded-lg border border-border bg-muted"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => {
                        setUploadedImage(null)
                        toast.success("Reference image removed")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Basic Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aspect Ratio */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Aspect Ratio</Label>
                <RadioGroup defaultValue={selectedRatio} onValueChange={setSelectedRatio} className="grid grid-cols-3 gap-2">
                  {style.inputRequirements.supportedRatios.map((ratio: string) => (
                    <div key={ratio} className="flex items-center space-x-2">
                      <RadioGroupItem value={ratio} id={`ratio-${ratio}`} className="sr-only" />
                      <Label 
                        htmlFor={`ratio-${ratio}`} 
                        className={`cursor-pointer flex-1 text-center p-3 border rounded-lg transition-colors ${
                          selectedRatio === ratio 
                            ? "border-primary bg-primary/10 text-primary" 
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {ratio}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quality */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Quality</Label>
                <RadioGroup defaultValue={quality} onValueChange={(value: "standard" | "premium") => setQuality(value)} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="quality-standard" />
                    <Label htmlFor="quality-standard" className="cursor-pointer flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Standard</p>
                          <p className="text-xs text-muted-foreground">1024x1024, ~30 seconds</p>
                        </div>
                        <Badge variant="secondary">Free</Badge>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="quality-premium" />
                    <Label htmlFor="quality-premium" className="cursor-pointer flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Premium</p>
                          <p className="text-xs text-muted-foreground">2048x2048, ~60 seconds</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Pro</Badge>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Advanced Parameters Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="advanced-toggle" className="text-base font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Advanced Settings
              </Label>
              <Switch
                id="advanced-toggle"
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
              />
            </div>

            {/* Advanced Parameters */}
            {showAdvanced && (
              <Card>
                <CardContent className="p-4 space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Creativity Level: {creativity[0]}/10</Label>
                    <Slider
                      value={creativity}
                      onValueChange={setCreativity}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Conservative</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Style Strength: {styleStrength[0]}/10</Label>
                    <Slider
                      value={styleStrength}
                      onValueChange={setStyleStrength}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Subtle</span>
                      <span>Balanced</span>
                      <span>Strong</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Separator />

            {/* Pricing Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Payment</Label>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>42% to creator</span>
                </div>
              </div>

              {/* Free Generations Status */}
              {freeGenerationsRemaining > 0 ? (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                    <Zap className="h-4 w-4" />
                    <span className="font-medium">{freeGenerationsRemaining} free generations remaining</span>
                  </div>
                  <Progress value={(freeGenerationsRemaining / 5) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-green-600 dark:text-green-500">
                    This generation will use 1 of your free credits
                  </p>
                </div>
              ) : (
                <Select defaultValue={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {style.pricing.acceptedCoins.map((coin: string) => (
                      <SelectItem key={coin} value={coin}>
                        <div className="flex justify-between items-center w-full">
                          <span>{coin}</span>
                          <span className="text-muted-foreground ml-4">{style.pricing.estimatedPrice[coin]}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* Cost Breakdown */}
              {freeGenerationsRemaining <= 0 && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base price ({quality})</span>
                    <span>
                      {quality === "premium" 
                        ? (Number.parseFloat(style.pricing.estimatedPrice[selectedCoin]) * 1.5).toFixed(4)
                        : style.pricing.estimatedPrice[selectedCoin]
                      } {selectedCoin}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Creator royalty (42%)</span>
                    <span>
                      {(Number.parseFloat(style.pricing.estimatedPrice[selectedCoin]) * 0.42 * (quality === "premium" ? 1.5 : 1)).toFixed(4)} {selectedCoin}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      {quality === "premium" 
                        ? (Number.parseFloat(style.pricing.estimatedPrice[selectedCoin]) * 1.5).toFixed(4)
                        : style.pricing.estimatedPrice[selectedCoin]
                      } {selectedCoin}
                    </span>
                  </div>
                </div>
              )}

              {/* Generation Info */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700 dark:text-blue-400">Estimated time:</span>
                  <span className="font-medium text-blue-700 dark:text-blue-400">{estimatedTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-blue-700 dark:text-blue-400">Queue position:</span>
                  <span className="font-medium text-blue-700 dark:text-blue-400">#{queuePosition}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleGenerate} 
              disabled={!canGenerate}
              className="w-full sm:w-auto"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {freeGenerationsRemaining > 0 ? "Generate Free" : "Generate Image"}
                </>
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
