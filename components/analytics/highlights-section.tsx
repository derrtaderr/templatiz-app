import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function HighlightsSection() {
  const highlights = [
    { title: "Top Performing Post", content: "Your LinkedIn post on AI trends reached 10K impressions", badge: "LinkedIn" },
    { title: "Audience Growth", content: "Your Twitter followers grew by 15% this month", badge: "Twitter" },
    { title: "Template Success", content: "The 'Weekly Update' template increased engagement by 25%", badge: "Template" },
  ]

  return (
    <Card className="w-full lg:w-1/3">
      <CardHeader>
        <CardTitle>Highlights & Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {highlights.map((highlight, index) => (
            <li key={index} className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{highlight.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{highlight.content}</p>
              <Badge variant="secondary">{highlight.badge}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

