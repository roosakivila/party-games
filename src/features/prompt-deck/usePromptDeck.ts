import { useCallback, useEffect, useRef, useState } from 'react'

import type { PromptData, PromptDeckConfig } from './types'

function resolveUrl(dataUrl: string): string {
  if (/^https?:\/\//.test(dataUrl) || dataUrl.startsWith('/')) return dataUrl
  return `${import.meta.env.BASE_URL}${dataUrl}`
}

export interface UsePromptDeck {
  loading: boolean
  error: string | null
  started: boolean
  currentPrompt: string | null
  canStart: boolean
  start: () => void
  next: () => void
}

/**
 * Loads a prompt list and draws random, non-repeating prompts. When every
 * prompt has been shown, the used set resets so the deck continues forever
 * (mirrors the legacy getRandomQuestion/usedQuestions behavior).
 */
export function usePromptDeck(config: PromptDeckConfig): UsePromptDeck {
  const [prompts, setPrompts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [started, setStarted] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null)

  // Used indices kept in a ref (non-reactive bookkeeping).
  const usedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(resolveUrl(config.dataUrl))
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load prompts (${res.status})`)
        return res.json() as Promise<PromptData>
      })
      .then((json) => {
        if (cancelled) return
        setPrompts(Array.isArray(json.prompts) ? json.prompts : [])
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Failed to load prompts')
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [config.dataUrl])

  const draw = useCallback((): string | null => {
    if (prompts.length === 0) return null

    let used = usedRef.current
    if (used.size >= prompts.length) {
      used = new Set()
      usedRef.current = used
    }

    const available: number[] = []
    for (let i = 0; i < prompts.length; i++) {
      if (!used.has(i)) available.push(i)
    }

    const index = available[Math.floor(Math.random() * available.length)]
    used.add(index)
    return prompts[index]
  }, [prompts])

  const start = useCallback(() => {
    setStarted(true)
    setCurrentPrompt(draw())
  }, [draw])

  const next = useCallback(() => {
    setCurrentPrompt(draw())
  }, [draw])

  return {
    loading,
    error,
    started,
    currentPrompt,
    canStart: prompts.length > 0,
    start,
    next,
  }
}
