'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

export function ConnectButton() {
  const { data: session } = useSession()

  const handleClick = () => {
    if (session) {
      signOut()
    } else {
      signIn('google', {
        callbackUrl: '/schedule',
      })
    }
  }

  return (
    <Button
      onClick={handleClick}
      className="bg-primary hover:bg-primary-hover text-white h-12 px-8 rounded-full"
    >
      <Calendar className="w-5 h-5 mr-2" />
      {session ? 'Sign out' : 'Continue with Google'}
    </Button>
  )
}
