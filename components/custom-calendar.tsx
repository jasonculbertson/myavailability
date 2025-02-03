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

export function CustomCalendar({ onSelect, selectedDates = [], className }: CalendarProps) {
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
      <div key={date.toISOString()} className="flex-1 bg-[rgb(35,35,35)]">
        <div className="flex items-center mb-6">
          {date === months[0] ? (
            <div className="flex items-center justify-between w-full">
              <div className="w-10">
                {!isCurrentMonth && (
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-zinc-700 rounded-full transition-colors text-zinc-400"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
              </div>
              <div className="text-lg font-normal text-zinc-200">{format(date, "MMMM")}</div>
              <div className="w-10" />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="w-10" />
              <div className="text-lg font-normal text-zinc-200">{format(date, "MMMM")}</div>
              <div className="w-10 flex justify-end">
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-zinc-700 rounded-full transition-colors text-zinc-400"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-7 gap-x-2 gap-y-2 mb-4">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center text-base font-normal text-zinc-500">
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
                  ${isPast ? "text-zinc-700 cursor-not-allowed" : "text-zinc-400 hover:bg-zinc-700"}
                  ${isSelected ? "border-2 border-zinc-400 text-zinc-200 bg-zinc-700" : ""}
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
    <div className={`relative bg-[rgb(35,35,35)] p-6 rounded-lg border border-[rgb(255,255,255,0.1)] ${className}`}>

      <AnimatePresence mode="wait">
        <motion.div
          key={baseDate.toISOString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex gap-8 pt-8 bg-[rgb(35,35,35)]"
        >
          {months.map((month) => renderMonth(month))}
        </motion.div>
      </AnimatePresence>

      {selectedDates.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onSelect && onSelect([])}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  )
}
