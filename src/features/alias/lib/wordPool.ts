import type { AliasLanguage, AliasWordData } from '../types'

export interface DrawResult {
  word: string
  remainingWords: string[]
  usedWords: Set<string>
}

function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive)
}

/** Fresh copy of the chosen language's word array. */
export function buildPool(
  data: AliasWordData,
  language: AliasLanguage
): string[] {
  return [...(data[language] ?? [])]
}

/**
 * Draw a random word with no repeats using swap-pop (O(1) removal):
 * pick a random index, swap it with the last element, then pop.
 * Returns `null` when the pool is empty (exhaustion).
 *
 * Pure: returns new array/set instances, never mutates the inputs.
 */
export function drawWord(
  remaining: readonly string[],
  used: ReadonlySet<string>
): DrawResult | null {
  if (remaining.length === 0) return null

  const next = [...remaining]
  const i = randomInt(next.length)
  const lastIdx = next.length - 1
  const word = next[i]
  next[i] = next[lastIdx]
  next.pop()

  const usedWords = new Set(used)
  usedWords.add(word)

  return { word, remainingWords: next, usedWords }
}
