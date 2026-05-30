import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import { BigButton } from '@/components/common/BigButton'
import { useAlias } from './state/AliasContext'

export function TurnEnded() {
  const navigate = useNavigate()
  const { state, dispatch } = useAlias()

  const nextIndex =
    state.players.length > 0
      ? (state.currentPlayerIndex + 1) % state.players.length
      : 0
  const nextPlayer = state.players[nextIndex]

  const endGame = () => {
    dispatch({ type: 'END_GAME' })
    navigate('/')
  }

  return (
    <PageShell>
      <div
        className="flex flex-1 flex-col items-center justify-center text-center"
        role="status"
        aria-live="assertive"
      >
        <p className="text-6xl animate-in zoom-in-50 duration-300" aria-hidden>
          ⏰
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          Time&apos;s up!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pass the phone to {nextPlayer?.name ?? 'the next player'}.
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <BigButton onClick={() => dispatch({ type: 'NEXT_PLAYER' })}>
          Next Player
          <ArrowRight className="!size-6" />
        </BigButton>
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
