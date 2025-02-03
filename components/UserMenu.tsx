'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, LogOut, User } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

export function UserMenu() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Button 
        onClick={() => signIn('google')}
        className="bg-primary hover:bg-primary-hover text-white"
      >
        Continue with Google
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative w-10 h-10 rounded-full p-0 border border-white/10"
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user?.name || 'User avatar'}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <User className="w-5 h-5 text-white/70" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#1A1A1A] border-white/10">
        {session.user?.email && (
          <div className="px-2 py-1.5 text-sm text-white/70">
            {session.user.email}
          </div>
        )}
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="text-red-500 focus:text-red-500 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
