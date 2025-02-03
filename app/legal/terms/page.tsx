import { ScrollArea } from "@/components/ui/scroll-area"
import { PrintButton } from "@/components/PrintButton"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-zinc-400">Last updated: February 2, 2025</p>
          </div>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">1. Acceptance of Terms</h2>
                <p className="text-zinc-300">
                  By accessing and using MyAvailability ("Service"), you agree to be bound by these Terms of Service
                  ("Terms"). If you disagree with any part of these terms, you may not use our Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">2. Description of Service</h2>
                <p className="text-zinc-300">
                  MyAvailability is a calendar scheduling service that allows users to share their availability with
                  others. The Service integrates with Google Calendar to help users manage their scheduling efficiently.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">3. Google Calendar Integration</h2>
                <p className="text-zinc-300 mb-2">
                  Our Service integrates with Google Calendar. By using our Service, you authorize us to:
                </p>
                <ul className="list-disc list-inside ml-4 text-zinc-300">
                  <li>Access your Google Calendar data</li>
                  <li>Read your calendar events to determine availability</li>
                  <li>Display your available time slots to others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">4. User Responsibilities</h2>
                <p className="text-zinc-300 mb-2">You agree to:</p>
                <ul className="list-disc list-inside ml-4 text-zinc-300">
                  <li>Provide accurate information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not misuse the Service</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">5. Privacy and Data Protection</h2>
                <p className="text-zinc-300">
                  Your use of the Service is also governed by our{" "}
                  <a href="/legal/privacy" className="text-blue-500 hover:text-blue-400">
                    Privacy Policy
                  </a>
                  . By using the Service, you agree to the collection and use of information as detailed in our Privacy
                  Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">6. Intellectual Property</h2>
                <p className="text-zinc-300">
                  The Service and its original content, features, and functionality are owned by MyAvailability and are
                  protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">7. Termination</h2>
                <p className="text-zinc-300">
                  We may terminate or suspend your access to our Service immediately, without prior notice, for any
                  reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">8. Limitation of Liability</h2>
                <p className="text-zinc-300">
                  In no event shall MyAvailability, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">9. Changes to Terms</h2>
                <p className="text-zinc-300">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                  try to provide at least 30 days' notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white">10. Contact Us</h2>
                <p className="text-zinc-300">
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:jculbertson@gmail.com" className="text-blue-500 hover:text-blue-400">
                    jculbertson@gmail.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </ScrollArea>

          <div className="pt-6">
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  )
}
