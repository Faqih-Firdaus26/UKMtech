"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  imageUrl: string
  height?: string
  className?: string
}

export default function ParallaxSection({ children, imageUrl, height = "100vh", className }: ParallaxSectionProps) {
  const [isMobile, setIsMobile] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <section className={cn("relative flex items-center overflow-hidden", className)} style={{ height }}>
      <motion.div className="absolute inset-0 z-0" style={{ y: isMobile ? 0 : y }}>
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </motion.div>
      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}

