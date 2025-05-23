"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Search, Menu, Bell, Wallet } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ConnectWallet } from "@/components/wallet/connect-wallet"
import React from "react"

export function SiteHeader() {
  const [showConnectWallet, setShowConnectWallet] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl">Pretty.af</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-zinc-800/50 to-zinc-800 p-6 no-underline outline-none focus:shadow-md"
                            href="/trending"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">Trending Styles</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Discover the most popular styles being used right now
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link href="/featured" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Featured</NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/new" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>New Arrivals</NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/categories" legacyBehavior passHref>
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>Categories</NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/creators" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Creators</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/playground" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Playground</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
          <div className="hidden md:flex gap-2">
            <Button variant="outline" onClick={() => setShowConnectWallet(true)}>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/explore" className="text-lg font-medium">
                  Explore
                </Link>
                <Link href="/creators" className="text-lg font-medium">
                  Creators
                </Link>
                <Link href="/playground" className="text-lg font-medium">
                  Playground
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowConnectWallet(true)}>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <ConnectWallet isOpen={showConnectWallet} onClose={() => setShowConnectWallet(false)} />
    </header>
  )
}
