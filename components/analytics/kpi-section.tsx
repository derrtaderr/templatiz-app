import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, BarChart2, Award } from 'lucide-react'

export function KPISection() {
  const kpis = [
    { title: "Total Engagement", value: "24.5K", change: "+12%", icon: BarChart2 },
    { title: "Audience Growth", value: "2.1K", change: "+5%", icon: Users },
    { title: "Top Platform", value: "LinkedIn", change: "", icon: Award },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
      {kpis.map((kpi, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            {kpi.change && (
              <p className="text-xs text-muted-foreground">
                <ArrowUpRight className="h-4 w-4 text-green-500 inline mr-1" />
                {kpi.change} from last month
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

