"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "@/components/logo"

interface MainNavProps {
  userRole?: "client" | "designer"
}

export function MainNav({ userRole }: MainNavProps) {
  const pathname = usePathname()
  
  const isClient = userRole === "client"
  const isDesigner = userRole === "designer"

  const navItems = [
    ...(isClient 
      ? [
          { name: "Dashboard", href: "/client/dashboard" },
          { name: "New Request", href: "/client/new-request" },
          { name: "My Requests", href: "/client/requests" },
        ] 
      : []),
    ...(isDesigner
      ? [
          { name: "Dashboard", href: "/designer/dashboard" },
          { name: "Available Requests", href: "/designer/requests" },
          { name: "My Work", href: "/designer/my-work" },
        ]
      : []),
    { name: "Account", href: `/${userRole}/account` },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col gap-8 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-foreground",
                        pathname === item.href
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            
            <Link href={userRole ? `/${userRole}/dashboard` : "/"}>
              <Logo iconClassName="[&>svg]:h-5 [&>svg]:w-5" />
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-all duration-200 hover:text-foreground relative",
                    pathname === item.href
                      ? "text-foreground after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" asChild className="transition-all duration-200 hover:bg-muted/50">
              <Link href="/auth/login">Log out</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}