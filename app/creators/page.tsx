import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, ChevronRight, Sparkles, TrendingUp, Wallet, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Become a Creator - Pretty.af",
  description: "Share your AI image styles and earn revenue from every creation",
}

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50 z-10" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[50vh] w-full bg-gradient-to-b from-zinc-950 to-background"></div>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-800 to-purple-950 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div className="container relative z-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">42% Revenue Share</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Share your <span className="text-primary">creative styles</span> and earn with every creation
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Join Pretty.af as a creator and share your unique AI image styles with the world. Earn passive income
                whenever someone uses your style to make images.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/dashboard/create-style">Start Creating</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/playground">Try the Playground</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating and sharing styles on Pretty.af is simple. Follow these steps to start earning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Create Your Style</CardTitle>
                <CardDescription>
                  Design a unique AI image style with our intuitive editor. Add examples, configure settings, and define
                  your style's aesthetic.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <img
                  src="/images/style-editor-preview.png"
                  alt="Style Editor"
                  className="rounded-lg border border-border"
                />
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Publish & Share</CardTitle>
                <CardDescription>
                  Publish your style to make it available to all Pretty.af users. Share it on social media to attract more
                  users.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <img
                  src="/images/publish-preview.png"
                  alt="Publishing Interface"
                  className="rounded-lg border border-border"
                />
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Earn Revenue</CardTitle>
                <CardDescription>
                  Earn 42% of the revenue every time someone makes an image with your style. Track earnings in your
                  dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <img
                  src="/images/earnings-preview.png"
                  alt="Earnings Dashboard"
                  className="rounded-lg border border-border"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Creator Dashboard Preview */}
        <section className="bg-muted py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Creator Dashboard</Badge>
                <h2 className="text-3xl font-bold mb-6">Powerful tools to manage your styles</h2>
                <p className="text-muted-foreground mb-8">
                  Our comprehensive creator dashboard gives you everything you need to create, manage, and optimize your
                  styles for maximum earnings.
                </p>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="styles">Styles</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Real-time Performance</h3>
                          <p className="text-sm text-muted-foreground">
                            Track your styles' performance with real-time metrics on creations, revenue, and conversion
                            rates.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Activity Feed</h3>
                          <p className="text-sm text-muted-foreground">
                            See a chronological feed of all activity related to your styles, including creations and
                            earnings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="styles">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Style Management</h3>
                          <p className="text-sm text-muted-foreground">
                            Create, edit, and manage all your styles from one central location. Clone successful styles
                            to iterate quickly.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Performance Insights</h3>
                          <p className="text-sm text-muted-foreground">
                            Get detailed insights into which styles are performing best and why, so you can optimize
                            your portfolio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="earnings">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Wallet className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Revenue Tracking</h3>
                          <p className="text-sm text-muted-foreground">
                            Track your earnings across different cryptocurrencies with detailed breakdowns by style and
                            time period.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Withdrawal Management</h3>
                          <p className="text-sm text-muted-foreground">
                            Easily withdraw your earnings to your wallet with our seamless integration with Abstract
                            Global Wallet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Detailed Analytics</h3>
                          <p className="text-sm text-muted-foreground">
                            Access comprehensive analytics on views, conversions, and revenue to optimize your styles
                            for maximum earnings.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Performance Optimization</h3>
                          <p className="text-sm text-muted-foreground">
                            Get AI-powered recommendations to improve your styles' performance and increase your
                            earnings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8">
                  <Button asChild>
                    <Link href="/dashboard">
                      Explore Dashboard <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/images/dashboard-preview.png"
                  alt="Creator Dashboard"
                  className="rounded-lg border border-border shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-card rounded-lg p-4 shadow-lg border border-border">
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold">$5,231.89</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="container py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Creator Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet some of our top creators who are earning significant revenue by sharing their styles on Pretty.af.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.name} className="overflow-hidden">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={story.styleImage || "/placeholder.svg"}
                    alt={`${story.name}'s style`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-background">
                      <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                      <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-semibold">{story.name}</h3>
                        {story.verified && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{story.handle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{story.quote}</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{story.earnings}</p>
                      <p className="text-muted-foreground">Earnings</p>
                    </div>
                    <div>
                      <p className="font-medium">{story.styles}</p>
                      <p className="text-muted-foreground">Styles</p>
                    </div>
                    <div>
                      <p className="font-medium">{story.creations}</p>
                      <p className="text-muted-foreground">Creations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get answers to common questions about becoming a creator on Pretty.af.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to start earning?</h2>
            <p className="text-muted-foreground mb-8">
              Join Pretty.af today and start sharing your unique AI image styles with the world. Earn passive income with
              every creation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard/create-style">Start Creating</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/playground">Try the Playground</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

// Sample data
const successStories = [
  {
    name: "Alex Rivera",
    handle: "@neonartist",
    avatar: "/images/avatar-1.png",
    verified: true,
    styleImage: "/images/cyberpunk-neon.png",
    quote:
      "I've been able to make over $12,000 in passive income by sharing my cyberpunk styles on Pretty.af. The platform makes it incredibly easy to reach users.",
    earnings: "$12,450",
    styles: "8",
    creations: "5,621",
  },
  {
    name: "Jamie Chen",
    handle: "@retrovisuals",
    avatar: "/images/avatar-2.png",
    verified: true,
    styleImage: "/images/vintage-film.png",
    quote:
      "Pretty.af has allowed me to monetize my passion for vintage aesthetics. The 42% revenue share is incredibly generous compared to other platforms.",
    earnings: "$9,320",
    styles: "6",
    creations: "4,210",
  },
  {
    name: "Taylor Kim",
    handle: "@pixelmaster",
    avatar: "/images/avatar-4.png",
    verified: true,
    styleImage: "/images/pixel-art.png",
    quote:
      "As a pixel artist, I've found a new revenue stream through Pretty.af. The analytics tools help me understand what users want and optimize my styles.",
    earnings: "$7,890",
    styles: "7",
    creations: "4,890",
  },
]

const faqs = [
  {
    question: "How do I become a creator on Pretty.af?",
    answer:
      "Simply sign up for a Pretty.af account, connect your wallet, and start creating styles through our intuitive style editor. Once published, your styles will be available for all users to make with.",
  },
  {
    question: "How much can I earn as a creator?",
    answer:
      "Creators earn 42% of the revenue made when users create images with their styles. Earnings vary based on style popularity and usage, with top creators earning thousands of dollars monthly.",
  },
  {
    question: "What makes a successful style?",
    answer:
      "Successful styles typically have clear, high-quality examples, detailed descriptions, and fill a unique niche. Styles with broad appeal or highly specialized aesthetics tend to perform best.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Earnings are automatically credited to your account in real-time with each creation. You can withdraw your earnings to your connected wallet at any time, with no minimum withdrawal amount.",
  },
  {
    question: "Do I need technical AI knowledge to create styles?",
    answer:
      "No technical knowledge is required. Our style editor is designed to be intuitive and user-friendly, allowing anyone to create compelling styles regardless of technical background.",
  },
  {
    question: "Can I see who is using my styles?",
    answer:
      "Yes, the analytics dashboard provides anonymized data about who is using your styles, including geographic distribution, popular prompts, and usage patterns.",
  },
]
