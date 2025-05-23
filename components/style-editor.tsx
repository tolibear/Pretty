"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { ImageUploader } from "@/components/image-uploader"
import { StylePreview } from "@/components/style-preview"
import { AlertCircle, ArrowLeft, Check, Info, Loader2, Trash2, X } from "lucide-react"
import Link from "next/link"

const styleFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  tags: z.string().min(3, {
    message: "Please add at least one tag.",
  }),
  baseMultiplier: z.coerce.number().min(1, {
    message: "Base multiplier must be at least 1.",
  }),
  acceptedCoins: z.array(z.string()).min(1, {
    message: "Please select at least one accepted coin.",
  }),
  textPromptRequired: z.boolean(),
  imageInputAllowed: z.boolean(),
  supportedRatios: z.array(z.string()).min(1, {
    message: "Please select at least one supported ratio.",
  }),
  coverImage: z.string().min(1, {
    message: "Please upload a cover image.",
  }),
  examples: z.array(z.string()).min(3, {
    message: "Please upload at least 3 example images.",
  }),
})

type StyleFormValues = z.infer<typeof styleFormSchema>

export function StyleEditor() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImage, setCoverImage] = useState("")
  const [exampleImages, setExampleImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const defaultValues: Partial<StyleFormValues> = {
    title: "",
    description: "",
    tags: "",
    baseMultiplier: 1,
    acceptedCoins: ["USDC"],
    textPromptRequired: true,
    imageInputAllowed: true,
    supportedRatios: ["1:1"],
    coverImage: "",
    examples: [],
  }

  const form = useForm<StyleFormValues>({
    resolver: zodResolver(styleFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      const newTags = [...tags, tagInput.trim().toLowerCase()]
      setTags(newTags)
      form.setValue("tags", newTags.join(","), { shouldValidate: true })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    form.setValue("tags", newTags.join(","), { shouldValidate: true })
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    }
  }

  const handleCoverImageUpload = (url: string) => {
    setCoverImage(url)
    form.setValue("coverImage", url, { shouldValidate: true })
  }

  const handleExampleImageUpload = (url: string) => {
    const newExamples = [...exampleImages, url]
    setExampleImages(newExamples)
    form.setValue("examples", newExamples, { shouldValidate: true })
  }

  const removeExampleImage = (index: number) => {
    const newExamples = [...exampleImages]
    newExamples.splice(index, 1)
    setExampleImages(newExamples)
    form.setValue("examples", newExamples, { shouldValidate: true })
  }

  const onSubmit = async (data: StyleFormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to save the style
      console.log("Form data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Style created successfully!",
        description: "Your style has been published and is now available for use.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error creating style",
        description: "There was an error creating your style. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = form.formState.isValid && coverImage && exampleImages.length >= 3

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Style</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="configuration">Configuration</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="publish">Publish</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Style Details</CardTitle>
                      <CardDescription>
                        Provide basic information about your style to help users discover it.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Style Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Neon Dreams" {...field} />
                            </FormControl>
                            <FormDescription>
                              Choose a catchy, descriptive title that reflects your style's aesthetic.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your style's aesthetic, use cases, and unique features..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Provide a detailed description of your style to help users understand what makes it
                              unique.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs py-1">
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="ml-1 text-muted-foreground hover:text-foreground"
                                  >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remove {tag} tag</span>
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add tags (e.g. cyberpunk, neon, portrait)"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                                className="flex-1"
                              />
                              <Button type="button" size="sm" onClick={addTag}>
                                Add
                              </Button>
                            </div>
                            <FormDescription>
                              Add relevant tags to help users discover your style. Press Enter or click Add after each
                              tag.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cover Image</FormLabel>
                            <FormControl>
                              <ImageUploader
                                onImageUploaded={handleCoverImageUpload}
                                currentImage={coverImage}
                                aspectRatio="4:3"
                              />
                            </FormControl>
                            <FormDescription>
                              Upload a high-quality image that represents your style. This will be the main image users
                              see.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setActiveTab("configuration")}>
                        Next: Configuration
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="configuration" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Style Configuration</CardTitle>
                      <CardDescription>Configure pricing and input requirements for your style.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Pricing</h3>
                        <FormField
                          control={form.control}
                          name="baseMultiplier"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Base Price Multiplier</FormLabel>
                              <FormControl>
                                <Input type="number" min={1} max={10} step={0.1} {...field} />
                              </FormControl>
                              <FormDescription>
                                Set a multiplier for the base price. Higher values will result in higher earnings but
                                may reduce conversions.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="acceptedCoins"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Accepted Coins</FormLabel>
                                <FormDescription>
                                  Select which cryptocurrencies you want to accept for your style.
                                </FormDescription>
                              </div>
                              {coins.map((coin) => (
                                <FormField
                                  key={coin.value}
                                  control={form.control}
                                  name="acceptedCoins"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={coin.value}
                                        className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(coin.value)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, coin.value])
                                                : field.onChange(field.value?.filter((value) => value !== coin.value))
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">{coin.label}</FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-6">
                        <h3 className="text-lg font-medium">Input Requirements</h3>
                        <FormField
                          control={form.control}
                          name="textPromptRequired"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Require Text Prompt</FormLabel>
                                <FormDescription>
                                  If checked, users will be required to provide a text prompt when making images.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="imageInputAllowed"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Allow Image Input</FormLabel>
                                <FormDescription>
                                  If checked, users will be able to upload a reference image when making.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="supportedRatios"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Supported Aspect Ratios</FormLabel>
                                <FormDescription>
                                  Select which aspect ratios your style supports for creation.
                                </FormDescription>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                {aspectRatios.map((ratio) => (
                                  <FormField
                                    key={ratio.value}
                                    control={form.control}
                                    name="supportedRatios"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={ratio.value}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(ratio.value)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, ratio.value])
                                                  : field.onChange(
                                                      field.value?.filter((value) => value !== ratio.value),
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal cursor-pointer">{ratio.label}</FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                        Back: Details
                      </Button>
                      <Button variant="outline" type="button" onClick={() => setActiveTab("examples")}>
                        Next: Examples
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="examples" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Example Images</CardTitle>
                      <CardDescription>
                        Upload example images that showcase your style. These will help users understand what your style
                        can make.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="examples"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                              {exampleImages.map((image, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Example ${index + 1}`}
                                    className="w-full aspect-square object-cover rounded-md"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeExampleImage(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove image</span>
                                  </Button>
                                </div>
                              ))}
                              {exampleImages.length < 6 && (
                                <ImageUploader
                                  onImageUploaded={handleExampleImageUpload}
                                  aspectRatio="1:1"
                                  className="aspect-square"
                                />
                              )}
                            </div>
                            <FormDescription>
                              Upload 3-6 example images that showcase your style. These should be high-quality and
                              representative of what users can expect.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Example Image Requirements</AlertTitle>
                        <AlertDescription>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Upload at least 3 example images</li>
                            <li>Images should be high-quality and showcase your style's capabilities</li>
                            <li>Include a variety of subjects and compositions</li>
                            <li>All images must comply with our content policy</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setActiveTab("configuration")}>
                        Back: Configuration
                      </Button>
                      <Button variant="outline" type="button" onClick={() => setActiveTab("publish")}>
                        Next: Publish
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="publish" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review & Publish</CardTitle>
                      <CardDescription>
                        Review your style details and publish it to make it available to users.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Style Preview</h3>
                        <div className="border rounded-lg p-4 bg-card/50">
                          <div className="flex items-center gap-4 mb-4">
                            {coverImage ? (
                              <img
                                src={coverImage || "/placeholder.svg"}
                                alt="Cover"
                                className="w-20 h-20 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                                <span className="text-muted-foreground">No cover</span>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium">{form.watch("title") || "Untitled Style"}</h4>
                              <p className="text-sm text-muted-foreground">@neonartist</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                            {form.watch("description") || "No description provided."}
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {exampleImages.slice(0, 3).map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Example ${index + 1}`}
                                className="w-full aspect-square object-cover rounded-md"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Validation</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {form.watch("title") ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span>Title is provided</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {form.watch("description") && form.watch("description").length >= 20 ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span>Description is at least 20 characters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {tags.length > 0 ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span>At least one tag is added</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {coverImage ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span>Cover image is uploaded</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {exampleImages.length >= 3 ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                            <span>At least 3 example images are uploaded</span>
                          </div>
                        </div>
                      </div>

                      {!isFormValid && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Cannot publish yet</AlertTitle>
                          <AlertDescription>
                            Please complete all required fields before publishing your style.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Terms & Conditions</h3>
                        <div className="flex items-start space-x-3">
                          <Checkbox id="terms" />
                          <div className="space-y-1 leading-none">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                              By publishing this style, you agree to our{" "}
                              <Link href="/terms" className="text-primary hover:underline">
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link href="/content-policy" className="text-primary hover:underline">
                                Content Policy
                              </Link>
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setActiveTab("examples")}>
                        Back: Examples
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline">Save as Draft</Button>
                        <Button type="submit" disabled={!isFormValid || isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Publishing...
                            </>
                          ) : (
                            "Publish Style"
                          )}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Style Preview</CardTitle>
                  <CardDescription>See how your style will appear to users.</CardDescription>
                </CardHeader>
                <CardContent>
                  <StylePreview
                    title={form.watch("title") || "Untitled Style"}
                    description={form.watch("description") || "No description provided."}
                    coverImage={coverImage}
                    examples={exampleImages}
                    tags={tags}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Creator Tips</CardTitle>
                  <CardDescription>Tips for creating a successful style.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quality Over Quantity</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on creating a few high-quality examples rather than many mediocre ones.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Be Specific</h4>
                    <p className="text-sm text-muted-foreground">
                      Clearly describe your style's aesthetic and use cases in the description.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Use Relevant Tags</h4>
                    <p className="text-sm text-muted-foreground">
                      Add tags that accurately represent your style to help users discover it.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Showcase Variety</h4>
                    <p className="text-sm text-muted-foreground">
                      Include examples with different subjects, compositions, and colors.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Optimize Pricing</h4>
                    <p className="text-sm text-muted-foreground">
                      Start with a lower multiplier to attract users, then adjust based on demand.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

const coins = [
  { value: "USDC", label: "USDC" },
  { value: "ETH", label: "ETH" },
  { value: "PENGU", label: "PENGU" },
]

const aspectRatios = [
  { value: "1:1", label: "1:1 (Square)" },
  { value: "4:5", label: "4:5 (Portrait)" },
  { value: "5:4", label: "5:4 (Landscape)" },
  { value: "16:9", label: "16:9 (Widescreen)" },
  { value: "9:16", label: "9:16 (Vertical)" },
  { value: "3:2", label: "3:2 (Classic)" },
]
