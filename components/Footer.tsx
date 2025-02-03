'use client'

import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} MyAvailability. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              href="/legal/privacy" 
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/legal/terms" 
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
