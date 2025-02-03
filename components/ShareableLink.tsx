"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ShareableLink({ availableSlots }: { availableSlots: { start: Date; end: Date }[] }) {
  const [link, setLink] = useState("")

  const generateLink = () => {
    const encodedSlots = encodeURIComponent(JSON.stringify(availableSlots))
    const newLink = `${window.location.origin}/book?slots=${encodedSlots}`
    setLink(newLink)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(link)
  }

  return (
    <div className="space-y-2">
      <Button onClick={generateLink}>Generate Shareable Link</Button>
      {link && (
        <div className="flex space-x-2">
          <Input value={link} readOnly />
          <Button onClick={copyLink}>Copy</Button>
        </div>
      )}
    </div>
  )
}

