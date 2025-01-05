import { FileText, Linkedin, Twitter, Video, PlayCircle } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const workflowSteps = [
  {
    icon: FileText,
    title: "Blog Post",
    description: "Write or upload your content",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Posts",
    description: "Turn insights into professional updates",
  },
  {
    icon: Twitter,
    title: "Twitter Threads",
    description: "Generate engaging, concise threads",
  },
  {
    icon: Video,
    title: "YouTube Shorts",
    description: "Create video scripts and voiceovers",
  },
  {
    icon: PlayCircle,
    title: "Long-Form Videos",
    description: "Expand ideas into full videos",
  },
]

export function WorkflowDiagram() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Workflow Overview</h2>
          
          <div className="flex justify-between items-center">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center max-w-[150px] relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <step.icon className="h-10 w-10 text-primary" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preview this in Quick Actions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <h3 className="font-medium mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < workflowSteps.length - 1 && (
                  <div className="absolute top-10 -right-1/2 w-full h-0.5 bg-muted-foreground/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

