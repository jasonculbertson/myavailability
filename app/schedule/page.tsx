"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { format, eachDayOfInterval } from "date-fns"
import { CustomCalendar } from "@/components/custom-calendar"
import { motion, AnimatePresence } from "framer-motion"

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

const generateTimeBlocks = (date: Date, meetingLength: number, bufferTime: number): TimeBlock[] => {
  const blocks: TimeBlock[] = []
  let currentTime = new Date(date.setHours(9, 0, 0, 0))
  const endTime = new Date(date.setHours(17, 0, 0, 0))

  while (currentTime < endTime) {
    const blockEnd = new Date(currentTime.getTime() + meetingLength * 60000)
    if (blockEnd > endTime) break

    blocks.push({
      id: currentTime.toISOString(),
      start: new Date(currentTime),
      end: blockEnd,
      period: currentTime.getHours() < 12 ? "morning" : "afternoon",
      selected: true,
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

  useEffect(() => {
    updateSelectAllState()
  }, [])

  useEffect(() => {
    if (selectedDates.length > 0) {
      const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime())
      const days = eachDayOfInterval({
        start: sortedDates[0],
        end: sortedDates[sortedDates.length - 1],
      })

      setSchedule(
        days.map((day) => ({
          date: day,
          timeBlocks: generateTimeBlocks(day, meetingLength, bufferTime),
        })),
      )
    }
  }, [selectedDates, meetingLength, bufferTime])

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

  const handleCopy = () => {
    const selectedRanges = schedule
      .map((day) => {
        const selectedBlocks = day.timeBlocks
          .filter((block) => block.selected)
          .map((block) => `${format(block.start, "h:mm a")} - ${format(block.end, "h:mm a")}`)
        if (selectedBlocks.length > 0) {
          return `${format(day.date, "EEEE, MMMM d")}:\n${selectedBlocks.join("\n")}`
        }
        return null
      })
      .filter(Boolean)
      .join("\n\n")

    const textToCopy = `My availability is:\n\n${selectedRanges}`
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
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-primary">
              MyAvailability
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/how-it-works" className="text-white/70 hover:text-white transition-colors">
                How it Works
              </Link>
              <Link href="/schedule" className="text-white/70 hover:text-white transition-colors">
                Schedule
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white/70 hover:text-white transition-colors">Log In</button>
            <Button className="bg-primary hover:bg-primary-hover text-white border-0">Get started</Button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8 max-h-[calc(100vh-64px)] overflow-hidden">
        {/* Remove this line */}
        {/* <Link href="/" className="inline-flex items-center text-primary hover:text-primary-hover mb-8">
          ← Back to Home
        </Link> */}
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-128px)] max-h-[675px]">
          <Card className="bg-[#1A1A1A] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Select Dates</CardTitle>
              <CardDescription className="text-white/70">Choose a date range for your availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-2xl p-8">
                <CustomCalendar value={selectedDates} onChange={handleDateSelection} />
              </div>
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
