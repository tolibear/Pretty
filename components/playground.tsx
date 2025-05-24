"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { StyleSelector } from "@/components/style-selector"
import { GenerationHistory } from "@/components/generation-history"
import { GenerationProcess } from "@/components/generation-process"
import { ImageViewer } from "@/components/image-viewer"
import { ImageUrls } from "@/lib/image-service"
import {
  AlertCircle,
  Download,
  Heart,
  ImageIcon,
  Info,
  Loader2,
  MessageSquare,
  RefreshCw,
  Share2,
  Sparkles,
  Upload,
  Wand2,
  Shuffle,
} from "lucide-react"

export function Playground() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const styleId = searchParams.get("style")

  const [selectedStyle, setSelectedStyle] = useState<any>(null)
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [showImageViewer, setShowImageViewer] = useState(false)
  const [activeTab, setActiveTab] = useState("generate")
  const [advancedSettings, setAdvancedSettings] = useState(false)
  const [seed, setSeed] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [guidanceScale, setGuidanceScale] = useState([7])
  const [generationHistory, setGenerationHistory] = useState<any[]>([])
  const [savedPrompts, setSavedPrompts] = useState<string[]>([])

  // Load the selected style based on URL param
  useEffect(() => {
    if (styleId) {
      const style = styles.find((s) => s.id === styleId)
      if (style) {
        setSelectedStyle(style)
      }
    }
  }, [styleId])

  const handleStyleSelect = (style: any) => {
    setSelectedStyle(style)
    // Update URL with selected style
    router.push(`/playground?style=${style.id}`)
  }

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleAspectRatioChange = (value: string) => {
    setAspectRatio(value)
  }

  const handleReferenceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setReferenceImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveReferenceImage = () => {
    setReferenceImage(null)
  }

  const handleSavePrompt = () => {
    if (prompt && !savedPrompts.includes(prompt)) {
      setSavedPrompts([...savedPrompts, prompt])
      toast({
        title: "Prompt saved",
        description: "Your prompt has been saved for future use.",
      })
    }
  }

  const handleUseSavedPrompt = (savedPrompt: string) => {
    setPrompt(savedPrompt)
  }

  const handleGenerate = () => {
    if (!selectedStyle) {
      toast({
        title: "No style selected",
        description: "Please select a style before remixing.",
        variant: "destructive",
      })
      return
    }

    if (!prompt.trim() && selectedStyle.inputRequirements.textPromptRequired) {
      toast({
        title: "Prompt required",
        description: "This style requires a text prompt.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedImage(null)

    // Simulate generation process
    setTimeout(() => {
      // For demo purposes, we'll use a generated image based on the prompt and style
      const generatedResult = ImageUrls.generationResult(prompt, selectedStyle.category || "abstract", aspectRatio, "premium")
      setGeneratedImage(generatedResult)
      setIsGenerating(false)

      // Add to history
      const newHistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        style: selectedStyle,
        prompt,
        aspectRatio,
        image: generatedResult,
        settings: {
          seed: seed || "random",
          negativePrompt,
          guidanceScale: guidanceScale[0],
        },
      }

      setGenerationHistory([newHistoryItem, ...generationHistory])
    }, 3000)
  }

  const handleViewImage = () => {
    setShowImageViewer(true)
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share options",
      description: "Sharing options will appear here.",
    })
  }

  const handleLike = () => {
    toast({
      title: "Image liked",
      description: "This image has been added to your favorites.",
    })
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  const isPromptValid = !selectedStyle?.inputRequirements.textPromptRequired || prompt.trim().length > 0

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">Playground</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Remix</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-6 mt-6">
              {!selectedStyle ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Style</CardTitle>
                    <CardDescription>Choose a style to start remixing images.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StyleSelector onStyleSelect={handleStyleSelect} />
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle>Selected Style: {selectedStyle.title}</CardTitle>
                        <CardDescription>
                          Created by {selectedStyle.creator.handle} • {selectedStyle.stats.generations.toLocaleString()}{" "}
                          remixes
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedStyle(null)}>
                        Change Style
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedStyle.coverImage || ImageUrls.placeholder(80, 80, selectedStyle.title)}
                          alt={selectedStyle.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{selectedStyle.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedStyle.tags.map((tag: string) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Remix Settings</CardTitle>
                      <CardDescription>Configure your image remix settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="prompt">
                            Text Prompt {selectedStyle.inputRequirements.textPromptRequired && "(Required)"}
                          </Label>
                          <div className="mt-1.5 relative">
                            <Textarea
                              id="prompt"
                              placeholder="Describe what you want to remix..."
                              value={prompt}
                              onChange={handlePromptChange}
                              className="min-h-[100px] pr-20"
                            />
                            <div className="absolute right-2 bottom-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2"
                                onClick={handleSavePrompt}
                                disabled={!prompt.trim()}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                          {savedPrompts.length > 0 && (
                            <div className="mt-2">
                              <Label className="text-xs text-muted-foreground">Saved Prompts</Label>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {savedPrompts.map((savedPrompt, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-secondary"
                                    onClick={() => handleUseSavedPrompt(savedPrompt)}
                                  >
                                    {savedPrompt.length > 30 ? savedPrompt.substring(0, 30) + "..." : savedPrompt}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {selectedStyle.inputRequirements.imageInputAllowed && (
                          <div>
                            <Label>Reference Image (Optional)</Label>
                            {!referenceImage ? (
                              <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center">
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="h-8 w-8 text-muted-foreground" />
                                  <p className="text-sm text-muted-foreground">
                                    Drag and drop an image, or click to browse
                                  </p>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="image-upload"
                                    onChange={handleReferenceImageUpload}
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
                              <div className="mt-1.5 relative">
                                <img
                                  src={referenceImage || ImageUrls.placeholder(400, 160, "Reference Image")}
                                  alt="Reference"
                                  className="w-full h-40 object-contain rounded-lg border border-border"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={handleRemoveReferenceImage}
                                >
                                  Remove
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        <div>
                          <Label>Aspect Ratio</Label>
                          <RadioGroup
                            defaultValue={aspectRatio}
                            onValueChange={handleAspectRatioChange}
                            className="flex flex-wrap gap-4 mt-1.5"
                          >
                            {selectedStyle.inputRequirements.supportedRatios.map((ratio: string) => (
                              <div key={ratio} className="flex items-center space-x-2">
                                <RadioGroupItem value={ratio} id={`ratio-${ratio}`} />
                                <Label htmlFor={`ratio-${ratio}`} className="cursor-pointer">
                                  {ratio}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="advanced-settings"
                              checked={advancedSettings}
                              onCheckedChange={setAdvancedSettings}
                            />
                            <Label htmlFor="advanced-settings">Advanced Settings</Label>
                          </div>
                        </div>

                        {advancedSettings && (
                          <div className="space-y-4 pt-2">
                            <Separator />
                            <div>
                              <Label htmlFor="seed">Seed (Optional)</Label>
                              <Input
                                id="seed"
                                placeholder="Leave empty for random seed"
                                value={seed}
                                onChange={(e) => setSeed(e.target.value)}
                                className="mt-1.5"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Using the same seed will produce similar results for the same prompt.
                              </p>
                            </div>

                            <div>
                              <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
                              <Textarea
                                id="negative-prompt"
                                placeholder="Describe what you want to avoid in the generation..."
                                value={negativePrompt}
                                onChange={(e) => setNegativePrompt(e.target.value)}
                                className="mt-1.5 min-h-[80px]"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Specify elements you want to exclude from the generated image.
                              </p>
                            </div>

                            <div>
                              <div className="flex justify-between">
                                <Label htmlFor="guidance-scale">Guidance Scale: {guidanceScale[0]}</Label>
                              </div>
                              <Slider
                                id="guidance-scale"
                                min={1}
                                max={20}
                                step={0.1}
                                value={guidanceScale}
                                onValueChange={setGuidanceScale}
                                className="mt-1.5"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>Less adherence to prompt</span>
                                <span>More adherence to prompt</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>42% to creator</span>
                        </div>
                      </div>
                      <Button onClick={handleGenerate} disabled={isGenerating || !isPromptValid}>
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Remixing...
                          </>
                        ) : (
                          <>
                            <Shuffle className="mr-2 h-4 w-4" />
                            Remix Image
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                  {isGenerating && <GenerationProcess />}

                  {generatedImage && !isGenerating && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Remixed Result</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
                          <img
                            src={generatedImage || ImageUrls.placeholder(400, 400, "Generated Image")}
                            alt="Generated image"
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleLike}>
                            <Heart className="h-4 w-4 mr-2" />
                            Like
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleShare}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleRegenerate}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Remix Again
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleDownload}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" onClick={handleViewImage}>
                            View Full
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Remix History</CardTitle>
                  <CardDescription>Your recent remixes in the playground.</CardDescription>
                </CardHeader>
                <CardContent>
                  <GenerationHistory history={generationHistory} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Playground Tips</CardTitle>
              <CardDescription>Tips for getting the best results.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Free Generations</AlertTitle>
                <AlertDescription>
                  You have 5 free generations remaining today. Upgrade to Pro for unlimited generations.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Be Specific</h4>
                    <p className="text-xs text-muted-foreground">
                      Detailed prompts with specific descriptions yield better results than vague ones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Reference Images</h4>
                    <p className="text-xs text-muted-foreground">
                      Upload reference images to guide the generation towards a specific look or subject.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <AlertCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Negative Prompts</h4>
                    <p className="text-xs text-muted-foreground">
                      Use negative prompts to specify what you don't want in the generated image.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Experiment</h4>
                    <p className="text-xs text-muted-foreground">
                      Try different styles, prompts, and settings to discover unique combinations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Styles</CardTitle>
              <CardDescription>Trending styles to try in the playground.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularStyles.map((style) => (
                  <div
                    key={style.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                    onClick={() => handleStyleSelect(style)}
                  >
                    <img
                      src={style.coverImage || "/placeholder.svg"}
                      alt={style.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{style.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{style.creator.handle}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {style.stats.generations.toLocaleString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {generatedImage && (
        <ImageViewer
          isOpen={showImageViewer}
          onClose={() => setShowImageViewer(false)}
          image={generatedImage}
          style={selectedStyle}
        />
      )}
    </div>
  )
}

// Sample data
const styles = [
  {
    id: "1",
    title: "Neon Dreams",
    category: "cyberpunk",
    description:
      "Vibrant cyberpunk aesthetics with neon-lit cityscapes, perfect for futuristic scenes with a touch of nostalgia. Creates stunning night scenes with glowing elements.",
    creator: {
      name: "Alex Rivera",
      handle: "@neonartist",
      avatar: ImageUrls.creatorAvatar("neonartist"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Neon Dreams", "cyberpunk"),
    examples: ImageUrls.styleExamples("Neon Dreams", "cyberpunk", 6),
    stats: {
      likes: 1243,
      generations: 5621,
      published: "2 weeks ago",
    },
    pricing: {
      baseMultiplier: 2,
      acceptedCoins: ["ETH", "USDC", "PENGU"],
      estimatedPrice: {
        ETH: "0.0012",
        USDC: "3.50",
        PENGU: "420",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: true,
      supportedRatios: ["1:1", "4:5", "16:9"],
    },
    tags: ["cyberpunk", "neon", "city", "futuristic", "night"],
  },
  {
    id: "2",
    title: "Vintage Film",
    category: "vintage",
    description:
      "Classic film aesthetics with grain, light leaks, and warm tones. Perfect for creating nostalgic, timeless imagery with a touch of analog imperfection.",
    creator: {
      name: "Jamie Chen",
      handle: "@retrovisuals",
      avatar: ImageUrls.creatorAvatar("retrovisuals"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Vintage Film", "vintage"),
    examples: ImageUrls.styleExamples("Vintage Film", "vintage", 4),
    stats: {
      likes: 982,
      generations: 4210,
      published: "3 weeks ago",
    },
    pricing: {
      baseMultiplier: 1.5,
      acceptedCoins: ["ETH", "USDC"],
      estimatedPrice: {
        ETH: "0.0009",
        USDC: "2.75",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: true,
      supportedRatios: ["1:1", "4:5", "3:2"],
    },
    tags: ["vintage", "film", "retro", "analog", "nostalgic"],
  },
  {
    id: "3",
    title: "Abstract Waves",
    category: "abstract",
    description:
      "Fluid, colorful abstract patterns with smooth gradients and dynamic wave-like forms. Ideal for creating modern, artistic backgrounds and textures.",
    creator: {
      name: "Sam Wilson",
      handle: "@wavecreator",
      avatar: ImageUrls.creatorAvatar("wavecreator"),
      verified: false,
    },
    coverImage: ImageUrls.styleImage("Abstract Waves", "abstract"),
    examples: ImageUrls.styleExamples("Abstract Waves", "abstract", 4),
    stats: {
      likes: 756,
      generations: 3150,
      published: "1 month ago",
    },
    pricing: {
      baseMultiplier: 1.2,
      acceptedCoins: ["USDC", "PENGU"],
      estimatedPrice: {
        USDC: "2.25",
        PENGU: "270",
      },
    },
    inputRequirements: {
      textPromptRequired: false,
      imageInputAllowed: true,
      supportedRatios: ["1:1", "16:9", "9:16"],
    },
    tags: ["abstract", "waves", "fluid", "colorful", "modern"],
  },
  {
    id: "4",
    title: "Pixel Art",
    category: "pixel",
    description:
      "Retro pixel art style reminiscent of classic video games. Creates charming, nostalgic imagery with distinct pixelated edges and limited color palettes.",
    creator: {
      name: "Taylor Kim",
      handle: "@pixelmaster",
      avatar: ImageUrls.creatorAvatar("pixelmaster"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Pixel Art", "pixel"),
    examples: ImageUrls.styleExamples("Pixel Art", "pixel", 4),
    stats: {
      likes: 1089,
      generations: 4890,
      published: "2 months ago",
    },
    pricing: {
      baseMultiplier: 1.8,
      acceptedCoins: ["ETH", "USDC", "PENGU"],
      estimatedPrice: {
        ETH: "0.0011",
        USDC: "3.25",
        PENGU: "390",
      },
    },
    inputRequirements: {
      textPromptRequired: true,
      imageInputAllowed: false,
      supportedRatios: ["1:1", "4:3"],
    },
    tags: ["pixel", "retro", "game", "8bit", "nostalgic"],
  },
]

const popularStyles = [
  {
    id: "1",
    title: "Neon Dreams",
    creator: {
      handle: "@neonartist",
    },
    coverImage: ImageUrls.styleImage("Neon Dreams", "cyberpunk"),
    stats: {
      generations: 5621,
    },
  },
  {
    id: "4",
    title: "Pixel Art",
    creator: {
      handle: "@pixelmaster",
    },
    coverImage: ImageUrls.styleImage("Pixel Art", "pixel"),
    stats: {
      generations: 4890,
    },
  },
  {
    id: "2",
    title: "Vintage Film",
    creator: {
      handle: "@retrovisuals",
    },
    coverImage: ImageUrls.styleImage("Vintage Film", "vintage"),
    stats: {
      generations: 4210,
    },
  },
  {
    id: "5",
    title: "Watercolor Dreams",
    creator: {
      handle: "@watercolorist",
    },
    coverImage: ImageUrls.styleImage("Watercolor Dreams", "watercolor"),
    stats: {
      generations: 3850,
    },
  },
  {
    id: "3",
    title: "Abstract Waves",
    creator: {
      handle: "@wavecreator",
    },
    coverImage: ImageUrls.styleImage("Abstract Waves", "abstract"),
    stats: {
      generations: 3150,
    },
  },
]
