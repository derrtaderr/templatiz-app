import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Eye, Edit, Calendar, BarChart2 } from 'lucide-react'

interface QuickActionsPanelProps {
  currentStep: number
  onGenerateAll: () => void
  onPreviewOutputs: () => void
  onEditOutputs: () => void
  onScheduleContent: () => void
  onViewAnalytics: () => void
}

export function QuickActionsPanel({
  currentStep,
  onGenerateAll,
  onPreviewOutputs,
  onEditOutputs,
  onScheduleContent,
  onViewAnalytics
}: QuickActionsPanelProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentStep >= 1 && (
          <Button className="w-full justify-start bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white" onClick={onGenerateAll}>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate All Content
          </Button>
        )}
        <Button className="w-full justify-start" variant="outline" onClick={onPreviewOutputs}>
          <Eye className="mr-2 h-4 w-4" />
          Preview Outputs
        </Button>
        {currentStep >= 1 && (
          <Button className="w-full justify-start" variant="outline" onClick={onEditOutputs}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Individual Outputs
          </Button>
        )}
        {currentStep >= 2 && (
          <Button className="w-full justify-start" variant="outline" onClick={onScheduleContent}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Content
          </Button>
        )}
        <Button className="w-full justify-start" variant="outline" onClick={onViewAnalytics}>
          <BarChart2 className="mr-2 h-4 w-4" />
          View Analytics
        </Button>
      </CardContent>
    </Card>
  )
}

