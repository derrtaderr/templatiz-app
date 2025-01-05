import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Youtube, Edit, Trash2, GripVertical } from 'lucide-react'

interface QueuedPostProps {
  post: {
    id: number
    title: string
    platform: 'linkedin' | 'twitter' | 'youtube'
  }
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function QueuedPost({ post, onEdit, onDelete }: QueuedPostProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-background rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
        {post.platform === 'linkedin' ? (
          <Linkedin className="h-4 w-4 text-blue-600" />
        ) : post.platform === 'twitter' ? (
          <Twitter className="h-4 w-4 text-sky-500" />
        ) : (
          <Youtube className="h-4 w-4 text-red-600" />
        )}
        <p className="text-sm font-medium">{post.title}</p>
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

