import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Youtube } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface ScheduledPostCardProps {
  event: {
    id: number
    title: string
    start: Date
    platform: 'linkedin' | 'twitter' | 'youtube'
    category: string
    contentType: string
    engagementRate: number
  }
  onClick: () => void
}

export function ScheduledPostCard({ event, onClick }: ScheduledPostCardProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="h-3 w-3 text-blue-600" />
      case 'twitter':
        return <Twitter className="h-3 w-3 text-sky-500" />
      case 'youtube':
        return <Youtube className="h-3 w-3 text-red-600" />
      default:
        return null
    }
  }

  const getBackgroundColor = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return 'bg-blue-100 dark:bg-blue-900'
      case 'twitter':
        return 'bg-sky-100 dark:bg-sky-900'
      case 'youtube':
        return 'bg-red-100 dark:bg-red-900'
      default:
        return 'bg-gray-100 dark:bg-gray-800'
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={cn(
            "rounded-md shadow-sm p-2 text-xs cursor-pointer transition-all duration-200 hover:shadow-md",
            getBackgroundColor(event.platform)
          )}
          onClick={onClick}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium">{format(event.start, 'h:mm a')}</span>
            {getPlatformIcon(event.platform)}
          </div>
          <h4 className="font-semibold truncate mb-1">{event.title}</h4>
          <div className="flex justify-between items-center text-xs">
            <span>{event.category}</span>
            <span>{event.contentType}</span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p><strong>{event.title}</strong></p>
        <p>Platform: {event.platform}</p>
        <p>Category: {event.category}</p>
        <p>Type: {event.contentType}</p>
        <p>Engagement Rate: {event.engagementRate.toFixed(1)}%</p>
      </TooltipContent>
    </Tooltip>
  )
}

