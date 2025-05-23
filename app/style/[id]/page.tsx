import type { Metadata } from "next"
import { StyleDetail } from "@/components/style-detail"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ImageUrls } from "@/lib/image-service"

interface StylePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: StylePageProps): Promise<Metadata> {
  // In a real app, fetch the style data from an API
  const { id } = await params
  const style = styles.find((s) => s.id === id) || styles[0]

  if (!style) {
    return {
      title: "Style Not Found - Pretty.af",
      description: "The requested style could not be found",
    }
  }

  return {
    title: `${style.title} - Pretty.af`,
    description: style.description,
    openGraph: {
      title: `${style.title} - Pretty.af`,
      description: style.description,
      images: [
        {
          url: style.coverImage,
          width: 1200,
          height: 630,
          alt: style.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${style.title} - Pretty.af`,
      description: style.description,
      images: [style.coverImage],
    },
  }
}

export default async function StylePage({ params }: StylePageProps) {
  // In a real app, fetch the style data from an API
  const { id } = await params
  const style = styles.find((s) => s.id === id) || styles[0]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <StyleDetail style={style} />
      </main>
      <SiteFooter />
    </div>
  )
}

// Sample data - in a real app, this would come from an API
const styles = [
  {
    id: "1",
    title: "Neon Dreams",
    description:
      "Vibrant cyberpunk aesthetics with neon-lit cityscapes, perfect for futuristic scenes with a touch of nostalgia. Creates stunning night scenes with glowing elements.",
    creator: {
      name: "Alex Rivera",
      handle: "@neonartist",
      avatar: ImageUrls.creatorAvatar("neonartist"),
      verified: true,
    },
    coverImage: ImageUrls.styleImage("Neon Dreams", "cyberpunk"),
    examples: [
      ImageUrls.styleImage("Neon Dreams", "cyberpunk"),
      ...ImageUrls.styleExamples("Neon Dreams", "cyberpunk", 5),
    ],
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
]
