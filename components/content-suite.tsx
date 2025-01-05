"use client"

import { useState } from "react"
import { WorkflowOverview } from "./workflow-overview"
import { BlogCreation } from "./blog-creation"
import { ContentPreviews } from "./content-previews"
import { Button } from "@/components/ui/button"
import { FileText, Repeat, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogTopicGenerator } from "./blog-topic-generator"

export function ContentSuite() {
  const [activeTab, setActiveTab] = useState<'create' | 'repurpose'>('create')
  const [currentStep, setCurrentStep] = useState(0)
  const [blogContent, setBlogContent] = useState("")
  const [platformContent, setPlatformContent] = useState({
    linkedin: "",
    twitter: "",
    youtube: "",
    longform: ""
  })
  const [selectedBlogTopic, setSelectedBlogTopic] = useState("")
  const [blogTopic, setBlogTopic] = useState(""); // Added blogTopic state

  const handleBlogApproved = (content: string) => {
    setBlogContent(content)
    setCurrentStep(1)
    // Simulate generating platform-specific content
    setPlatformContent({
      linkedin: `LinkedIn post based on: ${content.substring(0, 50)}...`,
      twitter: `Twitter thread based on: ${content.substring(0, 50)}...`,
      youtube: `YouTube script based on: ${content.substring(0, 50)}...`,
      longform: `Long-form video script based on: ${content.substring(0, 50)}...`
    })
  }

  const handleStepClick = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-primary">Content Suite</h1>
            <p className="text-muted-foreground text-lg mt-2">
              Create, repurpose, and manage your content across multiple platforms.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button 
            size="lg"
            onClick={() => setActiveTab('create')}
            className={`bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white transition-colors duration-200 ${activeTab === 'create' ? 'ring-2 ring-offset-2 ring-[#5A73A3]' : ''}`}
          >
            <FileText className="mr-2 h-5 w-5" />
            Create New Content
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className={`border-[#5A73A3] text-[#5A73A3] hover:bg-[#5A73A3]/10 transition-colors duration-200 ${activeTab === 'repurpose' ? 'ring-2 ring-offset-2 ring-[#5A73A3]' : ''}`}
            onClick={() => setActiveTab('repurpose')}
          >
            <Repeat className="mr-2 h-5 w-5" />
            Repurpose Existing Content
          </Button>
        </div>
      </div>

      <WorkflowOverview currentStep={currentStep} onStepClick={handleStepClick} />

      <div className="space-y-12">
        {activeTab === 'create' ? (
          <>
            <BlogTopicGenerator onTopicSelect={setBlogTopic} />
            <BlogCreation initialBlogTopic={blogTopic} onBlogApproved={handleBlogApproved} />
          </>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Repurpose Existing Content</h2>
              <p>Repurpose Content Component (To be implemented)</p>
            </CardContent>
          </Card>
        )}

        <ContentPreviews platformContent={platformContent} />
      </div>
    </div>
  )
}

