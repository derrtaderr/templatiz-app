import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Video, PlayCircle, BarChart, Edit, Send, Calendar, Save, ArrowRight, BarChart2 } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DatePickerWithPresets } from "@/components/date-picker-with-presets"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContentPreviewsProps {
  platformContent: {
    linkedin: string
    twitter: string
    youtube: string
    longform: string
  }
}

export function ContentPreviews({ platformContent }: ContentPreviewsProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handlePostNow = (platform: string) => {
    // Implement post now functionality
    console.log(`Posting to ${platform} now`)
  }

  const handleSchedule = (platform: string) => {
    // Implement schedule functionality
    console.log(`Scheduling post for ${platform} on ${selectedDate}`)
  }

  const handleSaveDraft = (platform: string) => {
    // Implement save draft functionality
    console.log(`Saving draft for ${platform}`)
  }

  const handleSendToVideoStudio = (platform: string) => {
    // Implement send to video studio functionality
    console.log(`Sending script to Video Studio for ${platform}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Previews</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="linkedin" className="w-full">
          <TabsList>
            <TabsTrigger value="linkedin">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </TabsTrigger>
            <TabsTrigger value="twitter">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </TabsTrigger>
            <TabsTrigger value="youtube">
              <Video className="mr-2 h-4 w-4" />
              YouTube Shorts
            </TabsTrigger>
            <TabsTrigger value="longform">
              <PlayCircle className="mr-2 h-4 w-4" />
              Long-form
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="linkedin" className="space-y-4 pt-4">
            <PreviewCard
              platform="LinkedIn"
              type="Professional Post"
              engagement="High"
              preview={platformContent.linkedin}
              onPostNow={() => handlePostNow('linkedin')}
              onSchedule={(date) => handleSchedule('linkedin')}
              onSaveDraft={() => handleSaveDraft('linkedin')}
            />
          </TabsContent>
          
          <TabsContent value="twitter" className="space-y-4 pt-4">
            <PreviewCard
              platform="Twitter"
              type="Thread"
              engagement="Medium"
              preview={platformContent.twitter}
              onPostNow={() => handlePostNow('twitter')}
              onSchedule={(date) => handleSchedule('twitter')}
              onSaveDraft={() => handleSaveDraft('twitter')}
            />
          </TabsContent>
          
          <TabsContent value="youtube" className="space-y-4 pt-4">
            <PreviewCard
              platform="YouTube Shorts"
              type="Video Script"
              engagement="Very High"
              preview={platformContent.youtube}
              onSendToVideoStudio={() => handleSendToVideoStudio('youtube')}
              onSaveDraft={() => handleSaveDraft('youtube')}
            />
          </TabsContent>
          
          <TabsContent value="longform" className="space-y-4 pt-4">
            <PreviewCard
              platform="YouTube"
              type="Full Video"
              engagement="High"
              preview={platformContent.longform}
              onSendToVideoStudio={() => handleSendToVideoStudio('youtube-longform')}
              onSaveDraft={() => handleSaveDraft('youtube-longform')}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface PreviewCardProps {
  platform: string
  type: string
  engagement: string
  preview: string
  onPostNow?: () => void
  onSchedule?: (date: Date) => void
  onSaveDraft: () => void
  onSendToVideoStudio?: () => void
}

function PreviewCard({ platform, type, engagement, preview, onPostNow, onSchedule, onSaveDraft, onSendToVideoStudio }: PreviewCardProps) {
  const [isPostNowDialogOpen, setIsPostNowDialogOpen] = useState(false)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const isVideoContent = platform.includes('YouTube')

  const handleViewAnalytics = () => {
    // Implement view analytics functionality
    console.log(`Viewing analytics for ${platform}`)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{type}</h3>
                <Badge variant="outline">{platform}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <BarChart className="mr-1 h-4 w-4" />
                Expected Engagement: {engagement}
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit your content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            value={preview}
            onChange={(e) => {/* Handle content change */}}
            className="min-h-[200px]"
            placeholder={`Enter your ${platform} content here...`}
          />
          <div className="flex justify-between mt-4">
            {isVideoContent ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" onClick={onSendToVideoStudio}>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Send to Video Studio
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Finalize your script in the Video Studio before posting</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <>
                <Dialog open={isPostNowDialogOpen} onOpenChange={setIsPostNowDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <Send className="mr-2 h-4 w-4" />
                      Post Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Post to {platform}</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to post this content to {platform} now?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsPostNowDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => { onPostNow?.(); setIsPostNowDialogOpen(false); }}>Post Now</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule Post for {platform}</DialogTitle>
                      <DialogDescription>
                        Choose a date and time to schedule your post.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <DatePickerWithPresets selected={selectedDate} onSelect={setSelectedDate} />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => { onSchedule?.(selectedDate!); setIsScheduleDialogOpen(false); }} disabled={!selectedDate}>
                        Schedule
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={onSaveDraft}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isVideoContent ? "Save script for later editing or workflow continuation" : "Save content as a draft for later editing or posting"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={handleViewAnalytics}>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View performance analytics for this content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

