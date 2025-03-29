import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import Chatbot from "@/components/chatbot"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import PageTransition from "./page-transition"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UKMtech - Platform Edukasi dan Konsultasi UKM",
  description:
    "Platform edukasi dan konsultasi terpercaya untuk membantu UKM Indonesia berkembang dan bersaing di era digital.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background dark:bg-ukm-dark text-foreground dark:text-gray-200 min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PageTransition />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
          <ScrollToTop />
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}

