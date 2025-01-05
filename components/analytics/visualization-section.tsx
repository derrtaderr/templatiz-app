"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const engagementData = [
  { name: 'Jan', LinkedIn: 4000, Twitter: 2400, YouTube: 2400 },
  { name: 'Feb', LinkedIn: 3000, Twitter: 1398, YouTube: 2210 },
  { name: 'Mar', LinkedIn: 2000, Twitter: 9800, YouTube: 2290 },
  { name: 'Apr', LinkedIn: 2780, Twitter: 3908, YouTube: 2000 },
  { name: 'May', LinkedIn: 1890, Twitter: 4800, YouTube: 2181 },
  { name: 'Jun', LinkedIn: 2390, Twitter: 3800, YouTube: 2500 },
]

const contentTypeData = [
  { name: 'Blog Posts', value: 400 },
  { name: 'Twitter Threads', value: 300 },
  { name: 'LinkedIn Posts', value: 300 },
  { name: 'YouTube Shorts', value: 200 },
  { name: 'Long-form Videos', value: 100 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function VisualizationSection({ filters }) {
  return (
    <div className="flex-1">
      <Tabs defaultValue="engagement">
        <TabsList>
          <TabsTrigger value="engagement">Engagement Trends</TabsTrigger>
          <TabsTrigger value="contentTypes">Content Types</TabsTrigger>
        </TabsList>
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={engagementData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="LinkedIn" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Twitter" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="YouTube" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contentTypes">
          <Card>
            <CardHeader>
              <CardTitle>Content Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

