import { TemplateGrid } from "@/components/template-grid"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export default function TemplatesPage() {
  return (
    <div className="container py-6 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Your Template Library</h1>
          <p className="text-muted-foreground">Manage and adapt proven templates tailored to your brand and audience</p>
        </div>
        <Button className="bg-[#5A73A3] text-white hover:bg-[#5A73A3]/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Template
        </Button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Suggested Templates</h2>
        {/* Add a carousel or grid of suggested templates here */}
        <p className="text-muted-foreground">AI-powered suggestions coming soon...</p>
      </div>
      <TemplateGrid />
    </div>
  )
}

