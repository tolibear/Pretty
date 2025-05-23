import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
  title: "Authentication - Pretty.af",
  description: "Authentication pages for Pretty.af",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="/images/auth-background.png"
            fill
            alt="Authentication background"
            className="object-cover opacity-20"
            priority
          />
        </div>
        <Link href="/" className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Pretty.af
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Pretty.af has transformed how I create and share my AI art styles. The platform is intuitive and the
              community is incredibly supportive."
            </p>
            <footer className="text-sm">Sofia Chen, Digital Artist</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex items-center justify-between">
            <div className="flex lg:hidden">
              <Link href="/" className="flex items-center text-lg font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-6 w-6"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                Pretty.af
              </Link>
            </div>
            <ModeToggle />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
