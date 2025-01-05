"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Linkedin, Twitter, Edit, CalendarIcon, Trash, Plus, BarChart3, User } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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
  { name: 'Custom', value: 200 },
]

const timingData = [
  { name: '9AM', value: 100 },
  { name: '12PM', value: 200 },
  { name: '3PM', value: 300 },
  { name: '6PM', value: 200 },
  { name: '9PM', value: 100 },
]

const platformsData = [
  { name: 'LinkedIn', value: 400 },
  { name: 'Twitter', value: 300 },
]

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickStatCard title="Templates Created" value="18/30" progress={60} />
        <QuickStatCard title="Scheduled Posts" value="12" subtext="this week" />
        <QuickStatCard title="Recent Engagement" value="8.5%" subtext="avg. rate" />
        <QuickStatCard title="Templates Used" value="24" subtext="this month" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Content Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
            <Button className="w-full mt-4">
              <CalendarIcon className="mr-2 h-4 w-4" /> View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <PopularTemplates />
        </CardContent>
      </Card>

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
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
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
            <TabsContent value="platforms">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-4">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Template
        </Button>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Post
        </Button>
        <Button>
          <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
        </Button>
        <Button>
          <User className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>
    </div>
  )
}

function QuickStatCard({ title, value, progress, subtext }: { title: string, value: string, progress?: number, subtext?: string }) {
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

function RecentActivityList() {
  const activities = [
    { name: "Growth Hacking 101", category: "Growth", platform: "linkedin", date: "2023-06-15", time: "14:30" },
    { name: "Weekly Industry Insights", category: "Knowledge", platform: "twitter", date: "2023-06-14", time: "09:00" },
    { name: "Leadership Tips", category: "Authority", platform: "linkedin", date: "2023-06-13", time: "11:45" },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-secondary/10 rounded-lg">
          <div className="flex items-center space-x-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{activity.name}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{activity.category}</Badge>
                {activity.platform === "linkedin" ? <Linkedin className="h-4 w-4" /> : <Twitter className="h-4 w-4" />}
                <span className="text-xs text-muted-foreground">{activity.date} {activity.time}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function PopularTemplates() {
  const templates = [
    { name: "Weekly Update", usage: 28 },
    { name: "Product Launch", usage: 22 },
    { name: "Industry News", usage: 19 },
    { name: "Team Spotlight", usage: 15 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {templates.map((template, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{template.name}</CardTitle>
            <Badge variant="secondary">{template.usage}</Badge>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Use Template</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

