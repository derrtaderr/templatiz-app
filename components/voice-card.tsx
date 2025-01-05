"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface VoiceCardProps {
  voice: {
    id: number
    name: string
    description: string[]
    isPlaying?: boolean
  }
  onSelect: () => void
}

export function VoiceCard({ voice, onSelect }: VoiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsPlaying(!isPlaying)
  }

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "group relative flex items-center gap-4 p-4 transition-all duration-200 hover:bg-accent/5",
          "cursor-pointer border-transparent hover:border-accent/20",
          "transform hover:scale-[1.02]"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handlePlay}
              className={cn(
                "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                "bg-primary/10 text-primary transition-all duration-200",
                "hover:bg-primary hover:text-primary-foreground",
                "group-hover:scale-110"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Preview Voice</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-sm">{voice.name}</h3>
          <div className="flex flex-wrap gap-1">
            {voice.description.map((desc, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs font-normal"
              >
                {desc}
              </Badge>
            ))}
          </div>
        </div>

        {isPlaying && (
          <div className="absolute inset-0 -z-10 animate-pulse bg-primary/5" />
        )}
      </Card>
    </TooltipProvider>
  )
}

