import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function FilterSection({ filters, onFilterChange }) {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div>
        <Label htmlFor="timeRange">Time Range</Label>
        <Select value={filters.timeRange} onValueChange={(value) => handleFilterChange("timeRange", value)}>
          <SelectTrigger id="timeRange">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="platform">Platform</Label>
        <Select value={filters.platform} onValueChange={(value) => handleFilterChange("platform", value)}>
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="contentType">Content Type</Label>
        <Select value={filters.contentType} onValueChange={(value) => handleFilterChange("contentType", value)}>
          <SelectTrigger id="contentType">
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="blog">Blog Posts</SelectItem>
            <SelectItem value="twitter">Twitter Threads</SelectItem>
            <SelectItem value="linkedin">LinkedIn Posts</SelectItem>
            <SelectItem value="shorts">YouTube Shorts</SelectItem>
            <SelectItem value="longform">Long-form Videos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="engagementMetric">Engagement Metric</Label>
        <Select value={filters.engagementMetric} onValueChange={(value) => handleFilterChange("engagementMetric", value)}>
          <SelectTrigger id="engagementMetric">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Metrics</SelectItem>
            <SelectItem value="impressions">Impressions</SelectItem>
            <SelectItem value="likes">Likes</SelectItem>
            <SelectItem value="ctr">CTR</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

