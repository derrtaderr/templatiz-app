import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, startOfWeek, endOfWeek, addDays } from 'date-fns'
import { cn } from "@/lib/utils"
import { ScheduledPostCard } from './scheduled-post-card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface CalendarViewProps {
  view: 'month' | 'week' | 'day'
  currentDate: Date
  events: Array<{
    id: number
    title: string
    start: Date
    end: Date
    category: string
    platform: 'linkedin' | 'twitter' | 'youtube'
    contentType: string
    status: 'scheduled' | 'published' | 'draft'
    content: string
    engagementRate: number
  }>
  filters: {
    platforms: string[]
    categories: string[]
    contentTypes: string[]
    performance: string | null
  }
  onSelectPost: (post: any) => void
  onDragPost: (postId: number, newStart: Date) => void
}

export function CalendarView({ view, currentDate, events, filters, onSelectPost, onDragPost }: CalendarViewProps) {
  const filteredEvents = events.filter(event => 
    (!filters.platforms.length || filters.platforms.includes(event.platform)) &&
    (!filters.categories.length || filters.categories.includes(event.category.toLowerCase())) &&
    (!filters.contentTypes.length || filters.contentTypes.includes(event.contentType.toLowerCase())) &&
    (!filters.performance || (
      filters.performance === 'high' ? event.engagementRate > 7 :
      filters.performance === 'medium' ? event.engagementRate >= 4 && event.engagementRate <= 7 :
      event.engagementRate < 4
    ))
  )

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const postId = parseInt(result.draggableId);
    const newDate = new Date(result.destination.droppableId);
    onDragPost(postId, newDate);
  }

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-7 gap-2 p-2">
          {days.map((day, dayIdx) => (
            <Droppable key={day.toString()} droppableId={day.toISOString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'min-h-[120px] bg-background p-2 rounded-md shadow-sm transition-all duration-200',
                    'hover:shadow-md hover:bg-muted/5',
                    !isSameMonth(day, currentDate) && 'bg-muted/50 text-muted-foreground',
                    isToday(day) && 'ring-2 ring-primary',
                    'flex flex-col'
                  )}
                >
                  <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className={cn(
                      'self-start text-sm font-semibold mb-2',
                      isToday(day) && 'text-primary'
                    )}
                  >
                    {format(day, 'd')}
                  </time>
                  <div className="flex-1 overflow-y-auto space-y-1">
                    {filteredEvents
                      .filter(event => isSameDay(day, event.start))
                      .map((event, index) => (
                        <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ScheduledPostCard event={event} onClick={() => onSelectPost(event)} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const weekEnd = endOfWeek(currentDate)
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-7 gap-2 p-2">
          {days.map((day) => (
            <Droppable key={day.toString()} droppableId={day.toISOString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'min-h-[240px] bg-background p-2 rounded-md shadow-sm transition-all duration-200',
                    'hover:shadow-md hover:bg-muted/5',
                    isToday(day) && 'ring-2 ring-primary',
                    'flex flex-col'
                  )}
                >
                  <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className={cn(
                      'self-start text-sm font-semibold mb-2',
                      isToday(day) && 'text-primary'
                    )}
                  >
                    {format(day, 'EEE d')}
                  </time>
                  <div className="flex-1 overflow-y-auto space-y-1">
                    {filteredEvents
                      .filter(event => isSameDay(day, event.start))
                      .map((event, index) => (
                        <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ScheduledPostCard event={event} onClick={() => onSelectPost(event)} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    )
  }

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col gap-2 p-2">
          {hours.map((hour) => (
            <Droppable key={hour} droppableId={`${currentDate.toISOString()}-${hour}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[60px] bg-background p-2 rounded-md shadow-sm flex items-center"
                >
                  <time className="text-sm font-semibold w-16">
                    {format(new Date().setHours(hour), 'HH:mm')}
                  </time>
                  <div className="flex-1 ml-4 space-y-1">
                    {filteredEvents
                      .filter(event => 
                        isSameDay(currentDate, event.start) && 
                        event.start.getHours() === hour
                      )
                      .map((event, index) => (
                        <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ScheduledPostCard event={event} onClick={() => onSelectPost(event)} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    )
  }

  return (
    <div className="bg-background border rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-7 gap-px border-b border-border/10">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-muted/5 px-4 py-3 text-center">
            <span className="text-sm font-bold">{day}</span>
          </div>
        ))}
      </div>
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}
    </div>
  )
}

