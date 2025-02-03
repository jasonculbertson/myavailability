'use client'

import Link from "next/link"
import { UserMenu } from "@/components/UserMenu"

export function Navigation() {
  return (
    <nav className="border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-primary">
            MyAvailability
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/how-it-works" className="text-white/70 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="/schedule" className="text-white/70 hover:text-white transition-colors">
              Schedule
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </nav>
  )
}
