"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Sun, Moon } from "lucide-react"
import { format, eachDayOfInterval, startOfDay, endOfDay, isWithinInterval } from "date-fns"
import { CustomCalendar } from "@/components/custom-calendar"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface TimeBlock {
  id: string
  start: Date
  end: Date
  period: "morning" | "afternoon" | "evening"
  selected: boolean
}

interface DaySchedule {
  date: Date
  timeBlocks: TimeBlock[]
}

interface CalendarEvent {
  start: { dateTime: string }
  end: { dateTime: string }
}

const generateTimeBlocks = (date: Date, meetingLength: number, bufferTime: number, events: CalendarEvent[] = []): TimeBlock[] => {
  const blocks: TimeBlock[] = []
  const dayStart = new Date(date)
  dayStart.setHours(9, 0, 0, 0)
  const dayEnd = new Date(date)
  dayEnd.setHours(18, 0, 0, 0)

  let currentTime = new Date(dayStart)

  console.log('Generating blocks for date:', date)
  console.log('Events to check:', events.map(event => ({
    start: new Date(event.start.dateTime).toLocaleTimeString(),
    end: new Date(event.end.dateTime).toLocaleTimeString()
  })))

  while (currentTime < dayEnd) {
    const blockEnd = new Date(currentTime.getTime() + meetingLength * 60000)
    if (blockEnd > dayEnd) break

    const isAvailable = !events.some(event => {
      const eventStart = new Date(event.start.dateTime)
      const eventEnd = new Date(event.end.dateTime)
      
      const hasOverlap = (
        (currentTime >= eventStart && currentTime < eventEnd) ||  // block starts during event
        (blockEnd > eventStart && blockEnd <= eventEnd) ||       // block ends during event
        (currentTime <= eventStart && blockEnd >= eventEnd)      // block completely contains event
      )

      if (hasOverlap) {
        console.log('Time block:', {
          blockStart: currentTime.toLocaleTimeString(),
          blockEnd: blockEnd.toLocaleTimeString(),
          eventStart: eventStart.toLocaleTimeString(),
          eventEnd: eventEnd.toLocaleTimeString(),
          conditions: {
            startsInEvent: currentTime >= eventStart && currentTime < eventEnd,
            endsInEvent: blockEnd > eventStart && blockEnd <= eventEnd,
            containsEvent: currentTime <= eventStart && blockEnd >= eventEnd
          }
        })
      }

      return hasOverlap
    })

    blocks.push({
      id: currentTime.toISOString(),
      start: new Date(currentTime),
      end: blockEnd,
      period: currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 17 ? "afternoon" : "evening",
      selected: isAvailable,
    })

    currentTime = new Date(blockEnd.getTime() + bufferTime * 60000)
  }

  return blocks
}

export default function SchedulePage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [schedule, setSchedule] = useState<DaySchedule[]>([])
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle")
  const [selectAllState, setSelectAllState] = useState<"select" | "unselect">("unselect")
  const [meetingLength, setMeetingLength] = useState(30)
  const [bufferTime, setBufferTime] = useState(15)
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated" || !session?.accessToken) {
      router.push('/')
    }
  }, [status, session, router])

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!session?.accessToken) {
    return null
  }

  const fetchCalendarEvents = async (dates: Date[]) => {
    if (dates.length === 0) return
    
    const startDate = startOfDay(dates[0])
    const endDate = endOfDay(dates[dates.length - 1])
    
    try {
      const response = await fetch(
        `/api/calendar/events?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
      )
      if (!response.ok) throw new Error('Failed to fetch calendar events')
      const events = await response.json()
      console.log('Fetched calendar events:', events)
      setCalendarEvents(events)
    } catch (error) {
      console.error('Error fetching calendar events:', error)
    }
  }

  useEffect(() => {
    if (selectedDates.length > 0) {
      fetchCalendarEvents(selectedDates)
    }
  }, [selectedDates])

  useEffect(() => {
    const newSchedule = selectedDates.map(date => {
      // Filter events for this specific date
      const dateEvents = calendarEvents.filter(event => {
        const eventStart = new Date(event.start.dateTime)
        const eventDay = startOfDay(eventStart).getTime()
        const selectedDay = startOfDay(date).getTime()
        const isMatch = eventDay === selectedDay
        
        if (isMatch) {
          console.log('Found event:', {
            summary: event.summary,
            start: new Date(event.start.dateTime).toLocaleTimeString(),
            end: new Date(event.end.dateTime).toLocaleTimeString()
          })
        }
        
        return isMatch
      })

      // Create a new date at midnight for the selected date
      const selectedDate = new Date(date)
      selectedDate.setHours(0, 0, 0, 0)

      return {
        date: selectedDate,
        timeBlocks: generateTimeBlocks(selectedDate, meetingLength, bufferTime, dateEvents)
      }
    })
    setSchedule(newSchedule)
  }, [selectedDates, meetingLength, bufferTime, calendarEvents])

  useEffect(() => {
    updateSelectAllState()
  }, [])

  const handleDateSelection = (dates: Date[]) => {
    setSelectedDates(dates)
  }

  const toggleTimeBlock = (dayIndex: number, blockId: string) => {
    setSchedule((prev) =>
      prev.map((day, dIdx) => {
        if (dIdx === dayIndex) {
          return {
            ...day,
            timeBlocks: day.timeBlocks.map((block) =>
              block.id === blockId ? { ...block, selected: !block.selected } : block,
            ),
          }
        }
        return day
      }),
    )
  }

  const getTimeZoneAbbr = () => {
    const date = new Date()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // Convert time zone to abbreviation
    const timeZoneStr = date.toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone })
    return timeZoneStr.split(' ').pop() // Gets "PST" or "PDT" from the string
  }

  const handleCopy = () => {
    const timeZoneAbbr = getTimeZoneAbbr()
    const selectedRanges = schedule
      .map((day) => {
        const selectedBlocks = day.timeBlocks.filter((block) => block.selected)
        if (selectedBlocks.length === 0) return null

        // Sort blocks by start time
        selectedBlocks.sort((a, b) => a.start.getTime() - b.start.getTime())

        // Combine adjacent blocks (considering buffer time)
        const combinedBlocks: { start: Date; end: Date }[] = []
        let currentBlock = { start: selectedBlocks[0].start, end: selectedBlocks[0].end }

        for (let i = 1; i < selectedBlocks.length; i++) {
          const block = selectedBlocks[i]
          const expectedNextStart = new Date(currentBlock.end.getTime() + bufferTime * 60000)
          
          // Check if this block starts exactly after the buffer time
          if (block.start.getTime() === expectedNextStart.getTime()) {
            currentBlock.end = block.end
          } else {
            combinedBlocks.push({ ...currentBlock })
            currentBlock = { start: block.start, end: block.end }
          }
        }
        combinedBlocks.push(currentBlock)

        const timeRanges = combinedBlocks
          .map((block) => `${format(block.start, "h:mm a")} - ${format(block.end, "h:mm a")}`)
          .join("\n")

        return `${format(day.date, "EEEE, MMMM d")}:\n${timeRanges}`
      })
      .filter(Boolean)
      .join("\n\n")

    const textToCopy = `My availability is (${timeZoneAbbr}):\n\n${selectedRanges}`
    navigator.clipboard.writeText(textToCopy)
    setCopyState("copied")
    setTimeout(() => setCopyState("idle"), 2000)
  }

  const updateSelectAllState = () => {
    const allSelected = schedule.every((day) => day.timeBlocks.every((block) => block.selected))
    const noneSelected = schedule.every((day) => day.timeBlocks.every((block) => !block.selected))
    setSelectAllState(noneSelected ? "select" : "unselect")
  }

  const handleSelectAll = () => {
    const newSchedule = schedule.map((day) => ({
      ...day,
      timeBlocks: day.timeBlocks.map((block) => ({ ...block, selected: selectAllState === "select" })),
    }))
    setSchedule(newSchedule)
    setSelectAllState(selectAllState === "select" ? "unselect" : "select")
  }

  const isAnythingSelected = schedule.some((day) => day.timeBlocks.some((block) => block.selected))

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <div className="container mx-auto px-4 py-8 max-h-[calc(100vh-64px)] overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-128px)] max-h-[675px]">
          <Card className="bg-[#1A1A1A] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Select Dates</CardTitle>
              <CardDescription className="text-white/70">Choose a date range for your availability</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomCalendar 
                selectedDates={selectedDates} 
                onSelect={handleDateSelection} 
                className="rounded-2xl"
              />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-white/10 flex flex-col h-full overflow-hidden">
            <CardHeader className="flex-shrink-0">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <CardTitle className="text-white">Available Times</CardTitle>
                  <CardDescription className="text-white/70">Select your available time blocks</CardDescription>
                </div>
                <div className="flex space-x-4">
                  <div>
                    <label htmlFor="meeting-length" className="block text-sm font-medium text-white mb-1">
                      Meeting Length
                    </label>
                    <Select
                      id="meeting-length"
                      value={meetingLength.toString()}
                      onValueChange={(value) => setMeetingLength(Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-[180px] bg-[#232323] border-white/10 text-white">
                        <SelectValue placeholder="Meeting Length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="buffer-time" className="block text-sm font-medium text-white mb-1">
                      Buffer Time
                    </label>
                    <Select
                      id="buffer-time"
                      value={bufferTime.toString()}
                      onValueChange={(value) => setBufferTime(Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-[180px] bg-[#232323] border-white/10 text-white">
                        <SelectValue placeholder="Buffer Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                {schedule.length > 0 && (
                  <Button onClick={handleSelectAll} className="bg-black text-white hover:bg-gray-800 transition-all">
                    {selectAllState === "select" ? "Select All" : "Unselect All"}
                  </Button>
                )}
                <Button
                  onClick={handleCopy}
                  className={`bg-primary text-white hover:bg-primary-hover transition-all relative ${
                    !isAnythingSelected ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!isAnythingSelected}
                >
                  <AnimatePresence mode="wait">
                    {copyState === "idle" ? (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copied"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-4">
              <div className="space-y-8">
                {schedule.length > 0 ? (
                  schedule.map((day, dayIndex) => (
                    <div key={day.date.toISOString()} className="space-y-4">
                      <h3 className="font-medium text-white">{format(day.date, "EEEE, MMMM d, yyyy")}</h3>
                      <div className="relative pl-8">
                        <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-700" />
                        {day.timeBlocks.map((block) => (
                          <button
                            key={block.id}
                            onClick={() => toggleTimeBlock(dayIndex, block.id)}
                            className={`
                              relative w-full p-4 mb-2 rounded-lg transition-all
                              ${block.selected ? "bg-[#232323] border border-white/20" : "bg-transparent border border-dashed border-white/20"}
                            `}
                          >
                            <div className="absolute -left-8 top-1/2 -translate-y-1/2 p-1 rounded-full bg-[#1A1A1A]">
                              {block.period === "morning" ? (
                                <Sun className="h-4 w-4 text-primary" />
                              ) : (
                                <Moon className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white">
                                {format(block.start, "h:mm a")} - {format(block.end, "h:mm a")}
                              </span>
                              <span className="text-sm text-white/50 capitalize">{block.period}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/70">Please select dates to see available times.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
