'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

export function ConnectButton() {
  const { data: session } = useSession()

  const handleAuth = async () => {
    try {
      if (session) {
        await signOut()
      } else {
        await signIn('google', {
          callbackUrl: '/schedule',
          redirect: true
        })
      }
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  return (
    <Button 
      onClick={handleAuth}
      className="bg-primary hover:bg-primary-hover text-white h-12 px-8 rounded-full"
    >
      <Calendar className="w-5 h-5 mr-2" />
      {session ? 'Disconnect Calendar' : 'Connect Calendar'}
    </Button>
  )
}
