'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UpgradePrompt({ message }: { message: string }) {
  return (
    <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-2">
      <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
      <p className="text-amber-800 dark:text-amber-300 text-xs flex-1">
        {message}
      </p>
      <Button variant="link" className="h-auto p-0 text-xs" onClick={async () => {
        const res = await fetch('/api/checkout', { method: 'POST' })
        const data = await res.json()
        if (data.url) {
          window.location.href = data.url
        }
      }}>Upgrade</Button>
    </div>
  )
}
