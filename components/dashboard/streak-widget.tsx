'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Calendar, Award } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from 'next/link'

export function StreakWidget() {
  const [streak, setStreak] = useState(5) // This would be fetched from an API in a real implementation
  const [nextMilestone, setNextMilestone] = useState(7)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const progressValue = ((streak % 7) / 7) * 100
      setProgress(progressValue)
    }

    calculateProgress()
  }, [streak])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Your Streak</CardTitle>
        <Flame className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">{streak}-Day Streak</div>
            <p className="text-xs text-muted-foreground">
              {nextMilestone - streak} days until your {nextMilestone}-day badge!
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <Award className="h-6 w-6 text-gray-300" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current: {streak}-Day Streak Badge</p>
                <p>Next: {nextMilestone}-Day Streak Badge</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Progress value={progress} className="w-full" />
        <Link href="/calendar" passHref>
          <Button className="w-full" variant="default">
            <Calendar className="mr-2 h-4 w-4" /> Schedule a Post
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

