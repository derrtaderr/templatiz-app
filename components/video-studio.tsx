"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EnhancedVideoLibrary } from "./enhanced-video-library"
import { AlertCircle, Video, Wand2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function VideoStudio() {
  const [activeTab, setActiveTab] = useState<"shorts" | "long-form">("shorts")
  const [script, setScript] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)
  const [isScriptPrepopulated, setIsScriptPrepopulated] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [videoCategory, setVideoCategory] = useState("")
  const [videoTags, setVideoTags] = useState("")
  const toast = useToast()

  useEffect(() => {
    // Simulating script transfer from Content Suite
    const searchParams = new URLSearchParams(window.location.search)
    const transferredScript = searchParams.get('script')
    if (transferredScript) {
      setScript(transferredScript)
      setIsScriptPrepopulated(true)
      toast({
        title: "Script Transferred",
        description: "Your script has been successfully transferred from the Content Suite.",
      })
    }
  }, [])

  const handleCreateVideo = async () => {
    setIsGenerating(true)
    // Simulating API call to Runway AI
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    setGenerationComplete(true)
    // In a real implementation, we would send the video data to the EnhancedVideoLibrary component
  }

  const handleReworkPrompt = () => {
    // Implement prompt rework logic here
    console.log("Reworking prompt")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Video Studio</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Create engaging videos for YouTube Shorts and long-form content
        </p>
      </div>

      <Tabs defaultValue="shorts" className="w-full" onValueChange={(value) => setActiveTab(value as "shorts" | "long-form")}>
        <TabsList>
          <TabsTrigger value="shorts">YouTube Shorts</TabsTrigger>
          <TabsTrigger value="long-form">Long-form Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="shorts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create YouTube Short</CardTitle>
                <CardDescription>
                  Convert your script into an engaging short-form video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your script for the YouTube Short..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="flex space-x-4">
                  <Button onClick={handleCreateVideo} disabled={isGenerating || !script}>
                    {isGenerating ? "Generating..." : "Create Video"}
                  </Button>
                  <Button variant="outline" onClick={handleReworkPrompt} disabled={isGenerating}>
                    Rework Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Video Details</CardTitle>
                <CardDescription>
                  Add metadata for your video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-category">Category</Label>
                  <Select value={videoCategory} onValueChange={setVideoCategory}>
                    <SelectTrigger id="video-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      {/* Add more categories as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-tags">Tags</Label>
                  <Input
                    id="video-tags"
                    value={videoTags}
                    onChange={(e) => setVideoTags(e.target.value)}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="long-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Long-form Video</CardTitle>
                <CardDescription>
                  Develop comprehensive, long-form videos from your scripts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your script for the long-form video..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="flex space-x-4">
                  <Button onClick={handleCreateVideo} disabled={isGenerating || !script}>
                    {isGenerating ? "Generating..." : "Create Video"}
                  </Button>
                  <Button variant="outline" onClick={handleReworkPrompt} disabled={isGenerating}>
                    Rework Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Video Details</CardTitle>
                <CardDescription>
                  Add metadata for your video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-category">Category</Label>
                  <Select value={videoCategory} onValueChange={setVideoCategory}>
                    <SelectTrigger id="video-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      {/* Add more categories as needed */}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-tags">Tags</Label>
                  <Input
                    id="video-tags"
                    value={videoTags}
                    onChange={(e) => setVideoTags(e.target.value)}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {generationComplete && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your video has been generated and added to the Video Library.
          </AlertDescription>
        </Alert>
      )}

      <EnhancedVideoLibrary />
    </div>
  )
}

