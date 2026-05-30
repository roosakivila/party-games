import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, X } from 'lucide-react'

import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import { BigButton } from '@/components/common/BigButton'
import { Input } from '@/components/ui/input'
import { LanguageToggle } from './LanguageToggle'
import { useAlias } from './state/AliasContext'
import { makeEmptyPlayer } from './state/aliasReducer'

export function PlayerSetup() {
  const navigate = useNavigate()
  const { state, dispatch } = useAlias()
  const { players, language } = state

  const setPlayers = (next: typeof players) =>
    dispatch({ type: 'SET_PLAYERS', players: next })

  const updateName = (id: string, name: string) =>
    setPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)))

  const removePlayer = (id: string) =>
    setPlayers(players.filter((p) => p.id !== id))

  const addPlayer = () => setPlayers([...players, makeEmptyPlayer()])

  const namedCount = players.filter((p) => p.name.trim().length > 0).length
  const canStart = namedCount > 0

  return (
    <PageShell>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2 self-start"
        onClick={() => navigate('/')}
      >
        <ArrowLeft />
        Home
      </Button>

      <header className="mb-6 mt-2">
        <h1 className="text-3xl font-bold tracking-tight">Alias</h1>
        <p className="mt-1 text-muted-foreground">
          Add players and pick the language.
        </p>
      </header>

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">
          Players
        </h2>
        <div className="flex flex-col gap-2">
          {players.map((player, index) => (
            <div key={player.id} className="flex items-center gap-2">
              <Input
                value={player.name}
                onChange={(e) => updateName(player.id, e.target.value)}
                placeholder={`Player ${index + 1}`}
                aria-label={`Player ${index + 1} name`}
                className="h-11 text-base"
                maxLength={24}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 shrink-0 text-muted-foreground"
                aria-label={`Remove player ${index + 1}`}
                onClick={() => removePlayer(player.id)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-3 h-11 w-full"
          onClick={addPlayer}
        >
          <Plus />
          Add player
        </Button>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">
          Language
        </h2>
        <LanguageToggle
          value={language}
          onChange={(lang) => dispatch({ type: 'SET_LANGUAGE', language: lang })}
        />
      </section>

      <div className="mt-auto">
        <BigButton
          disabled={!canStart}
          onClick={() => dispatch({ type: 'READY' })}
        >
          Ready
        </BigButton>
        {!canStart && (
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Add at least one named player to continue.
          </p>
        )}
      </div>
    </PageShell>
  )
}
