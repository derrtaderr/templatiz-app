import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react'

export function AlertsButton() {
  const handleAlerts = () => {
    // Implement alerts functionality here
    console.log("Opening alerts...")
  }

  return (
    <Button variant="outline" onClick={handleAlerts}>
      <Bell className="mr-2 h-4 w-4" /> Alerts
    </Button>
  )
}

