import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns'
import { X, Linkedin, Twitter } from 'lucide-react'

interface SchedulePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSchedule: (postData: any) => void
}

export function SchedulePostModal({ isOpen, onClose, onSchedule }: SchedulePostModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState('12:00')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin')
  const [postContent, setPostContent] = useState('')

  const handleSchedule = () => {
    const postData = {
      date: selectedDate,
      time: selectedTime,
      template: selectedTemplate,
      platform: selectedPlatform,
      content: postContent,
    }
    onSchedule(postData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Schedule Post</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col max-h-[calc(100vh-200px)]">
          <div className="flex-grow overflow-y-auto pr-6">
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Date and Time</h3>
                <div className="grid grid-cols-[3fr,1fr] gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border w-full"
                      classNames={{
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                        day: "w-9 h-9",
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <div className="grid gap-2">
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 * 4 }).map((_, index) => {
                            const hours = Math.floor(index / 4);
                            const minutes = (index % 4) * 15;
                            const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                            return (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Post Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template">Template</Label>
                    <Select onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly-update">Weekly Update</SelectItem>
                        <SelectItem value="product-launch">Product Launch</SelectItem>
                        <SelectItem value="industry-news">Industry News</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select onValueChange={setSelectedPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">
                          <div className="flex items-center">
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn
                          </div>
                        </SelectItem>
                        <SelectItem value="twitter">
                          <div className="flex items-center">
                            <Twitter className="mr-2 h-4 w-4" />
                            Twitter
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="content">Post Content</Label>
                    <Textarea
                      id="content"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSchedule}>Schedule Post</Button>
        </DialogFooter>
      </DialogContent>
      <style>{`
        :global(.react-calendar) {
          width: 100% !important;
          background-color: var(--background);
          color: var(--foreground);
          border-radius: 8px;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.125em;
        }
        :global(.react-calendar__navigation button) {
          color: var(--foreground);
        }
        :global(.react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus) {
          background-color: var(--accent);
        }
        :global(.react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus) {
          background-color: var(--accent);
          color: var(--accent-foreground);
          border-radius: 6px;
        }
        :global(.react-calendar__tile--now) {
          background: var(--primary);
          border-radius: 6px;
          font-weight: bold;
          color: var(--primary-foreground);
        }
        :global(.react-calendar__tile--now:enabled:hover,
        .react-calendar__tile--now:enabled:focus) {
          background: var(--primary-foreground);
          border-radius: 6px;
          font-weight: bold;
          color: var(--primary);
        }
        :global(.react-calendar__tile--hasActive:enabled:hover,
        .react-calendar__tile--hasActive:enabled:focus) {
          background: var(--accent);
        }
        :global(.react-calendar__tile--active) {
          background: var(--accent);
          border-radius: 6px;
          font-weight: bold;
          color: var(--accent-foreground);
        }
        :global(.react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus) {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        :global(.react-calendar) {
          width: 100% !important;
        }
        :global(.react-calendar__month-view__days) {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
        }
        :global(.react-calendar__month-view__days__day) {
          max-width: none !important;
          aspect-ratio: 1;
        }
      `}</style>
    </Dialog>
  )
}

