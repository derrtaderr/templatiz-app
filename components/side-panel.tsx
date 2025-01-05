import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from 'lucide-react'
import { format, addDays } from 'date-fns'
import { UpcomingPost } from './upcoming-post'
import { QueuedPost } from './queued-post'

interface SidePanelProps {
  events: Array<{
    id: number
    title: string
    start: Date
    platform: string
    category: string
    contentType: string
    status: string
  }>
  onCreatePost: () => void
  onSelectPost: (post: any) => void
}

export function SidePanel({ events, onCreatePost, onSelectPost }: SidePanelProps) {
  const upcomingPosts = events
    .filter(event => new Date(event.start) > new Date() && new Date(event.start) <= addDays(new Date(), 7))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  const queuedPosts = events.filter(event => event.status === 'draft')

  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingPosts.length > 0 ? (
            <div className="space-y-2">
              {upcomingPosts.map(post => (
                <UpcomingPost key={post.id} post={{...post, date: post.start}} onEdit={() => onSelectPost(post)} onDelete={() => {/* Add delete functionality */}} />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">No upcoming posts in the next 7 days.</p>
              <Button onClick={onCreatePost}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a Post
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Post Queue</CardTitle>
        </CardHeader>
        <CardContent>
          {queuedPosts.length > 0 ? (
            <div className="space-y-2">
              {queuedPosts.map(post => (
                <QueuedPost 
                  key={post.id} 
                  post={post} 
                  onEdit={() => onSelectPost(post)} 
                  onDelete={() => {/* Add delete functionality */}}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">Your post queue is empty.</p>
              <Button onClick={onCreatePost}>
                <Plus className="mr-2 h-4 w-4" />
                Create a Draft
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

