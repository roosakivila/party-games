import * as React from 'react'

import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
}

/**
 * Centered, mobile-first container with safe-area padding.
 * Constrains content to a phone-friendly max width and fills the viewport.
 */
export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-background">
      <main
        className={cn(
          'flex w-full max-w-md flex-1 flex-col px-5 py-6',
          'pt-[max(1.5rem,env(safe-area-inset-top))]',
          'pb-[max(1.5rem,env(safe-area-inset-bottom))]',
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
