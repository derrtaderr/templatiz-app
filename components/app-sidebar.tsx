"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Calendar, Chrome, LayoutGrid, Settings, FileText, Video, Repeat, Mic2, Award } from 'lucide-react'
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { title: "Dashboard", icon: LayoutGrid, href: "/dashboard" },
  { title: "Templates", icon: FileText, href: "/templates" },
  { title: "Content Calendar", icon: Calendar, href: "/calendar" },
  { title: "Content Suite", icon: Repeat, href: "/content-suite" },
  { title: "Video Studio", icon: Video, href: "/video-studio" },
  { title: "Analytics", icon: BarChart3, href: "/analytics" },
  { title: "AI Voice Setup", icon: Mic2, href: "/voice-setup" },
  { title: "Rewards", icon: Award, href: "/rewards" },
  { title: "Profile & Settings", icon: Settings, href: "/settings" },
]

interface AppSidebarProps {
  isCollapsed: boolean;
}

export function AppSidebar({ isCollapsed }: AppSidebarProps) {
  const pathname = usePathname()
  return (
    <>
      <div className="flex flex-col h-full">
        {/* Sidebar content */}
        <div
          className={cn(
            "fixed left-0 flex flex-col h-[100vh] max-h-screen overflow-hidden bg-[#1f2937] text-[#f3f4f6] shadow-lg transition-all duration-300 ease-in-out",
            isCollapsed ? "-translate-x-full" : "translate-x-0",
            "w-64"
          )}
        >
          {/* Logo/Brand section */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-[#374151]">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Templatiz%20logo-V1PoPgCkev0fcgDc2NUfdXj4ylz0cq.png"
                alt="Templatiz Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-semibold">Templatiz</span>
            </Link>
          </div>

          {/* User profile section */}
          <div className="flex items-center p-4 border-b border-[#374151]">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/01.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-[#9ca3af]">Personal account</p>
            </div>
          </div>

          {/* Usage/Credits section */}
          <div className="p-4 border-b border-[#374151]">
            <Progress value={33} className="mb-2" indicatorColor="bg-[#5A73A3]" />
            <div className="space-y-2">
              <p className="text-xs text-[#9ca3af]">10 of 30 templates used</p>
              <p className="text-xs text-[#5A73A3]">Upgrade for $9.99/month</p>
              <Button 
                variant="outline" 
                className="w-full text-xs bg-white text-[#1f2937] hover:bg-[#5A73A3] hover:text-white transition-colors duration-200"
              >
                Upgrade Now
              </Button>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="flex-1 overflow-y-auto py-4 min-h-0">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3.5 text-sm font-medium transition-colors duration-200 group",
                  pathname === item.href
                    ? "text-[#f3f4f6] bg-[#374151]" 
                    : "text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-[#374151]/80"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 mr-3", 
                  pathname === item.href ? "text-[#5A73A3]" : "text-[#9ca3af] group-hover:text-[#f3f4f6]"
                )} />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Extension CTA */}
          <div className="sticky bottom-0 p-4 border-t border-[#374151] bg-[#1f2937]">
            <Button className="w-full bg-gradient-to-r from-[#5A73A3] to-[#6B86BA] text-white hover:from-[#5A73A3]/90 hover:to-[#6B86BA]/90 transition-colors duration-200">
              <Chrome className="h-4 w-4" />
              <span className="ml-2">Install Extension</span>
            </Button>
          </div>
        </div>

        {/* Spacer div to push main content when sidebar is expanded */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-0" : "w-64"
        )} />
      </div>
    </>
  )
}

