'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"

export function ConnectButton() {
  const { data: session } = useSession()

  const handleAuth = () => {
    console.log('Button clicked');
    console.log('Current session:', session);
    
    if (session) {
      console.log('Signing out...');
      signOut({
        callbackUrl: '/',
        redirect: true
      }).catch(error => console.error('Signout error:', error));
    } else {
      console.log('Signing in...');
      // Use window.location for a hard redirect
      window.location.href = `/api/auth/signin/google?callbackUrl=${encodeURIComponent('/schedule')}`;
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
