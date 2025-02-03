'use client'

import Link from "next/link"
import { UserMenu } from "@/components/UserMenu"
import { useSession } from "next-auth/react"

export function Navigation() {
  const { data: session } = useSession()
  const isConnected = !!session?.accessToken

  return (
    <nav>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-primary">
            MyAvailability
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/how-it-works" className="text-white/70 hover:text-white transition-colors">
              How it Works
            </Link>
            {isConnected && (
              <Link href="/schedule" className="text-white/70 hover:text-white transition-colors">
                Schedule
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </nav>
  )
}
