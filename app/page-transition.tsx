"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function PageTransition() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return null
}

