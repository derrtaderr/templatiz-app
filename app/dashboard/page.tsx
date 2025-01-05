import { 
  WelcomeMessage,
  MetricCard,
  RecentActivity,
  PopularTemplates,
  PerformanceInsights,
  ContentMultiplicationQuickAccess,
  VideoStudioQuickAccess
} from "@/components/dashboard/dashboard-components"
import { StreakWidget } from "@/components/dashboard/streak-widget"

export default function DashboardPage() {
  return (
    <div className="container py-6 space-y-8">
      <WelcomeMessage name="John Doe" />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-1">
          <StreakWidget />
        </div>
        <MetricCard 
          title="Templates Created" 
          value="18/30" 
          progress={60} 
        />
        <MetricCard 
          title="Scheduled Posts" 
          value="12" 
          subtext="this week" 
        />
        <MetricCard 
          title="Recent Engagement" 
          value="8.5%" 
          subtext="avg. rate" 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <div className="space-y-6">
          <ContentMultiplicationQuickAccess />
          <VideoStudioQuickAccess />
        </div>
      </div>

      <PopularTemplates />
      
      <PerformanceInsights />
    </div>
  )
}

