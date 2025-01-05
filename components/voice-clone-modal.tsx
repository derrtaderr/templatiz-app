import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mic, Upload } from 'lucide-react'

interface VoiceCloneModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VoiceCloneModal({ isOpen, onClose }: VoiceCloneModalProps) {
  const [step, setStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Handle completion
      onClose()
    }
  }

  const handleRecord = () => {
    setIsRecording(!isRecording)
    // In a real implementation, this would start/stop recording
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Clone Your Voice</DialogTitle>
          <DialogDescription>
            Follow the steps to create an AI model of your voice.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {step === 1 && (
            <div className="space-y-4">
              <p>Step 1: Provide a name for your custom voice</p>
              <Label htmlFor="voice-name">Voice Name</Label>
              <Input id="voice-name" placeholder="Enter a name for your voice" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <p>Step 2: Record or upload voice samples</p>
              <Button onClick={handleRecord} className="w-full">
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
              <p className="text-center">or</p>
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Audio File
              </Button>
            </div>
          )}{step === 3 && (
            <div className="space-y-4">
              <p>Step 3: Processing your voice samples</p>
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-3/4"></div>
              </div>
              <p className="text-center text-sm text-muted-foreground">Processing... This may take a few minutes.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleNextStep} disabled={step === 3}>
            {step === 3 ? "Finish" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

