import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CalendarInsightsProps {
  events: Array<{
    id: number
    title: string
    start: Date
    platform: string
    category: string
    contentType: string
    engagementRate: number
  }>
}

export function CalendarInsights({ events }: CalendarInsightsProps) {
  const totalPosts = events.length
  const averageEngagement = events.reduce((sum, event) => sum + event.engagementRate, 0) / totalPosts
  const platformCounts = events.reduce((counts, event) => {
    counts[event.platform] = (counts[event.platform] || 0) + 1
    return counts
  }, {})
  const mostUsedPlatform = Object.entries(platformCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Scheduled Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPosts}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Engagement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageEngagement.toFixed(1)}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Used Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{mostUsedPlatform}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Posts (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {events.filter(event => event.start <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

