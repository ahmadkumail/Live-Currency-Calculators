import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Github, Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#", label: "Pricing" },
    { href: "#", label: "Help" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block text-lg">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">{link.label}</Link>
            ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="hidden md:flex items-center space-x-2">
             <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
           </div>

           <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle>{siteConfig.name}</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-4 mt-8">
                            {navLinks.map(link => (
                                <Link key={link.label} href={link.href} className="text-lg font-medium text-foreground/80">{link.label}</Link>
                            ))}
                        </div>
                         <div className="mt-8 flex flex-col space-y-2">
                            <Button variant="outline">Log In</Button>
                            <Button>Sign Up</Button>
                         </div>
                    </SheetContent>
                </Sheet>
           </div>

        </div>
      </div>
    </header>
  );
}
