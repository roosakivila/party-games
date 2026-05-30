export type AliasLanguage = 'en' | 'fi'

export interface Player {
  id: string
  name: string
}

/** Shape of public/data/alias/words.json */
export interface AliasWordData {
  en: string[]
  fi: string[]
}

export type AliasPhase = 'setup' | 'preRound' | 'playing' | 'turnEnded'

export interface AliasState {
  phase: AliasPhase
  players: Player[]
  currentPlayerIndex: number
  language: AliasLanguage
  /** Remaining pool for the chosen language; source of randomness. */
  remainingWords: string[]
  /** O(1) repeat guard across the whole session. */
  usedWords: Set<string>
  currentWord: string | null
  /** Seconds left in the current turn. */
  timeRemaining: number
}

export const TURN_SECONDS = 60
