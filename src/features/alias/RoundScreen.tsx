import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import { BigButton } from '@/components/common/BigButton'
import { Timer } from './Timer'
import { WordDisplay } from './WordDisplay'
import { useAlias } from './state/AliasContext'
import { useTimer } from './hooks/useTimer'
import { useAlarm } from './hooks/useAlarm'
import { drawWord } from './lib/wordPool'

export function RoundScreen() {
  const navigate = useNavigate()
  const { state, dispatch } = useAlias()
  const { trigger } = useAlarm()

  const onTick = useCallback(
    (secondsRemaining: number) =>
      dispatch({ type: 'TICK', timeRemaining: secondsRemaining }),
    [dispatch]
  )
  const onTimeout = useCallback(() => {
    trigger()
    dispatch({ type: 'TIMEOUT' })
  }, [dispatch, trigger])

  useTimer(state.phase === 'playing', onTick, onTimeout)

  const handleNext = () => {
    if (state.phase !== 'playing') return
    const draw = drawWord(state.remainingWords, state.usedWords)
    if (!draw) {
      // Pool exhausted mid-turn: tell the player and end the turn gracefully.
      toast.info("That's all the words! Ending the turn.")
      dispatch({ type: 'TIMEOUT' })
      return
    }
    dispatch({
      type: 'NEXT_WORD',
      currentWord: draw.word,
      remainingWords: draw.remainingWords,
      usedWords: draw.usedWords,
    })
  }

  const endGame = () => {
    dispatch({ type: 'END_GAME' })
    navigate('/')
  }

  const wordsLeft = state.remainingWords.length

  return (
    <PageShell>
      <div className="pt-2">
        <Timer secondsRemaining={state.timeRemaining} />
      </div>

      <WordDisplay word={state.currentWord} />

      <div className="mt-auto flex flex-col gap-3">
        <BigButton
          className="h-20 text-2xl"
          onClick={handleNext}
          aria-label="Next word"
        >
          Next
        </BigButton>
        <div className="flex items-center justify-between px-1">
          <span
            className="text-xs text-muted-foreground"
            aria-label={`${wordsLeft} words left in the pool`}
          >
            {wordsLeft} {wordsLeft === 1 ? 'word' : 'words'} left
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={endGame}
          >
            End Game
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
