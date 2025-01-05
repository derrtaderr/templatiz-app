import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Award, Share2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const badges = [
  { name: "5-Day Streak", earned: true },
  { name: "7-Day Streak", earned: false },
  { name: "14-Day Streak", earned: false },
  { name: "30-Day Streak", earned: false },
  { name: "50 Posts", earned: true },
  { name: "100 Posts", earned: false },
  { name: "1K Engagements", earned: true },
  { name: "10K Engagements", earned: false },
]

export function RewardsPage() {
  const currentStreak = 5
  const nextMilestone = 7
  const progress = (currentStreak / nextMilestone) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Rewards</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-2xl font-bold">{currentStreak} days</span>
            <span>{nextMilestone - currentStreak} days to next badge</span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <Card key={index} className={badge.earned ? "border-primary" : "opacity-50"}>
            <CardContent className="p-4 flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Award className={`h-12 w-12 ${badge.earned ? "text-yellow-500" : "text-gray-400"}`} />
                  </TooltipTrigger>
                  <TooltipContent>
                    {badge.earned ? "Earned!" : `Post consistently to unlock ${badge.name}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <h3 className="mt-2 font-semibold text-center">{badge.name}</h3>
              {badge.earned && (
                <Button variant="outline" size="sm" className="mt-2">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

