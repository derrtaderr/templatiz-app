'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Edit, Trash2, Calendar, Plus, Video, FileText, Repeat, BarChart2, Save } from 'lucide-react'

// Mock data for charts
const engagementData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]

const categoriesData = [
  { name: 'Knowledge', value: 400 },
  { name: 'Growth', value: 300 },
  { name: 'Authority', value: 300 },
]

const timingData = [
  { name: '9AM', value: 100 },
  { name: '12PM', value: 200 },
  { name: '3PM', value: 300 },
  { name: '6PM', value: 200 },
  { name: '9PM', value: 100 },
]

export function WelcomeMessage({ name }: { name: string }) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <Avatar className="h-12 w-12">
        <AvatarImage src="/avatars/01.png" alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {name}</h1>
        <p className="text-muted-foreground">Here's what's happening with your content</p>
      </div>
    </div>
  )
}

export function MetricCard({ title, value, subtext, progress }: { title: string; value: string; subtext?: string; progress?: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        {progress !== undefined && (
          <Progress value={progress} className="mt-2" />
        )}
      </CardContent>
    </Card>
  )
}

export function RecentActivity() {
  const activities = [
    { title: "Growth Hacking 101", category: "Growth", platform: "linkedin", date: "2024-10-19" },
    { title: "Weekly Industry Insights", category: "Knowledge", platform: "twitter", date: "2024-10-18" },
    { title: "Leadership Tips", category: "Authority", platform: "linkedin", date: "2024-10-17" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{activity.title}</p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{activity.category}</Badge>
                  <span>{activity.platform}</span>
                  <span>{new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Calendar className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function PopularTemplates() {
  const templates = [
    { name: "Weekly Update", usage: 28 },
    { name: "Product Launch", usage: 22 },
    { name: "Industry News", usage: 19 },
    { name: "Team Spotlight", usage: 15 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
                <Badge variant="secondary">{template.usage}</Badge>
              </CardHeader>
              <CardContent>
                <Button className="w-full h-10 dashboard-button-secondary text-sm">Use Template</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function PerformanceInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement">
          <TabsList>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="timing">Timing</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="categories">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="timing">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function ContentMultiplicationQuickAccess() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Content Suite</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="dashboard-button-primary flex-1 min-w-[240px] h-12"
          >
            <Plus className="mr-2 h-5 w-5" /> Create New Blog Post
          </Button>
          <Button 
            className="dashboard-button-primary flex-1 min-w-[240px] h-12"
          >
            <Repeat className="mr-2 h-5 w-5" /> Repurpose Existing Content
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function VideoStudioQuickAccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Studio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="dashboard-button-primary flex-1 min-w-[240px] h-12"
          >
            <Video className="mr-2 h-5 w-5" /> Create YouTube Short
          </Button>
          <Button 
            className="dashboard-button-primary flex-1 min-w-[240px] h-12"
          >
            <Video className="mr-2 h-5 w-5" /> Start Long-form Video
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ContentActions() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button className="dashboard-button-secondary min-w-[120px] h-10">
        <Save className="mr-2 h-4 w-4" /> Save Draft
      </Button>
      <Button className="dashboard-button-secondary min-w-[120px] h-10">
        <Calendar className="mr-2 h-4 w-4" /> Schedule
      </Button>
      <Button className="dashboard-button-primary min-w-[120px] h-10">
        Post Now
      </Button>
      <Button className="dashboard-button-secondary min-w-[120px] h-10">
        <BarChart2 className="mr-2 h-4 w-4" /> View Analytics
      </Button>
    </div>
  )
}

