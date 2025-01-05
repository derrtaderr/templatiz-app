"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerWithPresetsProps {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
}

export function DatePickerWithPresets({ selected, onSelect }: DatePickerWithPresetsProps) {
  const [selectedTime, setSelectedTime] = React.useState("12:00")

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const [hours, minutes] = selectedTime.split(":").map(Number)
      date.setHours(hours, minutes)
    }
    onSelect(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP HH:mm") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          value={selectedTime}
          onValueChange={setSelectedTime}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a time" />
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
        <div className="rounded-md border">
          <Calendar mode="single" selected={selected} onSelect={handleSelect} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSelect(addDays(new Date(), 1))}
          >
            Tomorrow
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleSelect(addDays(new Date(), 7))}
          >
            Next Week
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

