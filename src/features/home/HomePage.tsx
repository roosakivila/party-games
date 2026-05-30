import { PageShell } from '@/components/layout/PageShell'
import { GameCard } from './GameCard'
import { games } from './gamesRegistry'

export function HomePage() {
  return (
    <PageShell>
      <header className="mb-8 mt-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Party Games</h1>
        <p className="mt-2 text-muted-foreground">
          Pass the phone around and pick a game.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <footer className="mt-auto pt-8 text-center text-xs text-muted-foreground">
        No accounts, no setup. Just play.
      </footer>
    </PageShell>
  )
}
