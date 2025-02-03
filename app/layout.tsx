import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'MyAvailability',
  description: 'Share your availability with ease',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-black text-white">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
