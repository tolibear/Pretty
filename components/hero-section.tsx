import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Generate <span className="text-primary">on-brand</span> AI images with styles from top creators
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Pretty makes it effortless for anyone to create stunning AI-powered images by remixing publicly shared
            styles crafted by creators. Every paid generation automatically routes 42% of revenue to the creator.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/explore">Start Generating</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/create">Become a Creator</Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src="/images/cyberpunk-neon.png"
              alt="Neon Dreams style example"
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src="/images/vintage-film.png"
              alt="Vintage Film style example"
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <img
              src="/images/abstract-waves.png"
              alt="Abstract Waves style example"
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
