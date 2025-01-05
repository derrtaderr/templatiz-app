import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

export function ExportButton() {
  const handleExport = () => {
    // Implement export functionality here
    console.log("Exporting data...")
  }

  return (
    <Button onClick={handleExport} className="bg-[#5A73A3] hover:bg-[#7A94C4]">
      <Download className="mr-2 h-4 w-4" /> Export Data
    </Button>
  )
}

