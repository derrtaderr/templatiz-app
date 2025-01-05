"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent } from "@/components/ui/card"
import { BlogTopicGenerator } from "./blog-topic-generator"

interface BlogCreationProps {
  initialBlogTopic: string;
  onBlogApproved: (content: string) => void;
}

export function BlogCreation({ initialBlogTopic, onBlogApproved }: BlogCreationProps) {
  const [blogTopic, setBlogTopic] = useState(initialBlogTopic);
  const [blogContent, setBlogContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setSelectedBlogTopic = (topic: string) => {
    setBlogTopic(topic);
  };

  useEffect(() => {
    if (blogTopic) {
      setBlogContent(`This is a placeholder for the blog content about "${blogTopic}". Click "Generate Blog Post" to create the full content.`)
    }
  }, [blogTopic])

  const handleGenerateBlogPost = async () => {
    setIsGenerating(true)
    setError(null)
    setBlogContent("Generating your blog post... please wait.")
    try {
      // Simulating API call for blog generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      setBlogContent(`This is a sample AI-generated blog post about "${blogTopic}"...`)
    } catch (err) {
      setError("Failed to generate blog post. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerateBlogPost = async () => {
    const shouldOverwrite = window.confirm("Do you want to overwrite the existing content or append a new version?")
    if (shouldOverwrite) {
      handleGenerateBlogPost()
    } else {
      setIsGenerating(true)
      setError(null)
      try {
        // Simulating API call for blog regeneration
        await new Promise(resolve => setTimeout(resolve, 2000))
        setBlogContent(prevContent => prevContent + "\n\n--- New Version ---\n\nThis is a regenerated version of the blog post about " + blogTopic + "...")
      } catch (err) {
        setError("Failed to regenerate blog post. Please try again.")
      } finally {
        setIsGenerating(false)
      }
    }
  }

  const handleCopyContent = () => {
    navigator.clipboard.writeText(blogContent)
  }

  const handleApproveBlog = () => {
    onBlogApproved(blogContent)
  }

  const handleGenerateAllContent = () => {
    // Implement generate all content functionality
    console.log("Generating all content for all platforms")
    // This would typically involve calling an API or service to generate content for all platforms
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="blog-topic">Blog Topic</Label>
          <div className="flex gap-2">
            <Input
              id="blog-topic"
              placeholder="Enter your blog topic"
              value={blogTopic}
              onChange={(e) => {/* Handle manual topic change if needed */}}
              className="flex-grow"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={handleGenerateBlogPost} 
                    disabled={isGenerating || !blogTopic}
                    className="bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
                  >
                    {isGenerating ? <Spinner className="mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Generate Blog Post
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate Blog Post</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <BlogTopicGenerator onTopicSelect={setSelectedBlogTopic} />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="blog-content">Blog Content</Label>
          <Textarea
            id="blog-content"
            placeholder="Your generated blog content will appear here. You can edit it or regenerate if needed."
            className="min-h-[300px]"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleRegenerateBlogPost}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate a new version of the blog post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleCopyContent}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Content
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy blog content to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-x-2">
              <Button 
                onClick={handleGenerateAllContent} 
                disabled={isGenerating || !blogContent}
                className="bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate All Content
              </Button>
              <Button 
                onClick={handleApproveBlog} 
                disabled={isGenerating || !blogContent}
                className="bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
              >
                <Check className="mr-2 h-4 w-4" />
                Approve Blog
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

