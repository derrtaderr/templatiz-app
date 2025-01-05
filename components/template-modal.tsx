"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Twitter } from 'lucide-react'
import { motion } from "framer-motion"
import { useState } from "react"
import { AIWritingModal } from "./ai-writing-modal"

interface TemplateModalProps {
  isOpen: boolean
  onClose: () => void
  template: {
    id: number
    title: string
    preview: string
    author: {
      name: string
      avatar: string
    }
    platform: string
    category: string
    date: string
    originalContent?: string
    templatizedContent?: string
  }
}

export function TemplateModal({ isOpen, onClose, template }: TemplateModalProps) {
  const [showAIWriting, setShowAIWriting] = useState(false)

  // Mock content for demonstration
  const originalContent = template.originalContent || `Here's an example of the original post content.
  
  This would be the actual content that was saved from ${template.platform}, maintaining its original formatting and style.
  
  #originalcontent #${template.platform}`

  const templatizedContent = template.templatizedContent || `Here's the templatized version of the content.
  
  This version has been processed to remove specific details and make it reusable while maintaining the effective structure.
  
  #template #reusable`

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[900px] bg-[#2d3748] text-[#f3f4f6] border-[#4b5563]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
            {/* Original Content Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={template.author.avatar} />
                    <AvatarFallback>{template.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{template.author.name}</p>
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
              </div>
              <div className="bg-[#374151] p-4 rounded-lg flex-grow">
                <h3 className="font-semibold mb-2">Original Post</h3>
                <p className="text-sm whitespace-pre-wrap">{originalContent}</p>
              </div>
              <div className="mt-4">
                <Button 
                  className="w-full bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
                  onClick={() => {/* Handle templatize action */}}
                >
                  Templatiz
                </Button>
              </div>
            </motion.div>

            {/* Templatized Version Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="flex flex-col mb-4">
                <h3 className="font-semibold">Templatized Version</h3>
                <p className="text-xs text-[#9ca3af]">Auto-generated template</p>
              </div>
              <div className="bg-[#374151] p-4 rounded-lg flex-grow">
                <p className="text-sm whitespace-pre-wrap">{templatizedContent}</p>
              </div>
              <div className="mt-4">
                <Button 
                  className="w-full bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
                  onClick={() => setShowAIWriting(true)}
                >
                  Write with AI
                </Button>
              </div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      <AIWritingModal 
        isOpen={showAIWriting}
        onClose={() => setShowAIWriting(false)}
        templateContent={templatizedContent}
      />
    </>
  )
} 