"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Play, Download, Share2, RefreshCw, Search, Filter } from 'lucide-react'
import { VoiceCard } from "./voice-card"
import { GeneratedAudioItem } from "./generated-audio-item"
import { VoiceCloneModal } from "./voice-clone-modal"
import { VoiceLibrary } from "./voice-library"

const placeholderAudios = [
  { id: 1, script: "Welcome to Templatiz AI Voice", voice: "Emma", date: new Date().toISOString() },
  { id: 2, script: "Create engaging content effortlessly", voice: "James", date: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, script: "Boost your productivity with AI", voice: "Sophia", date: new Date(Date.now() - 172800000).toISOString() },
];

const voiceCategories = ["All", "Custom", "American", "British", "Australian", "Narration", "Conversational", "Meditation"]
const voiceAttributes = ["Gender", "Tone", "Purpose"]

const mockVoices = [
  { id: 1, name: "Emma", category: "American", gender: "Female", tone: "Friendly", purpose: "Narration" },
  { id: 2, name: "James", category: "British", gender: "Male", tone: "Professional", purpose: "Business" },
  { id: 3, name: "Olivia", category: "Australian", gender: "Female", tone: "Energetic", purpose: "Advertising" },
  { id: 4, name: "Michael", category: "American", gender: "Male", tone: "Calm", purpose: "Meditation" },
  { id: 5, name: "Sophia", category: "British", gender: "Female", tone: "Authoritative", purpose: "Education" },
  { id: 6, name: "Ethan", category: "Australian", gender: "Male", tone: "Conversational", purpose: "Podcast" },
]

export function AIVoiceSetup() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null)
  const [script, setScript] = useState("")
  const [generatedAudios, setGeneratedAudios] = useState(placeholderAudios);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleGenerateAudio = () => {
    if (script && selectedVoice) {
      const voice = mockVoices.find(v => v.id === selectedVoice)
      const newAudio = {
        id: Date.now(),
        script: script.substring(0, 50) + (script.length > 50 ? "..." : ""),
        voice: voice?.name || "Unknown",
        date: new Date().toISOString(),
      }
      setGeneratedAudios([newAudio, ...generatedAudios])
    }
  }

  const filteredVoices = mockVoices.filter(voice => 
    (selectedCategory === "All" || voice.category === selectedCategory) &&
    (voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     voice.tone.toLowerCase().includes(searchTerm.toLowerCase()) ||
     voice.purpose.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">AI Voice Setup</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Create, select, and manage AI-generated voices for your content
        </p>
      </div>

      <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Speech</CardTitle>
              <CardDescription>
                Start typing your script to generate Text to Speech audio. You can also Record audio for Custom Voice.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your script here..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <Select onValueChange={(value) => setSelectedVoice(Number(value))}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockVoices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id.toString()}>{voice.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleGenerateAudio} 
                  disabled={!script || !selectedVoice}
                  className="bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white"
                >
                  Generate Audio
                </Button>
              </div>
            </CardContent>
          </Card>

          <VoiceLibrary />

          <Card>
            <CardHeader>
              <CardTitle>Clone Your Voice</CardTitle>
              <CardDescription>Create an AI model of your own voice for personalized content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="inline-flex bg-[#5A73A3] hover:bg-[#5A73A3]/80 text-white px-4 py-2"
                onClick={() => setIsCloneModalOpen(true)}
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Voice Cloning
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generated Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {generatedAudios.map((audio) => (
                <GeneratedAudioItem key={audio.id} audio={audio} />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <VoiceCloneModal isOpen={isCloneModalOpen} onClose={() => setIsCloneModalOpen(false)} />
    </div>
  )
}

