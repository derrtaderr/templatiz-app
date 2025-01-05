import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Linkedin, Twitter, Video, PlayCircle, Check } from 'lucide-react'
import { cn } from "@/lib/utils"

const workflowSteps = [
  { icon: FileText, title: "Blog Post", description: "Write or generate your content" },
  { icon: Linkedin, title: "LinkedIn Posts", description: "Create professional updates" },
  { icon: Twitter, title: "Twitter Threads", description: "Generate engaging threads" },
  { icon: Video, title: "YouTube Shorts", description: "Create video scripts" },
  { icon: PlayCircle, title: "Long-Form Videos", description: "Expand ideas into full videos" },
]

interface WorkflowOverviewProps {
  currentStep: number
  onStepClick: (step: number) => void
}

export function WorkflowOverview({ currentStep, onStepClick }: WorkflowOverviewProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 500)
    return () => clearTimeout(timer)
  }, [currentStep])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center justify-items-center">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center text-center w-full relative">
              <Button
                variant="ghost"
                className={cn(
                  "h-20 w-20 rounded-full mb-4 relative hover:bg-primary/10 transition-all duration-200",
                  "flex items-center justify-center",
                  index < currentStep && "bg-primary text-primary-foreground",
                  index === currentStep && "ring-2 ring-primary ring-offset-2",
                  animate && index === currentStep && "animate-pulse"
                )}
                onClick={() => onStepClick(index)}
              >
                {index < currentStep ? (
                  <Check className="h-10 w-10" />
                ) : (
                  <step.icon className="h-10 w-10" />
                )}
              </Button>
              <h3 className="font-medium text-sm mt-2 mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground">{step.description}</p>
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary/20 transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

