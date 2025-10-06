"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DollarSign } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-4xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden font-bold sm:inline-block">
            Live Currency Converter
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end gap-2">
           <nav className="hidden flex-1 items-center justify-end gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
           <nav className="flex items-center gap-1 md:hidden">
             <Link href="/" passHref>
                <Button variant={pathname === '/' ? 'secondary' : 'ghost'} size="sm">Home</Button>
              </Link>
             <Link href="/about" passHref>
                <Button variant={pathname === '/about' ? 'secondary' : 'ghost'} size="sm">About</Button>
              </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
