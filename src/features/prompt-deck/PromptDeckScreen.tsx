import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Play } from 'lucide-react'

import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import { BigButton } from '@/components/common/BigButton'
import { Card } from '@/components/ui/card'
import { usePromptDeck } from './usePromptDeck'
import type { PromptDeckConfig } from './types'

interface PromptDeckScreenProps {
  config: PromptDeckConfig
}

export function PromptDeckScreen({ config }: PromptDeckScreenProps) {
  const navigate = useNavigate()
  const { loading, error, started, currentPrompt, canStart, start, next } =
    usePromptDeck(config)

  const homeButton = (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2 self-start"
      onClick={() => navigate('/')}
    >
      <ArrowLeft />
      Home
    </Button>
  )

  if (!started) {
    return (
      <PageShell>
        {homeButton}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {config.emoji && (
            <p className="text-6xl" aria-hidden>
              {config.emoji}
            </p>
          )}
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            {config.title}
          </h1>
          <p className="mt-2 max-w-xs text-muted-foreground">
            {config.subtitle}
          </p>
          {error && (
            <p className="mt-4 text-sm text-destructive">
              Couldn&apos;t load prompts: {error}
            </p>
          )}
          {!loading && !error && !canStart && (
            <p className="mt-4 text-sm text-muted-foreground">
              No prompts yet — check back soon.
            </p>
          )}
        </div>

        <div className="mt-auto">
          <BigButton
            disabled={loading || !!error || !canStart}
            onClick={start}
          >
            <Play className="!size-6" />
            {loading ? 'Loading…' : (config.startLabel ?? 'Start')}
          </BigButton>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      {homeButton}

      <div className="flex flex-1 items-center justify-center py-4">
        <Card className="flex min-h-[40dvh] w-full items-center justify-center p-8">
          <p
            key={currentPrompt}
            className="text-balance text-center text-3xl font-bold leading-snug tracking-tight animate-in fade-in zoom-in-95 duration-200"
          >
            {currentPrompt}
          </p>
        </Card>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <BigButton onClick={next} aria-label="Next prompt">
          {config.nextLabel ?? 'Next'}
        </BigButton>
        <Button
          variant="ghost"
          className="h-12 w-full text-muted-foreground"
          onClick={() => navigate('/')}
        >
          End Game
        </Button>
      </div>
    </PageShell>
  )
}
