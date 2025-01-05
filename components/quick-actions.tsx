import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wand2, Eye, Edit, Calendar, BarChart2 } from 'lucide-react'

export function QuickActions() {
  return (
    <Card className="sticky top-4 bg-[#2d3748] border-[#4b5563] border-opacity-50">
      <CardHeader>
        <CardTitle className="text-[#f3f4f6]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full justify-start bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white transition-colors duration-200" size="default">
          <Wand2 className="mr-2 h-5 w-5" />
          Generate All Content
        </Button>
        <div className="space-y-3">
          <Button className="w-full justify-start bg-white text-[#5A73A3] hover:bg-[#5A73A3]/10 transition-colors duration-200" variant="outline">
            <Eye className="mr-2 h-5 w-5" />
            Preview Outputs
          </Button>
          <Button className="w-full justify-start bg-white text-[#5A73A3] hover:bg-[#5A73A3]/10 transition-colors duration-200" variant="outline">
            <Edit className="mr-2 h-5 w-5" />
            Edit Individual Outputs
          </Button>
          <Button className="w-full justify-start bg-white text-[#5A73A3] hover:bg-[#5A73A3]/10 transition-colors duration-200" variant="outline">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Content
          </Button>
          <Button className="w-full justify-start bg-white text-[#5A73A3] hover:bg-[#5A73A3]/10 transition-colors duration-200" variant="outline">
            <BarChart2 className="mr-2 h-5 w-5" />
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

