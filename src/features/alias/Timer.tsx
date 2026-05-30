import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { TURN_SECONDS } from './types'

interface TimerProps {
  secondsRemaining: number
  total?: number
}

export function Timer({ secondsRemaining, total = TURN_SECONDS }: TimerProps) {
  const pct = Math.max(0, Math.min(100, (secondsRemaining / total) * 100))
  const critical = secondsRemaining <= 5
  const low = secondsRemaining <= 10

  return (
    <div className="w-full">
      <div
        className={cn(
          'text-center text-7xl font-bold tabular-nums tracking-tight transition-colors duration-300',
          critical
            ? 'text-destructive'
            : low
              ? 'text-amber-500'
              : 'text-foreground',
          critical && 'animate-pulse'
        )}
        aria-live="polite"
        aria-label={`${secondsRemaining} seconds remaining`}
      >
        {secondsRemaining}
      </div>
      <Progress
        value={pct}
        className={cn(
          'mt-3 h-3 transition-colors',
          critical && '[&>div]:bg-destructive',
          low && !critical && '[&>div]:bg-amber-500'
        )}
      />
    </div>
  )
}
