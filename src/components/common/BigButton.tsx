import * as React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Oversized, party-friendly tap target built on the shadcn Button.
 * Defaults to a tall, bold, full-width primary action.
 */
export const BigButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      size="lg"
      className={cn(
        'h-16 w-full rounded-2xl text-xl font-semibold shadow-md',
        'transition-transform active:scale-[0.98]',
        className
      )}
      {...props}
    />
  )
)
BigButton.displayName = 'BigButton'
