import { ContentCalendar } from "@/components/content-calendar"

export default function CalendarPage() {
  return (
    <div className="container py-6 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary pl-4">Content Calendar</h1>
          <p className="text-muted-foreground pl-4">Plan and Manage Your Content Strategy</p>
        </div>
      </div>
      <ContentCalendar />
    </div>
  )
}

