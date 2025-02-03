'use client'

import { Button } from "@/components/ui/button"
import { Calendar, Clock, ClipboardCheck, Copy, LogOut } from "lucide-react"
import Link from "next/link"
import { ConnectButton } from "@/components/ConnectButton"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Share your availability with ease</h1>
          <p className="text-white/70 text-xl mb-8 leading-relaxed">
            Connect your Google Calendar, set your preferences, and copy your available time slots in seconds. No more
            back-and-forth emails about scheduling.
          </p>
          <div className="flex flex-col items-center gap-4">
            <ConnectButton />
            <p className="text-white/50 text-sm">Free forever. No credit card required.</p>
          </div>
        </div>

        {/* Calendar Preview */}
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
          <div className="relative bg-[#1A1A1A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white">Your Availability</h3>
                <Button variant="ghost" className="text-white/70 hover:text-white">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-white">30 minute meeting</p>
                    <p className="text-sm text-white/50">Mon-Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-white">60 minute meeting</p>
                    <p className="text-sm text-white/50">Mon-Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need for seamless scheduling</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <Calendar className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">Google Calendar Integration</h3>
              <p className="text-white/70">
                Automatically sync with your Google Calendar to show only your true availability.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <Clock className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">Customizable Time Slots</h3>
              <p className="text-white/70">Set meeting duration and buffer times to match your scheduling needs.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <ClipboardCheck className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">Easy Copying</h3>
              <p className="text-white/70">Copy your availability as text to share with anyone, anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
