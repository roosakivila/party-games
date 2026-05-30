import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'

import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import { BigButton } from '@/components/common/BigButton'
import { useAlias } from './state/AliasContext'
import { useAliasWords } from './hooks/useAliasWords'
import { useAlarm } from './hooks/useAlarm'
import { buildPool, drawWord } from './lib/wordPool'

export function PreRound() {
  const navigate = useNavigate()
  const { state, dispatch } = useAlias()
  const { data, loading, error } = useAliasWords()
  const { unlock } = useAlarm()

  const currentPlayer = state.players[state.currentPlayerIndex]

  const handleStart = () => {
    if (!data) return

    // Unlock audio on this user gesture so the timeout alarm can play later.
    unlock()

    const isFresh =
      state.remainingWords.length === 0 && state.usedWords.size === 0

    let pool = isFresh ? buildPool(data, state.language) : state.remainingWords
    let draw = drawWord(pool, state.usedWords)

    // Pool fully exhausted: rebuild the whole language pool and start over.
    if (!draw) {
      pool = buildPool(data, state.language)
      draw = drawWord(pool, new Set<string>())
      if (!draw) return // empty data set; nothing to play
    }

    dispatch({
      type: 'START_TURN',
      currentWord: draw.word,
      remainingWords: draw.remainingWords,
      usedWords: draw.usedWords,
    })
  }

  const endGame = () => {
    dispatch({ type: 'END_GAME' })
    navigate('/')
  }

  return (
    <PageShell>
      <header className="mt-2 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Up next
        </p>
        <h1 className="mt-1 text-4xl font-extrabold tracking-tight">
          {currentPlayer?.name ?? 'Player'}
        </h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="max-w-xs text-muted-foreground">
          Hand the phone to {currentPlayer?.name ?? 'the player'}. Tap Start to
          begin the 60-second round.
        </p>
        {error && (
          <p className="mt-4 text-sm text-destructive">
            Couldn&apos;t load words: {error}
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <BigButton
          disabled={loading || !!error || !data}
          onClick={handleStart}
        >
          <Play className="!size-6" />
          {loading ? 'Loading…' : 'Start'}
        </BigButton>
        <Button
          variant="outline"
          className="h-12 w-full"
          onClick={() => dispatch({ type: 'EDIT_PLAYERS' })}
        >
          Edit Players
        </Button>
        <Button
          variant="ghost"
          className="h-12 w-full text-muted-foreground"
          onClick={endGame}
        >
          End Game
        </Button>
      </div>
    </PageShell>
  )
}
