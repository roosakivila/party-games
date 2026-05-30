import {
  type AliasLanguage,
  type AliasState,
  type Player,
  TURN_SECONDS,
} from '../types'

export type AliasAction =
  | { type: 'SET_PLAYERS'; players: Player[] }
  | { type: 'SET_LANGUAGE'; language: AliasLanguage }
  | { type: 'READY' }
  | { type: 'EDIT_PLAYERS' }
  // Implemented in Phase 3 (gameplay):
  | {
      type: 'START_TURN'
      currentWord: string
      remainingWords: string[]
      usedWords: Set<string>
    }
  | {
      type: 'NEXT_WORD'
      currentWord: string
      remainingWords: string[]
      usedWords: Set<string>
    }
  | { type: 'TICK'; timeRemaining: number }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT_PLAYER' }
  | { type: 'END_GAME' }

export function makeEmptyPlayer(): Player {
  return { id: crypto.randomUUID(), name: '' }
}

export const initialAliasState: AliasState = {
  phase: 'setup',
  players: [],
  currentPlayerIndex: 0,
  language: 'en',
  remainingWords: [],
  usedWords: new Set<string>(),
  currentWord: null,
  timeRemaining: TURN_SECONDS,
}

/** Lazy initializer: starts with two empty player rows for a friendly setup. */
export function createInitialAliasState(): AliasState {
  return {
    ...initialAliasState,
    usedWords: new Set<string>(),
    players: [makeEmptyPlayer(), makeEmptyPlayer()],
  }
}

/** Trim names and drop players with empty names. */
function normalizePlayers(players: Player[]): Player[] {
  return players
    .map((p) => ({ ...p, name: p.name.trim() }))
    .filter((p) => p.name.length > 0)
}

export function aliasReducer(
  state: AliasState,
  action: AliasAction
): AliasState {
  switch (action.type) {
    case 'SET_PLAYERS':
      return { ...state, players: action.players }

    case 'SET_LANGUAGE':
      // Switching language resets the word pool so it rebuilds in the new
      // language on the next Start.
      if (action.language === state.language) return state
      return {
        ...state,
        language: action.language,
        remainingWords: [],
        usedWords: new Set<string>(),
        currentWord: null,
      }

    case 'READY': {
      const players = normalizePlayers(state.players)
      if (players.length === 0) return state
      return {
        ...state,
        players,
        currentPlayerIndex: 0,
        phase: 'preRound',
      }
    }

    case 'EDIT_PLAYERS':
      return { ...state, phase: 'setup' }

    case 'END_GAME':
      return {
        ...initialAliasState,
        // Keep the chosen language for convenience if they play again.
        language: state.language,
        usedWords: new Set<string>(),
      }

    case 'START_TURN':
      return {
        ...state,
        phase: 'playing',
        currentWord: action.currentWord,
        remainingWords: action.remainingWords,
        usedWords: action.usedWords,
        timeRemaining: TURN_SECONDS,
      }

    case 'NEXT_WORD':
      if (state.phase !== 'playing') return state
      return {
        ...state,
        currentWord: action.currentWord,
        remainingWords: action.remainingWords,
        usedWords: action.usedWords,
      }

    case 'TICK':
      if (state.phase !== 'playing') return state
      return { ...state, timeRemaining: action.timeRemaining }

    case 'TIMEOUT':
      if (state.phase !== 'playing') return state
      return { ...state, phase: 'turnEnded', timeRemaining: 0 }

    case 'NEXT_PLAYER': {
      const count = state.players.length
      const currentPlayerIndex =
        count > 0 ? (state.currentPlayerIndex + 1) % count : 0
      return {
        ...state,
        phase: 'preRound',
        currentPlayerIndex,
        currentWord: null,
        timeRemaining: TURN_SECONDS,
      }
    }

    default:
      return state
  }
}
