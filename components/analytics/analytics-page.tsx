"use client"

import { useState } from "react"
import { KPISection } from "./kpi-section"
import { FilterSection } from "./filter-section"
import { VisualizationSection } from "./visualization-section"
import { HighlightsSection } from "./highlights-section"
import { ExportButton } from "./export-button"
import { AlertsButton } from "./alerts-button"

export function AnalyticsPage() {
  const [filters, setFilters] = useState({
    timeRange: "30d",
    platform: "all",
    contentType: "all",
    engagementMetric: "all"
  })

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    // In a real implementation, this would trigger data fetching or recalculation
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <div className="flex space-x-4">
          <ExportButton />
          <AlertsButton />
        </div>
      </div>
      <KPISection />
      <FilterSection filters={filters} onFilterChange={handleFilterChange} />
      <div className="flex flex-col lg:flex-row gap-8">
        <VisualizationSection filters={filters} />
        <HighlightsSection />
      </div>
    </div>
  )
}

