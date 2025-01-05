"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Filter } from 'lucide-react'
import { VoiceCard } from "./voice-card"

const voiceCategories = [
  "All",
  "American",
  "Irish",
  "British",
  "Video games",
  "News",
  "Meditation",
  "Children's stories"
]

const mockVoices = [
  {
    id: 1,
    name: "Maggie",
    description: ["Narration", "American", "Feminine"],
  },
  {
    id: 2,
    name: "Jack",
    description: ["Video games", "Irish", "Masculine"],
  },
  {
    id: 3,
    name: "Katie",
    description: ["News", "American", "Feminine"],
  },
  {
    id: 4,
    name: "Noah",
    description: ["Meditation", "American", "Masculine"],
  },
  {
    id: 5,
    name: "Rina",
    description: ["Meditation", "American", "Feminine"],
  },
  {
    id: 6,
    name: "Mariah",
    description: ["Children's stories", "British", "Feminine"],
  },
]

export function VoiceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVoices = mockVoices.filter(voice => 
    (selectedCategory === "All" || voice.description.includes(selectedCategory)) &&
    (voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     voice.description.some(desc => desc.toLowerCase().includes(searchTerm.toLowerCase())))
  )

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Voice Library</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search voices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ScrollArea className="pb-2" orientation="horizontal">
          <div className="flex gap-2 pt-2">
            {voiceCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[500px] pr-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredVoices.map((voice) => (
              <VoiceCard
                key={voice.id}
                voice={voice}
                onSelect={() => console.log("Selected voice:", voice.name)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

