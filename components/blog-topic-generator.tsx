"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react'

// Simulated API call
const generateTopics = async (): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Simulate API response
  return [
    "5 Ways to Increase Engagement on LinkedIn",
    "The Future of AI in Content Creation",
    "How to Build a Strong Personal Brand on Social Media",
    "Top 10 Content Marketing Trends for 2024",
    "Mastering the Art of Storytelling in Business",
    "How to Leverage Video Content for Business Growth",
    "The Impact of Voice Search on SEO Strategies",
    "Creating a Successful Content Calendar for Your Brand",
    "The Role of Emotional Intelligence in Leadership",
    "Sustainable Business Practices: A Guide for Modern Entrepreneurs"
  ]
}

interface BlogTopicGeneratorProps {
  onTopicSelect: (topic: string) => void;
}

export function BlogTopicGenerator({ onTopicSelect }: BlogTopicGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [topics, setTopics] = useState<string[]>([])
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateTopics = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const generatedTopics = await generateTopics()
      setTopics(generatedTopics)
    } catch (err) {
      setError("Unable to generate topics. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleOpenModal = () => {
    setIsOpen(true)
    handleGenerateTopics()
  }

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic)
  }

  const handleUseTopic = () => {
    if (selectedTopic) {
      onTopicSelect(selectedTopic);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>AI-Generated Blog Topic Ideas</DialogTitle>
            <DialogDescription>
              Based on your target audience and profile, here are some ideas to get started.
            </DialogDescription>
          </DialogHeader>
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#5A73A3]" />
              <p className="mt-2 text-sm text-gray-500">Generating ideas...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 rounded-md cursor-pointer transition-colors ${
                    selectedTopic === topic
                      ? "bg-[#5A73A3] text-white"
                      : "hover:bg-gray-100 hover:text-black"
                  }`}
                  onClick={() => handleSelectTopic(topic)}
                >
                  {topic}
                </div>
              ))}
            </ScrollArea>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={handleUseTopic}
              disabled={!selectedTopic}
              className="bg-[#5A73A3] text-white hover:bg-[#5A73A3]/80"
            >
              Use Selected Topic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mt-2 text-sm text-gray-500">
        Need inspiration?{" "}
        <span 
          className="text-[#5A73A3] cursor-pointer hover:underline" 
          onClick={handleOpenModal}
        >
          Click here for topic ideas
        </span>
      </div>
    </>
  )
}

