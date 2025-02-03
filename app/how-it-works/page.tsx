import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle, Timer, Copy, ClipboardCopy } from "lucide-react"
import Link from "next/link"

export default function HowItWorks() {
  return (
    <div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Simple, powerful scheduling</h1>
          <p className="text-white/70 text-xl mb-8 leading-relaxed">
            Share your availability in four easy steps. No more endless email chains or scheduling conflicts.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4">
                  Step 1
                </div>
                <h2 className="text-3xl font-bold mb-4">Connect your calendar</h2>
                <p className="text-white/70 mb-6">
                  Securely connect your Google Calendar. We'll automatically check your existing events to prevent
                  double-booking.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Quick Google Calendar integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Real-time availability updates</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#232323] rounded-xl border border-white/5 p-6">
                <Calendar className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Google Calendar</h3>
                <p className="text-white/70 mb-4">Your primary calendar</p>
                <Button className="bg-primary hover:bg-primary-hover w-full">Connect Calendar</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4">
                  Step 2
                </div>
                <h2 className="text-3xl font-bold mb-4">Set your preferences</h2>
                <p className="text-white/70 mb-6">
                  Choose your meeting duration, buffer times, and working hours. We'll generate available time slots
                  that work for you.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Flexible duration options</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Custom buffer times</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#232323] rounded-xl border border-white/5 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Meeting Duration</h3>
                      <p className="text-white/50">How long do you need?</p>
                    </div>
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="bg-white text-black hover:bg-white/90">
                      15 min
                    </Button>
                    <Button variant="outline" className="bg-[#232323] border-white/10 hover:bg-white/5">
                      30 min
                    </Button>
                    <Button variant="outline" className="bg-[#232323] border-white/10 hover:bg-white/5">
                      45 min
                    </Button>
                    <Button variant="outline" className="bg-[#232323] border-white/10 hover:bg-white/5">
                      60 min
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4">
                  Step 3
                </div>
                <h2 className="text-3xl font-bold mb-4">Add buffer time</h2>
                <p className="text-white/70 mb-6">
                  Set buffer times before and after meetings to ensure you have time to prepare and wrap up. Never feel
                  rushed between appointments again.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Customizable buffer durations</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Automatic buffer application</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#232323] rounded-xl border border-white/5 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Buffer Time</h3>
                      <p className="text-white/50">Time between meetings</p>
                    </div>
                    <Timer className="w-6 h-6 text-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="bg-[#232323] border-white/10 hover:bg-white/5">
                      5 min
                    </Button>
                    <Button variant="outline" className="bg-white text-black hover:bg-white/90">
                      10 min
                    </Button>
                    <Button variant="outline" className="bg-[#232323] border-white/10 hover:bg-white/5">
                      15 min
                    </Button>
                    <Button variant="outline" className="bg-[#232323] border-white/10 hover:bg-white/5">
                      30 min
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-[#1A1A1A] rounded-2xl border border-white/10 p-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4">
                  Step 4
                </div>
                <h2 className="text-3xl font-bold mb-4">Copy your availability</h2>
                <p className="text-white/70 mb-6">
                  Generate a formatted text with your available time slots. Copy and paste this text to share your
                  availability with anyone, allowing them to easily select a time that works for them.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>One-click availability copying</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Instant calendar updates</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#232323] rounded-xl border border-white/5 p-6">
                <Copy className="w-16 h-16 text-primary mb-4" />
                <div className="flex items-center gap-2 p-3 bg-[#1A1A1A] rounded-lg mb-4">
                  <span className="text-white/50">My availability is:</span>
                  <span>Mon 9-5, Tue 10-6...</span>
                </div>
                <Button className="bg-primary hover:bg-primary-hover w-full">
                  Copy Availability
                  <ClipboardCopy className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
