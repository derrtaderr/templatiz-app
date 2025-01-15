'use client'

import { TemplateGrid } from "@/components/template-grid"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Info, Plus } from "lucide-react"
import { CreateTemplateModal } from "@/components/create-template-modal"

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Template Library</h1>
          <p className="text-muted-foreground">Manage and adapt proven templates tailored to your brand and audience</p>
        </div>
        <Button 
          className="bg-[#5A73A3] hover:bg-[#5A73A3]/90 text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Template
        </Button>
      </div>

      <div className="text-sm text-muted-foreground flex items-center gap-2 bg-muted/30 p-2 rounded-md">
        <Info className="h-4 w-4" />
        <span>Pro tip: Install our browser extension to create templates directly from Twitter or LinkedIn posts</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="knowledge">Knowledge</SelectItem>
              <SelectItem value="authority">Authority</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="mostUsed">Most Used</SelectItem>
              <SelectItem value="topPerforming">Top Performing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TemplateGrid />

      <CreateTemplateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}

