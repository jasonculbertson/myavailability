"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchEvents, generateAvailableSlots } from "../utils/calendar"
import ShareableLink from "./ShareableLink"
import { AuthButton } from "./AuthButton"

export default function AvailabilitySelector() {
  const [user, setUser] = useState<any>(null)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [duration, setDuration] = useState("30")
  const [availableSlots, setAvailableSlots] = useState<{ start: Date; end: Date }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleFetchAvailability = async () => {
    if (!dateRange || !user?.accessToken) return

    setIsLoading(true)
    setError(null)

    try {
      const events = await fetchEvents(user.accessToken, dateRange.from, dateRange.to)
      const slots = generateAvailableSlots(events, dateRange, Number.parseInt(duration))
      setAvailableSlots(slots)
    } catch (error) {
      console.error("Error fetching availability:", error)
      setError("Failed to fetch availability. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <AuthButton />
      {user && (
        <>
          <Calendar mode="range" selected={dateRange} onSelect={setDateRange} className="rounded-md border" />
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleFetchAvailability} disabled={isLoading}>
            {isLoading ? "Fetching..." : "Fetch Availability"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
          {availableSlots.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Available Slots</h2>
              <ul className="space-y-2">
                {availableSlots.map((slot, index) => (
                  <li key={index}>
                    {slot.start.toLocaleString()} - {slot.end.toLocaleString()}
                  </li>
                ))}
              </ul>
              <ShareableLink availableSlots={availableSlots} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

