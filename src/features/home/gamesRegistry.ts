export type GameId = 'alias' | 'never-have-i-ever' | 'truth-or-drink'

export interface GameMeta {
  id: GameId
  title: string
  description: string
  route: string
  available: boolean
  /** Emoji shown on the game card. */
  emoji: string
  /** Tailwind gradient classes used as the card accent. */
  accent: string
}

export const games: GameMeta[] = [
  {
    id: 'alias',
    title: 'Alias',
    description: 'Describe the word to your team before the 60s timer runs out.',
    route: '/alias',
    available: true,
    emoji: '🗣️',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'never-have-i-ever',
    title: 'Never Have I Ever',
    description: 'Tap through prompts and find out who has done what.',
    route: '/never-have-i-ever',
    available: true,
    emoji: '🙈',
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    id: 'truth-or-drink',
    title: 'Truth or Drink',
    description: 'Answer honestly or take a sip. Your call.',
    route: '/truth-or-drink',
    available: true,
    emoji: '🥂',
    accent: 'from-amber-500 to-rose-500',
  },
]
