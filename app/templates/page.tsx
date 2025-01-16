'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { TemplateGrid, TemplateGridRef } from "@/components/template-grid"
import { CreateTemplateModal } from "@/components/create-template-modal"

export default function TemplatesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const templateGridRef = useRef<TemplateGridRef>(null)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Template Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage your content templates
          </p>
        </div>
        <Button 
          className="bg-[#5A73A3] hover:bg-[#5A73A3]/90 text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Template
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Pro tip: Install our browser extension to create templates directly from Twitter or LinkedIn posts
      </p>

      <TemplateGrid ref={templateGridRef} />

      <CreateTemplateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          templateGridRef.current?.fetchTemplates()
        }}
      />
    </div>
  )
}

