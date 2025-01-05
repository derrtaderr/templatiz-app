import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Youtube, Edit, Trash2 } from 'lucide-react'
import { format, isValid } from 'date-fns'

interface UpcomingPostProps {
  post: {
    id: number
    title: string
    date: Date | string // Allow for string dates as well
    platform: 'linkedin' | 'twitter' | 'youtube'
  }
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function UpcomingPost({ post, onEdit, onDelete }: UpcomingPostProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4 text-blue-600" />
      case 'twitter':
        return <Twitter className="h-4 w-4 text-sky-500" />
      case 'youtube':
        return <Youtube className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const formatDate = (date: Date | string) => {
    const dateObject = typeof date === 'string' ? new Date(date) : date
    return isValid(dateObject) ? format(dateObject, 'MMM d, yyyy HH:mm') : 'Invalid Date'
  }

  return (
    <div className="flex items-center justify-between p-2 bg-background rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        {getPlatformIcon(post.platform)}
        <div>
          <p className="text-sm font-medium">{post.title}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(post.date)}
          </p>
        </div>
      </div>
      <div className="flex space-x-1">
        <Button variant="ghost" size="sm" onClick={() => onEdit(post.id)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

