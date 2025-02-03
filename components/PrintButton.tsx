'use client'

import { Button } from "@/components/ui/button"

export function PrintButton() {
  return (
    <Button
      variant="outline"
      onClick={() => window.print()}
      className="bg-zinc-900 text-white hover:bg-zinc-800 border-zinc-800"
    >
      Print Document
    </Button>
  )
}
