"use client"

import { Bell, Plus, Search, PanelLeftClose } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "./theme-toggle"

interface TopNavProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function TopNav({ isCollapsed, toggleSidebar }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-border bg-background px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="mr-2 text-muted-foreground hover:text-foreground"
      >
        <PanelLeftClose className="h-5 w-5" />
      </Button>
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="w-full pl-10 pr-4 py-2 bg-background border-border text-foreground placeholder-muted-foreground
                       focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200" 
            placeholder="Search templates..." 
          />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button 
            size="icon" 
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-foreground focus:bg-muted focus:text-foreground">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground focus:bg-muted focus:text-foreground">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground focus:bg-muted focus:text-foreground">Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-foreground focus:bg-muted focus:text-foreground">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

