import { Flame, Martini, MessageCircleHeart, type LucideIcon } from 'lucide-react'

export type GameId = 'alias' | 'never-have-i-ever' | 'truth-or-drink'

export interface GameMeta {
  id: GameId
  title: string
  description: string
  route: string
  available: boolean
  /** Lucide icon shown on the game card. */
  icon: LucideIcon
  /** Tailwind text-color class applied to the icon. */
  accent: string
}

export const games: GameMeta[] = [
  {
    id: 'alias',
    title: 'Alias',
    description: 'Describe the word to your team before the 60s timer runs out.',
    route: '/alias',
    available: true,
    icon: MessageCircleHeart,
    accent: 'text-fuchsia-500',
  },
  {
    id: 'never-have-i-ever',
    title: 'Never Have I Ever',
    description: 'Tap through prompts and find out who has done what.',
    route: '/never-have-i-ever',
    available: true,
    icon: Flame,
    accent: 'text-orange-500',
  },
  {
    id: 'truth-or-drink',
    title: 'Truth or Drink',
    description: 'Answer honestly or take a sip. Your call.',
    route: '/truth-or-drink',
    available: true,
    icon: Martini,
    accent: 'text-rose-500',
  },
]
