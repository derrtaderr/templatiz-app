"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadIcon as FileUpload, Sparkles, Wand2, RefreshCw } from 'lucide-react'
import { BlogCreation } from "./blog-creation"

interface ContentCreationProps {
  activeTab: 'create' | 'repurpose'
}

export function ContentCreation({ activeTab }: ContentCreationProps) {
  return (
    <Card className="relative" id="content-creation">
      <CardHeader>
        <CardTitle>Content Creation</CardTitle>
        <CardDescription>
          Create new content or repurpose existing content for multiple platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create New Blog Post</TabsTrigger>
            <TabsTrigger value="repurpose">Repurpose Existing Content</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="space-y-4">
            <BlogCreation />
          </TabsContent>
          <TabsContent value="repurpose" className="space-y-4">
            <div className="space-y-4 pt-4">
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileUpload className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h3 className="font-medium">Upload Existing Content</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your blog post or text file here
                      </p>
                    </div>
                    <Button>Choose File</Button>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-2">
                <h3 className="font-medium">AI Processing</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Extract key insights automatically</li>
                  <li>• Adapt content tone for each platform</li>
                  <li>• Generate platform-specific variations</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

