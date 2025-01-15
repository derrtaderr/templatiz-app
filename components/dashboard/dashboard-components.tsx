'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { Edit, Trash2, Calendar, Plus, Video, FileText, Repeat, BarChart2, Save, Linkedin, Twitter, Youtube, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { StreakWidget } from './streak-widget'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export function PlatformOverview() {
  type TimeRange = '7d' | '30d' | '6m' | '1y';
  type Platform = 'linkedin' | 'twitter' | 'youtube';
  type PlatformData = {
    [key in Platform]: {
      [key in TimeRange]: {
        posts: number;
        scheduled: number;
        engagement: number;
      }
    }
  }

  const [timeRange, setTimeRange] = useState<TimeRange>('30d')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin')
  
  const platformData: PlatformData = {
    linkedin: {
      '7d': { posts: 3, scheduled: 5, engagement: 8.5 },
      '30d': { posts: 12, scheduled: 5, engagement: 8.5 },
      '6m': { posts: 48, scheduled: 5, engagement: 7.8 },
      '1y': { posts: 96, scheduled: 5, engagement: 7.2 }
    },
    twitter: {
      '7d': { posts: 5, scheduled: 3, engagement: 6.2 },
      '30d': { posts: 20, scheduled: 3, engagement: 6.2 },
      '6m': { posts: 72, scheduled: 3, engagement: 5.9 },
      '1y': { posts: 144, scheduled: 3, engagement: 5.5 }
    },
    youtube: {
      '7d': { posts: 1, scheduled: 2, engagement: 12.3 },
      '30d': { posts: 4, scheduled: 2, engagement: 12.3 },
      '6m': { posts: 16, scheduled: 2, engagement: 11.5 },
      '1y': { posts: 32, scheduled: 2, engagement: 10.8 }
    }
  }

  const handleTimeRangeChange = (value: TimeRange) => {
    setTimeRange(value)
  }

  const handlePlatformChange = (value: Platform) => {
    setSelectedPlatform(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn</CardTitle>
            <CardDescription>Platform Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformData.linkedin[timeRange].posts}</div>
            <p className="text-xs text-muted-foreground">
              Posts in the last {timeRange === '7d' ? '7 days' : 
                               timeRange === '30d' ? '30 days' : 
                               timeRange === '6m' ? '6 months' : 'year'}
            </p>
            <div className="mt-4">
              <div className="text-lg font-semibold">{platformData.linkedin[timeRange].scheduled} scheduled</div>
              <div className="text-sm text-muted-foreground">
                {platformData.linkedin[timeRange].engagement}% engagement rate
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Twitter</CardTitle>
            <CardDescription>Platform Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformData.twitter[timeRange].posts}</div>
            <p className="text-xs text-muted-foreground">
              Posts in the last {timeRange === '7d' ? '7 days' : 
                               timeRange === '30d' ? '30 days' : 
                               timeRange === '6m' ? '6 months' : 'year'}
            </p>
            <div className="mt-4">
              <div className="text-lg font-semibold">{platformData.twitter[timeRange].scheduled} scheduled</div>
              <div className="text-sm text-muted-foreground">
                {platformData.twitter[timeRange].engagement}% engagement rate
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>YouTube</CardTitle>
            <CardDescription>Platform Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformData.youtube[timeRange].posts}</div>
            <p className="text-xs text-muted-foreground">
              Posts in the last {timeRange === '7d' ? '7 days' : 
                               timeRange === '30d' ? '30 days' : 
                               timeRange === '6m' ? '6 months' : 'year'}
            </p>
            <div className="mt-4">
              <div className="text-lg font-semibold">{platformData.youtube[timeRange].scheduled} scheduled</div>
              <div className="text-sm text-muted-foreground">
                {platformData.youtube[timeRange].engagement}% engagement rate
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
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

