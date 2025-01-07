'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { Edit, Trash2, Calendar, Plus, Video, FileText, Repeat, BarChart2, Save, Linkedin, Twitter, Youtube, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { StreakWidget } from './streak-widget'

// Mock data for charts
const platformData = [
  { platform: 'LinkedIn', scheduled: 5, engagement: 8.5 },
  { platform: 'Twitter', scheduled: 3, engagement: 6.2 },
  { platform: 'YouTube', scheduled: 2, engagement: 12.3 },
]

const engagementData = [
  { name: 'Mon', linkedin: 8.5, twitter: 6.2, youtube: 12.3 },
  { name: 'Tue', linkedin: 9.1, twitter: 7.0, youtube: 11.5 },
  { name: 'Wed', linkedin: 7.8, twitter: 5.9, youtube: 13.2 },
  { name: 'Thu', linkedin: 8.9, twitter: 6.8, youtube: 12.8 },
  { name: 'Fri', linkedin: 9.3, twitter: 7.2, youtube: 11.9 },
]

const categoriesData = [
  { name: 'Knowledge', value: 8.7 },
  { name: 'Growth', value: 9.2 },
  { name: 'Authority', value: 7.8 },
]

const timingData = [
  { time: '9AM', engagement: 7.5 },
  { time: '12PM', engagement: 8.2 },
  { time: '3PM', engagement: 9.1 },
  { time: '6PM', engagement: 8.4 },
  { time: '9PM', engagement: 7.2 },
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

export function TemplatesProgress() {
  const used = 15
  const total = 30
  const progress = (used / total) * 100

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Templates Created</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Templates used this month out of your monthly quota</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{used}/{total}</div>
        <Progress value={progress} className="h-2" />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Monthly Usage</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function PlatformMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platformData.map((platform) => (
            <div key={platform.platform} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                {platform.platform === 'LinkedIn' ? (
                  <Linkedin className="h-5 w-5 text-blue-600" />
                ) : platform.platform === 'Twitter' ? (
                  <Twitter className="h-5 w-5 text-sky-500" />
                ) : (
                  <Youtube className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium">{platform.platform}</p>
                  <p className="text-sm text-muted-foreground">{platform.scheduled} posts scheduled</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{platform.engagement}%</p>
                <p className="text-sm text-muted-foreground">Engagement</p>
              </div>
            </div>
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
        <Tabs defaultValue="engagement" className="space-y-4">
          <TabsList>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="timing">Timing</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement">
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Weekly Engagement Rate</h4>
                  <p className="text-sm text-muted-foreground">Average engagement across platforms</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-blue-600" />
                    <span className="text-sm text-muted-foreground">LinkedIn</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-sky-500" />
                    <span className="text-sm text-muted-foreground">Twitter</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm text-muted-foreground">YouTube</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="linkedin" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="twitter" stroke="#0ea5e9" strokeWidth={2} />
                  <Line type="monotone" dataKey="youtube" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="categories">
            <div className="pt-2 space-y-4">
              <div>
                <h4 className="text-sm font-medium">Category Performance</h4>
                <p className="text-sm text-muted-foreground">Average engagement by content category</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#5A73A3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="timing">
            <div className="pt-2 space-y-4">
              <div>
                <h4 className="text-sm font-medium">Best Posting Times</h4>
                <p className="text-sm text-muted-foreground">Engagement rate by time of day</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="engagement" fill="#5A73A3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function QuickActions() {
  const actions = [
    { icon: FileText, label: "Create Blog Post", color: "text-blue-600" },
    { icon: Video, label: "Record Video", color: "text-green-600" },
    { icon: Calendar, label: "Schedule Content", color: "text-purple-600" },
    { icon: Save, label: "Save Template", color: "text-orange-600" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Card key={action.label} className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
            <action.icon className={`h-8 w-8 ${action.color}`} />
            <span className="text-sm font-medium">{action.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function RecentActivity() {
  const activities = [
    { 
      title: "Growth Hacking 101", 
      category: "Growth", 
      platform: "linkedin",
      date: "2024-01-15",
      engagement: 8.5
    },
    { 
      title: "Weekly Industry Insights", 
      category: "Knowledge", 
      platform: "twitter",
      date: "2024-01-14",
      engagement: 7.2
    },
    { 
      title: "Leadership Tips", 
      category: "Authority", 
      platform: "linkedin",
      date: "2024-01-13",
      engagement: 9.1
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {activity.platform === 'linkedin' ? (
                    <Linkedin className="h-4 w-4 text-blue-600" />
                  ) : activity.platform === 'twitter' ? (
                    <Twitter className="h-4 w-4 text-sky-500" />
                  ) : (
                    <Youtube className="h-4 w-4 text-red-500" />
                  )}
                  <p className="font-medium">{activity.title}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{activity.category}</Badge>
                  <span>{new Date(activity.date).toLocaleDateString()}</span>
                  <span>{activity.engagement}% engagement</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

