import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Download, Share2, RefreshCw } from 'lucide-react'

interface GeneratedAudioItemProps {
  audio: {
    id: number
    script: string
    voice: string
    date: string
  }
}

export function GeneratedAudioItem({ audio }: GeneratedAudioItemProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would control audio playback
  }

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <p className="text-sm mb-1 font-medium">{audio.script}</p>
      <p className="text-xs text-muted-foreground mb-2">Voice: {audio.voice} | Created: {new Date(audio.date).toLocaleString()}</p>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={togglePlay}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

