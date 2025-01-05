"use client"

import { useState } from 'react'
import { CalendarView } from './calendar-view'
import { SidePanel } from './side-panel'
import { CalendarTopBar } from './calendar-top-bar'
import { TooltipProvider } from "@/components/ui/tooltip"
import { addDays, startOfMonth, endOfMonth } from 'date-fns'
import { CreatePostModal } from './create-post-modal'
import { PostPreviewModal } from './post-preview-modal'
import { CalendarInsights } from './calendar-insights'
import { Button } from "@/components/ui/button"
import { Award } from 'lucide-react'
import Link from 'next/link'

export function ContentCalendar() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filters, setFilters] = useState({
    platforms: [],
    categories: [],
    contentTypes: [],
    performance: null
  })
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Growth Strategies for Startups',
      start: addDays(new Date(), 1),
      end: addDays(new Date(), 1),
      category: 'Growth',
      platform: 'linkedin',
      contentType: 'Post',
      status: 'scheduled',
      content: 'Discover key growth strategies for your startup in 2023...',
      engagementRate: 8.5
    },
    {
      id: 2,
      title: 'Weekly Industry Insights',
      start: addDays(new Date(), 3),
      end: addDays(new Date(), 3),
      category: 'Knowledge',
      platform: 'twitter',
      contentType: 'Thread',
      status: 'published',
      content: 'Stay updated with the latest trends in tech industry...',
      engagementRate: 7.2
    },
    {
      id: 3,
      title: 'Leadership in Crisis',
      start: addDays(new Date(), 5),
      end: addDays(new Date(), 5),
      category: 'Authority',
      platform: 'youtube',
      contentType: 'Video',
      status: 'draft',
      content: 'Learn how to lead effectively during challenging times...',
      engagementRate: 0
    },
  ])
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const handleCreatePost = (newPost) => {
    setEvents([...events, { ...newPost, id: events.length + 1 }])
    setIsCreatePostModalOpen(false)
  }

  const handleUpdatePost = (updatedPost) => {
    setEvents(events.map(event => event.id === updatedPost.id ? updatedPost : event))
    setSelectedPost(null)
  }

  const handleDeletePost = (postId) => {
    setEvents(events.filter(event => event.id !== postId))
    setSelectedPost(null)
  }

  const handleDragPost = (postId, newStart) => {
    setEvents(events.map(event => 
      event.id === postId ? { ...event, start: newStart, end: newStart } : event
    ))
  }

  const handleDuplicatePost = (post) => {
    const newPost = { ...post, id: events.length + 1, start: addDays(post.start, 1), end: addDays(post.end, 1) }
    setEvents([...events, newPost])
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <CalendarTopBar 
            view={view} 
            setView={setView}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            filters={filters}
            setFilters={setFilters}
            onCreatePost={() => setIsCreatePostModalOpen(true)}
          />
          <Link href="/rewards" passHref>
            <Button variant="outline">
              <Award className="mr-2 h-4 w-4" /> Rewards
            </Button>
          </Link>
        </div>
        <CalendarInsights events={events} />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow">
            <CalendarView 
              view={view} 
              currentDate={currentDate}
              filters={filters}
              events={events}
              onSelectPost={setSelectedPost}
              onDragPost={handleDragPost}
            />
          </div>
          <SidePanel 
            events={events}
            onCreatePost={() => setIsCreatePostModalOpen(true)}
            onSelectPost={setSelectedPost}
          />
        </div>
        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          onCreatePost={handleCreatePost}
        />
        {selectedPost && (
          <PostPreviewModal
            post={selectedPost}
            isOpen={!!selectedPost}
            onClose={() => setSelectedPost(null)}
            onUpdate={handleUpdatePost}
            onDelete={handleDeletePost}
            onDuplicate={handleDuplicatePost}
          />
        )}
      </div>
    </TooltipProvider>
  )
}

