"use client"

import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard if at the root path
    if (window.location.pathname === '/') {
      router.push('/dashboard')
    }
  }, [router])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <AppSidebar isCollapsed={isCollapsed} />
            <div className="flex flex-1 flex-col overflow-hidden">
              <TopNav isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
              <main className="flex-1 overflow-auto bg-background p-6">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

