"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  startOfMonth,
  subMonths,
  startOfToday,
  isWithinInterval,
} from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

interface CalendarProps {
  value?: Date | Date[]
  onChange?: (value: Date | Date[]) => void
  numberOfMonths?: number
}

export function CustomCalendar({ value, onChange, numberOfMonths = 2 }: CalendarProps) {
  const [baseDate, setBaseDate] = useState(startOfToday())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const months = Array.from({ length: numberOfMonths }, (_, i) => addMonths(baseDate, i))
  const isCurrentMonth =
    baseDate.getMonth() === new Date().getMonth() && baseDate.getFullYear() === new Date().getFullYear()

  const handlePreviousMonth = () => {
    if (!isCurrentMonth) {
      setBaseDate((prev) => subMonths(prev, 1))
    }
  }

  const handleNextMonth = () => {
    setBaseDate((prev) => addMonths(prev, 1))
  }

  const handleDateClick = (date: Date) => {
    const newDates = [...selectedDates]
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dateIndex = newDates.findIndex((d) => d.toDateString() === clickedDate.toDateString())

    if (dateIndex >= 0) {
      newDates.splice(dateIndex, 1)
    } else {
      newDates.push(clickedDate)
    }

    setSelectedDates(newDates)
    if (onChange) {
      onChange(newDates)
    }
  }

  const clearDates = () => {
    setSelectedDates([])
    if (onChange) {
      onChange([])
    }
  }

  const isInRange = (date: Date) => {
    if (selectedDates.length < 2) return false
    const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime())
    return (
      isWithinInterval(date, {
        start: new Date(sortedDates[0].setHours(0, 0, 0, 0)),
        end: new Date(sortedDates[sortedDates.length - 1].setHours(23, 59, 59, 999)),
      }) && !selectedDates.some((d) => d.toISOString().split("T")[0] === date.toISOString().split("T")[0])
    )
  }

  const renderMonth = (date: Date) => {
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    const days = eachDayOfInterval({ start, end })
    const startingDayIndex = getDay(start)

    return (
      <div key={date.toISOString()} className="flex-1">
        <div className="text-xl mb-8 text-center font-normal">{format(date, "MMMM yyyy")}</div>
        <div className="grid grid-cols-7 gap-x-2 gap-y-2 mb-4">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center text-base font-normal text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-x-2 gap-y-2">
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {days.map((day) => {
            const isSelected = selectedDates.some(
              (d) => d.toISOString().split("T")[0] === day.toISOString().split("T")[0],
            )
            const isPast = isBefore(day, startOfToday())
            const inRange = isInRange(day)

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && handleDateClick(day)}
                disabled={isPast}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-base transition-colors relative
                  ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                  ${isSelected ? "border-2 border-black text-black" : ""}
                  ${inRange ? "bg-gray-100" : ""}
                `}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center absolute -top-2 w-full">
        {!isCurrentMonth ? (
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : (
          <div className="w-10" />
        )}
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={baseDate.toISOString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex gap-8 pt-8"
        >
          {months.map((month) => renderMonth(month))}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-end mt-6">
        <Button variant="ghost" size="sm" onClick={clearDates} className="text-gray-500 hover:text-gray-900">
          Clear dates
        </Button>
      </div>
    </div>
  )
}

