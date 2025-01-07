"use client"

import { useState } from 'react'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Award, Edit2, Filter, Plus } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from 'date-fns'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Youtube } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Analytics {
  totalScheduledPosts: number
  averageEngagementRate: number
  mostUsedPlatform: 'linkedin' | 'twitter' | 'youtube'
  upcomingPostsCount: number
}

interface Filters {
  dateRange: {
    start: Date | null
    end: Date | null
  }
  platforms: ('linkedin' | 'twitter' | 'youtube')[]
  contentType: ('text' | 'video')[]
  categories: ('knowledge' | 'growth' | 'authority')[]
}

interface Post {
  id: number
  title: string
  content: string
  platform: 'linkedin' | 'twitter' | 'youtube'
  accountImage: string
  authorName: string
  authorInitials: string
  status: 'scheduled' | 'published' | 'draft'
  scheduledDate: Date
  characterCount: number
  maxCharacters: number
  engagementRate?: number
}

interface EditModalProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
  onSave: (post: Post) => void
  onDelete: (id: number) => void
}

function EditModal({ post, isOpen, onClose, onSave, onDelete }: EditModalProps) {
  if (!post) return null
  const [postToAllPlatforms, setPostToAllPlatforms] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#2d3748] border-[#4b5563] text-[#f3f4f6]">
        <DialogHeader>
          <DialogTitle className="text-[#f3f4f6]">Edit Scheduled Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Tabs defaultValue="content">
            <TabsList className="bg-[#4b5563]">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <div className="space-y-4">
                <textarea
                  className="w-full min-h-[200px] p-4 rounded-md bg-[#374151] border-[#4b5563] text-[#f3f4f6] placeholder-[#9ca3af] focus:ring-[#5A73A3]"
                  defaultValue={post.content}
                  placeholder="Enter your post content..."
                />
              </div>
            </TabsContent>
            <TabsContent value="scheduling">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#9ca3af]">Date</label>
                    <Input
                      type="date"
                      defaultValue={format(post.scheduledDate, 'yyyy-MM-dd')}
                      className="bg-[#374151] border-[#4b5563] text-[#f3f4f6]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#9ca3af]">Time</label>
                    <Input
                      type="time"
                      defaultValue={format(post.scheduledDate, 'HH:mm')}
                      className="bg-[#374151] border-[#4b5563] text-[#f3f4f6]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[#9ca3af]">Platform</label>
                  <Select defaultValue={post.platform}>
                    <SelectTrigger className="bg-[#374151] border-[#4b5563] text-[#f3f4f6]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d3748] border-[#4b5563]">
                      <SelectItem value="linkedin" className="text-[#f3f4f6]">LinkedIn</SelectItem>
                      <SelectItem value="twitter" className="text-[#f3f4f6]">Twitter</SelectItem>
                      <SelectItem value="youtube" className="text-[#f3f4f6]">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox 
                      id="postToAll"
                      checked={postToAllPlatforms}
                      onCheckedChange={(checked) => setPostToAllPlatforms(checked as boolean)}
                      className="border-[#4b5563] data-[state=checked]:bg-[#5A73A3]"
                    />
                    <label 
                      htmlFor="postToAll" 
                      className="text-sm text-[#9ca3af]"
                    >
                      Post to all platforms
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex justify-between pt-4 border-t border-[#4b5563]">
          <Button 
            variant="destructive" 
            onClick={() => onDelete(post.id)}
          >
            Delete Post
          </Button>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-[#4b5563] text-[#9ca3af] hover:text-[#f3f4f6]"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => onSave(post)}
              className="bg-[#5A73A3] text-[#f3f4f6] hover:bg-[#4C6288]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ContentCard({ post, onEdit }: { post: Post, onEdit: (post: Post) => void }) {
  const platformIcons = {
    linkedin: "/linkedin-icon.svg",
    twitter: "/twitter-icon.svg",
    youtube: "/youtube-icon.svg",
  }

  return (
    <Card 
      className="group relative overflow-hidden bg-[#2d3748] text-[#f3f4f6] border-[#4b5563] transition-all duration-200 hover:shadow-lg hover:border-[#5A73A3] cursor-pointer"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#4b5563] flex items-center justify-center text-sm font-medium text-[#f3f4f6]">
              {post.authorInitials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#f3f4f6]">{post.authorName}</span>
              <span className="text-xs text-[#9ca3af]">{format(post.scheduledDate, 'MM/dd/yyyy')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className={`
                ${post.status === 'published' ? 'bg-[#4b5563] text-[#f3f4f6]' :
                  post.status === 'scheduled' ? 'bg-[#5A73A3] text-[#f3f4f6]' :
                  'bg-[#4b5563] text-[#f3f4f6]'}
              `}
            >
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </Badge>
            {post.platform === 'linkedin' ? (
              <Linkedin className="h-5 w-5 text-blue-600" />
            ) : post.platform === 'twitter' ? (
              <Twitter className="h-5 w-5 text-sky-500" />
            ) : (
              <Youtube className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#f3f4f6]">{post.title}</h3>
          <p className="text-sm text-[#9ca3af] line-clamp-2">{post.content}</p>
        </div>

        <div className="flex justify-between items-center text-xs text-[#9ca3af] pt-4 border-t border-[#4b5563]">
          <div className="flex space-x-6">
            <span>{post.characterCount} chars</span>
            {post.engagementRate !== undefined && (
              <span>{post.engagementRate}% engagement</span>
            )}
            <span>Last used: {format(post.scheduledDate, 'MM/dd/yyyy')}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#2d3748] to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(post)}
              className="text-[#9ca3af] hover:text-[#f3f4f6]"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function AnalyticsSection({ analytics }: { analytics: Analytics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-[#2d3748] border-[#4b5563]">
        <div className="space-y-2">
          <p className="text-sm text-[#9ca3af]">Total Scheduled</p>
          <p className="text-2xl font-bold text-[#f3f4f6]">{analytics.totalScheduledPosts}</p>
        </div>
      </Card>
      <Card className="p-4 bg-[#2d3748] border-[#4b5563]">
        <div className="space-y-2">
          <p className="text-sm text-[#9ca3af]">Avg. Engagement</p>
          <p className="text-2xl font-bold text-[#f3f4f6]">{analytics.averageEngagementRate}%</p>
        </div>
      </Card>
      <Card className="p-4 bg-[#2d3748] border-[#4b5563]">
        <div className="space-y-2">
          <p className="text-sm text-[#9ca3af]">Most Used Platform</p>
          <p className="text-2xl font-bold text-[#f3f4f6] capitalize">{analytics.mostUsedPlatform}</p>
        </div>
      </Card>
      <Card className="p-4 bg-[#2d3748] border-[#4b5563]">
        <div className="space-y-2">
          <p className="text-sm text-[#9ca3af]">Next 7 Days</p>
          <p className="text-2xl font-bold text-[#f3f4f6]">{analytics.upcomingPostsCount}</p>
        </div>
      </Card>
    </div>
  )
}

function FilterDialog({ isOpen, onClose, filters, onApplyFilters }: {
  isOpen: boolean
  onClose: () => void
  filters: Filters
  onApplyFilters: (filters: Filters) => void
}) {
  const [tempFilters, setTempFilters] = useState<Filters>(filters)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#2d3748] border-[#4b5563] text-[#f3f4f6]">
        <DialogHeader>
          <DialogTitle className="text-[#f3f4f6]">Filter Posts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af]">Date Range</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-[#374151] border-[#4b5563] text-[#f3f4f6]"
                    >
                      {tempFilters.dateRange.start ? (
                        format(tempFilters.dateRange.start, "PPP")
                      ) : (
                        <span className="text-[#9ca3af]">Pick a start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#2d3748] border-[#4b5563]">
                    <Calendar
                      mode="single"
                      selected={tempFilters.dateRange.start || undefined}
                      onSelect={(date) => setTempFilters({
                        ...tempFilters,
                        dateRange: { ...tempFilters.dateRange, start: date || null }
                      })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-[#374151] border-[#4b5563] text-[#f3f4f6]"
                    >
                      {tempFilters.dateRange.end ? (
                        format(tempFilters.dateRange.end, "PPP")
                      ) : (
                        <span className="text-[#9ca3af]">Pick an end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#2d3748] border-[#4b5563]">
                    <Calendar
                      mode="single"
                      selected={tempFilters.dateRange.end || undefined}
                      onSelect={(date) => setTempFilters({
                        ...tempFilters,
                        dateRange: { ...tempFilters.dateRange, end: date || null }
                      })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af]">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {['linkedin', 'twitter', 'youtube'].map((platform) => (
                <Button
                  key={platform}
                  variant="outline"
                  className={`
                    ${tempFilters.platforms.includes(platform as any)
                      ? 'bg-[#5A73A3] text-[#f3f4f6] border-[#5A73A3]'
                      : 'bg-[#374151] text-[#9ca3af] border-[#4b5563]'
                    }
                  `}
                  onClick={() => {
                    const platforms = tempFilters.platforms.includes(platform as any)
                      ? tempFilters.platforms.filter(p => p !== platform)
                      : [...tempFilters.platforms, platform as any]
                    setTempFilters({ ...tempFilters, platforms })
                  }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af]">Content Type</label>
            <div className="flex gap-2">
              {['text', 'video'].map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  className={`
                    ${tempFilters.contentType.includes(type as any)
                      ? 'bg-[#5A73A3] text-[#f3f4f6] border-[#5A73A3]'
                      : 'bg-[#374151] text-[#9ca3af] border-[#4b5563]'
                    }
                  `}
                  onClick={() => {
                    const contentType = tempFilters.contentType.includes(type as any)
                      ? tempFilters.contentType.filter(t => t !== type)
                      : [...tempFilters.contentType, type as any]
                    setTempFilters({ ...tempFilters, contentType })
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#9ca3af]">Categories</label>
            <div className="flex flex-wrap gap-2">
              {['knowledge', 'growth', 'authority'].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className={`
                    ${tempFilters.categories.includes(category as any)
                      ? 'bg-[#5A73A3] text-[#f3f4f6] border-[#5A73A3]'
                      : 'bg-[#374151] text-[#9ca3af] border-[#4b5563]'
                    }
                  `}
                  onClick={() => {
                    const categories = tempFilters.categories.includes(category as any)
                      ? tempFilters.categories.filter(c => c !== category)
                      : [...tempFilters.categories, category as any]
                    setTempFilters({ ...tempFilters, categories })
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-[#4b5563]">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#4b5563] text-[#9ca3af] hover:text-[#f3f4f6]"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onApplyFilters(tempFilters)
              onClose()
            }}
            className="bg-[#5A73A3] text-[#f3f4f6] hover:bg-[#4C6288]"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ContentCalendar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    dateRange: { start: null, end: null },
    platforms: [],
    contentType: [],
    categories: []
  })
  const [analytics] = useState<Analytics>({
    totalScheduledPosts: 12,
    averageEngagementRate: 8.5,
    mostUsedPlatform: 'linkedin',
    upcomingPostsCount: 5
  })
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Growth Strategy Post",
      content: 'Discover key growth strategies for your startup in 2023. Learn how successful entrepreneurs scale their businesses effectively while maintaining sustainable growth...',
      platform: 'linkedin',
      accountImage: '/default-profile.png',
      authorName: "Mike Johnson",
      authorInitials: "MJ",
      status: 'scheduled',
      scheduledDate: new Date(2024, 0, 15, 15, 0),
      characterCount: 150,
      maxCharacters: 2200,
      engagementRate: 8.5
    },
    {
      id: 2,
      title: "AI Impact Analysis",
      content: 'New video alert! 🎥 Check out our latest deep dive into artificial intelligence and its impact on modern business operations. Watch now to stay ahead of the curve...',
      platform: 'youtube',
      accountImage: '/default-profile.png',
      authorName: "Sarah Wilson",
      authorInitials: "SW",
      status: 'published',
      scheduledDate: new Date(2024, 0, 16, 12, 30),
      characterCount: 140,
      maxCharacters: 5000,
      engagementRate: 12.3
    },
    {
      id: 3,
      title: "Digital Marketing Trends",
      content: '🧵 1/6 Breaking down the latest trends in digital marketing:\n\nFirst, let\'s talk about the rise of AI-powered content creation and how it\'s revolutionizing the way brands connect with their audience...',
      platform: 'twitter',
      accountImage: '/default-profile.png',
      authorName: "Alex Chen",
      authorInitials: "AC",
      status: 'draft',
      scheduledDate: new Date(2024, 0, 17, 9, 0),
      characterCount: 180,
      maxCharacters: 280,
      engagementRate: 0
    }
  ])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post))
    setSelectedPost(null)
  }

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId))
    setSelectedPost(null)
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 flex-1">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button 
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
            <Link href="/rewards" passHref>
              <Button variant="outline">
                <Award className="mr-2 h-4 w-4" /> Rewards
              </Button>
            </Link>
          </div>
        </div>

        <AnalyticsSection analytics={analytics} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
            .map(post => (
              <ContentCard
                key={post.id}
                post={post}
                onEdit={setSelectedPost}
              />
            ))
          }
        </div>

        <EditModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onSave={handleUpdatePost}
          onDelete={handleDeletePost}
        />

        <FilterDialog
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onApplyFilters={setFilters}
        />
      </div>
    </TooltipProvider>
  )
}

