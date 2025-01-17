"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Twitter, Linkedin, Eye, Copy, BarChart2, Trash2, FileEdit } from "lucide-react"
import { TemplateModal } from "./template-modal"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Template {
  id: string
  title: string
  content: string
  preview: string
  platform: string
  category: string
  original_author: string
  original_author_avatar?: string
  created_at: string
  usage_count: number
  engagement_rate: number
  last_used_at?: string
}

export function TemplateGrid() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTemplate, setDeleteTemplate] = useState<Template | null>(null)
  const { toast } = useToast()

  const supabase = createBrowserClient(
    'https://qjytinocuwlxvkxsajfb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqeXRpbm9jdXdseHZreHNhamZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MDgyMDgsImV4cCI6MjA1MjQ4NDIwOH0.x3qM6MhUs1VbEBr_KvjV24LT1aFFWxStjs1MxebgrCo'
  )

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching templates:', error)
        return
      }

      setTemplates(data || [])
    } catch (error) {
      console.error('Error in fetchTemplates:', error)
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedTemplate(null)
    setIsModalOpen(false)
  }

  const handleEditTemplate = async (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  const handleCopyTemplate = async (template: Template) => {
    try {
      await navigator.clipboard.writeText(template.content)
      toast({
        title: "Template copied",
        description: "Template content has been copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy template",
        variant: "destructive",
      })
    }
  }

  const handleViewAnalytics = (template: Template) => {
    // For now, just show a toast. Later we can add analytics modal/page
    toast({
      title: "Template Analytics",
      description: `Usage: ${template.usage_count} times, Engagement: ${template.engagement_rate}%`,
    })
  }

  const handleDeleteClick = (template: Template) => {
    setDeleteTemplate(template)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTemplate) return

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', deleteTemplate.id)

      if (error) throw error

      toast({
        title: "Template deleted",
        description: "Template has been successfully deleted",
      })
      
      // Refresh templates after deletion
      fetchTemplates()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      })
    } finally {
      setDeleteTemplate(null)
    }
  }

  const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="h-5 w-5 text-sky-500" />
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="bg-[#1e293b] border-[#2d3748] hover:border-[#5A73A3] transition-all duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 bg-[#2d3748]">
                  <AvatarFallback>
                    {template.original_author?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-200">{template.original_author}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(template.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <PlatformIcon platform={template.platform} />
            </CardHeader>
            <CardContent className="py-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-200">{template.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{template.preview}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Used {template.usage_count} times</span>
                <span>{template.engagement_rate}% engagement</span>
              </div>
              {template.last_used_at && (
                <p className="text-xs text-gray-400 mt-2">
                  Last used: {new Date(template.last_used_at).toLocaleDateString()}
                </p>
              )}
            </CardContent>
            <CardFooter className="pt-4 border-t border-[#2d3748]">
              <div className="flex justify-between items-center w-full">
                <div className="flex space-x-2">
                  <button 
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                    onClick={() => handleTemplateClick(template)}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <FileEdit className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                    onClick={() => handleCopyTemplate(template)}
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                    onClick={() => handleViewAnalytics(template)}
                  >
                    <BarChart2 className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                    onClick={() => handleDeleteClick(template)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary" className="bg-[#2d3748] text-gray-200">
                    {template.platform}
                  </Badge>
                  <Badge className="bg-[#5A73A3] text-[#1e293b]">
                    {template.category}
                  </Badge>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedTemplate && (
        <TemplateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          template={selectedTemplate}
        />
      )}

      <AlertDialog open={!!deleteTemplate} onOpenChange={() => setDeleteTemplate(null)}>
        <AlertDialogContent className="bg-[#1e293b] border-[#2d3748]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template
              "{deleteTemplate?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#2d3748] text-gray-200 hover:bg-[#374151] hover:text-gray-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

