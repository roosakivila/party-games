import { PageShell } from '@/components/layout/PageShell'
import { GameCard } from './GameCard'
import { games } from './gamesRegistry'

export function HomePage() {
  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Talk Dirty To Me
          </h1>
          <p className="mt-2 text-muted-foreground">
            No judgment. No filter. Just pick a game.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </PageShell>
  )
}
