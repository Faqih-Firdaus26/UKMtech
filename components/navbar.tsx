"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/edukasi", label: "Edukasi" },
  { href: "/konsultasi", label: "Konsultasi" },
  // { href: "/komunitas", label: "Komunitas" },
  { href: "/tentang", label: "Tentang" },
  { href: "/hubungi-kami", label: "Hubungi Kami" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-md shadow-md py-3 bg-white/80 dark:bg-ukm-dark/80" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2 rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="UKMtech Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold">
              <span className="text-ukm-primary">UKM</span>
              <span className="text-ukm-secondary">tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-ukm-primary dark:text-ukm-primary"
                    : "text-gray-700 hover:text-ukm-primary dark:text-gray-200 dark:hover:text-ukm-primary",
                )}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={cn("p-2 rounded-full transition-colors", "hover:bg-gray-200 dark:hover:bg-gray-700")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-ukm-dark" />
              )}
            </button>
            <Link href="/hubungi-kami" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Button className="bg-ukm-primary hover:bg-ukm-primary/90 text-white">Mulai Sekarang</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={toggleTheme}
              className={cn("p-2 rounded-full transition-colors", "hover:bg-gray-200 dark:hover:bg-gray-700")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-ukm-dark" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2 rounded-md",
                "text-ukm-dark hover:bg-ukm-background dark:text-ukm-background dark:hover:bg-ukm-dark/50",
              )}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-ukm-dark shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-md font-medium",
                    pathname === link.href
                      ? "text-ukm-primary dark:text-ukm-primary bg-ukm-background/50 dark:bg-ukm-dark/50"
                      : "text-gray-700 dark:text-gray-200 hover:bg-ukm-background/30 dark:hover:bg-ukm-dark/30",
                  )}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                    setIsMenuOpen(false)
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/hubungi-kami"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
              >
                <Button className="w-full mt-2 bg-ukm-primary hover:bg-ukm-primary/90 text-white">
                  Mulai Sekarang
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

