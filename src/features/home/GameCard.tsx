import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { GameMeta } from './gamesRegistry'

interface GameCardProps {
  game: GameMeta
}

export function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate()
  const disabled = !game.available

  return (
    <Card
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`Play ${game.title}`}
      onClick={() => !disabled && navigate(game.route)}
      onKeyDown={(e) => {
        if (disabled) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigate(game.route)
        }
      }}
      className={cn(
        'group relative flex cursor-pointer items-center gap-4 overflow-hidden p-5 transition-transform active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        disabled && 'cursor-not-allowed opacity-60'
      )}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center text-4xl"
        aria-hidden
      >
        {game.emoji}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="truncate text-lg font-semibold tracking-tight">
            {game.title}
          </h2>
          {disabled && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Coming soon
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {game.description}
        </p>
      </div>

      {!disabled && (
        <ChevronRight className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      )}
    </Card>
  )
}
