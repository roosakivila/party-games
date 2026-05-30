import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

interface ScreenTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * Re-runs an enter animation whenever the route changes by keying the wrapper
 * on the current pathname. Uses tailwindcss-animate utilities (no JS lib).
 */
export function ScreenTransition({ children, className }: ScreenTransitionProps) {
  const location = useLocation()

  return (
    <div
      key={location.pathname}
      className={cn(
        'flex min-h-[100dvh] flex-col animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out',
        className
      )}
    >
      {children}
    </div>
  )
}
