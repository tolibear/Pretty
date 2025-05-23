import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CategoryNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The category you're looking for doesn't exist or may have been removed.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/categories">Browse Categories</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
