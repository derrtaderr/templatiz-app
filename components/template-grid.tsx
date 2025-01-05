"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Edit, Trash2, Copy, BarChart2, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const templates = [
  {
    id: 1,
    title: "Growth Strategy Template",
    preview: "A comprehensive template for planning and executing growth initiatives...",
    author: {
      name: "Sarah Wilson",
      avatar: "/avatars/02.png",
    },
    platform: "linkedin",
    category: "Growth",
    date: "2023-12-01",
    usageCount: 15,
    engagementRate: 8.5,
    lastUsed: "2023-12-15",
  },
  {
    id: 2,
    title: "Knowledge Sharing Post",
    preview: "Template for sharing industry insights and expertise...",
    author: {
      name: "Mike Johnson",
      avatar: "/avatars/03.png",
    },
    platform: "twitter",
    category: "Knowledge",
    date: "2023-12-02",
    usageCount: 10,
    engagementRate: 7.2,
    lastUsed: "2023-12-14",
  },
  // Add more templates as needed
]

export function TemplateGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedPlatform === "all" || template.platform === selectedPlatform) &&
    (selectedCategory === "all" || template.category.toLowerCase() === selectedCategory.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case "mostUsed":
        return b.usageCount - a.usageCount
      case "topPerforming":
        return b.engagementRate - a.engagementRate
      case "newest":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="knowledge">Knowledge</SelectItem>
              <SelectItem value="authority">Authority</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="mostUsed">Most Used</SelectItem>
              <SelectItem value="topPerforming">Top Performing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id} 
            className="bg-[#2d3748] text-[#f3f4f6] border-[#4b5563] transition-all duration-200 hover:shadow-lg hover:border-[#5A73A3] group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={template.author.avatar} />
                  <AvatarFallback>{template.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{template.author.name}</p>
                  <p className="text-xs text-[#9ca3af]">
                    {new Date(template.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {template.platform === 'linkedin' ? (
                <Linkedin className="h-5 w-5 text-blue-600" />
              ) : (
                <Twitter className="h-5 w-5 text-sky-500" />
              )}
            </CardHeader>
            <CardContent className="py-4">
              <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
              <p className="text-sm text-[#9ca3af] mb-4">{template.preview}</p>
              <div className="flex justify-between items-center text-xs text-[#9ca3af]">
                <span>Used {template.usageCount} times</span>
                <span>{template.engagementRate}% engagement</span>
                <span>Last used: {new Date(template.lastUsed).toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter className="justify-between pt-4 border-t border-[#4b5563] flex-wrap gap-2">
              <div className="flex flex-wrap gap-1">
                <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-[#f3f4f6]">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-[#f3f4f6]">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-[#f3f4f6]">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-[#f3f4f6]">
                  <BarChart2 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-[#9ca3af] hover:text-[#f3f4f6]">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#374151] border-[#4b5563]">
                    <DropdownMenuItem className="text-[#f3f4f6] focus:bg-[#4b5563] focus:text-[#f3f4f6]">
                      Delete Template
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-[#4b5563] text-[#f3f4f6]">
                  {template.platform}
                </Badge>
                <Badge className="bg-[#5A73A3] text-[#1f2937]">{template.category}</Badge>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

