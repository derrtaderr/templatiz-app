"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface AIWritingModalProps {
  isOpen: boolean
  onClose: () => void
  templateContent: string
}

export function AIWritingModal({ isOpen, onClose, templateContent }: AIWritingModalProps) {
  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedContent, setGeneratedContent] = useState("")
  const [progress, setProgress] = useState(0)

  // Simulate AI generation process
  useEffect(() => {
    if (isOpen && isGenerating) {
      // Reset states when modal opens
      setGeneratedContent("")
      setProgress(0)
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 2
        })
      }, 50)

      // Simulate completion after 3 seconds
      setTimeout(() => {
        setIsGenerating(false)
        clearInterval(progressInterval)
        setProgress(100)
        setGeneratedContent(`Here's an AI-generated post based on your template.
  
This would be dynamically generated content that follows the structure of your template while adding unique, relevant content.
  
#AIgenerated #uniquecontent`)
      }, 3000)

      return () => {
        clearInterval(progressInterval)
      }
    }
    // Reset when modal closes
    return () => {
      setIsGenerating(true)
      setGeneratedContent("")
      setProgress(0)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-[#2d3748] text-[#f3f4f6] border-[#4b5563]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col min-h-[400px]"
        >
          <div className="flex flex-col mb-4">
            <h3 className="font-semibold">AI-Generated Post</h3>
            <p className="text-xs text-[#9ca3af]">Based on your template</p>
          </div>
          
          <div className="bg-[#374151] p-4 rounded-lg flex-grow mb-6">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="flex items-center space-x-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                  <p className="text-sm text-blue-400">Generating content...</p>
                </div>
                <div className="w-full max-w-xs bg-[#2d3748] rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-[#9ca3af]">This may take a few moments</p>
              </div>
            ) : (
              <p className="text-sm whitespace-pre-wrap">{generatedContent}</p>
            )}
          </div>

          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
              disabled={isGenerating}
              onClick={() => {/* Handle schedule action */}}
            >
              Schedule Post
            </Button>
            <Button 
              className="flex-1 bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
              disabled={isGenerating}
              onClick={() => {/* Handle post action */}}
            >
              Post Now
            </Button>
            <Button 
              className="flex-1 bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
              disabled={isGenerating}
              onClick={() => {
                setIsGenerating(true)
                setGeneratedContent("")
                setProgress(0)
              }}
            >
              Rewrite
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
} 