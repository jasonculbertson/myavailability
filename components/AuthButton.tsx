"use client"

import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { Calendar } from "lucide-react"
import { useState } from "react"

export function AuthButton() {
  const { data: session } = useSession()
  const [testResult, setTestResult] = useState<string>('')

  const handleAuth = async () => {
    if (session) {
      await signOut()
    } else {
      await signIn('google', {
        callbackUrl: '/schedule',
      })
    }
  }

  const testCalendarConnection = async () => {
    try {
      const response = await fetch('/api/calendar/test')
      const data = await response.json()
      if (data.error) {
        setTestResult('Error: ' + data.error)
      } else {
        setTestResult(`Success! Found ${data.events?.length || 0} upcoming events.`)
      }
    } catch (error) {
      setTestResult('Failed to test connection')
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button 
        onClick={handleAuth}
        className="bg-primary hover:bg-primary-hover text-white h-12 px-8 rounded-full"
      >
        <Calendar className="w-5 h-5 mr-2" />
        {session ? 'Disconnect Google Calendar' : 'Connect Google Calendar'}
      </Button>
      
      {session && (
        <>
          <Button 
            onClick={testCalendarConnection}
            variant="outline"
            className="mt-2"
          >
            Test Calendar Connection
          </Button>
          {testResult && (
            <div className="mt-2 text-sm">
              {testResult}
            </div>
          )}
        </>
      )}
    </div>
  )
}
