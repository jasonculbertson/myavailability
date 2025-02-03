import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-4 text-xs text-zinc-500">
          <Link 
            href="/legal/privacy" 
            className="hover:text-zinc-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-zinc-700">•</span>
          <Link 
            href="/legal/terms" 
            className="hover:text-zinc-300 transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-zinc-700">•</span>
          <span> 2025 MyAvailability</span>
        </div>
      </div>
    </footer>
  )
}
