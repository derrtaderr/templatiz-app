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
import { TemplateModal } from "./template-modal"

const templates = [
  {
    id: 1,
    title: "Knowledge Sharing Post",
    preview: "Template for sharing industry insights and expertise...",
    author: {
      name: "Mike Johnson",
      avatar: "/avatars/03.png",
    },
    platform: "twitter",
    category: "Knowledge",
    date: "2023-12-01",
    usageCount: 10,
    engagementRate: 7.2,
    lastUsed: "2023-12-13",
  },
  {
    id: 2,
    title: "Growth Strategy Template",
    preview: "A comprehensive template for planning and executing growth initiatives...",
    author: {
      name: "Sarah Wilson",
      avatar: "/avatars/02.png",
    },
    platform: "linkedin",
    category: "Growth",
    date: "2023-11-30",
    usageCount: 15,
    engagementRate: 8.5,
    lastUsed: "2023-12-14",
  }
]

export function TemplateGrid() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
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
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#9ca3af] hover:text-[#f3f4f6]"
                onClick={() => handleViewTemplate(template)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#9ca3af] hover:text-[#f3f4f6]"
                onClick={() => handleViewTemplate(template)}
              >
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

      {selectedTemplate && (
        <TemplateModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTemplate(null)
          }}
          template={selectedTemplate}
        />
      )}
    </div>
  )
}

