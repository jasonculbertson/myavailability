import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-zinc-400">Last updated: February 2, 2025</p>
          </div>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">1. Introduction</h2>
                <p className="text-zinc-300">
                  MyAvailability ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our calendar
                  scheduling service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">2.1 Information You Provide</h3>
                    <p className="text-zinc-300 mb-2">
                      We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside ml-4 text-zinc-300">
                      <li>Account information (name, email address)</li>
                      <li>Calendar data and availability preferences</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">2.2 Information from Google Calendar</h3>
                    <p className="text-zinc-300">
                      When you connect your Google Calendar, we access your calendar events to determine your
                      availability. We only read your calendar data and do not modify or delete any events without your
                      explicit permission.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">3. How We Use Your Information</h2>
                <p className="text-zinc-300 mb-2">We use the information we collect to:</p>
                <ul className="list-disc list-inside ml-4 text-zinc-300">
                  <li>Provide and maintain our scheduling service</li>
                  <li>Display your availability while respecting your privacy</li>
                  <li>Improve and optimize our service</li>
                  <li>Communicate with you about our service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">4. Data Security</h2>
                <p className="text-zinc-300">
                  We implement appropriate technical and organizational measures to protect your personal information.
                  However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">5. Your Rights</h2>
                <p className="text-zinc-300 mb-2">You have the right to:</p>
                <ul className="list-disc list-inside ml-4 text-zinc-300">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Disconnect your Google Calendar at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">6. Changes to This Policy</h2>
                <p className="text-zinc-300">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">7. Contact Us</h2>
                <p className="text-zinc-300">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:jculbertson@gmail.com" className="text-blue-500 hover:text-blue-400">
                    jculbertson@gmail.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </ScrollArea>

          <div className="pt-6">
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="bg-zinc-900 text-white hover:bg-zinc-800 border-zinc-800"
            >
              Print Policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}