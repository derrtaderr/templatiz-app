import { Button } from "@/components/ui/button"
import { CalendarIcon, Filter, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarTopBarProps {
  view: 'month' | 'week' | 'day'
  setView: (view: 'month' | 'week' | 'day') => void
  currentDate: Date
  setCurrentDate: (date: Date) => void
  onCreatePost: () => void
  filters: {
    platforms: string[]
    categories: string[]
    contentTypes: string[]
    performance: string | null
  }
  setFilters: (filters: any) => void
}

export function CalendarTopBar({
  view,
  setView,
  currentDate,
  setCurrentDate,
  onCreatePost,
  filters,
  setFilters
}: CalendarTopBarProps) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-6">
      <div className="flex items-center space-x-4">
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('prev')}
            className="hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[140px] justify-center text-base font-semibold">
                {format(currentDate, 'MMMM yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('next')}
            className="hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">Timezone: {timeZone}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter Posts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Platform</DropdownMenuLabel>
            {['linkedin', 'twitter', 'youtube'].map((platform) => (
              <DropdownMenuCheckboxItem
                key={platform}
                checked={filters.platforms.includes(platform)}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    platforms: checked
                      ? [...filters.platforms, platform]
                      : filters.platforms.filter((p) => p !== platform),
                  })
                }
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            {['Knowledge', 'Growth', 'Authority'].map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={filters.categories.includes(category.toLowerCase())}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    categories: checked
                      ? [...filters.categories, category.toLowerCase()]
                      : filters.categories.filter((c) => c !== category.toLowerCase()),
                  })
                }
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Content Type</DropdownMenuLabel>
            {['Blog', 'Video', 'Post', 'Thread'].map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={filters.contentTypes.includes(type.toLowerCase())}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    contentTypes: checked
                      ? [...filters.contentTypes, type.toLowerCase()]
                      : filters.contentTypes.filter((t) => t !== type.toLowerCase()),
                  })
                }
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Performance</DropdownMenuLabel>
            {['High', 'Medium', 'Low'].map((performance) => (
              <DropdownMenuCheckboxItem
                key={performance}
                checked={filters.performance === performance.toLowerCase()}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    performance: checked ? performance.toLowerCase() : null,
                  })
                }
              >
                {performance}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={onCreatePost}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>
    </div>
  )
}

