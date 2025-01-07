'use client'

import { WelcomeMessage, TemplatesProgress, PlatformMetrics, PerformanceInsights, QuickActions, RecentActivity } from "@/components/dashboard/dashboard-components"
import { StreakWidget } from "@/components/dashboard/streak-widget"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <WelcomeMessage name="Jason" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TemplatesProgress />
        <StreakWidget />
        <PlatformMetrics />
      </div>

      <QuickActions />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <PerformanceInsights />
        <RecentActivity />
      </div>
    </div>
  )
}

