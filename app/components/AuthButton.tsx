"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const GOOGLE_CLIENT_ID = "1009987436067-udgo6fk55obhq0852d5s5f3l8j9ejsap.apps.googleusercontent.com"

export function AuthButton() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleSignIn = () => {
    const redirectUri = `${window.location.origin}/api/auth/callback`
    const scope = "https://www.googleapis.com/auth/calendar.readonly"
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`
    window.location.href = authUrl
  }

  const handleSignOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-white">Signed in as {user.email}</span>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    )
  }

  return <Button onClick={handleSignIn}>Connect Google Calendar</Button>
}

