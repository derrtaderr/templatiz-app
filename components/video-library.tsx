import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Edit, Search, Filter } from 'lucide-react'

interface Video {
  id: number
  title: string
  type: 'Short' | 'Long-form'
  thumbnail: string
  creationDate: string
  category: string
  tags: string[]
  engagementLevel: 'Low' | 'Medium' | 'High'
}

const mockVideos: Video[] = [
  { id: 1, title: "5 Tips for Productivity", type: "Short", thumbnail: "/placeholder.svg?height=120&width=200", creationDate: "2023-06-15", category: "Productivity", tags: ["tips", "work"], engagementLevel: "High" },
  { id: 2, title: "How to Grow Your Audience", type: "Long-form", thumbnail: "/placeholder.svg?height=120&width=200", creationDate: "2023-06-10", category: "Marketing", tags: ["growth", "social media"], engagementLevel: "Medium" },
  { id: 3, title: "Content Creation Strategies", type: "Short", thumbnail: "/placeholder.svg?height=120&width=200", creationDate: "2023-06-05", category: "Marketing", tags: ["content", "strategy"], engagementLevel: "High" },
  { id: 4, title: "Advanced SEO Techniques", type: "Long-form", thumbnail: "/placeholder.svg?height=120&width=200", creationDate: "2023-05-28", category: "SEO", tags: ["advanced", "techniques"], engagementLevel: "Medium" },
  { id: 5, title: "Time Management Hacks", type: "Short", thumbnail: "/placeholder.svg?height=120&width=200", creationDate: "2023-05-20", category: "Productivity", tags: ["time", "management"], engagementLevel: "Low" },
]

export function VideoLibrary() {
  const [videos, setVideos] = useState<Video[]>(mockVideos)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string | null>(null)

  const handleReEdit = (videoId: number) => {
    // In a real implementation, this would update the script in the VideoStudio component
    console.log(`Re-editing video: ${videoId}`)
  }

  const filterVideos = () => {
    let filteredVideos = [...mockVideos]

    if (searchTerm) {
      filteredVideos = filteredVideos.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (typeFilter) {
      filteredVideos = filteredVideos.filter(video => video.type === typeFilter)
    }

    if (categoryFilter) {
      filteredVideos = filteredVideos.filter(video => video.category === categoryFilter)
    }

    if (sortBy === 'date') {
      filteredVideos.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    } else if (sortBy === 'engagement') {
      const engagementOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
      filteredVideos.sort((a, b) => engagementOrder[b.engagementLevel] - engagementOrder[a.engagementLevel])
    }

    setVideos(filteredVideos)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter(null)
    setCategoryFilter(null)
    setSortBy(null)
    setVideos(mockVideos)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Library</CardTitle>
        <CardDescription>Manage and organize your video content</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter || ""} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Short">Shorts</SelectItem>
                <SelectItem value="Long-form">Long-form</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter || ""} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Productivity">Productivity</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="SEO">SEO</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy || ""} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={filterVideos}>
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img src={video.thumbnail} alt={video.title} className="w-full h-auto" />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{video.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={video.type === 'Short' ? 'default' : 'secondary'}>{video.type}</Badge>
                    <span className="text-sm text-muted-foreground">{video.creationDate}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {video.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Engagement: {video.engagementLevel}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReEdit(video.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

