"use client"

import { useState } from "react"
import { WorkflowDiagram } from "./workflow-diagram"
import { ContentCreation } from "./content-creation"
import { ContentPreviews } from "./content-previews"
import { QuickActions } from "./quick-actions"
import { Button } from "@/components/ui/button"
import { FileText, Repeat } from 'lucide-react'

export function SmartContentWorkflow() {
  const [activeTab, setActiveTab] = useState<'create' | 'repurpose'>('create')

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Smart Content Workflow</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Create once, publish everywhere. Streamline your content creation and repurposing process.
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            size="lg"
            onClick={() => setActiveTab('create')}
            className="bg-[#5A73A3] hover:bg-[#5A73A3]/90 text-white"
          >
            <FileText className="mr-2 h-5 w-5" />
            Create New Blog Post
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-[#5A73A3] text-[#5A73A3] hover:bg-[#5A73A3] hover:text-white transition-colors duration-200"
            onClick={() => setActiveTab('repurpose')}
          >
            <Repeat className="mr-2 h-5 w-5" />
            Repurpose Existing Content
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div className="space-y-8">
          {/* Workflow Diagram */}
          <WorkflowDiagram />

          {/* Content Creation Section */}
          <ContentCreation activeTab={activeTab} />

          {/* Content Previews */}
          <ContentPreviews />
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-4">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

