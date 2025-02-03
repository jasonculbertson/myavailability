'use client'

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
} from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

interface CalendarProps {
  onSelect?: (dates: Date[]) => void
  selectedDates?: Date[]
  className?: string
}

export function CustomCalendar({ onSelect, selectedDates = [] }: CalendarProps) {
  const [baseDate, setBaseDate] = useState(startOfToday())
  const months = [baseDate, addMonths(baseDate, 1)]
  const isCurrentMonth = baseDate.getMonth() === new Date().getMonth() && baseDate.getFullYear() === new Date().getFullYear()

  const handlePreviousMonth = () => {
    if (!isCurrentMonth) {
      setBaseDate((prev) => subMonths(prev, 1))
    }
  }

  const handleNextMonth = () => {
    setBaseDate((prev) => addMonths(prev, 1))
  }

  const handleDateClick = (date: Date) => {
    if (!onSelect) return
    const newDates = [...selectedDates]
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dateIndex = newDates.findIndex(
      (d) =>
        d.getFullYear() === clickedDate.getFullYear() &&
        d.getMonth() === clickedDate.getMonth() &&
        d.getDate() === clickedDate.getDate(),
    )

    if (dateIndex >= 0) {
      newDates.splice(dateIndex, 1)
    } else {
      newDates.push(clickedDate)
    }

    onSelect(newDates)
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
              (d) =>
                d.getFullYear() === day.getFullYear() &&
                d.getMonth() === day.getMonth() &&
                d.getDate() === day.getDate(),
            )
            const isPast = isBefore(day, startOfToday())

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && handleDateClick(day)}
                disabled={isPast}
                className={`h-10 w-10 rounded-full flex items-center justify-center text-base transition-colors relative
                  ${isPast ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"}
                  ${isSelected ? "border-2 border-black text-black" : ""}
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

      {selectedDates.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onSelect && onSelect([])}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  )
}
